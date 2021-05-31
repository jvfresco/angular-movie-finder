import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/shared/movies.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css'],
})
export class RecommendationsComponent implements OnInit {
  recommendationHovered: number;
  @Input() recommendations = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {}

  onMouseEnter(id: number) {
    this.recommendationHovered = id;
  }

  onMouseLeave() {
    this.recommendationHovered = null;
  }
}
