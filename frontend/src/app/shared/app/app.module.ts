import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { AppComponent } from './app.component';
import { ListComponent } from './list.component';
import { UpvoterComponent } from './upvoter.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';


// Apollo
import { GraphQLModule } from './graphql.module';

@NgModule({
  imports: [
    BrowserModule, BrowserAnimationsModule,
    // Apollo
    GraphQLModule,
    MatPaginatorModule,
    MatTableModule
  ],
  declarations: [
    AppComponent,
    ListComponent,
    UpvoterComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {}
