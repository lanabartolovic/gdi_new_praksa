import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieComponent } from './movies/movie.component';
import { GenresComponent } from './genres/genres.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table'  
import { HttpClientModule } from '@angular/common/http';
import { GenreUpdateComponent } from './genre-update/genre-update.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { GenreAddComponent } from './genre-add/genre-add.component';
import { MovieUpdateComponent } from './movie-update/movie-update.component';
import { MovieAddComponent } from './movie-add/movie-add.component';
import {MatSelectModule} from '@angular/material/select';
import { ProjectionsComponent } from './projections/projections.component';
import { ProjectionUpdateComponent } from './projection-update/projection-update.component';
import { ProjectionAddComponent } from './projection-add/projection-add.component';
import { MapaComponent } from './mapa/mapa.component';
@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    GenresComponent,
    GenreUpdateComponent,
    GenreAddComponent,
    MovieUpdateComponent,
    MovieAddComponent,
    ProjectionsComponent,
    ProjectionUpdateComponent,
    ProjectionAddComponent,
    MapaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    HttpClientModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } //appmodule glupi daje ovo imports na koristenje
