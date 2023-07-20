import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGenre } from '../models/IGenre';
import { IFirstProjection } from '../models/IFirstProjection';
import { IProjection } from '../models/IProjection';
const apiUrl=environment.apiUrl;

@Injectable({
    providedIn:"root"
})
export class FirstProjectionService{
    constructor(
        private http:HttpClient
    ){}

    getFirstProjections():Observable<IFirstProjection[]>{
        const url = `${apiUrl}api/first-projections`;
        return this.http.get<IFirstProjection[]>(url).pipe(tap(data=>{
        }));
    }

    getCinemasFirstProjections(mtId : number):Observable<IFirstProjection>{
        const url = `${apiUrl}api/first-projections/${mtId}`;
        return this.http.get<IFirstProjection>(url)
        .pipe(
            tap(data=>{
        })
        );
    }
}