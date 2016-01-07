$(document).ready(function(){
	
	
	d3.json("../project3/data/sample.json",function(error,response){
		console.log(response);	
		ul = d3.select(".list_block").append("ul");
		response.forEach(function(data, i) { 			
			if(data.emplevel == 1)
			{					
				var li = ul.append("li");
				
				var div_list_heading = li.append("div")
						   .attr("class","list_heading");
						   
						   
				var div_list_heading_para = div_list_heading.append("p")
						   .text(data.name)
						 div_list_heading.append("p")
						   .text(data.description);
						   
				var div_description = li.append("div")
						   .attr("class","description");
						   
			
				var div_description_para = 	div_description.append("p").text('Unit:').append("span").text(data.unit);
				var div_description_para2 = div_description.append("p").attr("class",".designation").text(data.designation);
				
				var div_direct = li.append("div")
								   .attr("data-toggle","tab")
								   .attr("class","direct").append("p").text("Directs");
								   
				var numbers = 	div_direct.append("div")
										  .attr("class","numbers")
										  .text("6");				
			}
		});
	});	
	
	
	var slideCount = $('#slider ul li').length;
    var slideWidth = $('#slider ul li').width();
    var slideHeight = $('#slider ul li').height();
    var sliderUlWidth = slideCount * slideWidth;

    $('#slider').css({ width: slideWidth, height: slideHeight });

    $('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });

    $('#slider ul li:last-child').prependTo('#slider ul');

    function moveLeft() {
        $('#slider ul').animate({
            left: + slideWidth
        }, 200, function () {
            $('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    function moveRight() {
        $('#slider ul').animate({
            left: - slideWidth
        }, 200, function () {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    $('a.control_prev').click(function () {
        moveLeft();
    });

    $('a.control_next').click(function () {
        moveRight();
    });
});