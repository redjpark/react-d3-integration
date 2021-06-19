import * as d3 from "d3";

const urlAges = "https://udemy-react-d3.firebaseio.com/ages.json";
const urlMale = "https://udemy-react-d3.firebaseio.com/tallest_men.json";
const urlFemale = "https://udemy-react-d3.firebaseio.com/tallest_women.json";

const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 70, RIGHT: 10 };
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

export default class D3Chart {
  constructor(element, gender) {
    const viz = this;

    viz.svg = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT},${MARGIN.TOP})`);

    // now label for x axis
    viz.xLabel = viz.svg
      .append("text")
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT + 40)
      .attr("text-anchor", "middle")
      .text("The world's tallest men");

    // label for Y axis
    viz.svg
      .append("text")
      // .attr('x', -20)  // reposition after rotate
      // .attr('y', HEIGHT / 2) // reposition after rotate
      .attr("x", -(HEIGHT / 2))
      .attr("y", -50)
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("Height in cm");

    viz.xAxisGroup = viz.svg
      .append("g")
      .attr("transform", `translate(0, ${HEIGHT})`);
    viz.yAxisGroup = viz.svg //
      .append("g");

    Promise.all([d3.json(urlAges), d3.json(urlMale), d3.json(urlFemale)]).then(
      (datasets) => {
        const [ages, men, women] = datasets;
        let flag = true

        // viz.data = gender === 'men' ? men : women
        viz.agesData = ages
        viz.menData = men
        viz.womenData = women
        viz.update("men");

        // d3.interval(() => {
        //   viz.data = flag ? men : women;
        //   viz.update();
        //   flag = !flag;
        // }, 2000);
      }
    );
  }

  update(gender="men") {
    const viz = this;
    const data = "men" === gender ? viz.menData : viz.womenData;
    const svg = viz.svg;

    viz.xLabel.text(`World's tallest ${gender}!!`)

    // scale Y
    const y = d3
      .scaleLinear()
      // .domain([0, d3.max(data, (d) => d.height)]) // adjust the height
      // .domain([250, d3.max(data, (d) => d.height)]) // better adjustment
      .domain([
        d3.min(data, (d) => d.height) * 0.95,
        d3.max(data, (d) => d.height),
      ])
      // .range([0, HEIGHT])  // to grow bar from the bottom
      .range([HEIGHT, 0]);

    // scale X
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, WIDTH])
      .padding(0.4);

    const xAxisGenerator = d3.axisBottom(x);
    // svg
    //   .append("g")
    //   .attr("transform", `translate(0, ${HEIGHT})`)
    //   .call(xAxisGenerator);
    viz.xAxisGroup
      .transition()
      .duration(500) // smooth axis label transition
      .call(xAxisGenerator);

    // handle y axis
    const yAxisGenerator = d3.axisLeft(y);
    // svg
    //   .append("g") /////////
    //   .call(yAxisGenerator);
    viz.yAxisGroup
      .transition()
      .duration(500) // smooth axis label transition
      .call(yAxisGenerator);

    // DATA JOIN
    const rects = svg.selectAll("rect").data(data);

    // EXIT
    rects
      .exit()
      .attr('fill', 'red')
      .transition()
      .duration(500) //
      .attr('height', 0)
      .attr('y', HEIGHT)
      .remove();

    // UPDATE
    rects

      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.height))
      .attr("width", x.bandwidth)
      .attr("height", (d) => HEIGHT - y(d.height));

    // ENTER
    rects
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.name))
      .attr("width", x.bandwidth)
      // .attr("height", (d) => y(d.height)) // align at the bottom
      // .attr("height", (d) => HEIGHT - y(d.height))
      .attr("fill", "gray")
      .attr("y", HEIGHT)      // rise from bottom
      .transition()
      .duration(500)
      .attr("height", (d) => HEIGHT - y(d.height))
      .attr("y", (d) => y(d.height));  
  }
}
