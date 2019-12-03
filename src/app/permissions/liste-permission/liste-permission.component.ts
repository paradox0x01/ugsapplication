import { Component, OnInit, NgModule, LOCALE_ID } from '@angular/core';
import {PermissionService} from '../../core/permission.service';
import {Subscription, Observable} from 'rxjs';
import {Permission} from '../../shared/permission';
import { ActivatedRoute } from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');
@Component({

  selector: 'app-liste-permission',
  templateUrl: './liste-permission.component.html',
  styleUrls: ['./liste-permission.component.scss'],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'fr'
  }]
})
export class ListePermissionComponent implements OnInit {
  public permissions$: Observable<Permission[] >;
  private subPermission: Subscription;

  constructor(private permissionService: PermissionService,
              private router: ActivatedRoute, private nzMessageService: NzMessageService) {
  }

  ngOnInit() {
    this.subPermission= this.permissionService.GetPermissions().subscribe();
    this.permissions$ = this.permissionService.cachePermissionUpdate();
  }

  confirm(id: any) {
    this.permissionService.delPermission(id).subscribe();
    this.nzMessageService.info('Suppression reussite ! !');
  }
  cancel(): void {
    this.nzMessageService.info('Opération annulé !');
  }

  ngOnDestroy(): void {
    this.subPermission.unsubscribe();
  }
}

