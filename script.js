$(document ).ready(function() {

	audio = new Audio('emergency.mp3');

	setInterval(function(){ 
		$.get("http://192.168.43.51", function( data ) {
			//$( ".result" ).html( data );
			space = data.indexOf(";");

			n1 = data.substr(0, space);
			n2 = data.substr(space+1,data.length);

			if (n1 < 30000) {
				n1 = "- -";
				n2 = "- -";
				spo2 = n1;
			}
			else {
				spo2 = 100 * (math.log(n2 * n2)) / (math.log(n1 * n1));
				spo2 > 100 ? spo2 -= 1: spo2 = spo2;

				if (spo2 <95) {
					triggerEmergency();
				}
				else {
					emergencyStop();
				}

				spo2 = math.floor(spo2*100)/100 + "<span style='font-size:64px'>%</span>";
			}

			document.getElementById("spo2").innerHTML = spo2;
			document.getElementById("beat").innerHTML = n2;

		});
	}, 2000);

	$(".trigger").click(function() {
		triggerEmergency();
	});

	$(".un-trigger").click(function() {
		emergencyStop();
	});

});

function triggerEmergency() {
	// Call Number
	audio.play();
	$(".emergency").css("opacity", "1");
}

function emergencyStop() {
	audio.pause();
	audio.currentTime = 0;
	$(".emergency").css("opacity", "0");
}