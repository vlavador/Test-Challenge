import React  from 'react';

import './review.css';


class Review extends React.Component {
  constructor(props){
   super(props)
   this.state = {}
   }

  render() {
    return <div className = "reviewStyle">
            <div className = "test">
              <p className = "reviewAuthor">{this.props.review.author}</p>
              <p className = "reviewContent">{this.props.review.content}</p>
            </div>
      </div>

  }
}

export default Review
