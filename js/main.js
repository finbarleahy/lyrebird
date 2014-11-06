/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
                    "id": "circle" + getRandomInt(0, 4),
                    "cx": (columnIndex * this.cxSpacing),
                    "cy": cyPosition,
                    "radius": this.radius,
                    "color" : ((i < 1980) ? "steelblue" : "#dc463f")
                }
            );
        }
        return dataset;
    }
}

var svgContainer = d3.select("body").select("svg");

var generator =  new CircleGenerator(3225, 115, 2.5);
var source = svgContainer
    .append("g")
    .attr("id", "source")
    .attr("transform", "translate(80,0)")
    .selectAll("circle")
    .data(generator.getCircles())
    .enter()
    .append("circle")
    .attr("cx", function (d) { return d.cx; })
    .attr("cy", function (d) { return d.cy; })
    .attr("r", function (d) { return d.radius; })
    .attr("id", function (d, i) { return i;})
    .style("fill", function (d) { return d.color; });

var destinationGenerator = new CircleGenerator(2, 2, 2.5, 5);
var destination = svgContainer.append("g")
    .attr("transform", "translate(80,270)")
    .selectAll("circle")
    .data(destinationGenerator.getCircles())
    .enter()
    .append("circle")
    .attr("cx", function (d) { return d.cx; })
    .attr("cy", function (d) { return d.cy; })
    .attr("r", function (d) { return d.radius; })
    .attr("id", function (d, i) { return "c" + i;})
    .style("fill", function (d) { return d.color; });

var cx = d3.selectAll("g").selectAll("#c1").attr("cx");
var cy = d3.selectAll("g").selectAll("#c1").attr("cy");
var tempCx = 100;
var tempCy = -100;

$('.alternate').click(function ()
{
    var temp;
    temp = cx, cx = tempCx, tempCx = temp;
    temp = cy, cy = tempCy, tempCy = temp;

    try {
        d3.selectAll("g")
            .selectAll("#c1")
            .transition()
            .attr("cx", cx)
            .attr("cy", cy)
            .ease("elastic")
            .duration(4000)
            .delay(0);
    }
    catch (err) {
        $("#errorMessage").text(err);
    }
});

function swap(a, b){

}