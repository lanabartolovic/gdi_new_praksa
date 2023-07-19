import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGenre } from '../models/IGenre';
import { IMovie } from '../models/IMovie';
import { IMailData } from '../models/IMailData';
const apiUrl=environment.apiUrl;

@Injectable({
    providedIn:"root"
})

export class MailService{
    constructor(
        private http:HttpClient
    ){}
    sendMail(poruka:IMailData){
        const url = `${apiUrl}api/mail/sendmail`;
        return this.http.post(url, poruka,  {responseType: 'text'}).pipe(tap(taskResponse => console.log("newSensor op has been sccessfully finished"))
        );
    }
}