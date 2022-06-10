import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LibraryService } from "../services/library.service";

// interface Book {
//   _id: string;
//   title: string;
//   author: string;
//   idGenre: string;
//   publishYear: string;
//   stock: number;
//   imageUrl: string;
//   description: string;
//   authorName: "";
//   genreName: "";
// }

@Component({
  selector: "app-book-detail",
  templateUrl: "./book-detail.component.html",
  styleUrls: ["./book-detail.component.css"],
})
export class BookDetailComponent implements OnInit {
  book: any = {
    _id: "",
    title: "",
    author: "",
    genre: "",
    publishYear: "",
    stock: 0,
    imageUrl: "",
    description: "",
  };
  stock: number = 0;

  requested: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private _libraryService: LibraryService
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.params.id;

    this.getBookData(id);
    this.stock = this.book.stock;
  }

  getBookData(id: string) {
    this._libraryService.getBook(id).subscribe((d) => {
      this.book = d.book;
      this.stock = d.book.stock;
    });
  }

  requestBook(id: string) {
    let bookUpdate = {
      _id: this.book._id,
      title: this.book.title,
      author: this.book.author._id,
      stock: this.book.stock - 1,
      idGenre: this.book.genre._id,
      description: this.book.description,
      imageURL: this.book.imageUrl,
      publishedYear: this.book.publishYear,
    };

    let date = new Date();

    let bookRegistry = {
      dateCheckout: date,
      dateReturn: date,
      returned: false,
      book: id,
      user: this._libraryService.userLogged,
    };

    this._libraryService.updateBook(bookUpdate).subscribe((d) => {
      this.requested = true;
    });

    this._libraryService.createBookRegistry(bookRegistry).subscribe((d) => {});
    this.getBookData(id);
    this.stock = this.book.stock;
  }
}
