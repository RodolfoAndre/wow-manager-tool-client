import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCharacterDialogComponent } from './add-new-character-dialog.component';

describe('AddNewCharacterComponent', () => {
  let component: AddNewCharacterDialogComponent;
  let fixture: ComponentFixture<AddNewCharacterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewCharacterDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewCharacterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
