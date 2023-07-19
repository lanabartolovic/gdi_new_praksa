import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../shared/services/movies.service';
import { IProjection } from '../shared/models/IProjection';
import { MovieUpdateComponent } from '../movie-update/movie-update.component';
import { ProjectionsService } from '../shared/services/projections.service';
import { ProjectionUpdateComponent } from '../projection-update/projection-update.component';

@Component({
  selector: 'app-projections',
  templateUrl: './projections.component.html',
  styleUrls: ['./projections.component.scss']
})
export class ProjectionsComponent implements OnInit {
  @ViewChild(ProjectionUpdateComponent) update!: ProjectionUpdateComponent;
projections : IProjection[] =[];
edit : boolean = false;
add:boolean = false;
projectionId : number | undefined;
displayedColumns: string[] = ['id', 'movietheatreId', 'movieId', 'projectiondatetime', 'projectiontype', 'update', 'delete'];
  constructor(private router: Router, private _httpClient: HttpClient, private projectionsService: ProjectionsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.projectionsService.getProjections().subscribe({
      next: series => {
        this.projections = series;
      },
      error: err => {
        console.log('getProjections subscribe -> error notification');
      },
      complete() {
        //console.log('getProjections subscribe -> complete notification');
      }
    });
  }
  onUpdateClick(serieId: number) {
    if(this.add==true){
      this.add=false;
    }
    if (this.projectionId == serieId && this.edit == true) {
      this.edit = false;
      
    }
    else {
      this.edit = true;
      this.projectionId = serieId;
      this.update.getProjectionDetails(serieId);
    }

  }
  onDeleteClick(serieId: number) {
    if(this.edit==true && this.projectionId == serieId){
      this.edit=false;
    }
       
      this.projectionsService.deleteProjection(serieId).subscribe(()=>{
        const index = this.projections.indexOf(this.projections.find(x => x.id == serieId)!, 0);
            if (index > -1) {
              this.projections.splice(index, 1);
            }
      
      
            this.projections = [...this.projections];
            //alert(`Sensor with id: ${serieId} has been successfully deleted.`);
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
