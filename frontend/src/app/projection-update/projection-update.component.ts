import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovieService } from '../shared/services/movies.service';
import { IMovie } from '../shared/models/IMovie';
import { IProjection } from '../shared/models/IProjection';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectionsService } from '../shared/services/projections.service';
@Component({
  selector: 'app-projection-update',
  templateUrl: './projection-update.component.html',
  styleUrls: ['./projection-update.component.scss']
})
export class ProjectionUpdateComponent implements OnInit {
  @Input() projectionId: number | undefined;
  @Output() refreshEvent: EventEmitter<void> = new EventEmitter();
  projection: IProjection | undefined;
  constructor(private router: Router, private _httpClient: HttpClient, private projectionService: ProjectionsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProjectionDetails(this.projectionId!);
  }

  getProjectionDetails(id: number) {
    this.projectionService.getProjection(id).subscribe((projection: IProjection) => {
      this.projection = projection;
    });
  }

  onSubmit(){
    if (this.projection != undefined) {
      this.projectionService.updateProjection(this.projection).subscribe(() => this.refreshEvent.emit());
    }
  }
}
