import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MoviesService } from './shared/movies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('courtain', [
      transition('* => *', [
        style({
          'background-color': 'rgba(0,0,0,1)',
        }),
        group([animate(3000), query('@*', animateChild(), { optional: true })]),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  backdrop_path: string;
  subscription: Subscription;

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.subscription = this.moviesService.selectedMovieChanged.subscribe(
      (movie: any) => {
        this.backdrop_path = movie.backdrop_path;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
