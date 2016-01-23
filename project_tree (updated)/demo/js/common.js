var list = '';
var dtlist = '';
var level1_workerid = new Array();
var image = 'imgs/man.jpg';

var dataset = [
          { label: 'FTE', count: 10 }, 
          { label: 'On-site', count: 20 },
          { label: 'Off-site', count: 30 },
          { label: 'Near shore', count: 40 },
		  { label: 'Domestic', count: 50 }
        ];

var margin = {top: 80, right: 80, bottom: 80, left: 80};
var color = d3.scale.ordinal().range(["#F7D19F", "#E5CF95", "#FCC794", "#9FBACB", "#0C4A71"]);
var width = 500 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;
	
var format2 = d3.time.format("%B %d,%Y | %H:%M");
var vis = d3.select("#date_time")   
   .text("Date as of "+format2(new Date("12/16/15")));

$(document).ready(function(){
	
	list += '<li id="worker_0" onclick="graphs("worker_0")" class="menu--item  menu--item"><div class="left_div"><label class="menu--link" title="James Smith"><img src="'+image+'" alt="James Smith" /><p>Unit: 123</p></label></div><div class="right_div"><p>James Smith</p><p>CEO</p></div></li>';
	
	//for level1
	 $.getJSON('http://localhost:8100/d3_practice/project_tree/demo/sample.json', function(data) {	
		dtlist = data;
		$.each(data,function(key,value){			
			if(value.emplevel == 1){	
				
				list += '<li id="worker_'+value.workerId+'" onclick="graphs('+value.workerId+')" class="menu--item  menu--item"><div class="left_div"><label class="menu--link" title="'+value.name+'"><img src="'+image+'" alt="'+value.name+'" /><p>Unit: "'+value.unit+'"</p></label></div><div class="right_div"><p>'+value.name+'</p><p>"'+value.designation+'"</p></div></li>';			
				level1_workerid.push(value.workerId);
			}
		});
		 //console.log(level1_workerid);
		$("ul#js-menu").append(list);
	 });
});


function graphs(worker_id){
	
	var name = $('#worker_'+worker_id+' label').attr('title');
	
	$(".person_name").text(name);
	
	//calling all graphs on click
	barchart1(); 			//bar chart1
	donut_chart();			// donut chart
	barchart2();			//barchart2
	linechart();			//linechart2
	
}  

function linechart()
{
	$("#line_graph").html('');
	
	var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

	var parseDate = d3.time.format("%d-%b-%y").parse;

	var x = d3.time.scale()
		.range([0, width]);

	var y = d3.scale.linear()
		.range([height, 0]);

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");

	var line = d3.svg.line()
		.x(function(d) { return x(d.date); })
		.y(function(d) { return y(d.close); });

	var svg = d3.select("#line_graph").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	  .append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	d3.tsv("../demo/data3.tsv", function(error, data) {
	  if (error) throw error;

	  data.forEach(function(d) {
		d.date = parseDate(d.date);
		d.close = +d.close;
	  });

	  x.domain(d3.extent(data, function(d) { return d.date; }));
	  y.domain(d3.extent(data, function(d) { return d.close; }));

	  svg.append("g")
		  .attr("class", "x axis")
		  .attr("transform", "translate(0," + height + ")")
		  .call(xAxis);

	  svg.append("g")
		  .attr("class", "y axis")
		  .call(yAxis)
		.append("text")
		  .attr("transform", "rotate(-90)")
		  .attr("y", 6)
		  .attr("dy", ".71em")
		  .style("text-anchor", "end")
		  .text("Price ($)");

	  svg.append("path")
		  .datum(data)
		  .attr("class", "line")
		  .attr("d", line);
	});
}

function donut_chart()
{
	$(".donut_chart").html('');			//empty the donut chart
	
	var width = 360,
    height = 270;	
	var radius = Math.min(width, height) / 2;
	var donutWidth = 50;                            // NEW
	var legendRectSize = 18;                                  // NEW
    var legendSpacing = 4;                                    // NEW
 
	var svg = d3.select('.donut_chart')
	  .append('svg')
	  .attr('width', width)	 
	  .attr("height", height + margin.top)
	  .append('g')	  
	  .attr('transform', 'translate(' + (width / 2) + 
		',' + (height / 2) + ')');

	var arc = d3.svg.arc()
          .innerRadius(radius - donutWidth)
          .outerRadius(radius);
		  
	var pie = d3.layout.pie()
	  .value(function(d) { return d.count; })	 			//pie value
	  .sort(null);

	var path = svg.selectAll('path')
          .data(pie(dataset))
          .enter()
          .append('path')
          .attr('d', arc)		 
          .attr('fill', function(d, i) { 
			return color(d.data.label);							//label of dataset
          });
		 
	//add legend
	 var legend = svg.selectAll('.legend')                     // NEW
          .data(color.domain())                                   // NEW
          .enter()                                                // NEW
          .append('g')                                            // NEW
          .attr('class', 'legend')                                // NEW
          .attr('transform', function(d, i) {                     // NEW
            var height = legendRectSize + legendSpacing;          // NEW
            var offset =  height * color.domain().length / 2;     // NEW
            var horz = -2 * legendRectSize;                       // NEW
            var vert = i * height - offset;                       // NEW
            return 'translate(' + horz + ',' + vert + ')';        // NEW
          });                                                     // NEW

        legend.append('rect')                                     // NEW
          .attr('width', legendRectSize)                          // NEW
          .attr('height', legendRectSize)                         // NEW
          .style('fill', color)                                   // NEW
          .style('stroke', color);                                // NEW
          
        legend.append('text')                                     // NEW
          .attr('x', legendRectSize + legendSpacing)              // NEW
          .attr('y', legendRectSize - legendSpacing)              // NEW
          .text(function(d) { return d; });                       // NEW	  
}

function barchart2()
{
	$(".bar_chart2").html('');			//empty the donut chart
	
	var margin = {top: 80, right: 80, bottom: 80, left: 80},
    width = 450 - margin.left  - margin.right,
    height = 400 - margin.top;

	var x0 = d3.scale.ordinal()
		.rangeRoundBands([0, width], .1);

	var x1 = d3.scale.ordinal();

	var y = d3.scale.linear()
		.range([height, 0]);

	var color = d3.scale.ordinal()
		.range(["#F7D19F", "#E5CF95", "#FCC794", "#9FBACB", "#0C4A71"]);

	var xAxis = d3.svg.axis()
		.scale(x0)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")
		.tickFormat(d3.format(".2s"));

	var svg = d3.select(".bar_chart2").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	d3.csv("../demo/data_hours.csv", function(error, data) {
	  if (error) throw error;

	  var ageNames = d3.keys(data[0]).filter(function(key) { return key !== "Year"; });

	  data.forEach(function(d) {
		d.ages = ageNames.map(function(name) { return {name: name, value: +d[name]}; });
	  });

	  x0.domain(data.map(function(d) { return d.Year; }));
	  x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
	  y.domain([0, d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })]);

	  svg.append("g")
		  .attr("class", "x axis")
		  .attr("transform", "translate(0," + height + ")")
		  .call(xAxis);

	  svg.append("g")
		  .attr("class", "y axis")
		  .call(yAxis)
		.append("text")
		  .attr("transform", "rotate(-90)")
		  .attr("y", 6)
		  .attr("dy", ".71em")
		  .style("text-anchor", "end")
		  .text("");

	  var state = svg.selectAll(".state")
		  .data(data)
		.enter().append("g")
		  .attr("class", "state")
		  .attr("transform", function(d) { return "translate(" + x0(d.Year) + ",0)"; });

	  state.selectAll("rect")
		  .data(function(d) { return d.ages; })
		.enter().append("rect")
		  .attr("width", x1.rangeBand())
		  .attr("x", function(d) { return x1(d.name); })
		  .attr("y", function(d) { return y(d.value); })
		  .attr("height", function(d) { return height - y(d.value); })
		  .style("fill", function(d) { return color(d.name); });

	  var legend = svg.selectAll(".legend")
		  .data(ageNames.slice().reverse())
		.enter().append("g")
		  .attr("class", "legend")
		  .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

	  legend.append("rect")
		  .attr("x", width - 18)
		  .attr("width", 18)
		  .attr("height", 18)
		  .style("fill", color);

	  legend.append("text")
		  .attr("x", width - 24)
		  .attr("y", 9)
		  .attr("dy", ".35em")
		  .style("text-anchor", "end")
		  .text(function(d) { return d; });

	});

}

function barchart1()
{
	$(".bar_chart1").html('');			//empty the donut chart
	
	var margin = {top: 80, right: 80, bottom: 80, left: 80},
    width = 450 - margin.left  - margin.right,
    height = 400 - margin.top;

	var col = 0;
	var line = 0;
	
	var x0 = d3.scale.ordinal()
		.rangeRoundBands([0, width], .1);

	var x1 = d3.scale.ordinal();

	var y = d3.scale.linear()
		.range([height, 0]);

	var color = d3.scale.ordinal()
		.range(["#F7D19F", "#E5CF95", "#FCC794", "#9FBACB", "#0C4A71"]);

	var xAxis = d3.svg.axis()
		.scale(x0)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")
		.tickFormat(d3.format(".2s"));

	var svg = d3.select(".bar_chart1").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	  .append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	d3.csv("../demo/data.csv", function(error, data) {
	  if (error) throw error;

	  var ageNames = d3.keys(data[0]).filter(function(key) { return key !== "Year"; });

	  data.forEach(function(d) {
		d.ages = ageNames.map(function(name) { return {name: name, value: +d[name]}; });
	  });

	  x0.domain(data.map(function(d) { return d.Year; }));
	  x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
	  y.domain([0, d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })]);

	  svg.append("g")
		  .attr("class", "x axis")
		  .attr("transform", "translate(0," + height + ")")
		  .call(xAxis);

	  svg.append("g")
		  .attr("class", "y axis")
		  .call(yAxis)
		.append("text")
		  .attr("transform", "rotate(-90)")
		  .attr("y", 6)
		  .attr("dy", ".71em")
		  .style("text-anchor", "end")
		  .text("");

	  var state = svg.selectAll(".state")
		  .data(data)
		.enter().append("g")
		  .attr("class", "state")
		  .attr("transform", function(d) { return "translate(" + x0(d.Year) + ",0)"; });

	  state.selectAll("rect")
		  .data(function(d) { return d.ages; })
		.enter().append("rect")
		  .attr("width", x1.rangeBand())
		  .attr("x", function(d) { return x1(d.name); })
		  .attr("y", function(d) { return y(d.value); })
		  .attr("height", function(d) { return height - y(d.value); })
		  .style("fill", function(d) { return color(d.name); });
		
	  var legend = svg.selectAll(".legend")
		  .data(ageNames.slice().reverse())
		  .enter().append("g")
		  .attr("class", "legend")
		  .attr("transform", function (d, i) {
			var y = line *10;
			var x = col;
			col += d.length*8;
			if (col > width){
				x = 0;
				col =d.length*13+ 10;
				line++;
				y = line *25;
			}
			return "translate("+x +","+ y +")";
			});

	  legend.append("rect")
		  .attr("x", 0)
		  .attr("width", 11)
		  .attr("height", 11)	
		  .style("fill", color);

	  legend.append("text")
		  .attr("x", 18)
		  .attr("y", 9)
		  .attr("dy", ".35em")
		  .style("text-anchor", "start")
		  .style("font-family", "monospace")
		  .text(function(d) { return d; });
	});

}
