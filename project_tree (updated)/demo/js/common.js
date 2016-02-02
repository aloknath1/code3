var proj_type = 'MPPL';
var list = '';
var dtlist = '';
var level1_workerid = new Array();
var image = 'imgs/man.jpg';
var list_submenu = '';
var dataset = [
    {
        label: 'FTE',
        count: 10
    },
    {
        label: 'On-site',
        count: 20
    },
    {
        label: 'Off-site',
        count: 30
    },
    {
        label: 'Near shore',
        count: 40
    },
    {
        label: 'Domestic',
        count: 50
    }
        ];

var margin = {
    top: 80,
    right: 80,
    bottom: 80,
    left: 80
};
var color = d3.scale.ordinal().range(["#26B99A", "#3498DB", "#455C73", "#9B59B6", "#BDC3C7"]);
var width = 500 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

var format2 = d3.time.format("%B %d,%Y | %H:%M");
var vis = d3.select("#date_time")
    .text("Date as of " + format2(new Date("12/16/15")));

$(document).ready(function () {
	//for james 
	$.getJSON('http://localhost:8100/d3_practice/project_tree/demo/jamesmillerdata.json', function (data) {
        dtlist = data;
        $.each(data, function (key, value) {
            if (value.emplevel == 1) {
              list += '<li id="worker_' + value.WORKER_PARTY_ID + '" onclick="graphs(' + value.WORKER_PARTY_ID + ')" class="menu--item  menu--item"> <div class="left_div"><label class="menu--link" title="' + value.INDIV_FULL_NM + '"><img src="' + image + '" alt="' + value.INDIV_FULL_NM + '" /><p>Unit: "' + value.ORGANIZATION_UNIT_CD + '"</p></label></div><div class="right_div"><p>' + value.INDIV_FULL_NM + '</p><p>"' + value.JOB_DESCRIPTION + '"</p></div></li>';
            }
        });
        
        $("ul#js-menu").append(list);
		list = '';
    });
  
    //for level1
    $.getJSON('http://localhost:8100/d3_practice/project_tree/demo/employeeleveldata.json', function (data1) {
        dtlist = data1;
        $.each(data1, function (key, value) {
            if (value.emplevel == 1) {
				var worker_id = value.WORKER_PARTY_ID;	
                //list += '<li id="worker_' + value.WORKER_PARTY_ID + '" onclick="graphs(' + value.WORKER_PARTY_ID + ')" class="menu--item"><div class="left_div"><label class="menu--link" title="' + value.INDIV_FULL_NM + '"><img src="' + image + '" alt="' + value.INDIV_FULL_NM + '" /><p>Unit: "' + value.ORGANIZATION_UNIT_CD + '"</p></label></div><div class="right_div"><p>' + value.INDIV_FULL_NM + '</p><p>"' + value.job_description + '"</p></div></li>';
				list += '<li id="worker_' + value.WORKER_PARTY_ID + '" onclick="graphs(' + value.WORKER_PARTY_ID + ')" class="menu--item"><label class="menu--link" title="' + value.INDIV_FULL_NM + '">' + value.INDIV_FULL_NM + '</label></li>';
				level1_workerid.push(value.WORKER_PARTY_ID);
            }
        });
        $("ul#js-menu").append(list);
		list = '';
		$.each(dtlist, function (key1, value1) {
			if (value1.emplevel == 2 && level1_workerid.length > 0 && level1_workerid.indexOf(value1.SUPERVISOR_PARTY_ID) > -1) {
				if(!$("#worker_"+value1.SUPERVISOR_PARTY_ID).hasClass("menu--item__has_sub_menu"))
				{
					$("#worker_"+value1.SUPERVISOR_PARTY_ID).addClass("menu--item__has_sub_menu");			//adding the class to li element
					$("#worker_"+value1.SUPERVISOR_PARTY_ID).append("<ul class='sub_menu'></ul>");
				}
				
				list = '<li id="worker_' + value1.WORKER_PARTY_ID + '" class="sub_menu--item"><a href="#" onclick="graphs(' + value1.WORKER_PARTY_ID + ')" class="sub_menu--link">' + value1.INDIV_FULL_NM + '</a></li>';
				$("#worker_"+value1.SUPERVISOR_PARTY_ID+" ul.sub_menu").append(list);			
			}
		});		
    });			
	
	//button clicks
	$("#monthly").click(function(){
		barchart1_monthly(proj_type);	
		donut_chart();
		barchart2_monthly(proj_type);
	});
	
	$("#weekly").click(function(){
		barchart1_weekly(proj_type);
		donut_chart();		
		barchart2_weekly(proj_type);
	});
});

function graphs(worker_id) {
	
	if($("#worker_"+worker_id).hasClass("menu--item__has_sub_menu"))
	{
		$(".menu--subitens__opened").removeClass("menu--subitens__opened");	
		$("#worker_"+worker_id).addClass("menu--subitens__opened");			//adding the class to li element
	}

    var name = $('#worker_' + worker_id + ' label').attr('title');

    $(".person_name").text(name);

	$("#filter_btn").css("display","block");
	
    //calling all graphs on click
    barchart1_monthly(proj_type); //bar chart1
    donut_chart(); // donut chart
    barchart2_monthly(proj_type); //barchart2    
}