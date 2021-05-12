import { GraphqlService} from './../../services/graphql-service.service';
import { User,Post } from './../../types';
import { Component, OnInit,ViewChild, AfterViewInit,OnChanges } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, AfterViewInit,OnChanges {
  postForm: FormGroup;






  displayedColumns = ['id', 'title', 'body'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;

posts:Post[]
  constructor(private graphSer:GraphqlService) { }

  ngOnInit() {
    this.postForm = new FormGroup({
      id: new FormControl('', {validators: [Validators.required]  }),
       post: new FormControl('', { validators: [Validators.required]}),
      title: new FormControl('', { validators: [Validators.required] })
    });



this.graphSer.posts().subscribe(res=>{this.dataSource.data=res.data.posts.data; })

  }



  onSubmit() {
    console.log(this.postForm.value)
    this.graphSer.updatedPost(this.postForm.value.id,this.postForm.value.title, this.postForm.value.post).subscribe(
      res=>{console.log(res.data.updatePost); if(!res){
        return;
      } }
    );
  }

  delete(id:number){
    console.log(id)
this.graphSer.deletePost(id).subscribe(res=>{
  this.dataSource.data=this.dataSource.data.filter(post =>post.id!==res.data.deletePost.id)
})}

  addPost(){
    this.graphSer.addPost(this.postForm.value.id,this.postForm.value.title, this.postForm.value.post).subscribe(
      res=>{this.dataSource.data.push(res.data.addPost)}
    )
    
    ;this.postForm.reset();
  }

  ngAfterViewInit() {
    
    this.dataSource.paginator = this.paginator;
  }
  ngOnChanges(){
  }
}
