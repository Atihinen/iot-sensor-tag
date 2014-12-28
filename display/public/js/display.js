$(document).ready(function(){
	var $startContainer = $("#not-submmitted");
	var $submitBtn = $("#submit-btn");
	var $submitForm = $("#not-submitted-form");
	var $valueContainer = $("#submitted");
	var $panelHeading = $(".panel-heading");

	$submitBtn.on("click", function(){
		$startContainer.hide();
		window.connectOnClick();
		$valueContainer.removeClass("hidden");
		//TODO create async post to actually register service
	});


	$panelHeading.on("click", function(){
		var $parent = $(this).parent();
		var $content = $parent.children().last();
		var $icon = $(this).children().first();
		if ($icon.hasClass("glyphicon-resize-full")){
			$icon.removeClass("glyphicon-resize-full");
			$icon.addClass("glyphicon-resize-small");
			$content.show();
		}
		else {
			$icon.removeClass("glyphicon-resize-small");
			$icon.addClass("glyphicon-resize-full");
			$content.hide();
			
		}
	});
});