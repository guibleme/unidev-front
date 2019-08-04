import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


const endpoint = 'http://192.168.1.38:3001';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  `application/json`,
  }),
};

const httpformData = {
  headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }),
};

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {


  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
  //  let body = res;
   // return body || { };
  }

  getXML(): Observable<any> {
    return this.http.get(endpoint + 'xml')
      .pipe(
      map(this.extractData));
  }

 /* addXML (file): Observable<any> {
    console.log(file);


  }*/

   /* postXML(objeto: any): Observable<HttpEvent<any>>  {
    const url = endpoint + '/xml';
    console.log(endpoint + '/xml');

    this.http.post(url, objeto, httpformData).subscribe((result: any) => {
        return result;
      }, (err) => {
      this.handleError(err);
    });
  } */

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
