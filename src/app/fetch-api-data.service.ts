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
  /**
   * @function userRegistration
   * @service POST function to the API end point that allows registering a new user
   * @param userDetails {any}
   * @returns  a new user object in JSON format
   */
  public userRegistration(userDetails: any): Observable <any>
  {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe
    (
      catchError(this.handleError)
    );
  }

  //User login
  /**
   * @function userLogin
   * @service POST function to the API endpoint that allows login a existing user
   * @param userDetails {any}
   * @returns a object with the user information as well as the token
   */
  public userLogin (userDetails: any): Observable <any>
  {
    console.log(userDetails);
    return this.http
    .post(apiUrl + 'login', userDetails)
    .pipe(catchError(this.handleError));
  }

  //Get all movies
  /**
   * @function getAllMovies
   * @service GET function to the API endpoint that retrieves the full catalog of movies
   * @params none
   * @returns an Array of objects (each object is a movie with information)
   *  
   */

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
  /**
   * @function getOneMovie
   * @service GET to the API endpoint /movies
   * @params Movie id
   * @returns An object with information of a particular movie.
   */

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
  /**
   * @function getDirector
   * @service GET function to the API endpoint that retrieves information about a director
   * @params Director name
   * @returns an Object with the information of that director
   */
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
  /**
   * @function getGenre
   * @service GET function to the API endpoint that retrieves information about a Genre
   * @params Genre name
   * @returns an Object with the information of that genre
   */
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

  //Get information about the current logged in user
  /**
   * @function getUser
   * @service GET function to the API endpoint that retrieves information about a user
   * @params User's name
   * @returns an Object with the information of that user
   */
  getUser(): Observable<any>{
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

  //Get favourite moives for a user
  /**
   * @function getFavoriteMovies
   * @service GET function to the API endpoint that retrieves information with the favorite movies of a user
   * @params User's name
   * @returns An array with the Id's of the favorite movies of the user
   */

  getFavoriteMovies(): Observable <any>{
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
  /**
   * @function addFavoriteMovie
   * @service POST function that includes a movie into the list of favorites
   * @params User's name and MovieId
   * @returns An array with the Id's of the favorite movies of the user
   */

  addFavoriteMovie(MovieId: string): Observable<any>{
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/' + username + '/movies/' + MovieId, {} ,{ headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

  //Edit user
  /**
   * @function editUser
   * @service PUT function that modifies user's information
   * @params User information {any}
   * @returns An Object with the new user's details
   */
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
  /**
   * @function deleteUser
   * @service DELETE function that erases all the user's information
   * @params None
   * @returns An status message
   */
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
  /**
   * @function removeFavoriteMovie
   * @service DELETE function that deletes a movie frm the list of favorites
   * @params User's name and MovieId
   * @returns An array with the Id's of the favorite movies of the user
   */
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
  /**
   * @function extractResponseData
   * @param res {any} 
   * @returns response body of empty object
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
 
  
  //Error handler
  /**
   * @function handleError
   * @param errror {any} 
   * @returns error message
   */

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
