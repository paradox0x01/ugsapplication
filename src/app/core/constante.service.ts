import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Poste} from '../shared/poste';
import {map} from 'rxjs/operators';
import {Zone} from '../shared/zone';

@Injectable({
  providedIn: 'root'
})
export class ConstanteService {
  private apiUrl = 'http://localhost:3000/api/constante';

  constructor(private http: HttpClient) {}
      posteUrl = `${this.apiUrl}/postes`;
      zoneUrl = `${this.apiUrl}/zones`;
      Poste$ = this.http.get<Poste[]>(this.posteUrl)
        .pipe(
           map(postes =>
             postes.map(poste => poste.nomPoste))
      );

      Zone$ = this.http.get<Zone[]>(this.zoneUrl)
        .pipe(
          map(zones =>
          zones.map(zone => zone.nomZone))
        );
}
