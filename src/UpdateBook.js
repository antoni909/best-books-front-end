import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

class UpdateBook extends React.Component {
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
    console.log('my props: ',this.props);
    
    axios
      .put(`${process.env.REACT_APP_BACK_END}/books`,{
        email: this.props.email,
        name: this.state.name,
        description: this.state.description,
        status: this.state.status,
      })
      .then((response) => {
        console.log("server res: ", response.data);
        console.log('book was updated');
        // for now we will just alert the user of newly added book
        alert(`Congratulations, your book: ${this.props.name} was successfully updated!`);
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
          Update Book
        </Button>
        <Modal show={this.state.setShow} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Your Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.onSubmit}>
              <Form.Group>
                <Form.Label>Book Title {this.props.name}</Form.Label>
                <Form.Control type="text" value={this.props.name} onInput={this.nameHandler} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Book Description</Form.Label>
                <Form.Control type="text" value={this.props.description} onInput={this.descriptionHandler} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Book Status</Form.Label>
                <Form.Control type="text" value={this.props.status} onInput={this.statusHandler} />
                <Form.Text className="text-muted" />
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

export default UpdateBook;
