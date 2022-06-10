import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LibraryService } from "../services/library.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _libraryService: LibraryService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ["", Validators.email],
      password: [""],
    });
  }

  ngOnInit(): void {}

  login() {
    const credentials: any = {
      email: this.form.get("email").value,
      password: this.form.get("password").value,
    };

    this._libraryService.getLogin(credentials).subscribe((d) => {
      if (d.loginStatus == "ok") {
        this._libraryService.isLogged = true;
        this._libraryService.userLogged = d.user._id;
        this._libraryService.rolLogged = d.user.rol.name;
        if (d.user.rol.name == "Administrador") {
          this.router.navigate(["bookregistry"]);
        } else if (d.user.rol.name == "Cliente") {
          this.router.navigate(["books"]);
        } else {
          console.log("Error");
        }
      }
    });

    this.form.reset();
  }
}
