import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddBook from './AddBook.js'
import Container from 'react-bootstrap/Container'
import Carousel from 'react-bootstrap/Carousel'
import './MyFavoriteBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import DeleteBook from './DeleteBook.js';


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

handleDeletedState = (update) => {

  this.setState({listOfBooks: update});
}

getListOfBooks = async() => {
  const SERVER = process.env.REACT_APP_BACK_END;
  const books = await axios.get(`${SERVER}/books`,{params: {email: this.props.auth0.user.email,}});

  this.setState({
    listOfBooks: books.data,
  })

}
  render() {
    const data = this.state.listOfBooks.length > 0 && this.state.listOfBooks[0].books;

    console.log('Checking the data', data);
    return(
    <>
      <AddBook />
      <div>
        {this.state.listOfBooks.length > 0?
          <Container>  
            <Carousel>
            {data.map((book, idx) => (
              <Carousel.Item key={idx}>
                <DeleteBook bookId={book._id} email={this.props.auth0.user.email} updateList={this.handleDeletedState} bookList={this.state.listOfBooks} />
                <img
                  className="d-block w-100"
                  src={'https://via.placeholder.com/300x300'}
                  alt={book.name}
                  />
                <Carousel.Caption>
                  <h3>{book.name}</h3>
                  <p>{book.description}</p>
                  <p>{book.status}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
            </Carousel>
          </Container>
            :'Here we will list your favorite books'
            }
      </div>
    </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
