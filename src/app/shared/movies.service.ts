import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, mergeMap, publishReplay, refCount, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  TMDB_API = '?api_key=57f42c6a2246394eb16c04df758e5a5b'
  IMDB_API = 'df2042d5'

  searchResultsChanged = new Subject()
  selectedMovieChanged = new Subject()
  selectedMovie: any

  constructor(private http: HttpClient) { }

  getMoviesSearch(search:string){
    
      return this.http.get(  'https://api.themoviedb.org/3/' + 'search/movie' + this.TMDB_API + '&query='+ search ).pipe(
        map((result:any) => result.results.filter((result:object, i:number)=> i<=4)),
        tap(filteredResults => this.searchResultsChanged.next([...filteredResults]), error => this.searchResultsChanged.error(error))
      )
    
  }

  getMovieData(id){
    return this.http.get('https://api.themoviedb.org/3/movie/' + id + this.TMDB_API).pipe(
      mergeMap((result:any) => { //retrieve TMDB data
        
        this.selectedMovie = {
          ...this.selectedMovie,
          backdrop_path: result.backdrop_path,
          genres: result.genres,
          id: id,
          imdb_id: result.imdb_id,
          overview: result.overview,
          poster_path: result.poster_path,
          ratings: [{Source: 'The Movie Database', Value: result.vote_average}],
          release_date: result.release_date,
          runtime: result.runtime,
          tagline: result.tagline,
          title: result.title,
        }
        return this.http.get('https://www.omdbapi.com/?apikey=' + this.IMDB_API + '&i=' + result.imdb_id)
      }),
      mergeMap((result:any) => { //retrieve IMDB data 
        this.selectedMovie ={
          ...this.selectedMovie, 
          director: result.Director,
          rated: result.Rated,
          ratings: [...this.arrangeRatings(result.Ratings), ...this.selectedMovie.ratings]
        }
        return this.http.get('https://api.themoviedb.org/3/movie/' + this.selectedMovie.id + '/recommendations' + this.TMDB_API + '&page=1')
      }),
      publishReplay(1),
      refCount(),
      tap((result:any) => { 
        this.selectedMovie = {
          ...this.selectedMovie,
          average_rating: this.selectedMovie.ratings.map(rating => rating.Value).reduce((a,b)=>a+b)/this.selectedMovie.ratings.length,
          recommendations: result.results.slice(0,4)
        }
        this.selectedMovieChanged.next(this.selectedMovie)
      }, err => {
        this.selectedMovieChanged.error(err)
      }),
    )
  }

  arrangeRatings(imdbRatings){
    const ratingsArray = [...imdbRatings];
    //Check for the existence of the rating and assign value depending on source and array position
    imdbRatings.forEach((value, i) => {
      switch (value.Source) {
        case "Internet Movie Database":
          const imdbScore = Number(imdbRatings[i].Value.slice(0,imdbRatings[i].Value.indexOf("/")));
          return ratingsArray[i].Value = imdbScore;
        case "Rotten Tomatoes":
          const rottenTotatoesScore = Number(imdbRatings[i].Value.slice(0,imdbRatings[i].Value.indexOf("%")) / 10);
          return ratingsArray[i].Value = rottenTotatoesScore;
        case "Metacritic":
          const metacriticScore = Number(imdbRatings[i].Value.slice(0,imdbRatings[i].Value.indexOf("/")) / 10);
          return ratingsArray[i].Value = metacriticScore ;
        default: return null;  
      }
    });
    return ratingsArray
  }

}
