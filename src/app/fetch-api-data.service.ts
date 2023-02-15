import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//API URL
const apiUrl = 'https://new-super-flix.herokuapp.com/';



@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  //Inject the HttpClientModule to the constructor params, this will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}


  //User registration
  public userRegistration(userDetails: any): Observable <any>
  {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe
    (
      catchError(this.handleError)
    );
  }

  //User login
  public userLogin (userDetails: any): Observable <any>
  {
    console.log(userDetails);
    return this.http
    .post(apiUrl + 'login', userDetails)
    .pipe(catchError(this.handleError));
  }

  //Get all movies

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', { headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  //Get one movie

  getOneMovie(title: string): Observable <any> {
    const token = localStorage.getItem ('token');
    return this.http.get(apiUrl + 'movies/' + title, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //Get director
  getDirector(name: string): Observable <any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/' + name, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  //Get genre
  getGerne(genre: string): Observable <any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + genre, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  //Get User //I dont really have an endpoint for "geting user" the code would be somth like this
  //please checkout the documentation page at: https://new-super-flix.herokuapp.com/documentation
  // getUser(): Observable<any>{
  //   const username = localStorage.getItem('user');
  //   const token = localStorage.getItem('token');
  //   return this.http.get(apiUrl + 'users/' + username, {headers: new HttpHeaders(
  //     {
  //       Authorization: 'Bearer' + token,
  //     })}).pipe(
  //       map(this.extractResponseData),
  //       catchError(this.handleError)
  //     );
  // }

  //Get favourite moives for a user
  getFavouriteMovies(): Observable <any>{
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }


  //Add a movie to favourite Movies
  addFavoriteMovie(MovieId: string): Observable<any>{
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/' + username + '/movies/' + MovieId, { headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

  //Edit user
  editUser(updateUser: any): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + username, updateUser, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      ); 
  }  

  //Delete user
  deleteUser(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,

      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      ); 
  }

  //Delete a movie from the favorite movies list
  removeFavoriteMovie(MovieID: string): Observable <any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username + '/movies/' + MovieID, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,

      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }
  
  //Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
 
  
  //Error handler

  private handleError (error: HttpErrorResponse):any {
    if(error.error instanceof ErrorEvent) {
      console.error('Some error occurred: ', error.error.message);
    }else {
      console.error(`Error Status code ${error.status}, ` + `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}
