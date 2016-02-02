function barchart1_monthly(proj_type) {
    $(".bar_chart1").html(''); //empty the donut chart

    var margin = {
            top: 80,
            right: 80,
            bottom: 80,
            left: 80
        },
        width = 450 - margin.left - margin.right,
        height = 400 - margin.top;

    var col = 0;
    var line = 0;

    var x0 = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.ordinal()
        .range(["#26B99A", "#3498DB", "#455C73", "#9B59B6", "#BDC3C7"]);

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

    d3.json("../demo/EIBI Charts data/EIBI_Actual_Cost_MONTHLY.json", function (error, data) {
        if (error) throw error;
		
		data.sort(function(a, b){
			var keyA = new Date(a.WEEK_ENDING_DT),
				keyB = new Date(b.WEEK_ENDING_DT);
			// Compare the 2 dates
			if(keyA < keyB) return -1;
			if(keyA > keyB) return 1;
			return 0;
		});
		
        var ageNames = d3.keys(data[0]).filter(function (key) {
			if(data[0]['PROJ_TYPE'] == proj_type){
				return key !== "WEEK_ENDING_DT" && key !== "PROJ_TYPE";
			}				
        });

        data.forEach(function (d) {
			
			d.ages = ageNames.map(function (name) {
				
					return {
						name: name,
						value: +d[name]
					};
				
			});
			
        });

        x0.domain(data.map(function (d) {
            return d.WEEK_ENDING_DT;
        }));
        x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
        y.domain([0, d3.max(data, function (d) {
            return d3.max(d.ages, function (d) {
                return d.value;
            });
        })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
			.selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)" );

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("");

		svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text(proj_type);
		
        var state = svg.selectAll(".state")
            .data(data)
            .enter().append("g")
            .attr("class", "state")
            .attr("transform", function (d) {
                return "translate(" + x0(d.WEEK_ENDING_DT) + ",0)";
            });

			
        state.selectAll("rect")
            .data(function (d) {
                return d.ages;
            })
            .enter().append("rect")
            .attr("width", x1.rangeBand())
            .attr("x", function (d) {
                return x1(d.name);
            })
            .attr("y", function (d) {
                return y(d.value);
            })
            .attr("height", function (d) {
                return height - y(d.value);
            })
            .style("fill", function (d) {
                return color(d.name);
            });

        var legend = svg.selectAll(".legend")
            .data(ageNames.slice().reverse())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) {
                var y = line * 10;
                var x = col;
                col += d.length * 8;
                if (col > width) {
                    x = 0;
                    col = d.length * 13 + 10;
                    line++;
                    y = line * 25;
                }
                return "translate(" + x + "," + y + ")";
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
            .text(function (d) {
                return d;
            });
			
			
			
			
    });
}

function barchart1_weekly(proj_type) {
    $(".bar_chart1").html(''); //empty the donut chart

    var margin = {
            top: 80,
            right: 80,
            bottom: 80,
            left: 80
        },
        width = 450 - margin.left - margin.right,
        height = 400 - margin.top;

    var col = 0;
    var line = 0;

    var x0 = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.ordinal()
        .range(["#26B99A", "#3498DB", "#455C73", "#9B59B6", "#BDC3C7"]);

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

    d3.json("../demo/EIBI Charts data/EIBI_ACTUAL_COST_weekly.json", function (error, data) {
        if (error) throw error;
		
		data.sort(function(a, b){
			var keyA = new Date(a.WEEK_ENDING_DT),
				keyB = new Date(b.WEEK_ENDING_DT);
			// Compare the 2 dates
			if(keyA < keyB) return -1;
			if(keyA > keyB) return 1;
			return 0;
		});
		
        var ageNames = d3.keys(data[0]).filter(function (key) {
			if(data[0]['PROJ_TYPE'] == proj_type){
				return key !== "WEEK_ENDING_DT" && key !== "PROJ_TYPE";
			}				
        });

        data.forEach(function (d) {
			
			d.ages = ageNames.map(function (name) {
				
					return {
						name: name,
						value: +d[name]
					};
				
			});
			
        });

        x0.domain(data.map(function (d) {
            return d.WEEK_ENDING_DT;
        }));
        x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
        y.domain([0, d3.max(data, function (d) {
            return d3.max(d.ages, function (d) {
                return d.value;
            });
        })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
			.selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)" );

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("");

		svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text(proj_type);
		
        var state = svg.selectAll(".state")
            .data(data)
            .enter().append("g")
            .attr("class", "state")
            .attr("transform", function (d) {
                return "translate(" + x0(d.WEEK_ENDING_DT) + ",0)";
            });

			
        state.selectAll("rect")
            .data(function (d) {
                return d.ages;
            })
            .enter().append("rect")
            .attr("width", x1.rangeBand())
            .attr("x", function (d) {
                return x1(d.name);
            })
            .attr("y", function (d) {
                return y(d.value);
            })
            .attr("height", function (d) {
                return height - y(d.value);
            })
            .style("fill", function (d) {
                return color(d.name);
            });

        var legend = svg.selectAll(".legend")
            .data(ageNames.slice().reverse())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) {
                var y = line * 10;
                var x = col;
                col += d.length * 8;
                if (col > width) {
                    x = 0;
                    col = d.length * 13 + 10;
                    line++;
                    y = line * 25;
                }
                return "translate(" + x + "," + y + ")";
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
            .text(function (d) {
                return d;
            });
			
			
			
			
    });
}
