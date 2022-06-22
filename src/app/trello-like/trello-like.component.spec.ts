import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrelloLikeComponent } from './trello-like.component';

describe('TrelloLikeComponent', () => {
  let component: TrelloLikeComponent;
  let fixture: ComponentFixture<TrelloLikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrelloLikeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrelloLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
