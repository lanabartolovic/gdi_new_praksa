import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGenre } from '../models/IGenre';

const apiUrl=environment.apiUrl;

@Injectable({
    providedIn:"root"
})
export class GenresService{

    constructor(
        private http:HttpClient
    ){}
    getGenres():Observable<IGenre[]>{
        const url = `${apiUrl}api/genres`;
        return this.http.get<IGenre[]>(url).pipe(tap(data=>{
            
        }));
    }

    getGenre(id:number):Observable<IGenre>{
        const url = `${apiUrl}api/genres/${id}`;
        return this.http.get<IGenre>(url)
        .pipe(
            tap(data=>{
        }),
        catchError(this.handleError)
        );
    }
    addGenre(newGenre:IGenre):Observable<any>{
        const url= `${apiUrl}api/genres/add-genre`;
        return this.http.post(url,newGenre)
        .pipe(tap(taskResponse=>console.log("newSensor op has been sccessfully finished"))
    );
    }

    updateGenre(modifiedGenre:IGenre):Observable<any>{
        const url = `${apiUrl}api/genres/update-genre/${modifiedGenre.id}`;
        return this.http.put(url,modifiedGenre)
        .pipe(
            tap(taskResponse=> console.log('modifySensorType op has been successfully finished'))
        );
    }
    deleteGenre(genreId:number):Observable<any>{
        const url = `${apiUrl}api/genres/delete-genre/${genreId}`;
        return this.http.delete<IGenre>(url);
    }
    private handleError(err: HttpErrorResponse){
        let errorMessage='';
        if(err.error instanceof ErrorEvent){
            errorMessage='An error occurred: ${err.error.message}';
        }
        else{
            errorMessage='Server returned code: ${err.status}, error message is: ${err.message}';
        }
        console.error(errorMessage);
        return throwError(()=>errorMessage);
    }
}