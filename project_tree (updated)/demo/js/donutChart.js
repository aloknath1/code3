function donut_chart() {
    $(".donut_chart").html(''); //empty the donut chart

    var width = 360,
        height = 270;
    var radius = Math.min(width, height) / 2;
    var donutWidth = 50; // NEW
    var legendRectSize = 18; // NEW
    var legendSpacing = 4; // NEW

    var svg = d3.select('.donut_chart')
        .append('svg')
        .attr('width', width)
        .attr("height", height + margin.top)
        .append('g')
        .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

    var arc = d3.svg.arc()
        .innerRadius(radius - donutWidth)
        .outerRadius(radius);

    var pie = d3.layout.pie()
        .value(function (d) {
            return d.count;
        }) //pie value
        .sort(null);

    var path = svg.selectAll('path')
        .data(pie(dataset))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function (d, i) {
            return color(d.data.label); //label of dataset
        });

    //add legend
    var legend = svg.selectAll('.legend') // NEW
        .data(color.domain()) // NEW
        .enter() // NEW
        .append('g') // NEW
        .attr('class', 'legend') // NEW
		.attr('transform', function (d, i) { // NEW
            var height = legendRectSize + legendSpacing; // NEW
            var offset = height * color.domain().length / 2; // NEW
            var horz = -2 * legendRectSize; // NEW
            var vert = i * height - offset; // NEW
            return 'translate(' + horz + ',' + vert + ')'; // NEW
        }); // NEW

    legend.append('rect') // NEW
        .attr('width', 90) // NEW
		.style('border-radius', '9px') // NEW		
        .attr('height', legendRectSize) // NEW
        .style('fill', color) // NEW
        .style('stroke', color); // NEW

    legend.append('text') // NEW
        .attr('x', legendRectSize + legendSpacing) // NEW
        .attr('y', legendRectSize - legendSpacing) // NEW
		.style('cursor', 'pointer') // NEW
		.style('font-size', '11px') // NEW
		.style('text-align', 'left') // NEW
		.style('color', 'white') // NEW		
        .text(function (d) {
			return d;
        }).on("dblclick",function(d){			

			var res_type = '';
			
			if(d.indexOf('-') > -1){
				var str_arr = d.split('-');
				res_type = str_arr[0]+'_'+str_arr[1];				
			}else{
				res_type = d;	
			}
			
			res_type = res_type.toLowerCase().trim();
			
			//call the line graph
			linechart_monthly(res_type);
		}); // NEW	  
}