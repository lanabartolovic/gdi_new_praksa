import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenresComponent } from './genres/genres.component';
import { MovieComponent } from './movies/movie.component';
import { ProjectionsComponent } from './projections/projections.component';
import { MapaComponent } from './mapa/mapa.component';

const routes: Routes = [

  {path: '', redirectTo: '/genres',pathMatch:'full'},

  {path:'movies', component:MovieComponent}, //path automatski doda slash na, pocetku

  {path: 'genres', component:GenresComponent},
  
  {path : 'projections', component : ProjectionsComponent},
  {path : 'mapa', component : MapaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
