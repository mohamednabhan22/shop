import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// Apollo
import { ApolloBoostModule, APOLLO_BOOST_CONFIG } from 'apollo-angular-boost';

const uri = 'https://graphql-voter-app.herokuapp.com/';

@NgModule({
  exports: [
    HttpClientModule,
    ApolloBoostModule,
  ],
  providers: [{
    provide: APOLLO_BOOST_CONFIG,
    useValue: {
      uri
    }
  }]
})
export class GraphQLModule { }
