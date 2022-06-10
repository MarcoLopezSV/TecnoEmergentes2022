import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { LibraryService } from "../services/library.service";

@Component({
  selector: "app-book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.css"],
})
export class BookComponent implements OnInit {
  books: any = [];
  genres: any = [];
  authors: any[];
  form: FormGroup;
  errorMessage: string;
  title: string = "Agregar Libro";
  isEditing: boolean = false;
  editbookid: any;

  constructor(
    private _libraryService: LibraryService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: "",
      author: "",
      stock: "",
      publishedYear: "",
      idGenre: "",
      imageURL: "",
      description: "",
    });
  }

  ngOnInit() {
    if (
      !this._libraryService.isLogged &&
      this._libraryService.rolLogged != "Adminsitrator"
    ) {
      this.router.navigate([""]);
    }
    this.getBooklist();
    this.getGenres();
    this.getAuthors();
  }

  editbtn(book: any) {
    this.title = "Editar libro";
    this.form.controls["title"].setValue(book.title);
    this.form.controls["author"].setValue(book.author._id);
    this.form.controls["stock"].setValue(book.stock);
    this.form.controls["publishedYear"].setValue(book.publishYear);
    this.form.controls["idGenre"].setValue(book.genre._id);
    this.form.controls["imageURL"].setValue(book.imageUrl);
    this.form.controls["description"].setValue(book.description);
    this.editbookid = book._id;
    this.isEditing = true;
  }

  deletebtn(book: any) {
    this._libraryService.deleteBook(book).subscribe((d) => {
      alert(book.title + " eliminado");
      this.getBooklist();
    });
  }

  getBooklist() {
    this._libraryService.getBooks().subscribe((d) => {
      this.books = d.books;
    });
  }

  getGenres() {
    this._libraryService.getGenres().subscribe((d) => {
      this.genres = d.genres;
    });
  }

  getAuthors() {
    this._libraryService.getAuthors().subscribe((d) => {
      this.authors = d.authors;
    });
  }

  saveBook() {
    if (this.isEditing) {
      this.errorMessage = "";
      let book = this.form.value;
      book._id = this.editbookid;
      let errorQ = false;
      if (!book.title) {
        this.errorMessage = "No hay título";
        errorQ = true;
      }
      if (!book.author) {
        this.errorMessage += "No hay autor";
        errorQ = true;
      }
      if (!book.stock) {
        this.errorMessage += "No hay cantidad de existencia";
        errorQ = true;
      }
      if (!book.publishedYear) {
        this.errorMessage += "Seleccione una fecha de publicación";
        errorQ = true;
      }
      if (!book.idGenre) {
        this.errorMessage += "Seleccione género";
        errorQ = true;
      }
      if (!errorQ) {
        this._libraryService.updateBook(book).subscribe((d) => {
          this.isEditing = false;
          this.title = "Agregar Libro";
          this.form.reset();
          this.getBooklist();
        });
      }
    } else {
      this.errorMessage = "";
      let book = this.form.value;
      let errorQ = false;
      if (!book.title) {
        this.errorMessage = "No hay título";
        errorQ = true;
      }
      if (!book.author) {
        this.errorMessage += "No hay autor";
        errorQ = true;
      }
      if (!book.stock) {
        this.errorMessage += "No hay cantidad de existencia";
        errorQ = true;
      }
      if (!book.publishedYear) {
        this.errorMessage += "Seleccione una fecha de publicación";
        errorQ = true;
      }
      if (!book.idGenre) {
        this.errorMessage += "Seleccione género";
        errorQ = true;
      }
      if (!errorQ) {
        this._libraryService.createBook(book).subscribe((d) => {
          this.form.reset();
          this.getBooklist();
        });
      }
    }
  }
}
