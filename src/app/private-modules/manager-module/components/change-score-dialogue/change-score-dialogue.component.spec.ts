import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeScoreDialogueComponent } from './change-score-dialogue.component';

describe('ChangeScoreDialogueComponent', () => {
  let component: ChangeScoreDialogueComponent;
  let fixture: ComponentFixture<ChangeScoreDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeScoreDialogueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeScoreDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
