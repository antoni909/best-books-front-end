import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
// import axios from "axios";

class DeleteBook extends React.Component {

  handleClick = (e) => {

    console.log('All the props available: ', this.props);
    e.preventDefault();

    axios
      .delete(`${process.env.REACT_APP_BACK_END}/books/${this.props.bookId}?user=${this.props.email}`)
      .then((response) => {
        console.log("server res: ", response);
        console.log('book was deleted');
        
        let newBookList = this.props.bookList;

        newBookList = newBookList.filter(x => x._id !== this.props.bookId);

        console.log('the new book list', newBookList);
  
        this.props.updateList(newBookList);

        alert('Congratulations, your book was deleted')
      });
      
  };

  render() {
    return (
      <Button onClick={this.handleClick}>Delete Book</Button>
    );
  }
}

export default DeleteBook;
