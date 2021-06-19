import React, { Component } from "react";
import D3Chart from "./D3Chart";

export default class ChartWrapper extends Component {
  constructor(props) {
    super(props);
    this.gender = props.gender;
    this.refChart = React.createRef();
  }

  componentDidMount() {
       this.setState({
        chart: new D3Chart(this.refChart.current, this.gender),
      });
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(nextProps) {
    this.state.chart.update(nextProps.gender);
  }

  render() {
    return <div ref={this.refChart} />;
  }
}
