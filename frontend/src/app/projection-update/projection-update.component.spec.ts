import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionUpdateComponent } from './projection-update.component';

describe('ProjectionUpdateComponent', () => {
  let component: ProjectionUpdateComponent;
  let fixture: ComponentFixture<ProjectionUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectionUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
