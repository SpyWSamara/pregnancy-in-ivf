/* global $ */
$(function(){
	// coefficient y
	var calcCoefficientY1 = function(a, b, c, d) {
		return -1.4713 + (0.0863 * a) - (0.0461 * b) + (0.9407 * c) + (0.8427 * d);
	}
	var calcCoefficientY2 = function(e, f) {
		return 1.9318 - (0.7197 * e) - (0.3522 * f);
	}
	// probability
	var calcProbability = function(y) {
		return 1 - (1 / (1 + Math.pow(Math.E, -y)));
	}
	
	var $calcForm1 = $("#calcForm1"),
		$resultInfo1 = $("#resultInfo1"),
		$resultValue1 = $resultInfo1.find("#resultValue1"),
		$calcForm2 = $("#calcForm2"),
		$resultInfo2 = $("#resultInfo2"),
		$resultValue2 = $resultInfo2.find("#resultValue2");
	
	// calculation
	var calc1 = function() {
		var coefs = ["a", "b", "c", "d"],
			coefsValues = {};
		$.each(coefs, function(index, coefName){
			var $coef = $calcForm1.find("[name=coef" + coefName.toUpperCase() + "]");
			if($coef.length > 1) {
				$coef = $calcForm1.find("[name=coef" + coefName.toUpperCase() + "]:checked");
			}
			if($coef.length == 1) {
				coefsValues[coefName] = $coef.val();
			}
		});
		var result = calcProbability(calcCoefficientY1(coefsValues.a, coefsValues.b, coefsValues.c, coefsValues.d));
		if(result && $resultInfo1.length > 0) {
			if($resultInfo1.hasClass("hidden")) {
				$resultInfo1.removeClass("hidden");
			}
			$resultValue1.text(result.toFixed(4));
		}
	}
	var calc2 = function() {
		var coefs = ["e", "f"],
			coefsValues = {};
		$.each(coefs, function(index, coefName){
			var $coef = $calcForm2.find("[name=coef" + coefName.toUpperCase() + "]");
			if($coef.length > 1) {
				$coef = $calcForm2.find("[name=coef" + coefName.toUpperCase() + "]:checked");
			}
			if($coef.length == 1) {
				coefsValues[coefName] = $coef.val();
			}
		});
		var result = calcProbability(calcCoefficientY2(coefsValues.e, coefsValues.f));
		if(result && $resultInfo2.length > 0) {
			if($resultInfo2.hasClass("hidden")) {
				$resultInfo2.removeClass("hidden");
			}
			$resultValue2.text(result.toFixed(4));
		}
	}
	
	// events
	$calcForm1.on("click", "#startCalc1", calc1);
	$calcForm1.on("change", "input", calc1);
	$calcForm2.on("click", "#startCalc2", calc2);
	$calcForm2.on("change", "input", calc2);
});