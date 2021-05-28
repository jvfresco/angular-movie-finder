import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css'],
  animations: [
    trigger('rating', [
      state('in', style({
        width: '{{rating}}'
      }), {params: {rating: '100%'}}),
      transition('void => *', [style({
        width:'0%'
      }),
      animate(2000)
    ],),
    ])],
})
export class RatingsComponent implements OnInit {
 
  
  @Input() ratings = []
  @Input() averageRating: number
  constructor() { }
  ngOnInit(): void {
    
  }

 
 
  
  

  

}
