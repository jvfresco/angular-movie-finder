import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { MovieDataComponent } from './content/movie-data/movie-data.component';
import { MoviePosterComponent } from './content/movie-poster/movie-poster.component';
import { RatingsComponent } from './content/movie-data/ratings/ratings.component';
import { RecommendationsComponent } from './content/movie-data/recommendations/recommendations.component';
import { FormsModule } from '@angular/forms';
import { DropListComponent } from './search/drop-list/drop-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TitleComponent } from './content/movie-data/recommendations/title/title.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ContentComponent,
    FooterComponent,
    MovieDataComponent,
    MoviePosterComponent,
    RatingsComponent,
    RecommendationsComponent,
    DropListComponent,
    TitleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
