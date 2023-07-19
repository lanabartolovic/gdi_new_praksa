import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovieService } from '../shared/services/movies.service';
import { IMovie } from '../shared/models/IMovie';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { IMailData } from '../shared/models/IMailData';
import { MailService } from '../shared/services/mail.service';
import { IGenre } from '../shared/models/IGenre';
import { GenresService } from '../shared/services/genres.service';
var pod = "";
@Component({
  selector: 'app-movie-update',
  templateUrl: './movie-update.component.html',
  styleUrls: ['./movie-update.component.scss']
})
export class MovieUpdateComponent implements OnInit {
  @Input() movieId: number | undefined;
  @Output() refreshEvent: EventEmitter<void> = new EventEmitter();
  oldseries: IMovie | undefined;
  movie: IMovie | undefined;
  genreNames: IGenre[] = [];
  poruka: IMailData = {
    To: ["bartoloviclana@gmail.com"],
    From: "",
    DisplayName: "Updated a movie",
    ReplyTo: "bartoloviclana@gmail.com",
    ReplyToName: "Updated a movie",
    Subject: "Updated a movie",
    Body: ""
  };
  constructor(private router: Router, private _httpClient: HttpClient, private genresService: GenresService, private moviesService: MovieService, private mailService: MailService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getMovieDetails(this.movieId!);
  }
  onSubmit() {
    if (this.movie != undefined) {
      var podaci = "";
      podaci = podaci.concat("After the update : ", "id : ", this.movie.id.toString(), ", ", "name : ", this.movie.name, ", ", "genreId : ",
        this.movie.genreId.toString(), ", ", "duration : ", this.movie.durationMinutes.toString(), ", ", "datum : ", this.movie.datumString);
      pod = pod.concat(podaci);
      this.poruka.Body = pod;
    }
    this.mailService.sendMail(this.poruka).subscribe(() => {
      this.refreshEvent.emit();
    });
    this.poruka.Body="";
    if (this.movie != undefined) {
      this.moviesService.updateMovie(this.movie).subscribe(() => this.refreshEvent.emit());
    }
  }
  getMovieDetails(serieId: number) {
    this.moviesService.getMovie(serieId).subscribe((movie: IMovie) => {
      this.movie = movie;
      this.movie.datumString = this.movie.datumIzlaska.toString().substring(0, 10);
      pod = pod.concat("Before the update : ", "id : ", movie.id.toString(), ", ", "name : ", movie.name, ", ", "genreId : ",
        movie.genreId.toString(), ", ", "duration : ", movie.durationMinutes.toString(), ", ", "datum : ", movie.datumString, "<br>");
      
    })
    this.genresService.getGenres().subscribe((genres: IGenre[]) => {
      this.genreNames = genres;
      console.log(this.genreNames)
    });
  }

}
