import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MoviesService } from 'src/app/shared/movies.service';

@Component({
  selector: 'app-movie-data',
  templateUrl: './movie-data.component.html',
  styleUrls: ['./movie-data.component.css']
})
export class MovieDataComponent implements OnInit {
  movie$ = this.moviesService.selectedMovieChanged

  constructor(private moviesService: MoviesService) { }
  

  ngOnInit(): void {
 
  }

  

}
