import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { LibraryService } from "../services/library.service";

@Component({
  selector: "app-authors",
  templateUrl: "./authors.component.html",
  styleUrls: ["./authors.component.css"],
})
export class AuthorsComponent implements OnInit {
  authors: any = [];
  form: FormGroup;
  errorMessage: string;
  title: string = "Agregar autor";
  isEditing: boolean = false;
  editauthorid: any;

  constructor(
    private _libraryService: LibraryService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: "",
    });
  }

  ngOnInit() {
    if (
      !this._libraryService.isLogged &&
      this._libraryService.rolLogged != "Adminsitrator"
    ) {
      this.router.navigate([""]);
    }
    this.getAuthors();
  }

  editbtn(author: any) {
    this.title = "Editar Autor";
    this.form.controls["name"].setValue(author.name);
    this.editauthorid = author._id;
    this.isEditing = true;
  }

  deletebtn(author: any) {
    this._libraryService.deleteAuthor(author).subscribe((d) => {
      alert(author.name + " eliminado");
      this.getAuthors();
    });
  }

  getAuthors() {
    this._libraryService.getAuthors().subscribe((d) => {
      this.authors = d.authors;
    });
  }

  saveAuthor() {
    if (this.isEditing) {
      this.errorMessage = "";
      let author = this.form.value;
      author._id = this.editauthorid;
      let errorQ = false;
      if (!author.name) {
        this.errorMessage = "Campo vacío";
        errorQ = true;
      }
      if (!errorQ) {
        this._libraryService.updateAuthor(author).subscribe((d) => {
          this.isEditing = false;
          this.title = "Agregar autor";
          this.form.reset();
          this.getAuthors();
        });
      }
    } else {
      this.errorMessage = "";
      let author = this.form.value;
      let errorQ = false;
      if (!author.name) {
        this.errorMessage = "Campo vacío";
        errorQ = true;
      }
      if (!errorQ) {
        this._libraryService.createAuthor(author).subscribe((d) => {
          this.form.reset();
          this.getAuthors();
        });
      }
    }
  }
}
