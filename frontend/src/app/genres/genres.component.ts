import { Component, OnInit, ViewChild } from '@angular/core';
import { IGenre } from '../shared/models/IGenre';
import { MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { GenresService } from '../shared/services/genres.service';
import { Observable } from 'rxjs';
import { GenreUpdateComponent } from '../genre-update/genre-update.component';
@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
  @ViewChild(GenreUpdateComponent) update!: GenreUpdateComponent;
  genres: IGenre[] = [];
  genreId: number | undefined;
  displayedColumns: string[] = ['id', 'name', 'update', 'delete'];
  edit: boolean = false;
  add: boolean = false;
  constructor(private router: Router, private _httpClient: HttpClient, private genresService: GenresService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.genresService.getGenres().subscribe({
      next: genres => {
        this.genres = genres;
        
      },
      error: err => {
        console.log('getSensors subscribe -> error notification');
      },
      complete() {
        
      }
    })
  }
  onUpdateClick(genreId: number) {
    if(this.add==true){
      this.add=false;
    }
    if (this.genreId == genreId && this.edit == true) {
      this.edit = false;
    }
    else {
      this.edit = true;
      this.genreId = genreId;
      this.update.getGenreDetails(this.genreId);
    }

  }
  onDeleteClick(genreId: number) {
    if(this.edit==true && this.genreId == genreId){
      this.edit=false;
    }
       
      this.genresService.deleteGenre(genreId).subscribe(()=>{
        const index = this.genres.indexOf(this.genres.find(x => x.id == genreId)!, 0);
            if (index > -1) {
              this.genres.splice(index, 1);
            }
      
      
            this.genres = [...this.genres];
            //alert(`Sensor with id: ${genreId} has been successfully deleted.`);
      });

  }
onAddClick(){
  if(this.edit==true){
    this.edit=false;
  }
if(this.add==false){
this.add=true;
}
else{
  this.add=false;
}
}
  refreshEvent() {
    this.edit = false;
    this.add=false;
    this.getData();
  }
}
