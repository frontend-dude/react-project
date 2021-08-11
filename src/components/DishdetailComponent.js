import React, { Component } from "react";
import { Card, CardImg, CardText, CardTitle, CardBody, Breadcrumb, BreadcrumbItem, Modal, ModalBody, ModalHeader, Button, Row, Col, Label, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    }
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleToggle = () => {
    this.setState({ modalOpen: !this.state.modalOpen })
  }
  handleSubmit = (values) => {
    this.handleToggle()
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
  }
  render() {
    return (
      <React.Fragment>
        <Button outline onClick={this.handleToggle}><span className="fa fa-pencil fa-lg"></span>{' '}Submit Comment</Button>
        <Modal isOpen={this.state.modalOpen} toggle={this.handleToggle}>
          <ModalHeader toggle={this.handleToggle}>
            Submit Comment
          </ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(value) => this.handleSubmit(value)}>
              <Row className="form-group">
                <Col md={12}>
                  <Label className="pl-0" htmlFor="firstname">Rating</Label>
                </Col>

                <Col md={12}>
                  <Control.select model=".select" name="contactType" className="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={12}>
                  <Label className="pl-0" htmlFor="firstname">First Name</Label>
                </Col>

                <Col md={12}>
                  <Control.text model=".firstname" id="firstname" name="firstname"
                    placeholder="First Name"
                    className="form-control"
                    validators={{
                      required, minLength: minLength(3), maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".firstname"
                    show="touched"
                    messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less'
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={12}>
                  <Label className="pl-0" htmlFor="message">Comment</Label>
                </Col>

                <Col md={12}>
                  <Control.textarea model=".message" id="message" name="message" rows="12" className="form-control"></Control.textarea>
                </Col>
              </Row>
              <Button type="submit" value="submit" color="primary">Submit</Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    )
  }
}

function RenderDish({ dish }) {

  if (dish != null) {
    return (
      <div className='col-12 col-md-5 m-1'>
        <FadeTransform in transformProps={{ exitTransform: 'scale(0.5) translateY(-50%)' }}>
          <Card>
            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle> {dish.name}</CardTitle>
              <CardText> {dish.description} </CardText>
            </CardBody>
          </Card>
        </FadeTransform>
      </div>
    );
  }
  else {
    return (
      <div></div>
    );
  }
}

function RenderComments({ comments, postComment, dishId }) {
  if (comments == null) {
    return (<div></div>)
  }

  const cmnts = comments.map(dishComment => {
    return (
      <ListGroup>
        <Stagger in>
          <Fade in>
            <ListGroupItem className="pl-0 border-0" key={dishComment.id}>
              <CardText>{dishComment.comment}</CardText>
              <CardText>--{dishComment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(dishComment.date)))}</CardText>
            </ListGroupItem>
          </Fade>
        </Stagger>
      </ListGroup>
    )
  })
  return (
    <div className='col-12 col-md-5 m-1'>
      {cmnts}
      <CommentForm dishId={dishId} postComment={postComment} />
    </div>
  )
}

const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  }


  const dish = props.dish;

  if (dish == null) {
    return (<div></div>);
  }

  return (
    <div class="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
          <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className='row'>
        <RenderDish dish={props.dish} />
        <RenderComments comments={props.comments}
          postComment={props.postComment}
          dishId={props.dish.id}
        />
      </div>
    </div>
  )
}

export default DishDetail;