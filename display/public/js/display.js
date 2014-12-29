var thermoTresMin = 0;
var thermoTresMax = 0;
var prevThermoStatus = "success";
var humidityTresMin = 0;
var humidityTresMax = 0;
var prevHumidityStatus = "success";
var $thermoVal;
var $thermoForm;
var $humidityForm;
var $humidityVal;


function writeLog(sensor, value){
	$.get('./log/'+sensor+'/'+value, {});
}

function checkTreshold(treshold, value){
	var marginMin;
	var marginMax;
	var margin = 0.4;
	value = parseFloat(value).toFixed(2);
	switch(treshold){
		case "thermo":
			if($thermoForm.find('input[type=submit]').val() == "Defined"){
				$thermoVal.parent().removeClass();
				$thermoVal.parent().addClass("input-group");
				marginMax = thermoTresMax - (thermoTresMax*margin);
				marginMin = thermoTresMin + (thermoTresMin*margin);
				if (value > marginMin && value < marginMax){
					$thermoVal.parent().addClass("has-success");
					if(prevThermoStatus == "error"){
						writeLog("thermo", "Recovery: "+value);
					}
					prevThermoStatus = "success";
				}
				else if ((value > thermoTresMin && value < marginMin) || (value < thermoTresMax && value > marginMax) ){
					$thermoVal.parent().addClass("has-warning");
				}
				else if( value >= thermoTresMax || value <= thermoTresMin){
					$thermoVal.parent().addClass("has-error");
					if(prevThermoStatus != "error"){
						writeLog("thermo", value);
					}
					prevThermoStatus = "error";
				}
			}
			break;
		case "humidity":
			if($humidityForm.find('input[type=submit]').val() == "Defined"){
				$humidityVal.parent().removeClass();
				$humidityVal.parent().addClass("input-group");
				marginMax = humidityTresMax - (humidityTresMax*margin);
				marginMin = humidityTresMin + (humidityTresMin*margin);
				console.log("Hum "+value+", min: "+marginMin+ ", max: "+marginMax);
				if (value > marginMin && value < marginMax){
					$humidityVal.parent().addClass("has-success");
					if(prevHumidityStatus == "error"){
						writeLog("humidity", "Recovery: "+value);
					}
					prevHumidityStatus = "success";
				}
				else if ((value > humidityTresMin && value < marginMin) || (value < humidityTresMax && value > marginMax) ){
					$humidityVal.parent().addClass("has-warning");
				}
				else if( value >= humidityTresMax || value <= humidityTresMin){
					$humidityVal.parent().addClass("has-error");
					if(prevHumidityStatus != "error"){
						writeLog("humidity", value);
					}
					prevHumidityStatus = "error";
				}
			}
			
			break;
	}
}

function setTreshold($form){
	var $btn = $form.find('input[type=submit]');
	$btn.val("Defined");
	$btn.removeClass("btn-primary");
	$btn.addClass("btn-success");
}

function initBtn($btn){
	$btn.val("Set");
	$btn.removeClass("btn-success");
	if(!$btn.hasClass("btn-primary")){
		$btn.addClass("btn-primary");
	}
}

function isNumber(num) {
    return parseFloat(num) === parseFloat(num) && isFinite(num);
}

$(document).ready(function(){
	var $startContainer = $("#not-submmitted");
	var $submitBtn = $("#submit-btn");
	var $submitForm = $("#not-submitted-form");
	var $valueContainer = $("#submitted");
	var $panelHeading = $(".panel-heading");
	$thermoVal = $('#thermo-val');
	$humidityVal = $('#humidity-val');
	var $pressureVal = $('#pressure-val');
	$thermoForm = $('#thermo-treshold');
	$humidityForm = $('#humidity-treshold');
	var $pressureForm = $('#pressure-treshold');
	var thermoSet = false;
	var humiditySet = false;
	var pressureSet = false;
	var $thermoMin = $('#thermo-min');
	var $thermoMax = $('#thermo-max');
	var $humidityMin = $('#humidity-min');
	var $humidityMax = $('#humidity-max');

	$submitBtn.on("click", function(){
		$startContainer.hide();
		window.connectOnClick();
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

	$thermoMin.on("keydown", function(){
		initBtn($(this).parent().parent().parent().parent().find('input[type=submit]'));
	});
	$thermoMax.on("keydown", function(){
		initBtn($(this).parent().parent().parent().parent().find('input[type=submit]'));
	});

	$thermoForm.on("submit", function(){
		if(isNumber($thermoMin.val())){
			thermoTresMin = parseFloat($thermoMin.val());	
		}
		else {
			$thermoMin.val(thermoTresMin);
		}
		if(isNumber($thermoMax.val())){
			thermoTresMax = parseFloat($thermoMax.val());
		}
		else {
			$thermoMax.val(thermoTresMax);
		}
		setTreshold($(this));
		return false;
	});


	$thermoVal.change(function(){
		checkTreshold("thermo", $(this).val());
	});

	$humidityMin.on("keydown",function(){
		initBtn($(this).parent().parent().parent().parent().find('input[type=submit]'));
	});

	$humidityMax.on("keydown", function(){
		initBtn($(this).parent().parent().parent().parent().find('input[type=submit]'));
	});

	$humidityForm.on("submit", function(){
		if(isNumber($humidityMin.val())){
			humidityTresMin = parseFloat($humidityMin.val());	
		}
		else {
			$humidityMin.val(humidityTresMin);
		}
		if(isNumber($humidityMax.val())){
			humidityTresMax = parseFloat($humidityMax.val());
		}
		else {
			$humidityMax.val(humidityTresMax);
		}
		setTreshold($(this));
		return false;
	});

	$humidityVal.change(function(){
		checkTreshold("humidity", $(this).val());
	});

});