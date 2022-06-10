import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { LibraryService } from "../services/library.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  users: any = [];
  rols: any = [];
  students: any = [];
  librarians: any = [];
  form: FormGroup;
  errorMessage: string;

  constructor(
    private _libraryService: LibraryService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      firstName: "",
      lastName: "",
      idRol: "",
      email: "",
      password: "",
    });
  }

  ngOnInit() {
    this.getUsers();
    this.getRols();
    this.getStudents();
    this.getLibrarians();
  }

  getUsers() {
    this._libraryService.getUsers().subscribe((d) => {
      this.users = d.users;
    });
  }

  getRols() {
    this._libraryService.getRols().subscribe((d) => {
      this.rols = d.roles;
    });
  }

  getStudents() {
    this._libraryService.getStudents().subscribe((d) => {
      this.students = d;
    });
  }

  getLibrarians() {
    this._libraryService.getLibrarians().subscribe((d) => {
      this.librarians = d;
    });
  }

  saveUser() {
    this.errorMessage = "";
    let user = this.form.value;
    user.idRol = parseInt(user.idRol);
    let errorQ = false;

    if (!user.firstName) {
      this.errorMessage = "No first name ";
      errorQ = true;
    }
    if (!user.lastName) {
      this.errorMessage += "No last name ";
      errorQ = true;
    }
    if (!user.idRol) {
      user.idRol = this.rols.find((r) => r.name == "Cliente")._id;
    }
    if (!user.email) {
      this.errorMessage += "No email ";
      errorQ = true;
    }
    if (!user.password) {
      this.errorMessage += "No Password ";
      errorQ = true;
    }
    if (!errorQ) {
      this._libraryService.createUser(user).subscribe((d) => {
        this.form.reset();
        this.getUsers();
      });
    }
  }
}
