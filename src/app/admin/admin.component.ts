import {Component, OnInit} from '@angular/core';
import {Zone} from "../shared/zone";
import {Poste} from "../shared/poste";
import {AdminService} from "../core/admin.service";
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Employe} from "../shared/employe";
import {Responsable} from "../shared/responsable";
import {User} from "../shared/user";
import {map} from 'rxjs/operators';
import {View} from "../shared/view";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  public zones: Zone[] = [];
  public postes: Poste[] = [];
  public selectZone$: Observable<Zone[]>;
  private posteForm: FormGroup;
  private zonesForm: FormGroup;
  public selectEmploye$: Observable<Employe[]>;
  public responsableForm: FormGroup;
  public responsables: Responsable[];
  public usersForm: FormGroup;
  public view: View[] = [];

  constructor(private adminService: AdminService,
              private fb: FormBuilder) { }

  ngOnInit() {

    // Get all responsables
    this.adminService.getResponsable();
    this.adminService.respsCacheRefresher()
      .subscribe((responsable) => {
        this.responsables = responsable;
      });

    // Setup poste Forms
    this.posteForm = this.fb.group({
      nomPoste: new FormControl('')
    });

    // Setup zone forms
    this.zonesForm = this.fb.group({
      nomZone: new FormControl('')
    });

    // Setup responsable forms
    this.responsableForm = this.fb.group({
      responsable: new FormControl(''),
      zone: new FormControl(''),
    });


    // Setup users forms
    this.usersForm = this.fb.group({
      employe: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl('')
    });

    // Get all poste
    this.adminService.getPostes();
    this.adminService.posteCacheRefresher()
      .subscribe((poste) => {
        this.postes = poste;
      });


    // Get all zones
    this.adminService.getZone();
    this.adminService.zoneCacheRefresher()
      .subscribe((zone) => {
        this.zones = zone;
      });

    // Get all Users
    this.adminService.getUsers();
    this.adminService.usersCacheRefresher()
      .pipe(map((users: User[]) => users.map(user => {
        return {
          nom_prenoms: user.employe.nom_prenoms,
          username: user.username
        }
      }))).subscribe(user => {
      this.view = user;
      console.log('View: ', this.view)
    });

    // Get select zones
    this.selectZone$ = this.adminService.selectZone();

    // Get select postes
    this.selectEmploye$ = this.adminService.selectEmploye();
  }

  // END OF NG-INIT

  // Add poste
  addPoste() {
    this.adminService.addPoste(this.posteForm.value);
  }

  // Delete poste
  delPoste(id: any) {
    this.adminService.delPoste(id);
    this.posteForm.reset();
  }

  // Add zone
  addZone() {
    this.adminService.addZone((this.zonesForm.value));
    this.zonesForm.reset();
  }

  // Delete zone
  delZone(id: any) {
    this.adminService.delZone(id);
  }

  onSubmit(): void {
    this.adminService.addResponsable(this.responsableForm.value);
  }

  delResponsable(id: any) {
    this.adminService.delResponsable(id);
  }

  // USERS METHODES

  // ADD USERS
  addUsers() {
    this.adminService.addUser(this.usersForm.value);
  }

  // DEL USERS
  delUsers(id: any) {
    this.adminService.delUser(id);
  }
}
