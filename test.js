var listbodystatus = 1;
var divlist = new Array();
var globalid = '';
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
					globalid = d3.select(this).attr('id'); 					
					$(selector).toggleClass("in");
					$(this).toggleClass("active");
					listbodystatus++;
					
				}else if(listbodystatus > 1){	
					
					$(this).toggleClass("active");
					setTimeout(function(){
						globalid = d3.select(this).attr('id'); 		
						$(selector).html("abc");	
						listbodystatus++;
					},1000);					
				}
						
				$(".slolist").empty();
				$(".progress-bar sloprogresscompletion").empty();
				
				setTimeout(function(){
					drawSLO(d);
				},900);
				
			})
			
			
			