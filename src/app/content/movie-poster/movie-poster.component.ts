import { animate, style, transition, trigger } from '@angular/animations';
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { MoviesService } from 'src/app/shared/movies.service';

@Component({
  selector: 'app-movie-poster',
  templateUrl: './movie-poster.component.html',
  styleUrls: ['./movie-poster.component.css'],
  animations:[
    trigger('poster',[
      transition('* => *', [style({
        'opacity': '0',
        'transform': 'translate(30px, -30px)'
      }),
      animate(2000),
    ])
  ])]
})

export class MoviePosterComponent implements OnInit {
  
  movie$ = this.movieService.selectedMovieChanged
  constructor(private movieService: MoviesService) { }

  ngOnInit(): void {

  }

 

}
