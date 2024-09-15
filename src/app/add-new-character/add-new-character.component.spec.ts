import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCharacterComponent } from './add-new-character.component';

describe('AddNewCharacterComponent', () => {
  let component: AddNewCharacterComponent;
  let fixture: ComponentFixture<AddNewCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewCharacterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
