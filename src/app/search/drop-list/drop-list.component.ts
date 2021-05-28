import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MoviesService } from 'src/app/shared/movies.service';

@Component({
  selector: 'app-drop-list',
  templateUrl: './drop-list.component.html',
  styleUrls: ['./drop-list.component.css']
})
export class DropListComponent implements OnInit, OnDestroy {
  error = false
  movies$: any
  subscription: Subscription
  @ViewChild('movieListElement') movieListElement: ElementRef

  constructor(private moviesService: MoviesService, private renderer: Renderer2) { 

    this.movies$ = this.moviesService.searchResultsChanged.pipe(
      catchError(error => {
        this.error = true
        return error
      }),
      map(result => {
        this.error = false
        return result
      })
    )

    this.renderer.listen('window', 'click', ((e:Event) => {
      if(this.movieListElement && e.target !== this.movieListElement.nativeElement){
        this.movies$.next('')
      }
    }))


  }
  
  ngOnInit(): void {
   
  }
  

  onClick(){
    this.movies$.next('')
  }

  ngOnDestroy(): void {
    
  }
}
