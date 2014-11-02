var red = "#dc463f";

function CircleGenerator(ballCount, ballsPerLine, radius)
{
    this.ballCount = ballCount;
    this.ballsPerLine = ballsPerLine;
    this.radius = radius;
    this.cxSpacing = 7;
    this.cySpacing = 7;

    this.getCircles = function () {
        var dataset = [];
        for (var i = 0; i < this.ballCount; i++) {

            var lineNumber = Math.floor(i/this.ballsPerLine);
            var cyPosition = 20 + (this.cySpacing * lineNumber);
            var columnIndex = i - (this.ballsPerLine * (lineNumber));

            dataset.push(
                {
                    "cx": (columnIndex * this.cxSpacing),
                    "cy": cyPosition,
                    "radius": this.radius,
                    "color" : "steelblue" }
            );
        }
        return dataset;
    }
}

var svgContainer = d3.select("body").select("svg");

var generator =  new CircleGenerator(3225, 115, 2.5);
var source = svgContainer
    .append("g")
    .attr("transform", "translate(80,0)")
    .selectAll("circle")
    .data(generator.getCircles())
    .enter()
    .append("circle")
    .attr("cx", function (d) { return d.cx; })
    .attr("cy", function (d) { return d.cy; })
    .attr("r", function (d) { return d.radius; })
    .style("fill", function (d) { return d.color; });

generator =  new CircleGenerator(1250, 115, 2.5, 5);
var destination = svgContainer.append("g")
    .attr("transform", "translate(80,270)")
    .selectAll("circle")
    .data(genDestination.getCircles())
    .enter()
    .append("circle")
    .attr("cx", function (d) { return d.cx; })
    .attr("cy", function (d) { return d.cy; })
    .attr("r", function (d) { return d.radius; })
    .style("fill", function (d) { return d.color; });