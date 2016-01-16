$(document).ready(function() {
	$.get('data/data.csv', function(data) {
		var html = "<table id='list_table' class='table table-striped'>";
		var rows = data.split("\n");
		
		html += "<tr>";
		html += "<td><div class='table_heading' style='width:80%'>Comments</div><div class='table_heading' style='width:10%'>Likes</div><div class='table_heading' style='width:10%'>Report</div></td>";
		html += "</tr>";
		
		rows.forEach( function getvalues(ourrow) {
		html += "<tr class='my_div'>";

		var columns = ourrow.split(",");
		
		if(columns[0].length > 255){
			html += "<td><div class='comments' data-comments='"+columns[0]+"'>" + columns[0].substring(0,254) + "...<a href='#'>more</a></div><div class='likes'><img src='../project2/images/like-icon.png'/> "+columns[1]+"</div><div class='report'>Report</div></td>";
		}else{
			html += "<td><div class='comments'>" + columns[0] + "</div><div class='likes'><img src='../project2/images/like-icon.png'/> "+columns[1]+"</div><div class='report'>Report</div></td>";
		}
		
		html += "</tr>";
		
		});
		
		html += "</table>";		
		$('.table_body').append(html);
		
		$('#list_table tr td div a').click(function(e){		 
			e.preventDefault();
			var div_comments = $(this).closest('td').find(".comments").attr('data-comments');			
			$(this).closest('td').find(".comments").text(div_comments);
			$(this).closest('td').find(".comments a").css("display","none");
		});
	});		
});