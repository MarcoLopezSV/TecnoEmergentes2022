import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LibraryService {
  //private apiUrl = "https://myulibrary20220211043256.azurewebsites.net/api/";
  private apiUrl = "http://localhost:3000/api/";
  isLogged: boolean = false;
  rolLogged: string = "";
  userLogged: string = "";

  constructor(private http: HttpClient) {}

  options = {
    headers: new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    ),
  };

  getLogin(credentials: any): Observable<any> {
    let body = new URLSearchParams();
    body.set("email", credentials.email);
    body.set("password", credentials.password);
    return this.http.post(
      this.apiUrl + "users/login",
      body.toString(),
      this.options
    );
  }

  getBooks(): Observable<any> {
    return this.http.get(this.apiUrl + "books");
  }

  getBookRegistries(): Observable<any> {
    return this.http.get(this.apiUrl + "library");
  }

  getBookRegistry(id: number): Observable<any> {
    return this.http.get(this.apiUrl + "library/" + id);
  }

  getBook(id: string): Observable<any> {
    return this.http.get(this.apiUrl + "books/" + id);
  }

  getGenres(): Observable<any> {
    return this.http.get(this.apiUrl + "genres");
  }

  getAuthors(): Observable<any> {
    return this.http.get(this.apiUrl + "authors");
  }

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl + "users");
  }

  getRols(): Observable<any> {
    return this.http.get(this.apiUrl + "roles");
  }

  getStudents(): Observable<any> {
    return this.http.get(this.apiUrl + "Users/Students");
  }

  getLibrarians(): Observable<any> {
    return this.http.get(this.apiUrl + "Users/Librarians");
  }

  createBook(book: any): Observable<any> {
    let body = new URLSearchParams();
    body.set("title", book.title);
    body.set("publishYear", book.publishedYear);
    body.set("imageUrl", book.imageURL);
    body.set("stock", book.stock);
    body.set("author", book.author);
    body.set("genre", book.idGenre);
    body.set("description", book.description);
    return this.http.post(this.apiUrl + "books", body.toString(), this.options);
  }

  createGender(gender: any): Observable<any> {
    let body = new URLSearchParams();
    body.set("name", gender.name);
    return this.http.post(
      this.apiUrl + "genres",
      body.toString(),
      this.options
    );
  }

  createAuthor(author: any): Observable<any> {
    let body = new URLSearchParams();
    body.set("name", author.name);
    return this.http.post(
      this.apiUrl + "authors",
      body.toString(),
      this.options
    );
  }

  updateGender(gender: any): Observable<any> {
    let body = new URLSearchParams();
    body.set("name", gender.name);
    return this.http.put(
      this.apiUrl + "genres/" + gender._id,
      body.toString(),
      this.options
    );
  }

  updateAuthor(author: any): Observable<any> {
    let body = new URLSearchParams();
    body.set("name", author.name);
    return this.http.put(
      this.apiUrl + "authors/" + author._id,
      body.toString(),
      this.options
    );
  }

  updateBook(book: any): Observable<any> {
    let body = new URLSearchParams();
    body.set("title", book.title);
    body.set("publishYear", book.publishedYear);
    body.set("imageUrl", book.imageURL);
    body.set("stock", book.stock);
    body.set("author", book.author);
    body.set("genre", book.idGenre);
    body.set("description", book.description);
    return this.http.put(
      this.apiUrl + "books/" + book._id,
      body.toString(),
      this.options
    );
  }

  deleteGender(gender: any): Observable<any> {
    return this.http.delete(this.apiUrl + "genres/" + gender._id, this.options);
  }

  deleteAuthor(author: any): Observable<any> {
    return this.http.delete(
      this.apiUrl + "authors/" + author._id,
      this.options
    );
  }

  deleteBook(book: any): Observable<any> {
    return this.http.delete(this.apiUrl + "books/" + book._id, this.options);
  }

  createBookRegistry(bookregistry: any): Observable<any> {
    let body = new URLSearchParams();
    body.set("dateCheckout", bookregistry.dateCheckout);
    body.set("dateReturn", bookregistry.dateReturn);
    body.set("Returned", bookregistry.returned);
    body.set("book", bookregistry.book);
    body.set("user", bookregistry.user);
    return this.http.post(
      this.apiUrl + "library",
      body.toString(),
      this.options
    );
  }

  createUser(user: any): Observable<any> {
    let body = new URLSearchParams();
    body.set("firstName", user.firstName);
    body.set("lastName", user.lastName);
    body.set("email", user.email);
    body.set("password", user.password);
    body.set("rol", user.idRol);
    return this.http.post(this.apiUrl + "users", body.toString(), this.options);
  }

  returnToLibrary(bookregistry: any): Observable<any> {
    let body = new URLSearchParams();
    body.set("dateCheckout", bookregistry.dateCheckout);
    body.set("dateReturn", bookregistry.dateReturn);
    body.set("Returned", bookregistry.returned);
    body.set("book", bookregistry.book);
    body.set("user", bookregistry.user);
    return this.http.put(
      this.apiUrl + "library/" + bookregistry._id + "/returned",
      body.toString(),
      this.options
    );
  }
}
