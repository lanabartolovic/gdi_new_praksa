import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MovieService } from '../shared/services/movies.service';
import { IMovie } from '../shared/models/IMovie';
import { IDropdown } from '../shared/models/IDropdown';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { IMailData } from '../shared/models/IMailData';
import { MailService } from '../shared/services/mail.service';
@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.scss']
})
export class MovieAddComponent implements OnInit {
  @Output() refreshEvent: EventEmitter<void> = new EventEmitter();
  constructor(private router: Router, private _httpClient: HttpClient, private moviesService: MovieService, private mailService: MailService, private activatedRoute: ActivatedRoute) { }
  genreNames: IDropdown[] = [];
  movie: IMovie = {
    id: 0,
    genreId: 0,
    name: "",
    datumIzlaska: new Date(""),
    durationMinutes: 0,
    GenreName: "",
    datumString: ""
  };
  poruka: IMailData = {
    To: ["bartoloviclana@gmail.com"],
    From: "",
    DisplayName: "Added a new movie",
    ReplyTo: "bartoloviclana@gmail.com",
    ReplyToName: "New movie added",
    Subject: "New movie added",
    Body: ""
  };

  ngOnInit(): void {
    this.moviesService.getGenreNamesDropdown().subscribe((genreNames: IDropdown[]) => {
      this.genreNames = genreNames;
    }) //jel ide ; ili ne
  }
  onSubmit() {
    var podaci = "";
    podaci = podaci.concat("id : ", this.movie.id!.toString(), ", ", "genreId : ", this.movie.genreId.toString(), ", ",
      "name : ", this.movie.name, ", ", "duration : ", this.movie.durationMinutes.toString(), ", ", "datum : ", this.movie.datumString);
    this.poruka.Body = podaci;
    this.mailService.sendMail(this.poruka).subscribe(() => {
      this.refreshEvent.emit();
    });
    this.poruka.Body="";
    this.moviesService.addMovie(this.movie).subscribe(() => {
      this.refreshEvent.emit();
    });
  }
}
