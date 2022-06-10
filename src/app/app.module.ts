import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import {
  NgbAlertModule,
  NgbModule,
  NgbPaginationModule,
} from "@ng-bootstrap/ng-bootstrap";
import { DecimalPipe } from "@angular/common";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { HomeComponent } from "./home/home.component";
import { CounterComponent } from "./counter/counter.component";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";
import { BooksComponent } from "./books/books.component";
import { UsersComponent } from "./users/users.component";
import { BookComponent } from "./book/book.component";
import { BookDetailComponent } from "./book-detail/book-detail.component";
import { BookRegistryComponent } from "./book-registry/book-registry.component";
import { GendersComponent } from "./genders/genders.component";
import { AuthorsComponent } from "./authors/authors.component";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    BooksComponent,
    UsersComponent,
    BookComponent,
    BookDetailComponent,
    BookRegistryComponent,
    GendersComponent,
    AuthorsComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "counter", component: CounterComponent },
      { path: "fetch-data", component: FetchDataComponent },
      { path: "books", component: BooksComponent },
      { path: "bookdetails/:id", component: BookDetailComponent },
      { path: "bookregistry", component: BookRegistryComponent },
      { path: "book", component: BookComponent },
      { path: "users", component: UsersComponent },
      { path: "authors", component: AuthorsComponent },
      { path: "genders", component: GendersComponent },
    ]),
  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
