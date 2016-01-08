$(document).ready(function () {
    var global_json = {};
	
 
    d3.json("../project3/data/sample.json", function (error, response) {

        global_json = response;

        var ul = d3.select(".list_block").append("ul").attr("id","content-slider").attr("class","content-slider");
        response.forEach(function (data, i) {
            if (data.emplevel == 1) {
                var li = ul.append("li");

                var div_list_heading = li.append("div")
                    .attr("class", "list_heading");

                var div_list_heading_para = div_list_heading.append("p")
                    .text(data.name)
                div_list_heading.append("p")
                    .text(data.job_description);

                var div_description = li.append("div")
                    .attr("class", "description");


                var div_description_para = div_description.append("p").text('Unit:').append("span").text(data.unit);
                var div_description_para2 = div_description.append("p").attr("class", ".designation").text(data.designation + '---' + data.WORKER_ID);

                var div_direct = li.append("div")
                    .attr("data-toggle", "tab")
                    .attr("id", "worker_" + data.WORKER_ID)
                    .attr("class", "direct").append("p").text("Directs")
                    .on("click", function () {
                        $(".tab-content").toggle();
                        displayLevel2Emp(data.WORKER_ID);
                    });


                var direct_value = total_directs(data.WORKER_ID);

                var numbers = div_direct.append("div")
                    .attr("class", "numbers")
                    .text(direct_value);
            }
        });
		$("#content-slider").lightSlider({
			loop:false
		});
		
    });
		
	
   /* var slideCount = $('#slider ul li').length;
    var slideWidth = $('#slider ul li').width();
    var slideHeight = $('#slider ul li').height();
    var sliderUlWidth = slideCount * slideWidth;

    $('#slider').css({
        width: slideWidth,
        height: slideHeight
    });

    $('#slider ul').css({
        width: sliderUlWidth,
        marginLeft: -slideWidth
    });

    $('#slider ul li:last-child').prependTo('#slider ul');
*/

	
			
    function total_directs(worker_id) {
        var count = 0;
        global_json.forEach(function (dd, i) {
            if (dd.emplevel == 2 && dd.SUPERVISOR_PARTY_ID == worker_id) {
                count++;
            }
        });

        return count;
    }

    function displayLevel2Emp(worker_id) {
        d3.select("#level_two_members").html("");
        var ul = d3.select("#level_two_members").append("ul").attr("class", "list_members");
        var li = '';

        global_json.forEach(function (dd, i) {
            if (dd.emplevel == 2 && dd.SUPERVISOR_PARTY_ID == worker_id) {
                var li = ul.append("li").append("a").attr("href", "#").text(dd.name);
            }
        });
    }

   /* function moveLeft() {
        $('#slider ul').animate({
            left: +slideWidth
        }, 200, function () {
            $('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    function moveRight() {
        $('#slider ul').animate({
            left: -slideWidth
        }, 100, function () {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    $('a.control_prev').click(function () {
        moveLeft();
    });

    $('a.control_next').click(function () {
        moveRight();
    });*/	
});