import React  from 'react';
import  $ from 'jquery';
import Review from './review';
import './movies.css';



class Movies extends React.Component {
  constructor(props){
   super(props)
   this.state = {
    }
  
   }
   
   getReview(review){
     const urlRendering = "https://api.themoviedb.org/3/movie/"+review.id+"/reviews?api_key=9d8982ca11943b871ab595b01b991151"
     $.ajax({
        url : urlRendering,
        success: (result) => {
          const reviews = result.results
          var reviewdata = []
          reviews.forEach((review) => {
            const reviewdetails = <Review key = {review.id}  review = {review} />
            reviewdata.push(reviewdetails)
          })
          this.setState({reviewlist: reviewdata}) 
        },
        error:(xhr,status,err) => {
          console.error("failed fetch")
        }
      })
    }

    
    
  render() {
    return <div>     
      <div className = "movie">
        <div key = {this.props.movies.id} >
          <div className ="grid-4">
            <img src ={this.props.movies.poster_path} alt="true"  />
          </div>
          <div className = "grid-8">
            <p>Original Title : {this.props.movies.original_title}</p>
              
            <p>Synopsis : {this.props.movies.overview}</p>
            <p>User rating : {this.props.movies.vote_average}</p>
            <p>Release Date: {this.props.movies.release_date}</p>
            <span onClick = {this.getReview.bind(this,this.props.movies)} className = "viewStyle"> View review </span>
          </div> 
          {this.state.reviewlist} 
        </div>
      </div>  
    </div>


  }
}

export default Movies
