import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MovieTheatreService } from '../shared/services/movietheatre.service';
import { IFirstProjection } from '../shared/models/IFirstProjection';
import { FirstProjectionService } from '../shared/services/firstprojection.service';
import { IMovieTheatre } from '../shared/models/IMovieTheatre';
import { IProjection } from '../shared/models/IProjection';
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {

  constructor(private router: Router, private _httpClient: HttpClient,
    private movietheatreService: MovieTheatreService, private firstProjectionService: FirstProjectionService, private activatedRoute: ActivatedRoute) { }
    
  //nacin pomocu view-a
  projections: IFirstProjection[] = [];
  ngOnInit(): void {
    this.getData();
  }

  initializeMap(): void {
    const latitude = 45.815399;
    const longitude = 15.966568;
    const coordinates: L.LatLngExpression = [latitude, longitude]; //za koordinate prikaza

    const map = L.map('map').setView(coordinates, 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    }).addTo(map);

    const markers: L.Marker[] = [];
    this.projections.forEach(x => this.addMarkerToMap(map, x))
  }

  addMarkerToMap(map: L.Map, projekcija: IFirstProjection): void {
    const marker = L.marker([projekcija.lat, projekcija.long]);

// this.firstProjectionService.getCinemasFirstProjections(projekcija.movieTheatreId).subscribe(
//   (projection: IFirstProjection) => {
//     const popupContent = `<div>
//     <strong>${projection.movieTheatreName}</strong><br>
//     ${projection.movieName}
//   </div>`;
//     marker.bindPopup(popupContent).openPopup();
//     marker.addTo(map);
//   }
// );

    const popupContent = `<div>
    <strong>${projekcija.movieTheatreName}</strong><br>
    ${projekcija.movieName}
    </div>`;
    marker.bindPopup(popupContent).openPopup();
    marker.addTo(map);
  }

  getData() {
    this.firstProjectionService.getFirstProjections().subscribe({
      next: genres => {
        this.projections = genres;
        this.initializeMap();
      },
      error: err => {
        console.log('getSensors subscribe -> error notification');
      },
      complete() {
      }
    })
  } 
  /*
  //nacin pomocu obicnih tablica
theatres: IMovieTheatre[] = [];
ngOnInit(): void {
  this.getData();
}
initializeMap(): void {
  const latitude = 45.815399;
  const longitude = 15.966568;
  const coordinates: L.LatLngExpression = [latitude, longitude]; //za koordinate prikaza

  const map = L.map('map').setView(coordinates, 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
  }).addTo(map);

  const markers: L.Marker[] = [];

  for (let i = 0; i < this.theatres.length; i++) {
    if (this.theatres.at(i) != null) {
      this.addMarkerToMap(map, this.theatres.at(i)!);
    }

  }

}
addMarkerToMap(map: L.Map, arg1: IMovieTheatre):void {
  const marker = L.marker([arg1.lat, arg1.long]);

this.movietheatreService.getFirstProjection(arg1.id).subscribe((projection: IProjection) => {
  const popupContent = `<div>
  <strong>${arg1.name}</strong><br>
  ${projection.movieName}
</div>`;
  marker.bindPopup(popupContent).openPopup();
  marker.addTo(map);
});
}
getData() {
  this.movietheatreService.getTheatres().subscribe({
    next: genres => {
      this.theatres = genres;

      this.initializeMap();
    },
    error: err => {
      console.log('getSensors subscribe -> error notification');
    },
    complete() {

    }
  })
}*/
}
