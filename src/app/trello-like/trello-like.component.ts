import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgForm } from '@angular/forms';

import { UserStory } from '../interfaces/UserStory.interface';
import { NewUserStory } from '../class/NewUserStory.class'
import * as data from 'src/assets/data/MRs.json';


@Component({
  selector: 'app-trello-like',
  templateUrl: './trello-like.component.html',
  styleUrls: ['./trello-like.component.css']
})

export class TrelloLikeComponent implements OnInit {
  itemsTypeTodo: UserStory[] = [];
  itemsTypeInProgress: UserStory[] = [];
  itemsTypeDone: UserStory[] = [];
  items: UserStory[] = [];
  newUserStory: NewUserStory;
  olderItem: UserStory[] = [];
  importedData: any = (data as any).default;

  constructor() {
    this.newUserStory = new NewUserStory();
  }

  ngOnInit(): void {
    this.importedData.forEach((value: any, index: any) => {
      switch (value.status) {
        case 'to do':
          this.itemsTypeTodo.push(value);
          break;
        case 'in progress':
          this.itemsTypeInProgress.push(value);
          break;
        case 'done':
          this.itemsTypeDone.push(value);
          break;
        default:
          break;
      }
    });

    let olderOneTodo = this.itemsTypeTodo.reduce((c: any, n: any) =>
      Date.parse(n.time) < Date.parse(c.time) ? n : c
    );
    let olderoneInProgress = this.itemsTypeInProgress.reduce((c: any, n: any) =>
      Date.parse(n.time) < Date.parse(c.time) ? n : c
    );
    const olderOne = olderOneTodo.time < olderoneInProgress.time ? olderOneTodo : olderoneInProgress
    this.olderItem.push(olderOne);
  }

  countAllCards() {
    return this.itemsTypeTodo.length + this.itemsTypeInProgress.length + this.itemsTypeDone.length;
  }

  drop(event: CdkDragDrop<UserStory[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onSubmit(newItemForm: NgForm) {
    let itemToPush = this.newUserStory;
    itemToPush.name = newItemForm.value.newItem;
    this.itemsTypeTodo.push(
      itemToPush
    );
    newItemForm.reset();
  }
}
