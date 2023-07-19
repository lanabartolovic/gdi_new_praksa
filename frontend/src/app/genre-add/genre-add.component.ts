import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IDropdown } from '../shared/models/IDropdown';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { IMailData } from '../shared/models/IMailData';
import { MailService } from '../shared/services/mail.service';
import { IGenre } from '../shared/models/IGenre';
import { GenresService } from '../shared/services/genres.service';

@Component({
  selector: 'app-genre-add',
  templateUrl: './genre-add.component.html',
  styleUrls: ['./genre-add.component.scss']
})
export class GenreAddComponent implements OnInit {
  @Output() refreshEvent: EventEmitter<void> = new EventEmitter();

genre : IGenre={
  id:0,
  name:""
};
poruka: IMailData = {
  To: ["bartoloviclana@gmail.com"],
  From: "",
  DisplayName: "Added a new genre",
  ReplyTo: "bartoloviclana@gmail.com",
  ReplyToName: "New genre added",
  Subject: "New genre added",
  Body: ""
};
  constructor(private router: Router, private _httpClient: HttpClient, private genreService: GenresService, private activatedRoute: ActivatedRoute, private mailService: MailService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    var pod="";
    pod=pod.concat("Added a new genre! id: ",this.genre.id.toString(), ", name: " ,this.genre.name);
    this.poruka.Body=pod;
    this.mailService.sendMail(this.poruka).subscribe(()=>{
      this.refreshEvent.emit();
    });
    this.genreService.addGenre(this.genre).subscribe(()=>{
      this.refreshEvent.emit();
    });
  }
}
