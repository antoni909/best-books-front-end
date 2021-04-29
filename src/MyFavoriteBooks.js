import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './MyFavoriteBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';


class MyFavoriteBooks extends React.Component {
  
componentDidMount(){
  this.getListOfBooks();
}

getListOfBooks = async() => {
  const SERVER = process.env.REACT_APP_BACK_END;
  const listOfBooks = await axios.get(`${SERVER}/books`,{ 
    params: { 
      email: this.props.auth0.user.email
    }})
    console.log(listOfBooks,listOfBooks.data);
}

  render() {
    const { user } = this.props.auth0;
    console.log('props',this.props.auth0,user);
    return(
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
      </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
// export default MyFavoriteBooks;
