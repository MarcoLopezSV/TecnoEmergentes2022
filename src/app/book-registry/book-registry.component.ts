import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LibraryService } from "../services/library.service";

@Component({
  selector: "app-book-registry",
  templateUrl: "./book-registry.component.html",
  styleUrls: ["./book-registry.component.css"],
})
export class BookRegistryComponent implements OnInit {
  bookregistries: any = [];
  showReturnedBooks: boolean = false;

  constructor(
    private _libraryService: LibraryService,
    private router: Router
  ) {}

  ngOnInit() {
    if (
      !this._libraryService.isLogged &&
      this._libraryService.rolLogged != "Administrador"
    ) {
      this.router.navigate([""]);
    }
    this.getRegistries();
  }

  showReturned(event) {
    this.showReturnedBooks = event.target.checked;
  }

  returnBook(idBookRegistry: any) {
    var idBookToReturn = "";
    this._libraryService.getBookRegistry(idBookRegistry).subscribe((d) => {
      var bookRegistry = {
        _id: idBookRegistry,
        user: d.bookregistry.user._id,
        book: d.bookregistry.book._id,
        dateCheckout: d.bookregistry.dateCheckout,
        dateReturn: new Date(),
        returned: true,
      };
      idBookToReturn = d.bookregistry.book._id;
      this._libraryService.returnToLibrary(bookRegistry).subscribe((d) => {
        this._libraryService.getBook(idBookToReturn).subscribe((d) => {
          let bookUpdate = {
            _id: d.book._id,
            title: d.book.title,
            author: d.book.author._id,
            stock: d.book.stock + 1,
            idGenre: d.book.genre._id,
            description: d.book.description,
            imageURL: d.book.imageUrl,
            publishedYear: d.book.publishYear,
          };

          this._libraryService.updateBook(bookUpdate).subscribe((d) => {});
        });
        this.getRegistries();
      });
    });
  }

  getRegistries() {
    this._libraryService.getBookRegistries().subscribe((d) => {
      this.bookregistries = d.bookregistries;
    });
  }
}
