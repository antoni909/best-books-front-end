import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import './DeleteBook.css'

class DeleteBook extends React.Component {

  handleClick = (e) => {
    e.preventDefault();
    axios
      .delete(`${process.env.REACT_APP_BACK_END}/books/${this.props.bookId}?user=${this.props.email}`)
      .then((response) => {
        let newBookList = this.props.bookList;
        // newBookList = newBookList.filter(x => x._id !== this.props.bookId);
        this.props.updateList(response.data);
        console.log('1  -  new Booklist from server: ', newBookList)
        alert('Congratulations, your book was deleted');

      });
  };

  render() {
    return (
      <Button onClick={this.handleClick}>Delete Book</Button>
    );
  }
}

export default DeleteBook;
