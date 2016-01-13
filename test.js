var listbodystatus = 1;
var divlist = new Array();
var vis = d3.select(".listbody")
			.selectAll("div")
			.data(data)
			.enter()
			.append("div")
			.attr("class","app")
			.attr("data-toggle","toggle")
			.attr("data-target","#demo")
			.attr("id",function(d,i){ return "div"+i;})
			.on("click",function(d){
			
				d3.selectAll(".listbody div").classed("active",false);
				var selector = $(this).data("target");
				if(listbodystatus === 1)
				{
					//globalid = $(this).id;
					if(divlist.length == 0 || (divlist.indexOf($(this).id) == -1)){
						divlist.push($(this).id);
					}
					
					$(selector).toggleClass("in");
					$(this).toggleClass("active");
					listbodystatus++;
					
				}else if((divlist.indexOf($(this).id) > -1))
				{
					$(selector).toggleClass("in");
					divlist.splice(divlist.indexOf($(this).id));
					listbodystatus = 1;
					
				}else if(listbodystatus > 1 && (divlist.indexOf($(this).id) == -1)){
					
					//$(this).toggleClass('active');
					//setTimeout(function(){
						divlist.push($(this).id);
					    listbodystatus = 1;
						$(selector).html("abc");
					//},1400);
				}
				
				$(".slolist").empty();
				$(".progress-bar sloprogresscompletion").empty();
				
				setTimeout(function(){
					drawSLO(d);
				},900);
				
			})
			
			
			