import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { LibraryService } from "../services/library.service";

@Component({
  selector: "app-genders",
  templateUrl: "./genders.component.html",
  styleUrls: ["./genders.component.css"],
})
export class GendersComponent implements OnInit {
  genres: any = [];
  form: FormGroup;
  errorMessage: string;
  title: string = "Agregar género";
  isEditing: boolean = false;
  editgenreid: any;

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
    this.getGenres();
  }

  editbtn(genre: any) {
    this.title = "Editar Género";
    this.form.controls["name"].setValue(genre.name);
    this.editgenreid = genre._id;
    this.isEditing = true;
  }

  deletebtn(genre: any) {
    this._libraryService.deleteGender(genre).subscribe((d) => {
      alert(genre.name + " eliminado");
      this.getGenres();
    });
  }

  getGenres() {
    this._libraryService.getGenres().subscribe((d) => {
      this.genres = d.genres;
    });
  }

  saveGender() {
    if (this.isEditing) {
      this.errorMessage = "";
      let genre = this.form.value;
      genre._id = this.editgenreid;
      let errorQ = false;
      if (!genre.name) {
        this.errorMessage = "No hay nombre de género";
        errorQ = true;
      }
      if (!errorQ) {
        this._libraryService.updateGender(genre).subscribe((d) => {
          this.isEditing = false;
          this.title = "Agregar Género";
          this.form.reset();
          this.getGenres();
        });
      }
    } else {
      this.errorMessage = "";
      let genre = this.form.value;
      let errorQ = false;
      if (!genre.name) {
        this.errorMessage = "No hay nombre de género";
        errorQ = true;
      }
      if (!errorQ) {
        this._libraryService.createGender(genre).subscribe((d) => {
          this.form.reset();
          this.getGenres();
        });
      }
    }
  }
}
