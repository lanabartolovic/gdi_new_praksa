import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../shared/services/movies.service';
import { IMovie } from '../shared/models/IMovie';
import { MovieUpdateComponent } from '../movie-update/movie-update.component';
import { GenresService } from '../shared/services/genres.service';
import { IGenre } from '../shared/models/IGenre';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  @ViewChild(MovieUpdateComponent) update!: MovieUpdateComponent;
  series: IMovie[] = [];
  movieId: number | undefined;
  displayedColumns: string[] = ['id', 'name', 'genreName', 'datumIzlaska', 'durationMinutes', 'update', 'delete'];
  edit: boolean = false;
  add: boolean = false;
  constructor(private router: Router, private _httpClient: HttpClient, private moviesService: MovieService, private genresService: GenresService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.moviesService.getMovies().subscribe({
      next: series => {
        this.series = series;
        for (var film of this.series) {
          this.genresService.getGenre(film.genreId).subscribe((genre: IGenre) => {
            film.GenreName = genre.name
          });
        }
      },
      error: err => {
        console.log('getSensors subscribe -> error notification');
      },
      complete() {
      }
    })
  }
  onUpdateClick(serieId: number) {
    if (this.add == true) {
      this.add = false;
    }
    if (this.movieId == serieId && this.edit == true) {
      this.edit = false;

    }
    else {
      this.edit = true;
      this.movieId = serieId;
      this.update.getMovieDetails(serieId);
    }

  }
  onDeleteClick(serieId: number) {
    if (this.edit == true && this.movieId == serieId) {
      this.edit = false;
    }

    this.moviesService.deleteMovie(serieId).subscribe(() => {
      const index = this.series.indexOf(this.series.find(x => x.id == serieId)!, 0);
      if (index > -1) {
        this.series.splice(index, 1);
      }


      this.series = [...this.series];
      //alert(`Sensor with id: ${serieId} has been successfully deleted.`);
    });

  }
  onAddClick() {
    if (this.edit == true) {
      this.edit = false;
    }
    if (this.add == false) {
      this.add = true;
    }
    else {
      this.add = false;
    }
  }
  refreshEvent() {
    this.edit = false;
    this.add = false;
    this.getData();
  }
}
//servisi komuniciraju sa socketom (kako bi dobili metode backenda) koji komunicira s backendom
//servis je .ts file
//ima onoliko servis filea koliko ima komponenti
/*
environment file ne zaboraviti staviti kod urla na kraju /

models u shared je za interface koji služe za parsiranje podataka s backenda na frontend jer ne mozemo koristit direktno s backenda,
treba bit doslovno isto samo eto 

u servise unutar parametara konstruktora dodati:
private http:HttpClient

.spec.ts je nebitan ne dirat to

sintaksa npr. private ime:tip

kad hocemo nesto iz baze, tj bilokoja swagger metoda, treba se na nju subscribe
*/