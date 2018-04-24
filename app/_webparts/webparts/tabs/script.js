if ( $(".humanise-tabs__tab-select--tab").length ){
	var startLeft = $(".humanise-tabs__tab-select--tab").first().position().left;
	$('.humanise-tabs__nav-wrapper--nav').css('left',startLeft+'px');

	if(!($(".humanise-tabs__tab-select--tab").attr("role"))){
		//no role attribute is set, Umbraco strips them out so fix to add them back
		$('.humanise-tabs__tab-select--tab').each(function (i) {
		    $(this).attr("aria-controls","panel"+(i+1));
		    var thisSelected = "false";
		    if (i==0){
		    	thisSelected = "true";
		    }
		    $(this).attr("aria-selected",thisSelected);
		    $(this).attr("role","tab");
		});		
	}

	$(".humanise-tabs__tab-select--tab").click(function(){
		$("li[role='tab']").attr("aria-selected","false"); //deselect all the tabs 
		$(this).attr("aria-selected","true");  // select this tab
		var posLeft = $(this).position().left;
		$('.humanise-tabs__nav-wrapper--nav').css('left',posLeft+'px');
		var tabpanid= $(this).attr("aria-controls"); //find out what tab panel this tab controls  
		var tabpan = $("#"+tabpanid);  
		$("div[role='tabpanel']").attr("aria-hidden","true"); //hide all the panels 
		tabpan.attr("aria-hidden","false");  // show our panel
	});

	$("li[role='tab']").keydown(function(ev) {
		if (ev.which ==13) {
			$(this).click()
		}
	});

	//This adds keyboard function that pressing an arrow left or arrow right from the tabs toggle the tabs. 
	$("li[role='tab']").keydown(function(ev) { 
		if ((ev.which ==39)||(ev.which ==37)) { 
			var selected= $(this).attr("aria-selected"); 
			if (selected =="true"){ 
				$("li[aria-selected='false']").attr("aria-selected","true").focus(); 
				$(this).attr("aria-selected","false"); 
				var tabpanid= $("li[aria-selected='true']").attr("aria-controls"); 
				var tabpan = $("#"+tabpanid); 
				$("div[role='tabpanel']").attr("aria-hidden","true"); 
				tabpan.attr("aria-hidden","false");
			}
		}
	});
}