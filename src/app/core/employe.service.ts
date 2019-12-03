import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Employe} from '../shared/employe';
import {map, tap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {


  constructor(private http: HttpClient, private authService: AuthService) { }
  private apiUri = 'http://localhost:3000/api/employe';
  headers = new HttpHeaders({'Content-Type': 'application/json'});
  employes: Employe[] = [];

  // Definite actions and Data streams for the views
  private EmployeUpdate = new Subject<Employe[]>();

        Employe$ = this.http.get<Employe[]>(this.apiUri)
          .pipe(map((employe: Employe[]) => employe.map(
            employe => employe.nom_prenoms)
          ));

        getEmployes(): Observable<Employe[]> {
          return this.http.get<Employe[]>(this.apiUri)
            .pipe(map((employe: Employe[]) => employe.map(employe => {
              return { ...employe};
            })))
            .pipe(tap((employe: Employe[]) => {
              this.employes = employe;
              console.log(this.employes);
              this.EmployeUpdate.next([...this.employes])
            }));
        }

        getEmployeUpdateListener() {
          return this.EmployeUpdate.asObservable();
          }

        // Save method
        saveEmloye(employe: Employe) {
          const baseUrl = `${this.apiUri}/create`;
          return this.http.post<Employe>(baseUrl, employe, {headers: this.headers})
            .pipe(tap(() => {
              this.EmployeUpdate.next([...this.employes, employe])
            }));
        }

        // Delete method, take a id in parameter and delete it
        delEmploye(id) {
          const urlD = `${this.apiUri}/${id}/delete`;
          this.http.delete<Employe>(urlD, {headers: this.headers})
            .subscribe(() => {
              this.employes = this.employes.filter((employe) => employe._id !== id);
              this.EmployeUpdate.next([...this.employes]);
            });
        }

        // Methode to get employe by id
        getEmploye(id: any): Observable<Employe> {
          const idUrl = `${this.apiUri}/${id}`;
          return this.http.get<Employe>(idUrl)
            .pipe(map(employe => ({
              ...employe,
              debutContrat: new Date(employe.debutContrat),
              finContrat: new Date(employe.finContrat)
            })));
        }

        // Update employe
        updateEmploye(employe: Employe, id): Observable<Employe> {
          const udUrl = `${this.apiUri}/${id}/update`;
          return this.http.put<Employe>(udUrl, employe, {responseType: 'json'} );
        }

        // Dashboard

  // Get count gardiens
  getEmployees(): Observable<Employe[]>{
    return this.http.get<Employe[]>(this.apiUri)
      .pipe(
        map(employes => employes.filter(employe =>
          employe.poste === 'Gardiens'
        )))
  }

  // Get count staff
  getStaffs(): Observable<Employe[]> {
          return this.http.get<Employe[]>(this.apiUri)
            .pipe(
              map(employes => employes.filter(employe =>
              employe.poste !== 'Gardiens'))
            )
  }



        // getCurrentUser(id: any): Observable<string> {
        //   const idUrl = `${this.apiUri}/${id}`;
        //   return this.http.get<Employe>(idUrl)
        //     .pipe(map(employe => employe.nom_prenoms));
        // }
}
