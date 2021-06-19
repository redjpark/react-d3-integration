import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import ChartWrapper from "./ChartWrapper";
// import Test from './Test';

import "bootstrap/dist/css/bootstrap.min.css";
import GenderDropdown from "./GenderDropdown";
import Table from "./Table";
import ScatterplotWrapper from "./ScatterplotWrapper";
import { json } from "d3-fetch";

const urlChildren = "https://udemy-react-d3.firebaseio.com/children.json";
class App extends Component {
  state = {
    personClickCount: 0,
    gender: "men",

    chartType: "scatterplot", /// barchart

    data: { children: [], ages: [], men: [], women: [] },
    activeName: null,
    selectedName: null,
  };

  componentWillMount() {
    json(urlChildren)
      .then((data) => {
        console.log(`App: ${data}`);
        this.setState({
          data: { children: data },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleGenderSelected = (gender) => {
    console.log(gender);
    this.setState({ gender: gender });
    console.log(this.state.gender);
  };

  handleChartTypeSelected = (chartType) => this.setState({ chartType });
  updateName = (activeName) => {
    console.log(`updateName: ${activeName}...`);
    this.setState({ activeName });
  };

  handleAddChild = (child) => {
    this.setState({
      data: { children: [...this.state.data.children, child] },
    });
    console.log(`addChild: ${this.state.data.children}`);
  };
  handleRemoveChild = (name) => {
    const children = this.state.data.children.filter(
      (child) => name !== child.name
    );
    this.setState({ data: { children } });
  };

  handleSelectChild = (name) => {
    console.log(`selected child: ${name}`);
    this.setState({ selectedName: name });
  };

  handleDeselectChild = (name) => {
    console.log(`deselected child: ${name}`);
    this.setState({ selectedName: null });
  };

  // click = () => {
  //   this.setState({ personClickCount: this.state.personClickCount + 1 });
  //   console.log("clicked");
  // };

  renderScatterplot() {
    if (this.state.data.children.length === 0) {
      return "no data yet";
    }
    console.log(`renderScatterplot(): ${this.state.data.children}`);
    return (
      <ScatterplotWrapper
        data={this.state.data.children}
        updateName={this.updateName}
        selectedName={this.state.selectedName}
      />
    );
  }

  render() {
    return (
      <div className="App">
        <Navbar bg="light">
          <Navbar.Brand
            onClick={() => this.handleChartTypeSelected("scatterplot")}
          >
            Scatterplot
          </Navbar.Brand>
          <Navbar.Brand
            onClick={() => this.handleChartTypeSelected("barchart")}
          >
            Barchart
          </Navbar.Brand>
        </Navbar>

        {this.state.chartType === "barchart" && (
          <Container>
            <Row>
              <Col xs={12}>
                <GenderDropdown genderSelected={this.handleGenderSelected} />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <ChartWrapper gender={this.state.gender} />
              </Col>
            </Row>
          </Container>
        )}
        {this.state.chartType === "scatterplot" && (
          <Container>
            <Row>
              <Col md={6} xs={12}>
                {this.renderScatterplot()}
              </Col>
              <Col md={6} xs={12}>
                <Table
                  data={this.state.data.children}
                  activeName={this.state.activeName}
                  addChild={this.handleAddChild}
                  removeChild={this.handleRemoveChild}
                  selectChild={this.handleSelectChild}
                  deselectChild={this.handleDeselectChild}
                />
              </Col>
            </Row>
          </Container>
        )}
        <div className="container text-center fw-bold text-uppercase mt-2 border-top">
          <div>
            {this.state.chartType === "barchart" &&
              `Gender seleted: ${this.state.gender}`}
          </div>
          Chart seleted: {this.state.chartType}
        </div>
      </div>
    );
  }
}
export default App;
