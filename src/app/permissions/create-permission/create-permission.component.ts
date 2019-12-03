import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {EmployeService} from '../../core/employe.service';
import {  Observable, Subscription } from 'rxjs';
import { PermissionService } from '../../core/permission.service';

@Component({
  selector: 'app-create-permission',
  templateUrl: './create-permission.component.html',
  styleUrls: ['./create-permission.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class CreatePermissionComponent implements OnInit {
  private permissionForm: FormGroup;
  public fr: any;
  public Employes$: Observable<string[]>;
  private subCreatePermission: Subscription;

  constructor(private confirmationService: ConfirmationService, private fb: FormBuilder,
              private route: Router, private messageService: MessageService,
              private employeService: EmployeService, private router: ActivatedRoute,
              private permissionService: PermissionService) {
  }

  messageSuccess() {
    this.messageService.add({severity: 'success', summary: 'Reûssite', detail: 'Données enregistrées avec success'});
  }

  messageError() {
    this.messageService.add({severity: 'primary', summary: 'Message', detail: 'Opération annulé !'});
  }

  cancel() {
    this.confirmationService.confirm({
      message: 'Voulez vous annuler l\'operation en cours',
      accept: () => {
        this.route.navigate(['/permissions']);
        this.messageError();

      }
    });
  }

  ngOnInit() {

    this.Employes$ = this.employeService.Employe$;

    this.fr = {
      firstDayOfWeek: 0,
      dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],

      dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],

      dayNamesMin: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],

      monthNames: ['Janvier', 'Fevrier', 'Mars',
                  'Avril', 'Mai', 'Juin', 'Juillet', 'Août',
                  'Septembre', 'Octobre', 'Novembre', 'Decembre'],

      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Avr',
                      'Mai', 'Jun', 'Jul', 'Aou',
                      'Sep', 'Oct', 'Nov', 'Dec'],

      today: 'Aujourd\'hui',
      clear: 'Effacer',
      dateFormat: 'dd/mm/yy',
      weekHeader: 'Wk'
    };

    this.permissionForm = this.fb.group({
      employe: new FormControl('', Validators.required),
      typePermission: new FormControl('', Validators.required),
      dateDebut: new FormControl('', Validators.required),
      dateFin: new FormControl('', Validators.required),
      raison: new FormControl('')
    });
  }
  onSave(){
    if(this.permissionForm.valid){
      this.permissionService.createPermission(this.permissionForm.value)
        .subscribe();
      this.route.navigate(['/permissions'])
    }
  }
}

