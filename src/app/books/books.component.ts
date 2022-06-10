import { Component, PipeTransform, OnInit } from "@angular/core";
import { DecimalPipe } from "@angular/common";
import { FormControl } from "@angular/forms";

import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { LibraryService } from "../services/library.service";
import { Router } from "@angular/router";

interface Book {
  idbook: number;
  title: string;
  author: string;
  genre: string;
  publishedYear: string;
  stock: number;
}

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.css"],
})
export class BooksComponent implements OnInit {
  booklist: Observable<Book[]>;
  books: Book[] = [
    {
      idbook: 0,
      title:
        "Por favor filtre los libros por autor, título, género o presione 'espacio' para listar todos los libros.",
      author: "",
      genre: "",
      publishedYear: "",
      stock: 0,
    },
  ];
  filter = new FormControl("");

  constructor(
    pipe: DecimalPipe,
    private _libraryService: LibraryService,
    private router: Router
  ) {
    this.booklist = this.filter.valueChanges.pipe(
      startWith(""),
      map((text) => this.search(text, pipe))
    );
  }

  search(text: string, pipe: PipeTransform): Book[] {
    return this.books.filter((book) => {
      const term = text.toLowerCase();
      return book.title.toLowerCase().includes(term); //||
      //book.author.name.toLowerCase().includes(term)
    });
  }

  getBooks() {
    this._libraryService.getBooks().subscribe((d) => {
      this.books = d.books;
    });
  }

  details(id: number) {
    this.router.navigate(["bookdetails/" + id]);
  }

  ngOnInit() {
    if (
      !this._libraryService.isLogged &&
      this._libraryService.userLogged != ""
    ) {
      this.router.navigate([""]);
    }
    this.getBooks();

    document.getElementById("txtfilter").focus();
  }
}
