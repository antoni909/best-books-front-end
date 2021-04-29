import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './MyFavoriteBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';


class MyFavoriteBooks extends React.Component {
constructor(props){
  super(props);
  this.state = {
    listOfBooks: [],
  }
}
  
componentDidMount(){
  this.getListOfBooks();
}

getListOfBooks = async() => {
  const SERVER = process.env.REACT_APP_BACK_END;
  const books = await axios.get(`${SERVER}/books`,{params: {email: this.props.auth0.user.email,}});

  this.setState({
    listOfBooks: books,
  })
    console.log('response: ',books);
    console.log('books: ', books)
}

  render() {
    // eslint-disable-next-line no-unused-vars
    const { user, isAuthenticated } = this.props.auth0;
    console.log(this.props.listOfBooks);
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
