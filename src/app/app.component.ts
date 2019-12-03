import { Component, OnInit } from '@angular/core';
import {AuthService} from './core/auth.service';
import {EmployeService} from './core/employe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {PrimeModule} from './prime.module';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'APP';

  constructor(public authService: AuthService,
              private employeService: EmployeService,
              private router: ActivatedRoute,
              private ngxService: NgxUiLoaderService) {}

  logOut() {
    this.authService.doLogOut();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
    }, 5000);

    this.router.paramMap.subscribe(
      params => {
        const id = params.get('id');
      }
    );
  }
}
