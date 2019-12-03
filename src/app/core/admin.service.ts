import { Injectable } from '@angular/core';
import {Poste} from '../shared/poste';
import {Zone} from '../shared/zone';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, tap, scan, count} from 'rxjs/operators';
import {Observable, Subject, merge} from 'rxjs';
import {Employe} from "../shared/employe";
import {Responsable} from "../shared/responsable";
import {User} from "../shared/user";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private posteCache = new Subject<Poste[]>();
  private zoneCache = new Subject<Zone[]>();
  private usersCache = new Subject<User[]>();
  private respsCache = new Subject<Responsable[]>();
  private apiURL = 'http://localhost:3000/api/constante';
  private apiResps = 'http://localhost:3000/api/responsable';
  private apiUsers = 'http://localhost:3000/api/users';
  private zones: Zone[] = [];
  private postes: Poste[] = [];
  private users: User[] = [];
  private responsables: Responsable[] = [];
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  // Get zone
  getZone() {
    const apiZone = `${this.apiURL}/zones`;
    this.http.get<Zone[]>(apiZone)
      .pipe(
        map((zones: Zone[]) => zones.map(
          zone => {
            return {...zone}
          }
        ))
      )
      .subscribe((zone) => {
        this.zones = zone;
        this.zoneCache.next([...this.zones]);
      });
  }
  // Add zone
  addZone(payload: Zone) {
    const apiAddZone = `${this.apiURL}/zones/create`;
    this.http.post<Zone>(apiAddZone, payload, {headers: this.headers})
      .subscribe(() => {
        this.zoneCache.next([...this.zones, payload])
      });
  }


  // Delete zone
  delZone(id: string) {
    const apiDelZone = `${this.apiURL}/zones/${id}/delete`;
    this.http.delete<Zone>(apiDelZone, {headers: this.headers})
      .subscribe(() => {
        this.zones  = this.zones.filter((zone) => zone._id !== id );
        this.zoneCache.next([...this.zones]);
      });
  }

  // Get postes
  getPostes() {
    const apiZone = `${this.apiURL}/postes`;
    this.http.get<Poste[]>(apiZone)
      .pipe(
        map((postes: Poste[]) => postes.map(
          poste => {
            return {...poste}
          }
        ))
      )
      .subscribe((poste) => {
        this.postes = poste;
        this.posteCache.next([...this.postes]);
      })
  }
  // Add poste
  addPoste(payload: Poste) {
    const apiAddPoste= `${this.apiURL}/postes/create`;
    this.http.post<Poste>(apiAddPoste, payload, {headers: this.headers})
      .subscribe(() => {
        this.posteCache.next([...this.postes, payload])
      });
  }
  // Delete poste
  delPoste(id: string) {
    const apiDelPoste= `${this.apiURL}/postes/${id}/delete`;
    this.http.delete<Poste>(apiDelPoste, {headers: this.headers})
      .subscribe(() => {
        this.postes  = this.postes.filter((poste) => poste._id !== id );
        this.posteCache.next([...this.postes]);
      });
  }
  // USERS SERVICES

  // Get users
  getUsers() {
    this.http.get<User[]>(this.apiUsers, {headers: this.headers})
      .pipe(map((users: User[]) => users.map(user => {
        return {...user
              }
      }))).subscribe(users => {
         this.users = users;
        this.usersCache.next([...this.users]);
    });
  }
  // Add user
    addUser(user: User) {
      const addUserApi = `${this.apiUsers}/create`;
      this.http.post<User>(addUserApi, user, {headers: this.headers})
        .subscribe(() => {
          this.usersCache.next([...this.users, user]);
        });
    }

  // Delete user
  delUser(id) {
    const delUserApi = `${this.apiUsers}/${id}/delete`;
    this.http.delete(delUserApi, {headers: this.headers})
      .subscribe(() => {
        this.users = this.users.filter((user) => user._id !== id);
        this.usersCache.next([...this.users]);
      });
  }

  // RESPONSABLE
  // Retrieve zone
  selectZone(): Observable<Zone[]> {
    const apiSelectZone = `${this.apiURL}/zones`;
    return this.http.get<Zone[]>(apiSelectZone, {headers: this.headers});
  }

  // Retrieve employe
  selectEmploye(): Observable<Employe[]> {
    const apiSelectEmploye = 'http://localhost:3000/api/employe/';
    return this.http.get<Employe[]>(apiSelectEmploye, {headers: this.headers});
  }

  // Retrieve responsable data for table
  getResponsable() {
    this.http.get<Responsable[]>(this.apiResps, {headers: this.headers})
      .pipe(map((responsables: Responsable[]) => responsables.map(
        responsable => {
          return {...responsable}
        }
      ))).subscribe((responsable) => {
        this.responsables = responsable;
        this.respsCache.next([...this.responsables])
});
  }

  // ADD responsable
  addResponsable(resps: Responsable) {
    const api = `${this.apiResps}/create`;
    this.http.post<Responsable>(api, resps, {headers: this.headers})
      .subscribe(() => {
        this.respsCache.next([...this.responsables, resps])
      });
    }

  delResponsable(id) {
    const apiDelResps= `${this.apiResps}/${id}/delete`;
    this.http.delete<Responsable>(apiDelResps, {headers: this.headers})
      .subscribe(() => {
        this.responsables  = this.responsables.filter((responsable) => responsable._id !== id );
        this.respsCache.next([...this.responsables]);
      });
  }

  // Refreshers
  posteCacheRefresher() {
    return this.posteCache.asObservable();
  }

  zoneCacheRefresher() {
    return this.zoneCache.asObservable();
  }

  respsCacheRefresher() {
    return this.respsCache.asObservable();
  }

  usersCacheRefresher() {
    return this.usersCache.asObservable();
  }

}
