import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

class UpdateBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfBooks: [],
      setShow: false,
      show: false,
      email: this.props.email,
      name: this.props.name,
      description: this.props.description,
      status: this.props.status,
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log('my props: ',this.props);
    
    axios
      .put(`${process.env.REACT_APP_BACK_END}/books/${this.props.bookId}`,{
        email: this.props.email,
        name: this.state.name,
        description: this.state.description,
        status: this.state.status,
      })
      .then((response) => {
        console.log("server res: ", response.data);
        console.log('book was updated');
        this.props.updateList(response.data)
        alert(`Congratulations, your book: ${this.props.name}, was successfully updated!`);
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

  render() {
    return (
      <div>
        <Button variant="primary" onClick={this.handleShow}>
          {" "}
          Update Your Book
        </Button>
        <Modal show={this.state.setShow} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Your Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.onSubmit}>
              <Form.Group>
                <Form.Label>Book Title</Form.Label>
                <Form.Control 
                  type="text" 
                  value={this.state.name} 
                  onInput={(e)=> this.setState({name: e.target.value})} 
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Book Description</Form.Label>
                <Form.Control 
                  type="text" 
                  value={this.state.description} 
                  onInput={(e)=> this.setState({description: e.target.value})} 
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Book Status</Form.Label>
                <Form.Control 
                  type="text" 
                  value={this.state.status} 
                  onInput={(e)=> this.setState({status: e.target.value})} />
                <Form.Text className="text-muted" />
              </Form.Group>
              <Form.Label>Submit book</Form.Label>
              <Form.Control 
                type="submit" 
                onClick={this.handleClose}/>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default UpdateBook;
