import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Permission} from '../shared/permission';
import {map, tap} from 'rxjs/operators';
import get = Reflect.get;

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private apiUri = 'http://localhost:3000/api/permission';
  private baseUrl = `${this.apiUri}/create`;
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private permissions: Permission[] = [];
  private cachePermission = new Subject<Permission[]>();

  constructor(private http: HttpClient) {
  }

  // Get all permissions

  GetPermissions() {
    return this.http.get<Permission[]>(this.apiUri)
      .pipe(map(permissions => permissions.map(permission => {
        return {
          ...permission,
          dateDebut: new Date(permission.dateDebut),
          dateFin: new Date(permission.dateFin)
        };
      }))).pipe(tap(permission => {
      this.permissions = permission;
      this.cachePermission.next([...this.permissions]);
    }));
  }

  cachePermissionUpdate() {
    return this.cachePermission.asObservable();
  }

  // Create method 
  createPermission(permission: Permission): Observable<Permission> {
    return this.http.post<Permission>(this.baseUrl, permission, {headers: this.headers})
      .pipe(tap(() => this.cachePermission.next([...this.permissions, permission])))
  }

  // Get single permission
  getPermission(id: any): Observable<Permission> {
    const idUrl = `${this.apiUri}/${id}`;
    return this.http.get<Permission>(idUrl)
      .pipe(map(permission => ({
        ...permission,
        dateDebut: new Date(permission.dateDebut),
        dateFin: new Date(permission.dateFin)
      })))
  }


  // Get permission Event
  getPermissionEvent(): Observable<any[]> {
    return this.http.get<Permission[]>(this.apiUri)
      .pipe(map((permissions: Permission[]) => permissions.map(
        permission => {
          return {
            title: permission.employe,
            start: permission.dateFin
          };
        }
      )));
  }

  // Update single permission
  updatePermission(permission: Permission, id) {
    const udUrl = `${this.apiUri}/${id}/update`;
    return this.http.put<Permission>(udUrl, permission, {responseType: 'json'})
      .pipe(tap(() => this.cachePermission.next([...this.permissions, permission])));
  }

  // Delete single permission
  delPermission(id) {
    const urlD = `${this.apiUri}/${id}/delete`;
    return this.http.delete<Permission>(urlD, {headers: this.headers})
      .pipe(tap(() => {
        this.permissions = this.permissions.filter(permissions => permissions._id !== id);
        this.cachePermission.next([...this.permissions]);
      }));
  }

  // Dashboard
  getStaff(): Observable<Permission[]> {
    return this.http.get<Permission[]>(this.apiUri);
  }

  // Rapport count
  getCountPermission(startDate: Date, endDate: Date) {
    const getCountApi = `${this.apiUri}/reports/${startDate}/${endDate}`;
    return this.http.get<Number>(getCountApi, {headers: this.headers});
  }
}
