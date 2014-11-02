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

var circleGroup = svgContainer.append("g")
                    .attr("transform", "translate(80,0)");

var generator =  new CircleGenerator(3225, 115, 2.5);

var circles = circleGroup.selectAll("circle")
                          .data(generator.getCircles())
                          .enter()
                          .append("circle");

var circleAttributes = circles
                        .attr("cx", function (d) { return d.cx; })
                        .attr("cy", function (d) { return d.cy; })
                        .attr("r", function (d) { return d.radius; })
                        .style("fill", function (d) { return d.color; });


var circleGroupDest = svgContainer.append("g")
    .attr("transform", "translate(80,270)");
var genDestination =  new CircleGenerator(1250, 115, 2, 5);
var circlesDest = circleGroupDest.selectAll("circle")
    .data(genDestination.getCircles())
    .enter()
    .append("circle");

var circleAttributesDest = circlesDest
    .attr("cx", function (d) { return d.cx; })
    .attr("cy", function (d) { return d.cy; })
    .attr("r", function (d) { return d.radius; })
    .style("fill", function (d) { return d.color; });
