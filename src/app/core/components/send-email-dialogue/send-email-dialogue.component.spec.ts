import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendEmailDialogueComponent } from './send-email-dialogue.component';

describe('SendEmailDialogueComponent', () => {
  let component: SendEmailDialogueComponent;
  let fixture: ComponentFixture<SendEmailDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SendEmailDialogueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SendEmailDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
