import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestInSlotManagerComponent } from './best-in-slot-manager.component';

describe('BestInSlotManagerComponent', () => {
  let component: BestInSlotManagerComponent;
  let fixture: ComponentFixture<BestInSlotManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestInSlotManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestInSlotManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
