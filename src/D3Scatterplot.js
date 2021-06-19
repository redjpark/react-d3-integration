import * as d3 from "d3";

const url = "https://udemy-react-d3.firebaseio.com/children.json";
const urlAges = "https://udemy-react-d3.firebaseio.com/ages.json";
const urlMale = "https://udemy-react-d3.firebaseio.com/tallest_men.json";
const urlFemale = "https://udemy-react-d3.firebaseio.com/tallest_women.json";

const MARGIN = { TOP: 10, BOTTOM: 80, LEFT: 70, RIGHT: 10 };
const WIDTH = 500 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 300 - MARGIN.TOP - MARGIN.BOTTOM;

const procs = {}

export default class D3Scatterplot {
  constructor(element, data, updateName, selectedName) {

    procs.updateName = updateName
    procs.selectedName = selectedName

    let viz = this;
    viz.updateName = updateName;
    viz.data = data;

    viz.g = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT},${MARGIN.TOP})`);

    // d3.json(url).then((data) => {
    //   viz.data = data;
    //   console.log(`D3Scatterplot: ${data}`)
    //   this.update();
    // });

    // scale
    viz.xScale = d3
      .scaleLinear()
      .range([0, WIDTH])
      .domain([0, d3.max(viz.data, (d) => Number(d.age))])

    viz.yScale = d3
      .scaleLinear()
      .range([HEIGHT, 0])
      .domain([0, d3.max(viz.data, (d) => Number(d.height))])

    // gerate Axis
    viz.xAxisGroup = viz.g
      .append("g")
      .attr("transform", `translate(0, ${HEIGHT})`);
    viz.yAxisGroup = viz.g.append("g");

    // Axis labels
    viz.g
      .append("text")
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT + 40)
      .attr("font-size", 20)
      .attr("text-anchor", "middle")
      .text("Age");

    viz.g
      .append("text")
      .attr("x", -(HEIGHT / 2))
      .attr("y", -50)
      .attr("transform", `rotate(-90)`)
      .attr("font-size", 20)
      .attr("text-anchor", "middle")
      .text("Height in cm");

    // const xAxisGenerator = d3.axisBottom(viz.xScale);
    // const yAxisGenerator = d3.axisLeft(viz.yScale);

    // viz.xAxisGroup.call(xAxisGenerator);
    // viz.yAxisGroup.call(yAxisGenerator);

    this.update(viz.data);
  }

  update(data, selectedName = null) {
    let viz = this;
    viz.data = data
    console.log(`update(): ${viz.data}`)
    console.log(viz.data);
    console.log(`selectedName: ${selectedName}`)

    viz.xScale.domain([0, d3.max(viz.data, (d) => Number(d.age))]);
    viz.yScale.domain([0, d3.max(viz.data, (d) => Number(d.height))]);

    const xAxisGenerator = d3.axisBottom(viz.xScale);
    const yAxisGenerator = d3.axisLeft(viz.yScale);

    viz.xAxisGroup.call(xAxisGenerator);
    viz.yAxisGroup.call(yAxisGenerator);


    // DATA JOIN
    const circles = viz.g.selectAll("circle").data(viz.data, (d) => d.name);

    // EXIT
    circles.exit().transition(1000).attr("cy", viz.yScale(0)).remove();

    // UPDATE
    circles
      .transition(1000)
      .attr('r', d=>{
        console.log(`update ${selectedName} -- ${d.name}`)
        return selectedName === d.name ? 8 : 5
      })
      .attr('fill', d=>{
        return selectedName === d.name ? 'magenta' : 'pink'
      })
      .attr("cx", (d) => viz.xScale(d.age))
      .attr("cy", (d) => viz.yScale(d.height));

    // ENTER
    circles
      .enter()
      .append("circle")
      .attr("cx", (d) => {
        console.log(`circle cx(): ${d.age}`);
        console.log(d);
        return viz.xScale(d.age);
      })
      .attr("cy", (d) => viz.yScale(0))
      // .attr("r", 5)
      // .attr("r", d=> selectedName === d.name ? 8 : 5)
      .attr('r', d=>{
        console.log(`${selectedName} -- ${d.name}`)
        return selectedName === d.name ? 8 : 5
      })
      .attr("fill", "pink")
      .attr("name", (d) => d.name)
      .on("click", (event, i) => {
        // viz.updateName(d.target.attributes.name.value);
        viz.updateName(i.name);
        console.log(`click on circle: ${event}`);
        // console.log(d.target.attributes.name.value)
        console.log(event);
        console.log(i);
      })
      .on("mouseover", this.handleMouseOver)
      .on("mouseout", this.handleMouseOut)
      .transition(1000)
      .attr("cy", (d) => viz.yScale(d.height));
  }

  handleMouseOver(d, i) {
    console.log("mouse over <<");
    console.log(d);
    console.log(i);
    console.log(this);
    d3.select(this).attr("fill", "orange").attr("r", 8);
    procs.updateName(i.name)
    // d3.select(this).attr({ fill: "orange", r: 8 });
  }

  handleMouseOut(d, i) {
    console.log("mouse out <<");
    console.log(d);
    console.log(i);
    console.log(this);
    d3.select(this).attr("fill", "pink").attr("r", 5);
    // d3.select(this).attr({ fill: "pink", r: 5 });
    procs.updateName(null)

  }
}
