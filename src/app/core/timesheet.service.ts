import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Timesheet} from '../shared/timesheet';
import {Observable, Subject} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  headers = new HttpHeaders({'Content-Type': 'application/json'});
  private apiUrl = 'http://localhost:3000/api/timesheet';
  baseUrl = `${this.apiUrl}/create`;
  timesheetsByDate: Timesheet[] = [];
  timesheeetsByDateUpdate = new Subject<Timesheet[]>();
  constructor(private http: HttpClient) { }

  getSelectTimesheet(): Observable<Timesheet[]> {
    return this.http.get<Timesheet[]>(this.apiUrl)
  }

  timesheetByDayUpdateListener() {
    return this.timesheeetsByDateUpdate.asObservable();
  }

  // Create timesheet
  createTimesheet(timesheet: Timesheet): Observable<Timesheet> {
    return this.http.post<Timesheet>(this.baseUrl, timesheet, {headers: this.headers})
      .pipe(tap(() => {
        this.timesheeetsByDateUpdate.next([...this.timesheetsByDate, timesheet]);
      }));
  }

  // Get single timesheet
  getTimesheet(id: any): Observable<Timesheet> {
    const Turl = `${this.apiUrl}/${id}`;
    return this.http.get<Timesheet>(Turl)
      .pipe(map((timesheet: Timesheet) => ({
        ...timesheet,
        date: new Date(timesheet.date),
        heureDebut: new Date(timesheet.heureDebut) ,
        heureFin: new Date(timesheet.heureFin),
      })))
      .pipe(tap((timesheet: Timesheet) => console.log('Timesheet: ',timesheet)))
  }

  // Update single timesheet
  updateTimesheet(timesheet: Timesheet, id): Observable<Timesheet> {
    const udUrl = `${this.apiUrl}/${id}/update`;
    return this.http.put<Timesheet>(udUrl, timesheet, {responseType: 'json'})
      .pipe(tap(() => {
        this.timesheeetsByDateUpdate.next([...this.timesheetsByDate, timesheet]);
      }));
  }

  // Delete single timesheet
  delTimesheet(id) {
    const urlD = `${this.apiUrl}/${id}/delete`;
    return this.http.delete(urlD, {headers: this.headers})
      .pipe(tap(() => {
        this.timesheetsByDate = this.timesheetsByDate.filter(timesheet => timesheet._id !== id);
        this.timesheeetsByDateUpdate.next([...this.timesheetsByDate]);
      }));
  }

  // Dashboard
  getAbsent(): Observable<Timesheet[]> {
    return this.http.get<Timesheet[]>(this.apiUrl)
      .pipe(
        map((timesheets) => timesheets.filter(
          (timesheet) => timesheet.status === false
        ))
      );
  }
  // Reports
  getReportTimesheet(startDate: Date, endDate: Date): Observable<{countAbsent: Number, countPresent: Number}> {
    const apiReport = `${this.apiUrl}/reports/${startDate}/${endDate}`;
    return this.http.get<{countAbsent: Number, countPresent: Number}>(apiReport, {headers: this.headers});
  }

  // Get timesheet by day
  getReportByDay(today: String): Observable<Timesheet[]> {
    const apitoday = 'http://localhost:3000/api/timesheet/report';
    const apiToday = `${apitoday}/${today}`;
    return this.http.get<Timesheet[]>(apiToday)
      .pipe(map((timesheets: Timesheet[]) =>
      timesheets.map(timesheet => {
        return {
          ...timesheet,
        date: new Date(timesheet.date),
        heureDebut: new Date(timesheet.heureDebut),
        heureFin: new Date(timesheet.heureFin)};
      })
      )).pipe(tap((timesheets: Timesheet[]) => {
        this.timesheetsByDate = timesheets;
        this.timesheeetsByDateUpdate.next([...this.timesheetsByDate]);
      }))
  }

  // Count employe timesheet by interval date
  getSingleReportCount(employe: String, startDate: Date, endDate: Date): Observable<{ countEmployeAbsence: Number; countEmployePresence: Number }> {
    const apiCountUrl = `${this.apiUrl}/reportsDate/${employe}/${startDate}/${endDate}`;
    return this.http.get<{countEmployeAbsence: Number, countEmployePresence: Number}>(apiCountUrl, {headers: this.headers})
      .pipe(tap(
        (employe: { countEmployeAbsence: Number; countEmployePresence: Number }) => {
        }
      ));

  }


  getSingleReport(employe: String, start3: Date, end3: Date): Observable<Timesheet[]> {
    const apiSingle = `${this.apiUrl}/reportEmploye/${employe}/${start3}/${end3}`;
    return this.http.get<Timesheet[]>(apiSingle, {headers: this.headers})
      .pipe(tap((timesheet: Timesheet[]) => console.log('Single Rapport:',timesheet)));
  }
}


