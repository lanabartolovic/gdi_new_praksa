import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGenre } from '../models/IGenre';
import { IMovieTheatre } from '../models/IMovieTheatre';
import { IProjection } from '../models/IProjection';
const apiUrl=environment.apiUrl;

@Injectable({
    providedIn:"root"
})
export class MovieTheatreService{

    constructor(
        private http:HttpClient
    ){}

    getTheatres():Observable<IMovieTheatre[]>{
        const url = `${apiUrl}api/movie-theatres`;
        return this.http.get<IMovieTheatre[]>(url).pipe(tap(data=>{
        }));
    }
    getFirstProjection(theatreId:number):Observable<IProjection>{
        const url = `${apiUrl}api/movie-theatres/first-projection/${theatreId}`;
        return this.http.get<IProjection>(url).pipe(tap(data=>{
        }));
    }
}