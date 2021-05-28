import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css'],
  animations: [
    trigger('title',[
      transition(':enter', [
        style({ 
          'transform': 'scaleX(0)',
          'opacity':'0',
          'color':'rgba(0,0,0,0)'
        }),
        animate(500, style({
          'transform': 'scaleX(1)',
          'opacity':'1',
        })),
        animate(500, style({
          'color':'rgba(0,0,0,1)'
        })),
        
      ])
    ])
  ]
})
export class TitleComponent implements OnInit {
  @Input() title: string
  state = 'in'
  constructor() { }

  ngOnInit(): void {
  }

}
