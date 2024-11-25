import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  get<T>(endpoint : string, params?: any): Observable<T> {
    return this.http.get<T>(environment.apiUrl + endpoint);
  }

  post<T>(endpoint : string, body: any): Observable<T> {
    return this.http.post<T>(environment.apiUrl + endpoint, body);
  }

  put<T>(endpoint : string, body: any): Observable<T> {
    return this.http.put<T>(environment.apiUrl + endpoint, body);
  }

  delete<T>(endpoint : string, id: string): Observable<T> {
    return this.http.delete<T>(`${environment.apiUrl + endpoint}/${id}`);
  }
}
