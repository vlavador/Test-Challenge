import React, { Component } from 'react';
import './App.css';
import Movies from './components/movies';
import  $ from 'jquery';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      page : 1,
      type: "popular"
     } 
    this.renderingMovies(this.state.type,this.state.page)
  }

  renderingMovies(type,page){
    this.setState({type : type,  page : page})
    const urlRendering = "https://api.themoviedb.org/3/movie/"+type+"?api_key=9d8982ca11943b871ab595b01b991151&page="+page;
      $.ajax({
        url : urlRendering,  
        success: (result) => {
          const movies = result.results
          var moviedata = []
            movies.forEach((movie) => {
                movie.poster_path = "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + movie.poster_path
                const moviedetails = <Movies key = {movie.id} movies = {movie} />
                moviedata.push(moviedetails)
          })
          this.setState({movielist: moviedata})
        },
        error:(xhr,status,err) => {
          console.error("failed fetch")
        }
      })
    }

    getPopular(){
      this.renderingMovies( "popular", 1 )
    }
    
    getTopRated(){
      this.renderingMovies("top_rated", 1 )
    }

    getPreviousPage(){

      this.renderingMovies(this.state.type, this.state.page + 1)
    }

    getBackPage(){
      {this.state.page === 1 ? null: 
        this.renderingMovies(this.state.type, this.state.page - 1 )
      }
    }
    
  render() {
    return (
      <div className="section">
        <div className= "container">
          <div className = "dropdown">
              <ul>
                <li onClick = {this.getPopular.bind(this)}>Popular</li>
                <li  onClick = {this.getTopRated.bind(this)}>Top Rated</li>
              </ul>
          </div>

        {this.state.movielist}

          <div className = "pager">
            <span onClick = {this.getBackPage.bind(this)}  className ="backStyle">Back</span>
            <span onClick = {this.getPreviousPage.bind(this)}className ="previousStyle">Previous</span>
          </div>
        </div>
      </div>
    );
  }
}



export default App;
