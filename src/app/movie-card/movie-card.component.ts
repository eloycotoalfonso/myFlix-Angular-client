import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';

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
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      // return this.movies;
    });
  }

  openGenre(movie: any): void {
    const {Name, Description } = movie.Genre;
    this.dialog.open(GenreComponent,{
      data: {Name, Description},
      panelClass: "genre-dialog-background",
      width: "400px",
    });
  }

  openDirector(movie: any): void {
    const {Name, Bio, Birth } = movie.Director;
    this.dialog.open(DirectorComponent, {
      data: {Name, Bio, Birth},
      panelClass: "director-dialog-background",
      width: '400px',
    });
  }

}
