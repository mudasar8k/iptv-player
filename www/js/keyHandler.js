var Keyhandler = {};



var homeFocus = '';
var menuFocus = '';
var AddToFavBoxHidden = false;
var openedSeriesID = '';

function showDateAndTime(){
     var data = new Date();
     var date = getDateWithBothFormats(selectedTimeFormat);  
     var date2 = monthNames[data.getMonth()] + " " + data.getDate() + ", " + data.getFullYear();
     $(".timeOnAllPages").html(date);
     $(".dateOnAllPages").html(date2);
}

Keyhandler.homeKeyhandler = function (e) {
	var keycode;
	var userAgent = new String(navigator.userAgent);
	if (window.event) {
		keycode = e.keyCode;
	} else if (e.which) {
		keycode = e.which;
	}
	
	var index = parseInt($('.imageFocus').attr("index"));
	
	var id = $('.imageFocus').attr("id");
	var count = parseInt($('.imageFocus').attr("count"));
	var source = $('.imageFocus').attr("source");

	var v_index = parseInt($('.imageFocus').attr("v_index"));
	var h_index = parseInt($('.imageFocus').attr("h_index"));

	switch (keycode) {
	case tvKeyCode.ArrowLeft: {
		if(source == "tiles"){
			if(id == "moviesTile"){
				$('.imageFocus').removeClass("imageFocus");
				$('#homeLiveTile').addClass("imageFocus");
			}
			else if(id == "seriesTile"){
				$('.imageFocus').removeClass("imageFocus");
				$('#moviesTile').addClass("imageFocus");
               }
               else if(id == "settingTile"){
                    $('.imageFocus').removeClass("imageFocus");
				$('#accountTile').addClass("imageFocus");
               }
               else if(id == "accountTile"){
                    $('.imageFocus').removeClass("imageFocus");
				$('#listUser').addClass("imageFocus");
               }
               else if(id == "listUser"){
                    $('.imageFocus').removeClass("imageFocus");
				$('#homeLiveTile').addClass("imageFocus");
               }
		}
		else if(source == "headTiles"){
			
			if(id == "switchUserIcon"){
                    $('.imageFocus').removeClass("imageFocus");
				$('#switchUserIcon').addClass("imageFocus");
			}
		}
			break;
		}
	case tvKeyCode.ArrowRight: {
		if(source == "tiles"){
			if(id == "homeLiveTile"){
				$('.imageFocus').removeClass("imageFocus");
				$('#moviesTile').addClass("imageFocus");
			}
			else if(id == "moviesTile"){
				$('.imageFocus').removeClass("imageFocus");
				$('#seriesTile').addClass("imageFocus");
               }
               else if(id == "listUser"){
                    $('.imageFocus').removeClass("imageFocus");
				$('#accountTile').addClass("imageFocus");
               }
               else if(id == "accountTile"){
                    $('.imageFocus').removeClass("imageFocus");
				$('#settingTile').addClass("imageFocus");
               }
		}
		else if(source == "headTiles"){
			
			if(id == "switchUserIcon"){
                    $('.imageFocus').removeClass("imageFocus");
				$('#switchUserIcon').addClass("imageFocus");
			}
		}
			
			break;
		}
	case tvKeyCode.ArrowUp: {
			if(source == "tiles"){
                    if(id == "accountTile" || id == "listUser" ){
                         $('.imageFocus').removeClass("imageFocus");
                         $('#moviesTile').addClass("imageFocus");
                    }else if(id == "settingTile"){
                         $('.imageFocus').removeClass("imageFocus");
                         $('#seriesTile').addClass("imageFocus");
                    }else if(id == "homeLiveTile" || id =="moviesTile" || id =="seriesTile"){
                         $('.imageFocus').removeClass("imageFocus");
                         $('#switchUserIcon').addClass("imageFocus");
                    }
				
			}
			
			break;
		}
	case tvKeyCode.Enter: {
			Keyhandler.homeKeyEnter($('.imageFocus'));
			break;
		}
	case tvKeyCode.ArrowDown: {
			if(source == "headTiles"){
				$('.imageFocus').removeClass("imageFocus");
				$('#seriesTile').addClass("imageFocus");
               }
               else if(source == "tiles"){
                    if(id == "moviesTile"){
                         $('.imageFocus').removeClass("imageFocus");
                         $('#listUser').addClass("imageFocus");
                    }
                    else if(id == "seriesTile"){
                         $('.imageFocus').removeClass("imageFocus");
                         $('#settingTile').addClass("imageFocus");
                    }
               }
			break;
          }
          case 8:
	case tvKeyCode.Return: {
	   if(!jQuery('#loading').is(':visible')){
          $(".overlay-screen").show();
          showDateAndTime();
//           localStorage.setItem("parentalFromHome","false");
// alert("asdf");
          pushState(view,$(".imageFocus").attr("id"));
              $('.imageFocus').removeClass("imageFocus");
              view = "exitApp";
              $("#genericDiv").html(Util.showPopUp(2,'', "Do you want to Exit the Application ?", "Yes","No"));
              $("#genericDiv").show();
              $("#Btn-0").addClass("imageFocus");
              Main.HideLoading();
              break;
          }
			
	}
	default: {
			break;
		}
	}
}



Keyhandler.deleteKeyEnter = function(currFocus){
	var index = parseInt(currFocus.attr("index"));
     var id = currFocus.attr("id");
     $(".overlay-screen").hide();
     // alert(loginType);
     // alert(id);

//	alert("deletekey");
	if(index == 0){
          var items = "";
          if(deleteBoxType == "m3u"){
                items = JSON.parse(localStorage.getItem('listDataM3U'));

          }else{
                items = JSON.parse(localStorage.getItem('listData'));
          }

          // console.log(items);
          // console.log(deleteBoxPosition);


     //     var profile = JSON.parse(localStorage.getItem('profile'));
//                    alert(JSON.stringify(profile));

            localStorage.removeItem('profile');

//           alert(JSON.stringify(Main));
           Main.profile ="";

//           alert(JSON.stringify(profile));

         for (var i =0; i< items.length; i++) {
             if (i == deleteBoxPosition) {
                 items.splice(i, 1);
             }
         }
         items = JSON.stringify(items);
         if(deleteBoxType == "m3u"){
          localStorage.setItem("listDataM3U", items);
         }else{
          localStorage.setItem("listData", items);
         }
         $("#mainContent").html(Util.listUserPage());
		 $("#mainContent").show();

		 hideDeleteUserPopUp();
	}else{
		hideDeleteUserPopUp();
	}
}

Keyhandler.showCastingDevicesPopUpKeyEnter = function(currFocus){
	var index = parseInt(currFocus.attr("index"));
     var id = currFocus.attr("id");
     $(".overlay-screen").hide();

     $("#genericDiv2").hide();
			$("#genericDiv2").html('');
			try {
				var obj = popState();
			     view = obj.view;
                    
				$("#"+obj.focus).addClass("imageFocus");
			} catch (e) {}

			if (callBack) {
				callBack();
				callBack = '';
			}

// //	alert(view);
// 	if(index == 0){
// 		if(view == "exitApp"){
// 			toast.application.exit();
// 		}else if(view == "acceptTerms"){
// 			if(Player.playData.play_location){
// 				view = "continue";
// 				$("#customMessage").html(Util.showPopUp(2,'', "", "RESUME","START OVER"));
// 				$("#customMessage").show();
// 				$(".popup-p").css("padding","0px");
// 				$(".popup-Message-container").addClass("resume");
// 				$("#Btn-0").addClass("imageFocus");
// 			}
// 			else{
// 				Main.hitBeaconTest(Player.playData.play_location_id,Player.playData.play_location);
// 			}
			
// 		} else if(view == "continue"){
// 			Main.hitBeaconTest(Player.playData.play_location_id,Player.playData.play_location);
// 		} else {
// 				$("#genericDiv").hide();
// 				$("#genericDiv").html('');
// 				try {
// 					var obj = popState();
// 					if(obj.focus.indexOf("leftMenu") == -1)
//                               view = obj.view;
//                          else
//                               view = "leftMenu";
// 					$("#"+obj.focus).addClass("imageFocus");
// 				} catch (e) {}
	
// 				if (callBack) {
// 					callBack();
// 					callBack = '';
// 				}
// 		 }
// 	} else{
// 		if(view == "continue"){
// 			Player.playData.play_location = 0;
// 			Main.hitBeaconTest(Player.playData.play_location_id,0);
// 		} else if(view == "acceptTerms"){
// 			$("#customMessage").hide();
// 			$("#customMessage").html('');
// 			$("#SingleMoviePage").show();
// 			try {
// 				var obj = popState();
// 				view = obj.view;
// 				$("#"+obj.focus).addClass("imageFocus");
// 			} catch (e) {}

// 			if (callBack) {
// 				callBack();
// 				callBack = '';
// 			}
// 		} else{
// 			$("#genericDiv").hide();
// 			$("#genericDiv").html('');
// 			try {
// 				var obj = popState();
// 			     view = obj.view;
                    
// 				$("#"+obj.focus).addClass("imageFocus");
// 			} catch (e) {}

// 			if (callBack) {
// 				callBack();
// 				callBack = '';
// 			}
// 		}
// 	}
}

Keyhandler.exitKeyEnter = function(currFocus){
	var index = parseInt(currFocus.attr("index"));
     var id = currFocus.attr("id");
     $(".overlay-screen").hide();

//	alert(view);
	if(index == 0){
		if(view == "exitApp"){
 
			toast.application.exit();
		}else if(view == "acceptTerms"){
			if(Player.playData.play_location){
				view = "continue";
				$("#customMessage").html(Util.showPopUp(2,'', "", "RESUME","START OVER"));
				$("#customMessage").show();
				$(".popup-p").css("padding","0px");
				$(".popup-Message-container").addClass("resume");
				$("#Btn-0").addClass("imageFocus");
			}
			else{
				Main.hitBeaconTest(Player.playData.play_location_id,Player.playData.play_location);
			}
			
		} else if(view == "continue"){
			Main.hitBeaconTest(Player.playData.play_location_id,Player.playData.play_location);
		} else {
				$("#genericDiv").hide();
				$("#genericDiv").html('');
				try {
					var obj = popState();
					if(obj.focus.indexOf("leftMenu") == -1)
                              view = obj.view;
                         else
                              view = "leftMenu";
					$("#"+obj.focus).addClass("imageFocus");
				} catch (e) {}
	
				if (callBack) {
					callBack();
					callBack = '';
				}
		 }
	} else{
		if(view == "continue"){
			Player.playData.play_location = 0;
			Main.hitBeaconTest(Player.playData.play_location_id,0);
		} else if(view == "acceptTerms"){
			$("#customMessage").hide();
			$("#customMessage").html('');
			$("#SingleMoviePage").show();
			try {
				var obj = popState();
				view = obj.view;
				$("#"+obj.focus).addClass("imageFocus");
			} catch (e) {}

			if (callBack) {
				callBack();
				callBack = '';
			}
		} else{
			$("#genericDiv").hide();
			$("#genericDiv").html('');
			try {
				var obj = popState();
			     view = obj.view;
                    
				$("#"+obj.focus).addClass("imageFocus");
			} catch (e) {}

			if (callBack) {
				callBack();
				callBack = '';
			}
		}
	}
}
Keyhandler.showCastingDevicesPopUpKeyhandler =  function(e){
     var keycode;
     var userAgent = new String(navigator.userAgent);
     if (window.event) {
          keycode = e.keyCode;
     } else if (e.which) {
          keycode = e.which;
     }
     
     var index = parseInt($('.imageFocus').attr("index"));
     var id = $('.imageFocus').attr("id");
     
     
     
     switch (keycode) {
     case tvKeyCode.ArrowLeft: {
               // if(index == 1){
               //      index--;
               //      $(".imageFocus").removeClass("imageFocus");
               //      $("#Btn-"+index).addClass("imageFocus");
               // }
               break;
          }
     case tvKeyCode.ArrowRight: {
               // if(index == 0){
               //      index++;
               //      $(".imageFocus").removeClass("imageFocus");
               //      $("#Btn-"+index).addClass("imageFocus");
               // }
               break;
          }
     case tvKeyCode.ArrowUp: {
     
               break;
          }
     case tvKeyCode.Enter:{
          
          Keyhandler.showCastingDevicesPopUpKeyEnter($(".imageFocus"));
          break;
     }
     case tvKeyCode.Return:{
            if(!jQuery('#loading').is(':visible')){
                   $("#genericDiv2").hide();
                   $("#genericDiv2").html('');
                   $(".overlay-screen").hide();
                   showDateAndTime();


                   try {
                    var obj = popState();
                    view = obj.view;
                    previousFocus = obj.focus;
               } catch (e) {}

                   if (callBack) {
                        callBack();
                        callBack = '';
                   }

                   break;
             }
          }
     case tvKeyCode.ArrowDown: {
     
               break;
          }
     
     default: {
               break;
          }
     }
     
     }


Keyhandler.exitKeyhandler = function(e){

     var keycode;
     var userAgent = new String(navigator.userAgent);
     if (window.event) {
          keycode = e.keyCode;
     } else if (e.which) {
          keycode = e.which;
     }
     
     var index = parseInt($('.imageFocus').attr("index"));
     var id = $('.imageFocus').attr("id");
     
     
     
     switch (keycode) {
     case tvKeyCode.ArrowLeft: {
               if(index == 1){
                    index--;
                    $(".imageFocus").removeClass("imageFocus");
                    $("#Btn-"+index).addClass("imageFocus");
               }
               break;
          }
     case tvKeyCode.ArrowRight: {
               if(index == 0){
                    index++;
                    $(".imageFocus").removeClass("imageFocus");
                    $("#Btn-"+index).addClass("imageFocus");
               }
               break;
          }
     case tvKeyCode.ArrowUp: {
     
               break;
          }
     case tvKeyCode.Enter:{
          
          Keyhandler.exitKeyEnter($(".imageFocus"));
          break;
     }
     case tvKeyCode.Return:{
            if(!jQuery('#loading').is(':visible')){
                   $("#genericDiv").hide();
                   $("#genericDiv").html('');
                   $(".overlay-screen").hide();
                   showDateAndTime();


                   try {
                        var obj = popState();
                        if(obj.focus.indexOf("leftMenu") == -1)
                             view = obj.view;
                        else
                             view = "leftMenu";


                        $("#"+obj.focus).addClass("imageFocus");
                   } catch (e) {}

                   if (callBack) {
                        callBack();
                        callBack = '';
                   }

                   break;
             }
          }
     case tvKeyCode.ArrowDown: {
     
               break;
          }
     
     default: {
               break;
          }
     }
     
     }

     Keyhandler.parentalFromHomeKeyhandler = function(e){

          var keycode;
          var userAgent = new String(navigator.userAgent);
          if (window.event) {
               keycode = e.keyCode;
          } else if (e.which) {
               keycode = e.which;
          }
          
          var index = parseInt($('.imageFocus').attr("index"));
          var id = $('.imageFocus').attr("id");
          
          
          
          switch (keycode) {
          case tvKeyCode.ArrowLeft: {
                    if(index == 1){
                         index--;
                         $(".imageFocus").removeClass("imageFocus");
                         $("#Btn-"+index).addClass("imageFocus");
                    }
                    break;
               }
          case tvKeyCode.ArrowRight: {
                    if(index == 0){
                         index++;
                         $(".imageFocus").removeClass("imageFocus");
                         $("#Btn-"+index).addClass("imageFocus");
                    }
                    break;
               }
          case tvKeyCode.ArrowUp: {
          
                    break;
               }
          case tvKeyCode.Enter:{
               
               Keyhandler.parentalFromHomeKeyEnter($(".imageFocus"));
               break;
          }
          case tvKeyCode.Return:{ 
                 if(!jQuery('#loading').is(':visible')){
                        $("#genericDiv").hide();
                        $("#genericDiv").html('');
                        $(".overlay-screen").hide();
                        showDateAndTime();
                        localStorage.setItem("parentalFromHome","true");
                        try {
                             var obj = popState(); 
                             view = "homePage";
                        } catch (e) {
                         //  console.log(e)
                        }
     
                        if (callBack) {
                             callBack();
                             callBack = '';
                        }
     
                        break;
                  }
               }
          case tvKeyCode.ArrowDown: {
          
                    break;
               }
          
          default: {
                    break;
               }
          }
          
          }

          Keyhandler.parentalFromHomeKeyEnter = function(currFocus){
               var index = parseInt(currFocus.attr("index"));
               var id = currFocus.attr("id");
               if(index == 0){
                    try {
                         var obj = popState();
                         view = obj.view;
                         previousFocus = obj.focus;
                    } catch (e) {}
                    Main.processNext();
                    $("#genericDiv").fadeOut();
                    $("#genericDiv").html("");
                    $(".overlay-screen").hide();
                    view = "homePage";
                     localStorage.setItem("parentalFromHome","true");

               }else if(index == 1){
                    // savePin();
                    if($("#pincode-input1").length){
                         // alert($("#pincode-input1").val().length!=4);
                         if($("#pincode-input1").val().length!=4){
                              $("#parental_msg").html("Please Enter Your 4 Digit Pin.");
                              $("#parental_msg").slideDown();
                              setTimeout( function(){ 
                                   $("#parental_msg").slideUp();
                                 }  , 2000 );
                         }else if($("#pincode-input2").val().length!=4){
                              $("#parental_msg").html("Please Confirm Your 4 Digit Pin.");
                              $("#parental_msg").slideDown();
                              setTimeout( function(){ 
                                   $("#parental_msg").slideUp();
                                 }  , 2000 );
                         }else if($("#pincode-input1").val() && $("#pincode-input1").val() == $("#pincode-input2").val()){
                              parentPin = $("#pincode-input1").val();
                              localStorage.setItem("parentPin",parentPin);
     //                         alert(parentPin);
                              try {
                                   var obj = popState();
                                   view = obj.view;
                                   previousFocus = obj.focus;
                              } catch (e) {}
     
                              Main.processNext();
                              $("#genericDiv").fadeOut();
                              $("#genericDiv").html("");
                              $(".overlay-screen").hide();
                              view = "homePage";
                              localStorage.setItem("parentalFromHome","true");
                              Main.showFailure("Parental Pin Saved Successfully.");

                              // $("#turnOffPin").css("visibility",'visible');
                         }else{
                              
                              $("#parental_msg").html("The specified password do not match.");
                              $("#parental_msg").slideDown();
                              setTimeout( function(){ 
                                   $("#parental_msg").slideUp();
                                 }  , 2000 );
                         }

                         
     
                    }
               } 
          }


     Keyhandler.deleteUserKeyhandler = function(e){

          var keycode;
          var userAgent = new String(navigator.userAgent);
          if (window.event) {
               keycode = e.keyCode;
          } else if (e.which) {
               keycode = e.which;
          }

          var index = parseInt($('.imageFocus').attr("index"));
          var id = $('.imageFocus').attr("id");



          switch (keycode) {
          case tvKeyCode.ArrowLeft: {
                    if(index == 1){
                         index--;
                         $(".imageFocus").removeClass("imageFocus");
                         $("#Btn-"+index).addClass("imageFocus");
                    }
                    break;
               }
          case tvKeyCode.ArrowRight: {
                    if(index == 0){
                         index++;
                         $(".imageFocus").removeClass("imageFocus");
                         $("#Btn-"+index).addClass("imageFocus");
                    }
                    break;
               }
          case tvKeyCode.ArrowUp: {

                    break;
               }
          case tvKeyCode.Enter:{
               Keyhandler.deleteKeyEnter($(".imageFocus"));
               break;
          }
          case tvKeyCode.Return:{
                    if(!jQuery('#loading').is(':visible')){
                        $("#genericDiv").hide();
                        $("#genericDiv").html('');
                        $(".overlay-screen").hide();

                        showDateAndTime();

                        try {
                             var obj = popState();
                             if(obj.focus.indexOf("leftMenu") == -1)
                                  view = obj.view;
                             else
                                  view = "leftMenu";


                             $("#"+obj.focus).addClass("imageFocus");
                        } catch (e) {}

                        if (callBack) {
                             callBack();
                             callBack = '';
                        }

                        break;
                    }
               }
          case tvKeyCode.ArrowDown: {

                    break;
               }

          default: {
                    break;
               }
          }

          }



Keyhandler.multiScreenKeyhandler = function (e){
     var keycode;
	// var userAgent = new String(navigator.userAgent);
	if (window.event) {
		keycode = e.keyCode;
	} else if (e.which) {
		keycode = e.which;
	}

	// var index = parseInt($('.imageFocus').attr("index"));
	// var id = $('.imageFocus').attr("id");

	switch (keycode) {
	case tvKeyCode.ArrowLeft: {
                
		}
	case tvKeyCode.ArrowRight: {
                
		}
	case tvKeyCode.ArrowUp: {

			break;
		}
	case 8:
	case tvKeyCode.Return:{
	   if(!jQuery('#loading').is(':visible')){
          $(".overlay-screen").hide();
          showDateAndTime();
          // alert("backpressed");

          try {
               var obj = popState();
               view = obj.view;
               previousFocus = obj.focus;
          } catch (e) {}

          Main.processNext();
          $("#profile").html('').hide();

          if(reconnectInt !== null || reconnectInt !== undefined){
           clearInterval(reconnectInt);
       }
       counter = 0;
      //  var PlayerDIvSelector = $('#player-wrapper');
      //  PlayerDIvSelector.html('');
      //  PlayerDIvSelector.attr('class', '');

      try{
            Player.stopMultiSreenPlayers(); 
           var PlayerDIvSelector1 = $('#player-wrapper1');
           PlayerDIvSelector1.removeClass("webchimeras");
           PlayerDIvSelector1.html('');

           var PlayerDIvSelector2 = $('#player-wrapper2');
           PlayerDIvSelector2.removeClass("webchimeras");
           PlayerDIvSelector2.html('');

           var PlayerDIvSelector3 = $('#player-wrapper3');
           PlayerDIvSelector3.removeClass("webchimeras");
           PlayerDIvSelector3.html('');

           var PlayerDIvSelecto4 = $('#player-wrapper4');
           PlayerDIvSelector4.removeClass("webchimeras");
           PlayerDIvSelector4.html('');
           
        }catch(err){
            var PlayerDIvSelector1 = $('#player-wrapper1');
           PlayerDIvSelector1.removeClass("webchimeras");
           PlayerDIvSelector1.html('');

           var PlayerDIvSelector2 = $('#player-wrapper2');
           PlayerDIvSelector2.removeClass("webchimeras");
           PlayerDIvSelector2.html('');

           var PlayerDIvSelector3 = $('#player-wrapper3');
           PlayerDIvSelector3.removeClass("webchimeras");
           PlayerDIvSelector3.html('');

           var PlayerDIvSelector4 = $('#player-wrapper4');
           PlayerDIvSelector4.removeClass("webchimeras");
           PlayerDIvSelector4.html('');
        }
       


       break;

          //     try {
          //          var obj = popState();
          //          view = obj.view;
          //          previousFocus = obj.focus;
          //          //previousFocus = '';
          //     } catch (e) {}

          //     Main.processNext();
          //     $("#profile").html('').hide();
          //     break;
       }
     }
	case tvKeyCode.Enter: {

          // Keyhandler.accountKeyEnter($('.imageFocus'));
               

			break;
		}
	case tvKeyCode.ArrowDown: {

			break;
		}

	default: {
			break;
		}
	}
}          

Keyhandler.accountKeyhandler =  function (e) {
	var keycode;
	var userAgent = new String(navigator.userAgent);
	if (window.event) {
		keycode = e.keyCode;
	} else if (e.which) {
		keycode = e.which;
	}

	var index = parseInt($('.imageFocus').attr("index"));
	var id = $('.imageFocus').attr("id");

	switch (keycode) {
	case tvKeyCode.ArrowLeft: {
               if(id == "accountLogout"){
                    $('.imageFocus').removeClass("imageFocus");
                    $('#accountBack').addClass("imageFocus");
               }
               else if(id == "playerControl"){
                    $('.imageFocus').removeClass("imageFocus");
                    $('#parentControlBox').addClass("imageFocus");
               }
			break;
		}
	case tvKeyCode.ArrowRight: {
               if(id == "accountBack"){
                    $('.imageFocus').removeClass("imageFocus");
                    $('#accountLogout').addClass("imageFocus");
               }
               else if(id == "parentControlBox"){
                    $('.imageFocus').removeClass("imageFocus");
                    $('#playerControl').addClass("imageFocus");
               }
			break;
		}
	case tvKeyCode.ArrowUp: {

			break;
		}
	case 8:
	case tvKeyCode.Return:{
	   if(!jQuery('#loading').is(':visible')){
          $(".overlay-screen").hide();
          showDateAndTime();

              try {
                   var obj = popState();
                   view = obj.view;
                   previousFocus = obj.focus;
                   //previousFocus = '';
              } catch (e) {}

              Main.processNext();
              $("#profile").html('').hide();
              break;
       }
     }
	case tvKeyCode.Enter: {
          Keyhandler.accountKeyEnter($('.imageFocus'));
               

			break;
		}
	case tvKeyCode.ArrowDown: {

			break;
		}

	default: {
			break;
		}
	}
}
var selectSetting = '';
Keyhandler.accountKeyEnter = function(currFocus){
     var id = currFocus.attr("id");
     // alert(id);

     if(id == "accountBack"){
          try {
               var obj = popState();
               view = obj.view;
               previousFocus = obj.focus;
               //previousFocus = '';
          } catch (e) {}
          
          Main.processNext();
         $("#profile").html('').hide();
     }
     else if(id == "accountLogout"){
          Main.profile = '';
          localStorage.removeItem("profile");
          location.reload();
     }
     else if(id == "playerControl"){
          selectSetting = "playerControl";
          pushState(view,$(".imageFocus").attr("id"));
		$('.imageFocus').removeClass("imageFocus");
          view = "settingSection";
          Main.processNext();
     }else if(id == "parentControlBox"){
          selectSetting = "parentControlBox";
          pushState(view,$(".imageFocus").attr("id"));
		$('.imageFocus').removeClass("imageFocus");
          view = "settingSection";
          Main.processNext();
          if(parentPin!=''){
                       $("#turnOffPin").css("visibility",'visible');
              }else{

                       $("#turnOffPin").css("visibility",'hidden');
              }
     }else if(id == "timeFormatSettings"){
          selectSetting = "timeFormatSettings";
          pushState(view,$(".imageFocus").attr("id"));
		$('.imageFocus').removeClass("imageFocus");
          view = "settingSection";
          Main.processNext();
     }
}

Keyhandler.settingSectionKeyhandler =  function (e) {
	var keycode;
	var userAgent = new String(navigator.userAgent);
	if (window.event) {
		keycode = e.keyCode;
	} else if (e.which) {
		keycode = e.which;
	}
     if(selectSetting == "playerControl")
          e.preventDefault();
	var index = parseInt($('.imageFocus').attr("index"));
	var id = $('.imageFocus').attr("id");
     
     var source = $('.imageFocus').attr("source");
     
    

	switch (keycode) {
	case tvKeyCode.ArrowLeft: {
//	alert("Aa");
               if(source == "settingBtn"){
                    if(id == "accountClose"){
                    $('.imageFocus').removeClass("imageFocus");
                    $('#accountSave').addClass("imageFocus");
                    }
               }
               if(source == "parentalBtn"){
                   if(id == "accountClose"){
                   $('.imageFocus').removeClass("imageFocus");
                     if(parentPin!=''){
                       $('#turnOffPin').addClass("imageFocus");
                     }else{
                       $('#addNewPin').addClass("imageFocus");
                     }
                   }

                   if(id == "turnOffPin"){
                      $('.imageFocus').removeClass("imageFocus");
                      $('#addNewPin').addClass("imageFocus");
                   }
               }
			break;
		}
	case tvKeyCode.ArrowRight: {
               if(source == "settingBtn"){
                if(id == "accountSave"){
                    $('.imageFocus').removeClass("imageFocus");
                    $('#accountClose').addClass("imageFocus");
                }
               }
               if(source == "parentalBtn"){
                   if(id == "addNewPin"){
                       $('.imageFocus').removeClass("imageFocus");
                       if(parentPin!=''){
                          $('#turnOffPin').addClass("imageFocus");
                       }else{
                          $('#accountClose').addClass("imageFocus");
                       }
                   }else if(id == "turnOffPin"){
                       $('.imageFocus').removeClass("imageFocus");
                       $('#accountClose').addClass("imageFocus");
                   }
                }
			break;
		}
	case tvKeyCode.ArrowUp: {
               if(selectSetting == "playerControl"){
                   
                    if(source == "settingBtn"){
                         $('.imageFocus').removeClass("imageFocus");
                         $('#containerBtn-1').addClass("imageFocus");
                    }
                   else if(source == "inputButtons"){
                         if(index == 1){
                              $('.imageFocus').removeClass("imageFocus");
                              $('#containerBtn-0').addClass("imageFocus");
                         }
                   }
               }
               else if(selectSetting == "parentControlBox"){
                    if(source == "settingBtn"){
                         $('.imageFocus').removeClass("imageFocus");
                         $('#cpin').addClass("imageFocus");
                         $('#'+id).blur();

                    }
                    else if(source == "pinSetting"){
                         $('.imageFocus').removeClass("imageFocus");
                         $('#pin').addClass("imageFocus");
                         $('#'+id).blur();
                    }
               }
			break;
		}
	
	case tvKeyCode.Return:{
	    if(!jQuery('#loading').is(':visible')){
          $(".overlay-screen").hide();
          showDateAndTime();

          try {
               var obj = popState();
               view = obj.view;
               previousFocus = obj.focus;
          } catch (e) {}

          Main.processNext();
          break;
        }
     }
	case tvKeyCode.Enter: {

			
               Keyhandler.settingSectionKeyEnter($(".imageFocus"));
			break;
		}
	case tvKeyCode.ArrowDown: {
               if(selectSetting == "playerControl"){
                    if(source == "inputButtons"){
                         if(index == 0){
                              $('.imageFocus').removeClass("imageFocus");
                              $('#containerBtn-1').addClass("imageFocus");
                         }
                         else if(index == 1){
                              $('.imageFocus').removeClass("imageFocus");
                              $('#accountSave').addClass("imageFocus");
                         }
                   }
                   
               }
               else if(selectSetting == "parentControlBox"){
                    if(source == "pinSetting"){
                         if(id == "pin"){
                              $('.imageFocus').removeClass("imageFocus");
                              $('#cpin').addClass("imageFocus");
                              $('#'+id).blur();
                         }
                         else {
                              $('.imageFocus').removeClass("imageFocus");
                              $('#accountSave').addClass("imageFocus");
                              $('#'+id).blur();
                         }
                         
                    }
               }
			break;
		}

	default: {
			break;
		}
	}
}

Keyhandler.parentalPinSettingsKeyhandler =  function (e) {
	var keycode;
	var userAgent = new String(navigator.userAgent);
	if (window.event) {
		keycode = e.keyCode;
	} else if (e.which) {
		keycode = e.which;
	}
     if(selectSetting == "playerControl")
          e.preventDefault();
	var index = parseInt($('.imageFocus').attr("index"));
	var id = $('.imageFocus').attr("id");

     var source = $('.imageFocus').attr("source");



	switch (keycode) {
	case tvKeyCode.ArrowLeft: {

                   if(source == "sourceUpdatePin" || source =="sourceUpdatePinField"){
                        if(id == "accountCloseParental"){
                            $('.imageFocus').removeClass("imageFocus");
                            $('#pinUpdate').addClass("imageFocus");
                        }
                   }else if(source == "sourceAddPin" || source =="sourceAddPinField"){
                       if(id == "accountCloseParental"){
                           $('.imageFocus').removeClass("imageFocus");
                           $('#accountSave').addClass("imageFocus");
                       }
                   }

			break;
		}
	case tvKeyCode.ArrowRight: {
            if(source == "sourceUpdatePin" || source =="sourceUpdatePinField"){
                if(id == "pinUpdate"){
                    $('.imageFocus').removeClass("imageFocus");
                    $('#accountCloseParental').addClass("imageFocus");
                }
            }else if(source == "sourceAddPin" || source =="sourceAddPinField"){
                if(id == "accountSave"){
                    $('.imageFocus').removeClass("imageFocus");
                    $('#accountCloseParental').addClass("imageFocus");
                }
            }

			break;
		}
	case tvKeyCode.ArrowUp: {

            if(source == "sourceUpdatePin" || source =="sourceUpdatePinField"){
                if(id == "pinUpdate" || id == "accountCloseParental"){
                 $('.imageFocus').removeClass("imageFocus");
                 $('#cpin').addClass("imageFocus");
                 $('#'+id).blur();
                } else if(id == "cpin"){
                    $('.imageFocus').removeClass("imageFocus");
                    $('#pin').addClass("imageFocus");
                    $('#'+id).blur();
                }else if(id == "pin"){
                     $('.imageFocus').removeClass("imageFocus");
                     $('#opin').addClass("imageFocus");
                     $('#'+id).blur();
                 }
            }else if(source == "sourceAddPin" || source =="sourceAddPinField"){
                if(id == "accountSave" || id == "accountCloseParental"){
                 $('.imageFocus').removeClass("imageFocus");
                 $('#cpin').addClass("imageFocus");
                 $('#'+id).blur();
                } else if(id == "cpin"){
                    $('.imageFocus').removeClass("imageFocus");
                    $('#pin').addClass("imageFocus");
                    $('#'+id).blur();
                }

            }


			break;
		}

	case tvKeyCode.Return:{
	    if(!jQuery('#loading').is(':visible')){
          $(".overlay-screen").hide();
          showDateAndTime();

          try {
               var obj = popState();
               view = obj.view;
               previousFocus = obj.focus;
          } catch (e) {}

          Main.processNext();
          break;
        }
     }
	case tvKeyCode.Enter: {
               Keyhandler.settingSectionKeyEnter($(".imageFocus"));
			break;
		}
	case tvKeyCode.ArrowDown: {
            if(source == "sourceUpdatePin" || source =="sourceUpdatePinField"){
                   if(id == "opin"){
                      $('.imageFocus').removeClass("imageFocus");
                      $('#pin').addClass("imageFocus");
                      $('#'+id).blur();
                   } else if(id == "pin"){
                       $('.imageFocus').removeClass("imageFocus");
                       $('#cpin').addClass("imageFocus");
                       $('#'+id).blur();
                   }else if(id == "cpin"){
                         $('.imageFocus').removeClass("imageFocus");
                         $('#pinUpdate').addClass("imageFocus");
                    }
            }else if(source == "sourceAddPin" || source =="sourceAddPinField"){
                   if(id == "pin"){
                       $('.imageFocus').removeClass("imageFocus");
                       $('#cpin').addClass("imageFocus");
                       $('#'+id).blur();
                   }else if(id == "cpin"){
                         $('.imageFocus').removeClass("imageFocus");
                         $('#accountSave').addClass("imageFocus");
                   }

            }

			break;
		}

	default: {
			break;
		}
	}
}

Keyhandler.parentalPinTurnOffKeyhandler =  function (e) {
	var keycode;
    	var userAgent = new String(navigator.userAgent);
    	if (window.event) {
    		keycode = e.keyCode;
    	} else if (e.which) {
    		keycode = e.which;
    	}
         if(selectSetting == "playerControl")
              e.preventDefault();
    	var index = parseInt($('.imageFocus').attr("index"));
    	var id = $('.imageFocus').attr("id");

         var source = $('.imageFocus').attr("source");



    	switch (keycode) {
    	case tvKeyCode.ArrowLeft: {

                       if(source == "sourceParentControlTurnOff" || source =="sourceParentControlTurnOffField"){
                            if(id == "accountCloseParental"){
                                $('.imageFocus').removeClass("imageFocus");
                                $('#turnOffPinSave').addClass("imageFocus");
                            }
                       }

    			break;
    		}
    	case tvKeyCode.ArrowRight: {
                if(source == "sourceParentControlTurnOff" || source =="sourceParentControlTurnOffField"){
                    if(id == "turnOffPinSave"){
                        $('.imageFocus').removeClass("imageFocus");
                        $('#accountCloseParental').addClass("imageFocus");
                    }
                }

    			break;
    		}
    	case tvKeyCode.ArrowUp: {

                if(source == "sourceParentControlTurnOff" || source =="sourceParentControlTurnOffField"){
                    if(id == "turnOffPinSave" || id == "accountCloseParental"){
                     $('.imageFocus').removeClass("imageFocus");
                     $('#opin').addClass("imageFocus");
                     $('#'+id).blur();
                    }
                }


    			break;
    		}

    	case tvKeyCode.Return:{
    	    if(!jQuery('#loading').is(':visible')){
          $(".overlay-screen").hide();
          showDateAndTime();

              try {
                   var obj = popState();
                   view = obj.view;
                   previousFocus = obj.focus;
              } catch (e) {}

              Main.processNext();
              break;
            }
         }
    	case tvKeyCode.Enter: {
                   Keyhandler.settingSectionKeyEnter($(".imageFocus"));
    			break;
    		}
    	case tvKeyCode.ArrowDown: {
                if(source == "sourceParentControlTurnOff" || source =="sourceParentControlTurnOffField"){
                       if(id == "opin"){
                             $('.imageFocus').removeClass("imageFocus");
                             $('#turnOffPinSave').addClass("imageFocus");
                        }
                }

    			break;
    		}

    	default: {
    			break;
    		}
    	}
}

Keyhandler.catchupPlayerKeyHandler =  function (e) {
	var keycode;
    	var userAgent = new String(navigator.userAgent);
    	if (window.event) {
    		keycode = e.keyCode;
    	} else if (e.which) {
    		keycode = e.which;
    	}
         if(selectSetting == "playerControl")
              e.preventDefault();
    	var index = parseInt($('.imageFocus').attr("index"));
    	var id = $('.imageFocus').attr("id");

         var source = $('.imageFocus').attr("source");



    	switch (keycode) {
    	case tvKeyCode.ArrowLeft: {


    			break;
    		}
    	case tvKeyCode.ArrowRight: {


    			break;
    		}
    	case tvKeyCode.ArrowUp: {

    			break;
    		}

              
          case 27:{
               if(!jQuery('#loading').is(':visible')){
                    $(".overlay-screen").hide();
                    showDateAndTime();
     
                    
                    if($("div").hasClass("wcp-minimize")){
                         // alert("class found");
                         $('.wcp-minimize').addClass('wcp-maximize').removeClass('wcp-minimize');
     
                    }
               }
               break;
          }
          
    	case tvKeyCode.Return:{
    	   if(!jQuery('#loading').is(':visible')){
//           $(".overlay-screen").hide();

//               try {
//                    var obj = popState();
//                    view = obj.view;
//                    previousFocus = obj.focus;
//               } catch (e) {}

//               Main.processNext();
// // 	         console.log("backpressed");

// // 	          backPressed = true;
// //              if(!playerReleased && playerPrepared){
// //                  console.log("backpress released");
//                   $("#HTML5Div").html('').hide();
//                   $("#catchupPrograms").show();
// //              }else{
// //                  $("#HTML5Div").hide();
// //              }
//               break;





              $(".overlay-screen").hide();
              $("#catchupContainer").css("opacity","1");
              showDateAndTime();

    
    
                  try {
                       var obj = popState();
                       view = obj.view;
                       previousFocus = obj.focus;
                  } catch (e) {}
    
                  Main.processNext();
    
    
                  if(reconnectInt !== null || reconnectInt !== undefined){
                   clearInterval(reconnectInt);
               }
               counter = 0;
              //  var PlayerDIvSelector = $('#player-wrapper');
              //  PlayerDIvSelector.html('');
              //  PlayerDIvSelector.attr('class', '');
    
              try{
                    Player.stopPlayer(); 
                   var PlayerDIvSelector = $('#player-wrapper');
                   PlayerDIvSelector.removeClass("webchimeras");
                   PlayerDIvSelector.html('');
                   $("#HTML5Div").html('').hide();
               }catch(err){
                    var PlayerDIvSelector = $('#player-wrapper');
                   PlayerDIvSelector.removeClass("webchimeras");
                   PlayerDIvSelector.html('');
                   $("#HTML5Div").html('').hide();
               }

               break;









           }
         }
    	case tvKeyCode.Enter: {
//    	        if(flowPlayerH!=null && flowPlayerH!== undefined){
//    	             flowPlayerH.fullscreen();
//    	        }
               //  fullScreenPlayer();
    			break;
    		}
    	case tvKeyCode.ArrowDown: {


    			break;
    		}

    	default: {
    			break;
    		}
    	}
}


Keyhandler.seriesPlayerKeyHandler =  function (e) {
	var keycode;
    	var userAgent = new String(navigator.userAgent);
    	if (window.event) {
    		keycode = e.keyCode;
    	} else if (e.which) {
    		keycode = e.which;
    	}
         if(selectSetting == "playerControl")
              e.preventDefault();
    	var index = parseInt($('.imageFocus').attr("index"));
    	var id = $('.imageFocus').attr("id");

         var source = $('.imageFocus').attr("source");



    	switch (keycode) {
    	case tvKeyCode.ArrowLeft: {


    			break;
    		}
    	case tvKeyCode.ArrowRight: {


    			break;
    		}
    	case tvKeyCode.ArrowUp: {

    			break;
              }
              
              
          case 27:{
               if(!jQuery('#loading').is(':visible')){
                    $(".overlay-screen").hide();
                    showDateAndTime();
     
                    
                    if($("div").hasClass("wcp-minimize")){
                         // alert("class found");
                         $('.wcp-minimize').addClass('wcp-maximize').removeClass('wcp-minimize');
     
                    }
               }
               break;
          }

    	case tvKeyCode.Return:{
    	   if(!jQuery('#loading').is(':visible')){
            
          $(".overlay-screen").hide();
          $("#viewinfo").css("opacity","1");
          $("#moviesPageBackground").css("opacity","1");
          showDateAndTime();



              try {
                   var obj = popState();
                   view = obj.view;
                   previousFocus = obj.focus;
              } catch (e) {}

              Main.processNext();


              if(reconnectInt !== null || reconnectInt !== undefined){
               clearInterval(reconnectInt);
           }
           counter = 0;
          //  var PlayerDIvSelector = $('#player-wrapper');
          //  PlayerDIvSelector.html('');
          //  PlayerDIvSelector.attr('class', '');

          try{
                Player.stopPlayer(); 
               var PlayerDIvSelector = $('#player-wrapper');
               PlayerDIvSelector.removeClass("webchimeras");
               PlayerDIvSelector.html('');
               $("#HTML5Div").html('').hide();
           }catch(err){
                var PlayerDIvSelector = $('#player-wrapper');
               PlayerDIvSelector.removeClass("webchimeras");
               PlayerDIvSelector.html('');
               $("#HTML5Div").html('').hide();
           }
 
           }
         }
    	case tvKeyCode.Enter: {
    	     //    if(flowPlayerH!=null && flowPlayerH!== undefined){
    	     //         flowPlayerH.fullscreen();
    	     //    }
//                fullScreenPlayer();
    			break;
    		}
    	case tvKeyCode.ArrowDown: {


    			break;
    		}

    	default: {
    			break;
    		}
    	}
}

function validateForm() {
  var isValid = true;
  $('.form-control').each(function() {
    if ( $(this).val() === '' )
        isValid = false;
  });
  return isValid;
}

function savePin(){


     if($("#pin").val().length!=4){
          Main.showFailure("Please Enter Your 4 Digit Pin."); 
     }else if($("#cpin").val().length!=4){
          Main.showFailure("Please Confirm Your 4 Digit Pin."); 
     }else if($("#pin").val() && $("#pin").val() == $("#cpin").val()){
          parentPin = $("#pin").val();
          localStorage.setItem("parentPin",parentPin);
//                         alert(parentPin);
          try {
               var obj = popState();
               view = obj.view;
               previousFocus = obj.focus;
          } catch (e) {}

          Main.processNext();

          $("#addNewPin").html("Update Pin");
          $("#turnOffPin").css("visibility",'visible');

          $(".pinOnOff").text("Enabled");
          $(".pinOnOff").addClass("pinEnabled");
          $(".pinOnOff").removeClass("pinDisabled");
     }else{
          Main.showFailure("The specified password do not match."); 
     }



     // if($("#pin").val() && $("#pin").val() == $("#cpin").val()){
        

               
     // } else{
     //      Main.showFailure("Please provide valid Pin.");
     // }
}


//var containerSelected = '.ts';
Keyhandler.settingSectionKeyEnter = function(currFocus){

     var index = parseInt($('.imageFocus').attr("index"));
	var id = $('.imageFocus').attr("id");
     
     var source = $('.imageFocus').attr("source");

//     alert(source);
//     alert(id);

     if(source == "inputButtons"){
          //if(index == 1){
               $("#"+id).find("input").prop("checked",true);
               containerSelected = $("#"+id).text().trim();
        //  }
     }
     else if(source =="sourceAddPinField" || source =="sourceUpdatePinField" || source =="sourceParentControlTurnOffField"){
          $("#"+id).focus();
     }
     else if(source == "settingBtn" || source == "parentalBtn" || source =="sourceAddPin" || source =="sourceUpdatePin" || source =="sourceParentControlTurnOff"){
          if(id == "accountSave"){

               if($("#pin").length){
                    savePin();
                     

               }
               else{
                     var radioValue = $("input[name='radio']:checked").val();

                    selectedContainer = radioValue;
                    localStorage.setItem("selectedContainer",selectedContainer);
                    ((selectedContainer == ".ts" ) ? $("#selectedContainerID").text("MPEGTS (.ts)"):"") +( (selectedContainer == ".m3u8" ) ? $("#selectedContainerID").text("HLS (.m3u8)"):"") 

                    try {
                         var obj = popState();
                         view = obj.view;
                         previousFocus = obj.focus;
                    } catch (e) {}
     
                    Main.processNext();
               }

               
          }else if(id =="timeFormatSave"){
               var radioValue = $("input[name='radio']:checked").val();

               selectedTimeFormat = radioValue;
               localStorage.setItem("selectedTimeFormat",selectedTimeFormat);
               
               ((selectedTimeFormat == "24" ) ? $("#selectedTimeFormatID").text("24 Hour"):"") +( (selectedTimeFormat == "12" ) ? $("#selectedTimeFormatID").text("12 Hour"):"") 
               showDateAndTime();
               try {
                    var obj = popState();
                    view = obj.view;
                    previousFocus = obj.focus;
               } catch (e) {}

               Main.processNext();

          }else if(id=="pinUpdate"){
                 if(validateForm()){
                     if($("#opin").val() == parentPin){
                        savePin();

                     }else{
                           Main.showFailure("Invalid Old Pin!");
                     }

                 }else{
                      Main.showFailure("All the fields are required!");
                 }
          }else if(id == "addNewPin"){
            pushState(view,$(".imageFocus").attr("id"));
			$('.imageFocus').removeClass("imageFocus");
			view = "parentalPinSettings";
			Main.processNext();


          }else if(id == "turnOffPin"){
             if(parentPin){
                pushState(view,$(".imageFocus").attr("id"));
                $('.imageFocus').removeClass("imageFocus");
                view = "parentalTurnOff";
                Main.processNext();
             }else{
                 Main.showFailure("Please add any pin first.");
             }

          }else if(id == "turnOffPinSave"){
            if(validateForm()){
                 if($("#opin").val() == parentPin){
                    parentPin ='';
                    localStorage.setItem("parentPin",parentPin);
                    $(".pinOnOff").text("Disabled");
                    $(".pinOnOff").addClass("pinDisabled");
                    $(".pinOnOff").removeClass("pinEnabled");
                    try {
                        var obj = popState();
                            view = obj.view;
                            previousFocus = obj.focus;
                       } catch (e) {}

                       Main.processNext();
                       $("#addNewPin").html("Add New Pin");
                       $("#turnOffPin").css("visibility",'hidden');
                       $("#addNewPin").addClass("imageFocus");

                      

                 }else{
                       Main.showFailure("Invalid Old Pin!");
                 }

             }else{
                  Main.showFailure("Please enter your old parental pin!");
             }

         }else {
               try {
				var obj = popState();
                    view = obj.view;
                    previousFocus = obj.focus;
               } catch (e) {}

               Main.processNext();
          }
     }
}
Keyhandler.enterPinKeyHandler = function(e){
     var keycode;
	var userAgent = new String(navigator.userAgent);
	if (window.event) {
		keycode = e.keyCode;
	} else if (e.which) {
		keycode = e.which;
	}
     $(".error").html('');
	var index = parseInt($('.imageFocus').attr("index"));
	var id = $('.imageFocus').attr("id");
	switch (keycode) {
	case tvKeyCode.ArrowLeft: {

			break;
		}
	case tvKeyCode.ArrowRight: {

			break;
		}
	case tvKeyCode.ArrowUp: {
               // if(id == "confirmPin"){
               //      $('.imageFocus').removeClass("imageFocus");
               //      $("#pin").addClass('imageFocus');
               // }
			break;
		}
	
	case tvKeyCode.Return:{
	    if(!jQuery('#loading').is(':visible')){
          $("#customMessage").hide();
               $("#customMessage").html('');
               $(".overlay-screen").hide();
               showDateAndTime();

			try {
				var obj = popState();
                    view = obj.view;
                    $("#"+obj.focus).addClass('imageFocus');

			} catch (e) {}

			if (callBack) {
				callBack();
				callBack = '';
          }
          
          break;
        }
     }
	case tvKeyCode.Enter: {
               Keyhandler.enterPinKeyEnter($(".imageFocus"));
			break;
		}
	case tvKeyCode.ArrowDown: {
               // if(id == "pin"){
               //      $('.imageFocus').removeClass("imageFocus");
               //      $("#pin").blur();
               //      $("#confirmPin").addClass('imageFocus');
               // }
			break;
		}

	default: {
			break;
		}
	}
}



Keyhandler.enterPinMultiScreenCategories = function(e){
     var keycode;
	var userAgent = new String(navigator.userAgent);
	if (window.event) {
		keycode = e.keyCode;
	} else if (e.which) {
		keycode = e.which;
	}
     $(".error").html('');
	var index = parseInt($('.imageFocus').attr("index"));
	var id = $('.imageFocus').attr("id");
	switch (keycode) {
	case tvKeyCode.ArrowLeft: {

			break;
		}
	case tvKeyCode.ArrowRight: {

			break;
		}
	case tvKeyCode.ArrowUp: {
               // if(id == "confirmPin"){
               //      $('.imageFocus').removeClass("imageFocus");
               //      $("#pin").addClass('imageFocus');
               // }
			break;
		}
	
	case tvKeyCode.Return:{
	    if(!jQuery('#loading').is(':visible')){
          $("#customMessage").hide();
               $("#customMessage").html('');
               $(".overlay-screen").hide();
               showDateAndTime();

			try {
				var obj = popState();
                    view = obj.view;
                    $("#"+obj.focus).addClass('imageFocus');

			} catch (e) {}

			if (callBack) {
				callBack();
				callBack = '';
          }
          
          break;
        }
     }
	case tvKeyCode.Enter: {
               Keyhandler.enterPinMultiScreenKeyEnter($(".imageFocus"));
			break;
		}
	case tvKeyCode.ArrowDown: {
               // if(id == "pin"){
               //      $('.imageFocus').removeClass("imageFocus");
               //      $("#pin").blur();
               //      $("#confirmPin").addClass('imageFocus');
               // }
			break;
		}

	default: {
			break;
		}
	}
}

Keyhandler.searchMoviesPopUpKeyHandler = function(e){
     var keycode;
	var userAgent = new String(navigator.userAgent);
	if (window.event) {
		keycode = e.keyCode;
	} else if (e.which) {
		keycode = e.which;
	}
     $(".error").html('');
	var index = parseInt($('.imageFocus').attr("index"));
	var id = $('.imageFocus').attr("id");
		var source = $('.imageFocus').attr("source");

	switch (keycode) {
	case tvKeyCode.ArrowLeft: {
                    // if(source == "cancelButtonSearch"){
                    //     $('.imageFocus').removeClass("imageFocus");
                    //     $('#searchButton').addClass("imageFocus");
                    // }
        			// break;
        		}
        	case tvKeyCode.ArrowRight: {
                    // if(source == "searchButton"){
                    //     $('.imageFocus').removeClass("imageFocus");
                    //     $('#cancelButtonSearch').addClass("imageFocus");
                    // }
        			// break;
        		}
	case tvKeyCode.ArrowUp: {
               // if(id == "searchButton" || id == "cancelButtonSearch"){
               //      $('.imageFocus').removeClass("imageFocus");
               //      $("#searchedText").addClass('imageFocus');
               // }
			break;
		}

	case tvKeyCode.Return:
        		 {
	    if(!jQuery('#loading').is(':visible')){
          $("#customMessage").hide();
               $("#customMessage").html('');
               $(".overlay-screen").hide();
               showDateAndTime();

			try {
				var obj = popState();
                    view = obj.view;
                    $("#"+obj.focus).addClass('imageFocus');

			} catch (e) {}

			if (callBack) {
				callBack();
				callBack = '';
          }

          break;
        }
     }
	case tvKeyCode.Enter: {
               Keyhandler.searchMoviesPopUpKeyEnter($(".imageFocus"));
			break;
		}
	case tvKeyCode.ArrowDown: {
               if(id == "searchedText"){
                    $('.imageFocus').removeClass("imageFocus");
                    $("#searchedText").blur();
                    $("#searchButton").addClass('imageFocus');
               }
			break;
		}

	default: {
			break;
		}
	}
}



Keyhandler.sortPopUpMoviesKeyHandler = function(e){
     var keycode;
	var userAgent = new String(navigator.userAgent);
	if (window.event) {
		keycode = e.keyCode;
	} else if (e.which) {
		keycode = e.which;
	}
     $(".error").html('');
	var index = parseInt($('.imageFocus').attr("index"));
	var id = $('.imageFocus').attr("id");
    var source = $('.imageFocus').attr("source");


	switch (keycode) {
	case tvKeyCode.ArrowLeft: {
                if(source == "cancelButtonSort"){
                    $('.imageFocus').removeClass("imageFocus");
                    $('#sortButton').addClass("imageFocus");
                }
    			break;
    		}
    	case tvKeyCode.ArrowRight: {
                if(source == "sortButton"){
                    $('.imageFocus').removeClass("imageFocus");
                    $('#cancelButtonSort').addClass("imageFocus");
                }
    			break;
    		}
	case tvKeyCode.ArrowUp: {
               if(source == "sortButton" || source == "cancelButtonSort"){
                         $('.imageFocus').removeClass("imageFocus");
                         $('#containerBtn-4').addClass("imageFocus");
               }else if(source == "inputButtons"){
                   if(index == 1){
                        $('.imageFocus').removeClass("imageFocus");
                        $('#containerBtn-0').addClass("imageFocus");
                   }else if(index == 2){
                        $('.imageFocus').removeClass("imageFocus");
                        $('#containerBtn-1').addClass("imageFocus");
                   }else if(index == 3){
                         $('.imageFocus').removeClass("imageFocus");
                         $('#containerBtn-2').addClass("imageFocus");
                   }else if(index == 4){
                         $('.imageFocus').removeClass("imageFocus");
                         $('#containerBtn-3').addClass("imageFocus");
                   }

               }
			break;
		}

	case tvKeyCode.Return:
    		 {
 	    if(!jQuery('#loading').is(':visible')){
          $("#customMessage").hide();
               $("#customMessage").html('');
               $(".overlay-screen").hide();
               showDateAndTime();

			try {
				var obj = popState();
                    view = obj.view;
                    $("#"+obj.focus).addClass('imageFocus');

			} catch (e) {}

			if (callBack) {
				callBack();
				callBack = '';
          }

          break;
        }
     }
	case tvKeyCode.Enter: {
               Keyhandler.sortPopUpMoviesKeyEnter($(".imageFocus"));
			break;
		}
	case tvKeyCode.ArrowDown: {

               if(source == "inputButtons"){
                    if(index == 0){
                         $('.imageFocus').removeClass("imageFocus");
                         $('#containerBtn-1').addClass("imageFocus");
                    }else if(index == 1){
                         $('.imageFocus').removeClass("imageFocus");
                         $('#containerBtn-2').addClass("imageFocus");
                    }else if(index == 2){
                         $('.imageFocus').removeClass("imageFocus");
                         $('#containerBtn-3').addClass("imageFocus");
                    }else if(index == 3){
                          $('.imageFocus').removeClass("imageFocus");
                          $('#containerBtn-4').addClass("imageFocus");
                    }else if(index == 4){
                          $('.imageFocus').removeClass("imageFocus");
                          $('#sortButton').addClass("imageFocus");
                    }

                }
			break;
		}

	default: {
			break;
		}
	}
}



Keyhandler.sortPopUpKeyHandler = function(e){
     var keycode;
	var userAgent = new String(navigator.userAgent);
	if (window.event) {
		keycode = e.keyCode;
	} else if (e.which) {
		keycode = e.which;
	}
     $(".error").html('');
	var index = parseInt($('.imageFocus').attr("index"));
	var id = $('.imageFocus').attr("id");
    var source = $('.imageFocus').attr("source");


	switch (keycode) {
	case tvKeyCode.ArrowLeft: {
          //   if(source == "cancelButtonSort"){
          //       $('.imageFocus').removeClass("imageFocus");
          //       $('#sortButton').addClass("imageFocus");
          //   }
			break;
		}
	case tvKeyCode.ArrowRight: {
          //   if(source == "sortButton"){
          //       $('.imageFocus').removeClass("imageFocus");
          //       $('#cancelButtonSort').addClass("imageFocus");
          //   }
			break;
		}
	case tvKeyCode.ArrowUp: {
               // if(source == "sortButton" || source == "cancelButtonSort"){
               //      $('.imageFocus').removeClass("imageFocus");
               //      $('#containerBtn-5').addClass("imageFocus");
               // }else if(source == "inputButtons"){
               //     if(index == 1){
               //          $('.imageFocus').removeClass("imageFocus");
               //          $('#containerBtn-0').addClass("imageFocus");
               //     }else if(index == 2){
               //          $('.imageFocus').removeClass("imageFocus");
               //          $('#containerBtn-1').addClass("imageFocus");
               //     }else if(index == 3){
               //           $('.imageFocus').removeClass("imageFocus");
               //           $('#containerBtn-2').addClass("imageFocus");
               //     }else if(index == 4){
               //           $('.imageFocus').removeClass("imageFocus");
               //           $('#containerBtn-3').addClass("imageFocus");
               //     }else if(index == 5){
               //           $('.imageFocus').removeClass("imageFocus");
               //           $('#containerBtn-4').addClass("imageFocus");
               //     }

               // }
			break;
		}

	case tvKeyCode.Return:
    		 {
 	    if(!jQuery('#loading').is(':visible')){
          $("#customMessage").hide();
               $("#customMessage").html('');
               $(".overlay-screen").hide();
               showDateAndTime();

			try {
				var obj = popState();
                    view = obj.view;
                    $("#"+obj.focus).addClass('imageFocus');

			} catch (e) {}

			if (callBack) {
				callBack();
				callBack = '';
          }

          break;
        }
     }
	case tvKeyCode.Enter: {
               Keyhandler.sortPopUpKeyEnter($(".imageFocus"));
			break;
		}
	case tvKeyCode.ArrowDown: {

               // if(source == "inputButtons"){
               //      if(index == 0){
               //           $('.imageFocus').removeClass("imageFocus");
               //           $('#containerBtn-1').addClass("imageFocus");
               //      }else if(index == 1){
               //           $('.imageFocus').removeClass("imageFocus");
               //           $('#containerBtn-2').addClass("imageFocus");
               //      }else if(index == 2){
               //           $('.imageFocus').removeClass("imageFocus");
               //           $('#containerBtn-3').addClass("imageFocus");
               //      }else if(index == 3){
               //            $('.imageFocus').removeClass("imageFocus");
               //            $('#containerBtn-4').addClass("imageFocus");
               //      }else if(index == 4){
               //            $('.imageFocus').removeClass("imageFocus");
               //            $('#containerBtn-5').addClass("imageFocus");
               //      }else if(index == 5){
               //            $('.imageFocus').removeClass("imageFocus");
               //            $('#sortButton').addClass("imageFocus");
               //      }

               //  }
			break;
		}

	default: {
			break;
		}
	}
}
Keyhandler.searchPopUpKeyHandler = function(e){
     var keycode;
	var userAgent = new String(navigator.userAgent);
	if (window.event) {
		keycode = e.keyCode;
	} else if (e.which) {
		keycode = e.which;
	}
     $(".error").html('');
	var index = parseInt($('.imageFocus').attr("index"));
	var id = $('.imageFocus').attr("id");
	var source = $('.imageFocus').attr("source");
	switch (keycode) {
	case tvKeyCode.ArrowLeft: {
               //  if(source == "cancelButtonSearch"){
               //      $('.imageFocus').removeClass("imageFocus");
               //      $('#searchButton').addClass("imageFocus");
               //  }
    			break;
    		}
    	case tvKeyCode.ArrowRight: {
               //  if(source == "searchButton"){
               //      $('.imageFocus').removeClass("imageFocus");
               //      $('#cancelButtonSearch').addClass("imageFocus");
               //  }
    			break;
    		}
	case tvKeyCode.ArrowUp: {
               // if(id == "searchButton" || source == "cancelButtonSearch"){
               //      $('.imageFocus').removeClass("imageFocus");
               //      $("#searchedText").addClass('imageFocus');
               // }
			break;
		}

	case tvKeyCode.Return:
    		 {
 	    if(!jQuery('#loading').is(':visible')){
          $("#customMessage").hide();
               $("#customMessage").html('');
               $(".overlay-screen").hide();
               showDateAndTime();

			try {
				var obj = popState();
                    view = obj.view;
                    $("#"+obj.focus).addClass('imageFocus');

			} catch (e) {}

			if (callBack) {
				callBack();
				callBack = '';
          }

          break;
        }
     }
	case tvKeyCode.Enter: {
               Keyhandler.searchPopUpKeyEnter($(".imageFocus"));
			break;
		}
	case tvKeyCode.ArrowDown: {
               // if(id == "searchedText"){
               //      $('.imageFocus').removeClass("imageFocus");
               //      $("#searchedText").blur();
               //      $("#searchButton").addClass('imageFocus');
               // }
			break;
		}

	default: {
			break;
		}
	}
}

Keyhandler.enterPinMoviesCategoriesKeyHandler = function(e){
     var keycode;
	var userAgent = new String(navigator.userAgent);
	if (window.event) {
		keycode = e.keyCode;
	} else if (e.which) {
		keycode = e.which;
	}
     $(".error").html('');
	var index = parseInt($('.imageFocus').attr("index"));
	var id = $('.imageFocus').attr("id");
	switch (keycode) {
	case tvKeyCode.ArrowLeft: {

			break;
		}
	case tvKeyCode.ArrowRight: {

			break;
		}
	case tvKeyCode.ArrowUp: {

               // if(id == "confirmPin"){

               //      $('.imageFocus').removeClass("imageFocus");
               //      $("#pin").addClass('imageFocus');
               // }
			break;
		}

	case tvKeyCode.Return:{
	    if(!jQuery('#loading').is(':visible')){
          $("#customMessage").hide();
               $("#customMessage").html('');
               $(".overlay-screen").hide();
               showDateAndTime();

			try {
				var obj = popState();
                    view = obj.view;
                    $("#"+obj.focus).addClass('imageFocus');

			} catch (e) {}

			if (callBack) {
				callBack();
				callBack = '';
          }

          break;
        }
     }
	case tvKeyCode.Enter: {
               Keyhandler.enterPinMoviesCategoriesKeyEnter($(".imageFocus"));
			break;
		}
	case tvKeyCode.ArrowDown: {
               // if(id == "pin"){
               //      $('.imageFocus').removeClass("imageFocus");
               //      $("#pin").blur();
               //      $("#confirmPin").addClass('imageFocus');
               // }
			break;
		}

	default: {
			break;
		}
	}
}
Keyhandler.enterPinMoviesKeyHandler = function(e){
     var keycode;
	var userAgent = new String(navigator.userAgent);
	if (window.event) {
		keycode = e.keyCode;
	} else if (e.which) {
		keycode = e.which;
	}
     $(".error").html('');
	var index = parseInt($('.imageFocus').attr("index"));
	var id = $('.imageFocus').attr("id");
	switch (keycode) {
	case tvKeyCode.ArrowLeft: {

			break;
		}
	case tvKeyCode.ArrowRight: {

			break;
		}
	case tvKeyCode.ArrowUp: {

               if(id == "confirmPin"){

                    $('.imageFocus').removeClass("imageFocus");
                    $("#pin").addClass('imageFocus');
               }
			break;
		}

	case tvKeyCode.Return:{
	    if(!jQuery('#loading').is(':visible')){
          $("#customMessage").hide();
               $("#customMessage").html('');
               $(".overlay-screen").hide();
               showDateAndTime();

			try {
				var obj = popState();
                    view = obj.view;
                    $("#"+obj.focus).addClass('imageFocus');

			} catch (e) {}

			if (callBack) {
				callBack();
				callBack = '';
          }

          break;
        }
     }
	case tvKeyCode.Enter: {
               Keyhandler.enterPinMoviesKeyEnter($(".imageFocus"));
			break;
		}
	case tvKeyCode.ArrowDown: {
               if(id == "pin"){
                    $('.imageFocus').removeClass("imageFocus");
                    $("#pin").blur();
                    $("#confirmPin").addClass('imageFocus');
               }
			break;
		}

	default: {
			break;
		}
	}
}

Keyhandler.enterPinSeriesKeyHandler = function(e){
     var keycode;
	var userAgent = new String(navigator.userAgent);
	if (window.event) {
		keycode = e.keyCode;
	} else if (e.which) {
		keycode = e.which;
	}
     $(".error").html('');
	var index = parseInt($('.imageFocus').attr("index"));
	var id = $('.imageFocus').attr("id");
	switch (keycode) {
	case tvKeyCode.ArrowLeft: {

			break;
		}
	case tvKeyCode.ArrowRight: {

			break;
		}
	case tvKeyCode.ArrowUp: {

               if(id == "confirmPin"){

                    $('.imageFocus').removeClass("imageFocus");
                    $("#pin").addClass('imageFocus');
               }
			break;
		}

	case tvKeyCode.Return:{
	    if(!jQuery('#loading').is(':visible')){
          $("#customMessage").hide();
               $("#customMessage").html('');
               $(".overlay-screen").hide();
               showDateAndTime();

			try {
				var obj = popState();
                    view = obj.view;
                    $("#"+obj.focus).addClass('imageFocus');

			} catch (e) {}

			if (callBack) {
				callBack();
				callBack = '';
          }

          break;
        }
     }
	case tvKeyCode.Enter: {
               Keyhandler.enterPinSeriesKeyEnter($(".imageFocus"));
			break;
		}
	case tvKeyCode.ArrowDown: {
               if(id == "pin"){
                    $('.imageFocus').removeClass("imageFocus");
                    $("#pin").blur();
                    $("#confirmPin").addClass('imageFocus');
               }
			break;
		}

	default: {
			break;
		}
	}
}

Keyhandler.enterPinSeriesKeyEnter = function(currFocus){
  var id = currFocus.attr("id");
     if(id == "pin"){
          $("#"+id).focus();
     }else{

          if($("#pin").val() == parentPin){
               pinEntered = true;
               $(".overlay-screen").hide();

               $("#customMessage").hide();
			   $("#customMessage").html('');
			try {
				var obj = popState();
                    view = obj.view;
                    $("#"+obj.focus).addClass('imageFocus');
			} catch (e) {}

	        Main.ShowLoading();
//            alert(openedMovieID);
             $.ajax({
                 url : Main.profile.user_info.login_url+"/player_api.php?username="+Main.profile.user_info.username+"&password="+Main.profile.user_info.password+"&action=get_series_info"+"&series_id="+openedSeriesID,
                 type : "GET",
                 data : {},
                 success : function (data) {
                        if(typeof data == "string"){
                            data = JSON.parse(data);
                         }
                        Main.HideLoading();
                        hideValues();
                     seriesPage = data;
                     if(view != "tvshowDetails")
                          pushState(view,$(".imageFocus").attr("id"));
                        $(".imageFocus").removeClass("imageFocus");

                     view = "tvshowDetails";
                     Main.processNext();

                 },
                 error : function (errObj) {
                    Main.HideLoading();
                  Main.showFailure("Something went wrong. Please try again.");
                },
                 timeout : 80000
             });



          } else{
               $(".error").html("Invalid Pin.");
          }
     }
}



Keyhandler.enterPinMoviesCategoriesKeyEnter = function(currFocus){
  var id = currFocus.attr("id");
     if(id == "pin"){
          $("#"+id).focus();
     }else{

          if($("#pin").val() == parentPin){
               pinEntered = true;
               $(".overlay-screen").hide();

               $("#customMessage").hide();
			   $("#customMessage").html('');
			try {
				var obj = popState();
                    view = obj.view;
                    $("#"+obj.focus).addClass('imageFocus');
			} catch (e) {}

	        Main.ShowLoading();

//	        alert(openedMovieCatID);

//	         if(action == "get_vod_streams"){
                       Main.getVodDetails(openedSectionAction,openedMovieCatID);
//             }


//             $.ajax({
//                         url : Main.profile.user_info.login_url+"/player_api.php?username="+Main.profile.user_info.username+"&password="+Main.profile.user_info.password+"&action=get_vod_info&vod_id="+openedMovieID,
//                         type : "GET",
//                         data : {},
//                         success : function (data) {
//                            if(typeof data == "string"){
//                                data = JSON.parse(data);
//                             }
//                                Main.HideLoading();
//                                hideValues();
//                             singleMovie = data;
//                             if(view != "singleMovie")
//                                  pushState(view,$(".imageFocus").attr("id"));
//                             $(".imageFocus").removeClass("imageFocus");
//                             view = "singleMovie";
//                             Main.processNext();
//                         },
//                         error : function (errObj) {
//                         },
//                         timeout : 80000
//                     });



          } else{
               $(".error").html("Invalid Pin.");
          }
     }
}

Keyhandler.enterPinMoviesKeyEnter = function(currFocus){
  var id = currFocus.attr("id");
     if(id == "pin"){
          $("#"+id).focus();
     }else{

          if($("#pin").val() == parentPin){
               pinEntered = true;
               $(".overlay-screen").hide();

               $("#customMessage").hide();
			   $("#customMessage").html('');
			try {
				var obj = popState();
                    view = obj.view;
                    $("#"+obj.focus).addClass('imageFocus');
			} catch (e) {}

	        Main.ShowLoading();
//            alert(openedMovieID);
             $.ajax({
                         url : Main.profile.user_info.login_url+"/player_api.php?username="+Main.profile.user_info.username+"&password="+Main.profile.user_info.password+"&action=get_vod_info&vod_id="+openedMovieID,
                         type : "GET",
                         data : {},
                         success : function (data) {
                            if(typeof data == "string"){
                                data = JSON.parse(data);
                             }
                                Main.HideLoading();
                                hideValues();
                             singleMovie = data;
                             if(view != "singleMovie")
                                  pushState(view,$(".imageFocus").attr("id"));
                             $(".imageFocus").removeClass("imageFocus");
                             view = "singleMovie";
                             Main.processNext();
                         },
                         error : function (errObj) {
                              Main.HideLoading();
                            Main.showFailure("Something went wrong. Please try again.");
                          },
                         timeout : 80000
                     });



          } else{
               $(".error").html("Invalid Pin.");
          }
     }
}

function searchLiveAuto(currFocus){
     var id = currFocus.attr("id");
     var source = $('.imageFocus').attr("source");
     if($("#searchedText").val() != ""){

          // alert(JSON.stringify(liveSectionDetailsFullData));
                  var searchedResult = compareStringSearch($("#searchedText").val(),liveSectionDetailsFullData);
                   if(searchedResult.length>0){

                   
                  liveSectionDetails = searchedResult;
                  liveSectionDetails.category = liveSectionDetailsFullData.category;

                  liveSectionDefaultWithoutSorting = '';
                  liveSectionDefaultWithoutSortingCategories = '';

                  liveSectionDefaultWithoutSortingCategories = JSON.stringify(liveSectionDetails.category);
                  liveSectionDefaultWithoutSorting = JSON.stringify(liveSectionDetails);

                   var searchedResultText = liveSectionDetails.length+" result(s) found for '<b style='color: orange;'>"+$("#searchedText").val()+"</b>'";


                  if(liveSectionDetails.length>0){
                   $("#searchResultLive").html(searchedResultText);
                                        $("#searchResultLive").show();
//                     $("#mainContent").html('');
//                     $("#mainContent").html(Util.liveDetailsPage());

                $(".liveChannels").html('');
                $(".liveChannels").html(Util.updateSectionCat($('.imageFocus').attr('id')));
                  Main.fetchAccToSortingLive();
 
                loadLiveData(liveSectionDetails);
                        $(".imageFocus").removeClass("imageFocus");
                      $("#liveChannel-0").addClass('imageFocus');
                      $("#clearSearch").css("display", "block");
                      $("#customMessage").show();
 

//         Player.playStream(playUrl,true);

                    $(".overlay-screen").show();

                    //     try {
                    //         var obj = popState();
                    //              view = obj.view;

                    //     } catch (e) {}

                  }else{
                     
                    $(".error").html("No Channel Found.");
                    if($("#clearSearch").is(":visible")){
                         clearSearchedRecords("channels");
                         $(".overlay-screen").show();
                         $("#customMessage").show();


                    }
                  }
               }else{
                   
                    $(".error").html("No Channel Found.");
                    if($("#clearSearch").is(":visible")){
                         clearSearchedRecords("channels");
                         $(".overlay-screen").show();
                         $("#customMessage").show();
                         


                    }
                }


        }  else{
          
               //  $(".error").html("Please search any channel.");
                    $(".overlay-screen").show();
                    $("#searchResultLive").html("");
                    $("#searchResultLive").hide();
                    if($("#clearSearch").is(":visible")){
                         clearSearchedRecords("channels");
                         $(".overlay-screen").show();
                         $("#customMessage").show();


                    }
           }
}

function searchMoviesAuto(currFocus){
     var id = currFocus.attr("id");
     var source = $('.imageFocus').attr("source");
     // alert("a1");
     if($("#searchedText").val() != ""){
          var searchedResult = compareStringSearch($("#searchedText").val(),vodSectionDetailsFullData);
          vodSectionDetails = searchedResult;
          vodSectionDetails.category = vodSectionDetailsFullData.category;

          movieSectionDefaultWithoutSorting = '';
          movieSectionDefaultWithoutSortingCategories = '';

          movieSectionDefaultWithoutSortingCategories = JSON.stringify(vodSectionDetails.category);
          movieSectionDefaultWithoutSorting = JSON.stringify(vodSectionDetails);

          var searchedResultText = vodSectionDetails.length+" result(s) found for '<b style='color: orange;'>"+$("#searchedText").val()+"</b>'";

          if(vodSectionDetails.length>0){
               // hideValues();
               $("#mainContent").html('');
               $(".imageFocus").removeClass("imageFocus");
               $("#mainContent").html(Util.vodMoviesPage(vodSectionDetails,"searched"));
               $("#vodMovies-0-0").addClass('imageFocus');
               $("#mainContent").show();
               $("#clearSearch").css("display", "block");

               $("#searchResult").html(searchedResultText);
               check_if_in_view();
               if(vodSectionDetails.length>moviesLoadPerPage){
                    $("#loadmore_movies").show();
               }else{ 
                    $("#loadmore_movies").hide();
               }
               $("#searchResult").show();
               // try {
               //      var obj = popState();
               //           view = obj.view;

               // } catch (e) {}
               $(".overlay-screen").show();

          }else{
               if(pageType == "movies"){
                    $(".error").html("No Movie Found!");
                    if($("#clearSearch").is(":visible")){
                         clearSearchedRecords("movies");
                         $(".overlay-screen").show();

                    }
               }else{
                    $(".error").html("No Series Found!");
                    if($("#clearSearch").is(":visible")){
                         clearSearchedRecords("movies");
                         $(".overlay-screen").show();

                    }
               }
          }
     }else{
          $(".overlay-screen").show();
          $("#searchResult").html("");
          $("#searchResult").hide();
          if($("#clearSearch").is(":visible")){
               clearSearchedRecords("movies");
               $(".overlay-screen").show();

          }
          // if(pageType == "movies"){
          //     $(".error").html("Please search any movie.");
          // }else{
               // $(".error").html("Please search any series.");
          // }
     }
}

function searchLiveCategoriesAuto(currFocus){
     var id = currFocus.attr("id");
     var source = $('.imageFocus').attr("source");
     // alert("a1");
     $(".error").html('');

     if($("#searchedText").val() != ""){ 

          var searchedResult = compareStringSearchCategories($("#searchedText").val(),sectionData);
 
          vodSectionDetails = searchedResult; 
          vodSectionDetails.sectionType = sectionData.sectionType;
          vodSectionDetails.type = sectionData.type;

          sectionDataCategoriesSearched = searchedResult;
          sectionDataCategoriesSearched.sectionType = sectionData.sectionType;
          sectionDataCategoriesSearched.type = sectionData.type;

          // console.log("honey4");
          // console.log(sectionDataCategoriesSearched);
        

          var searchedResultText = vodSectionDetails.length+" result(s) found for '<b style='color: orange;'>"+$("#searchedText").val()+"</b>'";

          if(vodSectionDetails.length>0){ 
               $("#channelContent").html(Util.listSectionPage(vodSectionDetails));
               var mainArray = [];

               for(var i=0;i<vodSectionDetails.length;i++){
                   var tempArray = [];
    
                   box = {
                       category_id: vodSectionDetails[i].category_id,
                       category_name: vodSectionDetails[i].category_name,
                       parent_id: vodSectionDetails[i].parent_id,
                       index_number: i,
                       
                   }
                   tempArray.push(box);
   
                   if((i+1)<vodSectionDetails.length){
                       i++;
                       box = {
                           category_id: vodSectionDetails[i].category_id,
                           category_name: vodSectionDetails[i].category_name,
                           parent_id: vodSectionDetails[i].parent_id,
                           index_number: i,
                           
                       }
                       tempArray.push(box);
                   }
   
                   mainArray.push(tempArray);
   
               }
               mainArray.type = vodSectionDetails.type;
               mainArray.sectionType = vodSectionDetails.sectionType;
   
    
               categoriesSection(mainArray);
               $("#channelContent").show();
               
               $("#clearSearch").css("display", "block");

               $("#searchResult").html(searchedResultText); 
               $("#searchResult").show(); 
               $(".overlay-screen").show();

          }else{ 
                    $(".error").html("No Live Category Found!");
                    if($("#clearSearch").is(":visible")){
                         clearSearchedRecords("liveCategories");
                         $(".overlay-screen").show();

                    } 
          }
     }else{
          $(".overlay-screen").show();
          $("#searchResult").html("");
          $("#searchResult").hide();
          if($("#clearSearch").is(":visible")){
               clearSearchedRecords("liveCategories");
               $(".overlay-screen").show();

          } 
     }
}

function searchMoviesCategoriesAuto(currFocus){
     var id = currFocus.attr("id");
     var source = $('.imageFocus').attr("source");
     // alert("a1");
     $(".error").html('');

     if($("#searchedText").val() != ""){ 

          var searchedResult = compareStringSearchCategories($("#searchedText").val(),sectionData);
 
          vodSectionDetails = searchedResult; 
          vodSectionDetails.sectionType = sectionData.sectionType;
          vodSectionDetails.type = sectionData.type;
          // console.log("honey1");
          // console.log(vodSectionDetails);
          // console.log(vodSectionDetails.category);

          
          sectionDataCategoriesSearched = searchedResult;
          sectionDataCategoriesSearched.sectionType = sectionData.sectionType;
          sectionDataCategoriesSearched.type = sectionData.type;

          // console.log("honey4");
          // console.log(sectionDataCategoriesSearched);


          var searchedResultText = vodSectionDetails.length+" result(s) found for '<b style='color: orange;'>"+$("#searchedText").val()+"</b>'";

          if(vodSectionDetails.length>0){ 
               $("#channelContent").html(Util.listSectionPage(vodSectionDetails));
               var mainArray = [];

               for(var i=0;i<vodSectionDetails.length;i++){
                   var tempArray = [];
    
                   box = {
                       category_id: vodSectionDetails[i].category_id,
                       category_name: vodSectionDetails[i].category_name,
                       parent_id: vodSectionDetails[i].parent_id,
                       index_number: i,
                       
                   }
                   tempArray.push(box);
   
                   if((i+1)<vodSectionDetails.length){
                       i++;
                       box = {
                           category_id: vodSectionDetails[i].category_id,
                           category_name: vodSectionDetails[i].category_name,
                           parent_id: vodSectionDetails[i].parent_id,
                           index_number: i,
                           
                       }
                       tempArray.push(box);
                   }
   
                   mainArray.push(tempArray);
   
               }
               mainArray.type = vodSectionDetails.type;
               mainArray.sectionType = vodSectionDetails.sectionType;
   
    
               categoriesSection(mainArray);
               $("#channelContent").show();
               
               $("#clearSearch").css("display", "block");

               $("#searchResult").html(searchedResultText); 
               $("#searchResult").show(); 
               $(".overlay-screen").show();

          }else{ 
                    $(".error").html("No Movie Category Found!");
                    if($("#clearSearch").is(":visible")){
                         clearSearchedRecords("MoviesCategories");
                         $(".overlay-screen").show();

                    } 
          }
     }else{
          $(".overlay-screen").show();
          $("#searchResult").html("");
          $("#searchResult").hide();
          if($("#clearSearch").is(":visible")){
               clearSearchedRecords("MoviesCategories");
               $(".overlay-screen").show();

          } 
     }
}
function searchSeriesCategoriesAuto(currFocus){
     var id = currFocus.attr("id");
     var source = $('.imageFocus').attr("source");
     // alert("a1");
     $(".error").html('');

     if($("#searchedText").val() != ""){ 

          var searchedResult = compareStringSearchCategories($("#searchedText").val(),sectionData);
 
          vodSectionDetails = searchedResult; 
          vodSectionDetails.sectionType = sectionData.sectionType;
          vodSectionDetails.type = sectionData.type;

          sectionDataCategoriesSearched = searchedResult;
          sectionDataCategoriesSearched.sectionType = sectionData.sectionType;
          sectionDataCategoriesSearched.type = sectionData.type;

          // console.log("honey4");
          // console.log(sectionDataCategoriesSearched);


          var searchedResultText = vodSectionDetails.length+" result(s) found for '<b style='color: orange;'>"+$("#searchedText").val()+"</b>'";

          if(vodSectionDetails.length>0){ 
               $("#channelContent").html(Util.listSectionPage(vodSectionDetails));
               var mainArray = [];

               for(var i=0;i<vodSectionDetails.length;i++){
                   var tempArray = [];
    
                   box = {
                       category_id: vodSectionDetails[i].category_id,
                       category_name: vodSectionDetails[i].category_name,
                       parent_id: vodSectionDetails[i].parent_id,
                       index_number: i,
                       
                   }
                   tempArray.push(box);
   
                   if((i+1)<vodSectionDetails.length){
                       i++;
                       box = {
                           category_id: vodSectionDetails[i].category_id,
                           category_name: vodSectionDetails[i].category_name,
                           parent_id: vodSectionDetails[i].parent_id,
                           index_number: i,
                           
                       }
                       tempArray.push(box);
                   }
   
                   mainArray.push(tempArray);
   
               }
               mainArray.type = vodSectionDetails.type;
               mainArray.sectionType = vodSectionDetails.sectionType;
   
    
               categoriesSection(mainArray);
               $("#channelContent").show();
               
               $("#clearSearch").css("display", "block");

               $("#searchResult").html(searchedResultText); 
               $("#searchResult").show(); 
               $(".overlay-screen").show();

          }else{ 
                    $(".error").html("No Series Category Found!");
                    if($("#clearSearch").is(":visible")){
                         clearSearchedRecords("SeriesCategories");
                         $(".overlay-screen").show();

                    } 
          }
     }else{
          $(".overlay-screen").show();
          $("#searchResult").html("");
          $("#searchResult").hide();
          if($("#clearSearch").is(":visible")){
               clearSearchedRecords("SeriesCategories");
               $(".overlay-screen").show();

          } 
     }
}
function searchCatchupCategoriesAuto(currFocus){
     var id = currFocus.attr("id");
     var source = $('.imageFocus').attr("source");
     // alert("a1");
     $(".error").html('');

     if($("#searchedText").val() != ""){ 

          var searchedResult = compareStringSearchCategories($("#searchedText").val(),sectionData);
 
          vodSectionDetails = searchedResult; 
          vodSectionDetails.sectionType = sectionData.sectionType;
          vodSectionDetails.type = sectionData.type;

          sectionDataCategoriesSearched = searchedResult;
          sectionDataCategoriesSearched.sectionType = sectionData.sectionType;
          sectionDataCategoriesSearched.type = sectionData.type;

          // console.log("honey4");
          // console.log(sectionDataCategoriesSearched);



          var searchedResultText = vodSectionDetails.length+" result(s) found for '<b style='color: orange;'>"+$("#searchedText").val()+"</b>'";

          if(vodSectionDetails.length>0){ 
               $("#channelContent").html(Util.listSectionPage(vodSectionDetails));
               var mainArray = [];

               for(var i=0;i<vodSectionDetails.length;i++){
                   var tempArray = [];
    
                   box = {
                       category_id: vodSectionDetails[i].category_id,
                       category_name: vodSectionDetails[i].category_name,
                       parent_id: vodSectionDetails[i].parent_id,
                       index_number: i,
                       
                   }
                   tempArray.push(box);
   
                   if((i+1)<vodSectionDetails.length){
                       i++;
                       box = {
                           category_id: vodSectionDetails[i].category_id,
                           category_name: vodSectionDetails[i].category_name,
                           parent_id: vodSectionDetails[i].parent_id,
                           index_number: i,
                           
                       }
                       tempArray.push(box);
                   }
   
                   mainArray.push(tempArray);
   
               }
               mainArray.type = vodSectionDetails.type;
               mainArray.sectionType = vodSectionDetails.sectionType;
   
    
               categoriesSection(mainArray);
               $("#channelContent").show();
               
               $("#clearSearch").css("display", "block");

               $("#searchResult").html(searchedResultText); 
               $("#searchResult").show(); 
               $(".overlay-screen").show();

          }else{ 
                    $(".error").html("No Catchup Category Found!");
                    if($("#clearSearch").is(":visible")){
                         clearSearchedRecords("CatchupCategories");
                         $(".overlay-screen").show();

                    } 
          }
     }else{
          $(".overlay-screen").show();
          $("#searchResult").html("");
          $("#searchResult").hide();
          if($("#clearSearch").is(":visible")){
               clearSearchedRecords("CatchupCategories");
               $(".overlay-screen").show();

          } 
     }
}


Keyhandler.searchMoviesPopUpKeyEnter = function(currFocus){
var id = currFocus.attr("id");
     var source = $('.imageFocus').attr("source");

     if(id == "searchedText"){
          $("#"+id).focus();
     }else if(source == "cancelButtonSearch"){
            $("#customMessage").hide();
            $("#customMessage").html('');
            $(".overlay-screen").hide();

            try {
                var obj = popState();
                    view = obj.view;
                    $("#"+obj.focus).addClass('imageFocus');

            } catch (e) {}
     }else{
        if($("#searchedText").val() != ""){
                  var searchedResult = compareStringSearch($("#searchedText").val(),vodSectionDetailsFullData);
                  vodSectionDetails = searchedResult;
                  vodSectionDetails.category = vodSectionDetailsFullData.category;

                  movieSectionDefaultWithoutSorting = '';
                  movieSectionDefaultWithoutSortingCategories = '';

                  movieSectionDefaultWithoutSortingCategories = JSON.stringify(vodSectionDetails.category);
                  movieSectionDefaultWithoutSorting = JSON.stringify(vodSectionDetails);

                   var searchedResultText = vodSectionDetails.length+" result(s) found for '<b style='color: orange;'>"+$("#searchedText").val()+"</b>'";

                  if(vodSectionDetails.length>0){

                        hideValues();
                        $("#mainContent").html('');
                        $(".imageFocus").removeClass("imageFocus");
                        $("#mainContent").html(Util.vodMoviesPage(vodSectionDetails,"searched"));
                        $("#vodMovies-0-0").addClass('imageFocus');
                        $("#mainContent").show();
                      $("#clearSearch").css("display", "block");

                        $("#searchResult").html(searchedResultText);
                        check_if_in_view();
                         if(vodSectionDetails.length>moviesLoadPerPage){
                              $("#loadmore_movies").show();
                         }else{ 
                              $("#loadmore_movies").hide();
                         }
                         $("#searchResult").show();
                        try {
                            var obj = popState();
                                 view = obj.view;

                        } catch (e) {}
                        $(".overlay-screen").hide();

                  }else{
                      if(pageType == "movies"){
                           $(".error").html("No Movie Found!");
                      }else{
                           $(".error").html("No Series Found!");
                      }
                  }
                  
        }  else{
                if(pageType == "movies"){
                    $(".error").html("Please search any movie.");
                }else{
                     $(".error").html("Please search any series.");
                }
           }

     }

}

var testingabcd ='';

          if( typeof helper == 'undefined' ) {
            var helper = { } ;
          }

          helper.arr = {
                   /**
               * Function to sort multidimensional array
               *
               * <a href="/param">@param</a> {array} [arr] Source array
               * <a href="/param">@param</a> {array} [columns] List of columns to sort
               * <a href="/param">@param</a> {array} [order_by] List of directions (ASC, DESC)
               * @returns {array}
               */
              multisort: function(arr, columns, order_by) {

                  if(typeof columns == 'undefined') {
                      columns = []
                      for(x=0;x<arr[0].length;x++) {
                          columns.push(x);
                      }
                  }

                  if(typeof order_by == 'undefined') {
                      order_by = []
                      for(x=0;x<arr[0].length;x++) {
                          order_by.push('ASC');
                      }
                  }


                  function multisort_recursive(a,b,columns,order_by,index) {
                      var direction = order_by[index] == 'DESC' ? 1 : 0;

                      var is_numeric = !isNaN(+a[columns[index]] - +b[columns[index]]);

                        if(is_numeric){
                            var x = a[columns[index]];
                            var y = b[columns[index]];
                        }else{
                            if(a[columns[index]]!=null && a[columns[index]]!=""){
                                var x= a[columns[index]].toLowerCase();
                            }
                            if(b[columns[index]]!=null && b[columns[index]]!=""){
                                var y= b[columns[index]].toLowerCase();
                            }

                        }
//                      var x = is_numeric ? +a[columns[index]] : a[columns[index]].toLowerCase();
//                      var y = is_numeric ? +b[columns[index]] : b[columns[index]].toLowerCase();



                      if(x < y) {
                              return direction == 0 ? -1 : 1;
                      }

                      if(x == y)  {
                          return columns.length-1 > index ? multisort_recursive(a,b,columns,order_by,index+1) : 0;
                      }

                      return direction == 0 ? 1 : -1;
                  }

                  return arr.sort(function (a,b) {
                      return multisort_recursive(a,b,columns,order_by,0);
                  });
              }
          };


Keyhandler.sortPopUpMoviesKeyEnter = function(currFocus){
  var index = parseInt($('.imageFocus').attr("index"));
	var id = $('.imageFocus').attr("id");

     var source = $('.imageFocus').attr("source");

     if(source == "inputButtons"){
               $("#"+id).find("input").prop("checked",true);
               sortingContainerSelected = $("#"+id).text().trim();
     }else if(source == "sortButton"){
        if(id == "sortButton"){
           var radioValue = $("input[name='radio']:checked").val();

          sortingContainer = radioValue;

           if(pageType == "movies"){
                localStorage.setItem("moviesSorting",sortingContainer);
           }else{
                localStorage.setItem("seriesSorting",sortingContainer);
           }


          if(sortingContainer == "default"){

              var movieDataWithoutCategories = JSON.parse(movieSectionDefaultWithoutSorting);
              var movieDataCategories = JSON.parse(movieSectionDefaultWithoutSortingCategories);
              vodSectionDetails = movieDataWithoutCategories;
              vodSectionDetails.category = movieDataCategories;
          }else if(sortingContainer == "atoz"){
              var abc = helper.arr.multisort(vodSectionDetails, ['name'], ['ASC']);
          }else if(sortingContainer == "ztoa"){
              var abc = helper.arr.multisort(vodSectionDetails, ['name'], ['DESC']);
          }else if(sortingContainer == "topadded"){
                if(pageType == "movies"){
                    var abc = helper.arr.multisort(vodSectionDetails, ['added'], ['DESC']);
                }else{
                    var abc = helper.arr.multisort(vodSectionDetails, ['last_modified'], ['DESC']);
                 }
          }else if(sortingContainer == "toprated"){
              var abc = helper.arr.multisort(vodSectionDetails, ['rating_5based'], ['DESC']);
          }



            if(sortingContainer != "default"){
                   vodSectionDetails = abc;
            }

                  $("#moviesList").html('');
                  $(".imageFocus").removeClass("imageFocus");
                  $("#moviesList").html(Util.vodMoviesPage(vodSectionDetails,"updateMovies"));
                  $("#vodMovies-0-0").addClass('imageFocus');
                  $("#moviesList").show();
                $("#customMessage").hide();
                $("#customMessage").html('');
                  try {
                      var obj = popState();
                           view = obj.view;

                  } catch (e) {}

       }
     }else if(source == "cancelButtonSort"){
                  $("#customMessage").hide();
                  $("#customMessage").html('');
                  $(".overlay-screen").hide();
                  try {
                      var obj = popState();
                          view = obj.view;
                          $("#"+obj.focus).addClass('imageFocus');

                  } catch (e) {}
           }
   }
Keyhandler.sortPopUpKeyEnter = function(currFocus){
  var index = parseInt($('.imageFocus').attr("index"));
	var id = $('.imageFocus').attr("id");

     var source = $('.imageFocus').attr("source");

//     alert(source);
//     alert(id);

     if(source == "inputButtons"){
          //if(index == 1){
               $("#"+id).find("input").prop("checked",true);
               sortingContainerSelected = $("#"+id).text().trim();
//               alert(sortingContainerSelected+" AAAA");
        //  }
     }else if(source == "sortButton"){
        if(id == "sortButton"){
           var radioValue = $("input[name='radio']:checked").val();

          sortingContainer = radioValue;
//          alert(sortingContainer+" BBBB");
          localStorage.setItem("liveSorting",sortingContainer);


//          alert(sortingContainer);
          if(sortingContainer == "default"){

              var liveDataWithoutCategories = JSON.parse(liveSectionDefaultWithoutSorting);
              var liveDataCategories = JSON.parse(liveSectionDefaultWithoutSortingCategories);
              liveSectionDetails = liveDataWithoutCategories;
              liveSectionDetails.category = liveDataCategories;
//               console.log(liveSectionDetails);

//              abc = abcd.livesectiondetails;
//              var abc = helper.arr.multisort(items, ['num'], ['DESC']);
          }else if(sortingContainer == "atoz"){
              var abc = helper.arr.multisort(liveSectionDetails, ['name'], ['ASC']);
          }else if(sortingContainer == "ztoa"){
              var abc = helper.arr.multisort(liveSectionDetails, ['name'], ['DESC']);
          }else if(sortingContainer == "topadded"){
              var abc = helper.arr.multisort(liveSectionDetails, ['added'], ['DESC']);
          }else if(sortingContainer == "channelnum_asc"){
              var abc = helper.arr.multisort(liveSectionDetails, ['num'], ['ASC']);
          }else if(sortingContainer == "channelnum_desc"){
              var abc = helper.arr.multisort(liveSectionDetails, ['num'], ['DESC']);
          }



            if(sortingContainer != "default"){
                   liveSectionDetails = abc;
            }


              

 
               // alert("c");

//                $("#mainContent").html('');
//                $("#mainContent").html(Util.liveDetailsPage());
                $(".liveChannels").html('');
                
                $(".liveChannels").html(Util.updateSectionCat($('.imageFocus').attr('id')));

                  Main.fetchAccToSortingLive();

                loadLiveData(liveSectionDetails);

                $(".imageFocus").removeClass("imageFocus");
                $("#liveChannel-0").addClass('imageFocus');
//                $("#clearSearch").css("display", "block");
                $("#customMessage").hide();
                $("#customMessage").html('');
//                     Player.playStream(playUrl,true);
                  try {
                      var obj = popState();
                           view = obj.view;

                  } catch (e) {}

                  $(".overlay-screen").hide();


       }
     }else if(source == "cancelButtonSort"){
            $("#customMessage").hide();
            $("#customMessage").html('');
            $(".overlay-screen").hide();
            try {
                var obj = popState();
                    view = obj.view;
                    $("#"+obj.focus).addClass('imageFocus');

            } catch (e) {}
     }

}


Keyhandler.searchCategoriesPopUpKeyHandler = function(e){
     var keycode;
	var userAgent = new String(navigator.userAgent);
	if (window.event) {
		keycode = e.keyCode;
	} else if (e.which) {
		keycode = e.which;
	}
     $(".error").html('');
	var index = parseInt($('.imageFocus').attr("index"));
	var id = $('.imageFocus').attr("id");
	var source = $('.imageFocus').attr("source");
	switch (keycode) {
	case tvKeyCode.ArrowLeft: {
               
    			break;
    		}
    	case tvKeyCode.ArrowRight: {
                
    			break;
    		}
	case tvKeyCode.ArrowUp: {
               
			break;
		}

	case tvKeyCode.Return:
    		 {
 	    if(!jQuery('#loading').is(':visible')){
          $("#customMessage").hide();
               $("#customMessage").html('');
               $(".overlay-screen").hide();
               showDateAndTime();

			try {
				var obj = popState();
                    view = obj.view;
                    $("#"+obj.focus).addClass('imageFocus');

			} catch (e) {}

			if (callBack) {
				callBack();
				callBack = '';
          }

          break;
        }
     }
	case tvKeyCode.Enter: {
               Keyhandler.searchCategoriesPopUpKeyEnter($(".imageFocus"));
			break;
		}
	case tvKeyCode.ArrowDown: {
               // if(id == "searchedText"){
               //      $('.imageFocus').removeClass("imageFocus");
               //      $("#searchedText").blur();
               //      $("#searchButton").addClass('imageFocus');
               // }
			break;
		}

	default: {
			break;
		}
	}
}
Keyhandler.searchCategoriesPopUpKeyEnter = function(currFocus){
     var id = currFocus.attr("id");
          var source = $('.imageFocus').attr("source");
      if(source == "cancelButtonSearch"){
               
               $(".overlay-screen").hide();
     
                   $("#customMessage").hide();
                   $("#customMessage").html('');
                   try {
                       var obj = popState();
                           view = obj.view;
                           $("#"+obj.focus).addClass('imageFocus');
     
                   } catch (e) {}
            }
     
     }




Keyhandler.searchPopUpKeyEnter = function(currFocus){
var id = currFocus.attr("id");
     var source = $('.imageFocus').attr("source");

     if(id == "searchedText"){
          $("#"+id).focus();
     }else if(source == "cancelButtonSearch"){
          
          $(".overlay-screen").hide();

              $("#customMessage").hide();
              $("#customMessage").html('');
              try {
                  var obj = popState();
                      view = obj.view;
                      $("#"+obj.focus).addClass('imageFocus');

              } catch (e) {}
       }else{
        if($("#searchedText").val() != ""){

          // alert(JSON.stringify(liveSectionDetailsFullData));
                  var searchedResult = compareStringSearch($("#searchedText").val(),liveSectionDetailsFullData);
                   if(searchedResult.length>0){

                   
                  liveSectionDetails = searchedResult;
                  liveSectionDetails.category = liveSectionDetailsFullData.category;

                  liveSectionDefaultWithoutSorting = '';
                  liveSectionDefaultWithoutSortingCategories = '';

                  liveSectionDefaultWithoutSortingCategories = JSON.stringify(liveSectionDetails.category);
                  liveSectionDefaultWithoutSorting = JSON.stringify(liveSectionDetails);

                   var searchedResultText = liveSectionDetails.length+" result(s) found for '<b style='color: orange;'>"+$("#searchedText").val()+"</b>'";


                  if(liveSectionDetails.length>0){
                   $("#searchResultLive").html(searchedResultText);
                                        $("#searchResultLive").show();
//                     $("#mainContent").html('');
//                     $("#mainContent").html(Util.liveDetailsPage());

                $(".liveChannels").html('');
                $(".liveChannels").html(Util.updateSectionCat($('.imageFocus').attr('id')));

                 Main.fetchAccToSortingLive();
 
                loadLiveData(liveSectionDetails);

                        $(".imageFocus").removeClass("imageFocus");
                      $("#liveChannel-0").addClass('imageFocus');
                      $("#clearSearch").css("display", "block");
                      $("#customMessage").hide();
                        $("#customMessage").html('');


//         Player.playStream(playUrl,true);

                  $(".overlay-screen").hide();

                        try {
                            var obj = popState();
                                 view = obj.view;

                        } catch (e) {}

                  }else{
                      $(".error").html("No Channel Found.");
                  }
               }else{
                    $(".error").html("No Channel Found.");
                }


        }  else{
                $(".error").html("Please search any channel.");
           }



     }

}

Keyhandler.enterPinMultiScreenKeyEnter = function(currFocus){
     var id = currFocus.attr("id");
     if(id == "pin"){
          $("#"+id).focus();
     }
     else{
          if($("#pin").val() == parentPin){
               $(".overlay-screen").hide();
               pinEntered = true;
               
               $("#customMessage").hide();
               $("#customMessage").html('');
               $(".overlay-screen").hide();

			try {
				var obj = popState();
                    view = obj.view;
                    $("#"+obj.focus).addClass('imageFocus');
			} catch (e) {}

               // alert(openedMultiScreen);

               if(openedMultiScreen == "multiscreen1"){
                    multiscreen1Fun();
               }else if(openedMultiScreen == "multiscreen2"){
                    multiscreen2Fun();
               }else if(openedMultiScreen == "multiscreen3"){
                    multiscreen3Fun();
               }else if(openedMultiScreen == "multiscreen4"){
                    multiscreen4Fun();
               }
               // alert("testing");

			// $(".playerReconnecting").html('').hide();
               //   $("#notification").html('').hide();

               //   removeAndInitializePlayer();

               //      player.addPlaylist({
               //                title: Player.data.name,
               //                url: LiveVideoLink,
               //                crop: "16:9"
               //      });
               
               //      // alert("honey:with_parental");
               //      setTimeout(function() {
			// 				$("#player-wrapper .wcp-toolbar:last").append('<div class="wcp-button wcp-right" onclick="aspectRatio(0);"> <img src="images/aspect-ratio.png" class="aspect-ratio"/></div><div class="wcp-button wcp-right" onclick="zoomIn(0);"> <img src="images/zoom_in.png" class="aspect-ratio"/></div><input type="text" value="100%" class="zoomin_zoomout_field  wcp-right" id="zoomin_zoomout_field_0" disabled> <div class="wcp-button wcp-right" onclick="zoomOut(0);"> <img src="images/zoom_out.png" class="aspect-ratio"/></div>');

			// 			}, 200);


               //      player.onPosition(function(pos) { 
               //           counter = 0;
               //      clearInterval(reconnectInt);
               //      }); // from 0.0 to 1.0

               //      player.onState(function(state) { 
               //           // console.log("current state: "+state);
               //           if(state == "ended" || state == "error"){
               //                     var showText = 1; 
               //                     $('#videoHtml').css('background', 'black'); 

               //                     player = new wjs("#player-wrapper");
               //                     player.clearPlaylist(); 
               //                     var PlayerDIvSelector = $('#player-wrapper');
               //                     PlayerDIvSelector.removeClass("webchimeras");
               //                     PlayerDIvSelector.html('<div class="erroronplayer"><span>Playback error, reconnects in 5s ('+showText+'/5)</span></div>');

                                   
               //                     jWPlayerReconnect(LiveVideoLink,"new");
               //                     return false;
               //           }
                         
               //      });

                   



          }
          else{
               $(".error").html("Invalid Pin.");
          }
     }
}




Keyhandler.enterPinKeyEnter = function(currFocus){
     var id = currFocus.attr("id");
     if(id == "pin"){
          $("#"+id).focus();
     }
     else{
          if($("#pin").val() == parentPin){
               $(".overlay-screen").hide();
               pinEntered = true;
               
               $("#customMessage").hide();
               $("#customMessage").html('');
               $(".overlay-screen").hide();

			try {
				var obj = popState();
                    view = obj.view;
                    $("#"+obj.focus).addClass('imageFocus');
			} catch (e) {}



			$(".playerReconnecting").html('').hide();
                 $("#notification").html('').hide();

                 removeAndInitializePlayer();
                    player.addPlaylist({
                              title: Player.data.name,
                              url: LiveVideoLink,
                              crop: "16:9"
                    });
               
                    // alert("honey:with_parental");
                    setTimeout(function() {
							$("#player-wrapper .wcp-toolbar:last").append('<div class="wcp-button wcp-right" onclick="aspectRatio(0);"> <img src="images/aspect-ratio.png" class="aspect-ratio"/></div><div class="wcp-button wcp-right" onclick="zoomIn(0);" style="    border-left: 0px;"> <img src="images/zoom_in.png" class="aspect-ratio"/></div><input type="text" value="100%" class="zoomin_zoomout_field  wcp-right" id="zoomin_zoomout_field_0" disabled> <div class="wcp-button wcp-right" onclick="zoomOut(0);"> <img src="images/zoom_out.png" class="aspect-ratio"/></div>');
                                   try{
								if(Player.data.stream_icon){
									$(".channelLogo").show();
									$(".channelLogo").attr("src", Player.data.stream_icon);
									$(".channelLogo").error(function() {$(".channelLogo").hide();}).attr( "src", Player.data.stream_icon );
								}else{
									$(".channelLogo").hide();
								}
							}catch(err){
								$(".channelLogo").hide();
							}
						}, 200);


                    player.onPosition(function(pos) { 
                         counter = 0;
                    clearInterval(reconnectInt);
                    }); // from 0.0 to 1.0

                    player.onState(function(state) { 
                         // console.log("current state: "+state);
                         if(state == "playing"){
                              player.zoom(1);
                         }
                         if(state == "ended" || state == "error"){
                                   var showText = 1; 
                                   $('#videoHtml').css('background', 'black'); 

                                   player = new wjs("#player-wrapper");
                                   player.clearPlaylist(); 
                                   var PlayerDIvSelector = $('#player-wrapper');
                                   PlayerDIvSelector.removeClass("webchimeras");
                                   PlayerDIvSelector.html('<div class="erroronplayer"><span>Playback error, reconnects in 5s ('+showText+'/5)</span></div>');

                                   
                                   jWPlayerReconnect(LiveVideoLink,"new");
                                   return false;
                         }
                         
                    });

                   



          }
          else{
               $(".error").html("Invalid Pin.");
          }
     }
}
Keyhandler.descKeyhandler = function (e) {
	var keycode;
	var userAgent = new String(navigator.userAgent);
	if (window.event) {
		keycode = e.keyCode;
	} else if (e.which) {
		keycode = e.which;
	}

	var index = parseInt($('.imageFocus').attr("index"));
	var id = $('.imageFocus').attr("id");
 
	switch (keycode) {
	case tvKeyCode.ArrowLeft: {

			break;
		}
	case tvKeyCode.ArrowRight: {

			break;
		}
	case tvKeyCode.ArrowUp: {
               if(view == "terms"){
                    if($(".descData").css("margin-top").replace("px","") < 0){
                         $(".descData").css("margin-top",function(i, v) {
                              return (parseFloat(v) + 10) + 'px';
                         });
                    }
               }
			break;
		}
	
	case tvKeyCode.Return:{
	   if(!jQuery('#loading').is(':visible')){
          $(".overlay-screen").hide();
          showDateAndTime();

          if(view == "terms"){
               pushState(view,$(".imageFocus").attr("id"));
               $('.imageFocus').removeClass("imageFocus");
               view = "exitApp";
               $("#genericDiv").html(Util.showPopUp(2,'', "Do you want to Exit the Application ?", "Yes","No"));
               $("#genericDiv").show();
               $("#Btn-0").addClass("imageFocus");
               Main.HideLoading();
          }
          else{
               $("#customMessage").hide();
               $("#customMessage").html('');
               
               try {
                    var obj = popState();
                    view = obj.view;
               } catch (e) {}

               if (callBack) {
                    callBack();
                    callBack = '';
               }
          }
          break;
       }
     }
	case tvKeyCode.Enter: {
               Keyhandler.descKeyEnter();
			break;
		}
	case tvKeyCode.ArrowDown: {
               if(view == "terms"){
                    if($(".descData").css("margin-top").replace("px","") > -4497){
                         $(".descData").css("margin-top",function(i, v) {
                              return (parseFloat(v) - 10) + 'px';
                         });
                    }
               }
			break;
		}

	default: {
			break;
		}
	}
}
Keyhandler.descKeyEnter = function(currFocus){
     $(".overlay-screen").hide();
     if(view == "terms"){
          $("#customMessage").hide();
          $("#customMessage").html('');
          localStorage.setItem("terms",true);
          Main.HideLoading();
          Main.hideSplash();
          localStorage.removeItem('profile');
          view = "signIn";
          Main.processNext();
     }
     else{
          $("#customMessage").hide();
          $("#customMessage").html('');
          try {
               var obj = popState();
               view = obj.view;
          } catch (e) {}

          if (callBack) {
               callBack();
               callBack = '';
          }
     }
}
Keyhandler.sectionKeyHandler = function (e) {
	var keycode;
	var userAgent = new String(navigator.userAgent);
	if (window.event) {
		keycode = e.keyCode;
	} else if (e.which) {
		keycode = e.which;
	}

	var index = parseInt($('.imageFocus').attr("index"));
	var count = parseInt($('.imageFocus').attr("count"));

	var rowIndex = parseInt($('.imageFocus').attr("rowIndex"));
	var rowCount = parseInt($('.imageFocus').attr("rowCount"));

	
	var id = $('.imageFocus').attr("id");

	switch (keycode) {
	case tvKeyCode.ArrowLeft: {

			// if(rowIndex > 0){
			// 	$("#sectionIndex-"+(rowIndex+1)).hide();
			// 	rowIndex--;
			// 	$("#sectionIndex-"+rowIndex).show();
			// }

			// var sectionIndex = rowIndex * 5 + (index );

               // $('.imageFocus').removeClass("imageFocus");
               // $("#sections-"+sectionIndex).addClass('imageFocus');

			break;
		}
	case tvKeyCode.ArrowRight: {

//alert("rowIndex: "+rowIndex);
//alert("rowCount: "+rowCount);
			// if(rowIndex < rowCount){

			// 	$("#sectionIndex-"+(rowIndex-1)).hide();
			// 	rowIndex++;
			// 	$("#sectionIndex-"+rowIndex).show();

			// }
			
               // var sectionIndex = rowIndex * 5 + (index);
               // if(sectionIndex < sectionData.length){
               //      $('.imageFocus').removeClass("imageFocus");
               //      $("#sections-"+sectionIndex).addClass('imageFocus');
               // }
			break;
		}
	case tvKeyCode.ArrowUp: {
		//     var sectionIndex = 0;
		// 	if(index != 0  ){
		// 		index -- ;
		// 		sectionIndex = rowIndex * 5 + (index % 5);
	
		// 		$('.imageFocus').removeClass("imageFocus");
		// 		$("#sections-"+sectionIndex).addClass('imageFocus');
		// 	}
			
			break;
		}
	case tvKeyCode.ArrowDown: {
		// var sectionIndex =  (rowIndex * 5 + (index % 5));
		// if(index < 5 && sectionIndex < count-1){
		// 	index ++ ;
		// 	sectionIndex = rowIndex * 5 + (index % 5);
		// 	$('.imageFocus').removeClass("imageFocus");
		// 	$("#sections-"+sectionIndex).addClass('imageFocus');
		// }

		break;
	}
	case tvKeyCode.Enter:{
		Keyhandler.sectionEnter ($(".imageFocus"));
		break;
	}
	case 8:
	case tvKeyCode.Return:{

	    if(!jQuery('#loading').is(':visible')){

                 if(view == "multiscreenCategoriesSections"){
                    $("#multiscreenCategoriesSections").html("").hide();
                      
                 }else{
                    $("#SingleMoviePage").hide();
                    $("#SingleMoviePage").html('');
                    $(".overlay-screen").hide();

                  }
                 showDateAndTime();

                 try {
                      var obj = popState();
                      view = obj.view;
                       previousFocus = obj.focus;
                 } catch (e) {}

                 Main.processNext();
                 break;
	                    
	        }


	}
	

	default: {
			break;
		}
	}
}


Keyhandler.liveCatchupChannelsKeyHandler = function (e) {
	var keycode;
	var userAgent = new String(navigator.userAgent);
	if (window.event) {
		keycode = e.keyCode;
	} else if (e.which) {
		keycode = e.which;
	}

	var index = parseInt($('.imageFocus').attr("index"));
	var count = parseInt($('.imageFocus').attr("count"));

	var rowIndex = parseInt($('.imageFocus').attr("rowIndex"));
	var rowCount = parseInt($('.imageFocus').attr("rowCount"));


	var id = $('.imageFocus').attr("id");

	switch (keycode) {
	case tvKeyCode.ArrowLeft: {
			if(rowIndex > 0){
				$("#sectionCatchupIndex-"+(rowIndex+1)).hide();
				rowIndex--;
				$("#sectionCatchupIndex-"+rowIndex).show();
			}

			var sectionIndex = rowIndex * 5 + (index );


               $('.imageFocus').removeClass("imageFocus");
               $("#sectionCatchup-"+sectionIndex).addClass('imageFocus');

			break;
		}
	case tvKeyCode.ArrowRight: {
			if(rowIndex < rowCount){

				$("#sectionCatchupIndex-"+(rowIndex-1)).hide();
				rowIndex++;
				$("#sectionCatchupIndex-"+rowIndex).show();

			}

               var sectionIndex = rowIndex * 5 + (index);

               if(sectionIndex < catchUpChannelsData.length){
                    $('.imageFocus').removeClass("imageFocus");
                    $("#sectionCatchup-"+sectionIndex).addClass('imageFocus');
               }
			break;
		}
	case tvKeyCode.ArrowUp: {
		    var sectionIndex = 0;
			if(index != 0  ){
				index -- ;
				sectionIndex = rowIndex * 5 + (index % 5);

				$('.imageFocus').removeClass("imageFocus");
				$("#sectionCatchup-"+sectionIndex).addClass('imageFocus');
			}

			break;
		}
	case tvKeyCode.ArrowDown: {
		var sectionIndex =  (rowIndex * 5 + (index % 5));
		if(index < 5 && sectionIndex < count-1){
			index ++ ;
			sectionIndex = rowIndex * 5 + (index % 5);
			$('.imageFocus').removeClass("imageFocus");
			$("#sectionCatchup-"+sectionIndex).addClass('imageFocus');
		}

		break;
	}
	case tvKeyCode.Enter:{
		Keyhandler.liveCatchupChannelsEnter ($(".imageFocus"));
		break;
	}
	case 8:
	case tvKeyCode.Return:{

	    if(!jQuery('#loading').is(':visible')){
              
              if(view == "liveMultiScreenChannels"){
               $("#multiscreenCategoriesSections").show();
               $("#multiscreenLiveSections").html("").hide();

              }else{
               $("#catchupChannels").hide();
               $("#catchupChannels").html('');
               $(".overlay-screen").hide();
                
             }
             showDateAndTime();

               try {
                    var obj = popState();
                    view = obj.view;
                     previousFocus = obj.focus;
               } catch (e) {}

               Main.processNext();
               break;
              }


	}


	default: {
			break;
		}
	}
}
var sectionsIndex = '';
function include(arr,obj) {
     return (arr.indexOf(obj) != -1);
}


Keyhandler.liveCatchupProgramsKeyHandler = function (e) {
	var keycode;
	var userAgent = new String(navigator.userAgent);
	if (window.event) {
		keycode = e.keyCode;
	} else if (e.which) {
		keycode = e.which;
	}

	var index = parseInt($('.imageFocus').attr("index"));
	var count = parseInt($('.imageFocus').attr("count"));

	var rowIndex = parseInt($('.imageFocus').attr("rowIndex"));
	var rowCount = parseInt($('.imageFocus').attr("rowCount"));
	var role = $('.imageFocus').attr("role");
    var currentPanelID = $('.panel.current').attr("id");

	var id = $('.imageFocus').attr("id");

	switch (keycode) {
	case tvKeyCode.ArrowLeft: {
//alert(role);
        if(role!="catchupSection"){
            var $navlist = $('#navlist');
            var $tabContainer = $('#tab-container');
            var $panels = $('#panels');
                    var arrows = [37, 38, 39, 40];
                       var which = e.which;
                       var target = e.target;
                       if ($.inArray(which, arrows) > -1) {
                         var adjacentTab = findAdjacentTab(target, $navlist, which);

                         if (adjacentTab) {
                           e.preventDefault();
                           adjacentTab.focus();
                           // if desired behavior is that when tab receives focus -> make it the active tab:
                           setActiveAndInactive(adjacentTab, $navlist);
                           $('.imageFocus').removeClass("imageFocus");
                           $(".tabs-view #navlist .active a").focus();
                           $(".tabs-view #navlist .active a").addClass('imageFocus');
                         }
                       } else if (which === 13 || which === 32) { // ENTER |or| SPACE
                         e.preventDefault(); // don't scroll the page around...
                         target.click();
                       } else if (which === 34) { // PAGE DOWN
                         e.preventDefault(); // don't scroll the page
                         var assocPanel = $('#' + this.getAttribute('aria-controls'));
                         if (assocPanel) {
                           assocPanel.focus();
                         }
                       }
        }   else{
            if(rowIndex > 0){
                $("#"+currentPanelID+"-sectionIndexCatchUp-"+(rowIndex+1)).hide();
                rowIndex--;
                $("#"+currentPanelID+"-sectionIndexCatchUp-"+rowIndex).show();
            }

            var sectionIndex = rowIndex * 5 + (index );


//alert("#sections-catchup-"+sectionIndex);
               $('.imageFocus').removeClass("imageFocus");
               $("#"+currentPanelID+"-sections-catchup-"+sectionIndex).addClass('imageFocus');

        }




//			if(rowIndex > 0){
//				$("#sectionCatchupIndex-"+(rowIndex+1)).hide();
//				rowIndex--;
//				$("#sectionCatchupIndex-"+rowIndex).show();
//			}
//
//			var sectionIndex = rowIndex * 5 + (index );
//
//
//               $('.imageFocus').removeClass("imageFocus");
//               $("#sectionCatchup-"+sectionIndex).addClass('imageFocus');

			break;
		}
	case tvKeyCode.ArrowRight: {
        if(role!="catchupSection"){
             var $navlist = $('#navlist');
             var $tabContainer = $('#tab-container');
             var $panels = $('#panels');

	        var arrows = [37, 38, 39, 40];
               var which = e.which;
               var target = e.target;
               if ($.inArray(which, arrows) > -1) {
                 var adjacentTab = findAdjacentTab(target, $navlist, which);

                 if (adjacentTab) {
                   e.preventDefault();
                   adjacentTab.focus();
                   // if desired behavior is that when tab receives focus -> make it the active tab:
                   setActiveAndInactive(adjacentTab, $navlist);
                   $('.imageFocus').removeClass("imageFocus");
                   $(".tabs-view #navlist .active a").focus();
                   $(".tabs-view #navlist .active a").addClass('imageFocus');
                 }
               } else if (which === 13 || which === 32) { // ENTER |or| SPACE
                 e.preventDefault(); // don't scroll the page around...
                 target.click();
               } else if (which === 34) { // PAGE DOWN
                 e.preventDefault(); // don't scroll the page
                 var assocPanel = $('#' + this.getAttribute('aria-controls'));
                 if (assocPanel) {
                   assocPanel.focus();
                 }
               }

        }else{
//alert("rowIndex: "+rowIndex);
//alert("rowCount: "+rowCount);

                if(rowIndex < rowCount){

                    $("#"+currentPanelID+"-sectionIndexCatchUp-"+(rowIndex-1)).hide();
                    rowIndex++;
                    $("#"+currentPanelID+"-sectionIndexCatchUp-"+rowIndex).show();

                }

                   var sectionIndex = rowIndex * 5 + (index);
                   var dateIndex =  $(".tabs-view #navlist .active a").attr("date");
                   if(sectionIndex < archiveArray[dateIndex].length){
                        $('.imageFocus').removeClass("imageFocus");
                        $("#"+currentPanelID+"-sections-catchup-"+sectionIndex).addClass('imageFocus');
                   }
        }
//			if(rowIndex < rowCount){
//
//				$("#sectionCatchupIndex-"+(rowIndex-1)).hide();
//				rowIndex++;
//				$("#sectionCatchupIndex-"+rowIndex).show();
//
//			}
//
//               var sectionIndex = rowIndex * 5 + (index);
//
//               if(sectionIndex < catchUpChannelsData.length){
//                    $('.imageFocus').removeClass("imageFocus");
//                    $("#sectionCatchup-"+sectionIndex).addClass('imageFocus');
//               }
			break;
		}
case tvKeyCode.ArrowUp: {
            if(role!="catchupSection"){

            }else{
                var sectionIndex = 0;
                if(index != 0  ){
                    index -- ;
                    sectionIndex = rowIndex * 5 + (index % 5);

                    $('.imageFocus').removeClass("imageFocus");
                    $("#"+currentPanelID+"-sections-catchup-"+sectionIndex).addClass('imageFocus');
                }else{
                     $('.imageFocus').removeClass("imageFocus");
                    $(".tabs-view #navlist .active a").focus();
                    $(".tabs-view #navlist .active a").addClass('imageFocus');
                }

            }

			break;
		}
	case tvKeyCode.ArrowDown: {
	    if(role!="catchupSection"){
	            var visibleDiv = $('.panel.current').find('div:visible:first').attr("id");
	             $('.imageFocus').removeClass("imageFocus");
	            $('#'+visibleDiv).find('p:visible:first').addClass('imageFocus');
//                alert(visibleDivInner);
//                alert(visibleDivInner);
//
//                $("#"+currentPanelID+"-sections-catchup-0").addClass('imageFocus');
        }else{

            var sectionIndex =  (rowIndex * 5 + (index % 5));
            //		alert("sectionIndex"+ sectionIndex);
    //		alert("index"+ index);
            if(index < 5 && sectionIndex < count-1){
                index ++ ;
                sectionIndex = rowIndex * 5 + (index % 5);
                $('.imageFocus').removeClass("imageFocus");
                $("#"+currentPanelID+"-sections-catchup-"+sectionIndex).addClass('imageFocus');
            }
        }



		break;
	}
	case tvKeyCode.Enter:{
		Keyhandler.liveCatchupProgramsEnter ($(".imageFocus"));
		break;
	}
	case 8:
	case tvKeyCode.Return:{

	    if(!jQuery('#loading').is(':visible')){
	                    $("#catchupPrograms").hide();
            			$("#catchupPrograms").html('');
                           $("#catchupChannels").show();
                           $(".overlay-screen").hide();
                           showDateAndTime();


            			try {
            				var obj = popState();
            				view = obj.view;
//            				alert(view);
            				 previousFocus = obj.focus;
            			} catch (e) {}

            			Main.processNext();
            			break;
	        }


	}


	default: {
			break;
		}
	}
}


Keyhandler.liveCatchupProgramsEnter = function(currFocus){
    var role = currFocus.attr("role");

    if(role=="catchupSection"){
        var startDateTime = currFocus.attr("starttime");
        var stopDateTime = currFocus.attr("stoptime");
        var stream_id = currFocus.attr("streamid");
        var programName = currFocus.attr("programname");
        var startDateTimeWithoutSpace = startDateTime.replace(" ", ":");

        var diff = ( new Date(stopDateTime) - new Date(startDateTime) ) / 1000 / 60 ;

     if(Main.profile.server_info.server_protocol!="" && Main.profile.server_info.server_protocol == "https"){
          playUrl = "https://" + Main.profile.server_info.url + ":"+  Main.profile.server_info.https_port+"/timeshift/"+Main.profile.user_info.username+"/"+Main.profile.user_info.password+"/"+diff+"/"+startDateTimeWithoutSpace+"/"+stream_id+selectedContainer;
     }else{
          playUrl = "http://" + Main.profile.server_info.url + ":"+  Main.profile.server_info.port+"/timeshift/"+Main.profile.user_info.username+"/"+Main.profile.user_info.password+"/"+diff+"/"+startDateTimeWithoutSpace+"/"+stream_id+selectedContainer;
     }



         hideValues();
        $("#catchupChannels").hide();
     //    $("#catchupPrograms").hide();
        pushState(view,$('.imageFocus').attr('id'));

     //    $("#HTML5Div").html(Util.fullScreenCatchUpPage(programName));
        view = "catchupPlayer"; 

     //      var player = new wjs("#player-wrapper").addPlayer(conf);

	// 	player.addPlaylist({
	// 			title: Player.data.name,
	// 			// url: "http://asdfasdf.com",
	// 			url: playUrl,
	// 			crop: "16:9"
     //      });
          

     //    $("#HTML5Div").show();

          Player.type = "catchup";
          Player.name = programName;
          // Player.data.name = ;
           
          $("#catchupContainer").css("opacity","0.2");
          $("#HTML5Div").html(Util.fullScreenCatchupPage());
          $("#HTML5Div").css({"float":"left","width":"100%","height":"100%","z-index":"9999","position":"fixed"});

          // view = "seriesPlayer";
          // Player.playStream(playUrl,true);
          setTimeout(function() { 
               Player.set_flowplayer(playUrl,true); 
          }, 200);

          
          $("#HTML5Div").show();
    }







}

Keyhandler.liveCatchupChannelsEnter = function(currFocus){
            var stream_id = currFocus.attr("stream_id");
            Main.getTVArchive('get_simple_data_table',stream_id);
//            Main.HideLoading();
//            pushState(view,$(".imageFocus").attr("id"));
//            $(".imageFocus").removeClass("imageFocus");
//            view = "liveCatchupPrograms";
//            $("#catchupPrograms").html(Util.listCatchUpProgramsPage());
//            $("#catchupPrograms").show();
}

var adultArray = ['adult','xxx','porn','sex','adults'],pinEntered = false;
var allChannelsMoviesSeriesWithCat = '';

Keyhandler.sectionEnter = function(currFocus){
	// var index = parseInt(currFocus.attr("index"));
	// var count = parseInt(currFocus.attr("count"));

	// var rowIndex = parseInt(currFocus.attr("rowIndex"));
	var actualIndex = parseInt(currFocus.attr("rowIndex"));
	// var rowCount = parseInt(currFocus.attr("rowCount"));
     var action = currFocus.attr("action");
     var sectionType = currFocus.attr("sectionType");
     var source = currFocus.attr("source");
     // alert(source);
     if(source =="searchIcon"){
          if(sectionType == "live"){
               showSearchModal("searchLiveCategories");
          }else if(sectionType == "vod"){
               showSearchModal("searchMoviesCategories");
          }else if(sectionType == "series"){
               showSearchModal("searchSeriesCategories");
          }else if(sectionType == "catchup"){
               showSearchModal("searchCatchupCategories");
          }
      }else if(source == "clearSearchIcon"){
          if(sectionType == "live"){
               clearSearchedRecords("liveCategories");
          }else if(sectionType == "vod"){
               clearSearchedRecords("MoviesCategories"); 
          }else if(sectionType == "series"){
               clearSearchedRecords("SeriesCategories");
          }else if(sectionType == "catchup"){
               clearSearchedRecords("CatchupCategories");
          }
     }else{
          // alert(action);
          if(action == "get_live_categories") action = "get_live_streams";
          else if(action == "get_vod_categories") action = "get_vod_streams";
          else if(action == "get_series_categories") action = "get_series";
     
          // var actualIndex = (rowIndex * 5) + index;
     
          var categ = currFocus.attr("categ");
          sectionsIndex = actualIndex;
     
          // var temp = sectionData[sectionsIndex].category_name.split(" ");
     
          var flag = false;
          var ajaxChecked = false;
     
     
     
     
     // var cID="";
          var cName="";
          var cID="";
          var flag = false;
          var typeofCase = '';
     //     openedMovieID = id;
     
          Main.ShowLoading();
      
          // alert("sectionType:"+sectionType);
          if(sectionType !="live" && sectionType !="catchup" && sectionType!="multiscreen"){
             if(parentPin){
             //        for(var i= 0 ;i<vodSectionDetails.length;i++){
             //            if(vodSectionDetails[i].stream_id == id){
             //               cID = vodSectionDetails[i].category_id;
             //               break;
             //            }
             //        }
     
                      if(categ!="" && categ == "ALL"){
                         typeofCase = "ALL";
                         for(var j=0;j<sectionData.length;j++){
                                 if(compareString(sectionData[j].category_name,adultArray)){
                                        openedMovieCatID = categ;
                                        openedSectionAction = action;
                                        flag = true;
                                        Main.HideLoading();
                                        pushState(view,$(".imageFocus").attr("id"));
                                        $(".imageFocus").removeClass("imageFocus");
                                        view = "enterPinMoviesCategories";
                                        $("#customMessage").html(Util.confirmPin());
                                        $("#customMessage").show();
                                        break;
     
                                 }
                         }
                      }else if(categ!="" && categ == "FAVOURITE"){
                             typeofCase = "FAVOURITE";
                             if(action == "get_series"){
                                  var allSeriesFavourites = JSON.parse(localStorage.getItem("allSeriesFavourites"));
                                                            //  console.log(allSeriesFavourites);
     
                                       if(allSeriesFavourites !== null) {
                                         for(var j=0;j<allSeriesFavourites.length;j++){
                                                if(allSeriesFavourites[j][0] == Main.profile.user_info.login_url){
                                                    var items =  allSeriesFavourites[j][1];
                                                }
                                         }
                                       }
     //                             var items = JSON.parse(localStorage.getItem('favSeriesList'));
                             }else{
                                     var allMoviesFavourites = JSON.parse(localStorage.getItem("allMoviesFavourites"));
                                                       //   console.log(allMoviesFavourites);
     
                                   if(allMoviesFavourites !== null) {
                                     for(var j=0;j<allMoviesFavourites.length;j++){
                                            if(allMoviesFavourites[j][0] == Main.profile.user_info.login_url){
                                                var items =  allMoviesFavourites[j][1];
                                            }
                                     }
                                   }
     //                             var items = JSON.parse(localStorage.getItem('favMoviesList'));
                             }
                             if(items !== null && items !== undefined && items.length>0){
                                   //  alert(items);
                                     for(var j=0;j<sectionData.length;j++){
                                             if(compareString(sectionData[j].category_name,adultArray)){
                                                 cName = sectionData[j].category_name;
                                                 cID = sectionData[j].category_id;
                                                 break;
                                             }
                                     }
                                   //   alert(cName);
                                     if(cName!=""){
                                        ajaxChecked = true; 
                                        ajaxGetCatDetails(action,cID,items,categ);
                                      }else{
                                         //alert("no category found");
                                     }
                             }else{
             //                     Main.HideLoading();
             //                     Main.showFailure("No Favourite Found.");
                             }
     
                      }else if(categ!=""){
                         typeofCase ="Any";
                         for(var j=0;j<sectionData.length;j++){
                             if(sectionData[j].category_id == categ){
                                 cName = sectionData[j].category_name;
                                break;
                             }
     
                         }
                      }
     
                     if(typeofCase == "Any"){
                         if(cName!="" && parentPin){
                            if(compareString(cName,adultArray)){
                                 openedMovieCatID = categ;
                                 openedSectionAction = action;
     
                                 flag = true;
             //                    alert("locked movie");
                                 Main.HideLoading();
     
                                 pushState(view,$(".imageFocus").attr("id"));
                                 $(".imageFocus").removeClass("imageFocus");
                                 view = "enterPinMoviesCategories";
                                 $("#customMessage").html(Util.confirmPin());
                                 $("#customMessage").show();
     
                            }
     
                         }
                     }
     
                 }
          }
      
          if(!ajaxChecked){
             if(!flag){
                 if(action == "get_vod_streams" || action =="get_series"){
                         Main.getVodDetails(action,categ);
                  }
             }
     
          }
          if(!flag){
               if(currentAPPType == "m3u"){
//                  alert("abc");
//                  alert(playlistItemArrayTemp.length);
                    allChannelsMoviesSeriesWithCat = [];
                    allChannelsMoviesSeriesWithCat = _.groupBy(playlistItemArrayTemp, 'category_id');

                    // console.log(JSON.stringify(allChannelsMoviesSeriesWithCat[categ]));
                    // console.log(categ);

//                  console.log(JSON.stringify(testingArray));
//                  alert(testingArray[categ].length);
                         

                         if(categ == "FAVOURITE"){
                                  var allLiveFavourites = JSON.parse(localStorage.getItem("allM3UFavourites"));
                                  if(allLiveFavourites !== null) {
                                   for(var j=0;j<allLiveFavourites.length;j++){
                                          if(allLiveFavourites[j][0] == Main.profile.m3uLine){
                                              var items =  allLiveFavourites[j][1];
                                          }
                                   }
                                   if(items !== null && items !== undefined && items.length>0){

                                        if(playlistItemArrayTemp!==null && playlistItemArrayTemp.length>0){ 
                                                  var obj = [];
                                                  for(var i=0;i<playlistItemArrayTemp.length;i++){
                                                       if(items!=null && jQuery.inArray(playlistItemArrayTemp[i].url, items) != -1) {
                                                            obj.push(playlistItemArrayTemp[i]);
                                                       }
                                                  }
                                                  Main.HideLoading(); 
                                                  if(obj!==null && obj.length>0){
                                                       loadLivePageData(obj,false);
                                                  }else{
                                                       Main.HideLoading();
                                                       Main.showFailure("No Favourite Found.");
                                                  }
                                                  
                                         }else{
                                             Main.HideLoading();
                                             Main.showFailure("No Favourite Found.");
                                         }
                                    }else{
                                        Main.HideLoading();
                                        Main.showFailure("No Favourite Found.");
                                    }
                                 }else{
                                   Main.HideLoading();
                                   Main.showFailure("No Favourite Found.");
                                 }
                   
                              

                         }else if(categ == "ALL"){
                              Main.HideLoading();
                              // console.log(playlistItemArrayTemp);
                              if(playlistItemArrayTemp!==null && playlistItemArrayTemp.length>0){ 
                                   loadLivePageData(playlistItemArrayTemp,false,sectionType);
                              }else{
                                   Main.HideLoading();
                                   Main.showFailure("No Record Found.");
                              }
                         }else{
                              Main.HideLoading();
                              loadLivePageData(allChannelsMoviesSeriesWithCat[categ],false,sectionType);
                         }


               }else{
                    if(action == "get_live_streams"){
                         Main.getLiveDetails(action,categ,false,sectionType);
                    }
               }
          }
      }


    

     
	
}

Keyhandler.vodMoviesKeyhandler = function (e) {
	var keycode;
	var userAgent = new String(navigator.userAgent);
	if (window.event) {
		keycode = e.keyCode;
	} else if (e.which) {
		keycode = e.which;
	}
	
	var index = parseInt($('.imageFocus').attr("index"));
	
	var id = $('.imageFocus').attr("id");
	var count = parseInt($('.imageFocus').attr("count"));
	var source = $('.imageFocus').attr("source");

	var v_index = parseInt($('.imageFocus').attr("v_index"));
	var h_index = parseInt($('.imageFocus').attr("h_index"));

	switch (keycode) {
	case tvKeyCode.ArrowLeft: {
	     //   if(source == "searchIcon"){
	     //            if($('#clearSearch').is(":visible")){
          //               $('.imageFocus').removeClass("imageFocus");
          //               $("#clearSearch").addClass("imageFocus");
          //           }
          //  }else if(source == "sortIcon"){
          //           $('.imageFocus').removeClass("imageFocus");
          //           $("#searchIcon").addClass("imageFocus");
          //  }else{
          //       if(source != "topMenu"){

          //               if(h_index > 0){
          //                   h_index--;
          //                   $('.imageFocus').removeClass("imageFocus");
          //                   $('#vodMovies-'+v_index+"-"+h_index).addClass("imageFocus");
          //               }
          //       }
          //  }

		
			
			break;
		}
	case tvKeyCode.ArrowRight: {
          //  if(source == "clearSearchIcon"){
          //       $('.imageFocus').removeClass("imageFocus");
          //       $(".searchIcon").addClass("imageFocus");
          //  }else if(source == "searchIcon"){
          //       $('.imageFocus').removeClass("imageFocus");
          //       $(".sortIcon").addClass("imageFocus");
          //  }else{

          //       if(source != "topMenu"){
          //                 var rowData = (v_index * 5) + h_index;
          //                 if(rowData < (count-1))
          //  			if(h_index < 4){
          //  				h_index++;
          //  				$('.imageFocus').removeClass("imageFocus");
          //  				$('#vodMovies-'+v_index+"-"+h_index).addClass("imageFocus");
          //  			}

          //  		}
          //  }

		break;
		}
	case tvKeyCode.ArrowUp: {
			// if(source != "topMenu"){
			// 	if(v_index > 0){
			// 		$("#moviesList").prepend(Util.addMovieRow((v_index-1)));
			// 		$("#vodRow-"+(v_index-1)).show();
			// 		v_index --;
			// 		$('.imageFocus').removeClass("imageFocus");
			// 		$('#vodMovies-'+v_index+"-"+h_index).addClass("imageFocus");
			// 		$("#vodRow-"+(v_index+2)).remove();
			// 	}else if(source == "searchIcon"){

			// 	}else if(source == "sortIcon"){

               //  }else if(source == "clearSearchIcon"){

               //  }else{
               //       $('.imageFocus').removeClass("imageFocus");
               //       $(".sortIcon").addClass("imageFocus");

               //  }
				
			// }
			break;
		}
	case tvKeyCode.Enter: {
			Keyhandler.vodMovieKeyEnter($('.imageFocus'));
			break;
		}
	case tvKeyCode.ArrowDown: {
		// var id = $('.imageFocus').attr("id");
		// if(id == "searchIcon" || id == "clearSearch" || id == "sortIcon"){
		//     $('.imageFocus').removeClass("imageFocus");
          //   $('#vodMovies-0-0').addClass("imageFocus");

		// }else{
          //   if(v_index < (count/5)-1){
          //       $("#vodRow-"+(v_index)).remove();
          //       v_index ++;
          //       $('.imageFocus').removeClass("imageFocus");

          //       if((v_index * 5)+h_index < count-1 )
          //           $('#vodMovies-'+v_index+"-"+h_index).addClass("imageFocus");
          //       else
          //           $('#vodMovies-'+v_index+"-"+ ( (count-1) % 5)).addClass("imageFocus");



          //       $("#moviesList").append(Util.addMovieRow((v_index+1)));
          //       $("#vodRow-"+(v_index+1)).show();
          //   }
		// }

			break;
          }
     case 8:
	case tvKeyCode.Return: {

	    if(!jQuery('#loading').is(':visible')){
          if($("#clearSearch").is(":visible")){
               clearSearchedRecords("movies");
               break;
          }
          if($("#pageViewALL").is(":visible")){
               clearSearchedRecords("movies");
               break;
          }

          $("#mainContent").html("");
          showDateAndTime();

          try {
               var obj = popState();
               view = obj.view;
               previousFocus = obj.focus;
               //previousFocus = '';
          } catch (e) {}
          
          Main.processNext();
          break;
        }
			
	}
	default: {
			break;
		}
	}
}
var singleMovieFocus = '';

Keyhandler.tvshowDetailsKeydown = function(e){
     var keycode;
	var userAgent = new String(navigator.userAgent);
	if (window.event) {
		keycode = e.keyCode;
	} else if (e.which) {
		keycode = e.which;
	}
	
	
	
	var id = $('.imageFocus').attr("id");
	var count = parseInt($('.imageFocus').attr("count"));
	var source = $('.imageFocus').attr("source");

	var v_index = parseInt($('.imageFocus').attr("v_index"));
     var h_index = parseInt($('.imageFocus').attr("h_index"));
     
     var index = parseInt($('.imageFocus').attr("index"));
     
     switch (keycode) {
	case tvKeyCode.ArrowLeft: {
               // if(source == "related"){
               //      if(h_index > 0){
               //           h_index --;
               //           $('.imageFocus').removeClass("imageFocus");
               //           $("#relMovies-0-"+h_index).addClass("imageFocus");
               //           $("#relMovies-0-"+h_index).parent().parent().show();
               //      }
               // }else if(source == "favButton"){
               //      $('.imageFocus').removeClass("imageFocus");
               //      $("#seasonSelector").addClass("imageFocus");
               // }
			break;
		}
	case tvKeyCode.ArrowRight: {
		// if(source == "related"){
          //      if(h_index < 14){
          //           h_index ++;
          //           $('.imageFocus').removeClass("imageFocus");
          //           $("#relMovies-0-"+h_index).addClass("imageFocus");
          //           if(h_index > 4){
          //                $("#relMovies-0-"+(h_index-5)).parent().parent().hide();
          //           }
          //      }
          // }else if(source == "seasonSelector"){
          //       $('.imageFocus').removeClass("imageFocus");
          //       $("#removeFromFavSeries").addClass("imageFocus");
          //       $("#addToFavSeries").addClass("imageFocus");
          // }
		break;
		}
	case tvKeyCode.ArrowUp: {
               // if(source == "seasonSelector" || source == "favButton"){
               //      TweenMax.to($(".singleRow"), 0.4, {
               //           top : 0,
               //           ease : Power1.easeInOut
               //      });
               //      singleMovieFocus =  $('.imageFocus').attr("id");
               //      $('.imageFocus').removeClass("imageFocus");
               //      $(".playSingle").addClass("imageFocus");
               // }
               // else if(source == "episodes"){
               //      if(index > 0){
               //           index--;
               //           $('.imageFocus').removeClass("imageFocus");
               //           $("#tvEpisode-"+index).addClass("imageFocus");
               //           $("#tvEpisode-"+index).show();
                         
               //      }
               //      else {
               //           if($("#seasonSelector").text() != "No Episodes Found."){
               //                $('.imageFocus').removeClass("imageFocus");
               //                $("#seasonSelector").addClass("imageFocus");
               //           }
               //      }
                  
               // }
			break;
		}
	case tvKeyCode.Enter: {
               Keyhandler.tvshowDetailsKeyEnter($(".imageFocus"));
			break;
		}
	case tvKeyCode.ArrowDown: {

               // if(source == "playButton"){
               //      if($("#seasonSelector").text() != "No Episodes Found."){
               //           TweenMax.to($(".singleRow"), 0.4, {
               //                top : -380,
               //                ease : Power1.easeInOut
               //           });
               //           $('.imageFocus').removeClass("imageFocus");
               //           $("#seasonSelector").addClass("imageFocus");
               //      }
               // }
               // else if(source == "seasonSelector" || source == "favButton"){
               //      $('.imageFocus').removeClass("imageFocus");
               //      $("#tvEpisode-0").addClass("imageFocus");
               // }
               // else{
               //      if(index < (count-1)){
               //           index++;
               //           $('.imageFocus').removeClass("imageFocus");
               //           $("#tvEpisode-"+index).addClass("imageFocus");

               //           if(index >= 2){
               //                $("#tvEpisode-"+(index-2)).hide();
               //           }
               //      }
               // }
			break;
          }
     case 8:
	case tvKeyCode.Return: {
         
         // $("#channelContent").html("");
         if(!jQuery('#loading').is(':visible')){
          clearInterval(intervalTesting);
          $(".overlay-screen").hide();
          showDateAndTime();

          try {
               var obj = popState();
               view = obj.view;
               previousFocus = obj.focus;
          } catch (e) {}
          singleMovieFocus = '';
          Main.processNext();
          break;
        }
			
	}
	default: {
			break;
		}
	}
}
Keyhandler.tvshowDetailsKeyEnter = function(currFocus){
	var id = currFocus.attr("id");
	var count = parseInt(currFocus.attr("count"));
	var source = currFocus.attr("source");

	var v_index = parseInt(currFocus.attr("v_index"));
     var h_index = parseInt(currFocus.attr("h_index"));
     
     var index = parseInt(currFocus.attr("index"));
     var season = parseInt(currFocus.attr("season"));

     if(id == "seasonSelector"){
          Main.ShowMenu(season);
     }else if(source == "favButton"){
                 jQuery("#"+id).trigger("click");
      }else{
           
          if(id=="btnPlayTrailer"){
               // alert(openedMovieTrailer);
               if (view != "seriesPlayer")
               pushState(view, $(".imageFocus").attr("id"));
               view = "seriesPlayer";
          
     
               hideValues();
               $("#SingleMoviePage").show();
     
               // var container = openedMovieExtension;
               Player.type = "series";
               Player.data = seriesPage.info;
               Player.data.name = openedMovieName;
               // alert(openedMovieName);

               $("#moviesPageBackground").css("opacity","0.2");
               $("#HTML5Div").html(Util.fullScreenMovieTrailer());
               
               $("#HTML5Div").css({"float":"left","width":"100%","height":"100%","z-index":"9999","position":"relative"});
     
               // view = "seriesPlayer";
               // Player.playStream(playUrl,true);
               // setTimeout(function() { 
               //      Player.set_flowplayer(playUrl,true); 
               // }, 200);
     
               
               $("#HTML5Div").show();
               Main.HideLoading();
          }else{
                

               if(seriesPage.episodes){
                    if (view != "seriesPlayer")
                    pushState(view, $(".imageFocus").attr("id"));
                    view = "seriesPlayer";
               
     
                         
                    hideValues();
                    $("#SingleMoviePage").show();
                    var season = parseInt($("#seasonSelector").text().replace("Season - ",""));
                    var container = seriesPage.episodes[season][index].container_extension;
                    Player.type = "series";
                    Player.data = seriesPage.episodes[season][index].info;
                    Player.data.name = seriesPage.episodes[season][index].title;
                    // $("#SingleMoviePage").hide();
                    if(Main.profile.server_info.server_protocol!="" && Main.profile.server_info.server_protocol == "https"){
                         playUrl = "https://" + Main.profile.server_info.url + ":"+  Main.profile.server_info.https_port+"/series/"+Main.profile.user_info.username+"/"+Main.profile.user_info.password+"/"+seriesPage.episodes[season][index].id+"."+container;
                    }else{
                         playUrl = "http://" + Main.profile.server_info.url + ":"+  Main.profile.server_info.port+"/series/"+Main.profile.user_info.username+"/"+Main.profile.user_info.password+"/"+seriesPage.episodes[season][index].id+"."+container;
                    }

                    $("#moviesPageBackground").css("opacity","0.2");
                    $("#HTML5Div").html(Util.fullScreenMoviePage());
                    $("#HTML5Div").css({"float":"left","width":"100%","height":"100%","z-index":"9999","position":"fixed"});
     
                    // view = "seriesPlayer";
                    // Player.playStream(playUrl,true);
                    setTimeout(function() { 
                         Player.set_flowplayer(playUrl,true); 
                    }, 200);
     
                    
                    $("#HTML5Div").show();
                    Main.HideLoading();
               }
     
               

          }


         
          
      }
     // else if(source != "playButton"){
     //      if(seriesPage.episodes){
     //           var season = parseInt($("#seasonSelector").text().replace("Season - ",""));
     //           var container = seriesPage.episodes[season][index].container_extension;
     //           Player.type = "series";
     //           Player.data = seriesPage.episodes[season][index].info;
     //           Player.data.name = seriesPage.episodes[season][index].title;
     //           playUrl = Main.profile.server_info.server_protocol + "://" + Main.profile.server_info.url + ":"+  Main.profile.server_info.port+"/series/"+Main.profile.user_info.username+"/"+Main.profile.user_info.password+"/"+seriesPage.episodes[season][index].id+"."+container;
     //           hideValues();
     //           $("#SingleMoviePage").hide();
     //           $("#HTML5Div").html(Util.fullScreenMoviePage());
     //           view = "seriesPlayer";
     //           Player.playStream(playUrl,false);
     //           $("#HTML5Div").show();

     //      }
          
     // }
     // else{
     //      var season = parseInt($("#seasonSelector").text().replace("Season - ",""));
     //      var container = seriesPage.episodes[season][0].container_extension;
     //      Player.type = "series";
     //      Player.data = seriesPage.episodes[season][0].info;
     //      Player.data.name = seriesPage.episodes[season][0].title;
     //      playUrl = Main.profile.server_info.server_protocol + "://" + Main.profile.server_info.url + ":"+  Main.profile.server_info.port+"/series/"+Main.profile.user_info.username+"/"+Main.profile.user_info.password+"/"+seriesPage.episodes[season][0].id+"."+container;
          
     //      hideValues();
     //      $("#SingleMoviePage").hide();
     //      $("#HTML5Div").html(Util.fullScreenMoviePage());
     //      view = "seriesPlayer";
     //      Player.playStream(playUrl,false);
     //      $("#HTML5Div").show();

     // }
}
Keyhandler.seasonsListKeyhandler = function (e) {
	var keycode;
	var userAgent = new String(navigator.userAgent);
	if (window.event) {
		keycode = e.keyCode;
	} else if (e.which) {
		keycode = e.which;
	}
	hoverOn = false;
	var source = $('.imageFocus').attr("source");
	var id = $('.imageFocus').attr("id");

	var index = parseInt($('.imageFocus').attr("index"));
	var count =  parseInt($('.imageFocus').attr("count"));

	switch (keycode) {
	case tvKeyCode.ArrowLeft: {

			break;
		}
	case tvKeyCode.ArrowRight: {

			break;
		}
	case tvKeyCode.ArrowUp: {
		if(index > 0){
			index--;
			$('.imageFocus').removeClass("imageFocus");
			$('#ssList-'+index).addClass('imageFocus');
		}
			break;
		}
	case tvKeyCode.Enter: {
			Keyhandler.seasonsListEnter($(".imageFocus"));
			break;
		}
	case tvKeyCode.ArrowDown: {
		if(index < count-1){
			index++;
			$('.imageFocus').removeClass("imageFocus");
			$('#ssList-'+index).addClass('imageFocus');
		}
			break;
		}
	case tvKeyCode.Return:
	case 8: {
	       if(!jQuery('#loading').is(':visible')){
			$("#customMessage").hide();
               $("#customMessage").html("");
               $(".overlay-screen").hide();
               showDateAndTime();

			var obj = popState();
			view = obj.view;
			previousFocus = obj.focus;
			Main.processNext();
			break;
		  }
		}
	default: {
			break;
		}
	}

}
Keyhandler.seasonsListEnter = function(currFocus){
	
	Main.ShowLoading();
	var id = currFocus.attr("id");
	var season = parseInt(currFocus.text().replace("Season - ",""));
     //season -= 1;

	$("#customMessage").hide();
     $("#customMessage").html("");
     $(".overlay-screen").hide();

	var obj = popState();
	view = obj.view;
     previousFocus = obj.focus;
     $("#seasonSelector").attr("season",season);
     Main.updateEpisodes(season);

     $("#episodesTab").click();

     //Main.processNext();
     
     // $('#moviesPageBackground').animate({
     //      scrollTop: $(".scrollClass").offset().top
     //  }, 2000);

	Main.HideLoading();
}


Keyhandler.singleCastKeydown = function(e){
     var keycode;
	var userAgent = new String(navigator.userAgent);
	if (window.event) {
		keycode = e.keyCode;
	} else if (e.which) {
		keycode = e.which;
	}
	
	// var index = parseInt($('.imageFocus').attr("index"));
	
	// var id = $('.imageFocus').attr("id");
	// var count = parseInt($('.imageFocus').attr("count"));
	// var source = $('.imageFocus').attr("source");

	// var v_index = parseInt($('.imageFocus').attr("v_index"));
	// var h_index = parseInt($('.imageFocus').attr("h_index"));

	switch (keycode) {
	case tvKeyCode.ArrowLeft: { 
			break;
		}
	case tvKeyCode.ArrowRight: { 
		break;
		}
	case tvKeyCode.ArrowUp: { 
			break;
		}
	case tvKeyCode.Enter: {
               // Keyhandler.singleMovieKeyEnter($(".imageFocus"));
			break;
		}
	case tvKeyCode.ArrowDown: { 

			break;
          }
     case 8:
	case tvKeyCode.Return: {
          
	    if(!jQuery('#loading').is(':visible')){

          if($("body").hasClass("mfp-zoom-out-cur")){
               $(".mfp-close").trigger('click');
               break;
          }
              
          clearInterval(intervalTesting);
          $(".overlay-screen").hide();
          showDateAndTime();

          // alert("aaa");
          $("#SingleCastPage").html("");
          try {
               var obj = popState();
               view = obj.view;
               previousFocus = obj.focus;
          } catch (e) {}
          singleMovieFocus = '';
          Main.processNext();
          break;
        }
			
	}
	default: {
			break;
		}
	}
}

Keyhandler.singleMovieKeydown = function(e){
     var keycode;
	var userAgent = new String(navigator.userAgent);
	if (window.event) {
		keycode = e.keyCode;
	} else if (e.which) {
		keycode = e.which;
	}
	
	var index = parseInt($('.imageFocus').attr("index"));
	
	var id = $('.imageFocus').attr("id");
	var count = parseInt($('.imageFocus').attr("count"));
	var source = $('.imageFocus').attr("source");

	var v_index = parseInt($('.imageFocus').attr("v_index"));
	var h_index = parseInt($('.imageFocus').attr("h_index"));

	switch (keycode) {
	case tvKeyCode.ArrowLeft: {
               // if(source == "related"){
               //      if(h_index > 0){
               //           h_index --;
               //           $('.imageFocus').removeClass("imageFocus");
               //           $("#relMovies-0-"+h_index).addClass("imageFocus");
               //           $("#relMovies-0-"+h_index).parent().parent().show();
               //      }
               // }
			break;
		}
	case tvKeyCode.ArrowRight: {
		// if(source == "related"){
          //      if(h_index < (singleMovieRelatedData.length-1)){
          //           h_index ++;
          //           $('.imageFocus').removeClass("imageFocus");
          //           $("#relMovies-0-"+h_index).addClass("imageFocus");
          //           if(h_index > 4){
          //                $("#relMovies-0-"+(h_index-5)).parent().parent().hide();
          //           }
          //      }
          // }
		break;
		}
	case tvKeyCode.ArrowUp: {
               // if(source == "related"){
               //      singleMovieFocus =  $('.imageFocus').attr("id");
               //      $('.imageFocus').removeClass("imageFocus");
               //      $("#removeFromFavMovie").addClass("imageFocus");
               //      $("#addToFavMovie").addClass("imageFocus");
                    
               // }else if(source == "favButton"){
               //    TweenMax.to($(".singleRow"), 0.4, {
               //                             top : 0,
               //                             ease : Power1.easeInOut
               //                        });
               //    $('.imageFocus').removeClass("imageFocus");
               //    $(".playSingle").addClass("imageFocus");
               //    $(".bottomDiv").show();
               // }
			break;
		}
	case tvKeyCode.Enter: {
               Keyhandler.singleMovieKeyEnter($(".imageFocus"));
			break;
		}
	case tvKeyCode.ArrowDown: {
               // if(source == "playButton"){
               //      TweenMax.to($(".singleRow"), 0.4, {
               //           top : -380,
               //           ease : Power1.easeInOut
               //      });
               //      $('.imageFocus').removeClass("imageFocus");

               //      $("#removeFromFavMovie").addClass("imageFocus");
               //      $("#addToFavMovie").addClass("imageFocus");

                    
               // }else if(source == "favButton"){
               //      $('.imageFocus').removeClass("imageFocus");
               //      if(singleMovieFocus)
               //           $("#"+singleMovieFocus).addClass("imageFocus");
               //      else
               //           $("#relMovies-0-0").addClass("imageFocus");
               //           $(".bottomDiv").hide();
               // }


			break;
          }
     case 8:
	case tvKeyCode.Return: {
          
	    if(!jQuery('#loading').is(':visible')){
              
          clearInterval(intervalTesting);
          $(".overlay-screen").hide();
          showDateAndTime();

          // alert("aaa");
          $("#SingleMoviePage").html("");
          
          $("#SingleCastPage").hide();
          $("#SingleCastPage").html('');

          try {
               var obj = popState();
               view = obj.view;
               previousFocus = obj.focus;
          } catch (e) {}
          singleMovieFocus = '';
          Main.processNext();
          break;
        }
			
	}
	default: {
			break;
		}
	}
}

// Keyhandler.singleMovieKeyEnterNew = function(selectedMovie){
     
//      alert("aa:"+selectedMovie.name);
// };

Keyhandler.singleMovieCastEnter = function(currFocus){
     Main.ShowLoading();
     var castID = parseInt(currFocus.attr("cast_id"));
     $.ajax({
          url: TMDB_BASE_URL+"person/"+castID+"?api_key="+TMDB_API_KEY+"&append_to_response=images",
          type : "GET",
          data : {},
          success : function (data) {
                 if(typeof data == "string"){
                     data = JSON.parse(data);
                  }
               //    console.log(data);
                 Main.HideLoading();
                 hideValues();
          //     seriesPage = data;
          //     if(view != "tvshowDetails")
          //          pushState(view,$(".imageFocus").attr("id"));
          //        $(".imageFocus").removeClass("imageFocus");

          //     view = "tvshowDetails";
          //     Main.processNext();
 
               singleCast = data;
            if(view != "singleCast")
                 pushState(view,$(".imageFocus").attr("id"));
            $(".imageFocus").removeClass("imageFocus");
            view = "singleCast";
            Main.processNext();



          },
          error : function (errObj) {
               Main.HideLoading();
             Main.showFailure("Something went wrong. Please try again.");
           },
          timeout : 80000
      });
     // alert(castID);
     Main.HideLoading();


}
Keyhandler.singleMovieKeyEnter = function(currFocus){
     Main.ShowLoading();
     var index = parseInt(currFocus.attr("index"));
	
	var id = currFocus.attr("id");
	var count = parseInt(currFocus.attr("count"));
	var source = currFocus.attr("source");

	var v_index = parseInt(currFocus.attr("v_index"));
     var h_index = parseInt(currFocus.attr("h_index"));

     var stream_id = currFocus.attr("stream_id");
     var movie_name = currFocus.attr("movie_name");
     var container_extension = currFocus.attr("container_extension");
     // var trailer = currFocus.attr("youtube_trailer");


     if(source == "related"){
          openedMovieID = stream_id;
          openedMovieName = movie_name;
          openedMovieExtension = container_extension;
          // openedMovieTrailer = trailer;
          Main.getSingleMovie(stream_id);
          Main.HideLoading();
     }else if(source == "favButton"){
           jQuery("#"+id).trigger("click");
     }else if(id == "btnPlayMovie"){
          if (view != "seriesPlayer")
		pushState(view, $(".imageFocus").attr("id"));
          view = "seriesPlayer";
     

          hideValues();
          $("#SingleMoviePage").show();

          var container = openedMovieExtension;
          Player.type = "movies";
          Player.data = singleMovie.info;
          Player.data.name = openedMovieName;
          // $("#SingleMoviePage").hide();
          if(Main.profile.server_info.server_protocol!="" && Main.profile.server_info.server_protocol == "https"){
               playUrl = "https://" + Main.profile.server_info.url + ":"+  Main.profile.server_info.https_port+"/movie/"+Main.profile.user_info.username+"/"+Main.profile.user_info.password+"/"+openedMovieID+"."+openedMovieExtension;
          }else{
               playUrl = "http://" + Main.profile.server_info.url + ":"+  Main.profile.server_info.port+"/movie/"+Main.profile.user_info.username+"/"+Main.profile.user_info.password+"/"+openedMovieID+"."+openedMovieExtension;
          }
          $("#viewinfo").css("opacity","0.2");
          $("#HTML5Div").html(Util.fullScreenMoviePage());
          $("#HTML5Div").css({"float":"left","width":"100%","height":"100%","z-index":"9999","position":"fixed"});

          // view = "seriesPlayer";
          // Player.playStream(playUrl,true);
          setTimeout(function() { 
               Player.set_flowplayer(playUrl,true); 
          }, 200);

          
          $("#HTML5Div").show();
          Main.HideLoading();

     }else if(id=="btnPlayTrailer"){
          // alert(openedMovieTrailer);
          if (view != "seriesPlayer")
		pushState(view, $(".imageFocus").attr("id"));
          view = "seriesPlayer";
     

          hideValues();
          $("#SingleMoviePage").show();

          // var container = openedMovieExtension;
          Player.type = "movies";
          Player.data = singleMovie.info;
          Player.data.name = openedMovieName;
          $("#viewinfo").css("opacity","0.2");
          $("#HTML5Div").html(Util.fullScreenMovieTrailer());
          
          $("#HTML5Div").css({"float":"left","width":"100%","height":"100%","z-index":"9999","position":"relative"});

          // view = "seriesPlayer";
          // Player.playStream(playUrl,true);
          // setTimeout(function() { 
          //      Player.set_flowplayer(playUrl,true); 
          // }, 200);

          
          $("#HTML5Div").show();
          Main.HideLoading();
     }
     
}


// Keyhandler.vodMovieKeyEnterNew = function(streamId,type,movie_name,container_extension){
       // var id = $('.imageFocus').attr("id");
	// var count = parseInt($('.imageFocus').attr("count"));
	// var source = $('.imageFocus').attr("source");

	// var v_index = parseInt($('.imageFocus').attr("v_index"));
	// var h_index = parseInt($('.imageFocus').attr("h_index"));

     // var streamId = $('.imageFocus').attr("stream_id");

     // var type = $('.imageFocus').attr("type");


     //   var movie_name = currFocus.attr("movie_name");
     //   var container_extension = currFocus.attr("container_extension");
//       alert(movie_name);
//       alert(container_extension);

//         openedMovieID = streamId;
//         openedMovieName = movie_name;
//         openedMovieExtension = container_extension;
 
//           if(type != "show"){
//                Main.getSingleMovie(streamId);
//           }else{
//                openedSeriesID = streamId;
//                Main.getSeriesPage(streamId);
//           }
         

// };

Keyhandler.vodMovieKeyEnter = function(currFocus){

     // var id = $('.imageFocus').attr("id");
	// var count = parseInt($('.imageFocus').attr("count"));
	var source = $('.imageFocus').attr("source");

	// var v_index = parseInt($('.imageFocus').attr("v_index"));
	// var h_index = parseInt($('.imageFocus').attr("h_index"));

     var streamId = $('.imageFocus').attr("stream_id");

     var type = $('.imageFocus').attr("type");


       var movie_name = currFocus.attr("movie_name");
       var container_extension = currFocus.attr("container_extension");
     //   var trailer = currFocus.attr("youtube_trailer");
//       alert(movie_name);
//       alert(container_extension);

        openedMovieID = streamId;
        openedMovieName = movie_name;
        openedMovieExtension = container_extension;
     //    openedMovieTrailer = trailer;

         if(source =="searchIcon"){
             showSearchModal("searchMovies");
         }else if(source == "clearSearchIcon"){
             clearSearchedRecords("movies");
         }else if(source == "viewALL"){
             viewALLRecords("viewALL",type);
         }else if(source == "searchButton"){
             Keyhandler.searchPopUpKeyEnter($(".imageFocus"));
         }else if(source == "sortIcon"){
              showSortingModal("sortMovies");
         }else if(source == "sortButton"){
              Keyhandler.sortPopUpKeyEnter($(".imageFocus"));
         }else{
             if(type != "show"){
                       Main.getSingleMovie(streamId);
                  }else{
                       openedSeriesID = streamId;
                       Main.getSeriesPage(streamId);
                   }
         }


}
var tempIndex = 0,epgTimer = '';
Keyhandler.liveTvKeydown = function (e) {
	var keycode;
	var userAgent = new String(navigator.userAgent);
	if (window.event) {
		keycode = e.keyCode;
	} else if (e.which) {
		keycode = e.which;
	}
	var v_index = parseInt($('.imageFocus').attr("v_index"));
	var h_index = parseInt($('.imageFocus').attr("h_index"));

	var index = parseInt($('.imageFocus').attr("index"));
	
	var id = $('.imageFocus').attr("id");
	var count = parseInt($('.imageFocus').attr("count"));
	var source = $('.imageFocus').attr("source");
	switch (keycode) {
	case tvKeyCode.ArrowLeft: {

	     //    if($('#dropdown_id_'+index).is(":visible")){


	     //    }else{
	     //        if(source == "liveHeadLine"){


          //      }
          //      else if(id == "videoHtml"){
          //           $('.imageFocus').removeClass("imageFocus");
          //           if(tempIndex)
          //                $('#'+tempIndex).addClass("imageFocus");

          //      }
          //      else if(source == "arrows"){
          //           if(id == "rightLiveArrow"){
          //                $('.imageFocus').removeClass("imageFocus");
          //                $('#leftLiveArrow').addClass("imageFocus");
          //           }
          //      } else if(source == "searchIcon"){
          //       	     if($('#clearSearch').is(":visible")){
          //                    $('.imageFocus').removeClass("imageFocus");
          //                    $('#clearSearch').addClass("imageFocus");
          //       	     }

          //      }else if(source == "sortIcon"){
          //                $('.imageFocus').removeClass("imageFocus");
          //                $('#searchIcon').addClass("imageFocus");
          //      }

	     //    }



			break;
		}
	case tvKeyCode.ArrowRight: {

// 	            if($('#dropdown_id_'+index).is(":visible")){


//     	        }else{
//                    if(source == "liveHeadLine"){

//                    }
//                    else   if(source == "liveChannels"){
//                         tempIndex = id;
//                         $('.imageFocus').removeClass("imageFocus");
//                         $('.player').addClass("imageFocus");
// //                        $('#player-wrapper').addClass("imageFocus");
//                    }
//                    else if(source == "arrows"){
//                         if(id == "leftLiveArrow"){
//                              $('.imageFocus').removeClass("imageFocus");
//                              $('#rightLiveArrow').addClass("imageFocus");
//                         }
//                    } else if(source == "clearSearchIcon"){
//                         $('.imageFocus').removeClass("imageFocus");
//                         $(".searchIcon").addClass("imageFocus");
//                    }else if(source == "searchIcon"){
//                         $('.imageFocus').removeClass("imageFocus");
//                         $('#sortIcon').addClass("imageFocus");
//                    }

//                }
			
			break;
		}
	case tvKeyCode.ArrowUp: {
          //   if($('#genericDiv').is(":visible")){
          //       var idx = $(".imageFocus1").attr("tabindex");
          //           if(idx != 0){
          //               $("tr").removeClass("imageFocus1");
          //               idx--;
          //               $("tr[tabindex="+idx+"]").focus();
          //               $("tr[tabindex="+idx+"]").addClass("imageFocus1");

          //           }else{
          //               $("tr[tabindex="+idx+"]").focus();
          //               $("tr[tabindex="+idx+"]").addClass("imageFocus1");
          //           }

          //   }else{
          //       if($('#dropdown_id_'+index).is(":visible")){
          //           if($('#add_to_fav_link_'+index).is(":focus") || $('#remove_from_fav_link_'+index).is(":focus")){
          //             $('#play_link_'+index).focus();
          //           }else if($('#close_menu_link_'+index).is(":focus")){
          //               $('#full_epg_menu_link_'+index).focus();
          //           }else if($('#full_epg_menu_link_'+index).is(":focus")){
          //               $('#add_to_fav_link_'+index).focus();
          //               $('#remove_from_fav_link_'+index).focus();
          //           }



          //       }else{
          //           if(source == "liveChannels"){
          //                   if(index > 0){
          //                        index --;
          //                        $('.imageFocus').removeClass("imageFocus");
          //                        if(!$('#liveChannel-'+index).length)
          //                             $(".liveDetails").prepend(addChannelRow(index));

          //                        $('#liveChannel-'+index).addClass("imageFocus");
          //                        $('#liveChannel-'+index).show();

          //                        $('#liveChannel-'+(index+7)).remove();

          //                        var stID = $('#liveChannel-'+index).attr("streamid");
          //                        if(epgTimer) clearTimeout(epgTimer);
          //                        epgTimer = setTimeout(function(){var stID = $('#liveChannel-'+index).attr("streamid");Main.getEPG(stID)},900);


          //                   }
          //                   else{
          //                        $('.imageFocus').removeClass("imageFocus");
          //                        $('#rightLiveArrow').addClass("imageFocus");
          //                   }
          //              }
          //              else if(source == "arrows" || source == "playerSource"){
          //                   $('.imageFocus').removeClass("imageFocus");
          //                   $(".sortIcon").addClass("imageFocus");

          //             }
          //       }
          //   }


			break;
		}
	case tvKeyCode.Enter: {
			Keyhandler.liveKeyEnter($('.imageFocus'),"keyboard");
			break;
		}
	case tvKeyCode.ArrowDown: {
               //   if($('#genericDiv').is(":visible")){
               //        var idx = $(".imageFocus1").attr("tabindex");
               //          $("tr").removeClass("imageFocus1");
               //          idx++;
               //          $("tr[tabindex="+idx+"]").focus();
               //          $("tr[tabindex="+idx+"]").addClass("imageFocus1");

               //        var abc = $(".imageFocus1").attr("tabindex");
               //        if(abc===undefined){
               //          idx--;
               //          $("tr[tabindex="+idx+"]").focus();
               //          $("tr[tabindex="+idx+"]").addClass("imageFocus1");

               //        }

               //  }else{
               //     if($('#dropdown_id_'+index).is(":visible")){
               //                      if($('#play_link_'+index).is(":focus")){
               //                            $('#add_to_fav_link_'+index).focus();
               //                            $('#remove_from_fav_link_'+index).focus();
               //                       }else if($('#add_to_fav_link_'+index).is(":focus") || $('#remove_from_fav_link_'+index).is(":focus")){
               //                          $('#full_epg_menu_link_'+index).focus();
               //                       }else if($('#full_epg_menu_link_'+index).is(":focus")){
               //                          $('#close_menu_link_'+index).focus();
               //                       }

               //     }else{
               //          if(source == "liveChannels"){
               //             if(index < count-1){
               //                  index ++;
               //                  $('.imageFocus').removeClass("imageFocus");
               //                  if(!$('#liveChannel-'+index).length){
               //                     //alert("vvv1");
               //                       $('.liveDetails').append(addChannelRow(index));
               //                      // alert("vvv2");
               //                  }
               //                  $('#liveChannel-'+index).addClass("imageFocus");


               //                  $('#liveChannel-'+index).show();
               //                  if(index > 6){
               //                       $('#liveChannel-'+(index-7)).remove();
               //                  }
 
               //                  var stID = $('#liveChannel-'+index).attr("streamid");

               //                  if(epgTimer) clearTimeout(epgTimer);
               //                  epgTimer = setTimeout(function(){var stID = $('#liveChannel-'+index).attr("streamid");Main.getEPG(stID)},900);
 
               //             }
               //        } else if(source == "arrows"){
               //             $('.imageFocus').removeClass("imageFocus");
               //             $('#liveChannel-'+0).addClass("imageFocus");
               //        } else if(source =="searchIcon" || source == "clearSearchIcon" || source == "sortIcon"){
               //               $('.imageFocus').removeClass("imageFocus");
               //               $('#rightLiveArrow').addClass("imageFocus");
               //        }
               //     }
               //  }



			break;
          }

          case 27:{
               if(!jQuery('#loading').is(':visible')){
                    $(".overlay-screen").hide();
                    showDateAndTime();
     
                    
                    if($("div").hasClass("wcp-minimize")){
                         // alert("class found");
                         $('.wcp-minimize').addClass('wcp-maximize').removeClass('wcp-minimize');
     
                    }
               }
               break;
          }
     case 8:
	case tvKeyCode.Return: {

          // console.log("HD:1");
	     if(!jQuery('#loading').is(':visible')){
               $(".overlay-screen").hide();
               showDateAndTime();

	            if($('#genericDiv').is(":visible")){
                    // console.log("HD:2");
                    $("#genericDiv").hide();
                    $("#genericDiv").html('');
                    $("#mainContent").show();
                 }else{
                    // console.log("HD:3");

                    if($('#dropdown_id_'+index).is(":visible")){
                         // console.log("HD:4");

                          $(".dropdown-content").removeClass("hide");
                          $(".dropdown-content").removeClass("showInlineGrid");
                           break;
                      }else{
                    //   if(media){
                    //                  if(intervalNetwork){
                    //                       clearInterval(intervalNetwork);intervalNetwork = '';
                    //                  }
                    //                  media.stop();
                    //             }

                    // console.log("HD:5");



                    $("#mainContent").html("");

                        try {
                             var obj = popState();
                             view = obj.view;
                             previousFocus = obj.focus;
                        } catch (e) {}

                         Main.processNext();

                          if(reconnectInt !== null || reconnectInt !== undefined){
                              clearInterval(reconnectInt);
                          }
                          counter = 0;
                         //  var PlayerDIvSelector = $('#player-wrapper');
                         //  PlayerDIvSelector.html('');
                         //  PlayerDIvSelector.attr('class', '');

                         try{
                             // alert("1");
                              Player.stopPlayer();
                              // player = new wjs("#player-wrapper");
                              // alert(player);
                              // player.clearPlaylist(); 
                              var PlayerDIvSelector = $('#player-wrapper');
                              PlayerDIvSelector.removeClass("webchimeras");
                              PlayerDIvSelector.html('');
                              //alert("2");
                         }catch(err){
                              //alert(JSON.stringify(err));
                              var PlayerDIvSelector = $('#player-wrapper');
                              PlayerDIvSelector.removeClass("webchimeras");
                              PlayerDIvSelector.html('');
                              //alert("aaa");
                         }
                        


                      }
                }

              break;
          }

		}
	default: {
			break;
		}
	}
}



Keyhandler.liveKeyEnter = function(currFocus,type){
    var v_index = parseInt(currFocus.attr("v_index"));
	var h_index = parseInt(currFocus.attr("h_index"));

	var index = parseInt(currFocus.attr("index"));
	var streamId = currFocus.attr("streamId");
	var id = currFocus.attr("id");
	var count = parseInt(currFocus.attr("count"));
    var source = currFocus.attr("source");
    if(source =="searchIcon"){
        showSearchModal("searchChannels");
    }else if(source == "clearSearchIcon"){
        clearSearchedRecords("channels");
    }else if(source == "searchButton" || source == "cancelButtonSearch"){
        Keyhandler.searchPopUpKeyEnter($(".imageFocus"));
    }else if(source == "sortIcon"){
        showSortingModal("sortChannels");
    }else if(source == "sortButton" || source == "cancelButtonSort"){
        Keyhandler.sortPopUpKeyEnter($(".imageFocus"));
    }else if(source == "playerSource"){

    }else{

     // alert(source);
         if($('#dropdown_id_'+index).is(":visible")){
                    fullEPGKeyboardOpened = true;
        //            alert(type);

                }else{
                    if(!AddToFavBoxHidden){
                        $('.dropdown-content').removeClass("hide");
                        $('.dropdown-content').removeClass("showInlineGrid");
                        $('#dropdown_id_'+index).addClass("showInlineGrid");
                        //alert("show box");
                        $('#play_link_'+index).focus();
                        if(type =="mouse"){
                            var stID = $('#liveChannel-'+index).attr("streamid");
                            if(currentAPPType != "m3u" && typeof(stID) !== 'undefined' && stID != null){
 
                              if(epgTimer) clearTimeout(epgTimer);
                              epgTimer = setTimeout(function(){
                                   var stID = $('#liveChannel-'+index).attr("streamid");
                                   Main.getEPG(stID)},900
                                   );
                            }
                           
                        }

                    }else{
                        AddToFavBoxHidden = false;
                    }

                }

             if(id == "videoHtml"){
                  short = true;
                  fullScreenPlayer();
        //          Player.resize();
             } else if(source == "arrows"){
                  if(id == "leftLiveArrow"){
                       $("#clearSearch").css("display", "none");
                       $("#searchResultLive").html('');
                       $("#searchResultLive").hide();
                       if(sectionsIndex > 0){
                            sectionsIndex -- ;
                            if(currentAPPType == "m3u"){
                                 if(sectionData[sectionsIndex].category_id == "FAVOURITE"){
                                   Main.getM3UFavouritesFromArrow();
                                 }else if(sectionData[sectionsIndex].category_id == "ALL"){
                                   if(playlistItemArrayTemp!==null && playlistItemArrayTemp.length>0){ 
                                        loadLivePageData(playlistItemArrayTemp,true);
                                   }
                                 }else{
                                   loadLivePageData(allChannelsMoviesSeriesWithCat[sectionData[sectionsIndex].category_id],true);
                                 }
                            }else{
                              Main.getLiveDetails("get_live_streams",sectionData[sectionsIndex].category_id,true,"live");
                            }
                       }else{
                         sectionsIndex = (sectionData.length-1);
                         if(currentAPPType == "m3u"){
                              if(sectionData[sectionsIndex].category_id == "FAVOURITE"){
                                   Main.getM3UFavouritesFromArrow();
                              }else if(sectionData[sectionsIndex].category_id == "ALL"){
                                   if(playlistItemArrayTemp!==null && playlistItemArrayTemp.length>0){ 
                                        loadLivePageData(playlistItemArrayTemp,true);
                                   }
                              }else{
                                   loadLivePageData(allChannelsMoviesSeriesWithCat[sectionData[sectionsIndex].category_id],true);
                              }
                         }else{
                              Main.getLiveDetails("get_live_streams",sectionData[sectionsIndex].category_id,true,"live");
                         }
                       }
                  } else{
                        $("#clearSearch").css("display", "none");
                        $("#searchResultLive").html('');
                        $("#searchResultLive").hide();
                    //     alert("index:"+sectionsIndex+" total:"+sectionData.length);
                       if(sectionsIndex < (sectionData.length-1)){
                            sectionsIndex ++ ;
                            if(currentAPPType == "m3u"){
                              if(sectionData[sectionsIndex].category_id == "FAVOURITE"){
                                   Main.getM3UFavouritesFromArrow();
                              }else if(sectionData[sectionsIndex].category_id == "ALL"){
                                   if(playlistItemArrayTemp!==null && playlistItemArrayTemp.length>0){ 
                                        loadLivePageData(playlistItemArrayTemp,true);
                                   }
                              }else{
                                   loadLivePageData(allChannelsMoviesSeriesWithCat[sectionData[sectionsIndex].category_id],true);
                              }
                            }else{
                              Main.getLiveDetails("get_live_streams",sectionData[sectionsIndex].category_id,true,"live");
                            }
                       }else{
                         sectionsIndex = 0;
                         if(currentAPPType == "m3u"){
                              if(sectionData[sectionsIndex].category_id == "FAVOURITE"){
                                   Main.getM3UFavouritesFromArrow();
                              }else if(sectionData[sectionsIndex].category_id == "ALL"){
                                   if(playlistItemArrayTemp!==null && playlistItemArrayTemp.length>0){ 
                                        loadLivePageData(playlistItemArrayTemp,true);
                                   }
                              }else{
                                   loadLivePageData(allChannelsMoviesSeriesWithCat[sectionData[sectionsIndex].category_id],true);
                              }
                         }else{
                              Main.getLiveDetails("get_live_streams",sectionData[sectionsIndex].category_id,true,"live");   
                         }
                       }
                  }
             }
    }

}

function fullScreenPlayer(){
          // var fullscreen = jwplayer().getFullscreen();
          // if(fullscreen) {
          //   fullscreen = false
          // } else {
          //   fullscreen = true;
          // }
          //   AddToFavBoxHidden = true;
          // jwplayer().setFullscreen(fullscreen);
}
function gotoLeftMenu(){
	contentView = view;
	view = "leftMenu";
	homeFocus = $('.imageFocus').attr('id');
	$('.imageFocus').removeClass("imageFocus");
	$('.leftHigh').addClass("imageFocus");
}


Keyhandler.homeKeyEnter = function (currFocus) {
     if(currentAPPType == "m3u"){
     }else{
          Main.ShowLoading();
     }
    pinEntered = false;
	var index = parseInt(currFocus.attr("index"));
	var source = currFocus.attr("source");
	var attrid = currFocus.attr("attrid");
	var id = currFocus.attr("id");
     var count = parseInt(currFocus.attr("count"));
     // console.log(source);
     // console.log(index);
	if(source == "tiles"){
		if(index == 0){
               if(currentAPPType == "m3u"){
                    Main.getSectionsM3U("get_live_categories","live");
               }else{
                    Main.getSections("get_live_categories","live");
               }
		}
		else if(index == 1){
			Main.getSections("get_vod_categories","vod");
		}
		else if(index == 2){
			Main.getSections("get_series_categories","series");
          }
          else if(index == 3){
             Main.getSections("get_live_categories","catchup");
          }
          else if(index == 4){
               if(Main.multiscreen == true){
                    pushState(view,$(".imageFocus").attr("id"));
                    $('.imageFocus').removeClass("imageFocus");
                    view = "multiscreen";
                    Main.processNext();
               }else{
                    pushState(view,$(".imageFocus").attr("id"));
                    $('.imageFocus').removeClass("imageFocus");
                    view = "account";
                    Main.processNext();  
               }
          }
          else if(index == 5){
               pushState(view,$(".imageFocus").attr("id"));
			$('.imageFocus').removeClass("imageFocus");
               view = "settings";
               Main.processNext();
          }
	}else if(source =="headTiles"){
	    if(id == "switchUserIcon"){
	         pushState(view,$(".imageFocus").attr("id"));
            $('.imageFocus').removeClass("imageFocus");
            view = "listUser";
            Main.processNext();
	    }else if(id == "AccountInfoIcon"){
               pushState(view,$(".imageFocus").attr("id"));
               $('.imageFocus').removeClass("imageFocus");
               view = "account";
               Main.processNext();
         }
	}
}



/* Keyhandler.signInKeyEnter = function (currFocus) {
	var index = parseInt(currFocus.attr("index"));
	if(index == 2){
		Main.getSignIn($('#email').val().trim(),$('#password').val().trim());
	}
} */







Keyhandler.listUserKeyhandler = function (e) {
	var keycode;
	var userAgent = new String(navigator.userAgent);
	if (window.event) {
		keycode = e.keyCode;
	} else if (e.which) {
		keycode = e.which;
	}

	var index = parseInt($('.imageFocus').attr("index"));
	var id = $('.imageFocus').attr("id");

	var count =  parseInt($('.imageFocus').attr("count"));
	var source = $('.imageFocus').attr("source");
	 
	switch (keycode) {
	case tvKeyCode.ArrowLeft: {
		    if($('#dropdown_id_'+index).is(":visible")){

            }else{
                if(index > 0){
                    index--;
                    $('.imageFocus').removeClass("imageFocus");
                    $("#listIcons-"+index).addClass("imageFocus");
                }
			}
			
	
			break;
	}
	case tvKeyCode.ArrowRight: {
	        if($('#dropdown_id_'+index).is(":visible")){

            }else{
                    if(index < count-1){
                        index++;
                        $('.imageFocus').removeClass("imageFocus");
                        $("#listIcons-"+index).addClass("imageFocus");
                    }
			}
			break;
	}
	case tvKeyCode.ArrowUp: {

	      if($('#dropdown_id_'+index).is(":visible")){
                   if($('#delete_link_'+index).is(":focus")){
                      $('#login_link_'+index).focus();
                   }
           }else{
            if(source == "listSessions"){
                index = index - 2;
                if(index >= 0){
                    $('.imageFocus').removeClass("imageFocus");
                    $("#listIcons-"+index).addClass("imageFocus");
                }else{
                    $('.imageFocus').removeClass("imageFocus");
                    $("#addUserBtn").addClass("imageFocus");

                }
              } else{
                  $('.imageFocus').removeClass("imageFocus");
                  $("#addUserBtn").addClass("imageFocus");
              }

          }
		
		break;
	}
	case tvKeyCode.Enter: {
	     if($('#addUserBtn').hasClass("imageFocus") || $('#listCenterButton').hasClass("imageFocus")){
            pushState(view,$(".imageFocus").attr("id"));
            $('.imageFocus').removeClass("imageFocus");
            view = "signIn";
            Main.processNext();
	     }else{
	        if($('#dropdown_id_'+index).is(":visible")){

            }else{
                $('.dropdown-content').removeClass("hide");
                $('.dropdown-content').removeClass("show");
                $('#dropdown_id_'+index).addClass("show");
                $('#login_link_'+index).focus();
         	}
	     }


		break;
	}
	case tvKeyCode.ArrowDown: {

	     if($('#dropdown_id_'+index).is(":visible")){
             if($('#login_link_'+index).is(":focus")){
                $('#delete_link_'+index).focus();
             }
         }else{

         if(source == "listSessions"){

                         index = index + 2;
                         if(index < count){
                             $('.imageFocus').removeClass("imageFocus");
                             $("#listIcons-"+index).addClass("imageFocus");
                         }


         		}else{
                        var listData = JSON.parse(localStorage.getItem('listData'));
                        if(!listData || !listData.length){
                             $('.imageFocus').removeClass("imageFocus");
                             $(".listCenterButton").addClass("imageFocus");
                        }
         			else{
                             $('.imageFocus').removeClass("imageFocus");
                             $("#listIcons-"+0).addClass("imageFocus");
                        }
         		}

         }

			break;
	}
	case tvKeyCode.Return:
	case 8: {
	  if(!jQuery('#loading').is(':visible')){
          $(".overlay-screen").hide();
          showDateAndTime();

		try {
			if($('#dropdown_id_'+index).is(":visible")){
                $(".dropdown-content").removeClass("hide");
                $(".dropdown-content").removeClass("show");
                 break;
            }else{
            var obj = popState();
               view = obj.view;
//               previousFocus = '';
                previousFocus = obj.focus;

            }


			//previousFocus = obj.focus;
		} catch (e) {}
		Main.processNext();

		break;
	  }
	 }
	default: {
			break;
		}
	}
}
Keyhandler.listUserEnter = function (currFocus) {

	var id = currFocus.attr("id");

	var count =  parseInt(currFocus.attr("count"));
	var source = currFocus.attr("source");
	if(source == "listSessions"){
          if(selectedListBoxType == "m3u"){
               var listData = JSON.parse(localStorage.getItem("listDataM3U"));
			var index = parseInt(currFocus.attr("index"));
               Main.profile  = listData[index]; 
               localStorage.setItem("profile",JSON.stringify(Main.profile));
               // console.log(Main.profile);
               if(Main.profile.m3uType == "file"){
                    Main.fetchM3UDataFile(Main.profile.playlistname,Main.profile.m3uLine,"multiscreen","homePage",Main.profile.m3uType);
               }else if(Main.profile.m3uType == "url"){
                    Main.fetchM3UData(Main.profile.playlistname,Main.profile.m3uLine,"multiscreen","homePage",Main.profile.m3uType);
               }

          }else{
		     var listData = JSON.parse(localStorage.getItem("listData"));
			var index = parseInt(currFocus.attr("index"));
               Main.profile  = listData[index]; 
               localStorage.setItem("profile",JSON.stringify(Main.profile));
			Main.login(Main.profile.user_info.login_url,Main.profile.user_info.username,Main.profile.user_info.password,Main.profile.user_info.name,"multiscreen");
          }

 
	}
	else{
		Main.ShowLoading();
          pushState(view,$(".imageFocus").attr("id"));
		$('.imageFocus').removeClass("imageFocus");
		view = "signIn";
		Main.processNext();
			Main.HideLoading();

	}
	

}




Keyhandler.signInKeyhandler = function (e) {
	var keycode;
	var userAgent = new String(navigator.userAgent);
	if (window.event) {
		keycode = e.keyCode;
	} else if (e.which) {
		keycode = e.which;
	}
	hoverOn = false;
	var source = $('.imageFocus').attr("source");
	var id = $('.imageFocus').attr("id");
	switch (keycode) {
	case tvKeyCode.ArrowLeft: {
		
			// if(source == "loginForm"){
			// 	$('.imageFocus').blur();
				
			// 	$('.imageFocus').removeClass("imageFocus");
			// 	$('#listUsersBtn').addClass('imageFocus');
			// }
			break;
		}
	case tvKeyCode.ArrowRight: {
			// if(source == "listUsers"){
			// 	$('.imageFocus').removeClass("imageFocus");
			// 	$('#name').addClass('imageFocus');
			// }
			break;
		}
	case tvKeyCode.ArrowUp: {
			if(id == "password"){
				$('.imageFocus').blur();
				$('.imageFocus').removeClass("imageFocus");
				$('#email').addClass('imageFocus');
				
			}else if(id == "login"){
				$('.imageFocus').blur();
				$('.imageFocus').removeClass("imageFocus");
				$('#password').addClass('imageFocus');
				
			}


			if(id == "username"){
				$('.imageFocus').blur()
				$('.imageFocus').removeClass("imageFocus");
				$('#name').addClass('imageFocus');
				
			}
			else if(id == "password"){
				$('.imageFocus').blur()
				$('.imageFocus').removeClass("imageFocus");
				$('#username').addClass('imageFocus');
				
			}
			else if(id == "port"){
				$('.imageFocus').blur()
				$('.imageFocus').removeClass("imageFocus");
				$('#password').addClass('imageFocus');
			}
			else if(id == "login"){
				$('.imageFocus').blur()
				$('.imageFocus').removeClass("imageFocus");
				$('#port').addClass('imageFocus');
//                $('.imageFocus').blur()
//                $('.imageFocus').removeClass("imageFocus");
//                $('#password').addClass('imageFocus');
			}

			break;
		}
	case tvKeyCode.Enter: {
			Keyhandler.signInEnter($(".imageFocus"));
			break;
		}
	case tvKeyCode.ArrowDown: {
			if(id == "name"){
				$('.imageFocus').blur()
				$('.imageFocus').removeClass("imageFocus");
				$('#username').addClass('imageFocus');
				
			}
			else if(id == "username"){
				$('.imageFocus').blur()
				$('.imageFocus').removeClass("imageFocus");
				$('#password').addClass('imageFocus');
				
			}
			else if(id == "password"){
				$('.imageFocus').blur()
				$('.imageFocus').removeClass("imageFocus");
				$('#port').addClass('imageFocus');
//                $('.imageFocus').blur()
//				$('.imageFocus').removeClass("imageFocus");
//				$('#login').addClass('imageFocus');
			}
			else if(id == "port"){
				$('.imageFocus').blur()
				$('.imageFocus').removeClass("imageFocus");
				$('#login').addClass('imageFocus');
			}
			break;
		}
	case tvKeyCode.Return:{
	     if(!jQuery('#loading').is(':visible')){
               if(jQuery('#routingPage').is(':visible')){
                    $(".overlay-screen").hide();
                    showDateAndTime();
     
                    if(stack.length){
                         $("#signIn").hide();
                         $("#signIn").html("");
                         var obj = popState();
                         view = obj.view;
                         previousFocus = obj.focus;
                         Main.processNext();
                    }
                    else{
                         $(".overlay-screen").show();
                         pushState(view,$(".imageFocus").attr("id"));
                         $('.imageFocus').removeClass("imageFocus");
                         view = "exitApp";
                         $("#genericDiv").html(Util.showPopUp(2,'', "Do you want to Exit the Application ?", "Yes","No"));
                         $("#genericDiv").show();
                         $("#Btn-0").addClass("imageFocus");
                         Main.HideLoading();
                    }
               }else{
                    
                    if(jQuery('#m3uPage').is(':visible') || jQuery('#xtreamPage').is(':visible')){
                         $('#xtreamPage').fadeOut();
                         $('#m3uPage').fadeOut();
                         $('#routingPage').fadeIn();
                    }

               }
               
			break;
	     }
	}
	default: {
			break;
		}
	}

}

Keyhandler.signInEnter = function(currFocus){
	var id = currFocus.attr("id");
	if(id == "login"){

	 if(Main.multiDNS == true){
               Main.ShowLoading();
                   var port = Main.serverURL;
                   var username = $("#username").val();
                   var pwd = $("#password").val();
                   var loginType = "login";
                   var anyName = $("#name").val();
                   if(port && username && pwd && anyName){
                        if (port.indexOf(',') > -1) {
                            var allServerURLs = port.split(',');

                                var arr = [];

                                var runRequests = function(userIndex) {
                                	if (allServerURLs.length == userIndex) {
                                  	// console.log("runRequests Success", arr);
                                    Main.HideLoading();
                                    Main.showFailure("Invalid Username or Password");
                                    callBack = '';
                                  	return;
                                  }

                                  var user = allServerURLs[userIndex];
    //                              alert(user);

                                  $.ajax({
                                    url : user+"/player_api.php?username="+username+"&password="+pwd,
                                    type : "GET",
                                    data : {},
                                    success : function (data){
                                        if(typeof data == "string"){
                                            data = JSON.parse(data);
                                         }
                                         try{

                                            if(data.user_info.auth){
                                                        if(data.user_info.status =="Active"){
                                                        		Main.HideLoading();
                                                                data.user_info.name = anyName;
                                                                    data.user_info.login_url =user;

                                                                    var item = localStorage.getItem("listData");

                                                                var obj = [];
                                                                if(item !== null) {
                                                                    obj = JSON.parse(item);
                                                                }


                                                                obj.push(data);
    //                                                             alert(JSON.stringify(obj));
    //                                                             alert(JSON.stringify(data));

                                                                if(loginType != "multiscreen"){
                                                                     localStorage.setItem("listData",JSON.stringify(obj));
                                                                }

                                                                localStorage.setItem("profile",JSON.stringify(data));
                                                //                 alert(JSON.stringify(obj));
                                                //                 alert(data);

                                                                Main.profile = data;
    //                                            				alert(JSON.stringify(Main));
                                                                view = "homePage";
                                                                hideValues();
                                                                $("#mainContent").html(Util.gridHomePage());
                                                                $("#mainContent").show();
                                                            }else{
                                                                  $(".dropdown-content").removeClass("hide");
                                                                  $(".dropdown-content").removeClass("show");
                                                                Main.showFailure("Your Status is "+data.user_info.status);
                                                                $(".orange-button").focus();
                                                                callBack = '';
                                                            }

                                             }else{
                                                runRequests(++userIndex);
                                             }

                                         } catch(e){
                                             Main.showFailure(e);
                                             callBack = '';
                                        }

    //                                  arr.push({ user: user, index: userIndex, data: data });
                                    },
                                    error: function() {
                                        runRequests(++userIndex);
    //                                	console.error("runRequests Error", arguments);
                                    }
                                  });
                                };

                                runRequests(0);




    //                        alert(allServerURLs.length);
                        }else{

                        }



    //                    if(port.indexOf("http") == -1)
    //                    port = "http://"+port;
    //                    //Main.login(port,$("#username").val(),$("#password").val());
    //                    Main.getAuth(port,$("#username").val(),$("#password").val(),$("#name").val());
                   }
                   else{
                         $("#login_error_msg").html("Please provide valid login credentials.");
                         $("#login_error_msg").slideDown();
                         setTimeout( function(){ 
                              $("#login_error_msg").slideUp();
                         }  , 3000 );
                   }

               }else{
                   var port = $("#port").val();
//                   var port = Main.serverURL;
                   var username = $("#username").val();
                   var pwd = $("#password").val();
                   var anyName = $("#name").val();
                   if(port && username && pwd && anyName){
                        if(port.indexOf("http") == -1)
                        port = "http://"+port;
                        Main.login(port,$("#username").val(),$("#password").val(),anyName);
                    //     Main.getAuth(port,$("#username").val(),$("#password").val(),$("#name").val());
                   }
                   else{
                    $("#login_error_msg").html("Please provide valid login credentials.");
                    $("#login_error_msg").slideDown();
                    setTimeout( function(){ 
                         $("#login_error_msg").slideUp();
                    }  , 3000 );
                   }
               }

//          var port = $("#port").val();
//// 	      var port = Main.serverURL;
//          if(port.indexOf("http") == -1)
//               port = "http://"+port;
//          //Main.login(port,$("#username").val(),$("#password").val());
//          if($("#username").val() && $("#password").val() && port)
//               Main.login(port,$("#username").val(),$("#password").val(),$("#name").val(),"login");
//          else
	}
	else if(id == "listUsersBtn"){
		pushState(view,$('.imageFocus').attr("id"));
		$('.imageFocus').removeClass("imageFocus");
		view = "listUser";
		hideValues();
		$("#mainContent").html(Util.listUserPage());
		$("#mainContent").show();
	}
	else if(id){
		//if($("#"+id).is(":focus")){
               if(keyBoradVisible)
                    $("#"+id).blur();
               else
                    $("#"+id).focus();
			//$("#"+id).blur();
			/* if(id == "name"){
				$(".imageFocus").removeClass("imageFocus");
				$("#username").focus();
				$("#username").addClass("imageFocus");
			}
			else if(id == "username"){
				$(".imageFocus").removeClass("imageFocus");
				$("#password").focus();
				$("#password").addClass("imageFocus");
			}
			else if(id == "password"){
				$(".imageFocus").removeClass("imageFocus");
				$("#port").focus();
				$("#port").addClass("imageFocus");
			}
			else if(id == "port"){
				$(".imageFocus").removeClass("imageFocus");
				$("#login").addClass("imageFocus");
			} */
				
		//}
		/* else{
			$("#"+id).focus();
		} */
	}

}
