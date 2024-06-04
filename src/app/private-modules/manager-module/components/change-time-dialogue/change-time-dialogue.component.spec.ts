import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTimeDialogueComponent } from './change-time-dialogue.component';

describe('ChangeTimeDialogueComponent', () => {
  let component: ChangeTimeDialogueComponent;
  let fixture: ComponentFixture<ChangeTimeDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeTimeDialogueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeTimeDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
