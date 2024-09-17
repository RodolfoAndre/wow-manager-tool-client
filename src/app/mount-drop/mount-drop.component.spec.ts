import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MountDropComponent } from './mount-drop.component';

describe('MountDropComponent', () => {
  let component: MountDropComponent;
  let fixture: ComponentFixture<MountDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MountDropComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MountDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
