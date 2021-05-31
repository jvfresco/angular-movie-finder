import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MoviesService } from '../shared/movies.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  routeSubscription: Subscription;
  movieSubscription: Subscription;
  error: boolean = false;

  constructor(
    private moviesService: MoviesService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.routeSubscription.unsubscribe();
    this.movieSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.moviesService.selectedMovieChanged.subscribe(
      (movie: any) => {
        this.error = false;
      },
      (err) => {
        console.log('error detectado');
        this.error = true;
      }
    );

    this.routeSubscription = this.activeRoute.params.subscribe((params) => {
      this.movieSubscription = this.moviesService
        .getMovieData(+params.id)
        .subscribe();
    });
  }
}
