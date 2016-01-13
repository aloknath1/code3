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
				globalid = d3.select(this).attr('id'); 
				d3.selectAll(".listbody div").classed("active",false);
				var selector = $(this).data("target");
				if(listbodystatus === 1)
				{
					//globalid = $(this).id;
					if(divlist.length == 0 || (divlist.indexOf(globalid) == -1)){
						divlist.push(globalid);
					}
					console.log("first time");
					$(selector).toggleClass("in");
					$(this).toggleClass("active");
					listbodystatus++;
					
				}else if(divlist.indexOf(globalid) > -1){	
					console.log("div id exists--"+globalid);
					//$(selector).toggleClass("in");
					$(selector).removeClass("in");
					divlist.splice(divlist.indexOf(globalid),1);
					listbodystatus = 1;
					
				}else{					
					$(this).toggleClass("active");
					setTimeout(function(){
						console.log("div id does not exists---"+globalid);
						divlist.push(globalid);
						$(selector).html("abc");	
						listbodystatus++;
					},1400);					
				}
						
				$(".slolist").empty();
				$(".progress-bar sloprogresscompletion").empty();
				
				setTimeout(function(){
					drawSLO(d);
				},900);
				
			})
			
			
			