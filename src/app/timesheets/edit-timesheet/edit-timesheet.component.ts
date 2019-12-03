import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {TimesheetService} from '../../core/timesheet.service';
import { Observable, Subscription } from 'rxjs';
import {EmployeService} from '../../core/employe.service';
import {Timesheet} from "../../shared/timesheet";

@Component({
  selector: 'app-edit-timesheet',
  templateUrl: './edit-timesheet.component.html',
  styleUrls: ['./edit-timesheet.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class EditTimesheetComponent implements OnInit {
  timesheetForm: FormGroup;
  sub: Subscription;
  employe$: Observable<string[]>;
  fr: any;
  constructor( private confirmationService: ConfirmationService, private fb: FormBuilder,
               private route: Router, private messageService: MessageService,
               private timesheetService: TimesheetService, private router: ActivatedRoute,
               private employeService: EmployeService) { }
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

    // Get ID
    this.sub = this.router.paramMap.subscribe(params => {
      const id = params.get('id');
      this.getTimesheet(id);
    });

    this.fr = {
      firstDayOfWeek: 0,
      dayNames: ['Dimanche', 'Lundi', 'Mardi',
        'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],

      dayNamesShort: ['Dim', 'Lun', 'Mar',
        'Mer', 'Jeu', 'Ven', 'Sam'],

      dayNamesMin: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],

      monthNames: [ 'Janvier', 'Fevrier', 'Mars', 'Avril'
        , 'Mai', 'Juin', 'Juillet', 'Août',
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
      remarque: new FormControl(''),

  });
  }

  onSave() {
    if (this.timesheetForm.valid) {
      this.timesheetService.createTimesheet(this.timesheetForm.value)
        .subscribe();
      this.route.navigate(['/timesheet']);
    }
  }

  getTimesheet(id: any) {
    this.timesheetService.getTimesheet(id).subscribe({
      next: (timesheet: Timesheet) => this.timesheetForm.patchValue({
        employe: timesheet.employe,
        date: timesheet.date,
        heureDebut: timesheet.heureDebut,
        heureFin: timesheet.heureFin,
        status: timesheet.status,
        remarque: timesheet.remarques
      })
    });
  }

  Update() {
    // Check if employe form is valid the send post request to the backend
    if (this.timesheetForm.valid) {
      const id = this.router.snapshot.paramMap.get('id');
      this.timesheetService.updateTimesheet(this.timesheetForm.value, id)
        .subscribe();
      this.route.navigate(['/timesheets']);
    }
  }

  ngOnDestroy(): void {
  }
}
