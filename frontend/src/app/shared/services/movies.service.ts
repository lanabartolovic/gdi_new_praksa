import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGenre } from '../models/IGenre';
import { IMovie } from '../models/IMovie';
import { IDropdown } from '../models/IDropdown';

const apiUrl = environment.apiUrl;

@Injectable({
    providedIn: "root"
})
export class MovieService {

    constructor(
        private http: HttpClient
    ) { }
    getMovies(): Observable<IMovie[]> {
        const url = `${apiUrl}api/movies`;
        return this.http.get<IMovie[]>(url).pipe(tap(data => {
            
        }));
    }

    getMovie(id: number): Observable<IMovie> {
        const url = `${apiUrl}api/movies/${id}`;
        return this.http.get<IMovie>(url)
            .pipe(
                tap(data => {
                    
                }),
                catchError(this.handleError)
            );
    }
    addMovie(newSeries: IMovie): Observable<any> {
        var datum = newSeries.datumString;
        var time = "T00:00:00";
        datum.concat(time);
        var date = new Date(datum);
        const url = `${apiUrl}api/movies/add-movie`;
        newSeries.datumIzlaska = date;
        return this.http.post(url, newSeries)
            .pipe(tap(taskResponse => console.log("newSensor op has been sccessfully finished"))
            );
    }

    updateMovie(modifiedSeries: IMovie): Observable<any> {
        const url = `${apiUrl}api/movies/update-movie/${modifiedSeries.id}`;
        var datum;
        if (modifiedSeries.datumString == undefined) {
            datum = modifiedSeries.datumIzlaska;
        }
        else {
            datum = modifiedSeries.datumString;
            var time = "T00:00:00";
            datum.concat(time);
        }

        var date = new Date(datum);
        modifiedSeries.datumIzlaska = date;
        const genreUrl = `${apiUrl}api/genres/${modifiedSeries.genreId}`;
        return this.http.get(genreUrl).pipe(
            tap((zanr: any) => {
                console.log(JSON.stringify(zanr));
                modifiedSeries.GenreName = zanr.name;
            }),
            switchMap(() => this.http.put(url, modifiedSeries)),
            tap((taskResponse) =>
                console.log('modifySensorType op has been successfully finished')
            )
        );
    }
    deleteMovie(seriesId: number): Observable<any> {
        const url = `${apiUrl}api/movies/delete-movie/${seriesId}`;
        return this.http.delete<IGenre>(url);
    }

    getGenreNamesDropdown(): Observable<IDropdown[]> {
        const url = `${apiUrl}api/genres`;
        return this.http.get<IDropdown[]>(url)
            .pipe(
                tap(data => {
                    
                })
            );
    }
    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = 'An error occurred: ${err.error.message}';
        }
        else {
            errorMessage = 'Server returned code: ${err.status}, error message is: ${err.message}';
        }
        console.error(errorMessage);
        return throwError(() => errorMessage);
    }
}