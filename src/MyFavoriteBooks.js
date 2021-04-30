import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Carousel from 'react-bootstrap/Carousel'
import './MyFavoriteBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';


class MyFavoriteBooks extends React.Component {
constructor(props){
  super(props);
  this.state = {}
}
componentDidMount(){
  this.getListOfBooks();
}

getListOfBooks = async() => {
  const SERVER = process.env.REACT_APP_BACK_END;
  const books = await axios.get(`${SERVER}/books`,{params: {email: this.props.auth0.user.email,}});

  this.setState({
    listOfBooks: books.data,
  })
    // console.log('books arr: ', this.state.listOfBooks)
    //map books.data if length > 0
}

  render() {
    // eslint-disable-next-line no-unused-vars
    const { user, isAuthenticated } = this.props.auth0;
    // console.log(this.state.listOfBooks && this.state.listOfBooks[0].books);
    const data = this.state.listOfBooks && this.state.listOfBooks[0].books;
// TODO:
// possibly a ternary error wont render the carousel
    return(

      <div>
        {this.state.listOfBooks && this.state.listOfBooks[0].books?
        <Container>
          <Carousel> 
                <>{data.map(element => {
                  console.log(element.name,element._id,element.description)
                  return(
                    <Carousel.Item key={element._id} interval={5000}>
                      {/* <img
                        className="d-block w-100"
                        src={''}
                        alt={element.description}
                      /> */}
                      <Carousel.Caption>
                        <h1>{element.name}</h1>
                      </Carousel.Caption>
                    </Carousel.Item>
                  )
                })}
                </>
          </Carousel> 
        </Container>
            :'Here we will list your favorite books'
            }
      </div>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
// export default MyFavoriteBooks;
