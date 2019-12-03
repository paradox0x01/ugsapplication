import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {MessageService} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';
import {EmployeService} from '../../core/employe.service';
import {ConstanteService} from '../../core/constante.service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {Employe} from "../../shared/employe";
import {NzMessageService} from 'ng-zorro-antd';
import {concatMap} from 'rxjs/operators';

registerLocaleData(localeFr, 'fr');


@Component({
  selector: 'app-create-employe',
  templateUrl: './create-employe.component.html',
  styleUrls: ['./create-employe.component.scss'],
  providers: [MessageService, ConfirmationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEmployeComponent implements OnInit {
  fr: any;
  employeForm: FormGroup;
  responsable$: Observable<string[]>;
  poste$: Observable<string[]>;
  zone$: Observable<string[]>;
  civilite: string[];


  constructor( private confirmationService: ConfirmationService,
               private fb: FormBuilder, private route: Router,
               private messageService: MessageService,
               private message: NzMessageService,
               private constanteService: ConstanteService,
               private employeService: EmployeService) { }


  messageError() {
    this.messageService.add({severity: 'primary', summary: 'Message', detail: 'Opération annulé !'});
  }

  messageSuccess() {
    this.messageService.add({severity: 'success', summary: 'Reûssite', detail: 'Information enregistré avec success'});
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

  onSave(): void {
    this.message
      .loading('Enregistrement en cours ...', { nzDuration: 4000 })
      .onClose!.pipe(
      concatMap(() => this.message.info('Employé enregistrer terminé avec succés !', { nzDuration: 2500 }).onClose!)
    )
      .subscribe(() => {
        this.employeService.saveEmloye(this.employeForm.value).subscribe();
        this.route.navigate(['/employes']);
      });
  }

  ngOnInit() {

    this.civilite = ['Mr', 'Mme'];

    /* Methode CRUD */

    this.responsable$ = this.employeService.Employe$;

    this.poste$ = this.constanteService.Poste$;

    this.zone$ = this.constanteService.Zone$;

    /* Form builder */
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

    /* Service gestion */

    this.fr = {
      firstDayOfWeek: 0,
      dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
      dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
      dayNamesMin: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
      // tslint:disable-next-line:max-line-length
      monthNames: [ 'Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre' ],
      monthNamesShort: [ 'Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec' ],
      today: 'Aujourd\'hui',
      clear: 'Effacer',
      dateFormat: 'dd/mm/yy',
      weekHeader: 'Wk'
  };
  }


  // Method call then the user click on save button
}
