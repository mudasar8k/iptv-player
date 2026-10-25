var Player = {
	streams: [], url: ''
};
var media = '', catgIndex = 0, liveChnlIndex = 0, playObj = {}, previousFocus = '';
var sType = 1, firstTime = true;
var dur = '';
var reconnectInt;
var LiveVideoLink = '';
var flowPlayerH = '';
var backPressed = false;
var playerReleased = false;
var playerPrepared = false;

var reconnectInt1;
var reconnectInt2;
var reconnectInt3;
var reconnectInt4;
var LiveVideoLink1 = '';
var LiveVideoLink2 = '';
var LiveVideoLink3 = '';
var LiveVideoLink4 = '';


var currentAspectRatioIndex1 = 0;
var currentAspectRatioIndex2 = 0;
var currentAspectRatioIndex3 = 0;
var currentAspectRatioIndex4 = 0;
var currentAspectRatioIndex = 0;
var aspectRatios = ["16:9", "16:10", "9:16", "5:4", "4:3", "3:2"];
var defaultZoom1 = 1;
var defaultZoom2 = 1;
var defaultZoom3 = 1;
var defaultZoom4 = 1;
var defaultZoom = 1;

var newReceivers = [];


function aspectRatio(playerNumber) {

	//  player1.zoom(5); 

	var aspectRatioValue = "";
	if (playerNumber == 1) {
		if (currentAspectRatioIndex1 == 5) {
			currentAspectRatioIndex1 = 0;
		} else {
			currentAspectRatioIndex1++;
		}

		$.each(aspectRatios, function (key, value) {
			if (key == currentAspectRatioIndex1) {
				aspectRatioValue = value;
			}

		});


		player1.aspectRatio(aspectRatioValue);
		defaultZoom1 = 1;
		$("#zoomin_zoomout_field_1").val("100%");
	} else if (playerNumber == 2) {
		if (currentAspectRatioIndex2 == 5) {
			currentAspectRatioIndex2 = 0;
		} else {
			currentAspectRatioIndex2++;
		}

		$.each(aspectRatios, function (key, value) {
			if (key == currentAspectRatioIndex2) {
				aspectRatioValue = value;
			}

		});


		player2.aspectRatio(aspectRatioValue);
		defaultZoom2 = 1;
		$("#zoomin_zoomout_field_2").val("100%");
	} else if (playerNumber == 3) {
		if (currentAspectRatioIndex3 == 5) {
			currentAspectRatioIndex3 = 0;
		} else {
			currentAspectRatioIndex3++;
		}

		$.each(aspectRatios, function (key, value) {
			if (key == currentAspectRatioIndex3) {
				aspectRatioValue = value;
			}

		});


		player3.aspectRatio(aspectRatioValue);
		defaultZoom3 = 1;
		$("#zoomin_zoomout_field_3").val("100%");
	} else if (playerNumber == 4) {
		if (currentAspectRatioIndex4 == 5) {
			currentAspectRatioIndex4 = 0;
		} else {
			currentAspectRatioIndex4++;
		}

		$.each(aspectRatios, function (key, value) {
			if (key == currentAspectRatioIndex4) {
				aspectRatioValue = value;
			}

		});


		player4.aspectRatio(aspectRatioValue);
		defaultZoom4 = 1;
		$("#zoomin_zoomout_field_4").val("100%");
	} else if (playerNumber == 0) {
		if (currentAspectRatioIndex == 5) {
			currentAspectRatioIndex = 0;
		} else {
			currentAspectRatioIndex++;
		}

		$.each(aspectRatios, function (key, value) {
			if (key == currentAspectRatioIndex) {
				aspectRatioValue = value;
			}

		});


		player.aspectRatio(aspectRatioValue);
		defaultZoom = 1;
		$("#zoomin_zoomout_field_0").val("100%");
	}


}

function zoomIn(playerNumber) {
	if (playerNumber == 1) {
		defaultZoom1 = (defaultZoom1 + 0.1);
		var zoomInPercentage = (defaultZoom1 * 100);
		$("#zoomin_zoomout_field_1").val(parseInt(zoomInPercentage) + "%");
		player1.zoom(defaultZoom1);
	} else if (playerNumber == 2) {
		defaultZoom2 = (defaultZoom2 + 0.1);
		var zoomInPercentage = (defaultZoom2 * 100);
		$("#zoomin_zoomout_field_2").val(parseInt(zoomInPercentage) + "%");
		player2.zoom(defaultZoom2);
	} else if (playerNumber == 3) {
		defaultZoom3 = (defaultZoom3 + 0.1);
		var zoomInPercentage = (defaultZoom3 * 100);
		$("#zoomin_zoomout_field_3").val(parseInt(zoomInPercentage) + "%");
		player3.zoom(defaultZoom3);
	} else if (playerNumber == 4) {
		defaultZoom4 = (defaultZoom4 + 0.1);
		var zoomInPercentage = (defaultZoom4 * 100);
		$("#zoomin_zoomout_field_4").val(parseInt(zoomInPercentage) + "%");
		player4.zoom(defaultZoom4);
	} else if (playerNumber == 0) {
		defaultZoom = (defaultZoom + 0.1);
		var zoomInPercentage = (defaultZoom * 100);
		$("#zoomin_zoomout_field_0").val(parseInt(zoomInPercentage) + "%");
		player.zoom(defaultZoom);
	}



}
function zoomOut(playerNumber) {
	if (playerNumber == 1) {
		var defaultZoomTemp = (defaultZoom1 - 0.1);
		var zoomOutPercentage = (defaultZoomTemp * 100);
		if (parseInt(zoomOutPercentage) >= 10) {
			defaultZoom1 = (defaultZoom1 - 0.1);
			$("#zoomin_zoomout_field_1").val(parseInt(zoomOutPercentage) + "%");
			player1.zoom(defaultZoom1);
		}
	} else if (playerNumber == 2) {
		var defaultZoomTemp = (defaultZoom2 - 0.1);
		var zoomOutPercentage = (defaultZoomTemp * 100);
		if (parseInt(zoomOutPercentage) >= 10) {
			defaultZoom2 = (defaultZoom2 - 0.1);
			$("#zoomin_zoomout_field_2").val(parseInt(zoomOutPercentage) + "%");
			player2.zoom(defaultZoom2);
		}
	} else if (playerNumber == 3) {
		var defaultZoomTemp = (defaultZoom3 - 0.1);
		var zoomOutPercentage = (defaultZoomTemp * 100);
		if (parseInt(zoomOutPercentage) >= 10) {
			defaultZoom3 = (defaultZoom3 - 0.1);
			$("#zoomin_zoomout_field_3").val(parseInt(zoomOutPercentage) + "%");
			player3.zoom(defaultZoom3);
		}
	} else if (playerNumber == 4) {
		var defaultZoomTemp = (defaultZoom4 - 0.1);
		var zoomOutPercentage = (defaultZoomTemp * 100);
		if (parseInt(zoomOutPercentage) >= 10) {
			defaultZoom4 = (defaultZoom4 - 0.1);
			$("#zoomin_zoomout_field_4").val(parseInt(zoomOutPercentage) + "%");
			player1.zoom(defaultZoom4);
		}
	} else if (playerNumber == 0) {
		var defaultZoomTemp = (defaultZoom - 0.1);
		var zoomOutPercentage = (defaultZoomTemp * 100);
		if (parseInt(zoomOutPercentage) >= 10) {
			defaultZoom = (defaultZoom - 0.1);
			$("#zoomin_zoomout_field_0").val(parseInt(zoomOutPercentage) + "%");
			player.zoom(defaultZoom);
		}
	}


	// for ( var i = 10; i >= 0; i-- ) {
	// 	var a = ( i / 10 ).toFixed(1);

	// 		player1.zoom(parseFloat(a)); 
	// 		console.log("a:"+parseFloat(a));

	// }




	// 	var i = 1;                  //  set your counter to 1

	// function myLoop() {         //  create a loop function
	// setTimeout(function() {   //  call a 3s setTimeout when the loop is called
	// 	// console.log('hello');   //  your code here
	// 	i++;                    //  increment the counter
	// 	if (i < 10) {           //  if the counter < 10, call the loop function
	// 	myLoop();             //  ..  again which will trigger another 
	// 	}                       //  ..  setTimeout()
	// }, 1000)
	// }

	// myLoop();   




	// for ( var i = 100; i >= 0; i-- ) {
	// 	$ul.append( '<li>' + ( i / 100 ).toFixed(2) + '</li>' );
	// }
	//  setTimeout(function(){
	// 	player1.zoom(0.9); 
	//   }, 1000);
	//   setTimeout(function(){
	// 	player1.zoom(0.8); 
	//   }, 2000);
	//   setTimeout(function(){
	// 	player1.zoom(0.7); 
	//   }, 3000);
	//   setTimeout(function(){
	// 	player1.zoom(0.6); 
	//   }, 4000);
	//   setTimeout(function(){
	// 	player1.zoom(0.5); 
	//   }, 5000);
	//   setTimeout(function(){
	// 	player1.zoom(0.4); 
	//   }, 6000);
	//   setTimeout(function(){
	// 	player1.zoom(0.3); 
	//   }, 7000);
	//   setTimeout(function(){
	// 	player1.zoom(0.2); 
	//   }, 8000);
	//   setTimeout(function(){
	// 	player1.zoom(0.1); 
	//   }, 9000);
	//   setTimeout(function(){
	// 	player1.zoom(0); 
	//   }, 10000);

}

// var a = require('path').join(__dirname, '../node_modules/wcjs-player');
// console.log(a);

// var wjs = require(a);



// console.log(wjs);


// console.log(wjs); 

// console.log(ss);
const fs = require("fs");
var pathToWebChimera = "";
pathToWebChimera = require('path').join(__dirname, '../../wcjs-prebuilt') // make sure ../../ is there
// fs.exists(pathToWebChimera, function(exists) {
// 	wcjsExists = exists;

// });

var wcjsExists = fs.existsSync(pathToWebChimera);
if (wcjsExists) {
} else {
	pathToWebChimera = require("wcjs-prebuilt");
}

console.log("path to webchimera bin ==> " + pathToWebChimera)


var wjs = require("wcjs-player");
var conf = "";
var confMultiScreen = "";
if (wcjsExists) {
	conf = {
		// wcjs: require('wcjs-prebuilt'),
		wcjs: require(pathToWebChimera),
		multiscreen: false,
		autoplay: true
	};
	confMultiScreen = {
		wcjs: require(pathToWebChimera),
		multiscreen: true,
		autoplay: true
	};

} else {
	conf = {
		// wcjs: require('wcjs-prebuilt'),
		wcjs: pathToWebChimera,
		multiscreen: false,
		autoplay: true
	};
	confMultiScreen = {
		wcjs: pathToWebChimera,
		multiscreen: true,
		autoplay: true
	};

}



var player = null;
var player1 = null;
var player2 = null;
var player3 = null;
var player4 = null;

// 	var chromecast = require('electron-chromecast');

// 	// console.log(chromecast.cast);
// 	var session = null;


// 	var loadCastInterval = setInterval(function(){
// 		if (chrome.cast.isAvailable) {
// 				console.log('Cast has loaded.');
// 				clearInterval(loadCastInterval);
// 				initializeCastApi();
// 		} else {
// 				console.log('Unavailable');
// 		}
// }, 1000);


// function castingButton(){
// 	// alert("clicked");
// 	 chrome.cast.requestSession(onRequestSessionSuccess, onLaunchError);
// 	// console.log(session);
// }

// function onRequestSessionSuccess(e) {
// 	console.log("Successfully created session: " + e.sessionId);
// 	session = e;
// 	loadMedia();
// }

// function onLaunchError(e) {
// 	console.log(e);
// 	if(e.code == "RECEIVER_UNAVAILABLE"){
// 		console.log("No Cast devices Found");
// 		showCastingDevicesPopUp("No Cast devices Found","not_found");
// 	}else{
// 		console.log("Error connecting to the Chromecast.");
// 		showCastingDevicesPopUp("Error connecting to the Chromecast.","not_found");
// 	}
// }

// function showCastingDevicesPopUp(msg,status){
// 	if(status == "found"){
// 		pushState(view,$(".imageFocus").attr("id"));
// 		$('.imageFocus').removeClass("imageFocus");
// 		view = "showCastingDevicesPopUp";
// 		$("#genericDiv2").html(Util.showCastingDevices());
// 		$("#genericDiv2").css({"z-index":"9999999999","position":"absolute"});
// 		$("#genericDiv2").show();
// 		$("#Btn-0").addClass("imageFocus");
// 		Main.HideLoading();
// 	}else{
// 		pushState(view,$(".imageFocus").attr("id"));
// 		$('.imageFocus').removeClass("imageFocus");
// 		view = "showCastingDevicesPopUp";
// 		$("#genericDiv2").html(Util.showPopUp('','', msg, "","OK"));
// 		$("#genericDiv2").css({"z-index":"9999999999","position":"absolute"});
// 		$("#genericDiv2").show();
// 		$("#Btn-0").addClass("imageFocus");
// 		Main.HideLoading();
// 	}

// }


// function initializeCastApi() {
// 	var applicationID = chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID;
// 	console.log(applicationID);
// 	var sessionRequest = new chrome.cast.SessionRequest(applicationID);
// 	var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
// 			sessionListener,
// 			receiverListener);
// 	chrome.cast.initialize(apiConfig, onInitSuccess, onInitError);
// };

// function sessionListener(e) {
// 	session = e;
// 	console.log('New session');
// 	if (session.media.length != 0) {
// 			console.log('Found ' + session.media.length + ' sessions.');
// 	}
// }

// function receiverListener(e) {
// 	// alert(e);
// 	// console.log(e);
// 	if( e === 'AVAILABLE' ) {
// 			console.log("Chromecast was found on the network.");
// 	}
// 	else {
// 			console.log("There are no Chromecasts available.");
// 	}
// }

// function onInitSuccess() {
// 	console.log("Initialization succeeded");
// }

// function onInitError() {
// 	console.log("Initialization failed");
// }


// 	// var session = '';
// 	//   setTimeout(function(){
//     //     session = chrome.cast.requestSession(
// 	// 		(success) => {
// 	// 		//   console.log(success);
// 	// 		},
// 	// 		(error) => {
// 	// 		//   console.log(error);
// 	// 		}
// 	// 	  );
// 	// }, 4000);


// 	chromecast(function (receivers) {
// 		if (!$('#genericDiv2').is(':empty')){

// 			return new Promise(function (resolve, reject) {

// 				// alert("aaa");
// 				// if(newReceivers.length>0){
// 				// 	showCastingDevicesPopUp("","found");
// 				//   }else{
// 				// 	showCastingDevicesPopUp("No Cast devices Found","not_found");
// 				//   }
// 				// Do some logic to choose a receiver, possibly ask the user through a UI
// 				// var chosenReceiver = receivers[0];
// 				// resolve(chosenReceiver);
// 			});
// 			// console.log("Already Visible");

// 			// 		// chromecast(function (receivers) { 
// 			// 			console.log(global);
// 			// 			console.log("testing");
// 						// session= chrome.cast.Session();
// 						// console.log(session);


// 						// return new Promise(function (resolve, reject) {
// 						// 	alert("3");
// 						// 	newReceivers = [];

// 						// 	// Do some logic to choose a receiver, possibly ask the user through a UI
// 						// 	var chosenReceiver = newReceivers[castingIndex];
// 						// 	resolve(chosenReceiver);
// 						// 	loadMedia();
// 						// });
// 					// }); 
// 		}else{
// 			console.log("receivers fetched");
// 			console.log(receivers);
// 			console.log(receivers.length);
// 			newReceivers = [];
// 			var receiverkey=0;
// 			receivers.forEach(function (item) {
// 				if(item.service_fullname!== undefined && item.friendlyName!==undefined && item.receiverType=="CAST"){
// 					newReceivers[receiverkey] = item;
// 					receiverkey++;
// 				}
// 				// console.log(item.friendlyName);
// 				// records[key] = value;
// 			  });
// 			  console.log(newReceivers);


// 			return new Promise(function (resolve, reject) {
// 				if(newReceivers.length>0){
// 					showCastingDevicesPopUp("","found");
// 				  }else{
// 					showCastingDevicesPopUp("No Cast devices Found","not_found");
// 				  }
// 				// Do some logic to choose a receiver, possibly ask the user through a UI
// 				// var chosenReceiver = receivers[0];
// 				// resolve(chosenReceiver);
// 			});
// 		}


// 	}); 


// 	function castingDevices(castingIndex,againClicked){
// 		// alert("called");
// 		// if(againClicked =="false"){
// 			try{
// 				if(newReceivers.length>0){
// 					// alert("1");
// 					chrome.cast.requestSession(onRequestSessionSuccess, onLaunchError);

// 					if(againClicked == "false"){
// 						// alert("entered");
// 						setTimeout(function(){
// 							castingDevices(castingIndex,"true");
// 						  }, 1000);
// 					}

// 					chromecast(function (receivers) { 
// 						// alert("2");

// 						return new Promise(function (resolve, reject) {
// 							// alert("3");

// 							// Do some logic to choose a receiver, possibly ask the user through a UI
// 							var chosenReceiver = newReceivers[castingIndex];
// 							resolve(chosenReceiver);
// 							// loadMedia();
// 						});
// 					}); 





// 					// return new Promise(function (resolve, reject) {
// 					// 	var chosenReceiver = newReceivers[castingIndex];
// 					// 	resolve(chosenReceiver);
// 					// 	loadMedia();
// 					// });

// 				}
// 			}catch(err){
// 				console.log(err);
// 			}
// 		// }


// 	}
// 	// setTimeout(function(){
// 	// 	chrome.cast.requestSession(onRequestSessionSuccess, onLaunchError);
// 	// }, 4000);



// function loadMedia() {
// 	if (!session) {
// 			console.log("No session.");
// 			return;
// 	}

// 	console.log(LiveVideoLink);
// 	// var mediaInfo = new chrome.cast.media.MediaInfo('http://playertest.longtailvideo.com/adaptive/bbbfull/bbbfull.m3u8'); // working
// 	// var mediaInfo = new chrome.cast.media.MediaInfo('https://v.redd.it/3hyw7hwoajn21/HLSPlaylist.m3u8'); 
// 	// var mediaInfo = new chrome.cast.media.MediaInfo('http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4');
// 	var mediaInfo = new chrome.cast.media.MediaInfo(LiveVideoLink);
// 	// mediaInfo.contentType = 'application/vnd.apple.mpegurl';
// 	// mediaInfo.contentType = 'video/mp4';
// 	mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();
// 	mediaInfo.metadata.title = "TESTING";
// 	// mediaInfo.customData = null;
// 	// mediaInfo.streamType = "LIVE";
// 	// mediaInfo.textTrackStyle = new chrome.cast.media.TextTrackStyle();
// 	// mediaInfo.duration = null;
// 	// mediaInfo.tracks = tracks;
// 	var image = new chrome.cast.Image("https://www.gstatic.com/webp/gallery3/2.png"); 
// 	mediaInfo.metadata.images = [image];
// 	var request = new chrome.cast.media.LoadRequest(mediaInfo);
// 	request.autoplay = true;
// 	// request.media = "testing";

// 	session.loadMedia(request, onLoadSuccess, onLoadError);
// 	console.log("Loaded media");

// }

// function onLoadSuccess(e) {
// 	console.log(e);
// 	console.log('Successfully loaded image.');
// }

// function onLoadError(e) {
// 	console.log(e);
// 	console.log('Failed to load image.');
// }






// //   chromecast(function (receivers) {
// // 	// console.log("ABC");
// // 	// console.log(receivers);

// //     return new Promise(function (resolve, reject) {
// // 		// console.log("ABC");

// //         // Do some logic to choose a receiver, possibly ask the user through a UI
// // 		var chosenReceiver = receivers[0];
// // 		// console.log(chrome.cast.initialize);
// // 		session = chrome.cast.requestSession(
// // 			(success) => {
// // 			//   console.log(success);
// // 			},
// // 			(error) => {
// // 			//   console.log(error);
// // 			}
// // 		  );
// // 		// alert(session);
// // 		// loadMedia();

// // 		// try{

// // 		// 	var mediaInfo = new
// // 		// 	chrome.cast.media.MediaInfo('http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4');
// // 		// 			// mediaInfo.contentType = 'text/html';

// // 		// 			var request = new chrome.cast.media.LoadRequest(mediaInfo);
// // 		// 			request.autoplay = true;

// // 		// 			var a = session.loadMedia(request, onLoadSuccess, onLoadError);

// // 		// 	console.log(a);
// // 		// }catch(e){
// // 		// 	console.log(e);
// // 		// }

// // 		// console.log(chrome.cast.media);
// // 		// console.log(chosenReceiver);
// //         resolve(chosenReceiver);
// //     });
// // });




// // setTimeout(function(){

// // const session = chrome.cast.requestSession(
// // 	(success) => {
// // 	  alert(success);
// // 	},
// // 	(error) => {
// // 	  alert(error);
// // 	}
// //   );
// // }, 4000);




function getTimeText(t) {
	t = t / 1000;
	var pt = new Number(t);
	var hh = Math.floor(pt / 3600);
	var mm = Math.floor((pt % 3600) / 60);

	return "" + (hh < 10 ? "0" + hh : hh) + ":" + (mm < 10 ? "0" + mm : mm);
}
function progressIconHandle(event, action) {
	// console.log(event.type)
	switch (action) {
		case 'over':
			$("#seek-picker-runtime").show();
			moveSeekBall(event);
			addEvent(document, "mousemove", moveSeekBall);
			break;
		case 'out':
			$("#seek-picker-runtime").hide();
			removeEvent(document, "mousemove", moveSeekBall);
			break;
		case 'click':
			playAtPos(event);
			break;
		case 'down':
			playAtPos(event);
			break;
		default:
			break;
	}
}

function addEvent(object, eventStr, func) {
	try {
		object.addEventListener(eventStr, func, false);
	} catch (e) {
	}
}

function removeEvent(object, eventStr, func) {
	try {
		object.removeEventListener(eventStr, func);
	} catch (e) {
	}
}
function playAtPos(event) {
	var x = event.clientX - $("#flix-seekbar").offset().left - 8;

	dur = media.getDuration();
	try {
		if (media.getDuration() == -1) {
			if (singleMoviePage && singleMoviePage.vendorInfo && singleMoviePage.vendorInfo.duration) {
				dur = singleMoviePage.vendorInfo.duration;
				dur = dur * 1000;
			}

		}
	} catch (e) { }

	var totalWidth = $("#flix-seekbar").width();
	var seekPercent = 0;
	if (x > 0) {
		seekPercent = ((x) / totalWidth);
		var offSet = 280;
		if (window.innerWidth == "1280")
			offSet = 100;
		else
			offSet = 280;

		$("#seek-picker-runtime").css("left", event.clientX - ($("#flix-seekbar").offset().left) + offSet);
		var pos = dur * seekPercent;
		$("#seek-picker-runtime").html(getTimeHMS(pos));
		media.seekTo(pos);

	}

}
function moveSeekBall(event) {
	// console.log(event.type);

	dur = media.getDuration();
	try {
		if (media.getDuration() == -1) {
			if (singleMoviePage && singleMoviePage.vendorInfo && singleMoviePage.vendorInfo.duration) {
				dur = singleMoviePage.vendorInfo.duration;
				dur = dur * 1000;
			}

		}
	} catch (e) { }

	var x = event.clientX - $('#flix-seekbar').position().left - 8;
	var totalWidth = $("#flix-seekbar").width();
	var seekPercent = ((x) / totalWidth);
	var pos = seekPercent * dur;
	if (x > 0 && x <= totalWidth) {
		$("#seek-picker-runtime").css("left", (event.clientX - ($("#flix-seekbar").offset().left)) + 280);
		$("#seek-picker-runtime").html(getTimeHMS(pos));
	}
	else
		$("#seek-picker-runtime").hide();
}


// (function (window) {
//  	var platform = cordova.require('cordova/platform');
//  	window.getMediaOption = function() {
//  		var drmOptions = {};
//  		var customdata;
// // 		alert(platform.id);
//  		switch (platform.id)
//  		{
//  			case 'sectv-orsay':
//  			case 'sectv-tizen':
//  				drmOptions = {
//  					BITRATES : 'yourBitRates',
//  					STARTBITRATE : 'yourStartBitRate',
//  					SKIPBITRATE : 'yourSkipBitRate'
//  				};
//  				break;
//  			case 'tv-webos':
//  				var options = {};
//  				options.option = {};
//  				options.option.mediaFormat.type = 'audio';

//  				drmOptions = {
//  					OPTIONS : JSON.stringify(options),
//  				};
//  			break;
//  		}
//  		return drmOptions;
//  	};
//  })(this);


function getTimeHMS(t) {
	t = t / 1000;
	var pt = new Number(t);
	var hh = Math.floor(pt / 3600);
	var mm = Math.floor((pt % 3600) / 60);
	var ss = Math.floor(pt % 60);
	return "" + (hh < 10 ? "0" + hh : hh) + ":" + (mm < 10 ? "0" + mm : mm)
		+ ":" + (ss < 10 ? "0" + ss : ss);
}

function removeAndInitializePlayer() {

	if ($("#player-wrapper").hasClass("webchimeras")) {
		player = new wjs("#player-wrapper");
		player.clearPlaylist();
		//player.stop();

		var PlayerDIvSelector = $('#player-wrapper');
		PlayerDIvSelector.removeClass("webchimeras");
		PlayerDIvSelector.html('');
		player = new wjs("#player-wrapper").addPlayer(conf);
	} else {
		player = new wjs("#player-wrapper").addPlayer(conf);
	}




}

function jWPlayerReconnect(Link, FailCounter) {
	//alert("entered1");
	var counter = 0;
	if (FailCounter == "new") {
		counter = 0;
	} else {
		try {
			clearInterval(reconnectInt);
		} catch (e) {

		}
		counter = FailCounter;
	}
	//alert("entered2");
	var playerState = "";
	reconnectInt = setInterval(function () {
		// alert(playerState);
		// console.log("testing: "+counter);

		if (playerState == "ended" || playerState == "error" || playerState == "") {
			counter++;
			if (counter < 5) {

				//alert("entered3");
				// if(counter == 3){
				// alert(Link);

				removeAndInitializePlayer();



				if (Player.type == "catchup") {
					player.addPlaylist({
						title: Player.name,
						url: Link,
						aspectRatio: "16:9"
					});
				} else {
					player.addPlaylist({
						title: Player.data.name,
						url: Link,
						aspectRatio: "16:9"
					});
				}

				// alert(view);
				if (view == "liveChannels") {
					setTimeout(function () {
						$("#player-wrapper .wcp-toolbar:last").append('<div class="wcp-button wcp-right" onclick="aspectRatio(0);"> <img src="images/aspect-ratio.png" class="aspect-ratio"/></div><div class="wcp-button wcp-right" onclick="zoomIn(0);" style="    border-left: 0px;"> <img src="images/zoom_in.png" class="aspect-ratio"/></div><input type="text" value="100%" class="zoomin_zoomout_field  wcp-right" id="zoomin_zoomout_field_0" disabled> <div class="wcp-button wcp-right" onclick="zoomOut(0);"> <img src="images/zoom_out.png" class="aspect-ratio"/></div>');
						// $(".wcp-surface").html('<div class="seekLeftTooltip" style="display:none;"></div><img src="images/seek_left.png" class="wcp-toolbar seekLeft" onclick="seekLeft()"><div class="seekRightTooltip" style="display:none;"></div><img src="images/seek_right.png" class="wcp-toolbar seekRight" onclick="seekRight()">');
						try {
							if (Player.data.stream_icon) {
								$(".channelLogo").show();
								$(".channelLogo").attr("src", Player.data.stream_icon);
								$(".channelLogo").error(function () { $(".channelLogo").hide(); }).attr("src", Player.data.stream_icon);
							} else {
								$(".channelLogo").hide();
							}
						} catch (err) {
							$(".channelLogo").hide();
						}
					}, 200);
				} else {
					setTimeout(function () {
						$("#player-wrapper .wcp-toolbar:last").append('<div class="wcp-button wcp-right" onclick="aspectRatio(0);"> <img src="images/aspect-ratio.png" class="aspect-ratio"/></div><div class="wcp-button wcp-right" onclick="zoomIn(0);" style="    border-left: 0px;"> <img src="images/zoom_in.png" class="aspect-ratio"/></div><input type="text" value="100%" class="zoomin_zoomout_field  wcp-right" id="zoomin_zoomout_field_0" disabled> <div class="wcp-button wcp-right" onclick="zoomOut(0);"> <img src="images/zoom_out.png" class="aspect-ratio"/></div>');
						$(".wcp-surface").html('<div class="seekLeftTooltip" style="display:none;"></div><img src="images/seek_left.png" class="wcp-toolbar seekLeft" onclick="seekLeft()"><div class="seekRightTooltip" style="display:none;"></div><img src="images/seek_right.png" class="wcp-toolbar seekRight" onclick="seekRight()">');

					}, 200);
				}



				player.onPosition(function (pos) {
					counter = 0;
					clearInterval(reconnectInt);
					//alert("connected");
				}); // from 0.0 to 1.0



				player.onState(function (state) {
					// alert("current state: "+state);
					playerState = state;
					// console.log("current state: "+state);
					if (state == "playing") {
						player.zoom(1);
					}
					if (state == "ended" || state == "error") {
						var showText = Number(counter) + Number(1);
						// alert('Playback error, reconnects in 10s ('+showText+'/5)');
						// var PlayerDIvSelector = $('#player-wrapper');
						// PlayerDIvSelector.removeClass("webchimeras");

						$('#videoHtml').css('background', 'black');

						player = new wjs("#player-wrapper");
						player.clearPlaylist();
						var PlayerDIvSelector = $('#player-wrapper');
						PlayerDIvSelector.removeClass("webchimeras");
						// PlayerDIvSelector.css('text-align', 'center');
						PlayerDIvSelector.html('<div class="erroronplayer"><span>Playback error, reconnects in 5s (' + showText + '/5)</span></div>');
						jWPlayerReconnect(Link, counter);




					}
				});


			} else {

				clearInterval(reconnectInt);
				counter = 0;


				try {
					player = new wjs("#player-wrapper");
					player.clearPlaylist();
					var PlayerDIvSelector = $('#player-wrapper');
					PlayerDIvSelector.removeClass("webchimeras");
					// PlayerDIvSelector.css('text-align', 'center');
					PlayerDIvSelector.html('<div class="erroronplayer"><span>Sorry, this video can not be played.<br> Please try again or pick another video.</span></div>');
				} catch (error) {
					var PlayerDIvSelector = $('#player-wrapper');
					PlayerDIvSelector.removeClass("webchimeras");
					// PlayerDIvSelector.css('text-align', 'center');
					PlayerDIvSelector.html('<div class="erroronplayer"><span>Sorry, this video can not be played.<br> Please try again or pick another video.</span></div>');
				}



			}
		}

	}, 5000);



}

Player.stopPlayer = function () {
	//alert("entered");
	try {
		// alert(player);
		// player = new wjs("#player-wrapper");
		player.clearPlaylist();
		// alert("done");
	} catch (error) {
		//alert("error");
	}
}

function compareString(needle, arrayData) {
	for (var j = 0; j < arrayData.length; j++) {
		var str = arrayData[j];
		var lowerCase = needle.toLowerCase();
		var regex = RegExp(str);
		//                alert(regex);

		var result = regex.test(lowerCase)
		if (result == true) {
			//                        alert(str);

			return true;
		}

	}
	return false;

}

function compareStringSearch(needle, arrayData) {
	var index = 0;
	var testingArray = [];

	for (var j = 0; j < arrayData.length; j++) {
		var str = arrayData[j].name;
		str = str.toLowerCase();
		needle = needle.toLowerCase();


		var regex = RegExp(needle);
		var result = regex.test(str);


		if (result == true) {

			testingArray[index] = arrayData[j];
			index++;
			//                            liveSectionDetails.push(arrayData[j]);
			//                            alert(testingArray);
			//        testingArray[index] = {
			//                    id: data.epg_listings[i].id,
			//                    epg_id:data.epg_listings[i].epg_id,
			//                    title:data.epg_listings[i].title,
			//                    lang:data.epg_listings[i].lang,
			//                    start:data.epg_listings[i].start,
			//                    start_date: key,
			//                    startTime: startTime,
			//                    endTime: endTime,
			//                    end:data.epg_listings[i].end,
			//                    description:data.epg_listings[i].description,
			//                    channel_id: data.epg_listings[i].channel_id,
			//                    start_timestamp: data.epg_listings[i].start_timestamp,
			//                    stop_timestamp: data.epg_listings[i].stop_timestamp,
			//                    now_playing: data.epg_listings[i].now_playing,
			//                    has_archive: data.epg_listings[i].has_archive
			//                     };
			//                    index++;
			//                    archiveData.push(data.epg_listings[i]);

		}

	}
	return testingArray;
	//    return true;

}

function compareStringSearchCategories(needle, arrayData) {
	var index = 0;
	var testingArray = [];

	for (var j = 0; j < arrayData.length; j++) {
		var str = arrayData[j].category_name;
		str = str.toLowerCase();
		needle = needle.toLowerCase();


		var regex = RegExp(needle);
		var result = regex.test(str);


		if (result == true) {

			testingArray[index] = arrayData[j];
			index++;

		}

	}
	return testingArray;
	//    return true;

}




Player.set_flowplayer = function (url, short) {

	// Player.playStream = function(url,short){
	if (intervalNetwork) {
		clearInterval(intervalNetwork); intervalNetwork = '';
		obj = {};
		loadingTimeArray = [];
	}
	//     $(".playerReconnecting").html('').hide();
	//     if(!short){
	//          $("#HTML5Div").html(Util.playerBody());$(".play-icons").hide();
	//     }
	reconnectDone = 0;
	try {
		if (media) {
			clearPlayerValues();
		}
	}
	catch (e) { }


	//     alert(LiveVideoLink);
	LiveVideoLink = url;


	$(".playerReconnecting").html('').hide();
	$("#notification").html('').hide();




	var FailCounter = "";

	if (reconnectInt !== null || reconnectInt !== undefined) {
		clearInterval(reconnectInt);
	}


	//    if(view == "seriesPlayer"){
	// 	   set_flowplayer(LiveVideoLink);
	//    }else{



	var flag = false;

	//     alert(JSON.stringify(liveSectionDetails));
	var cID = "";
	var cName = "";
	// 	if(parentPin){
	// 		 for(var i=0;i<liveSectionDetails.length;i++){
	// 		   if(liveSectionDetails[i].stream_id == Player.data.stream_id){
	// 			  cID = liveSectionDetails[i].category_id;
	// 			  break;
	// 		   }
	// 		 }

	// 		 if(cID!=""){
	// 			   for(var j=0;j<sectionData.length;j++){
	// 				   if(sectionData[j].category_id == cID){
	// 					   cName = sectionData[j].category_name;
	// 					  break;
	// 				   }

	// 			   }
	// 		 }

	//    //          alert(Player.data.stream_id);
	//    //
	// 		 if(cName!="" && parentPin){
	// 			  if(compareString(cName,adultArray)){
	// 				   flag = true;

	// 				   pushState(view,$(".imageFocus").attr("id"));
	// 				   $(".imageFocus").removeClass("imageFocus");
	// 				   view = "enterPin";
	// 				   $("#customMessage").html(Util.confirmPin());
	// 				   $("#customMessage").show();

	// 			  }

	// 		 }
	// 	 }

	if (!flag) {

		removeAndInitializePlayer();
		if (Player.type == "catchup") {
			player.addPlaylist({
				title: Player.name,
				url: LiveVideoLink,
				aspectRatio: "16:9"
			});
		} else {
			player.addPlaylist({
				title: Player.data.name,
				url: LiveVideoLink,
				aspectRatio: "16:9"
			});

		}

		// alert("honey:movies");

		setTimeout(function () {
			$("#player-wrapper .wcp-toolbar:last").append('<div class="wcp-button wcp-right" onclick="aspectRatio(0);"> <img src="images/aspect-ratio.png" class="aspect-ratio"/></div><div class="wcp-button wcp-right" onclick="zoomIn(0);" style="    border-left: 0px;"> <img src="images/zoom_in.png" class="aspect-ratio"/></div><input type="text" value="100%" class="zoomin_zoomout_field  wcp-right" id="zoomin_zoomout_field_0" disabled> <div class="wcp-button wcp-right" onclick="zoomOut(0);"> <img src="images/zoom_out.png" class="aspect-ratio"/></div>');
			$(".wcp-surface").html('<div class="seekLeftTooltip" style="display:none;"></div><img src="images/seek_left.png" class="wcp-toolbar seekLeft" onclick="seekLeft()"><div class="seekRightTooltip" style="display:none;"></div><img src="images/seek_right.png" class="wcp-toolbar seekRight" onclick="seekRight()">');
		}, 200);





		player.onPosition(function (pos) {
			counter = 0;
			clearInterval(reconnectInt);
		}); // from 0.0 to 1.0

		player.onState(function (state) {
			console.log("current state: " + state);
			if (state == "playing") {
				player.zoom(1);
			}
			if (state == "ended" || state == "error") {
				var showText = 1;
				$('#videoHtml').css('background', 'black');

				player = new wjs("#player-wrapper");
				player.clearPlaylist();
				var PlayerDIvSelector = $('#player-wrapper');
				PlayerDIvSelector.removeClass("webchimeras");
				PlayerDIvSelector.html('<div class="erroronplayer"><span>Playback error, reconnects in 5s (' + showText + '/5)</span></div>');


				jWPlayerReconnect(LiveVideoLink, "new");
				return false;
			}

		});

	}
	//    }




	//    }
}

function seekRight() {
	$(".seekRightTooltip").fadeIn();
	$(".seekLeftTooltip").fadeOut();
	SeekTimeJumpLeft = 0;
	SeekTimeJumpRight += 10;
	$(".seekRightTooltip").html("+" + SeekTimeJumpRight + "s");
	// alert(wjsPlayer.time());
	if (SeekInterval) {
		clearInterval(SeekInterval); SeekInterval = '';
	}
	SeekInterval = setInterval(function () {
		try {
			var oldTime = wjsPlayer.time();
			var newTime = ((SeekTimeJumpRight * 1000) + oldTime);
			SeekTimeJumpRight = 0;
			wjsPlayer.time(newTime);
			$(".seekRightTooltip").fadeOut();
			$(".seekRightTooltip").html("");
		} catch (err) {
			$(".seekRightTooltip").fadeOut();
			$(".seekRightTooltip").html("");
		}
		clearInterval(SeekInterval); SeekInterval = '';

	}, 1500);

}

function seekLeft() {
	$(".seekLeftTooltip").fadeIn();
	$(".seekRightTooltip").fadeOut();
	SeekTimeJumpRight = 0;
	SeekTimeJumpLeft += 10;
	$(".seekLeftTooltip").html("-" + SeekTimeJumpLeft + "s");
	// alert(wjsPlayer.time());
	if (SeekInterval) {
		clearInterval(SeekInterval); SeekInterval = '';
	}
	SeekInterval = setInterval(function () {
		try {
			var oldTime = wjsPlayer.time();
			var newTime = (oldTime - (SeekTimeJumpLeft * 1000));
			SeekTimeJumpLeft = 0;
			if (newTime < 0) {
				newTime = 0;
			}
			wjsPlayer.time(newTime);
			$(".seekLeftTooltip").fadeOut();
			$(".seekLeftTooltip").html("");
		} catch (err) {
			$(".seekLeftTooltip").fadeOut();
			$(".seekLeftTooltip").html("");
		}
		clearInterval(SeekInterval); SeekInterval = '';

	}, 1500);

}

Player.playStream = function (url, short) {
	console.log(url);
	if (intervalNetwork) {
		clearInterval(intervalNetwork); intervalNetwork = '';
		obj = {};
		loadingTimeArray = [];
	}
	//     $(".playerReconnecting").html('').hide();
	//     if(!short){
	//          $("#HTML5Div").html(Util.playerBody());$(".play-icons").hide();
	//     }
	reconnectDone = 0;
	try {
		if (media) {
			clearPlayerValues();
		}
	}
	catch (e) { }


	//     alert(LiveVideoLink);
	LiveVideoLink = url;


	$(".playerReconnecting").html('').hide();
	$("#notification").html('').hide();




	var FailCounter = "";

	if (reconnectInt !== null || reconnectInt !== undefined) {
		clearInterval(reconnectInt);
	}


	// if(view == "seriesPlayer"){
	//     set_flowplayer(LiveVideoLink);
	// }else{



	var flag = false;

	//     alert(JSON.stringify(liveSectionDetails));
	var cID = "";
	var cName = "";

	if (parentPin) {

		if (currentAPPType == "m3u") {
			for (var i = 0; i < liveSectionDetails.length; i++) {
				if (liveSectionDetails[i].url == url) {
					cID = liveSectionDetails[i].category_id;
					break;
				}
			}
		} else {
			for (var i = 0; i < liveSectionDetails.length; i++) {
				if (liveSectionDetails[i].stream_id == Player.data.stream_id) {
					cID = liveSectionDetails[i].category_id;
					break;
				}
			}
		}

		// console.log("url: "+url);
		//   console.log(Player.data.stream_id);
		//   console.log(cID);
		//   console.log(liveSectionDetails);

		if (cID != "") {
			for (var j = 0; j < sectionData.length; j++) {
				if (sectionData[j].category_id == cID) {
					cName = sectionData[j].category_name;
					break;
				}

			}
		}

		//   console.log(sectionData);
		//   alert(cName);
		//   alert(parentPin);
		//
		if (cName != "" && parentPin) {
			if (compareString(cName, adultArray)) {
				flag = true;

				pushState(view, $(".imageFocus").attr("id"));
				$(".imageFocus").removeClass("imageFocus");
				view = "enterPin";
				$("#customMessage").html(Util.confirmPin());
				$("#customMessage").show();

			}

		}
	}

	if (!flag) {

		removeAndInitializePlayer();


		if (Player.type == "catchup") {
			player.addPlaylist({
				title: Player.name,
				url: LiveVideoLink,
				aspectRatio: "16:9"
			});
		} else {
			player.addPlaylist({
				title: Player.data.name,
				url: LiveVideoLink,
				aspectRatio: "16:9"
			});
		}

		// alert("honey:without_parental");

		// console.log(Player.data.stream_icon);



		setTimeout(function () {
			// $("#player-wrapper .wcp-toolbar:last").append('<div class="wcp-button wcp-right" onclick="aspectRatio(0);"> <img src="images/aspect-ratio.png" class="aspect-ratio"/></div><div class="wcp-button wcp-right" onclick="zoomIn(0);"> <img src="images/zoom_in.png" class="aspect-ratio"/></div><input type="text" value="100%" class="zoomin_zoomout_field  wcp-right" id="zoomin_zoomout_field_0" disabled> <div class="wcp-button wcp-right" onclick="zoomOut(0);"> <img src="images/zoom_out.png" class="aspect-ratio"/></div><div class="wcp-button wcp-right" onclick="castingButton();"> <img src="images/Chromecast_blank.png" class="aspect-ratio"/></div>');
			$("#player-wrapper .wcp-toolbar:last").append('<div class="wcp-button wcp-right" onclick="aspectRatio(0);"> <img src="images/aspect-ratio.png" class="aspect-ratio"/></div><div class="wcp-button wcp-right" onclick="zoomIn(0);" style="    border-left: 0px;"> <img src="images/zoom_in.png" class="aspect-ratio"/></div><input type="text" value="100%" class="zoomin_zoomout_field  wcp-right" id="zoomin_zoomout_field_0" disabled> <div class="wcp-button wcp-right" onclick="zoomOut(0);"> <img src="images/zoom_out.png" class="aspect-ratio"/></div>');
			try {
				if (Player.data.stream_icon) {
					$(".channelLogo").show();
					$(".channelLogo").attr("src", Player.data.stream_icon);
					$(".channelLogo").error(function () { $(".channelLogo").hide(); }).attr("src", Player.data.stream_icon);
				} else {
					$(".channelLogo").hide();
				}
			} catch (err) {
				$(".channelLogo").hide();
			}




		}, 200);



		player.onPosition(function (pos) {
			counter = 0;
			clearInterval(reconnectInt);
		}); // from 0.0 to 1.0

		player.onState(function (state) {
			// console.log("current state: "+state);
			if (state == "playing") {
				player.zoom(1);
			}
			if (state == "ended" || state == "error") {
				var showText = 1;
				$('#videoHtml').css('background', 'black');

				player = new wjs("#player-wrapper");
				player.clearPlaylist();
				var PlayerDIvSelector = $('#player-wrapper');
				PlayerDIvSelector.removeClass("webchimeras");
				PlayerDIvSelector.html('<div class="erroronplayer"><span>Playback error, reconnects in 5s (' + showText + '/5)</span></div>');


				jWPlayerReconnect(LiveVideoLink, "new");
				return false;
			}

		});





		// player.onBuffering(function(percent) { console.log("buffering "+percent+"%"); });
		// player.onPosition(function(pos) { console.log("current position: "+pos); }); // from 0.0 to 1.0
		// player.onTime(function(t) { console.log("current time: "+t); }); // in milliseconds
		// player.onMediaChanged(function() { console.log("media item has changed"); });
		// player.onIdle(function() { console.log("player is idle"); });
		// player.onOpening(function() { console.log("opening a video"); });
		// player.onPaused(function() { console.log("paused"); });
		// player.onError(function() { console.log("error occurred"); });
		// player.onEnded(function() { console.log("end reached"); });
		// player.onStopped(function() { console.log("player has stopped"); });
		// player.onForward(function() { console.log("fastforwarding"); });
		// player.onBackward(function() { console.log("going backwards through the media"); });




		//  player.on('play',function(){
		//         counter = 0;
		//         clearInterval(reconnectInt);

		//       });

		//   player.on('error', function() {
		//   var showText = 1;
		//                 var PlayerDIvSelector = $('#player-wrapper');
		//                 $('#videoHtml').css('background', 'black');
		//                 PlayerDIvSelector.html('');
		//                 PlayerDIvSelector.css('text-align', 'center');
		//                 PlayerDIvSelector.css('background', 'none');
		//                 PlayerDIvSelector.html('<div class="erroronplayer"><span>Playback error, reconnects in 10s ('+showText+'/5)</span></div>');

		//               jWPlayerReconnect(LiveVideoLink,FailCounter);
		//               return false;


		//       });
	}
	// }




}
var playBarInterval = '', seekTime = 0, seekTimer = '';
var SeekInterval = '';
var SeekTimeJumpRight = 0;
var SeekTimeJumpLeft = 0;
var jumpNum = 30000;
var loadingTimeArray = []; var intervalNetwork = '';
function chknetwork() {
	if (media) {
		var player = media;
		var obj = {};

		// if(player.paused == undefined){
		player.paused = getMedia().paused;
		//}

		if (!player.paused) {
			loadingTimeArray.push(media.getCurrentPosition());
			if (loadingTimeArray.length > 20) {
				loadingTimeArray.shift();
			}
		}
		for (var i = 0, j = loadingTimeArray.length; i < j; i++) {
			obj[loadingTimeArray[i]] = (obj[loadingTimeArray[i]] || 0) + 1;
		}

		if (obj[media.getCurrentPosition()] > 5) {/* 
                         if( (reconnectDone == 0 && obj[media.getCurrentPosition()] > 10 )  || obj[media.getCurrentPosition()] > 5){
                              console.log("obj[media.getCurrentPosition()] = "+obj[media.getCurrentPosition()]);
                              if(Player.type == "live"){

                                   if( reconnectDone == 5){
                                        if(view == "liveChannels"){
                                             media.stop();
                                             $(".playerReconnecting").html("<b style='center'>Sorry this video can not be played , Please try again or pick another video</b>").show();
                                             
                                        }
                                        else{
                                             media.stop();
                                             Main.showFailure("Sorry this video can not be played , Please try again or pick another video");
                                             callBack = function(){
                                                  if(!short){
                                                       Player.processBack();
                                                  }
                                             }
                                             
                                        }
                                       reconnectDone = 0;
                                   }
                                   else{
                                        if(view == "liveChannels"){
                                             $(".playerReconnecting").html("<b style='center'>Playback error, reconnects in 10s ( "+reconnectDone+" / 5 ) </b>").show();
                                             if(reconnectDone != 4)
                                                  setTimeout(function(){$(".playerReconnecting").hide();},2000);
                                        }
                                        else{
                                             $("#notification").html("<b style='center'>Playback error, reconnects in 10s ( "+reconnectDone+" / 5 ) </b>").show();
                                             setTimeout(function(){$("#notification").hide();},2000);
                                        
                                        }
                                        reconnect(mainPlayUrl);
                                   }
                                   obj = {};
                                   loadingTimeArray = [];
                              }
                             
                         } */

			Main.ShowLoading();
		} else {
			Main.HideLoading();
		}
	}
	else {
		Main.HideLoading();
	}
}
var short = true;

Player.resize = function () {
	Main.HideLoading();
	// Main.ShowLoading();

	if (short) {
		$("#renderarea").css("width", "100%");
		$("#renderarea").css("height", "100%");
		$("#renderarea").css("left", "0px");
		$("#renderarea").css("top", "0px");
		$("#renderarea").css("position", "fixed");

		pushState(view, $(".imageFocus").attr("id"));
		$('.imageFocus').removeClass("imageFocus");

		$(".playerReconnecting").html('').hide();
		view = "player";
		$("#HTML5Div").html(Util.playerBody());
		$("#HTML5Div").show();
		$("#play-2").addClass("imageFocus");
		if (Player.type == "live") {
			$(".playRewind").hide();
			$(".playForward").hide();
			$(".play-icons").show();
			$(".playRewindR").show();
			$(".playForwardF").show();
			// $(".playerDivision").hide();
			$(".playerBottomDiv").hide();

		}
		else {
			$(".playRewindR").hide();
			$(".playForwardF").hide();
			$(".play-icons").show();
			$(".playerDivision").show();
			//Main.getSubTitles("show",Player.season,Player.eps);
		}
		if (playBarInterval) {
			clearInterval(playBarInterval); playBarInterval = '';
		}
		playBarInterval = setInterval(function () {

			$(".playerDivision").hide();
			$(".play-icons").hide();
			if ($('.imageFocus').attr("source") != "listSubs")
				$('.imageFocus').removeClass("imageFocus");

		}, 5000);

		short = false;

	}
	else {
		$("#renderarea").css("width", "100%");
		$("#renderarea").css("height", "100%");
		$("#renderarea").css("left", "0%");
		$("#renderarea").css("top", "0%");
		$("#renderarea").css("position", "relative");

		var obj = popState();
		view = obj.view;
		short = true;
		$("#" + obj.focus).addClass("imageFocus");

		$("#notification").html('').hide();
	}




}
var reconnecting = false, reconnectDone = 0;
function reconnect(url) {
	reconnecting = true;
	media.stop();
	media = toast.Media.getInstance();
	media.open(url);
	media.play();
	reconnecting = false;
	reconnectDone++;
}
var playerLiveIndex = 0;
Player.playKeydown = function (e) {
	var keycode;
	var userAgent = new String(navigator.userAgent);
	if (window.event) {
		keycode = e.keyCode;
	} else if (e.which) {
		keycode = e.which;
	}

	var index = parseInt($('.imageFocus').attr("index"));
	var id = $('.imageFocus').attr("id");


	function showPlayerBar() {


		if ($(".play-icons").css("display") == "block") {
			if (playBarInterval) {
				clearInterval(playBarInterval); playBarInterval = '';
			}
			playBarInterval = setInterval(function () {

				if ($('.imageFocus').attr("source") != "listSubs")
					$('.imageFocus').removeClass("imageFocus");

				$('.play-icons').hide();
				$('.playerDivision').hide();

			}, 5000);
			return false;
		}
		else {
			$(".playerDivision").show();
			$('.play-icons').show();
			if ($('.imageFocus').attr("source") != "listSubs")
				$('.imageFocus').removeClass("imageFocus");
			$('.play-icon').addClass("imageFocus");
			if (Player.type == "live") {
				$(".playRewind").hide();
				$(".playForward").hide();
				$('.playerBottomDiv').hide();
			}
			else {
				$(".playRewindR").hide();
				$(".playForwardF").hide();
				$(".playerBottomDiv").show();
			}

			if (playBarInterval) {
				clearInterval(playBarInterval); playBarInterval = '';
			}
			playBarInterval = setInterval(function () {

				$(".playerDivision").hide();
				$(".play-icons").hide();
				if ($('.imageFocus').attr("source") != "listSubs")
					$('.imageFocus').removeClass("imageFocus");

			}, 5000);
			return true;
		}
	}
	var source = $(".imageFocus").attr("source");
	if (showPlayerBar()) {
		//showPlayerDetails();
	}
	else { //if($("#beforePlayer").css("display") != "block"){

		switch (keycode) {
			case tvKeyCode.MediaPlayPause: {
				if ($(".play-icon").css("display") == "block") {
					if (document.visibilityState != "hidden")
						media.play();
					$(".play-icon").html('<i class="fas fa-pause"></i>');

				}
				else {
					media.pause();
					$(".play-icon").html('<i class="fas fa-play"></i>');

				}
				break;
			}
			case tvKeyCode.ArrowLeft: {

				if (source == "playIcons") {
					if (Player.type == "live") {
						if (index == 2) {
							$('.imageFocus').removeClass("imageFocus");
							$('.playRewindR').addClass("imageFocus");
						}
						else if (index == 4) {
							$('.imageFocus').removeClass("imageFocus");
							$('.play-icon').addClass("imageFocus");
						}

					}
					else {
						if (index == 2) {
							$('.imageFocus').removeClass("imageFocus");
							$('.playRewind').addClass("imageFocus");
						}
						else if (index == 3) {
							$('.imageFocus').removeClass("imageFocus");
							$('.play-icon').addClass("imageFocus");
						}

					}

				}

				//seekToPosition("prev");
				break;
			}
			case tvKeyCode.ArrowRight: {


				if (source == "playIcons") {
					if (Player.type == "live") {
						if (index == 2) {
							$('.imageFocus').removeClass("imageFocus");
							$('.playForwardF').addClass("imageFocus");
						}
						else if (index == 0) {
							$('.imageFocus').removeClass("imageFocus");
							$('.play-icon').addClass("imageFocus");
						}
					}
					else {
						if (index == 2) {
							$('.imageFocus').removeClass("imageFocus");
							$('.playForward').addClass("imageFocus");
						}
						else if (index == 1) {
							$('.imageFocus').removeClass("imageFocus");
							$('.play-icon').addClass("imageFocus");
						}
					}

				}


				break;
			} case tvKeyCode.ArrowUp: {

				if ($(".play-icons").css("display") == "block") {

					$(".playerDivision").hide();
					$('.play-icons').hide();
					$('.imageFocus').removeClass("imageFocus");


				}
				else {
					$(".playerDivision").show();
					if (Player.type == "live")
						$(".playerBottomDiv").hide();
					$('.play-icons').show();
					$('.imageFocus').removeClass("imageFocus");
					$('.play-icon').addClass("imageFocus");
				}
				break;
			}
			case tvKeyCode.Enter: {
				Player.playEnterKeydown($('.imageFocus'));
				break;
			}
			case tvKeyCode.MediaPlay: {
				if (document.visibilityState != "hidden")
					media.play();
				$(".play-icon").html('<i class="fas fa-pause"></i>');
				break;
			}
			case tvKeyCode.MediaStop: {
				Player.processBack();
				// console.log("tvKeyCode.MediaStop " + keycode);
				break;
			}
			case tvKeyCode.MediaPause: {
				$(".playerDivision").show(); $('.play-icons').show();
				media.pause();
				$(".play-icon").html('<i class="fas fa-play"></i>');

				break;
			}
			case tvKeyCode.MediaFastForward: {
				$(".playerDivision").show(); $('.play-icons').show();
				$('.imageFocus').removeClass("imageFocus");
				$('.playForward').addClass("imageFocus");
				seekToPosition("next");
				break;
			}
			case tvKeyCode.MediaRewind:
			case tvKeyCode.MediaBackward: {
				$(".playerDivision").show(); $('.play-icons').show();
				$('.imageFocus').removeClass("imageFocus");
				$('.playRewind').addClass("imageFocus");
				seekToPosition("prev");
				break;
			}
			case tvKeyCode.ArrowDown: {

				if (source == "listSubs") {
					var count = Object.keys(Main.subTitles).length;
					index++;
					if (index <= count) {
						$('.imageFocus').removeClass("imageFocus");
						$('#subsList-' + index).addClass("imageFocus");
					}

				}
				else if ($(".player").css("display") == "block") {
					if (Player.type == "live") {

					} else {
						$(".player").hide(); $('.play-icons').hide();
						$('.imageFocus').removeClass("imageFocus");
					}



				}
				else {
					$(".player").show(); $('.play-icons').show();
					$('.imageFocus').removeClass("imageFocus");
					$('.play-icon').addClass("imageFocus");
				}
				break;
			}

			case tvKeyCode.Return:
			case 8: {
				Player.processBack();
				break;
			}
			case 1536: {

			}
			default: {
				break;
			}
		}
	}
}
var liveCatChannelArray = '';
function getMedia() {
	return document.getElementsByTagName('video')[0];
}
Player.playEnterKeydown = function (curFocus) {
	var source = curFocus.attr("source");
	var index = parseInt(curFocus.attr("index"));


	if (playBarInterval) {
		clearInterval(playBarInterval); playBarInterval = '';
	}
	playBarInterval = setInterval(function () {

		$(".playerDivision").hide();
		$(".play-icons").hide();
		if ($('.imageFocus').attr("source") != "listSubs")
			$('.imageFocus').removeClass("imageFocus");

	}, 5000);

	if ($(".playerDivision").css("display") == "block") {
		if (source == "playIcons") {
			if (index == 2) {
				playOrPause();
			}
			else if (index == 1) {
				seekToPosition("prev");
			}
			else if (index == 3) {
				seekToPosition("next");
			}
			else if (index == 0) {
				if (playerLiveIndex > 0) {
					playerLiveIndex--;
					Player.data = liveSectionDetails[playerLiveIndex];
					//  playUrl = Main.profile.server_info.server_protocol + "://" + Main.profile.server_info.url + ":"+  Main.profile.server_info.port+"/live/"+Main.profile.user_info.username+"/"+Main.profile.user_info.password+"/"+liveSectionDetails[playerLiveIndex].stream_id+".ts";
					if (Main.profile.server_info.server_protocol != "" && Main.profile.server_info.server_protocol == "https") {
						playUrl = "https://" + Main.profile.server_info.url + ":" + Main.profile.server_info.https_port + "/live/" + Main.profile.user_info.username + "/" + Main.profile.user_info.password + "/" + liveSectionDetails[playerLiveIndex].stream_id + ".ts";
					} else {
						playUrl = "http://" + Main.profile.server_info.url + ":" + Main.profile.server_info.port + "/live/" + Main.profile.user_info.username + "/" + Main.profile.user_info.password + "/" + liveSectionDetails[playerLiveIndex].stream_id + ".ts";
					}

					Player.playStream(playUrl, false);
				}

			}
			else if (index == 4) {
				if (playerLiveIndex < liveSectionDetails.length - 1) {
					playerLiveIndex++;
					Player.data = liveSectionDetails[playerLiveIndex];
					//  playUrl = Main.profile.server_info.server_protocol + "://" + Main.profile.server_info.url + ":"+  Main.profile.server_info.port+"/live/"+Main.profile.user_info.username+"/"+Main.profile.user_info.password+"/"+liveSectionDetails[playerLiveIndex].stream_id+".ts";

					if (Main.profile.server_info.server_protocol != "" && Main.profile.server_info.server_protocol == "https") {
						playUrl = "https://" + Main.profile.server_info.url + ":" + Main.profile.server_info.https_port + "/live/" + Main.profile.user_info.username + "/" + Main.profile.user_info.password + "/" + liveSectionDetails[playerLiveIndex].stream_id + ".ts";
					} else {
						playUrl = "http://" + Main.profile.server_info.url + ":" + Main.profile.server_info.port + "/live/" + Main.profile.user_info.username + "/" + Main.profile.user_info.password + "/" + liveSectionDetails[playerLiveIndex].stream_id + ".ts";
					}

					Player.playStream(playUrl, false);
				}

			}
		}

	}
	else {
		$(".player").show();
	}

}
var beaconInterval = '';
function clearPlayerValues() {
	media.stop();
	media.unsetListener();
	media.reset();
	$("#videoDiv").hide();
	$("#videoDiv").html('');
}

Player.processBack = function () {

	if (Player.type == "live")
		Player.resize();

	$("#HTML5Div").hide();
	if (playBarInterval) {
		clearInterval(playBarInterval); playBarInterval = '';
	}
	if (intervalNetwork) {
		clearInterval(intervalNetwork); intervalNetwork = '';
		obj = {};
		loadingTimeArray = [];
	}
	$('.play-icons').hide();
	if (Player.type != "live") {
		media.stop();
		var obj = popState();
		view = obj.view;
		previousFocus = obj.focus;
		$("#loadingText").html("Loading..");
		$("#videoDiv").hide(); $("#HTML5Div").hide();
		$('.imageFocus').removeClass("imageFocus");

		try {
			$('.play-icons').hide();
			Main.HideLoading();
			Main.playerHideLoading();
		}
		catch (e) {

		}

		Main.processNext();
	}
	else {
		try {
			$('.play-icons').hide();
			Main.HideLoading();
			Main.playerHideLoading();
		}
		catch (e) {

		}
	}
	/* media.stop();
	var obj = popState();
	view = obj.view;
	previousFocus = obj.focus;
	$("#loadingText").html("Loading..");
	$("#videoDiv").hide();$("#HTML5Div").hide();
	if(playBarInterval){
		clearInterval(playBarInterval);playBarInterval = '';
	}	
	$("#videoDiv").html('');
	$('.imageFocus').removeClass("imageFocus");
	
	$('.play-icons').hide();

	$(".waterMark").hide();
	$("#beforePlayer").hide();
	
	clearTimeout(ival);ival = '';
	$(".srt").hide();
	Main.HideLoading();
	Main.processNext(); */
}
var seekTimeNext = 0;
var seekTimePrev = 0;
function seekToPosition(params) {
	var cur = media.getCurrentPosition();
	var dur = '';
	media.pause();
	dur = media.getDuration();
	try {
		if (media.getDuration() == -1) {
			if (singleMoviePage && singleMoviePage.vendorInfo && singleMoviePage.vendorInfo.duration) {
				dur = singleMoviePage.vendorInfo.duration;
				dur = dur * 1000;
			}
		}
	} catch (e) { }

	//if((cur + jumpNum) < media.getDuration() && (cur + jumpNum) > 0){
	if (params == "next") {

		if (((cur + seekTimePrev) + seekTimeNext) < (dur - 20000)) {
			seekTimeNext = seekTimeNext + jumpNum;
			seekTime = seekTime + jumpNum;
			// console.log("Next" + (dur + seekTimeNext) );
		}
		else {
			seekTimeNext = dur - media.getCurrentPosition();
			seekTime = dur - media.getCurrentPosition();
		}
	}
	else {

		if ((seekTimePrev + (cur + seekTimeNext)) > 20000) {
			seekTimePrev = seekTimePrev - jumpNum;
			seekTime = seekTime - jumpNum;
			// console.log("prev" + (media.getCurrentPosition() + seekTimePrev));
		}
		else {
			seekTimePrev = -media.getCurrentPosition();
			seekTime = -media.getCurrentPosition();
		}
	}

	var y = '';
	var offsetPos = '';
	var pickerX = parseInt($("#seek-picker").css("left").replace("px", ''));

	if ($("#flix-seekbar-run").css("width").indexOf("px") != -1) {

		offsetPos = parseInt($("#flix-seekbar-run").css("width").replace("px", ''));

		y = ((cur + seekTime) / dur) * 100;

		var totalMove = (($("#flix-seekbar").width() * y) / 100);
		$("#flix-seekbar-run").css("width", totalMove + "px");
		$("#seek-picker").css("left", (totalMove - 15) + "px");

		var offsetForRuntime = $("#seek-picker").offset().left - ($("#seek-picker-runtime").width() / 2)

		$("#seek-picker-runtime").css("left", (offsetForRuntime) + "px");
		$("#seek-picker-runtime").html(getTimeHMS(cur + seekTime));
		$("#seek-picker-runtime").show();
	}


	if (seekTimer)
		clearTimeout(seekTimer);

	seekTimer = setTimeout(function () { seekTime = Math.abs(seekTime); $("#seek-picker-runtime").hide(); console.log("SeekTime before - " + seekTime); seekTo(params); clearTimeout(seekTimer); seekTimer = ''; }, 1000);
	// console.log("SeekTime in seeker- "+seekTime);


	//		}	
}


function seekTo(param) {

	// console.log("seekTo function");

	if (seekTime) {
		curPos = media.getCurrentPosition();
		var dur = media.getDuration();
		if (media.getDuration() == -1) {
			if (singleMoviePage && singleMoviePage.vendorInfo && singleMoviePage.vendorInfo.duration) {
				dur = singleMoviePage.vendorInfo.duration;
				dur = dur * 1000;
			}
		}
		if ((curPos + (seekTimeNext + seekTimePrev)) < dur) {
			media.seekTo(curPos + (seekTimeNext + seekTimePrev));
		}
		else {
			media.seekTo(dur - 2000);
		}

		seekTime = 0;
		seekTimeNext = 0;
		seekTimePrev = 0;
	}
	if ($(".play-icon").css("display") != "block")
		media.play();

}
var mediaState = true;
function playOrPause() {

	// console.log("playOrPause");

	if (mediaState) {
		media.pause();

		$(".play-icon").html('<i class="fas fa-play"></i>');
		mediaState = false;

		//You don't have to call setScreenSaver Method. It is configurated by toast.avplay.
	}
	else {
		if (document.visibilityState != "hidden")
			media.play();
		$(".play-icon").html('<i class="fas fa-pause"></i>');


		mediaState = true;
		//You don't have to call setScreenSaver Method. It is configurated by toast.avplay.
	}
}



/// Subs


function toSeconds(t) {
	var s = 0.0
	if (t) {
		var p = t.split(':');
		for (i = 0; i < p.length; i++)
			s = s * 60 + parseFloat(p[i].replace(',', '.'))
	}
	return s;
}
function strip(s) {
	return s.replace(/^\s+|\s+$/g, "");
}
var ival = '';
function playSubtitles(subtitleElement) {

	var srt = subtitleElement.text();
	subtitleElement.text('');

	srt = srt.replace(/\r\n|\r|\n/g, '\n')

	var subtitles = {};
	srt = strip(srt);
	var srt_ = srt.split('\n\n');
	for (s in srt_) {
		st = srt_[s].split('\n');
		if (st.length >= 2) {
			n = st[0];
			i = strip(st[1].split(' --> ')[0]);
			o = strip(st[1].split(' --> ')[1]);
			t = st[2];
			if (st.length > 2) {
				for (j = 3; j < st.length; j++)
					t += '\n' + st[j];
			}
			is = toSeconds(i);
			os = toSeconds(o);
			subtitles[is] = { i: is, o: os, t: t };
		}
	}
	var currentSubtitle = -1;
	ival = setInterval(function () {
		var currentTime = media.getCurrentPosition() / (1000);
		var subtitle = -1;


		var Okeys = Object.keys(subtitles);

		var Values = [];

		for (var i = 0; i < Okeys.length; i++) {
			Values.push(subtitles[Okeys[i]]);
		}

		//Object.values(subtitles);
		var funC = function (a, b) { return parseInt(a) - parseInt(b) }
		Okeys.sort(funC);
		Values.sort(funC);

		for (var i = 0; i < Values.length; i++) {
			//  console.log("s = "+keys + " current Time = "+ currentTime);
			if (Okeys[i] > currentTime)
				break;
			subtitle = Okeys[i];
		}
		if (subtitle != -1) {
			if (subtitle != currentSubtitle) {
				subtitleElement.html(subtitles[subtitle].t);
				currentSubtitle = subtitle;
			} else if (subtitles[subtitle] && subtitles[subtitle].o < currentTime) {
				subtitleElement.html('');
			}
		}
	}, 100);
}


function playSubs(srtUrl) {
	$(".srt").html('');
	$(".srt").show();
	var subtitleElement = $(".srt");
	var videoId = $("#renderarea video");
	if (!videoId) return;
	//var srtUrl = "http://subs.89to.com/movies/tt3778644/tt3778644.he.srt";
	try {
		if (srtUrl) {
			$(".srt").load(srtUrl, function (responseText, textStatus, req) {
				playSubtitles(subtitleElement);
			})
		} else {
			playSubtitles(subtitleElement);
		}
	}
	catch (e) {

	}

}









function removeAndInitializePlayer1() {

	if ($("#player-wrapper1").hasClass("webchimeras")) {
		player1 = new wjs("#player-wrapper1");
		player1.clearPlaylist();
		//player.stop();

		var PlayerDIvSelector1 = $('#player-wrapper1');
		PlayerDIvSelector1.removeClass("webchimeras");
		PlayerDIvSelector1.html('');
		player1 = new wjs("#player-wrapper1").addPlayer(confMultiScreen);
	} else {
		player1 = new wjs("#player-wrapper1").addPlayer(confMultiScreen);
	}

}

function jWPlayerReconnect1(Link, FailCounter) {
	//alert("entered1");
	var counter = 0;
	if (FailCounter == "new") {
		counter = 0;
	} else {
		try {
			clearInterval(reconnectInt1);
		} catch (e) {

		}
		counter = FailCounter;
	}
	//alert("entered2");
	var playerState = "";
	reconnectInt1 = setInterval(function () {
		// alert(playerState);
		// console.log("testing: "+counter);

		if (playerState == "ended" || playerState == "error" || playerState == "") {
			counter++;
			if (counter < 5) {



				removeAndInitializePlayer1();




				player1.addPlaylist({
					title: Player.name,
					url: Link,
					aspectRatio: "16:9"
				});


				setTimeout(function () {
					$("#player-wrapper1 .wcp-toolbar:last").append('<div class="wcp-button wcp-right" onclick="aspectRatio(1);"> <img src="images/aspect-ratio.png" class="aspect-ratio"/></div><div class="wcp-button wcp-right" onclick="zoomIn(1);"> <img src="images/zoom_in.png" class="aspect-ratio"/></div><input type="text" value="100%" class="zoomin_zoomout_field  wcp-right" id="zoomin_zoomout_field_1" disabled> <div class="wcp-button wcp-right" onclick="zoomOut(1);"> <img src="images/zoom_out.png" class="aspect-ratio"/></div>');

					try {
						if (Player.stream_icon) {
							$("#player-wrapper1 .channelLogo").show();
							$("#player-wrapper1 .channelLogo").attr("src", Player.stream_icon);
							$("#player-wrapper1 .channelLogo").error(function () { $("#player-wrapper1 .channelLogo").hide(); }).attr("src", Player.stream_icon);
						} else {
							$("#player-wrapper1 .channelLogo").hide();
						}
					} catch (err) {
						$("#player-wrapper1 .channelLogo").hide();
					}
				}, 200);


				player1.onPosition(function (pos) {
					counter = 0;
					clearInterval(reconnectInt1);
					//alert("connected");
				}); // from 0.0 to 1.0



				player1.onState(function (state) {
					// alert("current state: "+state);
					playerState = state;
					if (state == "playing") {
						player1.zoom(1);
					}
					// console.log("current state: "+state);
					if (state == "ended" || state == "error") {
						var showText = Number(counter) + Number(1);
						// alert('Playback error, reconnects in 10s ('+showText+'/5)');
						// var PlayerDIvSelector = $('#player-wrapper');
						// PlayerDIvSelector.removeClass("webchimeras");

						$('#videoHtml1').css('background', 'black');

						player1 = new wjs("#player-wrapper1");
						player1.clearPlaylist();
						var PlayerDIvSelector1 = $('#player-wrapper1');
						PlayerDIvSelector1.removeClass("webchimeras");
						// PlayerDIvSelector.css('text-align', 'center');
						PlayerDIvSelector1.html('<div class="erroronplayer"><span>Playback error, reconnects in 5s (' + showText + '/5)</span></div>');
						jWPlayerReconnect1(Link, counter);




					}
				});


			} else {

				clearInterval(reconnectInt1);
				counter = 0;


				try {
					player1 = new wjs("#player-wrapper1");
					player1.clearPlaylist();
					var PlayerDIvSelector1 = $('#player-wrapper1');
					PlayerDIvSelector1.removeClass("webchimeras");
					// PlayerDIvSelector.css('text-align', 'center');
					PlayerDIvSelector1.html('<div class="erroronplayer"><span>Sorry, this video can not be played.<br> Please try again or pick another video.</span></div>');
				} catch (error) {
					var PlayerDIvSelector1 = $('#player-wrappe1');
					PlayerDIvSelector1.removeClass("webchimeras");
					// PlayerDIvSelector.css('text-align', 'center');
					PlayerDIvSelector1.html('<div class="erroronplayer"><span>Sorry, this video can not be played.<br> Please try again or pick another video.</span></div>');
				}



			}
		}

	}, 5000);



}

Player.set_flowplayer1 = function (url, short) {

	// Player.playStream = function(url,short){
	if (intervalNetwork) {
		clearInterval(intervalNetwork); intervalNetwork = '';
		obj = {};
		loadingTimeArray = [];
	}
	reconnectDone = 0;
	//    try{
	// 	   if(media){
	// 		   clearPlayerValues();
	// 	   }
	//    }
	//    catch(e){}


	//     alert(LiveVideoLink);
	LiveVideoLink1 = url;


	$(".playerReconnecting1").html('').hide();
	$("#notification1").html('').hide();




	var FailCounter = "";

	if (reconnectInt1 !== null || reconnectInt1 !== undefined) {
		clearInterval(reconnectInt1);
	}


	var flag = false;

	var cID = "";
	var cName = "";

	if (!flag) {

		removeAndInitializePlayer1();

		player1.addPlaylist({
			title: Player.name,
			url: LiveVideoLink1,
			aspectRatio: "16:9"
		});

		setTimeout(function () {
			$("#player-wrapper1 .wcp-toolbar:last").append('<div class="wcp-button wcp-right" onclick="aspectRatio(1);"> <img src="images/aspect-ratio.png" class="aspect-ratio"/></div><div class="wcp-button wcp-right" onclick="zoomIn(1);"> <img src="images/zoom_in.png" class="aspect-ratio"/></div><input type="text" value="100%" class="zoomin_zoomout_field  wcp-right" id="zoomin_zoomout_field_1" disabled> <div class="wcp-button wcp-right" onclick="zoomOut(1);"> <img src="images/zoom_out.png" class="aspect-ratio"/></div>');
			try {
				if (Player.stream_icon) {
					$("#player-wrapper1 .channelLogo").show();
					$("#player-wrapper1 .channelLogo").attr("src", Player.stream_icon);
					$("#player-wrapper1 .channelLogo").error(function () { $("#player-wrapper1 .channelLogo").hide(); }).attr("src", Player.stream_icon);
				} else {
					$("#player-wrapper1 .channelLogo").hide();
				}
			} catch (err) {
				$("#player-wrapper1 .channelLogo").hide();
			}
		}, 200);




		player1.onPosition(function (pos) {
			counter = 0;
			clearInterval(reconnectInt1);
		}); // from 0.0 to 1.0

		player1.onState(function (state) {
			//    console.log("current state: "+state);
			if (state == "playing") {
				player1.zoom(1);
			}
			if (state == "ended" || state == "error") {
				var showText = 1;
				$('#videoHtml1').css('background', 'black');

				player1 = new wjs("#player-wrapper1");
				player1.clearPlaylist();
				var PlayerDIvSelector1 = $('#player-wrapper1');
				PlayerDIvSelector1.removeClass("webchimeras");
				PlayerDIvSelector1.html('<div class="erroronplayer"><span>Playback error, reconnects in 5s (' + showText + '/5)</span></div>');


				jWPlayerReconnect1(LiveVideoLink1, "new");
				return false;
			}

		});

	}
	//    }




	//    }
}








function removeAndInitializePlayer2() {

	if ($("#player-wrapper2").hasClass("webchimeras")) {
		player2 = new wjs("#player-wrapper2");
		player2.clearPlaylist();
		//player.stop();

		var PlayerDIvSelector2 = $('#player-wrapper2');
		PlayerDIvSelector2.removeClass("webchimeras");
		PlayerDIvSelector2.html('');
		player2 = new wjs("#player-wrapper2").addPlayer(confMultiScreen);
	} else {
		player2 = new wjs("#player-wrapper2").addPlayer(confMultiScreen);
	}

}

function jWPlayerReconnect2(Link, FailCounter) {
	//alert("entered1");
	var counter = 0;
	if (FailCounter == "new") {
		counter = 0;
	} else {
		try {
			clearInterval(reconnectInt2);
		} catch (e) {

		}
		counter = FailCounter;
	}
	//alert("entered2");
	var playerState = "";
	reconnectInt2 = setInterval(function () {
		// alert(playerState);
		// console.log("testing: "+counter);

		if (playerState == "ended" || playerState == "error" || playerState == "") {
			counter++;
			if (counter < 5) {



				removeAndInitializePlayer2();




				player2.addPlaylist({
					title: Player.name,
					url: Link,
					aspectRatio: "16:9"
				});

				setTimeout(function () {
					$("#player-wrapper2 .wcp-toolbar:last").append('<div class="wcp-button wcp-right" onclick="aspectRatio(2);"> <img src="images/aspect-ratio.png" class="aspect-ratio"/></div><div class="wcp-button wcp-right" onclick="zoomIn(2);"> <img src="images/zoom_in.png" class="aspect-ratio"/></div><input type="text" value="100%" class="zoomin_zoomout_field  wcp-right" id="zoomin_zoomout_field_2" disabled> <div class="wcp-button wcp-right" onclick="zoomOut(2);"> <img src="images/zoom_out.png" class="aspect-ratio"/></div>');
					try {
						if (Player.stream_icon) {
							$("#player-wrapper2 .channelLogo").show();
							$("#player-wrapper2 .channelLogo").attr("src", Player.stream_icon);
							$("#player-wrapper2 .channelLogo").error(function () { $("#player-wrapper2 .channelLogo").hide(); }).attr("src", Player.stream_icon);
						} else {
							$("#player-wrapper2 .channelLogo").hide();
						}
					} catch (err) {
						$("#player-wrapper2 .channelLogo").hide();
					}
				}, 200);



				player2.onPosition(function (pos) {
					counter = 0;
					clearInterval(reconnectInt2);
					//alert("connected");
				}); // from 0.0 to 1.0



				player2.onState(function (state) {
					// alert("current state: "+state);
					playerState = state;
					// console.log("current state: "+state);
					if (state == "playing") {
						player2.zoom(1);
					}
					if (state == "ended" || state == "error") {
						var showText = Number(counter) + Number(1);
						// alert('Playback error, reconnects in 10s ('+showText+'/5)');
						// var PlayerDIvSelector = $('#player-wrapper');
						// PlayerDIvSelector.removeClass("webchimeras");

						$('#videoHtml2').css('background', 'black');

						player2 = new wjs("#player-wrapper2");
						player2.clearPlaylist();
						var PlayerDIvSelector2 = $('#player-wrapper2');
						PlayerDIvSelector2.removeClass("webchimeras");
						// PlayerDIvSelector.css('text-align', 'center');
						PlayerDIvSelector2.html('<div class="erroronplayer"><span>Playback error, reconnects in 5s (' + showText + '/5)</span></div>');
						jWPlayerReconnect2(Link, counter);




					}
				});


			} else {

				clearInterval(reconnectInt2);
				counter = 0;


				try {
					player2 = new wjs("#player-wrapper2");
					player2.clearPlaylist();
					var PlayerDIvSelector2 = $('#player-wrapper2');
					PlayerDIvSelector2.removeClass("webchimeras");
					// PlayerDIvSelector.css('text-align', 'center');
					PlayerDIvSelector2.html('<div class="erroronplayer"><span>Sorry, this video can not be played.<br> Please try again or pick another video.</span></div>');
				} catch (error) {
					var PlayerDIvSelector2 = $('#player-wrappe2');
					PlayerDIvSelector2.removeClass("webchimeras");
					// PlayerDIvSelector.css('text-align', 'center');
					PlayerDIvSelector2.html('<div class="erroronplayer"><span>Sorry, this video can not be played.<br> Please try again or pick another video.</span></div>');
				}



			}
		}

	}, 5000);



}

Player.set_flowplayer2 = function (url, short) {

	// Player.playStream = function(url,short){
	if (intervalNetwork) {
		clearInterval(intervalNetwork); intervalNetwork = '';
		obj = {};
		loadingTimeArray = [];
	}
	reconnectDone = 0;
	//    try{
	// 	   if(media){
	// 		   clearPlayerValues();
	// 	   }
	//    }
	//    catch(e){}


	//     alert(LiveVideoLink);
	LiveVideoLink2 = url;


	$(".playerReconnecting2").html('').hide();
	$("#notification2").html('').hide();




	var FailCounter = "";

	if (reconnectInt2 !== null || reconnectInt2 !== undefined) {
		clearInterval(reconnectInt2);
	}


	var flag = false;

	var cID = "";
	var cName = "";

	if (!flag) {

		removeAndInitializePlayer2();

		player2.addPlaylist({
			title: Player.name,
			url: LiveVideoLink2,
			aspectRatio: "16:9"
		});

		setTimeout(function () {
			$("#player-wrapper2 .wcp-toolbar:last").append('<div class="wcp-button wcp-right" onclick="aspectRatio(2);"> <img src="images/aspect-ratio.png" class="aspect-ratio"/></div><div class="wcp-button wcp-right" onclick="zoomIn(2);"> <img src="images/zoom_in.png" class="aspect-ratio"/></div><input type="text" value="100%" class="zoomin_zoomout_field  wcp-right" id="zoomin_zoomout_field_2" disabled> <div class="wcp-button wcp-right" onclick="zoomOut(2);"> <img src="images/zoom_out.png" class="aspect-ratio"/></div>');
			try {
				if (Player.stream_icon) {
					$("#player-wrapper2 .channelLogo").show();
					$("#player-wrapper2 .channelLogo").attr("src", Player.stream_icon);
					$("#player-wrapper2 .channelLogo").error(function () { $("#player-wrapper2 .channelLogo").hide(); }).attr("src", Player.stream_icon);
				} else {
					$("#player-wrapper2 .channelLogo").hide();
				}
			} catch (err) {
				$("#player-wrapper2 .channelLogo").hide();
			}
		}, 200);





		player2.onPosition(function (pos) {
			counter = 0;
			clearInterval(reconnectInt2);
		}); // from 0.0 to 1.0

		player2.onState(function (state) {
			//    console.log("current state: "+state);
			if (state == "playing") {
				player2.zoom(1);
			}
			if (state == "ended" || state == "error") {
				var showText = 1;
				$('#videoHtml2').css('background', 'black');

				player2 = new wjs("#player-wrapper2");
				player2.clearPlaylist();
				var PlayerDIvSelector2 = $('#player-wrapper2');
				PlayerDIvSelector2.removeClass("webchimeras");
				PlayerDIvSelector2.html('<div class="erroronplayer"><span>Playback error, reconnects in 5s (' + showText + '/5)</span></div>');


				jWPlayerReconnect2(LiveVideoLink2, "new");
				return false;
			}

		});

	}
	//    }




	//    }
}






function removeAndInitializePlayer3() {

	if ($("#player-wrapper3").hasClass("webchimeras")) {
		player3 = new wjs("#player-wrapper3");
		player3.clearPlaylist();
		//player.stop();

		var PlayerDIvSelector3 = $('#player-wrapper3');
		PlayerDIvSelector3.removeClass("webchimeras");
		PlayerDIvSelector3.html('');
		player3 = new wjs("#player-wrapper3").addPlayer(confMultiScreen);
	} else {
		player3 = new wjs("#player-wrapper3").addPlayer(confMultiScreen);
	}

}

function jWPlayerReconnect3(Link, FailCounter) {
	//alert("entered1");
	var counter = 0;
	if (FailCounter == "new") {
		counter = 0;
	} else {
		try {
			clearInterval(reconnectInt3);
		} catch (e) {

		}
		counter = FailCounter;
	}
	//alert("entered3");
	var playerState = "";
	reconnectInt3 = setInterval(function () {
		// alert(playerState);
		// console.log("testing: "+counter);

		if (playerState == "ended" || playerState == "error" || playerState == "") {
			counter++;
			if (counter < 5) {



				removeAndInitializePlayer3();




				player3.addPlaylist({
					title: Player.name,
					url: Link,
					aspectRatio: "16:9"
				});
				setTimeout(function () {
					$("#player-wrapper3 .wcp-toolbar:last").append('<div class="wcp-button wcp-right" onclick="aspectRatio(3);"> <img src="images/aspect-ratio.png" class="aspect-ratio"/></div><div class="wcp-button wcp-right" onclick="zoomIn(3);"> <img src="images/zoom_in.png" class="aspect-ratio"/></div><input type="text" value="100%" class="zoomin_zoomout_field  wcp-right" id="zoomin_zoomout_field_3" disabled> <div class="wcp-button wcp-right" onclick="zoomOut(3);"> <img src="images/zoom_out.png" class="aspect-ratio"/></div>');
					try {
						if (Player.stream_icon) {
							$("#player-wrapper3 .channelLogo").show();
							$("#player-wrapper3 .channelLogo").attr("src", Player.stream_icon);
							$("#player-wrapper3 .channelLogo").error(function () { $("#player-wrapper3 .channelLogo").hide(); }).attr("src", Player.stream_icon);
						} else {
							$("#player-wrapper3 .channelLogo").hide();
						}
					} catch (err) {
						$("#player-wrapper3 .channelLogo").hide();
					}
				}, 200);





				player3.onPosition(function (pos) {
					counter = 0;
					clearInterval(reconnectInt3);
					//alert("connected");
				}); // from 0.0 to 1.0



				player3.onState(function (state) {
					// alert("current state: "+state);
					playerState = state;
					if (state == "playing") {
						player3.zoom(1);
					}
					// console.log("current state: "+state);
					if (state == "ended" || state == "error") {
						var showText = Number(counter) + Number(1);
						// alert('Playback error, reconnects in 10s ('+showText+'/5)');
						// var PlayerDIvSelector = $('#player-wrapper');
						// PlayerDIvSelector.removeClass("webchimeras");

						$('#videoHtml3').css('background', 'black');

						player3 = new wjs("#player-wrapper3");
						player3.clearPlaylist();
						var PlayerDIvSelector3 = $('#player-wrapper3');
						PlayerDIvSelector3.removeClass("webchimeras");
						// PlayerDIvSelector.css('text-align', 'center');
						PlayerDIvSelector3.html('<div class="erroronplayer"><span>Playback error, reconnects in 5s (' + showText + '/5)</span></div>');
						jWPlayerReconnect3(Link, counter);




					}
				});


			} else {

				clearInterval(reconnectInt3);
				counter = 0;


				try {
					player3 = new wjs("#player-wrapper3");
					player3.clearPlaylist();
					var PlayerDIvSelector3 = $('#player-wrapper3');
					PlayerDIvSelector3.removeClass("webchimeras");
					// PlayerDIvSelector.css('text-align', 'center');
					PlayerDIvSelector3.html('<div class="erroronplayer"><span>Sorry, this video can not be played.<br> Please try again or pick another video.</span></div>');
				} catch (error) {
					var PlayerDIvSelector3 = $('#player-wrappe3');
					PlayerDIvSelector3.removeClass("webchimeras");
					// PlayerDIvSelector.css('text-align', 'center');
					PlayerDIvSelector3.html('<div class="erroronplayer"><span>Sorry, this video can not be played.<br> Please try again or pick another video.</span></div>');
				}



			}
		}

	}, 5000);



}

Player.set_flowplayer3 = function (url, short) {

	// Player.playStream = function(url,short){
	if (intervalNetwork) {
		clearInterval(intervalNetwork); intervalNetwork = '';
		obj = {};
		loadingTimeArray = [];
	}
	reconnectDone = 0;
	//    try{
	// 	   if(media){
	// 		   clearPlayerValues();
	// 	   }
	//    }
	//    catch(e){}


	//     alert(LiveVideoLink);
	LiveVideoLink3 = url;


	$(".playerReconnecting3").html('').hide();
	$("#notification3").html('').hide();




	var FailCounter = "";

	if (reconnectInt3 !== null || reconnectInt3 !== undefined) {
		clearInterval(reconnectInt3);
	}


	var flag = false;

	var cID = "";
	var cName = "";

	if (!flag) {

		removeAndInitializePlayer3();

		player3.addPlaylist({
			title: Player.name,
			url: LiveVideoLink3,
			aspectRatio: "16:9"
		});


		setTimeout(function () {
			$("#player-wrapper3 .wcp-toolbar:last").append('<div class="wcp-button wcp-right" onclick="aspectRatio(3);"> <img src="images/aspect-ratio.png" class="aspect-ratio"/></div><div class="wcp-button wcp-right" onclick="zoomIn(3);"> <img src="images/zoom_in.png" class="aspect-ratio"/></div><input type="text" value="100%" class="zoomin_zoomout_field  wcp-right" id="zoomin_zoomout_field_3" disabled> <div class="wcp-button wcp-right" onclick="zoomOut(3);"> <img src="images/zoom_out.png" class="aspect-ratio"/></div>');
			try {
				if (Player.stream_icon) {
					$("#player-wrapper3 .channelLogo").show();
					$("#player-wrapper3 .channelLogo").attr("src", Player.stream_icon);
					$("#player-wrapper3 .channelLogo").error(function () { $("#player-wrapper3 .channelLogo").hide(); }).attr("src", Player.stream_icon);
				} else {
					$("#player-wrapper3 .channelLogo").hide();
				}
			} catch (err) {
				$("#player-wrapper3 .channelLogo").hide();
			}
		}, 200);




		player3.onPosition(function (pos) {
			counter = 0;
			clearInterval(reconnectInt3);
		}); // from 0.0 to 1.0

		player3.onState(function (state) {
			if (state == "playing") {
				player3.zoom(1);
			}
			//    console.log("current state: "+state);
			if (state == "ended" || state == "error") {
				var showText = 1;
				$('#videoHtml3').css('background', 'black');

				player3 = new wjs("#player-wrapper3");
				player3.clearPlaylist();
				var PlayerDIvSelector3 = $('#player-wrapper3');
				PlayerDIvSelector3.removeClass("webchimeras");
				PlayerDIvSelector3.html('<div class="erroronplayer"><span>Playback error, reconnects in 5s (' + showText + '/5)</span></div>');


				jWPlayerReconnect3(LiveVideoLink3, "new");
				return false;
			}

		});

	}
	//    }




	//    }
}





function removeAndInitializePlayer4() {

	if ($("#player-wrapper4").hasClass("webchimeras")) {
		player4 = new wjs("#player-wrapper4");
		player4.clearPlaylist();
		//player.stop();

		var PlayerDIvSelector4 = $('#player-wrapper4');
		PlayerDIvSelector4.removeClass("webchimeras");
		PlayerDIvSelector4.html('');
		player4 = new wjs("#player-wrapper4").addPlayer(confMultiScreen);
	} else {
		player4 = new wjs("#player-wrapper4").addPlayer(confMultiScreen);
	}

}

function jWPlayerReconnect4(Link, FailCounter) {
	//alert("entered1");
	var counter = 0;
	if (FailCounter == "new") {
		counter = 0;
	} else {
		try {
			clearInterval(reconnectInt4);
		} catch (e) {

		}
		counter = FailCounter;
	}
	//alert("entered4");
	var playerState = "";
	reconnectInt4 = setInterval(function () {
		// alert(playerState);
		// console.log("testing: "+counter);

		if (playerState == "ended" || playerState == "error" || playerState == "") {
			counter++;
			if (counter < 5) {



				removeAndInitializePlayer4();




				player4.addPlaylist({
					title: Player.name,
					url: Link,
					aspectRatio: "16:9"
				});
				setTimeout(function () {
					$("#player-wrapper4 .wcp-toolbar:last").append('<div class="wcp-button wcp-right" onclick="aspectRatio(4);"> <img src="images/aspect-ratio.png" class="aspect-ratio"/></div><div class="wcp-button wcp-right" onclick="zoomIn(4);"> <img src="images/zoom_in.png" class="aspect-ratio"/></div><input type="text" value="100%" class="zoomin_zoomout_field  wcp-right" id="zoomin_zoomout_field_4" disabled> <div class="wcp-button wcp-right" onclick="zoomOut(4);"> <img src="images/zoom_out.png" class="aspect-ratio"/></div>');
					try {
						if (Player.stream_icon) {
							$("#player-wrapper4 .channelLogo").show();
							$("#player-wrapper4 .channelLogo").attr("src", Player.stream_icon);
							$("#player-wrapper4 .channelLogo").error(function () { $("#player-wrapper4 .channelLogo").hide(); }).attr("src", Player.stream_icon);
						} else {
							$("#player-wrapper4 .channelLogo").hide();
						}
					} catch (err) {
						$("#player-wrapper4 .channelLogo").hide();
					}
				}, 200);



				player4.onPosition(function (pos) {
					counter = 0;
					clearInterval(reconnectInt4);
					//alert("connected");
				}); // from 0.0 to 1.0



				player4.onState(function (state) {
					// alert("current state: "+state);
					playerState = state;
					// console.log("current state: "+state);
					if (state == "playing") {
						player4.zoom(1);
					}
					if (state == "ended" || state == "error") {
						var showText = Number(counter) + Number(1);
						// alert('Playback error, reconnects in 10s ('+showText+'/5)');
						// var PlayerDIvSelector = $('#player-wrapper');
						// PlayerDIvSelector.removeClass("webchimeras");

						$('#videoHtml4').css('background', 'black');

						player4 = new wjs("#player-wrapper4");
						player4.clearPlaylist();
						var PlayerDIvSelector4 = $('#player-wrapper4');
						PlayerDIvSelector4.removeClass("webchimeras");
						// PlayerDIvSelector.css('text-align', 'center');
						PlayerDIvSelector4.html('<div class="erroronplayer"><span>Playback error, reconnects in 5s (' + showText + '/5)</span></div>');
						jWPlayerReconnect4(Link, counter);




					}
				});


			} else {

				clearInterval(reconnectInt4);
				counter = 0;


				try {
					player4 = new wjs("#player-wrapper4");
					player4.clearPlaylist();
					var PlayerDIvSelector4 = $('#player-wrapper4');
					PlayerDIvSelector4.removeClass("webchimeras");
					// PlayerDIvSelector.css('text-align', 'center');
					PlayerDIvSelector4.html('<div class="erroronplayer"><span>Sorry, this video can not be played.<br> Please try again or pick another video.</span></div>');
				} catch (error) {
					var PlayerDIvSelector4 = $('#player-wrappe4');
					PlayerDIvSelector4.removeClass("webchimeras");
					// PlayerDIvSelector.css('text-align', 'center');
					PlayerDIvSelector4.html('<div class="erroronplayer"><span>Sorry, this video can not be played.<br> Please try again or pick another video.</span></div>');
				}



			}
		}

	}, 5000);



}

Player.set_flowplayer4 = function (url, short) {

	// Player.playStream = function(url,short){
	if (intervalNetwork) {
		clearInterval(intervalNetwork); intervalNetwork = '';
		obj = {};
		loadingTimeArray = [];
	}
	reconnectDone = 0;
	//    try{
	// 	   if(media){
	// 		   clearPlayerValues();
	// 	   }
	//    }
	//    catch(e){}


	//     alert(LiveVideoLink);
	LiveVideoLink4 = url;


	$(".playerReconnecting4").html('').hide();
	$("#notification4").html('').hide();




	var FailCounter = "";

	if (reconnectInt4 !== null || reconnectInt4 !== undefined) {
		clearInterval(reconnectInt4);
	}


	var flag = false;

	var cID = "";
	var cName = "";

	if (!flag) {

		removeAndInitializePlayer4();

		player4.addPlaylist({
			title: Player.name,
			url: LiveVideoLink4,
			aspectRatio: "16:9"
		});
		setTimeout(function () {
			$("#player-wrapper4 .wcp-toolbar:last").append('<div class="wcp-button wcp-right" onclick="aspectRatio(4);"> <img src="images/aspect-ratio.png" class="aspect-ratio"/></div><div class="wcp-button wcp-right" onclick="zoomIn(4);"> <img src="images/zoom_in.png" class="aspect-ratio"/></div><input type="text" value="100%" class="zoomin_zoomout_field  wcp-right" id="zoomin_zoomout_field_4" disabled> <div class="wcp-button wcp-right" onclick="zoomOut(4);"> <img src="images/zoom_out.png" class="aspect-ratio"/></div>');
			try {
				if (Player.stream_icon) {
					$("#player-wrapper4 .channelLogo").show();
					$("#player-wrapper4 .channelLogo").attr("src", Player.stream_icon);
					$("#player-wrapper4 .channelLogo").error(function () { $("#player-wrapper4 .channelLogo").hide(); }).attr("src", Player.stream_icon);
				} else {
					$("#player-wrapper4 .channelLogo").hide();
				}
			} catch (err) {
				$("#player-wrapper4 .channelLogo").hide();
			}
		}, 200);





		player4.onPosition(function (pos) {
			counter = 0;
			clearInterval(reconnectInt4);
		}); // from 0.0 to 1.0

		player4.onState(function (state) {
			//    console.log("current state: "+state);
			if (state == "playing") {
				player4.zoom(1);
			}
			if (state == "ended" || state == "error") {
				var showText = 1;
				$('#videoHtml4').css('background', 'black');

				player4 = new wjs("#player-wrapper4");
				player4.clearPlaylist();
				var PlayerDIvSelector4 = $('#player-wrapper4');
				PlayerDIvSelector4.removeClass("webchimeras");
				PlayerDIvSelector4.html('<div class="erroronplayer"><span>Playback error, reconnects in 5s (' + showText + '/5)</span></div>');


				jWPlayerReconnect4(LiveVideoLink4, "new");
				return false;
			}

		});

	}
	//    }




	//    }
}




Player.stopMultiSreenPlayers = function () {
	try {
		player1.clearPlaylist();
	} catch (error) {
	}
	try {
		player2.clearPlaylist();
	} catch (error) {
	}
	try {
		player3.clearPlaylist();
	} catch (error) {
	}
	try {
		player4.clearPlaylist();
	} catch (error) {
	}
}

Player.playerFocused = function (playerFocused) {
	if (playerFocused == 1) {
		try { player1.mute(false); } catch (err) { }
		try { player2.mute(true); } catch (err) { }
		try { player3.mute(true); } catch (err) { }
		try { player4.mute(true); } catch (err) { }
	} else if (playerFocused == 2) {
		try { player1.mute(true); } catch (err) { }
		try { player2.mute(false); } catch (err) { }
		try { player3.mute(true); } catch (err) { }
		try { player4.mute(true); } catch (err) { }
	} else if (playerFocused == 3) {
		try { player1.mute(true); } catch (err) { }
		try { player2.mute(true); } catch (err) { }
		try { player3.mute(false); } catch (err) { }
		try { player4.mute(true); } catch (err) { }
	} else if (playerFocused == 4) {
		try { player1.mute(true); } catch (err) { }
		try { player2.mute(true); } catch (err) { }
		try { player3.mute(true); } catch (err) { }
		try { player4.mute(false); } catch (err) { }
	}
}