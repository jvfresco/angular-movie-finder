import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
} from 'rxjs/operators';
import { MoviesService } from '../shared/movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  movieSubscription: Subscription;
  searchInput: string = '';
  searchInputUpdate = new Subject<string>();

  constructor(private moviesService: MoviesService) {
    this.subscription = this.searchInputUpdate
      .pipe(
        filter(Boolean),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((value: string) => {
          return this.moviesService.getMoviesSearch(value);
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.movieSubscription = this.moviesService.selectedMovieChanged.subscribe(
      () => {
        this.searchInput = '';
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.movieSubscription.unsubscribe();
  }
}
