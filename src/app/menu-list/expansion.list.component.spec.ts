import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionListComponent } from '././expansion.list.component';

describe('MenuListComponent', () => {
  let component: ExpansionListComponent;
  let fixture: ComponentFixture<ExpansionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpansionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpansionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
