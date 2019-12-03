import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {EmployeService} from '../../core/employe.service';
import {ConstanteService} from '../../core/constante.service';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {Subscription, Observable} from 'rxjs';
import {Employe} from '../../shared/employe';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-edit-employe',
  templateUrl: './edit-employe.component.html',
  styleUrls: ['./edit-employe.component.scss'],
  providers: [MessageService, ConfirmationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditEmployeComponent implements OnInit {
  fr: any;
  sub: Subscription;
  employe: Employe;
  employeForm: FormGroup;
  private responsable$: Observable<string[]>;
  private poste$: Observable<string[]>;
  private zone$: Observable<string[]>;
  civilite: string[];

  constructor(private employeService: EmployeService,
              private confirmationService: ConfirmationService,
              private fb: FormBuilder, private route: Router,
              private messageService: MessageService,
              private constanteService: ConstanteService,
              private router: ActivatedRoute) { }

  messageSuccess() {
    this.messageService.add({severity: 'success', summary: 'Reûssite', detail: 'Information enregistré avec success'});
  }

  messageError() {
    this.messageService.add({severity: 'primary', summary: 'Message', detail: 'Opération annulé !'});
  }

  cancel() {
    this.confirmationService.confirm({
      message: 'Voulez vous annuler l\'operation en cours',
      accept: () => {
        this.route.navigate(['/employes']);
        this.messageError();

      }
    });
  }
  ngOnInit() {

    // Fetch data

    this.civilite = ['Mr', 'Mme'];

    /* Methode CRUD */

    this.responsable$ = this.employeService.Employe$;

    this.poste$ = this.constanteService.Poste$;

    this.zone$ = this.constanteService.Zone$;

    this.employeForm = this.fb.group({
      nom_prenoms: new FormControl('', Validators.required),
      civilite: new FormControl('', Validators.required),
      residence: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      contactUrgence: new FormControl('', Validators.required),
      poste: new FormControl(''),
      matricule: new FormControl('', Validators.required),
      responsable: new FormControl(''),
      zone: new FormControl(''),
      contrat: new FormControl('', Validators.required),
      debutContrat: new FormControl ('', Validators.required),
      finContrat: new FormControl('', Validators.required)
    });

    // Get ID
    this.sub = this.router.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.getEmploye(id);
      }
    );
    // Language service
    this.fr = {
      firstDayOfWeek: 0,
      dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
      dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
      dayNamesMin: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
      monthNames: [ 'Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai',
       'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre' ],
      monthNamesShort: [ 'Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec' ],
      today: 'Aujourd\'hui',
      clear: 'Effacer',
      dateFormat: 'dd/mm/yy',
      weekHeader: 'Wk'
    };
  }

   getEmploye(id) {
      this.employeService.getEmploye(id).subscribe(
        {next: (employe) => this.employeForm.patchValue({
            nom_prenoms: employe.nom_prenoms,
            civilite: employe.civilite,
            residence: employe.residence,
            telephone: employe.telephone,
            contactUrgence: employe.contactUrgence,
            poste: employe.poste,
            matricule: employe.matricule,
            responsable: employe.responsable,
            zone: employe.zone,
            contrat: employe.contrat,
            debutContrat: employe.debutContrat,
            finContrat: employe.finContrat
          })}
      );
   }


   // Update the value

   Update() {
    // Check if employe form is valid the send post request to the backend
    if (this.employeForm.valid) {
      const id = this.router.snapshot.paramMap.get('id');
      this.employeService.updateEmploye(this.employeForm.value, id).subscribe();
      this.route.navigate(['/employes']);
    }
  }
}
