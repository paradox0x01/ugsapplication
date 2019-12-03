import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {EmployeService} from "../../core/employe.service";
import {Router, ActivatedRoute} from '@angular/router';
import {PermissionService} from 'src/app/core/permission.service';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs';
import {Permission} from 'src/app/shared/permission';

@Component({
  selector: 'app-edit-permission',
  templateUrl: './edit-permission.component.html',
  styleUrls: ['./edit-permission.component.scss'],
  providers: [MessageService, ConfirmationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPermissionComponent implements OnInit {
  fr: any;
  private sub: Subscription;
  permission: Permission;
  permissionForm: FormGroup;
  Employes$: Observable<string[]>;
  private subPermissionID: Subscription;

  constructor(private confirmationService: ConfirmationService, private fb: FormBuilder,
              private route: Router, private messageService: MessageService,
              private employeService: EmployeService, private router: ActivatedRoute,
              private permissionService: PermissionService) {}


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
    this.sub = this.router.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.getPermission(id);
      }
    );

    this.Employes$ = this.employeService.Employe$;

    this.fr = {
      firstDayOfWeek: 0,
      dayNames: ['Dimanche', 'Lundi', 'Mardi',
                'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],

      dayNamesShort: ['Dim', 'Lun', 'Mar',
                  'Mer', 'Jeu', 'Ven', 'Sam'],

      dayNamesMin: ['Di', 'Lu', 'Ma',
                  'Me', 'Je', 'Ve', 'Sa'],

      monthNames: ['Janvier', 'Fevrier', 'Mars', 'Avril',
                  'Mai', 'Juin', 'Juillet', 'Août', 'Septembre',
                  'Octobre', 'Novembre', 'Decembre'],

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
      raison: new FormControl(''),
    });
  }

  getPermission(id): void {
    this.subPermissionID = this.permissionService.getPermission(id).subscribe({
      next: (permission) => this.permissionForm.patchValue({
        employe: permission.employe,
        typePermission: permission.typePermission,
        dateDebut: permission.dateDebut,
        dateFin: permission.dateFin,
        raison: permission.raison
      })
    });
  }

  Update(): void {
    // Check if employe form is valid the send post request to the backend
    if (this.permissionForm.valid) {
      const id = this.router.snapshot.paramMap.get('id');
      this.permissionService.updatePermission(this.permissionForm.value, id).subscribe();
      this.route.navigate(['/permissions']);
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.subPermissionID.unsubscribe();
  }
}
