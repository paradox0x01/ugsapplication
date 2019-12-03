import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {TimesheetService} from '../../core/timesheet.service';
import { Observable } from 'rxjs';
import {EmployeService} from '../../core/employe.service';
import {Timesheet} from "../../shared/timesheet";
import {Employe} from "../../shared/employe";

@Component({
  selector: 'app-create-timesheet',
  templateUrl: './create-timesheet.component.html',
  styleUrls: ['./create-timesheet.component.scss'],
  providers: [MessageService, ConfirmationService],
})

export class CreateTimesheetComponent implements OnInit {
  timesheetForm: FormGroup;

  employe$: Observable<string[]>;
  fr: any;
  constructor( private confirmationService: ConfirmationService, private fb: FormBuilder,
               private route: Router, private messageService: MessageService,
               private timesheetService: TimesheetService, private employeService: EmployeService) { }
  cancel() {
    this.confirmationService.confirm({
      message: 'Voulez vous annuler l\'operation en cours',
      accept: () => {
        this.route.navigate(['/timesheets']);
        this.messageError();

      }
    });
  }

  messageSuccess() {
    this.messageService.add({severity: 'success', summary: 'Reûssite', detail: 'Information enregistré avec success'});
  }

  messageError() {
    this.messageService.add({severity: 'primary', summary: 'Message', detail: 'Opération annulé !'});
  }


  ngOnInit() {

    // Methodes
    this.employe$ = this.employeService.Employe$;

    this.fr = {
      firstDayOfWeek: 0,
      dayNames: ['Dimanche', 'Lundi', 'Mardi',
        'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],

      dayNamesShort: ['Dim', 'Lun', 'Mar',
        'Mer', 'Jeu', 'Ven', 'Sam'],

      dayNamesMin: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],

      monthNames: [ 'Janvier', 'Fevrier', 'Mars',
        'Avril', 'Mai', 'Juin', 'Juillet', 'Août',
        'Septembre', 'Octobre', 'Novembre', 'Decembre' ],

      monthNamesShort: [ 'Jan', 'Fev', 'Mar', 'Avr',
        'Mai', 'Jun', 'Jul', 'Aou', 'Sep',
        'Oct', 'Nov', 'Dec' ],

      today: 'Aujourd\'hui',
      clear: 'Effacer',
      dateFormat: 'dd/mm/yy',
      weekHeader: 'Wk'
  };

    this.timesheetForm = this.fb.group({
      employe: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      heureDebut: new FormControl(''),
      heureFin: new FormControl(''),
      status: new FormControl(false),
      remarque: new FormControl('')

  });
  }

  onSave(){
    if (this.timesheetForm.value){
      this.timesheetService.createTimesheet(this.timesheetForm.value)
        .subscribe();
      this.route.navigate(['/timesheets']);
    }
  }

}
