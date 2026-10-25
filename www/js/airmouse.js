$(document).ready(function(){
	
	
});
var Generate = {};
var channel_name_multiscreen = '';
var stream_id_multiscreen = '';
var stream_icon_multiscreen = '';
Generate.event = function (keyCode) {
	var e = $.Event('keyup');
	e.which = keyCode;
	e.keyCode = keyCode;
	airMouse = true;
	Main.processTrigger(e);
}

window.onclick = function(event) {
     // alert("targed:"+event.target);
     if (!event.target.hasAttribute('dropdown-clickable-attr')) {
          // alert("not button");

       var dropdowns = document.getElementsByClassName("dropdown-content");
       var i;
       for (i = 0; i < dropdowns.length; i++) {
         var openDropdown = dropdowns[i];
         if (openDropdown.classList.contains('showInlineGrid')) {
           openDropdown.classList.remove('showInlineGrid');
          // alert("removed");
         }
       }
     }
   }


/* $(document).on("click","#videoDiv",function(e){
	showPlayerBar();
    playOrPause();
}); */


// $(document).on('mousewheel DOMMouseScroll','body', function(event){
// 	    event.preventDefault();
// 	    var e = 0;
// 	    if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
// 	        e = tvKeyCode.ArrowUp;
// 	    }
// 	    else {
// 	        e = tvKeyCode.ArrowDown;
// 	    }
// 	    Generate.event(e);
// 	});
	
	// $("#moviesList").scroll(function(event) {
     //           event.preventDefault();
     //           console.log("scrolled 1");

	// 	    var e = 0;
	// 	    if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
	// 	        e = tvKeyCode.ArrowUp;
	// 	    }
	// 	    else {
	// 	        e = tvKeyCode.ArrowDown;
	// 	    }
	// 	    Generate.event(e);
     // });

     
 
     
     function check_if_in_view() {
          // alert(window);
          var window_height = $( document ).height();
          var window_top_position = $( document ).scrollTop();
          var window_bottom_position = (window_top_position + window_height);
          var $animation_elements = $('.animation-element');

          $.each($animation_elements, function() {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height);
        
            //check to see if this current container is within viewport
            if ((element_bottom_position >= window_top_position) &&
                (element_top_position <= window_bottom_position)) {
              $element.addClass('in-view');
            } else {
              $element.removeClass('in-view');
            }
          });
        }

 
     $(document).on('mousewheel DOMMouseScroll','body', function(event){
          // console.log("scrolled 1");
          check_if_in_view();
     });
     
	
	$(document).on("mouseover",'#MultiScreenIcon,.multiscreenBoxes,#AccountInfoIcon,.viewALL,#sortIcon,#searchIcon,.tab,.catchUpPara,#switchUserIcon,.fullEPGMenuClass,.RemoveFromFavClass,.closeMenuClass,.addToFavClass,.arrowsIcon,.listCenterButton,.popUpBtn,.termsBtn,.player,.rowSec,.settingsTile,.accountBtn ,#addUserBtn,.listIcons ,.orange-button,.login-btn,#listUsersBtn ,.btnCust,.episode,.relatedM,.playForwardF,.play-icon,.playRewind,.playForward,.playRewindR,.playSingle,#homeLiveTile,#moviesTile,#seriesTile,#listUser,#accountTile,#settingTile,.section,.shows-image',function(e){
        
          var id = $(this).attr("id");
          //alert(id);
		var classVar = $(this).attr("class");
        if(classVar == "addToFavClass" || classVar =="closeMenuClass" || classVar =="RemoveFromFavClass" || classVar =="fullEPGMenuClass"){
               $('.playLinkClass').blur();
         }
        // alert(id);
        if(id == "videoHtml1"){
          Player.playerFocused(1);
        }else if(id == "videoHtml2"){
          Player.playerFocused(2);
        }else if(id == "videoHtml3"){
          Player.playerFocused(3);
        }else if(id == "videoHtml4"){
          Player.playerFocused(4);
        }
        if(id == "videoHtml"){
            $(".imageFocus").removeClass("imageFocus");
            // $(".playing").addClass("imageFocus");
            $("#videoHtml").addClass("imageFocus");
           // alert("a");

        }else{
            if(id){
        			//$('.imageFocus').blur();
        			$(".imageFocus").removeClass("imageFocus");

                       $("#" + id).addClass("imageFocus");

                       if(classVar == "listIcons"){
                           $(".dropdown-content").removeClass("hide");
                           $(".dropdown-content").removeClass("show");
                       }
                       if(id == "seasonSelector"){
                            if($("#seasonSelector").text() != "No Episodes Found.")
                            TweenMax.to($(".singleRow"), 0.4, {
                                 top : -380,
                                 ease : Power1.easeInOut
                            });
                       }
                       else if(id == "btnPlayMovie"){
                            TweenMax.to($(".singleRow"), 0.4, {
                                 top : 0,
                                 ease : Power1.easeInOut
                            });
                       }
        	}
        }

           
	});

	/*$(document).on("mouseover",'',function(e){
        
		var id = $(this).attr("id");
		try{
			$('#email').blur();$('#password').blur();
		}
		catch(e){

		}
        if(id){
			$(".mouseFocus").removeClass("mouseFocus");
			
			$("#" + id).addClass("mouseFocus");
		}
           
     });*/
     
     $(document).on("click","#browseBtn,#loginFromM3U,.signin,.login-btn,#listUsersBtn",function(e){
          var id = $(this).attr("id");
          e.preventDefault();
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
          //     var port = Main.serverURL;
               var username = $("#username").val();
               var pwd = $("#password").val();
               var anyName = $("#name").val();
               if(port && username && pwd && anyName){
                    if(port.indexOf("http") == -1)
                    port = "http://"+port;
                    Main.login(port,$("#username").val(),$("#password").val(),anyName);
                    // Main.getAuth(port,$("#username").val(),$("#password").val(),$("#name").val());
               }
               else{
                    $("#login_error_msg").html("Please provide valid login credentials.");
                         $("#login_error_msg").slideDown();
                         setTimeout( function(){ 
                              $("#login_error_msg").slideUp();
                         }  , 3000 );
               }
           }               
          }else if(id == "loginFromM3U"){
               Main.ShowLoading();

               var radioValue = $("input[name='fileM3U']:checked"). attr("id");
               if(radioValue == "filetypeLabel"){
                    var playlistname =  $("#playlistname").val();
                    var browsedPath =  $("#browsedPath").text();
                    // alert(browsedPath);
                    if(playlistname &&  browsedPath){
                         // alert("everything is fine"+fileDataTemp.length);
                         Main.fetchM3UDataFile(playlistname,browsedPath,"login","homePage","file");
                    }else{
                         Main.HideLoading();

                         $("#login_error_msg_m3u").html("Please provide valid login credentials.");
                         $("#login_error_msg_m3u").slideDown();
                         setTimeout( function(){ 
                              $("#login_error_msg_m3u").slideUp();
                         }  , 3000 );
                    }

                    // Main.HideLoading();
               }
               if(radioValue == "urltypeLabel"){
                    // var exists = urlExists(url); 

                    var m3uLineInput =  $("#m3uLineInput").val();
                    var playlistname =  $("#playlistname").val();
                    
                    if(m3uLineInput && playlistname){
                         if (m3uLineInput.indexOf("http://") == 0 || m3uLineInput.indexOf("https://") == 0) {
                                         
                         }else{
                              m3uLineInput = "http://"+m3uLineInput;
                         }
                         Main.checkURLExistsM3U(m3uLineInput, function(success) {
                              if (success) {
                                   Main.fetchM3UData(playlistname,m3uLineInput,"login","homePage","url");
                              } else {
                                   Main.HideLoading();

                                   $("#login_error_msg_m3u").html("Please provide valid login credentials.");
                                   $("#login_error_msg_m3u").slideDown();
                                   setTimeout( function(){ 
                                        $("#login_error_msg_m3u").slideUp();
                                   }  , 3000 );
                              }
                          });
                    }else{
                         Main.HideLoading();

                         $("#login_error_msg_m3u").html("Please provide valid login credentials.");
                         $("#login_error_msg_m3u").slideDown();
                         setTimeout( function(){ 
                              $("#login_error_msg_m3u").slideUp();
                         }  , 3000 );
                    }
                    // alert(m3uLineInput);
                    
               }



          } else if(id == "listUsersBtn"){
               pushState(view,$('.imageFocus').attr("id"));
               $('.imageFocus').removeClass("imageFocus");
               view = "listUser";
               hideValues();
               $("#mainContent").html(Util.listUserPage());
               $("#mainContent").show();
          }else if(id == "browseBtn"){
               var app = require('electron').remote; 
               var dialog = app.dialog;
               // console.log(app);
               // var filepath="";
               let options = {
                    filters: [
                         { name: "M3U", extensions: ["m3u"] },
                       ],
                    properties:['openFile']
               }

               // dialog.showOpenDialog(options, (filePaths) => {
               //      console.log(filePaths)
               //     })
               // fileDataTemp = '';
               dialog.showOpenDialog(options,(fileNames) => {
                    // fileNames is an array that contains all the selected
                    if(fileNames === undefined){
                    //     console.log("No file selected");
                        return;
                    }


                    Main.HideLoading();
                    $("#browsedPath").text(fileNames[0]);
                    $("#browsedPath").show();
                
                    // fs.readFile(fileNames[0], 'utf-8', (err, data) => {
                    //      Main.HideLoading();
                    //     if(err){
                    //         console.log("An error ocurred reading the file :" + err.message);
                    //         return;
                    //     }
                
                    // //     fileDataTemp = data;
                    //     // Change how to handle the file content
                    // //     console.log("The file size is : " + data.length);
                    // });
                });
               

          }else{
               if(id){
                    $('.imageFocus').blur();
                    $('.imageFocus').removeClass("imageFocus");
                    $(this).addClass("imageFocus");
                    $(this).focus();
               }
               
          }
     });


     var keyBoradVisible = false;
     function keyboardVisibilityChange(event) {
          var visibility = event.detail.visibility;
          if(visibility){
               keyBoradVisible = true;
          }
          else{
               keyBoradVisible = false;
          }
      }
      document.addEventListener('keyboardStateChange', keyboardVisibilityChange, false);


      $(document).on("keyup",'#searchedText',function(e){
          var id = $(this).attr("id");
           
          if(id == "searchedText"){
               $("#searchButton").addClass("imageFocus");
               var sourceType = $("#searchButton").attr("sourceType");
// alert(sourceType);
               if(sourceType == "searchMovies"){
                    searchMoviesAuto($(".imageFocus"));
               }else if(sourceType == "searchLiveCategories"){
                    searchLiveCategoriesAuto($(".imageFocus"));
               }else if(sourceType == "searchMoviesCategories"){
                    searchMoviesCategoriesAuto($(".imageFocus"));
               }else if(sourceType == "searchSeriesCategories"){
                    searchSeriesCategoriesAuto($(".imageFocus"));
               }else if(sourceType == "searchCatchupCategories"){
                    searchCatchupCategoriesAuto($(".imageFocus"));
               }else{
                    searchLiveAuto($(".imageFocus"));
               }
               

          }

      });



	$(document).on("click",'#MultiScreenIcon,.closeModal,#rightArrow_singleCast,#leftArrow_singleCast,#rightArrow_castImages,#leftArrow_castImages,.ChannelRemove1,.ChannelRemove2,.ChannelRemove3,.ChannelRemove4,.multiscreenBoxes,#AccountInfoIcon,.viewALL,#rightArrow_relatedMovies,#leftArrow_relatedMovies,#leftArrow_descend,#rightArrow_descend,#leftArrow_ascend,#rightArrow_ascend,#leftArrow_topRated,#rightArrow_topRated,#leftArrowTopAdded,#rightArrowTopAdded,#sortIcon,#searchIcon,.catchUpPara,#navlist li a,#switchUserIcon,#confirmPin,.listCenterButton,.popUpBtn,.termsBtn,.player,.rowSec,.settingsTile,.accountBtn ,#addUserBtn,.listIcons ,.orange-button,.btnCust,.episode,.relatedM,.playForwardF,.play-icon,.playRewind,.playForward,.playRewindR,.playSingle ,#homeLiveTile,#moviesTile,#seriesTile,#listUser,#accountTile,#settingTile,.section,.shows-image',function(e){
		var id = $(this).attr("id");
		var source = $('.imageFocus').attr("source");
		var role = $('.imageFocus').attr("role");

          e.preventDefault();

     //     alert(source);
// alert("id: "+id);
//          alert(view);
		/* if(id && id.indexOf("leftMenu") != -1){
			Keyhandler.menuKeyEnter($('.mouseFocus'));
		}
		else{
			if(view == "leftMenu"){
				viewIndex = contentView;
			}
			else{
				viewIndex = view;
			}
          } */
          



        switch(view){

            case "homePage":{
            		$("#genericDiv").html('');
            		$("#genericDiv2").html('');
            		$("#HTML5Div").html('');
					Keyhandler.homeKeyEnter($('.imageFocus'));
				break;
               }
               case "multiscreen":{
                    var s = $(this).attr("source");
                    var c = $(this).attr("class");
                   
                    if(c == "ChannelRemove1"){
                         try{ 
                              player1.clearPlaylist(); 
                         }catch(error){
                         }
                         var PlayerDIvSelector1 = $('#player-wrapper1');
                         PlayerDIvSelector1.removeClass("webchimeras");
                         PlayerDIvSelector1.html('');
                         $("#multiscreenPlayerDiv1").hide();
                         $(".ChannelRemove1").hide();
                         $(".ChannelRemove1").attr("justRemoved","true");
                         $("#multiscreenPlusImageDiv1").show();
                         try{
                              player2.pause();
                              setTimeout(function() { 
                                   player2.play();
                              }, 100);
                              
                         }catch(err){

                         }
                         try{
                              player3.pause();
                              setTimeout(function() { 
                                   player3.play();
                              }, 150);
                              
                         }catch(err){

                         }
                         try{
                              player4.pause();
                              setTimeout(function() { 
                                   player4.play();
                              }, 200);
                              
                         }catch(err){

                         }
                         
                         
                         
                         break;
                    }else if(c == "ChannelRemove2"){
                         try{ 
                              player2.clearPlaylist(); 
                         }catch(error){
                         }
                         var PlayerDIvSelector2 = $('#player-wrapper2');
                         PlayerDIvSelector2.removeClass("webchimeras");
                         PlayerDIvSelector2.html('');
                         $("#multiscreenPlayerDiv2").hide();
                         $(".ChannelRemove2").hide();
                         $(".ChannelRemove2").attr("justRemoved","true");
                         $("#multiscreenPlusImageDiv2").show();
                         try{
                              player1.pause();
                              setTimeout(function() { 
                                   player1.play();
                              }, 100);
                              
                         }catch(err){

                         }
                         try{
                              player3.pause();
                              setTimeout(function() { 
                                   player3.play();
                              }, 150);
                              
                         }catch(err){

                         }
                         try{
                              player4.pause();
                              setTimeout(function() { 
                                   player4.play();
                              }, 200);
                              
                         }catch(err){

                         }

                         break;
                    }else if(c == "ChannelRemove3"){
                         try{ 
                              player3.clearPlaylist(); 
                         }catch(error){
                         }
                         var PlayerDIvSelector3 = $('#player-wrapper3');
                         PlayerDIvSelector3.removeClass("webchimeras");
                         PlayerDIvSelector3.html('');
                         $("#multiscreenPlayerDiv3").hide();
                         $(".ChannelRemove3").hide();
                         $(".ChannelRemove3").attr("justRemoved","true");
                         $("#multiscreenPlusImageDiv3").show();
                         try{
                              player1.pause();
                              setTimeout(function() { 
                                   player1.play();
                              }, 100);
                              
                         }catch(err){

                         }
                         try{
                              player2.pause();
                              setTimeout(function() { 
                                   player2.play();
                              }, 150);
                              
                         }catch(err){

                         }
                         try{
                              player4.pause();
                              setTimeout(function() { 
                                   player4.play();
                              }, 200);
                              
                         }catch(err){

                         }

                         break;
                    }else if(c == "ChannelRemove4"){
                         try{ 
                              player4.clearPlaylist(); 
                         }catch(error){
                         }
                         var PlayerDIvSelector4 = $('#player-wrapper4');
                         PlayerDIvSelector4.removeClass("webchimeras");
                         PlayerDIvSelector4.html('');
                         $("#multiscreenPlayerDiv4").hide();
                         $(".ChannelRemove4").hide();
                         $(".ChannelRemove4").attr("justRemoved","true");
                         $("#multiscreenPlusImageDiv4").show();
                         try{
                              player1.pause();
                              setTimeout(function() { 
                                   player1.play();
                              }, 50);
                              
                         }catch(err){

                         }
                         try{
                              player2.pause();
                              setTimeout(function() { 
                                   player2.play();
                              }, 50);
                              
                         }catch(err){

                         }
                         try{
                              player3.pause();
                              setTimeout(function() { 
                                   player3.play();
                              }, 50);
                              
                         }catch(err){

                         }

                         break;
                    }else{
                         
                         if(s == "playerSource"){
                         
                         }else{
                              if(id=="multiscreen1" && $('.ChannelRemove1').is(":visible") || id=="multiscreen1" && !$('.ChannelRemove1').is(":visible") && $(".ChannelRemove1").attr("justRemoved") == "true"){
                                   $(".ChannelRemove1").removeAttr("justRemoved");
                              }else if(id=="multiscreen2" && $('.ChannelRemove2').is(":visible") || id=="multiscreen2" && !$('.ChannelRemove2').is(":visible") && $(".ChannelRemove2").attr("justRemoved") == "true"){
                                   $(".ChannelRemove2").removeAttr("justRemoved");
                              }else if(id=="multiscreen3" && $('.ChannelRemove3').is(":visible") || id=="multiscreen3" && !$('.ChannelRemove3').is(":visible") && $(".ChannelRemove3").attr("justRemoved") == "true"){
                                   $(".ChannelRemove3").removeAttr("justRemoved");
                              }else if(id=="multiscreen4" && $('.ChannelRemove4').is(":visible") || id=="multiscreen4" && !$('.ChannelRemove4').is(":visible") && $(".ChannelRemove4").attr("justRemoved") == "true"){
                                   $(".ChannelRemove4").removeAttr("justRemoved");
                              }else{
                                    
                                   // console.log("get_live_categories"+":"+id+":"+s);
                                   openedMultiScreen = id;
                                   
                                   var numItems = 0;
                                   if($('.ChannelRemove1').is(":visible")){
                                        numItems++;
                                   }
                                   if($('.ChannelRemove2').is(":visible")){
                                        numItems++;
                                   }
                                   if($('.ChannelRemove3').is(":visible")){
                                        numItems++;
                                   }
                                   if($('.ChannelRemove4').is(":visible")){
                                        numItems++;
                                   }

                                   if(currentAPPType == "m3u"){
                                        Main.getSectionsM3U("get_live_categories","multiscreen");
                                   }else{
                                        if(Main.profile.user_info.max_connections>numItems){
                                             Main.getSections("get_live_categories","multiscreen");
                                        }else{
     
                                             showMaximumConnectionModal();
     
                                        // alert(numItems);
                                        }
                                   }


                              }
                              
                         }
                    }
 
                  
                    break;
               }
               case "sections":
               case "multiscreenCategoriesSections":{
                    Keyhandler.sectionEnter ($(".imageFocus"));
                    break;
               }
               case "searchChannels":{
                     Keyhandler.liveKeyEnter($('.imageFocus'),"mouse");
                    break;
               }
               case "searchMovies":{
                        Keyhandler.searchMoviesPopUpKeyEnter($('.imageFocus'),"mouse");
                       break;
                }
                case "searchLiveCategories":
                case "searchMoviesCategories":
                case "searchSeriesCategories":
                case "searchCatchupCategories":{
                    Keyhandler.searchCategoriesPopUpKeyEnter($('.imageFocus'),"mouse");
                    break;
                    //  if(source == "cancelButtonSearch"){
                    //      $(".overlay-screen").hide(); 
                    //      $("#customMessage").hide();
                    //      $("#customMessage").html('');
                    //      try {
                    //           var obj = popState();
                    //                view = obj.view;
                    //                $("#"+obj.focus).addClass('imageFocus');
     
                    //      } catch (e) {}
                    //  }
                    
               //     break;
                }
                

                case "liveMultiScreenChannels":{
                    stream_id_multiscreen = $(this).attr("stream_id");
                    stream_icon_multiscreen = $(this).attr("stream_icon");
                    channel_name_multiscreen = $(this).attr("channel_name");
                    var categ = $(this).attr("categ");
                    var typeofCase = '';
                    var flag = false;

                    
                    // alert(stream_id);
                    // alert(openedMultiScreen);
                    showDateAndTime();
                    try {
                         popState();
                         var obj = popState();
                         view = obj.view;
//            				alert(view);
                              previousFocus = obj.focus;
                              
                    } catch (e) {}

                    $("#multiscreenCategoriesSections").html("").hide();
                    $("#multiscreenLiveSections").html("").hide();

                    Main.processNext();

                     if(openedMultiScreen == "multiscreen1"){
                         if(parentPin){
                              // alert("yes");
                              if(categ!="" && categ == "ALL"){
                                   typeofCase = "ALL";
                                   for(var j=0;j<sectionData.length;j++){
                                             if(compareString(sectionData[j].category_name,adultArray)){
                                                  openedMovieCatID = categ;
                                                  // openedSectionAction = action;
                                                  flag = true;
                                                  Main.HideLoading();
                                                  pushState(view,$(".imageFocus").attr("id"));
                                                  $(".imageFocus").removeClass("imageFocus");
                                                  view = "enterPinMultiScreenCategories";
                                                  $("#customMessage").html(Util.confirmPin());
                                                  $("#customMessage").show();
                                                  break;

                                             }
                                   }
                              }else if(categ!=""){
                                   typeofCase ="Any";
                                   for(var j=0;j<sectionData.length;j++){
                                       if(sectionData[j].category_id == categ){
                                           cName = sectionData[j].category_name;
                                          break;
                                       }
               
                                   }
                                   // alert(cName);
                                }

                                if(typeofCase == "Any"){
                                   if(cName!="" && parentPin){
                                      if(compareString(cName,adultArray)){
                                           openedMovieCatID = categ;
                                        //    openedSectionAction = action;
               
                                           flag = true;
                                            Main.HideLoading();
               
                                           pushState(view,$(".imageFocus").attr("id"));
                                           $(".imageFocus").removeClass("imageFocus");
                                           view = "enterPinMultiScreenCategories";
                                           $("#customMessage").html(Util.confirmPin());
                                           $("#customMessage").show();
               
                                      } 
               
                                   }
                               }

                               if(!flag){
                                   multiscreen1Fun(); 
                               }
                                




                         }else{
                              multiscreen1Fun(); 
                         }
                         
                     }else if(openedMultiScreen == "multiscreen2"){
                         if(parentPin){
                              // alert("yes");
                              if(categ!="" && categ == "ALL"){
                                   typeofCase = "ALL";
                                   for(var j=0;j<sectionData.length;j++){
                                             if(compareString(sectionData[j].category_name,adultArray)){
                                                  openedMovieCatID = categ;
                                                  // openedSectionAction = action;
                                                  flag = true;
                                                  Main.HideLoading();
                                                  pushState(view,$(".imageFocus").attr("id"));
                                                  $(".imageFocus").removeClass("imageFocus");
                                                  view = "enterPinMultiScreenCategories";
                                                  $("#customMessage").html(Util.confirmPin());
                                                  $("#customMessage").show();
                                                  break;

                                             }
                                   }
                              }else if(categ!=""){
                                   typeofCase ="Any";
                                   for(var j=0;j<sectionData.length;j++){
                                       if(sectionData[j].category_id == categ){
                                           cName = sectionData[j].category_name;
                                          break;
                                       }
               
                                   }
                                   // alert(cName);
                                }

                                if(typeofCase == "Any"){
                                   if(cName!="" && parentPin){
                                      if(compareString(cName,adultArray)){
                                           openedMovieCatID = categ;
                                        //    openedSectionAction = action;
               
                                           flag = true;
                                            Main.HideLoading();
               
                                           pushState(view,$(".imageFocus").attr("id"));
                                           $(".imageFocus").removeClass("imageFocus");
                                           view = "enterPinMultiScreenCategories";
                                           $("#customMessage").html(Util.confirmPin());
                                           $("#customMessage").show();
               
                                      } 
               
                                   }
                               }

                               if(!flag){
                                   multiscreen2Fun(); 
                               }
                                




                         }else{
                              multiscreen2Fun(); 
                         }
                       
                     }else if(openedMultiScreen == "multiscreen3"){
                         if(parentPin){
                              // alert("yes");
                              if(categ!="" && categ == "ALL"){
                                   typeofCase = "ALL";
                                   for(var j=0;j<sectionData.length;j++){
                                             if(compareString(sectionData[j].category_name,adultArray)){
                                                  openedMovieCatID = categ;
                                                  // openedSectionAction = action;
                                                  flag = true;
                                                  Main.HideLoading();
                                                  pushState(view,$(".imageFocus").attr("id"));
                                                  $(".imageFocus").removeClass("imageFocus");
                                                  view = "enterPinMultiScreenCategories";
                                                  $("#customMessage").html(Util.confirmPin());
                                                  $("#customMessage").show();
                                                  break;

                                             }
                                   }
                              }else if(categ!=""){
                                   typeofCase ="Any";
                                   for(var j=0;j<sectionData.length;j++){
                                       if(sectionData[j].category_id == categ){
                                           cName = sectionData[j].category_name;
                                          break;
                                       }
               
                                   }
                                   // alert(cName);
                                }

                                if(typeofCase == "Any"){
                                   if(cName!="" && parentPin){
                                      if(compareString(cName,adultArray)){
                                           openedMovieCatID = categ;
                                        //    openedSectionAction = action;
               
                                           flag = true;
                                            Main.HideLoading();
               
                                           pushState(view,$(".imageFocus").attr("id"));
                                           $(".imageFocus").removeClass("imageFocus");
                                           view = "enterPinMultiScreenCategories";
                                           $("#customMessage").html(Util.confirmPin());
                                           $("#customMessage").show();
               
                                      } 
               
                                   }
                               }

                               if(!flag){
                                   multiscreen3Fun(); 
                               }
                                




                         }else{
                              multiscreen3Fun(); 
                         }
                        
                     }else if(openedMultiScreen == "multiscreen4"){
                         if(parentPin){
                              // alert("yes");
                              if(categ!="" && categ == "ALL"){
                                   typeofCase = "ALL";
                                   for(var j=0;j<sectionData.length;j++){
                                             if(compareString(sectionData[j].category_name,adultArray)){
                                                  openedMovieCatID = categ;
                                                  // openedSectionAction = action;
                                                  flag = true;
                                                  Main.HideLoading();
                                                  pushState(view,$(".imageFocus").attr("id"));
                                                  $(".imageFocus").removeClass("imageFocus");
                                                  view = "enterPinMultiScreenCategories";
                                                  $("#customMessage").html(Util.confirmPin());
                                                  $("#customMessage").show();
                                                  break;

                                             }
                                   }
                              }else if(categ!=""){
                                   typeofCase ="Any";
                                   for(var j=0;j<sectionData.length;j++){
                                       if(sectionData[j].category_id == categ){
                                           cName = sectionData[j].category_name;
                                          break;
                                       }
               
                                   }
                                   // alert(cName);
                                }

                                if(typeofCase == "Any"){
                                   if(cName!="" && parentPin){
                                      if(compareString(cName,adultArray)){
                                           openedMovieCatID = categ;
                                        //    openedSectionAction = action;
               
                                           flag = true;
                                            Main.HideLoading();
               
                                           pushState(view,$(".imageFocus").attr("id"));
                                           $(".imageFocus").removeClass("imageFocus");
                                           view = "enterPinMultiScreenCategories";
                                           $("#customMessage").html(Util.confirmPin());
                                           $("#customMessage").show();
               
                                      } 
               
                                   }
                               }

                               if(!flag){
                                   multiscreen4Fun(); 
                               }
                                




                         }else{
                              multiscreen4Fun(); 
                         }
                         
                     }
                        
                    // showALLRecords($('.imageFocus'),"mouse");
                   break;
               }

               case "sortChannels":{
                     Keyhandler.liveKeyEnter($('.imageFocus'),"mouse");
                    break;
               }
               case "sortMovies":{
                    Keyhandler.sortPopUpMoviesKeyEnter($('.imageFocus'),"mouse");
                    break;
               }
               case "liveCatchupChannels":{
                    Keyhandler.liveCatchupChannelsEnter ($(".imageFocus"));
                    break;
               }


               case "vodMovies":{
                    if(id == "rightArrowTopAdded"){
                         $('#slide').animate({scrollLeft: '-=300'},500);
                         break;
                    }
                    if(id == "leftArrowTopAdded"){
                         $('#slide').animate({scrollLeft: '+=300'},500);
                         $('#rightArrowTopAdded').removeClass('d-none');
                         break;
                    } 
                    if(id == "rightArrow_topRated"){
                         $('#slide_topRated').animate({scrollLeft: '-=300'},500);
                         $('#leftArrow_topRated').removeClass('d-none');
                         break;
                    } 

                    if(id == "leftArrow_topRated"){
                         $('#slide_topRated').animate({scrollLeft: '+=300'},500);
                         $('#rightArrow_topRated').removeClass('d-none');
                         break;
                    }  

                    if(id == "rightArrow_ascend"){
                         $('#slide_ascend').animate({scrollLeft: '-=300'},500);
                         $('#leftArrow_ascend').removeClass('d-none');
                         break;
                    }  

                    if(id == "leftArrow_ascend"){
                         $('#slide_ascend').animate({scrollLeft: '+=300'},500);
                         $('#rightArrow_ascend').removeClass('d-none');
                         break;
                    }  

                     
                    if(id == "rightArrow_descend"){
                         $('#slide_descend').animate({scrollLeft: '-=300'},500);
                         break;
                    }
                    if(id == "leftArrow_descend"){
                         $('#slide_descend').animate({scrollLeft: '+=300'},500);
                         $('#rightArrow_descend').removeClass('d-none');
                         break;
                    }

 
                    
                    
                    Keyhandler.vodMovieKeyEnter($('.imageFocus'));
                    break;
               }
                
               case "settings":
               case "account":{ Keyhandler.accountKeyEnter($('.imageFocus'));break;}
               case "singleCast":{
                    
                    if(id == "rightArrow_singleCast"){
                         $('#viewSliderSingleCast').animate({scrollLeft: '-=300'},500);
                         break;
                    }
                    if(id == "leftArrow_singleCast"){
                         // alert("entered");
                         $('#viewSliderSingleCast').animate({scrollLeft: '+=300'},500);
                         $('#rightArrow_singleCast').removeClass('d-none');
                         break;
                    } 
               }
			case "singleMovie":{

                    // alert(id);
                    
                         if(id == "rightArrow_castImages"){
                              $('#viewSliderCastImages').animate({scrollLeft: '-=300'},500);
                              break;
                         }
                         if(id == "leftArrow_castImages"){
                              // alert("entered");
                              $('#viewSliderCastImages').animate({scrollLeft: '+=300'},500);
                              $('#rightArrow_castImages').removeClass('d-none');
                              break;
                         }
                    
                    if(id == "rightArrow_relatedMovies"){
                         $('#viewSlider').animate({scrollLeft: '-=300'},500);
                         break;
                    }
                    if(id == "leftArrow_relatedMovies"){
                         $('#viewSlider').animate({scrollLeft: '+=300'},500);
                         $('#rightArrow_relatedMovies').removeClass('d-none');
                         break;
                    }
                    if(source == "related" || id == "btnPlayMovie" || id == "btnPlayTrailer"){
                        Keyhandler.singleMovieKeyEnter($(".imageFocus"));
                    }else if(source == "castImages"){
                         Keyhandler.singleMovieCastEnter($(".imageFocus"));
                    }
                    break;
                    }
			case "terms":{ Keyhandler.descKeyEnter();break; }
			case "signIn":{$('#email').blur();$('#password').blur();Keyhandler.signInEnter($('.imageFocus'));;break;}
			case "liveChannels":{
//			    if(id != "clearSearch"){
			        Keyhandler.liveKeyEnter($('.imageFocus'),"mouse");
//			    }
			    break;
			}
			case "timeZone":{Keyhandler.timeZoneListEnter($('.mouseFocus'));;break;}
			case "seasonsList":{
                    if(id == "closeModal"){
                         $("#backArrow").click();
                    }else{
                         Keyhandler.seasonsListEnter($(".imageFocus"));
                    }
                    break;
               }
			case "liveTvDetail":{Keyhandler.liveTvDetailKeyEnter($('.mouseFocus'));;break;}
			case "live":{Keyhandler.liveKeyEnter($('.mouseFocus'));;break;}
			case "tvShows":{Keyhandler.tvShowsKeyEnter($('.mouseFocus'));;break;}
			case "tvshowDetails":{

                    if(id == "rightArrow_castImages"){
                         $('#viewSliderCastImages').animate({scrollLeft: '-=300'},500);
                         break;
                    }
                    if(id == "leftArrow_castImages"){
                         // alert("entered");
                         $('#viewSliderCastImages').animate({scrollLeft: '+=300'},500);
                         $('#rightArrow_castImages').removeClass('d-none');
                         break;
                    }
                    
                if(source != "favButton" && source!="castImages"){
                    Keyhandler.tvshowDetailsKeyEnter($(".imageFocus"));
                }else if(source=="castImages"){
                    Keyhandler.singleMovieCastEnter($(".imageFocus"));
                }
                
                 
                break;

            }
			case "settingSection":{ Keyhandler.settingSectionKeyEnter($(".imageFocus")); break;}
			case "parentalPinSettings":{ Keyhandler.settingSectionKeyEnter($(".imageFocus")); break;}
			case "parentalTurnOff":{ Keyhandler.settingSectionKeyEnter($(".imageFocus")); break;}
			case "profile":{Keyhandler.profileEnter($('.imageFocus'));;break;}
			case "listUser":{ 
                    selectedListBoxType = $(this).attr("loginType");
                    Keyhandler.listUserEnter($(".imageFocus"));break;
               }
			case "search":break;
               case "exitApp":{Keyhandler.exitKeyEnter($(".imageFocus"));break;}
               case "parentalFromHome":{Keyhandler.parentalFromHomeKeyEnter($(".imageFocus"));break;}
               
			case "deleteUser":{Keyhandler.deleteKeyEnter($(".imageFocus"));break;}
			case "player":{Player.playEnterKeydown($('.imageFocus'));;break;}
			case "enterPin":{
			   if(id == "confirmPin"){
			   			   Keyhandler.enterPinKeyEnter($('.mouseFocus'));

			   }break;

               }
               case "enterPinMultiScreenCategories":{
                    if(id == "confirmPin"){
                         Keyhandler.enterPinMultiScreenKeyEnter($('.mouseFocus'));

                    }break;
               }
               

			case "enterPinMovies":{
               if(id == "confirmPin"){
                           Keyhandler.enterPinMoviesKeyEnter($('.mouseFocus'));

               }break;

            }

            case "enterPinSeries":{
               if(id == "confirmPin"){
                           Keyhandler.enterPinSeriesKeyEnter($('.mouseFocus'));

               }break;

            }
            case "enterPinMoviesCategories":{
               if(id == "confirmPin"){
                           Keyhandler.enterPinMoviesCategoriesKeyEnter($('.mouseFocus'));

               }break;

            }

            case "liveCatchupPrograms":{
                    if(role =="catchupSection"){
                            Keyhandler.liveCatchupProgramsEnter ($(".imageFocus"));
                    }else{
                            setActiveAndInactive(this, $('#navlist'));
                    }
                   break;
            }
 
			case "seriesPlayer":{
                    if(id == "closeModal"){
                         $("#backArrow").click();
                    }
                    break;
               }
               case "catchupPlayer":{
                    if(id == "closeModal"){
                         $("#backArrow").click();
                    }
                    break;
               }
               

			case "popUp":{
                    $(".overlay-screen").hide();
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
               ;break;
               }
			case "logout":{
				var index = parseInt($(this).attr("index"));
				if(index == 0){
					pushState(view,$(".imageFocus").attr("id"));
					Main.logOut();
				}
				else{
					
					$("#customMessage").hide();
					$("#customMessage").html('');
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
				break;
			}
			case "exitApp":{
				Keyhandler.exitKeyEnter($('.mouseFocus'));
				break;
			}

			
		}
           
     });
     
     function showMaximumConnectionModal(){
          pushState(view,$(".imageFocus").attr("id"));
          $('.imageFocus').removeClass("imageFocus");
          view = "exitApp";
          $("#genericDiv").html(Util.showPopUp('','', "You have only "+Main.profile.user_info.max_connections+" Max Connection(s)", "","OK"));
          $("#genericDiv").show();
          $("#Btn-0").addClass("imageFocus");
          Main.HideLoading();
     }
     
     
     function multiscreen1Fun(){
          // alert(channel_name_multiscreen);
          Player.type = "live";
          Player.name = channel_name_multiscreen;
          Player.stream_icon = stream_icon_multiscreen;
          // alert(playUrl);
         
          if(currentAPPType == "m3u"){ 
               var playUrl = stream_id_multiscreen;
           }else{
               if(Main.profile.server_info.server_protocol!="" && Main.profile.server_info.server_protocol == "https"){
                    var playUrl = "https://" + Main.profile.server_info.url + ":"+  Main.profile.server_info.https_port+"/live/"+Main.profile.user_info.username+"/"+Main.profile.user_info.password+"/"+stream_id_multiscreen+selectedContainer;
               }else{
                    var playUrl = "http://" + Main.profile.server_info.url + ":"+  Main.profile.server_info.port+"/live/"+Main.profile.user_info.username+"/"+Main.profile.user_info.password+"/"+stream_id_multiscreen+selectedContainer;
               }
           }



          $("#multiscreenPlayerDiv1").show();
          $("#multiscreenPlusImageDiv1").hide();
          $(".ChannelRemove1").show();
          setTimeout(function() { 
               Player.set_flowplayer1(playUrl,true); 
          }, 200);

     }
     function multiscreen2Fun(){
          // alert(channel_name_multiscreen);
          Player.type = "live";
          Player.name = channel_name_multiscreen;
          Player.stream_icon = stream_icon_multiscreen;
          // alert(playUrl);
          if(currentAPPType == "m3u"){ 
               var playUrl = stream_id_multiscreen;
          }else{
               if(Main.profile.server_info.server_protocol!="" && Main.profile.server_info.server_protocol == "https"){
                    var playUrl = "https://" + Main.profile.server_info.url + ":"+  Main.profile.server_info.https_port+"/live/"+Main.profile.user_info.username+"/"+Main.profile.user_info.password+"/"+stream_id_multiscreen+selectedContainer;
               }else{
                    var playUrl = "http://" + Main.profile.server_info.url + ":"+  Main.profile.server_info.port+"/live/"+Main.profile.user_info.username+"/"+Main.profile.user_info.password+"/"+stream_id_multiscreen+selectedContainer;
               }
          }

          $("#multiscreenPlayerDiv2").show();
          $("#multiscreenPlusImageDiv2").hide();
          $(".ChannelRemove2").show();
          setTimeout(function() { 
               Player.set_flowplayer2(playUrl,true); 
          }, 200);

     }
     function multiscreen3Fun(){
          // alert(channel_name_multiscreen);
          Player.type = "live";
          Player.name = channel_name_multiscreen;
          Player.stream_icon = stream_icon_multiscreen;
          // alert(playUrl);
          if(currentAPPType == "m3u"){ 
               var playUrl = stream_id_multiscreen;
          }else{
               if(Main.profile.server_info.server_protocol!="" && Main.profile.server_info.server_protocol == "https"){
                    var playUrl = "https://" + Main.profile.server_info.url+ ":"+  Main.profile.server_info.https_port+"/live/"+Main.profile.user_info.username+"/"+Main.profile.user_info.password+"/"+stream_id_multiscreen+selectedContainer;
               }else{
                    var playUrl = "http://" + Main.profile.server_info.url+ ":"+  Main.profile.server_info.port+"/live/"+Main.profile.user_info.username+"/"+Main.profile.user_info.password+"/"+stream_id_multiscreen+selectedContainer;
               }
          }
          $("#multiscreenPlayerDiv3").show();
          $("#multiscreenPlusImageDiv3").hide();
          $(".ChannelRemove3").show();
          setTimeout(function() { 
               Player.set_flowplayer3(playUrl,true); 
          }, 200);

     }
     function multiscreen4Fun(){
          // alert(channel_name_multiscreen);
          Player.type = "live";
          Player.name = channel_name_multiscreen;
          Player.stream_icon = stream_icon_multiscreen;
          // alert(playUrl);
          if(currentAPPType == "m3u"){ 
               var playUrl = stream_id_multiscreen;
          }else{
               if(Main.profile.server_info.server_protocol!="" && Main.profile.server_info.server_protocol == "https"){
                    var playUrl = "https://" + Main.profile.server_info.url+ ":"+  Main.profile.server_info.https_port+"/live/"+Main.profile.user_info.username+"/"+Main.profile.user_info.password+"/"+stream_id_multiscreen+selectedContainer;
               }else{
                    var playUrl = "http://" + Main.profile.server_info.url+ ":"+  Main.profile.server_info.port+"/live/"+Main.profile.user_info.username+"/"+Main.profile.user_info.password+"/"+stream_id_multiscreen+selectedContainer;
               }
          }
          $("#multiscreenPlayerDiv4").show();
          $("#multiscreenPlusImageDiv4").hide();
          $(".ChannelRemove4").show();
          setTimeout(function() { 
               Player.set_flowplayer4(playUrl,true); 
          }, 200);

     }
	function cursorVisibilityChange(event) {
		var visibility = event.detail.visibility;
		if(visibility){
			// console.log("Cursor appeared");
		
			showArrows();
		}
		else{
			// console.log("Cursor disappeared");
			hideArrows();
		}
	}
	document.addEventListener('cursorStateChange', cursorVisibilityChange, false);


	$(document).on('mousemove','body',function(e){
    	if(view != ""){
    		if($('#leftArrow').css('display')!= 'block')
			{
				arrowsTimeOut = setTimeout(function() {
					if($('#leftArrow').css('display')== 'block')
						hideArrows();   
					clearInterval(arrowsTimeOut);
				},6000);

				showArrows();
			}
                   
    	}
    });


	$(document).on("mouseover",'#downArrow,#upArrow,#leftArrow,#rightArrow,#backArrow',function(){
		$(this).css("opacity",'1');
	});
	$(document).on("mouseout",'#downArrow,#upArrow,#leftArrow,#rightArrow,#backArrow',function(){
		$(this).css("opacity",'0.5');
	});
    

     

	$(document).on("click","#leftArrow",function(e){
		e = tvKeyCode.ArrowLeft;
		Generate.event(e); 
	});

	$(document).on("click","#upArrow",function(e){
		e = tvKeyCode.ArrowUp;
		Generate.event(e); 
	});

	$(document).on("click","#downArrow",function(e){
		e = tvKeyCode.ArrowDown;
		Generate.event(e); 
	});

	$(document).on("click","#rightArrow",function(e){
		e = tvKeyCode.ArrowRight;
		Generate.event(e); 
	});

	$(document).on("click","#backArrow",function(e){
		e = tvKeyCode.Return;
		Generate.event(e); 
	});




	function showArrows() {
		if(view != "player"){
			$("#leftArrow").fadeIn();
			$("#rightArrow").fadeIn();
			$("#upArrow").fadeIn();
			$("#downArrow").fadeIn();
		}
		$("#backArrow").fadeIn();
	
	}
	function hideArrows() {
		$("#leftArrow").fadeOut();
		$("#rightArrow").fadeOut();
		$("#upArrow").fadeOut();
		$("#downArrow").fadeOut();
		$("#backArrow").fadeOut();
     }
     
     $(document).on('click','.showCast', function(){
      
          var data = $(this).data('toggle');
           if(data == "yes"){
             $(document).find('.cast').addClass('d-none');
             $(document).find('.fullcast').removeClass('d-none');
           }else{
              $(document).find('.fullcast').addClass('d-none');
             $(document).find('.cast').removeClass('d-none');
           }
         });


     // function viewdetails(stream_id,type,movie_name,container_extension){
          // alert("Ads");
//     var fulldata = $("#fullsavefav-"+id).val();
//     if(id != "")
//     {
//         if(sortingType !=""){
//             sortingType = sortingType;
//         }
//         $(document).find('#streamViewInfo').html('');
//         $(document).find('#streamViewInfo').html('<div class="loading-view-gif"><img src="themes/plantation/img/loaderImage.gif" style="width:102%;"></div>');
//         jQuery.ajax({
//           type:"POST",
//           url:"includes/ajax-control.php",
//           dataType:"text",
//           data:{
//           action:'getmoviedetailsbyid',
//           streamid:id,
//           fulldata:fulldata,
//           category:"777"
//           },  
//           success:function(response){
//             $(document).find('#streamViewInfo').html('');
//             $(document).find('#streamViewInfo').html(response);
//             if(response !=  ''){
//                // $(document).find('#viewSlider').html('');
//                 totalCast = $(".commomapicastpicture").length;
//                 if(totalCast > 0)
//                 {
//                     $( ".commomapicastpicture" ).each(function( index ) {
//                       thisvaris = $(this);
//                       counteris = $(this).data("counteris");
//                       jQuery.ajax({
//                           type:"POST",
//                           url:"includes/ajax-control.php",
//                           dataType:"text",
//                           data:{
//                             action:'getcastpictureanddata',
//                             index:index,
//                             typeis:"movies",
//                             castname:thisvaris.data("castnameis")
//                           },  
//                           success:function(response2){
//                             $(".castselectorby-"+index).html("");
//                             $(".castselectorby-"+index).html(response2);
//                           }
//                         });  
//                     });
//                 }
//                 jQuery.ajax({
//                   type:"POST",
//                   url:"includes/ajax-control.php",
//                   dataType:"text",
//                   data:{
//                     action:'getmoviedatalimit',
//                     sorting:sortingType,
//                     streamid:id,
//                     sliderfor:'viewinfoslide',
//                     category:"777"
//                   },  
//                   success:function(response2){   
//                     $(document).find('#viewSlider').html("");                 
//                     $(document).find('#viewSlider').html(response2);
//                   }
//                 }); 
//             }
          
//           }
//         });  
//     }
//     $('#viewinfo').modal({
//         show: true
//     }); 
     // Keyhandler.vodMovieKeyEnterNew(stream_id,type,movie_name,container_extension);

// }


     // $(document).ready(function(){
		//$('#slide').animate({scrollLeft: '-=300'},1000);
		
		//  $("#rightArrowTopAdded").click(function(){
          //       alert("asd");
		// $('#slide').animate({scrollLeft: '-=300'},1000);
			
		// });
	
		// $("#leftArrowTopAdded").click(function(){
		//    $('#slide').animate({scrollLeft: '+=300'},1000);
		//    $('#rightArrow').removeClass('d-none');
			
		// });
	
		// if($('#slide').hasClass('noresult-slideView')){
		//   $('#leftArrow').addClass('d-none');
		//   $('#rightArrow').addClass('d-none');
		//   $('.btn-cus-viewall').addClass('d-none');
		// }
	
		// $("#rightArrow_topRated").click(function(){
		// 	$('#slide_topRated').animate({scrollLeft: '-=300'},1000);
		// });
	
		// $("#leftArrow_topRated").click(function(){
		// 	$('#slide_topRated').animate({scrollLeft: '+=300'},1000);
		// 	$('#rightArrow_topRated').removeClass('d-none');
		// });
		
		// if($('#slide_topRated').hasClass('noresult-slideView')){     
		//   $('#leftArrow_topRated').addClass('d-none');
		//   $('#rightArrow_topRated').addClass('d-none');
		// }
	
		// $("#rightArrow_ascend").click(function(){
		// 	$('#slide_ascend').animate({scrollLeft: '-=300'},1000);
		// });
	
		// $("#leftArrow_ascend").click(function(){
		// 	$('#slide_ascend').animate({scrollLeft: '+=300'},1000);
		// 	$('#rightArrow_ascend').removeClass('d-none');
		// });
	
		// if($('#slide_ascend').hasClass('noresult-slideView')){
		//   $('#leftArrow_ascend').addClass('d-none');
		//   $('#rightArrow_ascend').addClass('d-none');
		// }
		
		// $("#rightArrow_descend").click(function(){
		// 	$('#slide_descend').animate({scrollLeft: '-=300'},1000);
		// });
	
		// $("#leftArrow_descend").click(function(){
		// 	$('#slide_descend').animate({scrollLeft: '+=300'},1000);
		// 	$('#rightArrow_descend').removeClass('d-none');
		// });
		// if($('#slide_descend').hasClass('noresult-slideView')){
		//   $('#leftArrow_descend').addClass('d-none');
		//   $('#rightArrow_descend').addClass('d-none');
		// }
	
	// }); 