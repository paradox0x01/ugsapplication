import { Component, OnInit, NgModule, LOCALE_ID } from '@angular/core';
import {Employe} from "../../shared/employe";
import {EmployeService} from "../../core/employe.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from 'rxjs';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');



@Component({
  selector: 'app-details-employe',
  templateUrl: './details-employe.component.html',
  styleUrls: ['./details-employe.component.scss'],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'fr'
  }]
})
export class DetailsEmployeComponent implements OnInit {
  public Employe: Employe;
  private sub: Subscription;

  constructor(private employeService: EmployeService,
              private router: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.router.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.getEmploye(id)
    });

  }

  getEmploye(id: string) {
    this.employeService.getEmploye(id)
      .subscribe((employe) => {
        this.Employe =  employe;
      });
  }
}
