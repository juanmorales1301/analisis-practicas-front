import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JefeComponent } from './jefe.component';

describe('JefeComponent', () => {
  let component: JefeComponent;
  let fixture: ComponentFixture<JefeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JefeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JefeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
