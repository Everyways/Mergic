import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgForm } from '@angular/forms';

import { IMergicApp } from '../interfaces/IMergicApp.interface';
import { IUserStory } from '../interfaces/IUserStory.interface';
import { NewUserStory } from '../class/NewUserStory.class';
import { MergicService } from '../services/Mergic.service';

import * as data from 'src/assets/data/MRs.json';


@Component({
  selector: 'app-trello-like',
  templateUrl: './trello-like.component.html',
  styleUrls: ['./trello-like.component.css']
})

export class TrelloLikeComponent implements OnInit {
  appInfo: any;
  itemsTypeTodo: IUserStory[] = [];
  itemsTypeInProgress: IUserStory[] = [];
  itemsTypeDone: IUserStory[] = [];
  items: IUserStory[] = [];
  newUserStory: NewUserStory;
  olderItem: IUserStory[] = [];
  importedData: any = (data as any).default;
  currentQueue: any;
  appData: any;
  appQueue: any;
  appQueueConf: any;
  loading: boolean = false;
  errorMessage: any;

  constructor(private mergicService: MergicService) {

    this.getMergicAppInfo();
    this.getMergicQueue();
    this.getMergicQueueConfig();
    this.newUserStory = new NewUserStory();
  }

  getMergicAppInfo() {
    this.loading = true;
    this.errorMessage = "";
    this.mergicService.getAppInfos().subscribe((response) => {
      console.log('response received')
      this.appData = response;
    },
      (error: any) => {
        console.error('Request failed with error');
        this.errorMessage = error;
        this.loading = false;
      },
      () => {
        console.error('Request completed');
        this.loading = false;
      });
  }

  getMergicQueue() {
    this.mergicService.getQueue().subscribe((responseQ) => {
      console.log('responseQ received', responseQ);
      this.appQueue = responseQ;
    },
      (error: any) => {
        console.error('Request failed with error');
        this.errorMessage = error;
      },
      () => {
        console.error('Request completed');
      });
  }

  getMergicQueueConfig() {
    this.mergicService.getQueueConfig().subscribe((responseQC) => {
      console.log('responseQC received', responseQC);
      this.appQueueConf = responseQC;
    },
      (error: any) => {
        console.error('Request failed with error');
        this.errorMessage = error;
      },
      () => {
        console.error('Request completed');
      });
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

  drop(event: CdkDragDrop<IUserStory[]>) {
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
