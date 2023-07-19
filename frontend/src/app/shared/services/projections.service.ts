import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGenre } from '../models/IGenre';
import { IProjection } from '../models/IProjection';
import { IDropdown } from '../models/IDropdown';

const apiUrl = environment.apiUrl;

@Injectable({
    providedIn: "root"
})

export class ProjectionsService{
    constructor(
        private http: HttpClient
    ) { }

    getProjections(): Observable<IProjection[]>{
        const url = `${apiUrl}api/projections`;
        return this.http.get<IProjection[]>(url).pipe(tap(data => {
        }));
    }

    getProjection(id:number):Observable<IProjection>{
        const url = `${apiUrl}api/projections/%&/(${id})`;
        return this.http.get<IProjection>(url)
            .pipe(
                tap(data => {
                })
            );
    }

    addProjection(newGenre:IProjection):Observable<any>{
        const url= `${apiUrl}api/genres/add-projection`;
        return this.http.post(url,newGenre)
        .pipe(tap(taskResponse=>console.log("new projection has been added"))
    );
    }

    updateProjection(modifiedGenre:IProjection):Observable<any>{
        const url = `${apiUrl}api/genres/update-projection/${modifiedGenre.id}`;
        return this.http.put(url,modifiedGenre)
        .pipe(
            tap(taskResponse=> console.log('updated a projection'))
        );
    }
    deleteProjection(genreId:number):Observable<any>{
        const url = `${apiUrl}api/genres/delete-projection/${genreId}`;
        return this.http.delete<IProjection>(url);
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