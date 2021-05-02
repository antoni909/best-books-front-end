import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

class AddBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
        this.setState({
          listOfBooks: response.data,
        });
        console.log('book was added')
      });
  };

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

  emailHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
    console.log(this.state.email);
  };
  nameHandler = (e) => {
    this.setState({
      name: e.target.value,
    });
    console.log(this.state.name);
  };
  descriptionHandler = (e) => {
    this.setState({
      description: e.target.value,
    });
    console.log(this.state.description);
  };
  statusHandler = (e) => {
    this.setState({
      status: e.target.value,
    });
    console.log(this.state.status);
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
                <Form.Control type="text" onInput={this.emailHandler} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Book Name</Form.Label>
                <Form.Control type="text" onInput={this.nameHandler} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Book Description</Form.Label>
                <Form.Control type="text" onInput={this.descriptionHandler} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Book Status</Form.Label>
                <Form.Control type="text" onInput={this.statusHandler} />
                <Form.Text className="text-muted" /> have you read this book
                yet?
              </Form.Group>
              <Form.Label>Submit book</Form.Label>
              <Form.Control type="submit" onClick={this.handleClose}/>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose} />
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AddBook;
