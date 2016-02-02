var formatDate = d3.time.format("%b %y");

function linechart_monthly(res_type) {
    $("#line_graph").html('');
	var line_data = [];
	var dt = '';
    var margin = {
            top: 30,
            right: 40,
            bottom: 30,
            left: 50
        },
        width = 600 - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;

    var x = d3.scale.ordinal().range([0, width]);

    var y = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis().scale(x).orient("bottom");

    var yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);		

    var line = d3.svg.line()
        .x(function (d) {
			return x(d.Month_Year);			
        })
        .y(function (d) {
			return y(d.Count);			
        });

    var svg = d3.select("#line_graph").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
    d3.json("../demo/EIBI Charts data/EIBI_Resource_count_monthly.json", function (error, data) {
        if (error) throw error;
		
        data.forEach(function (d) {
			if(d.RES_TYPE == res_type){
				d.Month_Year = d.Month_Year;
				d.Count = +d.Count;						
				line_data.push(d);
			}
        });

		//console.log(line_data);
        x.domain(d3.extent(line_data, function (d) {								
			return d.Month_Year;
        }));
        y.domain([0, d3.max(line_data, function(d) { 
			return Math.max(d.Count); 
		})]);

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
            .text("Count");
		
        svg.append("path")
            .datum(line_data)
            .attr("class", "line")
            .attr("d", line);
    });
}