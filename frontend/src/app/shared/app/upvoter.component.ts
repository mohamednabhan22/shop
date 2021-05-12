import { GraphqlServiceService } from './services/graphql-service.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-upvoter',
  template: `
    <button class="btn btn-primary" (click)="upvote()">
      Upvote
    </button>
  `
})
export class UpvoterComponent {
  @Input() postId: number;

  constructor(private graphSer:GraphqlServiceService) {}

  upvote() {
    this.graphSer.upvote(this.postId)
}}