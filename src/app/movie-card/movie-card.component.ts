import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovies: any [] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    private dialog: MatDialog,  
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  /**
   * Fetch the movies via the API endpoint
   * @function getMovies
   * @returns array with every single movie
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
    });
  }

  /**
   * This function is associated with a button that will open the view for that particular movie genre
   * @function openGenre 
   */
  openGenre(movie: any): void {
    const {Name, Description } = movie.Genre;
    this.dialog.open(GenreComponent,{
      data: {Name, Description},
      panelClass: "genre-dialog-background",
      width: "400px",
    });
  }

  /**
   * This function is associated with a button that will open the view for that particular movie director
   * @function openDirector 
   */
  openDirector(movie: any): void {
    const {Name, Bio, Birth } = movie.Director;
    this.dialog.open(DirectorComponent, {
      data: {Name, Bio, Birth},
      panelClass: "director-dialog-background",
      width: '400px',
    });
  }

  /**
   * This function is associated with a button that will open the view of the details of that movie
   * @function openMovieDetails 
   */
  openMovieDetails(movie: any): void {
    const {Title, Description } = movie;
    this.dialog.open(MovieDetailsComponent, {
      data: {Title, Description},
      panelClass: "details-dialog-background",
      width: '400px'
    });
  }

  /**
   * This function will fetch the list of favorite movies of the user
   * @function getFavoriteMovies
   * @returns Array with the ID number of every favorite movie
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp[0].FavoriteMovies;
      // console.log(this.favoriteMovies);
    });
  }

  /**
   * This function will toggle the movie from favorite to not favorite and viceversa
   * @function toggleFavorite
   * @param movie {any}
   */
  toggleFavorite(movie: any): void {
    const id = movie._id;
    // console.log(movie._id);
    // console.log(id);
    if (this.movieIsFavorite(id)){
      console.log('this movie is favorite');
      this.removeFromFavs(id);
    } else {
      console.log('this movie is not favorite');
      // console.log(id);
      this.addToFavs(id);
    };
  }

  /**
   * This function will check if the input movie is in the list of favorites
   * @function movieIsFavorite
   * @param id {string}
   * @returns boolean
   */
  movieIsFavorite(id: string): boolean {
    return this.favoriteMovies.includes(id);
  }

  /**
   * This function will add the movies to favorite list
   * @function addToFavs
   * @param id {string}
   */
  addToFavs(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((resp: any) => {
      this.getFavoriteMovies();
    });
  }

  /**
   * This movie will remove the selected movie from the favorites list
   * @function removeFromFAvs
   * @param id {string}
   */
  removeFromFavs(id: string): void {
    this.fetchApiData.removeFavoriteMovie(id).subscribe((resp: any) => {
      this.getFavoriteMovies();
    });
  }

  

  


}
