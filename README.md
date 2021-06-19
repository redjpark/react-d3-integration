# Tutorial/Learning D3 React Integration

# Creating project
```
npx create-react-app d3-app
cd d3-app
yarn add d3
yarn add react-bootstrap
```

Note: Don't forget to include bootstrap css into your project. (ie. App.js)
```
import "bootstrap/dist/css/bootstrap.min.css";

```

# Strategy
D3 components are integrated into React app using [Lifecycle Methods Wrapping](https://www.smashingmagazine.com/2018/02/react-d3-ecosystem/) approach. 

`
This approach, first stated by Nicolas Hery, makes use of the lifecycle methods present in class-based React components. It elegantly wraps the creation, update and removal of D3.js charts, establishing a sharp boundary between React and D3.js code.
`
# barchart
<code>App.js, ChartWrapper.js, D3Chart.js</code> has a simple barchar code example. The code includes the dynamic loading of different datasets to generate a new barchart via a dropdown menu.

# scatterplot
<code>App.js, ScatterplotWrapper.js, D3Scatterplot.js</code> has code for more interactions between d3 and the React component. 

For instance, mouseover on scatterplot item highlights the corresponding React component element, and the vise versa.
Also, adding new items from the react component will be refected on the d3 scatterplot chart.


# References
* Introduction To D3.js with React (Adam Janes)
* https://britecharts.github.io/britecharts-react/
* https://www.smashingmagazine.com/2018/02/react-d3-ecosystem/

# git
```
pushing an existing repository from the command line
git remote add origin git@github.com:redjpark/react-d3-integration.git
git branch -M main
git push -u origin main
```
