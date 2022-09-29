"use strict";

d3.csv("cities.csv", d3.autoType).then((cities) => {
  let euro = cities.filter((city) => city.eu === true);
  d3.select(".city-count").text(`Number of Cities: ${euro.length}`);

  renderScatterPlot(euro);
});

d3.csv("buildings.csv", d3.autoType).then((data) => {
  let cities = data.sort((a, b) => b.height_ft - a.height_ft); // why not work
  console.log(cities);

  renderBarChart(cities);
});

const renderPanel = (d, i) => {
  const panel = document.querySelector(".detail-panel");
  let path = `./img/${i + 1}.jpg`;
  let inner =
    `<img src=${path}></img>` +
    `<div class="info"><h2>${d.building}</h2>
    <div class="row">
      <span class=category>Height</br></span>
      <span class=stat>${d.height_ft} ft</span>
    </div>
    <div class="row">
      <span class=category>City</br></span>
      <span class=stat>${d.city}</span>
    </div>
    <div class="row">
      <span class=category>Country</br></span>
      <span class=stat>${d.country}</span>
    </div>
    <div class="row">
      <span class=category>Floors</br></span>
      <span class=stat>${d.floors}</span>
    </div>
    <div class="row">
      <span class=category>Completed</br></span>
      <span class=stat>${d.completed}</span>
    </div>
    </div>
    `;

  panel.innerHTML = inner;
};

const renderBarChart = (cities) => {
  const width = 550;
  const height = 500;
  const svg = d3
    .select(".city-chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  svg
    .selectAll("rect")
    .data(cities)
    .enter()
    .append("rect")
    .attr("width", (d) => d.height_px)
    .attr("height", 37)
    .attr("x", 235)
    .attr("y", (d, i) => 45 * i)
    .style("fill", "#FFAA00")
    .on("click", (e, d) => {
      renderPanel(d, cities.indexOf(d));
    });

  svg
    .selectAll("text")
    .data(cities)
    .enter()
    .append("text")
    .attr("text-anchor", "center")
    .attr("dy", (d, i) => i * 45 + 25)
    .attr("dx", 0)
    .text((d) => d.building);

  svg
    .selectAll("text2")
    .data(cities)
    .enter()
    .append("text")
    .attr("class", "height")
    .attr("text-anchor", "end")
    .attr("dx", (d) => d.height_px + 225)
    .attr("dy", (d, i) => i * 45 + 25)
    .text((d) => d.height_ft + " ft")
    .style("fill", "#FFFFFF");
};

const renderScatterPlot = (cities) => {
  const width = 700;
  const height = 550;
  const svg = d3
    .select(".population-plot")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // plotting circles
  svg
    .selectAll("dot")
    .data(cities)
    .enter()
    .append("circle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", (d) => (d.population >= 1000000 ? 8 : 4))
    .style("fill", "#0099DD");

  // adding labels to cities with populations >= 1000000
  svg
    .selectAll("text")
    .data(cities.filter((city) => city.population >= 1000000))
    .enter()
    .append("text")
    .attr("text-anchor", "middle")
    .attr("dx", (d) => d.x)
    .attr("dy", (d) => d.y - 10)
    .attr("class", "label")
    .text((d) => d.city);
};
