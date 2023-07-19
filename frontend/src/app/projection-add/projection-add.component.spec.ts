import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionAddComponent } from './projection-add.component';

describe('ProjectionAddComponent', () => {
  let component: ProjectionAddComponent;
  let fixture: ComponentFixture<ProjectionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectionAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
