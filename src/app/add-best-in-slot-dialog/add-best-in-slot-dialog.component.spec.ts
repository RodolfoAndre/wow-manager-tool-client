import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBestInSlotDialogComponent } from './add-best-in-slot-dialog.component';

describe('AddBestInSlotDialogComponent', () => {
  let component: AddBestInSlotDialogComponent;
  let fixture: ComponentFixture<AddBestInSlotDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBestInSlotDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBestInSlotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
