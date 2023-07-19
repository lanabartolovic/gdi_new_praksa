import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IGenre } from '../shared/models/IGenre';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { IMailData } from '../shared/models/IMailData';
import { MailService } from '../shared/services/mail.service';
import { GenresService } from '../shared/services/genres.service';



@Component({
  selector: 'app-genre-update',
  templateUrl: './genre-update.component.html',
  styleUrls: ['./genre-update.component.scss']
})
export class GenreUpdateComponent implements OnInit {

  @Input() genreId: number | undefined;
  @Output() refreshEvent: EventEmitter<void> = new EventEmitter();

  genre: IGenre | undefined;
  poruka: IMailData = {
    To: ["bartoloviclana@gmail.com"],
    From: "",
    DisplayName: "Added a new genre",
    ReplyTo: "bartoloviclana@gmail.com",
    ReplyToName: "New genre added",
    Subject: "New genre added",
    Body: ""
  };
  constructor(private router: Router, private _httpClient: HttpClient, private genresService: GenresService, private mailService: MailService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getGenreDetails(this.genreId!);
  }
  onSubmit(){
    if(this.genre!=undefined){
      var podaci="";
      podaci=podaci.concat("After the update : id: ", this.genre.id.toString(), ", name of genre: ", this.genre.name);
      this.poruka.Body=podaci;
      this.mailService.sendMail(this.poruka).subscribe(()=>this.refreshEvent.emit());
      this.genresService.updateGenre(this.genre).subscribe(()=>this.refreshEvent.emit());
    }
  }
  getGenreDetails(genreId: number) {

    this.genresService.getGenre(genreId).subscribe((genre: IGenre) => {
        this.genre = genre;
        var podaci="";
        podaci=podaci.concat("Before the update : id: ", genre.id.toString(), ", name of genre: ", genre.name, "<br>");
        this.poruka.Body=podaci;
    })

}
}
