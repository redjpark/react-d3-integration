import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default class Table extends React.Component {
  state = {
    name: "",
    age: "",
    height: "",
  };

  handleSubmit = () => {
    this.props.addChild(this.state);
    this.setState({
      name: "",
      age: "",
      height: "",
    });
  };

  handleRemove = (event) => {
    this.props.removeChild(event.target.name);
    console.log(`removing ${event.target.name}`);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleMouseEnter = (e) => {
    this.props.selectChild(e.target.attributes.name?.value)
    console.log(e.target.attributes.name?.value)
    console.log(e)
  }
  handleMouseLeave = e => {
    this.props.deselectChild(e.target.attributes.name?.value)
  }

  renderRows() {
    return this.props.data.map((child) => {
      const bgcolor = child.name === this.props.activeName ? "grey" : "white";

      // console.log(child.name)
      // console.log(this.props.activeName)
      // console.log(this.props)
      // console.log(bgcolor)

      return (
        <Row
          style={{ marginTop: "10px", backgroundColor: bgcolor }}
          key={child.name}
          name={child.name}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <Col xs={3} name={child.name}>{child.name}</Col>
          <Col xs={3}>{child.age}</Col>
          <Col xs={3}>{child.height}</Col>
          <Col xs={3}>
            <Button
              variant="danger"
              style={{ width: "100%" }}
              name={child.name}
              onClick={this.handleRemove}
            >
              Remove
            </Button>
          </Col>
        </Row>
      );
    });
  }

  render() {
    return (
      <div>
        <Form>
          <Row>
            <Col xs={3}>
              <Form.Control
                name="name"
                placeholder="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </Col>
            <Col xs={3}>
              <Form.Control
                name="age"
                placeholder="age"
                value={this.state.age}
                onChange={this.handleChange}
              />
            </Col>
            <Col xs={3}>
              <Form.Control
                name="height"
                placeholder="height"
                value={this.state.height}
                onChange={this.handleChange}
              />
            </Col>
            <Col>
              <Button
                variant="primary"
                type="button"
                style={{ width: "100%" }}
                onClick={this.handleSubmit}
              >
                Add
              </Button>
            </Col>
          </Row>
        </Form>
        {this.renderRows()}
      </div>
    );
  }
}
