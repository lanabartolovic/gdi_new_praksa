import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { IMovieTheatre } from '../shared/models/IMovieTheatre';
import { ActivatedRoute, Router } from '@angular/router';
import { GenresService } from '../shared/services/genres.service';
import { HttpClient } from '@angular/common/http';
import { MovieTheatreService } from '../shared/services/movietheatre.service';
import { IProjection } from '../shared/models/IProjection';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {

  constructor(private router: Router, private _httpClient: HttpClient, private movietheatreService: MovieTheatreService, private activatedRoute: ActivatedRoute) { }
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
  }
}
