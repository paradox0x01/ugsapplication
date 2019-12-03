import {ChangeDetectionStrategy, Component, OnInit,NgModule, LOCALE_ID, OnDestroy} from '@angular/core';
import {EmployeService} from '../../core/employe.service';
import {Subscription, Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import { Employe } from '../../shared/employe';
import { NzMessageService } from 'ng-zorro-antd/message';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-listes-employes',
  templateUrl: './listes-employes.component.html',
  styleUrls: ['./listes-employes.component.scss'],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'fr'
  }]
})
export class ListesEmployesComponent implements OnInit {
  Employes$: Observable<Employe[]>;
  private sub: Subscription;
  private employeSub: Subscription;

  constructor(private employeService: EmployeService,
              private route: ActivatedRoute,
              private nzMessageService: NzMessageService,
              private router: Router) {
  }
  cancel(): void {
    this.nzMessageService.info('Opération annulé !', );
  }

  ngOnInit() {
    this.employeSub = this.employeService.getEmployes().subscribe();
    this.Employes$ =  this.employeService.getEmployeUpdateListener();

    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = params.get('_id');
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.employeSub.unsubscribe();
  }


  confirm(id: any) {
    this.employeService.delEmploye(id);
    this.nzMessageService.info('Suppression effectué avec success !');
    }
}

