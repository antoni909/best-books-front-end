import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

class AddBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // pass down function to update state in FavoriteBooks component
      listOfBooks: [],
      setShow: false,
      show: false,
      email: "",
      name: "",
      description: "",
      status: "",
    };
  }

  onSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_BACK_END}/books`,{
        email: this.state.email,
        name: this.state.name,
        description: this.state.description,
        status: this.state.status,
      })
      .then((response) => {
        console.log("server res: ", response.data);
        console.log('book was added');
        // for now we will just alert the user of newly added book
        alert(`Congratulations, your book: ${this.state.name} was added!`);

        // add handler here to update carousel with latest book item
      });
  };


  // The Problem:
  // how do we refresh/update the modal without having to refresh the page so that the modal displays the new book that was successfully added to the database???


  handleShow = (e) => {
    this.setState({
      setShow: true,
    });
  };
  handleClose = (e) => {
    this.setState({
      setShow: false,
    });
  };

  render() {
    return (
      <div>
        <Button variant="primary" onClick={this.handleShow}>
          {" "}
          Add Book
        </Button>
        <Modal show={this.state.setShow} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Your Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.onSubmit}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" onInput={(e)=> this.setState({email: e.target.value})} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Book Name</Form.Label>
                <Form.Control type="text" onInput={(e)=> this.setState({name: e.target.value})} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Book Description</Form.Label>
                <Form.Control type="text" onInput={(e)=> this.setState({description: e.target.value})} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Book Status</Form.Label>
                <Form.Control type="text" onInput={(e)=> this.setState({status: e.target.value})} />
                <Form.Text className="text-muted" /> have you read this book
                yet?
              </Form.Group>
              <Form.Label>Submit book</Form.Label>
              <Form.Control type="submit" onClick={this.handleClose}/>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default AddBook;
