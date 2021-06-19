import React, { Component } from "react";
import D3Scatterplot from "./D3Scatterplot";

export default class ScatterplotWrapper extends Component {
  constructor(props) {
    super(props);
    this.refChart = React.createRef();
  }

  componentDidMount() {
    this.setState({
      chart: new D3Scatterplot(this.refChart.current, this.props.data, this.props.updateName, this.props.selectChild, this.props.deselectChild),
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(nextProps) {
    console.log(`componentWillReceiveProps ${nextProps}`)
    console.log(nextProps)
    console.log(nextProps.data)
    console.log(nextProps.selectedName)

    this.state.chart.update(nextProps.data, nextProps.selectedName);
  }
  render() {
    return <div ref={this.refChart} />;
  }
}
