import { Author } from './types';
import { GraphqlServiceService } from './services/graphql-service.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import{MatPaginator} from'@angular/material'
export interface Post {
  id: number;
    title: string;
    votes: number;
    author: Author;
}


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],


})
export class ListComponent implements OnInit {
  posts;
  ELEMENT_DATA: Post[] 

  constructor( private graphqlSer:GraphqlServiceService) {}
  dataSource
  ngOnInit() {
this.posts=this.graphqlSer.posts
this.graphqlSer.posts.subscribe((res)=>{this.ELEMENT_DATA=res
  this.dataSource = this.ELEMENT_DATA;

})
  }
  displayedColumns: string[] = ['title', 'author.firstName', 'author.lastName','votes']
;
  
}
