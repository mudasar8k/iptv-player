Util = {};
Util.splashHtml = function() {
    var Text = "";
    Text += '<div style="overflow:hidden;height:100%;width:100%;background:#0c1013 url(images/logo.png) no-repeat; background-size:25%;background-position:center center;">';
    Text += '</div>';
    return Text;
}
var listMenu = true;
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                ];
var monthFullNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var timeArray =  ['00:00 AM','00:30 AM','01:00 AM','01:30 AM','02:00 AM','02:30 AM','03:00 AM','03:30 AM','04:00 AM','04:30 AM','05:00 AM','05:30 AM','06:00 AM','06:30 AM','07:00 AM','07:30 AM','08:00 AM','08:30 AM','09:00 AM','09:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','12:30 PM','01:00 PM','01:30 PM','02:00 PM','02:30 PM','03:00 PM','03:30 PM','04:00 PM','04:30 PM','05:00 PM','05:30 PM','06:00 PM','06:30 PM','07:00 PM','07:30 PM','08:00 PM','08:30 PM','09:00 PM','09:30 PM','10:00 PM','10:30 PM','11:00 PM','11:30 PM',]//dont remove space between time and Am /pm space is mandetory 
var timeArrayToCompare =  ['00:00 AM','00:30 AM','01:00 AM','01:30 AM','02:00 AM','02:30 AM','03:00 AM','03:30 AM','04:00 AM','04:30 AM','05:00 AM','05:30 AM','06:00 AM','06:30 AM','07:00 AM','07:30 AM','08:00 AM','08:30 AM','09:00 AM','09:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','12:30 PM','13:00 PM','13:30 PM','14:00 PM','14:30 PM','15:00 PM','15:30 PM','16:00 PM','16:30 PM','17:00 PM','17:30 PM','18:00 PM','18:30 PM','19:00 PM','19:30 PM','20:00 PM','20:30 PM','21:00 PM','21:30 PM','22:00 PM','22:30 PM','23:00 PM','23:30 PM',]
 
function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  //return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
  return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() ;
}			


function getDateWithBothFormats(type){
     var data = new Date();
     var hours = data.getHours();
     var minutes = data.getMinutes();

     if(type == "24"){
          if(hours <= 9)
               hours =  '0' + hours ; 
          if(minutes <= 9)
               minutes =  '0' + minutes ; 

          var date = hours + ":"+minutes;

     }else{
          var ampm = hours >= 12 ? 'PM' : 'AM';
          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'
          minutes = minutes < 10 ? '0'+minutes : minutes;
          var date = hours + ':' + minutes + ' ' + ampm; 
     }
     return date;
}
// Home page

Util.gridHomePage = function(){
     Main.profile = JSON.parse(localStorage.getItem("profile"));
     var Text = '';  
     

     if(currentAPPType == "m3u"){
          Text +='<div style="background-image: url(images/backgroundHome.png);width: 100%;height: 100%;    background-size: 100% 100%; position: fixed;">'
          Text +='<div class="container">'
          Text +='<div class="row">'
          Text +='    <div class="col-sm-12" style="padding: 30px;margin-top: 0px;">'
          Text +='        <div class="row">'
                       
     
          Text +='            <div class="col">'
          Text +='                <img src="images/home-logo.png" style="    width: 25%;">'
          Text +='              </div>'
           
                         var data = new Date();
                         var date = getDateWithBothFormats(selectedTimeFormat); 
                         var date2 = monthNames[data.getMonth()] + " " + data.getDate() + ", " + data.getFullYear();
     
          Text +='              <div class="col-md-auto" style="display: flex;">'
          Text +='                <span class="pagesTitle"><h3 class="timeOnAllPages" style="float:left">'+date+'</h3><h3 style="    margin-left: 30px;float:left" class="dateOnAllPages">'+date2+'</h3></span>'
          Text +='              </div>'
     
          // if(Main.multiscreen == true){
     
          //      Text +='              <div class="col-md-auto" style="display: flex;">'
          //      Text +='                <img src="images/user-icon.png" style="margin: auto;" source="headTiles" id="AccountInfoIcon" class="dashboard_boxes">' 
          //      Text +='              </div>'
          // }
          
          // Text +='              <div class="col-md-auto" style="display: flex;">'
          // Text +='                <img src="images/switch-user-icon.png" style="margin: auto;" source="headTiles" id="switchUserIcon" class="dashboard_boxes">' 
          // Text +='              </div>'
     
          Text +='        </div>'
          Text +='    </div>'
              
          Text +='     <div class="col-sm-12" style="    margin-top: 50px;">' 



          Text += '<div class="dashboardScreenMainDiv">'

          Text += '<div class="dashboardScreenBoxes homegridbox1" index=0 source="tiles" id="homeLiveTile">' 
          Text += '</div>'

          Text += '<div class="dashboardScreenBoxes homegridbox2" source="headTiles" id="switchUserIcon">' 
          Text += '</div>'

          if(Main.multiscreen == true){
               Text += '<div class="dashboardScreenBoxes homegridbox3" source="headTiles" id="AccountInfoIcon" style="width:31%;">' 
               Text += '</div>'
     
               Text += '<div class="dashboardScreenBoxes homegridbox5" index=4 source="tiles" id="MultiScreenIcon"  style="width:31%;">' 
               Text += '</div>'
                    
               Text += '<div class="dashboardScreenBoxes homegridbox4" index=5 source="tiles" id="settingTile" style="width:32%;">' 
               Text += '</div>'
          }else{
               Text += '<div class="dashboardScreenBoxes homegridbox3" source="headTiles" id="AccountInfoIcon" >' 
               Text += '</div>'
     
               Text += '<div class="dashboardScreenBoxes homegridbox4" index=5 source="tiles" id="settingTile">' 
               Text += '</div>'
          }




          // Text += '<div class="multiscreenBoxes" id="multiscreen2"><div class="multiscreenPlusImageDiv"><img class="multiscreenPlusImage" src="images/add_more_user.png"></div></div>'
          // Text += '<div class="multiscreenBoxes" id="multiscreen3"><div class="multiscreenPlusImageDiv"><img class="multiscreenPlusImage" src="images/add_more_user.png"></div></div>'
          // Text += '<div class="multiscreenBoxes" id="multiscreen4"><div class="multiscreenPlusImageDiv"><img class="multiscreenPlusImage" src="images/add_more_user.png"></div></div>'
     Text +='</div>'



















 
          Text +='    </div> '
     
          Text +='    <div class="col-sm-12" style="padding: 30px;">' 
          Text +='        <div class="row">'
                        
          // Text +='              <div class="col-sm-6" >'
                    //      var strDate = ""; 
     
                    // if(Main.profile.user_info.exp_date!=null && Main.profile.user_info.exp_date )
                    //      strDate = dateUtil(Main.profile.user_info.exp_date * 1000);
                    // else
                    //      strDate = "Unlimited";
     
          // Text +='                <span class="pagesTitle">Expiration : '+strDate+'</span>'
          // Text +='              </div>'
          Text +='             <div class="col-sm-3">'
          Text +='              </div>'

          Text +='             <div class="col-sm-6" style="text-align: center;">'
          Text +='              </div>'
          Text +='             <div class="col-sm-3" style="text-align: right;">'
          Text +='               <span class="pagesTitle" style="text-align: right;">Logged in : '+Main.profile.playlistname+'</span>'
          Text +='              </div>'
     
          Text +='        </div>'
          Text +='    </div>'
     
     
     
          Text +='  </div>'
     
     
          Text +='  </div>'
          Text +='</div>';
     }else{
          Text +='<div style="background-image: url(images/backgroundHome.png);width: 100%;height: 100%;    background-size: 100% 100%; position: fixed;">'
          Text +='<div class="container">'
          Text +='<div class="row">'
          Text +='    <div class="col-sm-12" style="padding: 30px;margin-top: 0px;">'
          Text +='        <div class="row">'
                       
     
          Text +='            <div class="col">'
          Text +='                <img src="images/home-logo.png" style="    width: 25%;">'
          Text +='              </div>'
           
                         var data = new Date();
                         var date = getDateWithBothFormats(selectedTimeFormat); 
                         var date2 = monthNames[data.getMonth()] + " " + data.getDate() + ", " + data.getFullYear();
     
          Text +='              <div class="col-md-auto" style="display: flex;">'
          Text +='                <span class="pagesTitle"><h3 class="timeOnAllPages" style="float:left">'+date+'</h3><h3 style="    margin-left: 30px;float:left" class="dateOnAllPages">'+date2+'</h3></span>'
          Text +='              </div>'
     
          if(Main.multiscreen == true){
     
               Text +='              <div class="col-md-auto" style="display: flex;">'
               Text +='                <img src="images/user-icon.png" style="margin: auto;" source="headTiles" id="AccountInfoIcon" class="dashboard_boxes">' 
               Text +='              </div>'
          }
          
          Text +='              <div class="col-md-auto" style="display: flex;">'
          Text +='                <img src="images/switch-user-icon.png" style="margin: auto;" source="headTiles" id="switchUserIcon" class="dashboard_boxes">' 
          Text +='              </div>'

          // Text +='              <div class="col-md-auto" style="display: flex;">'
          // Text +='                <span class="aboutAPP" style="font-weight: bold;cursor:pointer;" onclick="Util.aboutAPP()">About</span>' 
          // Text +='              </div>'
     
          Text +='        </div>'
          Text +='    </div>'
              
          Text +='     <div class="col-sm-12">' 
          Text +='         <div class="row">'
          Text +='            <div class="col-sm-4" style="padding: 30px;padding-right: 0px;padding-bottom: 0px;">'
          Text +='            <img src="images/live-tv-background.png" id="homeLiveTile" index=0 source="tiles" class="dashboard_boxes">'
          Text +='            </div>'
          Text +='            <div class="col-sm-8">'
                          
          Text +='                <div class="col-sm-12">'
          Text +='                   <div class="row" style="padding-top: 30px;padding-bottom: 15px;">'  
          Text +='                        <div class="col-6">'
          Text +='                            <img src="images/movie-background.png"  id="moviesTile" index=1 source="tiles"  class="dashboard_boxes">' 
          Text +='                        </div>'
          Text +='                        <div class="col-6">'
          Text +='                            <img src="images/series-background.png"  id="seriesTile" index=2 source="tiles" class="dashboard_boxes">' 
          Text +='                    </div>'
          Text +='                    </div>'
          Text +='               </div>'
          Text +='                <div class="col-sm-12">'  
          Text +='                    <div class="row" style="padding-top: 15px;padding-bottom: 30px;">'
          Text +='                        <div class="col-4">'
          Text +='                            <img src="images/Catchup_background.png" id="listUser" index=3 source="tiles"  class="dashboard_boxes">' 
          Text +='                        </div>'
          if(Main.multiscreen == true){
               Text +='                       <div class="col-4">'
               Text +='                            <img src="images/multiscreen_background.png"   id="accountTile" index=4 source="tiles"  class="dashboard_boxes">' 
               Text +='                        </div>'
          }else{
               Text +='                       <div class="col-4">'
               Text +='                            <img src="images/Account_background.png"   id="accountTile" index=4 source="tiles"  class="dashboard_boxes">' 
               Text +='                        </div>'
          }
          Text +='                        <div class="col-4">'
          Text +='                            <img src="images/Setting_background.png" id="settingTile" index=5 source="tiles"  class="dashboard_boxes">' 
          Text +='                        </div>'
          Text +='                        </div>'
                              
          Text +='                </div> '
          Text +='            </div> '
          Text +='        </div>'
          Text +='    </div> '
     
          Text +='    <div class="col-sm-12" style="padding: 30px;">' 
          Text +='        <div class="row">'
                        
          Text +='              <div class="col-sm-3" >'

          var strDate = ""; 

          try{
     
               if(Main.profile.user_info.exp_date!=null && Main.profile.user_info.exp_date )
                    strDate = dateUtil(Main.profile.user_info.exp_date * 1000);
               else
                    strDate = "Unlimited";
          }catch(e){

          }
                       
     
          Text +='                <span class="pagesTitle">Expiration : '+strDate+'</span>'
          Text +='              </div>'
          Text +='             <div class="col-sm-6" style="text-align: center;">'
          // Text +='               <span class="tosClass" style="text-align: center;">By using this application, you agree to the <a href="javascript:" onclick="Util.createBrowserWindow();">Terms of Services.</a></span>'
          Text +='              </div>'
          Text +='             <div class="col-sm-3" style="text-align: right;">'
          try{
               Text +='               <span class="pagesTitle" style="text-align: right;">Logged in : '+Main.profile.user_info.name+'</span>'

          }catch(e){

          }
          Text +='              </div>'
     
          Text +='        </div>'
          Text +='    </div>'
     
     
     
          Text +='  </div>'
     
     
          Text +='  </div>'
          Text +='</div>';
     }




     if(localStorage.getItem("parentalFromHome") != "true" ){
          $(".overlay-screen").show();
          pushState(view,$(".imageFocus").attr("id"));
          $('.imageFocus').removeClass("imageFocus");
          view = "parentalFromHome";
          $("#genericDiv").html(Util.parentalControlPopUp());
          $("#genericDiv").show();
          $("#Btn-0").addClass("imageFocus");
          Main.HideLoading();
   
          $('#pincode-input1').pincodeInput({hideDigits:true,complete:function(value, e, errorElement){
       
        
        }}); 
      $('#pincode-input2').pincodeInput({hideDigits:true,complete:function(value, e, errorElement){
        
   
 }}); 

 $('#pincode-input1').pincodeInput().data('plugin_pincodeInput').focus()
 
     } 

     
 
	return Text;
}

Util.aboutAPP = function(){
     $(".overlay-screen").show();
     showDateAndTime();
//           localStorage.setItem("parentalFromHome","false");
// alert("asdf");
     pushState(view,$(".imageFocus").attr("id"));
         $('.imageFocus').removeClass("imageFocus");
         view = "exitApp";
         $("#genericDiv").html(Util.showAPPInfo());
         $("#genericDiv").show();
     //     $("#Btn-0").addClass("imageFocus");
         Main.HideLoading();
}

Util.showAPPInfo = function(){ 

      
          var Text = '';
          Text += '<script> $(".overlay-screen").show();</script>'
          Text += '<div class="">'
          Text += '<div class="overlay-screen">'
          Text += '</div>'
          Text += '<div class="popup-Message-container popup-lg" style="font-size: 20px; text-align: center; line-height: 32px;">'
          Text += '<h4 class="popup-subhead">About</h4>'
          Text += '<p>Version 1.2.0</p>'
          Text += '<p>IPTV Smarters Pro - The Best IPTV Player</p>'
          Text += '<p>Developed by <a href="javascript:" onclick="Util.websiteLink();"><u> Smarters</u></a></p>'
          Text += '<p><a href="javascript:" onclick="Util.brandedVersionLink();"><u>Click here</u></a> for Customised / Branded Version</p>'
          Text +=   '<div class="col-md-12 col-lg-12 col-xl-12 remove-padding popup-btn-wrap mt30">'
          Text +=     '<a id="Btn-1" class="popUpBtn  ml30  popUpBtn-red remove-margin" index="1">Close</a>'
          Text +=   '</div>  '
          Text +=   ''
          Text += '</div>'
          Text += ''
          Text += '</div>'
      



     return Text;
}


Util.websiteLink = function(){
     const remote = require('electron').remote;
  const BrowserWindow = remote.BrowserWindow;
  const win = new BrowserWindow({
    height: 600,
    width: 1200,
    fullscreen: false,
  });

  win.loadURL('https://www.whmcssmarters.com/');
}

Util.brandedVersionLink = function(){
     const remote = require('electron').remote;
  const BrowserWindow = remote.BrowserWindow;
  const win = new BrowserWindow({
    height: 600,
    width: 1200,
    fullscreen: false,
  });

  win.loadURL('https://www.whmcssmarters.com/iptv-smarters-pro-for-windows-macos');
}

//je  iss link nu asi sidha chrome te redirect krna hai te asi eh code use krr skde aa 

// Util.createBrowserWindow = function() {
//      // Open the URL in the default browser
//      shell.openExternal('https://www.iptvsmarters.com/terms-and-conditions/');
//    };


Util.createBrowserWindow = function(){
     const remote = require('electron').remote;
  const BrowserWindow = remote.BrowserWindow;
  const win = new BrowserWindow({
    height: 600,
    width: 1200,
    fullscreen: false,
  });

  win.loadURL('https://www.iptvsmarters.com/terms-and-conditions/');
}

Util.multiscreenPage = function(){ 

     var Text = '';

     Text += '<div class="mainAccount">'
     
     Text +='<div class="container">'
     Text +='<div class="row">'
     Text +='<div class="mainHomeContent">'
     Text +='    <div class="col-sm-12" style="padding: 30px;margin-top: 0px;">'
		Text += '<div class="homeHeader">'
          Text +='        <div class="row">'
                  

          Text +='            <div class="col-md-4">'
          Text +='                <img src="images/home-logo.png" class="logImg">'
          Text +='              </div>'
           

                         var data = new Date();
                         var date = getDateWithBothFormats(selectedTimeFormat); 
                         var date2 = monthNames[data.getMonth()] + " " + data.getDate() + ", " + data.getFullYear(); 
                         
          Text +='              <div class="col-md-4" style="display: flex;">'
          Text +='                <span style="color: white;margin: auto;" class="main-title">MultiScreen</span>'
          Text +='              </div>'


          Text +='              <div class="col-md-4" style="display: flex;">'
          Text +='                <span class="pagesTitle"><h3 class="timeOnAllPages" style="float:left">'+date+'</h3><h3 style="    margin-left: 30px;float:left" class="dateOnAllPages">'+date2+'</h3></span>'
          Text +='              </div>'
          // Text +='              <div class="col-md-auto" style="display: flex;">'
          // Text +='                <img src="images/switch-user-icon.png" style="margin: auto;    visibility: hidden;" class="dashboard_boxes">' 
          // Text +='              </div>'
     
          Text +='        </div>'
          Text +='</div>'; 
          Text +='</div>'; // col sm 12 ends
          Text +='    <div class="col-sm-12">'
          Text +='    <div class="row">'

          Text += '<div class="accountBody" style="    width: 100%;">'
          
               
            


               Text += '<div class="multiScreenMainDiv">'

                    Text += '<div class="multiscreenBoxes" id="multiscreen1">'
                    Text += '<div class="ChannelRemove1"   style="display:none;">Remove Channel</div>'
                    Text += '      <div class="multiscreenPlusImageDiv" id="multiscreenPlusImageDiv1"><img class="multiscreenPlusImage" src="images/add_more_user.png"></div>'
                    Text += '      <div class="multiscreenPlayerDiv" id="multiscreenPlayerDiv1" style="display:none">'

                    Text +='            <div class ="playerDiv"  style=" width: 100%; margin: 0 auto;background: black;float:left;height: 100%;">'
                    Text +='                 <div class ="player playerMovies" id="videoHtml1" source="playerSource" style=" height: 100%;">'
                    Text +='                      <div id="player-wrapper1">'
          
                    Text +='                      </div>'
                    Text +='                 </div>' 
                    Text +='            </div>'

                    Text +='       </div>'
                    Text += '</div>'

                    Text += '<div class="multiscreenBoxes" id="multiscreen2">'
                    Text += '<div class="ChannelRemove2" style="display:none;">Remove Channel</div>'
                    Text += '      <div class="multiscreenPlusImageDiv" id="multiscreenPlusImageDiv2"><img class="multiscreenPlusImage" src="images/add_more_user.png"></div>'
                    Text += '      <div class="multiscreenPlayerDiv" id="multiscreenPlayerDiv2" style="display:none">'

                    Text +='            <div class ="playerDiv"   style=" width: 100%; margin: 0 auto;background: black;float:left;height: 100%;">'
                    Text +='                 <div class ="player playerMovies" id="videoHtml2" source="playerSource" style=" height: 100%;">'
                    Text +='                      <div id="player-wrapper2">'
          
                    Text +='                      </div>'
                    Text +='                 </div>' 
                    Text +='            </div>'

                    Text +='       </div>'
                    Text += '</div>'

                    Text += '<div class="multiscreenBoxes" id="multiscreen3">'
                    Text += '<div class="ChannelRemove3" style="display:none;">Remove Channel</div>'
                    Text += '      <div class="multiscreenPlusImageDiv" id="multiscreenPlusImageDiv3"><img class="multiscreenPlusImage" src="images/add_more_user.png"></div>'
                    Text += '      <div class="multiscreenPlayerDiv" id="multiscreenPlayerDiv3" style="display:none">'

                    Text +='            <div class ="playerDiv"  style=" width: 100%; margin: 0 auto;background: black;float:left;height: 100%;">'
                    Text +='                 <div class ="player playerMovies" id="videoHtml3" source="playerSource" style=" height: 100%;">'
                    Text +='                      <div id="player-wrapper3">'
          
                    Text +='                      </div>'
                    Text +='                 </div>' 
                    Text +='            </div>'

                    Text +='       </div>'
                    Text += '</div>'

                    Text += '<div class="multiscreenBoxes" id="multiscreen4">'
                    Text += '<div class="ChannelRemove4" style="display:none;">Remove Channel</div>'
                    Text += '      <div class="multiscreenPlusImageDiv" id="multiscreenPlusImageDiv4"><img class="multiscreenPlusImage" src="images/add_more_user.png"></div>'
                    Text += '      <div class="multiscreenPlayerDiv" id="multiscreenPlayerDiv4" style="display:none">'

                    Text +='            <div class ="playerDiv"   style=" width: 100%; margin: 0 auto;background: black;float:left;height: 100%;">'
                    Text +='                 <div class ="player playerMovies" id="videoHtml4" source="playerSource" style=" height: 100%;">'
                    Text +='                      <div id="player-wrapper4">'
          
                    Text +='                      </div>'
                    Text +='                 </div>' 
                    Text +='            </div>'

                    Text +='       </div>'
                    Text += '</div>'



                    // Text += '<div class="multiscreenBoxes" id="multiscreen2"><div class="multiscreenPlusImageDiv"><img class="multiscreenPlusImage" src="images/add_more_user.png"></div></div>'
                    // Text += '<div class="multiscreenBoxes" id="multiscreen3"><div class="multiscreenPlusImageDiv"><img class="multiscreenPlusImage" src="images/add_more_user.png"></div></div>'
                    // Text += '<div class="multiscreenBoxes" id="multiscreen4"><div class="multiscreenPlusImageDiv"><img class="multiscreenPlusImage" src="images/add_more_user.png"></div></div>'
               Text +='</div>'







               

               
 

               Text +='</div>';
               Text +='</div>';
               Text +='</div>';

		Text += '<div class="homeBottom">'
          
		Text +='</div>';



     Text +='</div></div></div></div>';
     Text +='<div style="display:none;    float: left;width: 100%; height: 100%; z-index: 9999; position: relative;" id="multiscreenCategoriesSections"></div>'
     Text +='<div style="display:none;    float: left;width: 100%; height: 100%; z-index: 9999; position: relative;" id="multiscreenLiveSections"></div>'

	return Text;
}

// Account PAge
Util.accountPage = function(){
	var Text = '';

	Text +='<div style="background-image: url(images/backgroundHome.png);width: 100%;height: 100%;    background-size: 100% 100%; position: fixed;">'
     Text +='<div class="container">'
     Text +='<div class="row">'
     Text +='    <div class="col-sm-12 header-margin-top">'
     Text +='        <div class="row">'
                  

     Text +='            <div class="col">'
     Text +='                <img src="images/home-logo.png" style="    width: 25%;">'
     Text +='              </div>'
     
     var data = new Date();
     var date = getDateWithBothFormats(selectedTimeFormat); 
     var date2 = monthNames[data.getMonth()] + " " + data.getDate() + ", " + data.getFullYear();

     Text +='              <div class="col-md-auto" style="display: flex;">'
     Text +='                <span class="pagesTitle"><h3 class="timeOnAllPages" style="float:left">'+date+'</h3><h3 style="    margin-left: 30px;float:left" class="dateOnAllPages">'+date2+'</h3></span>'
     Text +='              </div>'
     Text +='              <div class="col-md-auto" style="display: flex;">'
     Text +='                <img src="images/switch-user-icon.png" style="margin: auto;    visibility: hidden;" class="dashboard_boxes">' 
     Text +='              </div>'

     Text +='        </div>'
     Text +='    </div>'

		Text += '<div class="accountBody">'
			     Text +='<div class="row accountElementsSettings">';
                    Text +='<div class="account-title-Settings">Account Info</div>';

                    if(currentAPPType == "m3u"){
                         try{
                              Text +='<div class="row accountData">'
                              Text +='<div class="col-md-6">UserName</div><div class="col-md-6">'+Main.profile.playlistname+'</div>';
                              Text +='<div class="col-md-6">Account Status</div><div class="col-md-6">Active</div>'; 
                              Text +='<div class="col-md-6">Expire Date</div><div class="col-md-6"> -- </div>';
                              Text +='<div class="col-md-6">Is Trial</div><div class="col-md-6"> -- </div>';
                              Text +='<div class="col-md-6">Active Connections</div><div class="col-md-6"> -- </div>';
                              Text +='<div class="col-md-6">Created At</div><div class="col-md-6"> -- </div>';
                              Text +='<div class="col-md-6">Max connections</div><div class="col-md-6"> -- </div>';
                         
                         Text +='</div>';
                         }catch(e){

                         }

                    }else{

                         try{
                              Text +='<div class="row accountData">'
                              Text +='<div class="col-md-6">UserName</div><div class="col-md-6">'+Main.profile.user_info.username+'</div>';
                              Text +='<div class="col-md-6">Account Status</div><div class="col-md-6">'+Main.profile.user_info.status+'</div>'; 
                              Text +='<div class="col-md-6">Expire Date</div><div class="col-md-6">'+(Main.profile.user_info.exp_date?dateUtil(Main.profile.user_info.exp_date * 1000) : "Unlimited" )+'</div>';
                              Text +='<div class="col-md-6">Is Trial</div><div class="col-md-6">'+(parseInt (Main.profile.user_info.is_trial)? "Yes":"No")+'</div>';
                              Text +='<div class="col-md-6">Active Connections</div><div class="col-md-6">'+Main.profile.user_info.active_cons+'</div>';
                              Text +='<div class="col-md-6">Created At</div><div class="col-md-6">'+(Main.profile.user_info.created_at ? dateUtil(Main.profile.user_info.created_at * 1000) : "")+'</div>';
                              Text +='<div class="col-md-6">Max connections</div><div class="col-md-6">'+Main.profile.user_info.max_connections+'</div>';
                         
                         Text +='</div>';
                         }catch(e){

                         }

                    }

                    
                    Text +='</div>';

                    Text +='<div class="row accountButtons">';
                         Text += '<div class="col-md-6"><div class="floatLeft"><a id="accountBack" class="btn btn-default accountBtn accountBack imageFocus">BACK</a></div></div>'
                         Text += '<div class="col-md-6"><div class="floatRight"><a id="accountLogout" class="btn btn-default accountBtn accoutnLogout">LOGOUT</a></div></div>'
                    Text +='</div>';
		Text +='</div>';

		Text += '<div class="homeBottom">'
               
		Text +='</div>';



	Text +='</div></div>';

	return Text;
}



// settings Page
Util.settingsPage = function(){
	var Text = '';

     Text += '<div class="mainAccount">'
     
     Text +='<div class="container">'
     Text +='<div class="row">'
     Text +='<div class="mainHomeContent">'
     Text +='    <div class="col-sm-12 header-margin-top" >'
		Text += '<div class="homeHeader">'
          Text +='        <div class="row">'
                  

          Text +='            <div class="col-md-4">'
          Text +='                <img src="images/home-logo.png" class="logImg">'
          Text +='              </div>'
          
                         // var data = new Date();
     
                         // var hours = data.getHours();
                         // if(hours <= 9)
                         //      hours =  '0' + hours ; 
                         // var minutes = data.getMinutes();
                         // if(minutes <= 9)
                         //      minutes =  '0' + minutes ; 
     
                         // var date = hours + ":"+minutes;
     
                         
                         // var date2 = monthNames[data.getMonth()] + " " + data.getDate() + ", " + data.getFullYear();

                         var data = new Date();
                         var date = getDateWithBothFormats(selectedTimeFormat); 
                         var date2 = monthNames[data.getMonth()] + " " + data.getDate() + ", " + data.getFullYear(); 
                         
          Text +='              <div class="col-md-4" style="display: flex;">'
          Text +='                <span style="color: white;margin: auto;" class="main-title">Settings</span>'
          Text +='              </div>'


          Text +='              <div class="col-md-4" style="display: flex;">'
          Text +='                <span class="pagesTitle"><h3 class="timeOnAllPages" style="float:left">'+date+'</h3><h3 style="    margin-left: 30px;float:left" class="dateOnAllPages">'+date2+'</h3></span>'
          Text +='              </div>'
          // Text +='              <div class="col-md-auto" style="display: flex;">'
          // Text +='                <img src="images/switch-user-icon.png" style="margin: auto;    visibility: hidden;" class="dashboard_boxes">' 
          // Text +='              </div>'
     
          Text +='        </div>'
          Text +='</div>'; 
          Text +='</div>'; // col sm 12 ends
          Text +='    <div class="col-sm-12">'
          Text +='    <div class="row">'

          Text += '<div class="accountBody" style="    width: 100%;">'
          
          // Text += '<div class="blurred-box">'


          // Text += '<div class="user-login-box">'
          // Text += '<span class="user-icon"></span>'


          // Text += '</div>'
          // Text += '</div>'
               
               Text += '<div id="parentControlBox" class=" settingsTile imageFocus">'
                    Text += '<div class="sTile">'
                         Text += '<div><img class="sImg" src="images/livetv.png"></div>'
                         Text += '<div class="sText" style="text-shadow: 3px 4px 6px black;">Parental Control</div>'
                         Text += '<div class="sText-small">Currently: '+( (parentPin == "" ) ? '<span class="pinDisabled pinOnOff">Disabled</span>':'<span class="pinEnabled">Enabled</span>')+'</div>'
                    Text +='</div>'
               Text +='</div>';

               if(currentAPPType != "m3u"){
                    Text += '<div id="playerControl"  class=" settingsTile">'
                    Text += '<div class="sTile">'
                         Text += '<div><img class="sImg" src="images/movies.png"></div>'
                         Text += '<div class="sText" style="text-shadow: 3px 4px 6px black;">Stream Format</div>'
                         Text += '<div class="sText-small">Current Format: <span style="font-weight: bold;" id="selectedContainerID"> '+( (selectedContainer == ".ts" ) ? "MPEGTS (.ts)":"") + ( (selectedContainer == ".m3u8" ) ? "HLS (.m3u8)":"")+'  </span></div>'
                    Text +='</div>'
               Text +='</div>';
               }


               Text += '<div id="timeFormatSettings"  class=" settingsTile">'
                    Text += '<div class="sTile">'
                         Text += '<div><img class="sImg" src="images/tv_arch.png"></div>'
                         Text += '<div class="sText" style="text-shadow: 3px 4px 6px black;">Time Format</div>'
                         Text += '<div class="sText-small">Current Format: <span style="font-weight: bold;" id="selectedTimeFormatID">'+( (selectedTimeFormat == "24" ) ? "24 Hour":"") +( (selectedTimeFormat == "12" ) ? "12 Hour":"") +'</span></div>'
                    Text +='</div>'
               Text +='</div>';

               
 

               Text +='</div>';
               Text +='</div>';
               Text +='</div>';

		Text += '<div class="homeBottom">'
          
		Text +='</div>';



	Text +='</div></div></div></div>';

	return Text;
}

// Inner Settings
Util.settingSection = function(){
	var Text = '';
     Text += '<div class="mainAccount">'
     Text +='<div class="container">'
     Text +='<div class="row">'
     Text +='<div class="mainHomeContent">'
     Text +='    <div class="col-sm-12 header-margin-top">'
		Text += '<div class="homeHeader">'
			Text +='<div class="row">';
				Text += '<div class="col-md-4"><img src="images/home-logo.png" class="logImg"/></div>';
                    Text += '<div class="col-md-4" style="display: flex;"><span style="color: white;margin: auto;" class="main-title">'
                    if(selectSetting =="playerControl"){
                         Text += 'Settings / Stream Format'
                    }else if(selectSetting == "parentControlBox"){
                         Text += 'Settings / Parental Control' 
                    }else if(selectSetting == "timeFormatSettings"){
                         Text += 'Settings / Time Format'
                    }
                    Text +='</span></div>'
                    //  Settings / '+(selectSetting == "playerControl" ? "Stream Format" : "Parental Control")+'</span></div>


                    var data = new Date();
                    var date = getDateWithBothFormats(selectedTimeFormat); 
                    var date2 = monthNames[data.getMonth()] + " " + data.getDate() + ", " + data.getFullYear();

     Text +='              <div class="col-md-4" style="display: flex;">'
     Text +='                <span class="pagesTitle"><h3 class="timeOnAllPages" style="float:left">'+date+'</h3><h3 style="    margin-left: 30px;float:left" class="dateOnAllPages">'+date2+'</h3></span>'
     Text +='              </div>'
                    
                    //<div class="floatRight"><img src="images/bell-icon.png"  source="headTiles" id="bellIcon" class="bellIcon" style=""><img src="images/switch-user-icon.png"  source="headTiles" style="" class="switchUser" id="switchUser"/></div>
			Text +='</div>';
          Text +='</div>';
          Text +='</div>'; // col sm 12 ends
          Text +='    <div class="col-sm-12">'
          Text +='    <div class="row">'
		Text += '<div class="accountBody">'
			     Text +='<div class="row accountElementsSettings">';
			     if(selectSetting == "parentControl" && parentPin == ''){
			         Text +='<div class="account-title-Settings">Parental Control</div>';
			     }else if(selectSetting == "playerControl"){
			      	 Text +='<div class="account-title-Settings">Stream Format</div>';
			     }else if(selectSetting == "timeFormatSettings"){
                         Text +='<div class="account-title-Settings">Time Format</div>';
                    }else if(selectSetting == "parentControlBox"){
                     Text +='<div class="account-title-Settings">Parental Control</div>';
                    }else if(selectSetting == "parentControlTurnOff" && parentPin){
                         Text +='<div class="account-title-Settings">Turn Off Parental Control</div>';
                    }else{
                         selectSetting ="updateParentaControl";
                         Text +='<div class="account-title-Settings">Update Parental Control Pin</div>';
                         }


                   
			     if(selectSetting == "parentControl" && parentPin == ''){
                         Text +='<div class="row pinControl">'
                              // Text +='<div class="form-group">'
                              //      Text +=' <label for="pin" class="epgRow" style="    margin-left: 0px;padding-left: 0px;">Enter Your Pin:</label>'
                              //      Text += '<input type="password" class="form-control pinSetting" max-length="10"  source="sourceAddPinField" id="pin">'
                              // Text +='</div>'
                              
                              // Text +='<div class="form-group">'
                              //      Text +=' <label for="cpin" class="epgRow" style="    margin-left: 0px;padding-left: 0px;">Confirm Your Pin</label>'
                              //      Text += '<input type="password" class="form-control pinSetting"  max-length="10" source="sourceAddPinField"  id="cpin">'
                              // Text +='</div>'

                              Text += '<div style="    margin: 0 auto; width: 60%;float:left">'
                              Text +='       <label for="pin"  class="epgRow" style="margin-left: 0px;padding-left: 0px;float: left;width: 28%;margin-top: 7px;">Enter Your Pin:</label>'
                              Text +='       <input type="password" id="pin">'
                              Text +='</div>'
                         
                              Text += '<div style="    margin: 0 auto; width: 60%;float:left;    margin-top: 50px;">'
                              Text +='       <label for="pin"  class="epgRow" style="margin-left: 0px;padding-left: 0px;float: left;width: 28%;margin-top: 7px;">Confirm Your Pin:</label>'
                              Text +='       <input type="password" id="cpin">'
                              Text +='</div>'
                         Text +='</div>'
			     }else if(selectSetting == "playerControl"){
                         // alert(selectedContainer);
                           Text +='<div class="row accountData">'
                            Text +='<label class="containerBtn imageFocus" index=0 id="containerBtn-0"  source="inputButtons"> HLS (.m3u8)<input   type="radio" '+(selectedContainer == ".m3u8" ? "checked":"")+' name="radio" value=".m3u8"> <span class="checkmark"></span></label>'
                            Text +='<label class="containerBtn" index=1 id="containerBtn-1" source="inputButtons"> MPEGTS (.ts)<input  type="radio" '+( (selectedContainer == ".ts" ) ? "checked":"")+' name="radio" value=".ts"> <span class="checkmark"></span></label>'
                            Text +='</div>';

                 }else if(selectSetting == "timeFormatSettings"){
                    Text +='<div class="row accountData">'
                    Text +='<label class="containerBtn imageFocus" index=0 id="containerBtn-0"  source="inputButtons"> 24 Hour Format<input   type="radio" '+(selectedTimeFormat == "24" ? "checked":"")+' name="radio" value="24"> <span class="checkmark"></span></label>'
                    Text +='<label class="containerBtn" index=1 id="containerBtn-1" source="inputButtons"> 12 Hour Format<input  type="radio" '+( (selectedTimeFormat == "12" ) ? "checked":"")+' name="radio" value="12"> <span class="checkmark"></span></label>'
                    Text +='</div>';
                 }else if(selectSetting == "parentControlBox"){
                        Text +='<div class="row accountButtons" style="    margin-bottom: 100px; margin-top: 50px; margin-left: 50px;">'
                            if(parentPin == ''){
                                 Text +='<div class="col-md-4"><div class="floatLeft"><a id="addNewPin" class="btn btn-default accountBtn accountBack imageFocus" source="parentalBtn">Add New Pin</a></div></div>'
                            }else{
                                 Text +='<div class="col-md-4"><div class="floatLeft"><a id="addNewPin" class="btn btn-default accountBtn accountBack imageFocus" source="parentalBtn">Update Pin</a></div></div>'
                            }
                            Text +='<div class="col-md-4"><div class="floatLeft"><a id="turnOffPin" class="btn btn-default accountBtn accoutnLogout" source="parentalBtn" >Turn Off Pin</a></div></div>'
                            Text +='<div class="col-md-4"><div class="floatLeft"><a id="accountClose" class="btn btn-default accountBtn accoutnSeriesButton" source="parentalBtn" >Back</a></div></div>'

                        Text +='</div>'

                 }else if(selectSetting == "parentControlTurnOff" && parentPin){
                        Text +='<div class="row pinControl" style="    margin-left: 65px; margin-right: 65px; padding: 0px;">'
                         //  Text +='<div class="form-group">'
                         //       Text +=' <label for="opin" class="epgRow" style="margin-left: 0px;padding: 0px;">Enter your old Pin:</label>'
                         //       Text += '<input type="password" class="form-control pinSetting" max-length="10"  source="sourceParentControlTurnOffField" id="opin">'
                         //  Text +='</div>'
                         Text += '<div style="    margin: 0 auto; width: 100%;float:left">'
                         Text +='       <label for="opin"  class="epgRow" style="margin-left: 0px;padding-left: 0px;float: left;width: 28%;margin-top: 7px;">Enter Your Old Pin:</label>'
                         Text +='       <input type="password" id="opin">'
                         Text +='</div>'

                 }else{


                     Text +='<div class="row pinControl">'
                    //  Text +='<div class="form-group">'
                    //       Text +=' <label for="opin" class="epgRow" style="margin-left: 0px;padding: 0px;">Old Pin:</label>'
                    //       Text += '<input type="password" class="form-control pinSetting" max-length="10"  source="sourceUpdatePinField" id="opin">'
                    //  Text +='</div>'
                    Text += '<div style="    margin: 0 auto; width: 100%;float:left;    margin-bottom: 50px;">'
                    Text +='       <label for="opin"  class="epgRow" style="margin-left: 0px;padding-left: 0px;float: left;width: 28%;margin-top: 7px;">Enter Your Old Pin:</label>'
                    Text +='       <input type="password" id="opin">'
                    Text +='</div>'

                    Text += '<div style="    margin: 0 auto; width: 100%;float:left">'
                    Text +='       <label for="pin"  class="epgRow" style="margin-left: 0px;padding-left: 0px;float: left;width: 28%;margin-top: 7px;">Enter Your Pin:</label>'
                    Text +='       <input type="password" id="pin">'
                    Text +='</div>'
               
                    Text += '<div style="    margin: 0 auto; width: 100%;float:left;    margin-top: 50px;">'
                    Text +='       <label for="pin"  class="epgRow" style="margin-left: 0px;padding-left: 0px;float: left;width: 28%;margin-top: 7px;">Confirm Your Pin:</label>'
                    Text +='       <input type="password" id="cpin">'
                    Text +='</div>'

                    //  Text +='<div class="form-group">'
                    //       Text +=' <label for="pin" class="epgRow" style="margin-left: 0px;padding: 0px;">New Pin</label>'
                    //       Text += '<input type="password" class="form-control pinSetting"  max-length="10" source="sourceUpdatePinField"  id="pin">'
                    //  Text +='</div>'

                    //  Text +='<div class="form-group">'
                    //       Text +=' <label for="cpin" class="epgRow" style="margin-left: 0px;padding: 0px;">Confirm Pin</label>'
                    //       Text += '<input type="password" class="form-control pinSetting"  max-length="10" source="sourceUpdatePinField"  id="cpin">'
                    //  Text +='</div>'
                     Text +='</div>'
                }
                   
                    
                    Text +='</div>';

			     if(selectSetting == "parentControl" && parentPin != ''){
                      Text +='<div class="row accountButtons">';
                          Text += '<div class="col-md-4"><div class="floatLeft"><a id="pinUpdate" class="btn btn-default accountBtn accoutnLogout "  source="sourceUpdatePin">UPDATE</a></div></div>'
                          Text += '<div class="col-md-4"></div>'
                          Text += '<div class="col-md-4"><div class="floatRight"><a id="accountCloseParental" class="btn btn-default accountBtn accountBack"  source="sourceUpdatePin">CLOSE</a></div></div>'
                      Text +='</div>';
                  }else if(selectSetting == "parentControlBox"){

                   }else if(selectSetting == "parentControlTurnOff" && parentPin){
                       Text +='<div class="row accountButtons" style="    margin-bottom: 50px; margin-left: 50px; margin-right: 50px;">';
                           Text += '<div class="col-md-4"><div class="floatLeft"><a id="turnOffPinSave" class="btn btn-default accountBtn accountBack "  source="sourceParentControlTurnOff">OK</a></div></div>'
                           Text += '<div class="col-md-4"></div>'
                           Text += '<div class="col-md-4"><div class="floatRight"><a id="accountCloseParental" class="btn btn-default accountBtn accoutnLogout"  source="sourceParentControlTurnOff">CLOSE</a></div></div>'
                       Text +='</div>';

                   }else if(selectSetting == "parentControl" && parentPin == ''){
                       Text +='<div class="row accountButtons">';
                          Text += '<div class="col-md-4"><div class="floatLeft"><a id="accountSave" class="btn btn-default accountBtn accountBack "  source="sourceAddPin">SAVE</a></div></div>'
                          Text += '<div class="col-md-4"></div>'
                          Text += '<div class="col-md-4"><div class="floatRight"><a id="accountCloseParental" class="btn btn-default accountBtn accoutnLogout"  source="sourceAddPin">CLOSE</a></div></div>'
                      Text +='</div>';

                   }else if(selectSetting == "timeFormatSettings"){
                         Text +='<div class="row accountButtons">';
                         Text += '<div class="col-md-4"><div class="floatLeft"><a id="timeFormatSave" class="btn btn-default accountBtn accountBack "  source="settingBtn">SAVE</a></div></div>'
                         Text += '<div class="col-md-4"></div>'
                         Text += '<div class="col-md-4"><div class="floatRight"><a id="timeFormatClose" class="btn btn-default accountBtn accoutnLogout"  source="settingBtn">CLOSE</a></div></div>'
                         Text +='</div>';
                   }else{

                   Text +='<div class="row accountButtons">';
                       Text += '<div class="col-md-4"><div class="floatLeft"><a id="accountSave" class="btn btn-default accountBtn accountBack "  source="settingBtn">SAVE</a></div></div>'
                       Text += '<div class="col-md-4"></div>'
                       Text += '<div class="col-md-4"><div class="floatRight"><a id="accountClose" class="btn btn-default accountBtn accoutnSeriesButton"  source="settingBtn">CLOSE</a></div></div>'
                   Text +='</div>';
                  }

		Text +='</div>';

		Text += '<div class="homeBottom">'
               
		Text +='</div>';



          Text +='</div></div></div></div>';

	return Text;
}

Util.castImages = function(castData){  
     var Text = '';

     Text +='                           <div class="row slider-row" style="'
     Text +='padding-left: 75px;'
     Text +='padding-right: 75px;'
     Text +='">'
     Text +='      <div class="col-md-12">'
     Text +='        <h3 class="related-slide">Cast</h3>'
     Text +='        <div class="view-slide slider responsive scrollBarClass" id="viewSliderCastImages">'
// alert(castData);
                         for(var i = 0;i < castData.length;i++){ 
                               Text +='<div class="sliderimage-div '+i+'"> '
                               if(castData[i].gender == 1){
                                   Text +='<img src="'+TMDB_IMAGE_BASE_URL_SMALL+castData[i].profile_path+'" onerror="this.src=\'images/female_avatar.png\';"class="sec-images" alt=""  class="sec-images"> '
                               }else if(castData[i].gender == 2){
                                   Text +='<img src="'+TMDB_IMAGE_BASE_URL_SMALL+castData[i].profile_path+'" onerror="this.src=\'images/male_avatar.png\';"class="sec-images" alt=""  class="sec-images"> '
                               }else{
                                   Text +='<img src="'+TMDB_IMAGE_BASE_URL_SMALL+castData[i].profile_path+'" onerror="this.src=\'images/unknown_avatar.png\';"class="sec-images" alt=""  class="sec-images"> '
                               }
                               
                               Text +='<div class="img-title shows-image" source="castImages" id="castImage-'+castData[i].id+'"  cast_id="'+castData[i].id+'" index="'+i+'">	 <span class="movies-title">'+castData[i].name+'</span>      <div class="castHover"><img src="images/information-icon.png"></div>   </div>     </div>'
                         } 
                      
     Text +='                           <div class="prev">'
     Text +='                   <img src="images/left-arrow-white.png" alt="" class="prev-icon d-none" id="rightArrow_castImages">'
     Text +='               </div>'
     Text +='               <div class="next">'
     Text +='                   <img src="images/right-arrow-white.png" alt="" class="next-icon" id="leftArrow_castImages">'
     Text +='               </div>'
     Text +='                           </div>'
     Text +='       </div>'
     Text +='         </div>'

     return Text;

}


Util.castImagesSeries = function(castData){  
     var Text = '';

     Text +='        <div class="view-slide slider responsive scrollBarClass" id="viewSliderCastImages">'
// alert(castData);
                         for(var i = 0;i < castData.length;i++){ 
                               Text +='<div class="sliderimage-div '+i+'"> '
                               if(castData[i].gender == 1){
                                   Text +='<img src="'+TMDB_IMAGE_BASE_URL_SMALL+castData[i].profile_path+'" onerror="this.src=\'images/female_avatar.png\';"class="sec-images" alt=""  class="sec-images"> '
                               }else if(castData[i].gender == 2){
                                   Text +='<img src="'+TMDB_IMAGE_BASE_URL_SMALL+castData[i].profile_path+'" onerror="this.src=\'images/male_avatar.png\';"class="sec-images" alt=""  class="sec-images"> '
                               }else{
                                   Text +='<img src="'+TMDB_IMAGE_BASE_URL_SMALL+castData[i].profile_path+'" onerror="this.src=\'images/unknown_avatar.png\';"class="sec-images" alt=""  class="sec-images"> '
                               }
                               
                               Text +='<div class="img-title shows-image" source="castImages" id="castImage-'+castData[i].id+'"  cast_id="'+castData[i].id+'" index="'+i+'">	 <span class="movies-title">'+castData[i].name+'</span>      <div class="castHover"><img src="images/information-icon.png"></div>   </div>     </div>'
                         } 
                      
     Text +='                           <div class="prev">'
     Text +='                   <img src="images/left-arrow-white.png" alt="" class="prev-icon d-none" id="rightArrow_castImages">'
     Text +='               </div>'
     Text +='               <div class="next">'
     Text +='                   <img src="images/right-arrow-white.png" alt="" class="next-icon" id="leftArrow_castImages">'
     Text +='               </div>'
     Text +='                           </div>'

     return Text;

}
 

Util.singleCast = function(){

     try{
          clearInterval(intervalTesting);
     }catch(e){

     }

	var Text = '';
     
     Text +='<div class="col-sm-12 no-padding" style="    margin: 0px;"><div class="header clearfix clearfixHeight" id="heading"><div class="row movies_title_height" ><div class="logo col-sm-2"><img src="images/home-logo.png"></div><div class="col-sm-9 text-center"><h1 class="main-title">CAST INFORMATION</h1></div><div class="col-md-1"></div></div></div></div><div class="modal show paddingTopClearFlix scrollBarClass" id="viewinfo" tabindex="-1" role="dialog" aria-labelledby="viewinfoLabel" style="display: block;padding-left: 0px;overflow: auto;overflow-x:hidden;" aria-modal="true">'
     Text +='<div class="" role="document" id="streamViewInfo">'
     


               try{
                    if(singleCast.profile_path){
                         Text +=' <div class="viewinfo-content" id="moviesPageBackground" style="background: url('+TMDB_IMAGE_BASE_URL_LARGE+singleCast.profile_path+');background-position: center;background-repeat: no-repeat;background-size: cover;background-color: #233035;background-blend-mode: overlay;width:100vw;height:100%;transition:all 1.0s ease-in-out;">'
      
                    }else{
                         Text +=' <div class="viewinfo-content"  id="moviesPageBackground"  style="background-color: #233035;background-blend-mode: overlay;width:100vw;height:100%;">'
                    }
               }catch(err){
                    Text +=' <div class="viewinfo-content"  id="moviesPageBackground"  style="background-color: #233035;background-blend-mode: overlay;width:100vw;height:100%;">'
               }
               

     Text +='   <div class="detailsexploresection" style="height:100%;">	' 
     Text +='       <div class="modal-body viewinfo-body" style=" height:100%;">	'

     Text +='        <div class="row streamview">'
     Text +='            <div class="col-md-2 info-poster">'
     Text +='               <div class="stream-icon">'
   

     try{
          if(singleCast.gender == 1){
               Text +='<img src="'+TMDB_IMAGE_BASE_URL_SMALL+singleCast.profile_path+'" onerror="this.src=\'images/female_avatar.png\';"class="stream-image" alt=""  class="stream-image"> '
           }else if(singleCast.gender == 2){
               Text +='<img src="'+TMDB_IMAGE_BASE_URL_SMALL+singleCast.profile_path+'" onerror="this.src=\'images/male_avatar.png\';"class="stream-image" alt=""  class="stream-image"> '
           }else{
               Text +='<img src="'+TMDB_IMAGE_BASE_URL_SMALL+singleCast.profile_path+'" onerror="this.src=\'images/unknown_avatar.png\';"class="stream-image" alt=""  class="stream-image"> '
           }
     }catch(err){
          Text +='                 <img src="images/unknown_avatar.png" onerror="this.src=\'images/unknown_avatar.png\';"class="stream-image">'
     }
     



     Text +='              </div>'


     
 
     Text +='             </div>'
     Text +='             <div class="col-md-8 offset-md-1">'




     Text +='              <div class="stream-details col-md-12">'
     Text +='                <div class="stream-title">'
     Text +='                  <h1 style="    margin-top: 0px;    float: left;width: 100%;"><span style="text-overflow: ellipsis; display: block; overflow: hidden; width: 90%; float: left;">'
     if(singleCast!=null && singleCast.name!=null){
          Text += singleCast.name
     } 

     Text +='</span>'
     

     // var allMoviesFavourites = JSON.parse(localStorage.getItem("allMoviesFavourites"));
     //                                                   //  console.log(allMoviesFavourites);

     //                              if(allMoviesFavourites !== null) {
     //                                for(var j=0;j<allMoviesFavourites.length;j++){
     //                                       if(allMoviesFavourites[j][0] == Main.profile.user_info.login_url){
     //                                           var items =  allMoviesFavourites[j][1];
     //                                       }
     //                                }
     //                              } 
                  








     Text +='                  </h1>'
     Text +='                 </div>'
                      
     Text +='               </div>'
     Text +='               <div class="stream-persona col-md-12" style="    padding: 0px;">'
     Text +='                 <span class="direct-persona col-md-3"><i class="fas fa-birthday-cake"></i> Date of Birth</span>'
     Text +='                <span class="direct-persona col-md-3"><i class="fas fa-map-marker-alt"></i> Place of Birth</span>'
     Text +='                <span class="direct-persona col-md-3"><i class="fas fa-restroom"></i> Gender</span>'
     Text +='                <span class="direct-persona col-md-3"><i class="fas fa-film"></i> Known for</span>'
     Text +='              </div>'
     Text +='               <div class="stream-persona-info col-md-12" style="    padding: 0px;">'
          if(singleCast.birthday){
               var data = new Date(singleCast.birthday);
               var date2 = monthNames[data.getMonth()] + " " + data.getDate() + ", " + data.getFullYear();
               Text +='                 <span class="direct-persona-info col-md-3"> '+date2+'</span>'
          }else{
               Text +='                 <span class="direct-persona-info col-md-3"> N/a </span>'
          }
          
                         

     Text +='                 <span class="direct-persona-info col-md-3"> '+(singleCast.place_of_birth?singleCast.place_of_birth:"N/a")+'</span>'
     var gender = "N/a";
     if(singleCast.gender == 1){
          gender = "Female";
     }else if(singleCast.gender == 2){
          gender = "Male";
     }
     Text +='                <span class="direct-persona-info col-md-3"> '+gender+'</span>' 
     Text +='                 <span class="direct-persona-info col-md-3"> '+(singleCast.known_for_department?singleCast.known_for_department:"N/a")+'</span>'

     Text +='               </div>'
     
     if(singleCast.deathday!=null){
               var data = new Date(singleCast.deathday);
               var date2 = monthNames[data.getMonth()] + " " + data.getDate() + ", " + data.getFullYear();
               Text +='       <div class="stream-description col-md-12"><span class="direct-persona col-md-12" style="padding: 0px;"><i class="far fa-calendar-alt"></i> Date of Death: <span style="width: 100%;overflow: hidden;margin-top: 20px;font-size: 20px;font-weight: 100;"> '+date2+'</span></span> </div>'
          
     }
     Text +='               <div class="stream-description col-md-12">'
                                             var desc = '';
                                             if(singleCast.biography && singleCast.biography.length>0){
                                                  // if(singleMovie.info.plot && singleMovie.info.plot.length > 340)
                                                  //      desc =  singleMovie.info.plot.substring(0,340) + "..";
                                                  // else
                                                       desc =  singleCast.biography;
                                             }else{
                                                  desc = 'N/a';
                                             }
     Text +='                   <p>'+desc+'</p>'
     Text +='                </div>'
     Text +='            </div>'


     Text +='             <div class="col-md-2"></div>'


     
     Text +='             <div class="col-md-8 offset-md-1" style="    padding: 0px;">'
    

       


     Text +='               </div>'





     Text +='           </div>'


     

     if(singleCast.images.profiles.length>0){
     Text +=' <div class="row slider-row" style="'
     Text +='padding-left: 75px;'
     Text +='padding-right: 75px;'
     Text +='">'
     Text +='      <div class="col-md-12">'
     Text +='        <h3 class="related-slide">Images</h3>'
    
     Text +='<div class="html-code grid-of-images">'
     Text +='     <div class="popup-gallery">'
     Text +='        <div class="view-slide-cast slider responsive scrollBarClass" id="viewSliderSingleCast">'

     // alert(singleCast.images.profiles.length);
     
                    // var relatedData = vodSectionDetails.slice(0,15);
                    // singleMovieRelatedData = relatedData;
     
     // Text +='     <a href="http://farm9.staticflickr.com/8242/8558295633_f34a55c1c6_b.jpg" title="The Cleaner"><img src="http://farm9.staticflickr.com/8242/8558295633_f34a55c1c6_s.jpg" width="75" height="75"></a>'
     
     
                    for(var i = 0;i < singleCast.images.profiles.length;i++){ 



     

                         
     Text +='                     <div class="castimage-div '+i+'">'
     Text +='                        <a href="' + TMDB_IMAGE_BASE_URL_SMALL+singleCast.images.profiles[i].file_path + '" title="'+singleCast.name+'"><img src="' + TMDB_IMAGE_BASE_URL_SMALL+singleCast.images.profiles[i].file_path + '" alt="" onerror="this.src=\'images/movieTile1.png\';"class="sec-images"></a>'
       

     // Text +='                        <div class="img-title shows-image" source= "related" id="relMovies-'+relatedData[i].stream_id+'" movie_name="'+relatedData[i].name+'" container_extension="'+relatedData[i].container_extension+'" stream_id="'+relatedData[i].stream_id+'" index='+i+'	>	'	                        	
     // Text +='                            <span class="movies-title">'+relatedData[i].name+'</span>'
     // Text += '                                <div class="moviesHover"><img src="images/movie-icon.png"></div>'
 
     // Text +='                         </div>'
     Text +='                    </div>' 
                    }

     

                      
                      
                         
                      
     Text +='                           <div class="prev">'
     Text +='                   <img src="images/left-arrow-white.png" alt="" class="prev-icon d-none" id="rightArrow_singleCast">'
     Text +='               </div>'
     Text +='               <div class="next">'
     Text +='                   <img src="images/right-arrow-white.png" alt="" class="next-icon" id="leftArrow_singleCast">'
     Text +='               </div>'
     Text +='                           </div>'
     Text +='       </div>'
     Text +='         </div>'
     Text +='     </div>'
     Text +='</div>'


}


     Text +='       </div>'
     Text +='       </div>'  
     Text +='      </div>'
     Text +='  </div>'
     Text +='</div>' // modal div

     Text +='<div id="HTML5Div"></div>'
     Text +='  </div> '


     return Text;
 
}

Util.singleMovie = function(){

     try{
          clearInterval(intervalTesting);
     }catch(e){

     }

	var Text = '';
     
     Text +='<div class="col-sm-12 no-padding" style="    margin: 0px;"><div class="header clearfix clearfixHeight" id="heading" ><div class="row movies_title_height" ><div class="logo col-sm-2"><img src="images/home-logo.png"></div><div class="col-sm-9 text-center"><h1 class="main-title">Movie Information</h1></div><div class="col-md-1"></div></div></div></div><div class="modal show paddingTopClearFlix scrollBarClass" id="viewinfo" tabindex="-1" role="dialog" aria-labelledby="viewinfoLabel" style="display: block;padding-left: 0px;overflow: auto;overflow-x:hidden;" aria-modal="true">'
     Text +='<div class="" role="document" id="streamViewInfo">'
     


               try{
                    if(singleMovie.info.backdrop_path){
                         Text +=' <div class="viewinfo-content" id="moviesPageBackground" style="background: url('+singleMovie.info.backdrop_path[0]+');background-position: center;background-repeat: no-repeat;background-size: cover;background-color: #233035;background-blend-mode: overlay;width:100vw;height:100%;transition:all 1.0s ease-in-out;">'
      
                    }else{
                         Text +=' <div class="viewinfo-content"  id="moviesPageBackground"  style="background-color: #233035;background-blend-mode: overlay;width:100vw;height:100%;">'
                    }
               }catch(err){
                    Text +=' <div class="viewinfo-content"  id="moviesPageBackground"  style="background-color: #233035;background-blend-mode: overlay;width:100vw;height:100%;">'
               }
               

     Text +='   <div class="detailsexploresection" style="height:100%;">	' 
     Text +='       <div class="modal-body viewinfo-body" style=" height:100%;    position: relative;">	'

     Text +='        <div class="row streamview">'
     Text +='            <div class="col-md-2 info-poster">'
     Text +='               <div class="stream-icon">'
     try{
          Text +='                 <img src="'+(singleMovie.info.movie_image)+'" onerror="this.src=\'images/movieTile1.png\';"class="stream-image">'
     }catch(err){
          Text +='                 <img src="images/movieTile1.png" onerror="this.src=\'images/movieTile1.png\';"class="stream-image">'
     }
     Text +='              </div>'


     

                                                          
     Text +='               <div class="text-center stream-rating">'
                              var rating = Math.ceil(singleMovie.info.rating / 2);

                              if(rating >= 1){
                                   Text += '<span class="fas fa-star yellow"></span>';
                              }else{
                                   Text += '<span class="far fa-star yellow-empty"></span>';
                              }
                              if(rating >= 2){
                                   Text += '<span class="fas fa-star yellow"></span>';
                              }else{
                                   Text += '<span class="far fa-star yellow-empty"></span>';
                              }
                              if(rating >= 3){
                                   Text += '<span class="fas fa-star yellow"></span>';
                              }else{
                                   Text += '<span class="far fa-star yellow-empty"></span>';
                              }
                              if(rating >= 4){
                                   Text += '<span class="fas fa-star yellow"></span>';
                              }else{
                                   Text += '<span class="far fa-star yellow-empty"></span>';
                              }
                              if(rating >= 5){
                                   Text += '<span class="fas fa-star yellow"></span>';
                              }else{
                                   Text += '<span class="far fa-star yellow-empty"></span>';
                              }
     Text +='               </div>'
     Text +='             </div>'
     Text +='             <div class="col-md-8 offset-md-1">'




     Text +='              <div class="stream-details col-md-12">'
     Text +='                <div class="stream-title">'
     Text +='                  <h1 style="    margin-top: 0px;    float: left;width: 100%;"><span style="text-overflow: ellipsis; display: block; overflow: hidden; width: 90%; float: left;">'
     if(openedMovieName!=null){
          Text += openedMovieName
     } 

     Text +=' </span>'

     var allMoviesFavourites = JSON.parse(localStorage.getItem("allMoviesFavourites"));
                                                       //  console.log(allMoviesFavourites);

                                  if(allMoviesFavourites !== null) {
                                    for(var j=0;j<allMoviesFavourites.length;j++){
                                           if(allMoviesFavourites[j][0] == Main.profile.user_info.login_url){
                                               var items =  allMoviesFavourites[j][1];
                                           }
                                    }
                                  } 
                    if(items!=null && jQuery.inArray(parseInt(openedMovieID), items) != -1) {
                         Text +='                  <i id="removeFromFavMovie" source="favButton" class="fa fa-heart makeFav activefav "  onclick="removeFromFavMovie('+openedMovieID+')" aria-hidden="true" style="float: right;z-index:999999;margin-right:10px;    transition: all .2s ease-in-out;    margin-top: 10px;"></i>'
                    //     Text += '<a  class="btn btn-default accountBtn accountBack" style="border: none;margin-left: 30px;border-radius: 20px;height: 50px;line-height: 38px;" >Remove from Favourite</a>'
                    }else{
                         Text +='                  <i id="addToFavMovie" source="favButton" class="fa fa-heart makeFav " onclick="addToFavMovie('+openedMovieID+')" style="float: right;z-index:999999;margin-right:10px;    transition: all .2s ease-in-out;    margin-top: 10px;"></i>'
                    //     Text += '<a  class="btn btn-default accountBtn accountBack" style="border: none;margin-left: 30px;border-radius: 20px;height: 50px;line-height: 38px;" >Add to Favourite</a>'
                    }








     Text +='                  </h1>'
     Text +='                 </div>'
                      
     Text +='               </div>'
     Text +='               <div class="stream-persona col-md-12" style="    padding: 0px;">'
     Text +='                 <span class="direct-persona col-md-3"><i class="fas fa-bullhorn"></i> Director</span>'
     Text +='                <span class="direct-persona col-md-3"><i class="far fa-calendar-alt"></i> Release Date</span>'
     Text +='                <span class="direct-persona col-md-3"><i class="far fa-clock"></i> Duration</span>'
     Text +='                <span class="direct-persona col-md-3"><i class="fas fa-users"></i> Cast</span>'
     Text +='              </div>'
     Text +='               <div class="stream-persona-info col-md-12" style="    padding: 0px;">'
     Text +='                 <span class="direct-persona-info col-md-3"> '+(singleMovie.info.director?singleMovie.info.director:"N/a")+'</span>'

     if(singleMovie.info.releasedate){
          var data = new Date(singleMovie.info.releasedate);
          var date2 = monthNames[data.getMonth()] + " " + data.getDate() + ", " + data.getFullYear();
          Text +='                 <span class="direct-persona-info col-md-3"> '+date2+'</span>'
     }else{
          Text +='                 <span class="direct-persona-info col-md-3"> N/a </span>'
     }
               

     Text +='                <span class="direct-persona-info col-md-3"> '+(singleMovie.info.duration?singleMovie.info.duration : "N/a")+'</span>'
     Text +='                <span class="direct-persona-info cast col-md-3">'
     var smallCast = '';
     var fullCast = '';
     if(singleMovie.info && singleMovie.info.cast && singleMovie.info.cast.length > 50){
         smallCast = singleMovie.info.cast.substring(0,50) + "..";
         fullCast =  singleMovie.info.cast;
     }else{
          smallCast = singleMovie.info.cast;
          fullCast =  singleMovie.info.cast;
     }
     
     Text +=(smallCast? smallCast : "N/a" )
     
     if(smallCast != fullCast){
          Text +='       <span class="badge badge-info showCast " data-toggle="yes">Show Full Cast</span>'
     }
     Text +='        </span>'
     Text +='                <span class="direct-persona-info fullcast col-md-3 d-none"> '+fullCast+'<span class="badge badge-danger showCast" data-toggle="no">Hide</span></span>'
     Text +='               </div>'
     
     Text +='       <div class="stream-description col-md-12"><span class="direct-persona col-md-12" style="padding: 0px;"><i class="fas fa-film"></i> Genre: <span class="stream-persona-info"> '+( singleMovie.info.genre ? singleMovie.info.genre : "N/a" )+'</span></span> </div>'
     Text +='               <div class="stream-description col-md-12">'
                                             var desc = '';
                                             if(singleMovie.info.plot && singleMovie.info.plot.length>0){
                                                  // if(singleMovie.info.plot && singleMovie.info.plot.length > 340)
                                                  //      desc =  singleMovie.info.plot.substring(0,340) + "..";
                                                  // else
                                                       desc =  singleMovie.info.plot;
                                             }else{
                                                  desc = 'N/a';
                                             }
     Text +='                   <p>'+desc+'</p>'
     Text +='                </div>'
     Text +='            </div>'


     Text +='             <div class="col-md-2"></div>'


     
     Text +='             <div class="col-md-8 offset-md-1" style="    padding: 0px;">'
     if(singleMovie.info.youtube_trailer){
          openedMovieTrailer = singleMovie.info.youtube_trailer;
          Text +='               <div class="view-button" style="    padding-left: 30px;">'
          Text +='                     <button class="btn watchNow-custom playSingle" id="btnPlayTrailer" source="playButton">Watch Trailer</button>'
          Text +='               </div>'
     }else{
          openedMovieTrailer = "";
     }

     if(singleMovie.info.tmdb_id){
          $.ajax({
               url: TMDB_BASE_URL+"movie/"+singleMovie.info.tmdb_id+"?api_key="+TMDB_API_KEY+"&append_to_response=credits",
               // url : Main.profile.user_info.login_url+"/player_api.php?username="+Main.profile.user_info.username+"&password="+Main.profile.user_info.password+"&action=get_series_info"+"&tmdb_id="+singleMovie.info.tmdb_id,
               type : "GET",
               data : {},
               success : function (data) {
                      if(typeof data == "string"){
                          data = JSON.parse(data);
                       }
                      Main.HideLoading();
                    //   console.log(data.credits);

                    try{
                         if(data.credits.cast && data.credits.cast.length>0){
                              var castingImages= Util.castImages(data.credits.cast);
                              $("#castImagesDiv").html(castingImages);
                              $("#castImagesDiv").show('slow');
                         }
                    }catch(e){

                    }
                     

               },
               error : function (errObj) {
               },
               timeout : 80000
           });
     }


     Text +='               <div class="view-button" style="    padding-left: 30px;">'
     Text +='                     <button class="btn watchNow-custom playSingle" id="btnPlayMovie" source="playButton">Watch Now</button>'
     Text +='               </div>'


     Text +='               </div>'





     Text +='           </div>'

     Text +='<div id="castImagesDiv" style="display:none">  </div>'
                                
     Text +='                           <div class="row slider-row" style="'
     Text +='padding-left: 75px;'
     Text +='padding-right: 75px;'
     Text +='">'
     Text +='      <div class="col-md-12">'
     Text +='        <h3 class="related-slide">Related Movies</h3>'
     Text +='        <div class="view-slide slider responsive scrollBarClass" id="viewSlider">'

     
                    var relatedData = vodSectionDetails.slice(0,15);
                    singleMovieRelatedData = relatedData;
                    for(var i = 0;i < relatedData.length;i++){
     //                     Text += '<div class="relatedSec">'
	// Text += '           <div><div class="shows-image"  source= "related" v_index="'+v+'" h_index="'+h+'" movie_name="'+obj.name+'" container_extension="'+obj.container_extension+'" stream_id="'+obj.stream_id+'"	index='+i+' id="relMovies-'+v+"-"+h+'" count='+count+' >'
     // Text += '           <img src="' + obj.stream_icon + '"  onerror="this.src=\'images/movieTile1.png\';" class="posterImage"/>';

     // Text += '<div class="pText"><p>';
     // if(obj.name && obj.name.length < 21)
     //      Text += '<span>'+obj.name+'</span></p></div></div></div>';
     // else	
     //      Text += '<span class="namescroll">'+obj.name+'</span></p></div></div></div>';
	// return Text;
     //                     Text += '</div>'

                         
     Text +='                     <div class="sliderimage-div '+i+'">'
     Text +='                        <img src="' + relatedData[i].stream_icon + '" alt="" onerror="this.src=\'images/movieTile1.png\';"class="sec-images">'
     
     var allMoviesFavourites = JSON.parse(localStorage.getItem("allMoviesFavourites"));
                                                            // console.log(allMoviesFavourites);

                                        if(allMoviesFavourites !== null) {
                                        for(var j=0;j<allMoviesFavourites.length;j++){
                                             if(allMoviesFavourites[j][0] == Main.profile.user_info.login_url){
                                                  var items =  allMoviesFavourites[j][1];
                                             }
                                        }
                                        }
     //working
     if(items!=null && jQuery.inArray(relatedData[i].stream_id, items) != -1) {
          Text += '                          <i class="fa fa-heart makeFav activefav favDiv_'+relatedData[i].stream_id+'" style="transition: all .2s ease-in-out;position: absolute;top: 3px;right: 10px;font-size: 35px;display:block;"></i>'
     } else{
          Text += '                          <i class="fa fa-heart makeFav  favDiv_'+relatedData[i].stream_id+'" style="transition: all .2s ease-in-out;position: absolute;top: 3px;right: 10px;font-size: 35px;display:none;"></i>'

     }


     Text +='                        <div class="img-title shows-image" source= "related" id="relMovies-'+relatedData[i].stream_id+'" movie_name="'+relatedData[i].name+'" container_extension="'+relatedData[i].container_extension+'" stream_id="'+relatedData[i].stream_id+'" index='+i+'	>	'	                        	
     Text +='                            <span class="movies-title">'+relatedData[i].name+'</span>'
     Text += '                                <div class="moviesHover"><img src="images/movie-icon.png"></div>'

     Text += '                             <div class="rating">' //rating div started
                                        var rating = Math.ceil(relatedData[i].rating / 2);

                                        if(rating >= 1){
                                             Text += '<span class="fas fa-star yellow"></span>';
                                        }else{
                                             Text += '<span class="far fa-star yellow-empty"></span>';
                                        }
                                        if(rating >= 2){
                                             Text += '<span class="fas fa-star yellow"></span>';
                                        }else{
                                             Text += '<span class="far fa-star yellow-empty"></span>';
                                        }
                                        if(rating >= 3){
                                             Text += '<span class="fas fa-star yellow"></span>';
                                        }else{
                                             Text += '<span class="far fa-star yellow-empty"></span>';
                                        }
                                        if(rating >= 4){
                                             Text += '<span class="fas fa-star yellow"></span>';
                                        }else{
                                             Text += '<span class="far fa-star yellow-empty"></span>';
                                        }
                                        if(rating >= 5){
                                             Text += '<span class="fas fa-star yellow"></span>';
                                        }else{
                                             Text += '<span class="far fa-star yellow-empty"></span>';
                                        }
                                        
Text+= '                                </div>'; //rating div ended
     Text +='                         </div>'
     Text +='                    </div>' 
                    }
                      
                      
                         
                      
     Text +='                           <div class="prev">'
     Text +='                   <img src="images/left-arrow-white.png" alt="" class="prev-icon d-none" id="rightArrow_relatedMovies">'
     Text +='               </div>'
     Text +='               <div class="next">'
     Text +='                   <img src="images/right-arrow-white.png" alt="" class="next-icon" id="leftArrow_relatedMovies">'
     Text +='               </div>'
     Text +='                           </div>'
     Text +='       </div>'
     Text +='         </div>'
     Text +='       </div>'
     Text +='       </div>'  
     Text +='      </div>'
     Text +='  </div>'
     Text +='</div>' // modal div

     Text +='<div id="HTML5Div"></div>'
     Text +='  </div> '


     return Text;




     // $('#viewinfo').modal({
     //              show: true
     //          }); 
//      var Text = '';
//      Text += '<div  class="no-padding row singleRow" style="margin: 0px;" >';
//           Text += '<div  class="col-sm-12 no-padding" >';
// 			Text += '<div  class= "header clearfix" id="heading" >'
// 			Text += '<div  class="container">'	
// 			Text += '<div class="logo col-sm-4 p-left margin30"><img src="images/home-logo.png"/></div>'
// 			Text += '<div class="col-sm-8 text-center"><h1 class="main-title">Movie INFO</h1></div>'
// 			//Text += '<div class="form-search navItem floatRight col-sm-4 p-right"> <input type="text" placeholder="search" id="searchBox" id="searchBox" id="searchBox" id="searchBox" id="searchBox" id="searchBox" class="searchBar"></div>'
// 			Text += '</div>';
// 			Text += '</div>';
		
//           Text += '</div>'
          
//           Text += "<div class='col-sm-12'>"
//           Text += "<div class='topMovie'>"
//                 if(openedMovieName!=null){
//                       Text += '<div class="singleMovieName">'+openedMovieName+'</div>'
//                 }else{
//                       Text += '<div class="singleMovieName"></div>'
//                 }
//                Text += '<div class="playSingle imageFocus" id="btnPlayMovie" source="playButton"><img src="images/play-icon2.png"></div>'
//                if(singleMovie.info.backdrop_path)
//                     Text+= '<div class="singleImgBack" style="background:url('+singleMovie.info.backdrop_path[0]+') no-repeat;background-size: cover;">'
//                else
//                     Text+= '<div class="singleImgBack" style="background:url(images/vod_backgound.jpg) no-repeat;background-size: cover;">'
//                Text +='</div>'
//           Text +='</div>'
//           Text +='<div class="bottomDiv" style="height: 20%;"></div >';
//                Text += '<div class="container miscContain">'


// ////////////////Started Director and Release Date HTML////////////
//                     Text +='<div class="col-md-12 no-padding">'
//                             Text +='<div class="col-md-6 no-padding">'
//                                 Text +='<div class="col-md-12 no-padding">'
//                                         Text +='<div class="col-md-4">'
//                                                     Text +='<b>Directed By:</b>'
//                                         Text +='</div>'
//                                         Text +='<div class="col-md-8">'
//                                                     Text += (singleMovie.info.director?singleMovie.info.director:"N/a")
//                                         Text +='</div>'
//                                 Text +='</div>'
//                             Text +='</div>'

//                             Text +='<div class="col-md-6 no-padding">'
//                                 Text +='<div class="col-md-12 no-padding">'
//                                         Text +='<div class="col-md-4">'
//                                                     Text +='<b>Release Date:</b>'
//                                         Text +='</div>'
//                                         Text +='<div class="col-md-8">'
//                                                     Text +=(singleMovie.info.releasedate?singleMovie.info.releasedate : "N/a")
//                                         Text +='</div>'
//                                 Text +='</div>'
//                             Text +='</div>'
//                     Text +='</div>'
// ////////////////End Director and Release Date HTML////////////



// ////////////////Started Duration and Cast HTML////////////
//                     Text +='<div class="col-md-12 no-padding">'


//                             Text +='<div class="col-md-6 no-padding">'
//                                 Text +='<div class="col-md-12 no-padding">'
//                                         Text +='<div class="col-md-4">'
//                                                     Text +='<b>Rating:</b>'
//                                         Text +='</div>'
//                                         Text +='<div class="col-md-8">'

//                                                     var rating = Math.ceil(singleMovie.info.rating / 2);
//                                                     //                         alert(rating);
//                                                      if(rating >= 1)
//                                                          Text += '<span class="fa fa-star checked"></span>';
//                                                      else
//                                                           Text += '<span class="fa fa-star "></span>';

//                                                      if(rating >= 2)
//                                                           Text += '<span class="fa fa-star checked"></span>';
//                                                       else
//                                                            Text += '<span class="fa fa-star "></span>';
//                                                      if(rating >= 3)
//                                                            Text += '<span class="fa fa-star checked"></span>';
//                                                        else
//                                                             Text += '<span class="fa fa-star "></span>';
//                                                      if(rating >= 4)
//                                                             Text += '<span class="fa fa-star checked"></span>';
//                                                         else
//                                                              Text += '<span class="fa fa-star "></span>';
//                                                      if(rating >= 5)
//                                                              Text += '<span class="fa fa-star checked"></span>';
//                                                          else
//                                                           Text += '<span class="fa fa-star "></span>';

//                                         Text +='</div>'
//                                 Text +='</div>'
//                             Text +='</div>'


//                             Text +='<div class="col-md-6 no-padding">'
//                                 Text +='<div class="col-md-12 no-padding">'
//                                         Text +='<div class="col-md-4">'
//                                                     Text +='<b>Duration:</b>'
//                                         Text +='</div>'
//                                         Text +='<div class="col-md-8">'
//                                                     Text += (singleMovie.info.duration?singleMovie.info.duration : "N/a")
//                                         Text +='</div>'
//                                 Text +='</div>'
//                             Text +='</div>'

//                     Text +='</div>'
// ////////////////End Duration and Cast HTML////////////


//                                 Text +='<div class="col-md-12 no-padding">'
//                                         Text +='<div class="col-md-2">'
//                                                     Text +='<b>Cast:</b>'
//                                         Text +='</div>'
//                                         Text +='<div class="col-md-10">'
//                                                     var cast = '';
//                                                      if(singleMovie.info && singleMovie.info.cast && singleMovie.info.cast.length > 100)
//                                                           cast = singleMovie.info.cast.substring(0,100) + "..";
//                                                      else
//                                                           cast =  singleMovie.info.cast;
//                                                     Text +=(cast? cast : "N/a" )
//                                         Text +='</div>'
//                                 Text +='</div>'

//                                 Text +='<div class="col-md-12 no-padding">'
//                                         Text +='<div class="col-md-2">'
//                                                     Text +='<b>Description:</b>'
//                                         Text +='</div>'
//                                         Text +='<div class="col-md-10">'
//                                                  var desc = '';
//                                                  if(singleMovie.info.plot && singleMovie.info.plot.length>0){
//                                                     if(singleMovie.info.plot && singleMovie.info.plot.length > 340)
//                                                           desc =  singleMovie.info.plot.substring(0,340) + "..";
//                                                     else
//                                                           desc =  singleMovie.info.plot;
//                                                  }else{
//                                                     desc = 'N/a';
//                                                  }
//                                                     Text +=desc
//                                         Text +='</div>'
//                                 Text +='</div>'



//                Text += '</div>'
               
//                Text += '<div class="container miscContain">'
//                     Text += '<a class="relatedM" style="float:left;">Related Movies</a>'
//                      var allMoviesFavourites = JSON.parse(localStorage.getItem("allMoviesFavourites"));
//                                                         console.log(allMoviesFavourites);

//                                   if(allMoviesFavourites !== null) {
//                                     for(var j=0;j<allMoviesFavourites.length;j++){
//                                            if(allMoviesFavourites[j][0] == Main.profile.user_info.login_url){
//                                                var items =  allMoviesFavourites[j][1];
//                                            }
//                                     }
//                                   }
// //                    var items = JSON.parse(localStorage.getItem('favMoviesList'));
// //                    alert(singleMovie.movie_data.stream_id);
// //                    alert(items);
// //                    alert(openedMovieID);
// //                    alert(singleMovie.movie_data.stream_id);
// //console.log(singleMovie);
//                     if(items!=null && jQuery.inArray(parseInt(openedMovieID), items) != -1) {
//                         Text += '<a id="removeFromFavMovie" source="favButton" class="btn btn-default accountBtn accountBack" style="border: none;margin-left: 30px;border-radius: 20px;height: 50px;line-height: 38px;" onclick="removeFromFavMovie('+openedMovieID+')">Remove from Favourite</a>'
//                     }else{
//                         Text += '<a id="addToFavMovie" source="favButton" class="btn btn-default accountBtn accountBack" style="border: none;margin-left: 30px;border-radius: 20px;height: 50px;line-height: 38px;" onclick="addToFavMovie('+openedMovieID+')">Add to Favourite</a>'
//                     }

//                     Text += '<div id="relatedData">'

//                     var relatedData = vodSectionDetails.slice(0,15);
//                     singleMovieRelatedData = relatedData;
//                     for(var i = 0;i < relatedData.length;i++){
//                          Text += '<div class="relatedSec">'
//                          Text += Util.generateRelatedCard(relatedData[i],0,i,i,relatedData.length);
//                          Text += '</div>'
//                     }
//                     Text +='</div>'

//                Text +='</div>'

               
//           Text += '</div>'
//      Text +='</div>';
//      return Text;
}
Util.tvEpisode = function(obj,index,count){
     var Text = '';
     Text += '<div  class="episode" id="tvEpisode-'+index+'" index='+index+' count="'+count+'" source="episodes" >';
     Text += '<div  class="col-md-3">';

     var icon = '';
     if(obj.info){
          if(obj.info.movie_image)
          icon = obj.info.movie_image;
          Text += '<div class="epsDiv" ><img src="images/movie-icon.png"></div>';
               Text += '<p  class="epsP" style="background: url('+icon+') no-repeat center center,url(\'images/no_poster.png\') no-repeat center center;  -webkit-background-size: contain;  -moz-background-size: contain; -o-background-size: contain; background-size: contain;">';
          Text += '</div>';
          
          Text += '<div  class="col-md-9" style="    padding: 0px;" >';
          Text += '<b class="headEps">'+obj.title+'</b>';
          Text +='               <div class="stream-rating-small" style="    float: left;width: 100%;margin-bottom: 10px;">'
                                   var rating = Math.ceil(obj.info.rating / 2);
     
                                   if(rating >= 1){
                                        Text += '<span class="fas fa-star yellow"></span>';
                                   }else{
                                        Text += '<span class="far fa-star yellow-empty"></span>';
                                   }
                                   if(rating >= 2){
                                        Text += '<span class="fas fa-star yellow"></span>';
                                   }else{
                                        Text += '<span class="far fa-star yellow-empty"></span>';
                                   }
                                   if(rating >= 3){
                                        Text += '<span class="fas fa-star yellow"></span>';
                                   }else{
                                        Text += '<span class="far fa-star yellow-empty"></span>';
                                   }
                                   if(rating >= 4){
                                        Text += '<span class="fas fa-star yellow"></span>';
                                   }else{
                                        Text += '<span class="far fa-star yellow-empty"></span>';
                                   }
                                   if(rating >= 5){
                                        Text += '<span class="fas fa-star yellow"></span>';
                                   }else{
                                        Text += '<span class="far fa-star yellow-empty"></span>';
                                   }
          Text +='               </div>'
          if(obj.info.duration!=undefined){
                    Text += '<b class="headEpsDuration direct-persona">'+obj.info.duration+'</b>';
          }
          var desc = '';
          if(obj.info.plot && obj.info.plot.length > 250)
               desc = obj.info.plot.substring(0,250) + "..";
          else
               desc = obj.info.plot;

          Text += '<p class="stream-persona-info">'+(desc?desc:"")+'</p>';
          Text += '</div>';
     }
     
     Text += '</div>';
     return Text;
}


// Util.tvShowDetails = function(){
// //console.log(vodSectionDetails);
// //alert(openedSeriesID);
//         for (var i =0; i< vodSectionDetails.length; i++) {
//               if(vodSectionDetails[i].series_id == openedSeriesID){
//                 seriesPage.info = vodSectionDetails[i];
//                 break;
//               }
//          }     var Text = '';
//      Text += '<div  class="no-padding row singleRow"  style="margin: 0px;" >';
//           Text += '<div  class="col-sm-12 no-padding" >';
// 			Text += '<div  class= "header clearfix" id="heading" >'
// 			Text += '<div  class="container">'	
// 			Text += '<div class="logo col-sm-4 p-left margin30"><img src="images/home-logo.png"/></div>'
// 			Text += '<div class="col-sm-8 text-center"><h1 class="main-title">SERIES INFO</h1></div>'
// 			//Text += '<div class="form-search navItem floatRight col-sm-4 p-right"> <input type="text" placeholder="search" id="searchBox" id="searchBox" id="searchBox" id="searchBox" id="searchBox" id="searchBox" class="searchBar"></div>'
// 			Text += '</div>';
// 			Text += '</div>';
		
//           Text += '</div>'
          
//           Text += "<div class='col-sm-12'>"
//           Text += "<div class='topMovie'>"
//                Text += '<div class="singleMovieName">'+seriesPage.info.name+'</div>'
//                Text += '<div class="playSingle imageFocus"  id="btnPlayMovie"  source="playButton" ><img src="images/play-icon2.png"></div>'
//                if(seriesPage.info.backdrop_path)
//                     Text+= '<div class="singleImgBack" style="background:url('+seriesPage.info.backdrop_path[0]+') no-repeat;    background-size: cover;">'
//                else
//                     Text+= '<div class="singleImgBack" style="background:url(images/vod_backgound.jpg) no-repeat;    background-size: cover;">'

//           Text +='</div>'
//                Text +='</div>'

//                Text += '<div class="container miscContain">'


// ////////////////Started Director and Release Date HTML////////////
//                     Text +='<div class="col-md-12 no-padding">'
//                             Text +='<div class="col-md-6 no-padding">'
//                                 Text +='<div class="col-md-12 no-padding">'
//                                         Text +='<div class="col-md-4">'
//                                                     Text +='<b>Directed By:</b>'
//                                         Text +='</div>'
//                                         Text +='<div class="col-md-8">'
//                                                     Text += (seriesPage.info.director?seriesPage.info.director : "N/a" )
//                                         Text +='</div>'
//                                 Text +='</div>'
//                             Text +='</div>'

//                             Text +='<div class="col-md-6 no-padding">'
//                                 Text +='<div class="col-md-12 no-padding">'
//                                         Text +='<div class="col-md-4">'
//                                                     Text +='<b>Release Date:</b>'
//                                         Text +='</div>'
//                                         Text +='<div class="col-md-8">'
//                                                     Text +=(seriesPage.info.releaseDate? seriesPage.info.releaseDate : "N/a")
//                                         Text +='</div>'
//                                 Text +='</div>'
//                             Text +='</div>'
//                     Text +='</div>'
// ////////////////End Director and Release Date HTML////////////



// ////////////////Started Duration and Cast HTML////////////
//                     Text +='<div class="col-md-12 no-padding">'


//                             Text +='<div class="col-md-6 no-padding">'
//                                 Text +='<div class="col-md-12 no-padding">'
//                                         Text +='<div class="col-md-4">'
//                                                     Text +='<b>Rating:</b>'
//                                         Text +='</div>'
//                                         Text +='<div class="col-md-8">'

//                                                     var rating = Math.ceil(seriesPage.info.rating / 2);
//                                                     //                         alert(rating);
//                                                      if(rating >= 1)
//                                                          Text += '<span class="fa fa-star checked"></span>';
//                                                      else
//                                                           Text += '<span class="fa fa-star "></span>';

//                                                      if(rating >= 2)
//                                                           Text += '<span class="fa fa-star checked"></span>';
//                                                       else
//                                                            Text += '<span class="fa fa-star "></span>';
//                                                      if(rating >= 3)
//                                                            Text += '<span class="fa fa-star checked"></span>';
//                                                        else
//                                                             Text += '<span class="fa fa-star "></span>';
//                                                      if(rating >= 4)
//                                                             Text += '<span class="fa fa-star checked"></span>';
//                                                         else
//                                                              Text += '<span class="fa fa-star "></span>';
//                                                      if(rating >= 5)
//                                                              Text += '<span class="fa fa-star checked"></span>';
//                                                          else
//                                                           Text += '<span class="fa fa-star "></span>';

//                                         Text +='</div>'
//                                 Text +='</div>'
//                             Text +='</div>'


//                             Text +='<div class="col-md-6 no-padding">'
//                                 Text +='<div class="col-md-12 no-padding">'
//                                         Text +='<div class="col-md-4">'
//                                                     Text +='<b>Genre:</b>'
//                                         Text +='</div>'
//                                         Text +='<div class="col-md-8">'
//                                                     Text += ( seriesPage.info.genre ? seriesPage.info.genre : "N/a" )
//                                         Text +='</div>'
//                                 Text +='</div>'
//                             Text +='</div>'

//                     Text +='</div>'
// ////////////////End Duration and Cast HTML////////////


//                                 Text +='<div class="col-md-12 no-padding">'
//                                         Text +='<div class="col-md-2">'
//                                                     Text +='<b>Cast:</b>'
//                                         Text +='</div>'
//                                         Text +='<div class="col-md-10">'
//                                                     var cast = '';
//                                                      if(seriesPage.info && seriesPage.info.cast && seriesPage.info.cast.length > 100)
//                                                           cast = seriesPage.info.cast.substring(0,100) + "..";
//                                                      else
//                                                           cast =  seriesPage.info.cast;
//                                                     Text +=(cast ? cast : "N/a" )
//                                         Text +='</div>'
//                                 Text +='</div>'

//                                 Text +='<div class="col-md-12 no-padding">'
//                                         Text +='<div class="col-md-2">'
//                                                     Text +='<b>Description:</b>'
//                                         Text +='</div>'
//                                         Text +='<div class="col-md-10">'
//                                                  var desc = '';
//                                                  if(seriesPage.info.plot && seriesPage.info.plot.length>0){
//                                                     if(seriesPage.info.plot && seriesPage.info.plot.length > 340)
//                                                           desc =  seriesPage.info.plot.substring(0,340) + "..";
//                                                     else
//                                                           desc =  seriesPage.info.plot;
//                                                  }else{
//                                                     desc = 'N/a';
//                                                  }
//                                                     Text +=desc
//                                         Text +='</div>'
//                                 Text +='</div>'
             
// //                    Text +='<div class="col-md-5">'
// //                         Text += '<div ><b class="headSingle">Directed By : </b> '+(seriesPage.info.director?seriesPage.info.director : "N/a" )+ '</div>'
// //                         Text += '<div ><b class="headSingle">Genre : </b> '+ ( seriesPage.info.genre ? seriesPage.info.genre : "N/a" )+ '</div>'
// //                         Text += '<div ><b class="headSingle">Rating : </b> ';
// //                         var rating = Math.ceil(seriesPage.info.rating / 2);
// //                         if(rating >= 1)
// //                             Text += '<span class="fa fa-star checked"></span>';
// //                         else
// //                              Text += '<span class="fa fa-star "></span>';
// //
// //                         if(rating >= 2)
// //                              Text += '<span class="fa fa-star checked"></span>';
// //                          else
// //                               Text += '<span class="fa fa-star "></span>';
// //                         if(rating >= 3)
// //                               Text += '<span class="fa fa-star checked"></span>';
// //                           else
// //                                Text += '<span class="fa fa-star "></span>';
// //                         if(rating >= 4)
// //                                Text += '<span class="fa fa-star checked"></span>';
// //                            else
// //                                 Text += '<span class="fa fa-star "></span>';
// //                         if(rating >= 5)
// //                                 Text += '<span class="fa fa-star checked"></span>';
// //                             else
// //                              Text += '<span class="fa fa-star "></span>';
// //
// //
// //
// //                         Text += '</div>';
// //
// //                    Text += '</div>'
// //                    Text +='<div class="col-md-1"></div>'
// //                    Text +='<div class="col-md-6">'
// //                         Text += '<div><b>Release Date : </b> '+ (seriesPage.info.releaseDate? seriesPage.info.releaseDate : "N/a") + '</div>'
// //                         var cast = '';
// //                         if(seriesPage.info.cast.length > 70)
// //                              cast = seriesPage.info.cast.substring(0,70) + "..";
// //                         else
// //                              cast =  seriesPage.info.cast;
// //                         Text += '<div><b>Cast : </b> '+ (cast ? cast : "N/a" )+ '</div>'
// //
// //                    Text += '</div>'


//                Text += '</div>'
//                if(seriesPage.episodes){
//                     var keys = Object.keys(seriesPage.episodes);
//                     Text += '<div class="container miscContain">'
//                          Text += '<a class="relatedM" id="seasonSelector" season='+keys[0]+' source="seasonSelector">Season - '+keys[0]+'</a>'

// //                           var items = JSON.parse(localStorage.getItem('favSeriesList'));
//                            var allSeriesFavourites = JSON.parse(localStorage.getItem("allSeriesFavourites"));
//                                                 console.log(allSeriesFavourites);

//                           if(allSeriesFavourites !== null) {
//                             for(var j=0;j<allSeriesFavourites.length;j++){
//                                    if(allSeriesFavourites[j][0] == Main.profile.user_info.login_url){
//                                        var items =  allSeriesFavourites[j][1];
//                                    }
//                             }
//                           }
// //                           alert(items);
// //                           alert(openedSeriesID);
//                          if(items!=null && jQuery.inArray(parseInt(openedSeriesID), items) != -1) {
//                              Text += '<a id="removeFromFavSeries" source="favButton" class="btn btn-default accountBtn accountBack" style="border: none;margin-left: 30px;border-radius: 20px;height: 50px;line-height: 38px;" onclick="removeFromFavSeries('+openedSeriesID+')">Remove from Favourite</a>'
//                          }else{
//                              Text += '<a id="addToFavSeries" source="favButton" class="btn btn-default accountBtn accountBack" style="border: none;margin-left: 30px;border-radius: 20px;height: 50px;line-height: 38px;" onclick="addToFavSeries('+openedSeriesID+')">Add to Favourite</a>'
//                          }
// //
//                          Text += '<div id="relatedSeries">'
     
//                        /*   var relatedData = vodSectionDetails.slice(0,15);
     
//                          for(var i = 0;i < relatedData.length;i++){
//                               Text += '<div class="relatedSec">'
//                               Text += Util.generateRelatedCard(relatedData[i],0,i,i,relatedData.length);
//                               Text += '</div>'
//                          } */
                         
//                          var data = seriesPage.episodes[keys[0]];
//                          for(var i = 0;i < data.length;i++){
//                               Text += '<div class="">'
//                               Text += Util.tvEpisode(data[i],i,data.length);
//                               Text += '</div>'
//                          }
     
                         
     
//                          Text +='</div>'
     
//                     Text +='</div>'
//                }
//                else{
//                     Text += '<div class="container miscContain">';
//                          Text += '<a class="relatedM" id="seasonSelector" style="    margin: 0% 38%;" >No Episodes Found.</a>'
//                          Text += '</div>';
//                }
              

               
          
//      Text +='</div>';
//      return Text;
// }

Util.tvShowDetails = function(){
     try{
          clearInterval(intervalTesting);
     }catch(e){

     }
          var Text = '';
          for (var i =0; i< vodSectionDetails.length; i++) {
               if(vodSectionDetails[i].series_id == openedSeriesID){
                    seriesPage.info = vodSectionDetails[i];
                    break;
               }
          }  
          Text +='<div class="col-sm-12 no-padding" style="    margin: 0px;height: 115px; position: fixed; z-index: 9999;"><div class="header clearfix clearfixHeight" id="heading"><div class="row movies_title_height"><div class="logo col-sm-2"><img src="images/home-logo.png"></div><div class="col-sm-9 text-center"><h1 class="main-title">Series Information</h1></div><div class="col-md-1"></div></div></div></div>'
          
          try{
               if(seriesPage.info.backdrop_path){

                    Text +='<div class="modal show paddingTopClearFlix scrollBarClass" id="moviesPageBackground" tabindex="-1" role="dialog" aria-labelledby="viewinfoLabel" style="display: block;padding-left: 0px;overflow: auto;overflow-x:hidden;background: url('+seriesPage.info.backdrop_path[0]+');background-position: center; background-repeat: no-repeat; background-size: cover; background-color: #233035; background-blend-mode: overlay; width: 100vw; height: 100%; transition: all 1.0s ease-in-out;position: absolute;"  aria-modal="true">'
                    }else{
                         Text +='<div class="modal show paddingTopClearFlix scrollBarClass" id="moviesPageBackground" tabindex="-1" role="dialog" aria-labelledby="viewinfoLabel" style="display: block;padding-left: 0px;overflow: auto;overflow-x:hidden;background-color: #233035;background-blend-mode: overlay;width:100vw;height:100%;position: absolute;" aria-modal="true">'
          
                     }
          }catch(err){
               Text +='<div class="modal show paddingTopClearFlix scrollBarClass" id="moviesPageBackground" tabindex="-1" role="dialog" aria-labelledby="viewinfoLabel" style="display: block;padding-left: 0px;overflow: auto;overflow-x:hidden;background-color: #233035;background-blend-mode: overlay;width:100vw;height:100%;position: absolute;" aria-modal="true">'
          }
          
         
          Text +='<div class="" role="document" id="streamViewInfo">'
          
     
     
                    // if(seriesPage.info.backdrop_path){
                    //      Text +=' <div class="viewinfo-content">'
      
                    // }else{
                    //      Text +=' <div class="viewinfo-content" style="background-color: #233035;background-blend-mode: overlay;width:100vw;height:100%;">'
                    // }

                    
                    Text +=' <div class="viewinfo-content">'

          Text +='   <div class="detailsexploresection" style="height:100%;">	' 
          Text +='       <div class="modal-body viewinfo-body" style=" height:100%;    position: relative;">	'
     
          Text +='        <div class="row streamview">'
          Text +='            <div class="col-md-2 info-poster" style="padding-left: 30px;">'
          Text +='               <div class="stream-icon">'
          
          Text +='                 <img src="'+(seriesPage.info.cover)+'" onerror="this.src=\'images/movieTile1.png\';"class="stream-image">'
          Text +='              </div>'
     
     
          
     
                                                               
          Text +='               <div class="text-center stream-rating">'
                                   var rating = Math.ceil(seriesPage.info.rating / 2);
     
                                   if(rating >= 1){
                                        Text += '<span class="fas fa-star yellow"></span>';
                                   }else{
                                        Text += '<span class="far fa-star yellow-empty"></span>';
                                   }
                                   if(rating >= 2){
                                        Text += '<span class="fas fa-star yellow"></span>';
                                   }else{
                                        Text += '<span class="far fa-star yellow-empty"></span>';
                                   }
                                   if(rating >= 3){
                                        Text += '<span class="fas fa-star yellow"></span>';
                                   }else{
                                        Text += '<span class="far fa-star yellow-empty"></span>';
                                   }
                                   if(rating >= 4){
                                        Text += '<span class="fas fa-star yellow"></span>';
                                   }else{
                                        Text += '<span class="far fa-star yellow-empty"></span>';
                                   }
                                   if(rating >= 5){
                                        Text += '<span class="fas fa-star yellow"></span>';
                                   }else{
                                        Text += '<span class="far fa-star yellow-empty"></span>';
                                   }
          Text +='               </div>'
          Text +='             </div>'
          Text +='             <div class="col-md-8 offset-md-1">'
          Text +='              <div class="stream-details col-md-12">'
          Text +='                <div class="stream-title">'
          Text +='                  <h1 style="    margin-top: 0px;    float: left;width: 100%;"><span style="text-overflow: ellipsis; display: block; overflow: hidden; width: 90%; float: left;">'
          if(seriesPage.info.name!=null){
               Text += seriesPage.info.name
          } 
          Text +='</span>'
     
                           var allSeriesFavourites = JSON.parse(localStorage.getItem("allSeriesFavourites"));
                                                            //  console.log(allMoviesFavourites);
     
                                       if(allSeriesFavourites !== null) {
                                         for(var j=0;j<allSeriesFavourites.length;j++){
                                                if(allSeriesFavourites[j][0] == Main.profile.user_info.login_url){
                                                    var items =  allSeriesFavourites[j][1];
                                                }
                                         }
                                       } 
                         if(items!=null && jQuery.inArray(parseInt(openedSeriesID), items) != -1) {
                              Text +='                  <i id="removeFromFavSeries" source="favButton" class="fa fa-heart makeFav activefav "  onclick="removeFromFavSeries('+openedSeriesID+')" aria-hidden="true" style="float: right;z-index:999999;margin-right:10px;    transition: all .2s ease-in-out;    margin-top: 10px;"></i>'
                         }else{
                              Text +='                  <i id="addToFavSeries" source="favButton" class="fa fa-heart makeFav " onclick="addToFavSeries('+openedSeriesID+')" style="float: right;z-index:999999;margin-right:10px;    transition: all .2s ease-in-out;    margin-top: 10px;"></i>'
                         }
     
     
                       
     
     
     
     
     
     
          Text +='                  </h1>'
          Text +='                 </div>'
                           
          Text +='               </div>'
          Text +='               <div class="stream-persona col-md-12" style="    padding: 0px;">'
          Text +='                 <span class="direct-persona col-md-3"><i class="fas fa-bullhorn"></i> Director</span>'
          Text +='                <span class="direct-persona col-md-3"><i class="far fa-calendar-alt"></i> Release Date</span>'
          // Text +='                <span class="direct-persona col-md-3"><i class="far fa-clock"></i> Duration</span>'
          Text +='                <span class="direct-persona col-md-6"><i class="fas fa-users"></i> Cast</span>'
          Text +='              </div>'
          Text +='               <div class="stream-persona-info col-md-12" style="    padding: 0px;">'
          Text +='                 <span class="direct-persona-info col-md-3"> '+(seriesPage.info.director?seriesPage.info.director:"N/a")+'</span>'

          if(seriesPage.info.releaseDate){
               var data = new Date(seriesPage.info.releaseDate);
               var date2 = monthNames[data.getMonth()] + " " + data.getDate() + ", " + data.getFullYear();
               Text +='                 <span class="direct-persona-info col-md-3"> '+date2+'</span>'
          }else{
               Text +='                 <span class="direct-persona-info col-md-3"> N/a </span>'
          }


          // Text +='                <span class="direct-persona-info col-md-3"> '+(seriesPage.info.duration?seriesPage.info.duration : "N/a")+'</span>'
          Text +='                <span class="direct-persona-info cast col-md-6">'
          var smallCast = '';
          var fullCast = '';
          if(seriesPage.info && seriesPage.info.cast && seriesPage.info.cast.length > 50){
              smallCast = seriesPage.info.cast.substring(0,50) + "..";
              fullCast =  seriesPage.info.cast;
          }else{
               smallCast = seriesPage.info.cast;
               fullCast =  seriesPage.info.cast;
          }
          
          Text +=(smallCast? smallCast : "N/a" )
          
          if(smallCast != fullCast){
               Text +='       <span class="badge badge-info showCast " data-toggle="yes">Show Full Cast</span>'
          }
          Text +='        </span>'
          Text +='                <span class="direct-persona-info fullcast col-md-6 d-none"> '+fullCast+'<span class="badge badge-danger showCast" data-toggle="no">Hide</span></span>'
          Text +='               </div>'
          
          Text +='       <div class="stream-description col-md-12"><span class="direct-persona col-md-12" style="padding: 0px;"><i class="fas fa-film"></i> Genre: <span class="stream-persona-info"> '+( seriesPage.info.genre ? seriesPage.info.genre : "N/a" )+'</span></span> </div>'
          Text +='               <div class="stream-description col-md-12">'
                                                  var desc = '';
                                                  if(seriesPage.info.plot && seriesPage.info.plot.length>0){
                                                       // if(singleMovie.info.plot && singleMovie.info.plot.length > 340)
                                                       //      desc =  singleMovie.info.plot.substring(0,340) + "..";
                                                       // else
                                                            desc =  seriesPage.info.plot;
                                                  }else{
                                                       desc = 'N/a';
                                                  }
          Text +='                   <p>'+desc+'</p>'
          Text +='                </div>'
          Text +='            </div>'
          Text +='<div class="col-md-2"></div>'

          // Text +='             <div class="col-md-8 offset-md-1" style="    padding: 0px;">'
          // Text +='               <div class="view-button" style="    padding-left: 30px;">'
          // Text +='                     <button class="btn watchNow-custom playSingle" index="0" id="btnPlaySeries" source="playButton">Watch Now</button>'
          // Text +='               </div>'
          // Text +='             </div>'





          Text +='             <div class="col-md-8 offset-md-1" style="    padding: 0px;">'
          if(seriesPage.info.youtube_trailer){
               openedMovieTrailer = seriesPage.info.youtube_trailer;
               Text +='               <div class="view-button" style="    padding-left: 30px;">'
               Text +='                     <button class="btn watchNow-custom playSingle" id="btnPlayTrailer" source="playButton">Watch Trailer</button>'
               Text +='               </div>'
          }else{
               openedMovieTrailer = "";
          }


          // console.log(seriesPage);

          // if(seriesPage.info.tmdb_id){
               $.ajax({
                    url: TMDB_BASE_URL+"search/tv?api_key="+TMDB_API_KEY+"&query="+seriesPage.info.name,
                    // url : Main.profile.user_info.login_url+"/player_api.php?username="+Main.profile.user_info.username+"&password="+Main.profile.user_info.password+"&action=get_series_info"+"&tmdb_id="+singleMovie.info.tmdb_id,
                    type : "GET",
                    data : {},
                    success : function (data) {
                           if(typeof data == "string"){
                               data = JSON.parse(data);
                            }
                           Main.HideLoading();
                         //   console.log(data);
                           if(data.total_results == 1){ 
                              Util.fetchCastFromTMDB(data.results[0].id);                              
                           }else if(data.total_results > 1){
                              for(var i = 0;i < data.results.length;i++){
                                   if(data.results[i].name == seriesPage.info.name){
                                        Util.fetchCastFromTMDB(data.results[i].id);
                                        break;
                                   }
                                  
                              }
                           } 
                          
     
                    },
                    error : function (errObj) {
                    },
                    timeout : 80000
                });
          // }

          



     
     
          Text +='               <div class="view-button" style="    padding-left: 30px;">'
          Text +='                     <button class="btn watchNow-custom playSingle" index="0" id="btnPlaySeries" source="playButton">Watch Now</button>'
          Text +='               </div>'

          if(seriesPage.episodes){

               var keys = Object.keys(seriesPage.episodes);
               Text +='               <div class="view-button" style="    padding-left: 30px;">'
               Text +='                     <button class="btn watchNow-custom playSingle" id="seasonSelector" season='+keys[0]+' source="seasonSelector">Season - '+keys[0]+'<i class="fa fa-angle-down fa-1x" style="margin-left: 20px;"></i></button>'
               Text +='               </div>'
               // Text += '<a class="relatedM" id="seasonSelector" season='+keys[0]+' source="seasonSelector">Season - '+keys[0]+' <i class="arrowRightButton"></i></a>'
          }
          
     
          Text +='               </div>'









          Text +='           </div>'
                                     
          Text +='                           <div class="row slider-row" style="'
          Text +='padding-left: 75px;'
          Text +='padding-right: 75px;'
          Text +='">'
          Text +='      <div class="col-md-12">'
          // Text +='        <h3 class="related-slide" style="    border-bottom: 3px solid #c2225d; font-weight: bold;  float: left; font-size: 20px;">Related Movies</h3>'
                    if(seriesPage.episodes){

                                   var keys = Object.keys(seriesPage.episodes);
                                   // Text += '<a class="relatedM" id="seasonSelector" season='+keys[0]+' source="seasonSelector">Season - '+keys[0]+' <i class="arrowRightButton"></i></a>'

                                   Text +='<figure class="tabBlock" style="float: left;width: 100%;padding-left: 15px;padding-top: 30px;">'
                                   Text +='<ul class="tabBlock-tabs" style="    border-bottom: 1px solid #848383;">'
                                   Text +='<li class="tabBlock-tab is-active" id="episodesTab" style="   text-align: center;border-right: 1px solid #928f8f;">Episodes</li>'
                                   Text +='<li class="tabBlock-tab" id="castTab" style="text-align: center;display:none">Cast</li>'
                                   Text +='</ul>'
                                   Text +='<div class="tabBlock-content">'
                                        Text +=' <div class="tabBlock-pane" style="display: block;">'
                                             Text +='<div id="relatedSeries" style="    float: left;    width: 100%;">'

                                                       var data = seriesPage.episodes[keys[0]];
                                                       for(var i = 0;i < data.length;i++){
                                                            Text += '<div class="">'
                                                            Text += Util.tvEpisode(data[i],i,data.length);
                                                            Text += '</div>'
                                                       }
                                             Text +='</div>'
                                   
                                   Text +=' </div>'
                                   Text +=' <div class="tabBlock-pane" style="display: none;">'
                                   Text +='<div id="castImagesDiv" style="display:none">  </div>'

                                   Text +='</div>'
                                   Text +='</div>'
                                   Text +='</figure>'


          
                    }
          Text +='       </div>'
          Text +='         </div>'
          Text +='       </div>'
          Text +='       </div>'  
          Text +='      </div>'
          Text +='  </div>'
          Text +='</div>'
          Text +='<div id="HTML5Div"></div>'
          Text +='  </div><script src="js/tab_jquery.js"></script>'
     
     
          return Text;
     
      
     }
     Util.fetchCastFromTMDB = function(castID){  
          $.ajax({
               url: TMDB_BASE_URL+"tv/"+castID+"?api_key="+TMDB_API_KEY+"&append_to_response=credits",
               // url : Main.profile.user_info.login_url+"/player_api.php?username="+Main.profile.user_info.username+"&password="+Main.profile.user_info.password+"&action=get_series_info"+"&tmdb_id="+singleMovie.info.tmdb_id,
               type : "GET",
               data : {},
               success : function (data) {
                      if(typeof data == "string"){
                          data = JSON.parse(data);
                       }
                      Main.HideLoading();
                    //   console.log(data);
                    //   if(data.total_results == 1){
                    //      console.log("ID: "+data.results[0].id);
                    //   }

                    try{
                         if(data.credits.cast && data.credits.cast.length>0){
                              var castingImages= Util.castImagesSeries(data.credits.cast);
                              $("#castTab").show();
                              $("#castImagesDiv").html(castingImages);
                              $("#castImagesDiv").show('slow');
                         }else{
                              $("#castTab").hide();
                         }
                    }catch(e){

                    }
                     

               },
               error : function (errObj) {
               },
               timeout : 80000
           });
     }


     function loadMoreMovies(sortingType){
          var Text = '';

          //   $("#mainContent").html(Util.vodMoviesPage(vodSectionDetailsFullData,"viewALL","topadded"));

          if(vodSectionDetailsFullData.length>0){
               var n = $( ".view-stream .sliderimage-view" ).length;

               // alert(sortingType);
               // alert(pageType);
               var moviesData1 = vodSectionDetailsFullData.slice();
               var moviesData2 = vodSectionDetailsFullData.slice();
               var moviesData3 = vodSectionDetailsFullData.slice();
               var moviesData4 = vodSectionDetailsFullData.slice();
     
               var newVariableTesting;

               // alert(vodSectionDetails.length);

               // alert(sortingType);
     
               if(sortingType == "topadded"){
                    if(pageType == "movies"){
                         var moviesData_topadded = helper.arr.multisort(moviesData3, ['added'], ['DESC']);
                         newVariableTesting = moviesData_topadded;
                    }else{
                         var moviesData_topadded = helper.arr.multisort(moviesData3, ['last_modified'], ['DESC']);
                         newVariableTesting = moviesData_topadded;
                    }
               }else if(sortingType == "toprated"){
                         var moviesData_toprated = helper.arr.multisort(moviesData4, ['rating_5based'], ['DESC']);
                         newVariableTesting = moviesData_toprated;
               }else if(sortingType == "atoz"){
                         var moviesData_atoz = helper.arr.multisort(moviesData1, ['name'], ['ASC']);
                         newVariableTesting = moviesData_atoz;
               }else if(sortingType == "ztoa"){
                         var moviesData_ztoa = helper.arr.multisort(moviesData2, ['name'], ['DESC']);
                         newVariableTesting = moviesData_ztoa;
               }else{
                    newVariableTesting = vodSectionDetails;
                    
               }
     
     
      
     
               if( n<newVariableTesting.length){
                    for(var i=(loadMore-moviesLoadPerPage);i<newVariableTesting.length;i++){
                         if(i == (newVariableTesting.length-1)){
                              $("#loadmore_movies").hide();
                         }
                         if(i == loadMore){
                              loadMore = loadMore+moviesLoadPerPage;
                              break;
                         }
                         // console.log("honey:"+i);
                         var streamId = '',type = '';
                         var icon = '';
                         if(newVariableTesting[i].cover)
                              icon = newVariableTesting[i].cover;
                         else
                              icon = newVariableTesting[i].stream_icon;
          Text += '	        			<div class="sliderimage-view '+i+' animation-element slide-left">'
          Text += '	                        <img src="'+icon+'" alt="" onerror="this.src=\'images/movieTile1.png\';" class="view-images">'
          
          
                                             if(newVariableTesting[i].series_id){
                                                  type = "show";
                                                  streamId = newVariableTesting[i].series_id;
                                                  openedSeriesID = streamId;
                                             }
                                             else{
                                                  type = "movie";
                                                  streamId = newVariableTesting[i].stream_id;
                                             }
          
                                             if(type == "show"){
                                                  var allSeriesFavourites = JSON.parse(localStorage.getItem("allSeriesFavourites"));
                                                  // console.log(allSeriesFavourites);
          
                                                  if(allSeriesFavourites !== null) {
                                                  for(var j=0;j<allSeriesFavourites.length;j++){
                                                            if(allSeriesFavourites[j][0] == Main.profile.user_info.login_url){
                                                                 var items =  allSeriesFavourites[j][1];
                                                            }
                                                  }
                                                  }
                                             //            var items = JSON.parse(localStorage.getItem('favSeriesList'));
                                             }else{
                                             var allMoviesFavourites = JSON.parse(localStorage.getItem("allMoviesFavourites"));
                                                                      // console.log(allMoviesFavourites);
          
                                                  if(allMoviesFavourites !== null) {
                                                  for(var j=0;j<allMoviesFavourites.length;j++){
                                                       if(allMoviesFavourites[j][0] == Main.profile.user_info.login_url){
                                                            var items =  allMoviesFavourites[j][1];
                                                       }
                                                  }
                                                  }
                                             //            var items = JSON.parse(localStorage.getItem('favMoviesList'));
                                             }
                                             if(items!=null && jQuery.inArray(streamId, items) != -1) {
                                                  Text += '                          <i class="fa fa-heart makeFav activefav favDiv_'+streamId+'" style="transition: all .2s ease-in-out;position: absolute;top: 3px;right: 10px;font-size: 35px;display:block;"></i>'
                                             } else{
                                                  Text += '                          <i class="fa fa-heart makeFav  favDiv_'+streamId+'" style="transition: all .2s ease-in-out;position: absolute;top: 3px;right: 10px;font-size: 35px;display:none;"></i>'
          
                                             }
          
          Text += '	                        <div class="img-title shows-image"   id="vodMovies-searched-'+streamId+'" type="'+type+'" stream_id="'+streamId+'" movie_name="'+newVariableTesting[i].name+'" container_extension="'+newVariableTesting[i].container_extension+'" >'
                              
          Text += '	                            <span class="movies-title">'+newVariableTesting[i].name+'</span>'
          Text += '                                <div class="moviesHover"><img src="images/movie-icon.png"></div>'
          
          Text += '                             <div class="rating">' //rating div started
                                                  var rating = Math.ceil(newVariableTesting[i].rating / 2);
          
                                                  if(rating >= 1){
                                                       Text += '<span class="fas fa-star yellow"></span>';
                                                  }else{
                                                       Text += '<span class="far fa-star yellow-empty"></span>';
                                                  }
                                                  if(rating >= 2){
                                                       Text += '<span class="fas fa-star yellow"></span>';
                                                  }else{
                                                       Text += '<span class="far fa-star yellow-empty"></span>';
                                                  }
                                                  if(rating >= 3){
                                                       Text += '<span class="fas fa-star yellow"></span>';
                                                  }else{
                                                       Text += '<span class="far fa-star yellow-empty"></span>';
                                                  }
                                                  if(rating >= 4){
                                                       Text += '<span class="fas fa-star yellow"></span>';
                                                  }else{
                                                       Text += '<span class="far fa-star yellow-empty"></span>';
                                                  }
                                                  if(rating >= 5){
                                                       Text += '<span class="fas fa-star yellow"></span>';
                                                  }else{
                                                       Text += '<span class="far fa-star yellow-empty"></span>';
                                                  }
                                                  
          Text+= '                                </div>'; //rating div ended
          Text += '	                        </div>'
          Text += '	                    </div>' 
                    } 
               }
              
               
               if(Text!=""){
                    $( Text ).appendTo(".view-stream");
                    // alert(($('#moviesList').scrollTop() + $( document ).height()));
                    var y = $('#moviesList').scrollTop(); 
                    $('#moviesList').animate({ 
                          //your current y position on the page
                         scrollTop: y += 750
                    });
                    check_if_in_view();



               }
     
     
      
          }
   

     }
     
Util.vodMoviesPage = function(moviesData,action,sortingType){
     
     loadMore = moviesLoadPerPage;
     var Text = '';
     Text +='<script>$("#moviesList").scroll(function() {'
     // Text +='console.log("scrolled 2");'   
     Text +='check_if_in_view();'
     Text +='});</script>'

     $(".overlay-screen").hide();

     if(action == "searched"){
          Text += '<div  class="no-padding row" id="" >';
	
          Text += '<div  class="col-sm-12 no-padding" style="    margin: 0px;">';
          Text += '<div  class= "header clearfix clearfixHeight" id="heading">'
          Text += '<div  class="row movies_title_height">'	
          Text += '<div class="logo col-sm-2"><img src="images/home-logo.png"/></div>'
          Text += '<div class="col-sm-7 text-center"><h1 class="main-title" style="    margin-left: 150px;">'+vodSectionDetails.category.category_name+'</h1></div>'
          Text += '<div class="col-md-2"><a id="clearSearch" class="btn btn-default accountBtn accountBack" style="width: 110px;display: none;font-size: 15px;float: left;margin: 4px;" source="clearSearchIcon">Clear Search</a><img src="images/search-ico.png" class="searchIcon" id="searchIcon" source="searchIcon" style="    margin: 5px;"></div>'
          //Text += '<div class="form-search navItem floatRight col-sm-4 p-right"> <input type="text" placeholder="search" id="searchBox" id="searchBox" id="searchBox" id="searchBox" id="searchBox" id="searchBox" class="searchBar"></div>'
          Text += '</div>';
          Text += '</div>';
     
          Text += '</ul></div>'
          Text +='</div>';
          Text += '<div>'
          Text += '<div>'


          Text += '<div id="moviesList" class="movieListTopHeader scrollBarClass">' // moviesList started
          Text +='<div id="searchResult"></div>'

          Text += '<div class="view-stream">'

          for(var i=0;i<moviesData.length;i++){
               if(i == loadMore){
                    loadMore = loadMore+moviesLoadPerPage;
                    break;
               }
               var streamId = '',type = '';
               var icon = '';
               if(moviesData[i].cover)
                    icon = moviesData[i].cover;
               else
                    icon = moviesData[i].stream_icon;
Text += '	        			<div class="sliderimage-view '+i+' animation-element slide-left">'
Text += '	                        <img src="'+icon+'" alt="" onerror="this.src=\'images/movieTile1.png\';" class="view-images">'


                                   if(moviesData[i].series_id){
                                        type = "show";
                                        streamId = moviesData[i].series_id;
                                        openedSeriesID = streamId;
                                   }
                                   else{
                                        type = "movie";
                                        streamId = moviesData[i].stream_id;
                                   }

                                   if(type == "show"){
                                        var allSeriesFavourites = JSON.parse(localStorage.getItem("allSeriesFavourites"));
                                        // console.log(allSeriesFavourites);

                                        if(allSeriesFavourites !== null) {
                                        for(var j=0;j<allSeriesFavourites.length;j++){
                                                  if(allSeriesFavourites[j][0] == Main.profile.user_info.login_url){
                                                       var items =  allSeriesFavourites[j][1];
                                                  }
                                        }
                                        }
                                   //            var items = JSON.parse(localStorage.getItem('favSeriesList'));
                                   }else{
                                   var allMoviesFavourites = JSON.parse(localStorage.getItem("allMoviesFavourites"));
                                                            // console.log(allMoviesFavourites);

                                        if(allMoviesFavourites !== null) {
                                        for(var j=0;j<allMoviesFavourites.length;j++){
                                             if(allMoviesFavourites[j][0] == Main.profile.user_info.login_url){
                                                  var items =  allMoviesFavourites[j][1];
                                             }
                                        }
                                        }
                                   //            var items = JSON.parse(localStorage.getItem('favMoviesList'));
                                   }
                                   if(items!=null && jQuery.inArray(streamId, items) != -1) {
                                        Text += '                          <i class="fa fa-heart makeFav activefav favDiv_'+streamId+'" style="transition: all .2s ease-in-out;position: absolute;top: 3px;right: 10px;font-size: 35px;display:block;"></i>'
                                   } else{
                                        Text += '                          <i class="fa fa-heart makeFav  favDiv_'+streamId+'" style="transition: all .2s ease-in-out;position: absolute;top: 3px;right: 10px;font-size: 35px;display:none;"></i>'

                                   }

Text += '	                        <div class="img-title shows-image"   id="vodMovies-searched-'+streamId+'" type="'+type+'" stream_id="'+streamId+'" movie_name="'+moviesData[i].name+'" container_extension="'+moviesData[i].container_extension+'" >'
                    
Text += '	                            <span class="movies-title">'+moviesData[i].name+'</span>'
Text += '                                <div class="moviesHover"><img src="images/movie-icon.png"></div>'
Text += '                             <div class="rating">' //rating div started
                                        var rating = Math.ceil(moviesData[i].rating / 2);

                                        if(rating >= 1){
                                             Text += '<span class="fas fa-star yellow"></span>';
                                        }else{
                                             Text += '<span class="far fa-star yellow-empty"></span>';
                                        }
                                        if(rating >= 2){
                                             Text += '<span class="fas fa-star yellow"></span>';
                                        }else{
                                             Text += '<span class="far fa-star yellow-empty"></span>';
                                        }
                                        if(rating >= 3){
                                             Text += '<span class="fas fa-star yellow"></span>';
                                        }else{
                                             Text += '<span class="far fa-star yellow-empty"></span>';
                                        }
                                        if(rating >= 4){
                                             Text += '<span class="fas fa-star yellow"></span>';
                                        }else{
                                             Text += '<span class="far fa-star yellow-empty"></span>';
                                        }
                                        if(rating >= 5){
                                             Text += '<span class="fas fa-star yellow"></span>';
                                        }else{
                                             Text += '<span class="far fa-star yellow-empty"></span>';
                                        }
                                        
Text+= '                                </div>'; //rating div ended
Text += '	                        </div>'
Text += '	                    </div>' 
          } 

 


          Text += '</div>'

          Text += '<center  id="loadmore_movies" style="margin-top: 40px;margin-bottom: 50px;    float: left;width: 100%;"><a onclick=loadMoreMovies("'+sortingType+'") id="loadmore_movies_a">Load More</a></center>'

          Text +='</div >'; // moviesList end
               








			Text +='</div >';

	 

                        Text +='</div >';
		Text += '</div>';
	Text += '</div>';
          
     }else if(action == "viewALL"){
          Text += '<div  class="no-padding row" id="" >';
	
          Text += '<div  class="col-sm-12 no-padding" style="    margin: 0px;">';
          Text += '<div  class= "header clearfix clearfixHeight" id="heading" >'
          Text += '<div  class="row movies_title_height" >'	
          Text += '<div class="logo col-sm-2"><img src="images/home-logo.png"/></div>'
          Text += '<div class="col-sm-7 text-center"><h1 class="main-title" style="    margin-left: 150px;">'+vodSectionDetails.category.category_name+'</h1></div>'
          Text += '<span id="pageViewALL"></span>'
          Text += '<div class="col-md-2"><a id="clearSearch" class="btn btn-default accountBtn accountBack" style="width: 110px;display: none;font-size: 15px;float: left;margin: 4px;" source="clearSearchIcon">Clear Search</a><img src="images/search-ico.png" class="searchIcon" id="searchIcon" source="searchIcon" style="    margin: 5px;"></div>'
          //Text += '<div class="form-search navItem floatRight col-sm-4 p-right"> <input type="text" placeholder="search" id="searchBox" id="searchBox" id="searchBox" id="searchBox" id="searchBox" id="searchBox" class="searchBar"></div>'
          Text += '</div>';
          Text += '</div>';
     
          Text += '</ul></div>'
          Text +='</div>';
          Text += '<div>'
          Text += '<div>'


          Text += '<div id="moviesList" class="movieListTopHeader scrollBarClass">' // moviesList started
          if(sortingType=="topadded"){
               var viewALLTitle = "Top Added";
          }else if(sortingType=="toprated"){
               var viewALLTitle = "Top Rated";
          }else if(sortingType=="atoz"){
               var viewALLTitle = "Ascending Order (A-Z)";
          }else if(sortingType=="ztoa"){
               var viewALLTitle = "Descending Order (Z-A)";
          }
          Text +='<div class="slider-heading" style=" padding-left: 35px!important;  ">  <h1 class="text-light">'+viewALLTitle+'</h1>  </div>'

          Text += '<div class="view-stream">'
          // alert("Total Movies: "+moviesData.length+" loadmore:"+loadMore);
          for(var i=0;i<moviesData.length;i++){
               if(i == loadMore){
                    loadMore = loadMore+moviesLoadPerPage;
                    break;
               }
               // console.log("honey:"+i);
               var streamId = '',type = '';
               var icon = '';
               if(moviesData[i].cover)
                    icon = moviesData[i].cover;
               else
                    icon = moviesData[i].stream_icon;
Text += '	        			<div class="sliderimage-view '+i+' animation-element slide-left">'
Text += '	                        <img src="'+icon+'" alt="" onerror="this.src=\'images/movieTile1.png\';" class="view-images">'


                                   if(moviesData[i].series_id){
                                        type = "show";
                                        streamId = moviesData[i].series_id;
                                        openedSeriesID = streamId;
                                   }
                                   else{
                                        type = "movie";
                                        streamId = moviesData[i].stream_id;
                                   }

                                   if(type == "show"){
                                        var allSeriesFavourites = JSON.parse(localStorage.getItem("allSeriesFavourites"));
                                        // console.log(allSeriesFavourites);

                                        if(allSeriesFavourites !== null) {
                                        for(var j=0;j<allSeriesFavourites.length;j++){
                                                  if(allSeriesFavourites[j][0] == Main.profile.user_info.login_url){
                                                       var items =  allSeriesFavourites[j][1];
                                                  }
                                        }
                                        }
                                   //            var items = JSON.parse(localStorage.getItem('favSeriesList'));
                                   }else{
                                   var allMoviesFavourites = JSON.parse(localStorage.getItem("allMoviesFavourites"));
                                                            // console.log(allMoviesFavourites);

                                        if(allMoviesFavourites !== null) {
                                        for(var j=0;j<allMoviesFavourites.length;j++){
                                             if(allMoviesFavourites[j][0] == Main.profile.user_info.login_url){
                                                  var items =  allMoviesFavourites[j][1];
                                             }
                                        }
                                        }
                                   //            var items = JSON.parse(localStorage.getItem('favMoviesList'));
                                   }
                                   if(items!=null && jQuery.inArray(streamId, items) != -1) {
                                        Text += '                          <i class="fa fa-heart makeFav activefav favDiv_'+streamId+'" style="transition: all .2s ease-in-out;position: absolute;top: 3px;right: 10px;font-size: 35px;display:block;"></i>'
                                   } else{
                                        Text += '                          <i class="fa fa-heart makeFav  favDiv_'+streamId+'" style="transition: all .2s ease-in-out;position: absolute;top: 3px;right: 10px;font-size: 35px;display:none;"></i>'

                                   }

Text += '	                        <div class="img-title shows-image"   id="vodMovies-searched-'+streamId+'" type="'+type+'" stream_id="'+streamId+'" movie_name="'+moviesData[i].name+'" container_extension="'+moviesData[i].container_extension+'" >'
                    
Text += '	                            <span class="movies-title">'+moviesData[i].name+'</span>'
Text += '                                <div class="moviesHover"><img src="images/movie-icon.png"></div>'

Text += '                             <div class="rating">' //rating div started
                                        var rating = Math.ceil(moviesData[i].rating / 2);

                                        if(rating >= 1){
                                             Text += '<span class="fas fa-star yellow"></span>';
                                        }else{
                                             Text += '<span class="far fa-star yellow-empty"></span>';
                                        }
                                        if(rating >= 2){
                                             Text += '<span class="fas fa-star yellow"></span>';
                                        }else{
                                             Text += '<span class="far fa-star yellow-empty"></span>';
                                        }
                                        if(rating >= 3){
                                             Text += '<span class="fas fa-star yellow"></span>';
                                        }else{
                                             Text += '<span class="far fa-star yellow-empty"></span>';
                                        }
                                        if(rating >= 4){
                                             Text += '<span class="fas fa-star yellow"></span>';
                                        }else{
                                             Text += '<span class="far fa-star yellow-empty"></span>';
                                        }
                                        if(rating >= 5){
                                             Text += '<span class="fas fa-star yellow"></span>';
                                        }else{
                                             Text += '<span class="far fa-star yellow-empty"></span>';
                                        }
                                        
Text+= '                                </div>'; //rating div ended
Text += '	                        </div>'
Text += '	                    </div>' 
          } 

 


          Text += '</div>'

          Text += '<center  id="loadmore_movies" style="margin-top: 40px;margin-bottom: 50px;    float: left;width: 100%;"><a onclick=loadMoreMovies("'+sortingType+'") id="loadmore_movies_a">Load More</a></center>'

          Text +='</div >'; // moviesList end
               








			Text +='</div >';

	 

                        Text +='</div >';
		Text += '</div>';
	Text += '</div>';
     }else{
          Text += '<div  class="no-padding row" id="" >';
	
          Text += '<div  class="col-sm-12 no-padding" style="    margin: 0px;">';
          Text += '<div  class= "header clearfix clearfixHeight" id="heading" >'
          Text += '<div  class="row movies_title_height" >'	
          Text += '<div class="logo col-sm-2"><img src="images/home-logo.png"/></div>'
          Text += '<div class="col-sm-7 text-center"><h1 class="main-title" style="    margin-left: 150px;">'+vodSectionDetails.category.category_name+'</h1></div>'
          Text += '<div class="col-md-2"><a id="clearSearch" class="btn btn-default accountBtn accountBack" style="width: 110px;display: none;font-size: 15px;float: left;margin: 4px;" source="clearSearchIcon">Clear Search</a><img src="images/search-ico.png" class="searchIcon" id="searchIcon" source="searchIcon" style="    margin: 5px;"></div>'
          //Text += '<div class="form-search navItem floatRight col-sm-4 p-right"> <input type="text" placeholder="search" id="searchBox" id="searchBox" id="searchBox" id="searchBox" id="searchBox" id="searchBox" class="searchBar"></div>'
          Text += '</div>';
          Text += '</div>';
     
          Text += '</ul></div>'
          Text +='</div>';
        Text +='<div id="searchResult"></div>'
          Text += '<div>'
          Text += '<div>'


          Text += '<div id="moviesList"  class="movieListTopHeader scrollBarClass">' // moviesList started

        

          var moviesData1 = moviesData.slice();
          var moviesData2 = moviesData.slice();
          var moviesData3 = moviesData.slice();
          var moviesData4 = moviesData.slice();


           
          var moviesData_atoz = helper.arr.multisort(moviesData1, ['name'], ['ASC']);
          var moviesData_ztoa = helper.arr.multisort(moviesData2, ['name'], ['DESC']);
          if(pageType == "movies"){
               var moviesData_topadded = helper.arr.multisort(moviesData3, ['added'], ['DESC']);
          }else{
               var moviesData_topadded = helper.arr.multisort(moviesData3, ['last_modified'], ['DESC']);
          }
          var moviesData_toprated = helper.arr.multisort(moviesData4, ['rating_5based'], ['DESC']);
          // console.log(moviesData_top/added);

          
         
          
Text += '<div id="SectionView">'
Text += '	<section class="top-added-section">'
Text += '        <div class="row">'
Text += '            <div class="col-md-12 heroSlider-fixed">'
Text += '                <div class="slider-heading">'
Text += '                    <h1 class="text-light">Top Added</h1>'
Text += '                    <a href="javascript:;" class="btn btn-cus-viewall viewALL" type="topadded" id="viewALLTopAdded_button" source="viewALL">View all</a>'
Text += '                </div>'
Text += '                <div class="overlay">'
Text += '                </div>'
Text += '                <!-- Slider -->'
Text += '               <div class="slider responsive topadded-section scrollBarClass" id="slide">'
                    for(var i=0;i<moviesData_topadded.length;i++){
                         if(i > 15){ break; }
                         var streamId = '',type = '';
                         var icon = '';
                         if(moviesData_topadded[i].cover)
                              icon = moviesData_topadded[i].cover;
                         else
                              icon = moviesData_topadded[i].stream_icon;

                              if(moviesData_topadded[i].series_id){
                                   type = "show";
                                   streamId = moviesData_topadded[i].series_id;
                                   openedSeriesID = streamId;
                              }
                              else{
                                   type = "movie";
                                   streamId = moviesData_topadded[i].stream_id;
                              }

Text += '	        			<div class="sliderimage-div '+i+'" >'
Text += '	                        <img src="'+icon+'" alt="" onerror="this.src=\'images/movieTile1.png\';" class="sec-images">'


                              if(type == "show"){
                                   var allSeriesFavourites = JSON.parse(localStorage.getItem("allSeriesFavourites"));
                                   // console.log(allSeriesFavourites);

                                   if(allSeriesFavourites !== null) {
                                   for(var j=0;j<allSeriesFavourites.length;j++){
                                             if(allSeriesFavourites[j][0] == Main.profile.user_info.login_url){
                                                  var items =  allSeriesFavourites[j][1];
                                             }
                                   }
                                   }
                              //            var items = JSON.parse(localStorage.getItem('favSeriesList'));
                              }else{
                              var allMoviesFavourites = JSON.parse(localStorage.getItem("allMoviesFavourites"));
                                                       // console.log(allMoviesFavourites);

                                   if(allMoviesFavourites !== null) {
                                   for(var j=0;j<allMoviesFavourites.length;j++){
                                        if(allMoviesFavourites[j][0] == Main.profile.user_info.login_url){
                                             var items =  allMoviesFavourites[j][1];
                                        }
                                   }
                                   }
                              //            var items = JSON.parse(localStorage.getItem('favMoviesList'));
                              }
                              if(items!=null && jQuery.inArray(streamId, items) != -1) {
                                   Text += '                          <i class="fa fa-heart makeFav activefav favDiv_'+streamId+'" style="transition: all .2s ease-in-out;position: absolute;top: 3px;right: 10px;font-size: 35px;display:block;"></i>'
                              } else{
                                   Text += '                          <i class="fa fa-heart makeFav  favDiv_'+streamId+'" style="transition: all .2s ease-in-out;position: absolute;top: 3px;right: 10px;font-size: 35px;display:none;"></i>'

                              }






Text += '	                        <div class="img-title shows-image"   id="vodMovies-top-added-'+streamId+'" type="'+type+'" stream_id="'+streamId+'" movie_name="'+moviesData_topadded[i].name+'" container_extension="'+moviesData_topadded[i].container_extension+'" >'


Text += '	                            <span class="movies-title">'+moviesData_topadded[i].name+'</span>'
Text += '                                <div class="moviesHover"><img src="images/movie-icon.png"></div>'

Text += '                             <div class="rating">' //rating div started
                                   var rating = Math.ceil(moviesData_topadded[i].rating / 2);

                                   if(rating >= 1){
                                        Text += '<span class="fas fa-star yellow"></span>';
                                   }else{
                                        Text += '<span class="far fa-star yellow-empty"></span>';
                                   }
                                   if(rating >= 2){
                                        Text += '<span class="fas fa-star yellow"></span>';
                                   }else{
                                        Text += '<span class="far fa-star yellow-empty"></span>';
                                   }
                                   if(rating >= 3){
                                        Text += '<span class="fas fa-star yellow"></span>';
                                   }else{
                                        Text += '<span class="far fa-star yellow-empty"></span>';
                                   }
                                   if(rating >= 4){
                                        Text += '<span class="fas fa-star yellow"></span>';
                                   }else{
                                        Text += '<span class="far fa-star yellow-empty"></span>';
                                   }
                                   if(rating >= 5){
                                        Text += '<span class="fas fa-star yellow"></span>';
                                   }else{
                                        Text += '<span class="far fa-star yellow-empty"></span>';
                                   }
                                   
Text+= '                                </div>'; //rating div ended
                                    
                                   
Text += '	                        </div>'
Text += '	                    </div>' 
                    }
// if(moviesData_topadded.length>15){
//      Text += '	        		  <div class="viewall-div">'
//      Text += '		                <a href="javasscript:;"  class="viewall-title viewALL" source="viewALL" >View all</a>'
//      Text += '		            </div>'
// }

Text += '	        	</div>'
Text += '                    <!-- control arrows -->'
Text += '                <div class="prev">'
Text += '                    <img src="images/left-arrow-white.png" alt="" class="prev-icon d-none" id="rightArrowTopAdded">'
Text += '                </div>'
Text += '                <div class="next">'
Text += '                    <img src="images/right-arrow-white.png" alt="" class="next-icon" id="leftArrowTopAdded">'
Text += '                </div>'
Text += '            </div>'
Text += '        </div>'
Text += '    </section>'

Text += '    <section class="top-rated-section">'
Text += '        <div class="row">'
Text += '           <div class="col-md-12 heroSlider-fixed">'
Text += '                <div class="slider-heading">'
Text += '                    <h1 class="text-light">Top Rated</h1>'
Text += '                    <a href="javascript:;" class="btn btn-cus-viewall viewALL" type="toprated" id="viewALLTopRated_button" source="viewALL">View all</a>'
Text += '                </div>'
Text += '               <div class="overlay">'
Text += '               </div>'
Text += '               <!-- Slider -->'
Text += '                <div class="slider responsive toprated-section scrollBarClass" id="slide_topRated">'

               for(var i=0;i<moviesData_toprated.length;i++){
                    if(i > 15){ break; }
                    var streamId = '',type = '';
                    var icon = '';
                    if(moviesData_toprated[i].cover)
                         icon = moviesData_toprated[i].cover;
                    else
                         icon = moviesData_toprated[i].stream_icon;
Text += '	        			<div class="sliderimage-div '+i+'">'
Text += '	                        <img src="'+icon+'" alt="" onerror="this.src=\'images/movieTile1.png\';" class="sec-images">'

                              if(moviesData_toprated[i].series_id){
                                   type = "show";
                                   streamId = moviesData_toprated[i].series_id;
                                   openedSeriesID = streamId;
                              }
                              else{
                                   type = "movie";
                                   streamId = moviesData_toprated[i].stream_id;
                              }
                              if(type == "show"){
                                   var allSeriesFavourites = JSON.parse(localStorage.getItem("allSeriesFavourites"));
                                   //console.log(allSeriesFavourites);

                                   if(allSeriesFavourites !== null) {
                                   for(var j=0;j<allSeriesFavourites.length;j++){
                                             if(allSeriesFavourites[j][0] == Main.profile.user_info.login_url){
                                                  var items =  allSeriesFavourites[j][1];
                                             }
                                   }
                                   }
                              //            var items = JSON.parse(localStorage.getItem('favSeriesList'));
                              }else{
                              var allMoviesFavourites = JSON.parse(localStorage.getItem("allMoviesFavourites"));
                                                  // console.log(allMoviesFavourites);

                                   if(allMoviesFavourites !== null) {
                                   for(var j=0;j<allMoviesFavourites.length;j++){
                                        if(allMoviesFavourites[j][0] == Main.profile.user_info.login_url){
                                             var items =  allMoviesFavourites[j][1];
                                        }
                                   }
                                   }
                              //            var items = JSON.parse(localStorage.getItem('favMoviesList'));
                              }
                              if(items!=null && jQuery.inArray(streamId, items) != -1) {
                                   Text += '                          <i class="fa fa-heart makeFav activefav favDiv_'+streamId+'" style="transition: all .2s ease-in-out;position: absolute;top: 3px;right: 10px;font-size: 35px;display:block;"></i>'
                              } else{
                                   Text += '                          <i class="fa fa-heart makeFav  favDiv_'+streamId+'" style="transition: all .2s ease-in-out;position: absolute;top: 3px;right: 10px;font-size: 35px;display:none;"></i>'

                              }


Text += '	                        <div class="img-title shows-image"   id="vodMovies-top-rated-'+streamId+'" type="'+type+'" stream_id="'+streamId+'" movie_name="'+moviesData_toprated[i].name+'" container_extension="'+moviesData_toprated[i].container_extension+'" >'
                        
Text += '	                            <span class="movies-title">'+moviesData_toprated[i].name+'</span>'
Text += '                                <div class="moviesHover"><img src="images/movie-icon.png"></div>'

Text += '                             <div class="rating">' //rating div started
                                   var rating = Math.ceil(moviesData_toprated[i].rating / 2);

                                   if(rating >= 1){
                                        Text += '<span class="fas fa-star yellow"></span>';
                                   }else{
                                        Text += '<span class="far fa-star yellow-empty"></span>';
                                   }
                                   if(rating >= 2){
                                        Text += '<span class="fas fa-star yellow"></span>';
                                   }else{
                                        Text += '<span class="far fa-star yellow-empty"></span>';
                                   }
                                   if(rating >= 3){
                                        Text += '<span class="fas fa-star yellow"></span>';
                                   }else{
                                        Text += '<span class="far fa-star yellow-empty"></span>';
                                   }
                                   if(rating >= 4){
                                        Text += '<span class="fas fa-star yellow"></span>';
                                   }else{
                                        Text += '<span class="far fa-star yellow-empty"></span>';
                                   }
                                   if(rating >= 5){
                                        Text += '<span class="fas fa-star yellow"></span>';
                                   }else{
                                        Text += '<span class="far fa-star yellow-empty"></span>';
                                   }
                                   
Text+= '                                </div>'; //rating div ended

Text += '	                        </div>'
Text += '	                    </div>' 
               } 

//                if(moviesData_toprated.length>15){
                
// Text += '	        		  <div class="viewall-div">'
// Text += '		                <a href="javasscript:;"  class="viewall-title viewALL" source="viewALL" >View all</a>'
// Text += '		            </div>'
//                }
Text += '	        	</div>'
Text += '                   <!-- control arrows -->'
Text += '               <div class="prev">'
Text += '                   <img src="images/left-arrow-white.png" alt="" class="prev-icon d-none" id="rightArrow_topRated">'
Text += '               </div>'
Text += '               <div class="next">'
Text += '                   <img src="images/right-arrow-white.png" alt="" class="next-icon" id="leftArrow_topRated">'
Text += '               </div>'
                   
Text += '           </div>'
Text += '       </div>'
Text += '   </section>'



Text += '   <section class="ascend-section">'
Text += '       <div class="row">'
Text += '           <div class="col-md-12 heroSlider-fixed">'
Text += '               <div class="slider-heading">'
Text += '                   <h1 class="text-light">Ascending Order (A-Z)</h1>'
Text += '                   <a href="javascript:;" class="btn btn-cus-viewall viewALL" type="atoz" id="viewALLATOZ_button" source="viewALL">View all</a>'
Text += '               </div>'
Text += '               <div class="overlay">'
Text += '               </div>'
Text += '               <!-- Slider -->'
Text += '               <div class="slider responsive asc-section scrollBarClass" id="slide_ascend">'

                    for(var i=0;i<moviesData_atoz.length;i++){
                         if(i > 15){ break; }
                         var streamId = '',type = '';
                         var icon = '';
                         if(moviesData_atoz[i].cover)
                              icon = moviesData_atoz[i].cover;
                         else
                              icon = moviesData_atoz[i].stream_icon;
Text += '	        			<div class="sliderimage-div '+i+'">'
Text += '	                        <img src="'+icon+'" alt="" onerror="this.src=\'images/movieTile1.png\';" class="sec-images">'

                              if(moviesData_atoz[i].series_id){
                                   type = "show";
                                   streamId = moviesData_atoz[i].series_id;
                                   openedSeriesID = streamId;
                              }
                              else{
                                   type = "movie";
                                   streamId = moviesData_atoz[i].stream_id;
                              }
                              if(type == "show"){
                                   var allSeriesFavourites = JSON.parse(localStorage.getItem("allSeriesFavourites"));
                                   // console.log(allSeriesFavourites);

                                   if(allSeriesFavourites !== null) {
                                   for(var j=0;j<allSeriesFavourites.length;j++){
                                             if(allSeriesFavourites[j][0] == Main.profile.user_info.login_url){
                                                  var items =  allSeriesFavourites[j][1];
                                             }
                                   }
                                   }
                              //            var items = JSON.parse(localStorage.getItem('favSeriesList'));
                              }else{
                              var allMoviesFavourites = JSON.parse(localStorage.getItem("allMoviesFavourites"));
                                                       // console.log(allMoviesFavourites);

                                   if(allMoviesFavourites !== null) {
                                   for(var j=0;j<allMoviesFavourites.length;j++){
                                        if(allMoviesFavourites[j][0] == Main.profile.user_info.login_url){
                                             var items =  allMoviesFavourites[j][1];
                                        }
                                   }
                                   }
                              //            var items = JSON.parse(localStorage.getItem('favMoviesList'));
                              }
                              if(items!=null && jQuery.inArray(streamId, items) != -1) {
                                   Text += '                          <i class="fa fa-heart makeFav activefav favDiv_'+streamId+'" style="transition: all .2s ease-in-out;position: absolute;top: 3px;right: 10px;font-size: 35px;display:block;"></i>'
                              } else{
                                   Text += '                          <i class="fa fa-heart makeFav  favDiv_'+streamId+'" style="transition: all .2s ease-in-out;position: absolute;top: 3px;right: 10px;font-size: 35px;display:none;"></i>'

                              }



Text += '	                        <div class="img-title shows-image"   id="vodMovies-atoz-'+streamId+'" type="'+type+'" stream_id="'+streamId+'" movie_name="'+moviesData_atoz[i].name+'" container_extension="'+moviesData_atoz[i].container_extension+'" >'
                             
Text += '	                            <span class="movies-title">'+moviesData_atoz[i].name+'</span>'
Text += '                                <div class="moviesHover"><img src="images/movie-icon.png"></div>'

Text += '                             <div class="rating">' //rating div started
                                   var rating = Math.ceil(moviesData_atoz[i].rating / 2);

                                   if(rating >= 1){
                                        Text += '<span class="fas fa-star yellow"></span>';
                                   }else{
                                        Text += '<span class="far fa-star yellow-empty"></span>';
                                   }
                                   if(rating >= 2){
                                        Text += '<span class="fas fa-star yellow"></span>';
                                   }else{
                                        Text += '<span class="far fa-star yellow-empty"></span>';
                                   }
                                   if(rating >= 3){
                                        Text += '<span class="fas fa-star yellow"></span>';
                                   }else{
                                        Text += '<span class="far fa-star yellow-empty"></span>';
                                   }
                                   if(rating >= 4){
                                        Text += '<span class="fas fa-star yellow"></span>';
                                   }else{
                                        Text += '<span class="far fa-star yellow-empty"></span>';
                                   }
                                   if(rating >= 5){
                                        Text += '<span class="fas fa-star yellow"></span>';
                                   }else{
                                        Text += '<span class="far fa-star yellow-empty"></span>';
                                   }
                                   
Text+= '                                </div>'; //rating div ended
Text += '	                        </div>'
Text += '	                    </div>' 
                    } 

//                     if(moviesData_atoz.length>15){

// Text += '	        				        		<div class="viewall-div">'
// Text += '		                <a href="javasscript:;"  class="viewall-title viewALL" source="viewALL" >View all</a>'
// Text += '		            </div>'
//                     }
Text += '	        	</div>'
Text += '                    <!-- control arrows -->'
Text += '               <div class="prev">'
Text += '                   <img src="images/left-arrow-white.png" alt="" class="prev-icon d-none" id="rightArrow_ascend">'
Text += '               </div>'
Text += '               <div class="next">'
Text += '                   <img src="images/right-arrow-white.png" alt="" class="next-icon" id="leftArrow_ascend">'
Text += '               </div>'
Text += '           </div>'
Text += '       </div>'
Text += '    </section>'

Text += '    <section class="descend-section">'
Text += '        <div class="row">'
Text += '           <div class="col-md-12 heroSlider-fixed">'
Text += '               <div class="slider-heading">'
Text += '                   <h1 class="text-light">Descending Order (Z-A)</h1>'
Text += '                   <a href="javascript:;" class="btn btn-cus-viewall viewALL" type="ztoa" id="viewALLZTOA_button" source="viewALL">View all</a>'
Text += '               </div>'
Text += '               <div class="overlay">'
Text += '               </div>'
Text += '                <!-- Slider -->'
Text += '                <div class="slider responsive desc-section scrollBarClass" id="slide_descend">'

                    for(var i=0;i<moviesData_ztoa.length;i++){
                         if(i > 15){ break; }
                         var streamId = '',type = '';
                         var icon = '';
                         if(moviesData_ztoa[i].cover)
                              icon = moviesData_ztoa[i].cover;
                         else
                              icon = moviesData_ztoa[i].stream_icon;
Text += '	        			<div class="sliderimage-div '+i+'">'
Text += '	                        <img src="'+icon+'" alt="" onerror="this.src=\'images/movieTile1.png\';" class="sec-images">'
                              if(moviesData_ztoa[i].series_id){
                                   type = "show";
                                   streamId = moviesData_ztoa[i].series_id;
                                   openedSeriesID = streamId;
                              }
                              else{
                                   type = "movie";
                                   streamId = moviesData_ztoa[i].stream_id;
                              }
                              if(type == "show"){
                                   var allSeriesFavourites = JSON.parse(localStorage.getItem("allSeriesFavourites"));
                                   // console.log(allSeriesFavourites);

                                   if(allSeriesFavourites !== null) {
                                   for(var j=0;j<allSeriesFavourites.length;j++){
                                             if(allSeriesFavourites[j][0] == Main.profile.user_info.login_url){
                                                  var items =  allSeriesFavourites[j][1];
                                             }
                                   }
                                   }
                              //            var items = JSON.parse(localStorage.getItem('favSeriesList'));
                              }else{
                              var allMoviesFavourites = JSON.parse(localStorage.getItem("allMoviesFavourites"));
                                                       // console.log(allMoviesFavourites);

                                   if(allMoviesFavourites !== null) {
                                   for(var j=0;j<allMoviesFavourites.length;j++){
                                        if(allMoviesFavourites[j][0] == Main.profile.user_info.login_url){
                                             var items =  allMoviesFavourites[j][1];
                                        }
                                   }
                                   }
                              //            var items = JSON.parse(localStorage.getItem('favMoviesList'));
                              }
                              if(items!=null && jQuery.inArray(streamId, items) != -1) {
                                   Text += '                          <i class="fa fa-heart makeFav activefav favDiv_'+streamId+'" style="transition: all .2s ease-in-out;position: absolute;top: 3px;right: 10px;font-size: 35px;display:block;"></i>'
                              } else{
                                   Text += '                          <i class="fa fa-heart makeFav  favDiv_'+streamId+'" style="transition: all .2s ease-in-out;position: absolute;top: 3px;right: 10px;font-size: 35px;display:none;"></i>'

                              }



Text += '	                        <div class="img-title shows-image"   id="vodMovies-ztoa-'+streamId+'" type="'+type+'" stream_id="'+streamId+'" movie_name="'+moviesData_ztoa[i].name+'" container_extension="'+moviesData_ztoa[i].container_extension+'" >'
                              
Text += '	                            <span class="movies-title">'+moviesData_ztoa[i].name+'</span>'
Text += '                                <div class="moviesHover"><img src="images/movie-icon.png"></div>'

Text += '                             <div class="rating">' //rating div started
                                   var rating = Math.ceil(moviesData_ztoa[i].rating / 2);

                                   if(rating >= 1){
                                        Text += '<span class="fas fa-star yellow"></span>';
                                   }else{
                                        Text += '<span class="far fa-star yellow-empty"></span>';
                                   }
                                   if(rating >= 2){
                                        Text += '<span class="fas fa-star yellow"></span>';
                                   }else{
                                        Text += '<span class="far fa-star yellow-empty"></span>';
                                   }
                                   if(rating >= 3){
                                        Text += '<span class="fas fa-star yellow"></span>';
                                   }else{
                                        Text += '<span class="far fa-star yellow-empty"></span>';
                                   }
                                   if(rating >= 4){
                                        Text += '<span class="fas fa-star yellow"></span>';
                                   }else{
                                        Text += '<span class="far fa-star yellow-empty"></span>';
                                   }
                                   if(rating >= 5){
                                        Text += '<span class="fas fa-star yellow"></span>';
                                   }else{
                                        Text += '<span class="far fa-star yellow-empty"></span>';
                                   }
                                   
Text+= '                                </div>'; //rating div ended
Text += '	                        </div>'
Text += '	                    </div>' 
                    }  

//                     if(moviesData_ztoa.length>15){

// Text += '	        		  <div class="viewall-div">'
// Text += '		                <a href="javasscript:;"  class="viewall-title viewALL" source="viewALL" >View all</a>'
// Text += '		            </div>'
//                     }
Text += '	        	</div>'
Text += '                   <!-- control arrows -->'
Text += '               <div class="prev">'
Text += '                   <img src="images/left-arrow-white.png" alt="" class="prev-icon d-none" id="rightArrow_descend">'
Text += '               </div>'
Text += '               <div class="next">'
Text += '                   <img src="images/right-arrow-white.png" alt="" class="next-icon" id="leftArrow_descend">'
Text += '               </div>'
                   
Text += '           </div>'
Text += '        </div>'
Text += '    </section>'
Text +='</div>'


          Text +='</div >'; // moviesList end
          








          Text +='</div >';

 

                   Text +='</div >';
     Text += '</div>';
Text += '</div>';
     }
	
	
    return Text;
}






// Util.vodMoviesPage = function(moviesData,action){
// 	var Text = '';
// if(action != "updateMovies"){
// 	Text += '<div  class="no-padding row" id="" >';
	
// 			Text += '<div  class="col-sm-12 no-padding" >';
// 			Text += '<div  class= "header clearfix" id="heading" >'
// 			Text += '<div  class="container">'	
// 			Text += '<div class="logo col-sm-2 p-left margin30"><img src="images/home-logo.png"/></div>'
// 			Text += '<div class="col-sm-7 text-center"><h1 class="main-title">'+vodSectionDetails.category.category_name+'</h1></div>'
// 			Text += '<div class="col-md-3"><a id="clearSearch" class="btn btn-default accountBtn accountBack" style="width: 110px;display: none;font-size: 15px;float: left;margin: 4px;" source="clearSearchIcon">Clear Search</a><img src="images/sort.png" class="sortIcon" id="sortIcon" source="sortIcon" style="margin:5px;"><img src="images/search-ico.png" class="searchIcon" id="searchIcon" source="searchIcon" style="    margin: 5px;"></div>'
// 			//Text += '<div class="form-search navItem floatRight col-sm-4 p-right"> <input type="text" placeholder="search" id="searchBox" id="searchBox" id="searchBox" id="searchBox" id="searchBox" id="searchBox" class="searchBar"></div>'
// 			Text += '</div>';
// 			Text += '</div>';
		
// 			Text += '</ul></div>'
// 			Text +='</div>';
//              Text +='<div id="searchResult"></div>'
//                Text += '<div class="inner">'
// 			Text += '<div class="center-layout">'

// }
// 			Text += '<div id="moviesList">'

// 			      if(pageType == "movies"){
// 			      		var sortingType = localStorage.getItem('moviesSorting');
//                   }else{
//                   		var sortingType = localStorage.getItem('seriesSorting');
//                   }
// //                  alert(moviesData.length);

//                    if(sortingType=="" || sortingType == null){
//                         sortingType = "default";
//                    }

// //                console.log(moviesData);
//                   if(sortingType == "default"){

//                       var movieDataWithoutCategories = JSON.parse(movieSectionDefaultWithoutSorting);
//                       var movieDataCategories = JSON.parse(movieSectionDefaultWithoutSortingCategories);
//                       moviesData = movieDataWithoutCategories;
//                       moviesData.category = movieDataCategories;

//                   }else if(sortingType == "atoz"){
//                       var abc = helper.arr.multisort(moviesData, ['name'], ['ASC']);
//                   }else if(sortingType == "ztoa"){
//                       var abc = helper.arr.multisort(moviesData, ['name'], ['DESC']);
//                   }else if(sortingType == "topadded"){
//                       if(pageType == "movies"){
//                            var abc = helper.arr.multisort(moviesData, ['added'], ['DESC']);
//                       }else{
//                            var abc = helper.arr.multisort(moviesData, ['last_modified'], ['DESC']);
//                       }
//                   }else if(sortingType == "toprated"){
//                        var abc = helper.arr.multisort(moviesData, ['rating_5based'], ['DESC']);
//                   }


//                     if(sortingType != "default"){
//                            moviesData = abc;
//                     }
// //alert(moviesData.length);
// 			var rowID = 0;
// 			for(var i=0;i<moviesData.length;i++){

// 				var v_index = Math.floor(i/5);
// 				var h_index = i % 5;
// 				if(v_index < 2){
// 					if(h_index == 0){
// 						Text += "<div id='vodRow-"+v_index+"' class='row bottom40'>";
// 					}
// 					Text +="<div class='col-5-eq'>"
// 					Text += Util.generateMovieCard(moviesData[i],v_index,h_index,i,moviesData.length);
// 					//Text += Util.generatetvShowCard(homeTvShowData[i],v_index,h_index,i,homeTvShowData.length);
// 					Text +="</div>"
// 					if(h_index == 4){
// 						Text += "</div>";
// 					}
// 				}
				

//                }
//                Text +='<div class="bottomDiv"></div >';
// 			Text +='</div >';
// 			Text +='</div >';

// 	if(action != "updateMovies"){

//                         Text +='</div >';
// 		Text += '</div>';
// 	Text += '</div>';
// }
	
//     return Text;
// }
Util.addMovieRow = function(v_indexAdd){
	var Text = '';
	var rowID = 0;
	for(var i= (v_indexAdd)*5;i<vodSectionDetails.length;i++){

		var v_index = Math.floor(i/5);
		var h_index = i % 5;
		
		if(v_index == v_indexAdd){

			if(h_index == 0){
				Text += "<div id='vodRow-"+v_index+"' class='row bottom40'>";
			}
			Text +="<div class='col-5-eq'>"
			Text += Util.generateMovieCard(vodSectionDetails[i],v_index,h_index,i,vodSectionDetails.length);
			Text +="</div>"
			if(h_index == 4){
				Text += "</div>";
			}
		}
		else{
			break;
		}
		

	}
	return Text;
}
Util.generateMovieCard = function(obj,v,h,i,count){
     var Text = '';
     var streamId = '',type = '';
     if(obj.series_id){
          type = "show";
          streamId = obj.series_id;
          openedSeriesID = streamId;
     }
     else{
          type = "movie";
          streamId = obj.stream_id;
//          console.log(obj);
     }

         
     if(type == "movie"){
	    Text += '<div><div class="shows-image"  type= "'+type+'" v_index="'+v+'" h_index="'+h+'" stream_id="'+streamId+'" movie_name="'+obj.name+'" container_extension="'+obj.container_extension+'"	index='+i+' id="vodMovies-'+v+"-"+h+'" count='+count+' >'
     }else{
	    Text += '<div><div class="shows-image"  type= "'+type+'" v_index="'+v+'" h_index="'+h+'" stream_id="'+streamId+'" movie_name="'+obj.name+'" index='+i+' id="vodMovies-'+v+"-"+h+'" count='+count+' >'
     }
     var icon = '';
     if(obj.cover)
          icon = obj.cover;
     else
          icon = obj.stream_icon;

       if(type == "show"){
             var allSeriesFavourites = JSON.parse(localStorage.getItem("allSeriesFavourites"));
               //   console.log(allSeriesFavourites);

               if(allSeriesFavourites !== null) {
                 for(var j=0;j<allSeriesFavourites.length;j++){
                        if(allSeriesFavourites[j][0] == Main.profile.user_info.login_url){
                            var items =  allSeriesFavourites[j][1];
                        }
                 }
               }
//            var items = JSON.parse(localStorage.getItem('favSeriesList'));
       }else{
            var allMoviesFavourites = JSON.parse(localStorage.getItem("allMoviesFavourites"));
                                   // console.log(allMoviesFavourites);

             if(allMoviesFavourites !== null) {
               for(var j=0;j<allMoviesFavourites.length;j++){
                      if(allMoviesFavourites[j][0] == Main.profile.user_info.login_url){
                          var items =  allMoviesFavourites[j][1];
                      }
               }
             }
//            var items = JSON.parse(localStorage.getItem('favMoviesList'));
       }
        if(items!=null && jQuery.inArray(streamId, items) != -1) {
             Text +='<div id="favDiv_'+streamId+'"><img src="images/favourite_yellow.png" style="position: absolute;width: 30px;z-index: 99999;margin-left: 10px;margin-top: 10px;"></div>'
        }else{
             Text +='<div id="favDiv_'+streamId+'"></div>'
        }
     Text += '<img src="' + icon + '"  onerror="this.src=\'images/movieTile1.png\';" class="posterImage"/>';
     //Text += '</div>'
     Text += '<div class="pText"><p>';
     if(obj.name && obj.name.length < 21)
          Text += '<span>'+obj.name+'</span></p></div></div></div>';
     else
          Text += '<span  class="namescroll">'+obj.name+'</span></p></div></div></div>';
     
          return Text;
}
Util.generateRelatedCard = function(obj,v,h,i,count){
	var Text = '';
	Text += '<div><div class="shows-image"  source= "related" v_index="'+v+'" h_index="'+h+'" movie_name="'+obj.name+'" container_extension="'+obj.container_extension+'" stream_id="'+obj.stream_id+'"	index='+i+' id="relMovies-'+v+"-"+h+'" count='+count+' >'
     Text += '<img src="' + obj.stream_icon + '"  onerror="this.src=\'images/movieTile1.png\';" class="posterImage"/>';
    // Text += '</div>'
     Text += '<div class="pText"><p>';
     if(obj.name && obj.name.length < 21)
          Text += '<span>'+obj.name+'</span></p></div></div></div>';
     else	
          Text += '<span class="namescroll">'+obj.name+'</span></p></div></div></div>';
	return Text;
}


Util.listMultiScreenCategoriesPage = function(section){
     var Text = ''; 

     Text +='<div class="blueBackgroundCenter" style="    width: 95%; margin: 0 auto; border: 2px solid white;">'
     Text +='<div class="container">'
     Text +='        <div class="row">'
     Text +='            <div class="col-sm-12 header-margin-top"> '
     Text +='                <div class="row">'
                         

     Text +='                    <div class="col-md-4">'
     Text +='                        <img src="images/home-logo.png" class="logImg">'
     Text +='                      </div>'
     Text +='                      <div class="col-md-4" style="display: flex;">'
     if(currentAPPType == "m3u"){
          Text +='                        <span class="pagesTitle">LIVE TV, MOVIES & SERIES</span>'
     }else{
          Text +='                        <span class="pagesTitle">LIVE TV</span>'

     }
     Text +='                      </div>'
     Text +='                     <div class="col-md-4">'
                         
     Text +='                      </div>'

     Text +='                </div>'
     Text +='            </div>'

     
     Text +='    </div>'
     Text +='    </div>'
     Text +='            <div class="col-sm-12 scrollBarClass categoriesPadding" style="height: 83%;    overflow: auto;"> '
     Text +='              <div class="row">'

     Text +='            <div id="allCategoriesSectionDiv" style="    height: 100%;  width: 100%;"></div>'

     // for(var i=0;i<section.length;i++){
     //           Text +='  <div class="col-sm-6 categoriesSection"><div class="section" id="sections-'+i+'" categ="'+section[i].category_id+'" action="'+section.type+'" sectionType="'+section.sectionType+'" rowIndex='+i+' ><div class="floatLeft"><img src="images/tv-shows.png"><p><span>'+section[i].category_name+'</span></p></div></div></div> ' 
     // }
     
     Text +='           </div>'
               
     Text +='          </div>';







	
	return Text;
}
 
//sections page
Util.listSectionPage = function(section){
	var Text = ''; 

     // console.log(section);


if(section.sectionType == "live"){
     if(currentAPPType == "m3u"){
          type = "LIVE TV, MOVIES & SERIES";
     }else{
          type = "LIVE TV";
     }
}
else if(section.sectionType == "vod"){
     type = "MOVIES";
}
else if(section.sectionType == "series"){
     type = "SERIES";
}else if(section.sectionType == "catchup"){
type = "CATCH UP";
}


Text +='<div class="blueBackgroundCenter">'
Text +='<div class="container">'
Text +='        <div class="row">'
Text +='            <div class="col-sm-12 header-margin-top"> '
Text +='                <div class="row">'
                     

Text +='                    <div class="col-md-4">'
Text +='                        <img src="images/home-logo.png" class="logImg">'
Text +='                      </div>'
Text +='                      <div class="col-md-4" style="display: flex;">'
Text +='                        <span class="pagesTitle">'+type+'</span>'
Text +='                      </div>'
Text +='                     <div class="col-md-4">'
Text +='                           <a id="clearSearch" class="btn btn-default accountBtn accountBack clearSearchCategories" style=" width: 110px;    display: none; font-size: 15px; float: left; margin: 16px;" source="clearSearchIcon" sectiontype="'+section.sectionType+'">Clear Search</a><img src="images/search-ico.png" class="searchIcon" sectiontype="'+section.sectionType+'" id="searchIcon" source="searchIcon">'
Text +='                      </div>'

Text +='                </div>'
Text +='            </div>'

Text +='    </div>'
Text +='    </div>'

Text +='            <div class="col-sm-12 scrollBarClass categoriesPadding" style="height: 83%;    overflow: auto;"> '
Text +='                 <div id="searchResult"></div>'
Text +='              <div class="row">'


Text +='            <div id="allCategoriesSectionDiv" style="    height: 100%;  width: 100%;"></div>'
// var j=0;
// for(var i=0;i<section.length;i++){
//           if(j == 0) {
//                Text +='<div class="col-sm-12 categoriesSection"> '
//           } 
//           j++;
//           Text +='  <div class="col-sm-6"><div class="section" id="sections-'+i+'" categ="'+section[i].category_id+'" action="'+section.type+'" sectionType="'+section.sectionType+'" rowIndex='+i+' ><div class="floatLeft"><img src="images/tv-shows.png"><p><span>'+section[i].category_name+'</span></p></div></div></div> ' 
//           if(j == 2) {
//                j = 0;
//                Text += '</div>'
//           }
// }

// if(j == 1){
//      Text += '</div>'
// }



// for(var i=0;i<section.length;i++){
//           Text +='<div class="col-sm-12 categoriesSection"> '
//                     Text +='  <div class="col-sm-6"><div class="section" id="sections-'+i+'" categ="'+section[i].category_id+'" action="'+section.type+'" sectionType="'+section.sectionType+'" rowIndex='+i+' ><div class="floatLeft"><img src="images/tv-shows.png"><p><span>'+section[i].category_name+'</span></p></div></div></div> ' 
//                     if((i+1)<section.length){
//                          Text +='  <div class="col-sm-6"><div class="section" id="sections-'+(i+1)+'" categ="'+section[(i+1)].category_id+'" action="'+section.type+'" sectionType="'+section.sectionType+'" rowIndex='+(i+1)+' ><div class="floatLeft"><img src="images/tv-shows.png"><p><span>'+section[(i+1)].category_name+'</span></p></div></div></div> ' 
//                          i++;
//                     }
//           Text += '</div>'

// }



 
Text +='           </div>'
          
Text +='          </div>';







	
	return Text;
}



function getTwoHours(epocTime){
     var data = new Date(epocTime*1000);

     var hours = data.getHours();
     if(hours <= 9)
          hours = '0' + hours  ; 
     var minutes = data.getMinutes();
     if(minutes <= 9)
          minutes = '0' + minutes ; 

     return date = hours + ":"+minutes;
}
function getTwoHours2(dateString){
     var hourAndMin = dateString.substr(11,5);
     var hourAndMinSplited = hourAndMin.split(":");
     // alert(hourAndMinSplited[0]);


     var data = new Date();
     var hours = hourAndMinSplited[0];
     var minutes = hourAndMinSplited[1];

     if(selectedTimeFormat == "24"){
          if(hours <= 9)
               hours =   hours ; 
          if(minutes <= 9)
               minutes =  minutes ; 

          var date = hours + ":"+minutes;

     }else{
          var ampm = hours >= 12 ? 'PM' : 'AM';
          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'
          minutes = minutes < 10 ? minutes : minutes;
          var date = hours + ':' + minutes + ' ' + ampm; 
     }
     return date;
}
function getTwoHours3(dateString){
     var datewithouttime = dateString.substr(0,11);
     var hourAndMin = dateString.substr(11,5);
     var hourAndMinSplited = hourAndMin.split(":");
     // alert(hourAndMinSplited[0]);


     var data = new Date();
     var hours = hourAndMinSplited[0];
     var minutes = hourAndMinSplited[1];

     if(selectedTimeFormat == "24"){
          if(hours <= 9)
               hours =   hours ; 
          if(minutes <= 9)
               minutes =  minutes ; 

          var date = datewithouttime+ " "+hours + ":"+minutes;

     }else{
          var ampm = hours >= 12 ? 'PM' : 'AM';
          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'
          minutes = minutes < 10 ? minutes : minutes;
          var date = datewithouttime+ " "+hours + ':' + minutes + ' ' + ampm; 
     }
     return date;
}
function getCatchUPDate(dateString){
     
     var hourAndMin = dateString.substr(0,5);
     var hourAndMinSplited = hourAndMin.split(":");
     // alert(hourAndMinSplited[0]);


     var data = new Date();
     var hours = hourAndMinSplited[0];
     var minutes = hourAndMinSplited[1];

     if(selectedTimeFormat == "24"){
          if(hours <= 9)
               hours =   hours ; 
          if(minutes <= 9)
               minutes =  minutes ; 

          var date = hours + ":"+minutes;

     }else{
          var ampm = hours >= 12 ? 'PM' : 'AM';
          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'
          minutes = minutes < 10 ? minutes : minutes;
          var date = hours + ':' + minutes + ' ' + ampm; 
     }
     return date;
}

Util.fullScreenMoviePage = function(){
	var Text = '';

     Text +='<div class="col-sm-12 no-padding" style="    margin: 0px;"><div class="header clearfix clearfixHeight" id="heading clearfixHeight" ><div class="row movies_title_height"><div class="logo col-sm-2"><img src="images/home-logo.png"></div><div class="col-sm-9 text-center"><h1 class="main-title">'+Player.data.name+'</h1></div><div class="col-md-1"></div></div></div></div>'

Text +='<div class ="playerDiv imageFocus" id="videoHtml" style=" width: 60%; margin: 0 auto;margin-bottom: 5%;    margin-top: 200px;    background: black;">'
Text +='<div style=" position: absolute; right: 19%;"><img src="images/close.png" class="closeModal" id="closeModal" style="position: relative;left: 0;top: -25px;background: rgba(60, 52, 52, 0.8);border-radius: 100%;width: 50px;cursor: pointer;z-index: 999;"></div>'
//                    Text +='<div id="player-wrapper" style="text-align: center;">'
//
//                    Text +='</div>'

//  Text +='<div class="PlayerHolder" data-ajplayer="" data-flowplayer="" data-jwplayer="">'
//                           								Text +='<div id="player-holder" class="hideOnLoad"  style="border:solid 2px #fff; height: auto !important;"  >'
//                           								Text +='</div>'
//                           								Text +='</div>'

Text +='<div class ="player playerMovies" id="videoHtml" source="playerSource">'
Text +='<div id="player-wrapper">'

Text +='</div>'
Text +='</div>'




                    Text +='</div>';



                    	return Text;


}
Util.fullScreenCatchupPage = function(){
	var Text = '';

     // Text +='<div class="col-sm-12 no-padding" style="    margin: 0px;"><div class="header clearfix" id="heading" style="height: 115px;"><div class="row" style="    margin-top: 15px;width: 100%;padding-right: 30px;padding-left: 50px;"><div class="logo col-sm-2"><img src="images/home-logo.png"></div><div class="col-sm-9 text-center"><h1 class="main-title">'+Player.data.name+'</h1></div><div class="col-md-1"></div></div></div></div>'

Text +='<div class ="playerDiv imageFocus" id="videoHtml" style=" width: 60%; margin: 0 auto;margin-bottom: 5%;    margin-top: 200px;    background: black;">'
Text +='<div style=" position: absolute; right: 19%;"><img src="images/close.png" class="closeModal" id="closeModal" style="position: relative;left: 0;top: -25px;background: rgba(60, 52, 52, 0.8);border-radius: 100%;width: 50px;cursor: pointer;z-index: 999;"></div>'
//                    Text +='<div id="player-wrapper" style="text-align: center;">'
//
//                    Text +='</div>'

//  Text +='<div class="PlayerHolder" data-ajplayer="" data-flowplayer="" data-jwplayer="">'
//                           								Text +='<div id="player-holder" class="hideOnLoad"  style="border:solid 2px #fff; height: auto !important;"  >'
//                           								Text +='</div>'
//                           								Text +='</div>'

Text +='<div class ="player playerMovies" id="videoHtml" source="playerSource">'
Text +='<div id="player-wrapper">'

Text +='</div>'
Text +='</div>'




                    Text +='</div>';



                    	return Text;


}

Util.fullScreenMovieTrailer = function(){
	var Text = '';
     Text +='<div class="col-sm-12 no-padding" style="    margin: 0px;"><div class="header clearfix clearfixHeight" id="heading" ><div class="row movies_title_height" ><div class="logo col-sm-2"><img src="images/home-logo.png"></div><div class="col-sm-9 text-center"><h1 class="main-title">'+Player.data.name+'</h1></div><div class="col-md-1"></div></div></div></div>'

Text +='<div class ="playerDiv imageFocus" id="videoHtml" style=" width: 60%; margin: 0 auto;margin-bottom: 5%;    margin-top: 200px;">' 

// Text +='<div class ="player playerMovies" id="videoHtml" source="playerSource">'
// Text +='<div id="player-wrapper">'

// Text +='</div>'
// Text +='</div>'

Text +='<div style=" position: absolute; right: 19%;"><img src="images/close.png" class="closeModal" id="closeModal" style="position: relative;left: 0;top: -25px;background: rgba(60, 52, 52, 0.8);border-radius: 100%;width: 50px;cursor: pointer;z-index: 999;"></div>'
Text +='<iframe width="100%" height="60%"'
Text +='allowfullscreen="allowfullscreen"'
Text +='mozallowfullscreen="mozallowfullscreen"'
Text +='msallowfullscreen="msallowfullscreen" '
Text +='oallowfullscreen="oallowfullscreen" '
Text +='webkitallowfullscreen="webkitallowfullscreen"'
     Text +='src="https://www.youtube.com/embed/'+openedMovieTrailer+'">'
     Text +='</iframe>'

     





                    Text +='</div>';



                    	return Text;


}

Util.fullScreenCatchUpPage = function(programName){
	var Text = '';

	Text +='<div class="no-padding row" id=""><div class="col-sm-12 no-padding"><div class="header clearfix" id="heading"><div class="container"><div class="logo col-sm-4 p-left margin30"><img src="images/home-logo.png"></div><div class="col-sm-8 text-center"><h1 style="font-size: 30px;">'+programName+'</h1></div></div></div></div></div>'

Text +='<div class ="playerDiv imageFocus" id="videoHtml" style=" width: 70%; margin: 0 auto;margin-bottom: 5%;">'
//                    Text +='<div id="player-wrapper" style="text-align: center;">'
//
//                    Text +='</div>'

// Text +='<div class="PlayerHolder" data-ajplayer="" data-flowplayer="" data-jwplayer="">'
//                          								Text +='<div id="player-holder" class="hideOnLoad"  style="border:solid 2px #fff; height: auto !important;"  >'
//                          								Text +='</div>'
//                          								Text +='</div>'
//                    Text +='</div>';

                                         Text +='<div id="player-wrapper" style="text-align: center;">'

                                        Text +='</div>'



                    	return Text;


}

Util.liveDetailsPage = function(){
    pinEntered = false;
//console.log(liveSectionDetails.length);

     var Text = '';
     if(currentAPPType == "m3u"){
          Text += '<div class="mainHome">'
          Text +='<div class="container">'
          Text +='<div class="row">'
          Text +='<div class="mainHomeContent liveTopHeader">'
    
              Text += '<div class="liveHeader">'
                   Text +='<div class="row">';
                        Text += '<div class="col-md-3"><img src="images/home-logo.png"  class="logImg"/></div>'; 
                        
    
                        var data = new Date();
                        var date = getDateWithBothFormats(selectedTimeFormat); 
                        var date2 = monthNames[data.getMonth()] + " " + data.getDate() + ", " + data.getFullYear();
     
    
    
                        // Text += '<div class="col-md-1"><p></p></div>'
                        Text += '<div class="col-md-4"><div class="floatRight"><h1 class="timeOnAllPages" style="float:left">'+date+'</h1><h1 style="    margin-left: 30px;float:left" class="dateOnAllPages">'+date2+'</h1></div></div>'
                        Text += '<div class="col-md-4"><a id="clearSearch" class="btn btn-default accountBtn accountBack"   style=" width: 110px;    display: none; font-size: 15px; float: left; margin: 16px;" source="clearSearchIcon">Clear Search</a><img src="images/sort.png" class="sortIcon" id="sortIcon" source="sortIcon"><img src="images/search-ico.png" class="searchIcon" id="searchIcon" source="searchIcon"></div>'
                    Text +='<div id="searchResultLive"></div>'
                    Text +='</div>';
              Text +='</div>';
    
              Text += '<div class="homeBody liveBottomheader">'
                   Text +='<div class="row">';
                        Text +='<div class="col-md-6 liveChannels">'
                        // console.log(liveSectionDetails);
                        Text +='<div class="">'
                        Text +='<div class="row liveHeadLine rowSec" source="liveHeadLine"><div class="col-md-2"><img src="images/left_icon_cat.png" source="arrows"  id="leftLiveArrow" class="arrowsIcon"></div><div class="col-md-8 headSectionsLive"><p>'+liveSectionDetails.category.category_name+'</p></div>'
                        Text +='<div class="col-md-2"><img src="images/right_icon_cat.png" class="arrowsIcon" source="arrows" id="rightLiveArrow" ></div></div>'
                        
                        Text +='<div class="liveDetails scrollBarClass" style="overflow: scroll;height: 85%;overflow-x:hidden;">'
//                         var sortingType = localStorage.getItem('liveSorting');
//                            if(sortingType=="" || sortingType == null){
//                                 sortingType = "default";
//                            }
//     //                       alert(sortingType);
    
//                           if(sortingType == "default"){
    
//                               var liveDataWithoutCategories = JSON.parse(liveSectionDefaultWithoutSorting);
//                               var liveDataCategories = JSON.parse(liveSectionDefaultWithoutSortingCategories);
//                               liveSectionDetails = liveDataWithoutCategories;
//                               liveSectionDetails.category = liveDataCategories;
    
//                 //              abc = abcd.livesectiondetails;
//                 //              var abc = helper.arr.multisort(items, ['num'], ['DESC']);
//                           }else if(sortingType == "atoz"){
//                               var abc = helper.arr.multisort(liveSectionDetails, ['name'], ['ASC']);
//                           }else if(sortingType == "ztoa"){
//                               var abc = helper.arr.multisort(liveSectionDetails, ['name'], ['DESC']);
//                           }else if(sortingType == "topadded"){
//                               var abc = helper.arr.multisort(liveSectionDetails, ['added'], ['DESC']);
//                           }else if(sortingType == "channelnum_asc"){
//                               var abc = helper.arr.multisort(liveSectionDetails, ['num'], ['ASC']);
//                           }else if(sortingType == "channelnum_desc"){
//                               var abc = helper.arr.multisort(liveSectionDetails, ['num'], ['DESC']);
//                           }
    
    
    
//                             if(sortingType != "default"){
//                                    liveSectionDetails = abc;
//                             }
//                                var allLiveFavourites = JSON.parse(localStorage.getItem("allM3UFavourites"));
//                                                        //  console.log(allLiveFavourites);
    
//                                   if(allLiveFavourites !== null) {
//                                     for(var j=0;j<allLiveFavourites.length;j++){
//                                            if(allLiveFavourites[j][0] == Main.profile.m3uLine){
//                                                var items =  allLiveFavourites[j][1];
//                                            }
//                                     }
//                                   }

                                  Text +='<div id="allChannelsDiv" style="    height: 100%;  width: 100%;"></div>'
    //alert("asdf");
                         //     console.log(items);
    
                    //     for(var i=0;i<liveSectionDetails.length;i++){
                    //          // if(i > 6){ break; }
                    //          // else
                    //      //    console.log(liveSectionDetails[i]);
                    //               Text +='<div class="row rowSec" dropdown-clickable-attr="true" source= "liveChannels" streamId="'+liveSectionDetails[i].url+'"   id="liveChannel-'+i+'" index='+i+' count="'+liveSectionDetails.length+'" ><div class="liveDetailsH1" dropdown-clickable-attr="true" ><h1 dropdown-clickable-attr="true" >'+liveSectionDetails[i].num+'</h1></div><div class="liveDetailsImg" dropdown-clickable-attr="true" ><img dropdown-clickable-attr="true"  src="'+liveSectionDetails[i].stream_icon+'"  class="channellogo-img" onerror="this.src=\'images/logo.png\';" ></div>  <div class="liveDetailPlayImg" dropdown-clickable-attr="true" ><i class="fa fa-play playShowImg" style="color: white;text-shadow: 0px 4px 9px rgba(0, 0, 0, 0.39);"></i></div> <div dropdown-clickable-attr="true"  class="liveDetailsName">';
     
    
    
    
                    //               if(liveSectionDetails[i].name.length < 20){
                    //                    Text +='<h1 dropdown-clickable-attr="true"><span dropdown-clickable-attr="true" >'+liveSectionDetails[i].name+'</span></h1></div>'
    
                    //                    if(items!=null && jQuery.inArray(liveSectionDetails[i].url, items) != -1) {
                    //                     var found = true;
                    //                       Text +='<div dropdown-clickable-attr="true" class="liveDetailPlayImg" style="float: right; ">   <i  source="favButton" class="fa fa-heart activefav liveFavHeart show" id="favStar_'+i+'" aria-hidden="true" ></i></div>'
                    //                    }else{
                    //                       var found = false;
                    //                       Text +='<div dropdown-clickable-attr="true" class="liveDetailPlayImg" style="float: right; ">  <i  source="favButton" class="fa fa-heart activefav liveFavHeart hide" id="favStar_'+i+'" aria-hidden="true" ></i>  </div>'
                    //                    }
    
                    //                    Text +='<div class="dropdown-content" id="dropdown_id_'+i+'" style="margin-left: -143px;z-index:99;"><a href="#" id="play_link_'+i+'" onclick="playLink()" class="playLinkClass">Play</a>'
                    //                    if(found) {
                    //                         Text +='<a href="#" onclick="removeFromFavLink(\''+liveSectionDetails[i].url+'\','+i+')" id="remove_from_fav_link_'+i+'" class="RemoveFromFavClass">Remove From Favourite</a>'
                    //                    } else {
                    //                         Text +='<a href="#" onclick="addToFavLink(\''+liveSectionDetails[i].url+'\','+i+')" id="add_to_fav_link_'+i+'" class="addToFavClass">Add to Favourite</a>'
                    //                    }
                    //                    Text +='<a href="#" onclick="viewFullEPG(\''+liveSectionDetails[i].url+'\','+i+');" id="full_epg_menu_link_'+i+'"  class="fullEPGMenuClass">View Full EPG</a>'
                    //                    Text +='<a href="#" onclick="hideAddToFav();" id="close_menu_link_'+i+'"  class="closeMenuClass">Close</a></div>'
                    //                    Text +='</div>'
    
                    //               }else{
                    //                    Text +='<h1 dropdown-clickable-attr="true"><span dropdown-clickable-attr="true" class="namescroll">'+liveSectionDetails[i].name+'</span></h1></div>'
                    //                    if(items!=null && jQuery.inArray(liveSectionDetails[i].url, items) != -1) {
                    //                       var found = true;
                    //                       Text +='<div  dropdown-clickable-attr="true" class="liveDetailPlayImg" style="float: right; ">       <i  source="favButton" class="fa fa-heart activefav liveFavHeart show" id="favStar_'+i+'" aria-hidden="true" ></i>        </div>'
                    //                    }else{
                    //                       var found = false;
                    //                       Text +='<div dropdown-clickable-attr="true"  class="liveDetailPlayImg" style="float: right; ">        <i  source="favButton" class="fa fa-heart activefav liveFavHeart hide" id="favStar_'+i+'" aria-hidden="true" ></i>       </div>'
                    //                    }
                    //                    Text +='<div class="dropdown-content" id="dropdown_id_'+i+'" style="margin-left: -143px;z-index:99;"><a href="#" id="play_link_'+i+'" onclick="playLink()" class="playLinkClass">Play</a>'
                    //                    if(found) {
                    //                         Text +='<a href="#" onclick="removeFromFavLink(\''+liveSectionDetails[i].url+'\','+i+')" id="remove_from_fav_link_'+i+'" class="RemoveFromFavClass">Remove From Favourite</a>'
                    //                    } else {
                    //                         Text +='<a href="#" onclick="addToFavLink(\''+liveSectionDetails[i].url+'\','+i+')" id="add_to_fav_link_'+i+'" class="addToFavClass">Add to Favourite</a>'
                    //                    }
                    //                     Text +='<a href="#" onclick="viewFullEPG(\''+liveSectionDetails[i].url+'\','+i+');" id="full_epg_menu_link_'+i+'"  class="fullEPGMenuClass">View Full EPG</a>'
                    //                     Text +='<a href="#" onclick="hideAddToFav();" id="close_menu_link_'+i+'" class="closeMenuClass">Close</a></div>'
                    //                   Text +='</div>'
    
                    //                }
    
    
                    //     }
    
    
                        Text +='</div>'
    
    
                        Text +='<div class="liveDetailsName norecordfound" style="width: 100%;display:none; position: absolute;top: 200;"><h1><span class="namescroll" style="text-align: center;">No Record Found</span></h1></div>'
    
    
                        Text +='</div>'
                             
                        Text += '</div>';
                        Text +='<div class="col-md-6 liveBodyTop" >';
    
    
                        Text +='<div id="smallLoading"  class="cssload-container" style="display:none;z-index: 99999;">'
                        Text +='<div id="loadingImg">'
                        Text +='          <center><img src="images/Spin.png" class="imgsLoader" /></center>'
                        Text +='     </div>'
                        Text +='</div>'
    
    //                    Text +='<div class="player" id="videoHtml">'
    //
    //
    //
    //                    Text += "<b class='playerReconnecting'></b>"
    //                    Text +='</div>'
    
                        Text +='<div class ="player" id="videoHtml" source="playerSource">'
                        Text +='<div id="player-wrapper">'
    
                        Text +='</div>'
                        Text +='</div>'
    
    
                        Text +='<div class="epgListing">'
    
                        Text +='</div>'
    
                        Text += '</div>';
                   Text +='</div>';
              Text +='</div>';
    
         
              Text +='</div>';
    
    
    
         Text +='</div></div></div></div>';
     }else{
          Text += '<div class="mainHome">'
          Text +='<div class="container">'
          Text +='<div class="row">'
          Text +='<div class="mainHomeContent liveTopHeader">'
    
              Text += '<div class="liveHeader">'
                   Text +='<div class="row">';
                        Text += '<div class="col-md-3"><img src="images/home-logo.png"  class="logImg"/></div>'; 
                        
    
                        var data = new Date();
                        var date = getDateWithBothFormats(selectedTimeFormat); 
                        var date2 = monthNames[data.getMonth()] + " " + data.getDate() + ", " + data.getFullYear();
     
    
    
                        // Text += '<div class="col-md-1"><p></p></div>'
                        Text += '<div class="col-md-4"><div class="floatRight"><h1 class="timeOnAllPages" style="float:left">'+date+'</h1><h1 style="    margin-left: 30px;float:left" class="dateOnAllPages">'+date2+'</h1></div></div>'
                        Text += '<div class="col-md-4"><a id="clearSearch" class="btn btn-default accountBtn accountBack"   style=" width: 110px;    display: none; font-size: 15px; float: left; margin: 16px;" source="clearSearchIcon">Clear Search</a><img src="images/sort.png" class="sortIcon" id="sortIcon" source="sortIcon"><img src="images/search-ico.png" class="searchIcon" id="searchIcon" source="searchIcon"></div>'
                    Text +='<div id="searchResultLive"></div>'
                    Text +='</div>';
              Text +='</div>';
    
              Text += '<div class="homeBody liveBottomheader">'
                   Text +='<div class="row">';
                        Text +='<div class="col-md-6 liveChannels">'
                        // console.log(liveSectionDetails);
                        Text +='<div class="">'
                        Text +='<div class="row liveHeadLine rowSec" source="liveHeadLine"><div class="col-md-2"><img src="images/left_icon_cat.png" source="arrows"  id="leftLiveArrow" class="arrowsIcon"></div><div class="col-md-8 headSectionsLive"><p>'+liveSectionDetails.category.category_name+'</p></div>'
                        Text +='<div class="col-md-2"><img src="images/right_icon_cat.png" class="arrowsIcon" source="arrows" id="rightLiveArrow" ></div></div>'
                        
                        Text +='<div class="liveDetails scrollBarClass" style="overflow: scroll;height: 85%;overflow-x:hidden;">'
//                         var sortingType = localStorage.getItem('liveSorting');
//                            if(sortingType=="" || sortingType == null){
//                                 sortingType = "default";
//                            }
//     //                       alert(sortingType);
    
//                           if(sortingType == "default"){
    
//                               var liveDataWithoutCategories = JSON.parse(liveSectionDefaultWithoutSorting);
//                               var liveDataCategories = JSON.parse(liveSectionDefaultWithoutSortingCategories);
//                               liveSectionDetails = liveDataWithoutCategories;
//                               liveSectionDetails.category = liveDataCategories;
    
//                 //              abc = abcd.livesectiondetails;
//                 //              var abc = helper.arr.multisort(items, ['num'], ['DESC']);
//                           }else if(sortingType == "atoz"){
//                               var abc = helper.arr.multisort(liveSectionDetails, ['name'], ['ASC']);
//                           }else if(sortingType == "ztoa"){
//                               var abc = helper.arr.multisort(liveSectionDetails, ['name'], ['DESC']);
//                           }else if(sortingType == "topadded"){
//                               var abc = helper.arr.multisort(liveSectionDetails, ['added'], ['DESC']);
//                           }else if(sortingType == "channelnum_asc"){
//                               var abc = helper.arr.multisort(liveSectionDetails, ['num'], ['ASC']);
//                           }else if(sortingType == "channelnum_desc"){
//                               var abc = helper.arr.multisort(liveSectionDetails, ['num'], ['DESC']);
//                           }
    
    
    
//                             if(sortingType != "default"){
//                                    liveSectionDetails = abc;
//                             }
//                                var allLiveFavourites = JSON.parse(localStorage.getItem("allLiveFavourites"));
//                                                       //   console.log(allLiveFavourites);
    
//                                   if(allLiveFavourites !== null) {
//                                     for(var j=0;j<allLiveFavourites.length;j++){
//                                            if(allLiveFavourites[j][0] == Main.profile.user_info.login_url){
//                                                var items =  allLiveFavourites[j][1];
//                                            }
//                                     }
//                                   }
//     //alert("asdf");
//                              // console.log(items);

                              Text +='<div id="allChannelsDiv" style="    height: 100%;  width: 100%;"></div>'

    
//                         for(var i=0;i<liveSectionDetails.length;i++){
//                              // if(i > 6){ break; }
//                              // else
//     //                         console.log(liveSectionDetails[i]);
//                                   Text +='<div class="row rowSec" dropdown-clickable-attr="true" source= "liveChannels" streamId="'+liveSectionDetails[i].stream_id+'"  id="liveChannel-'+i+'" index='+i+' count="'+liveSectionDetails.length+'" ><div class="liveDetailsH1" dropdown-clickable-attr="true" ><h1 dropdown-clickable-attr="true" >'+liveSectionDetails[i].num+'</h1></div><div class="liveDetailsImg" dropdown-clickable-attr="true" ><img dropdown-clickable-attr="true"  src="'+liveSectionDetails[i].stream_icon+'"  class="channellogo-img" onerror="this.src=\'images/logo.png\';" ></div>  <div class="liveDetailPlayImg" dropdown-clickable-attr="true" ><i class="fa fa-play playShowImg" style="color: white;text-shadow: 0px 4px 9px rgba(0, 0, 0, 0.39);"></i></div> <div dropdown-clickable-attr="true"  class="liveDetailsName">';
    
//     //                              var item = localStorage.getItem("favChannelsList");
//     //                              var items = JSON.parse(localStorage.getItem('favChannelsList'));
    
    
    
//                                   if(liveSectionDetails[i].name.length < 20){
//                                        Text +='<h1 dropdown-clickable-attr="true"><span dropdown-clickable-attr="true" >'+liveSectionDetails[i].name+'</span></h1></div>'
    
//                                        if(items!=null && jQuery.inArray(liveSectionDetails[i].stream_id, items) != -1) {
//                                           var found = true;
//                                           Text +='<div dropdown-clickable-attr="true" class="liveDetailPlayImg" style="float: right; ">   <i  source="favButton" class="fa fa-heart activefav liveFavHeart show" id="favStar_'+i+'" aria-hidden="true" ></i></div>'
//                                        }else{
//                                           var found = false;
//                                           Text +='<div dropdown-clickable-attr="true" class="liveDetailPlayImg" style="float: right; ">  <i  source="favButton" class="fa fa-heart activefav liveFavHeart hide" id="favStar_'+i+'" aria-hidden="true" ></i>  </div>'
//                                        }
    
//                                        Text +='<div class="dropdown-content" id="dropdown_id_'+i+'" style="margin-left: -143px;z-index:99;"><a href="#" id="play_link_'+i+'" onclick="playLink()" class="playLinkClass">Play</a>'
//                                        if(found) {
//                                             Text +='<a href="#" onclick="removeFromFavLink('+liveSectionDetails[i].stream_id+','+i+')" id="remove_from_fav_link_'+i+'" class="RemoveFromFavClass">Remove From Favourite</a>'
//                                        } else {
//                                             Text +='<a href="#" onclick="addToFavLink('+liveSectionDetails[i].stream_id+','+i+')" id="add_to_fav_link_'+i+'" class="addToFavClass">Add to Favourite</a>'
//                                        }
//                                        Text +='<a href="#" onclick="viewFullEPG('+liveSectionDetails[i].stream_id+','+i+');" id="full_epg_menu_link_'+i+'"  class="fullEPGMenuClass">View Full EPG</a>'
//                                        Text +='<a href="#" onclick="hideAddToFav();" id="close_menu_link_'+i+'"  class="closeMenuClass">Close</a></div>'
//                                        Text +='</div>'
    
//                                   }else{
//                                        Text +='<h1 dropdown-clickable-attr="true"><span dropdown-clickable-attr="true" class="namescroll">'+liveSectionDetails[i].name+'</span></h1></div>'
//                                        if(items!=null && jQuery.inArray(liveSectionDetails[i].stream_id, items) != -1) {
//                                           var found = true;
//                                           Text +='<div  dropdown-clickable-attr="true" class="liveDetailPlayImg" style="float: right; ">       <i  source="favButton" class="fa fa-heart activefav liveFavHeart show" id="favStar_'+i+'" aria-hidden="true" ></i>        </div>'
//                                        }else{
//                                           var found = false;
//                                           Text +='<div dropdown-clickable-attr="true"  class="liveDetailPlayImg" style="float: right; ">        <i  source="favButton" class="fa fa-heart activefav liveFavHeart hide" id="favStar_'+i+'" aria-hidden="true" ></i>       </div>'
//                                        }
//                                        Text +='<div class="dropdown-content" id="dropdown_id_'+i+'" style="margin-left: -143px;z-index:99;"><a href="#" id="play_link_'+i+'" onclick="playLink()" class="playLinkClass">Play</a>'
//                                        if(found) {
//                                             Text +='<a href="#" onclick="removeFromFavLink('+liveSectionDetails[i].stream_id+','+i+')" id="remove_from_fav_link_'+i+'" class="RemoveFromFavClass">Remove From Favourite</a>'
//                                        } else {
//                                             Text +='<a href="#" onclick="addToFavLink('+liveSectionDetails[i].stream_id+','+i+')" id="add_to_fav_link_'+i+'" class="addToFavClass">Add to Favourite</a>'
//                                        }
//                                         Text +='<a href="#" onclick="viewFullEPG('+liveSectionDetails[i].stream_id+','+i+');" id="full_epg_menu_link_'+i+'"  class="fullEPGMenuClass">View Full EPG</a>'
//                                         Text +='<a href="#" onclick="hideAddToFav();" id="close_menu_link_'+i+'" class="closeMenuClass">Close</a></div>'
//                                       Text +='</div>'
    
//                                    }
    
    
//                         }
    
    
                        Text +='</div>'
    
    
                        Text +='<div class="liveDetailsName norecordfound" style="width: 100%;display:none; position: absolute;top: 200;"><h1><span class="namescroll" style="text-align: center;">No Record Found</span></h1></div>'
    
    
                        Text +='</div>'
                             
                        Text += '</div>';
                        Text +='<div class="col-md-6 liveBodyTop" >';
    
    
                        Text +='<div id="smallLoading"  class="cssload-container" style="display:none;z-index: 99999;">'
                        Text +='<div id="loadingImg">'
                        Text +='          <center><img src="images/Spin.png" class="imgsLoader" /></center>'
                        Text +='     </div>'
                        Text +='</div>'
    
    //                    Text +='<div class="player" id="videoHtml">'
    //
    //
    //
    //                    Text += "<b class='playerReconnecting'></b>"
    //                    Text +='</div>'
    
                        Text +='<div class ="player" id="videoHtml" source="playerSource">'
                        Text +='<div id="player-wrapper">'
    
                        Text +='</div>'
                        Text +='</div>'
    
    
                        Text +='<div class="epgListing">'
    
                        Text +='</div>'
    
                        Text += '</div>';
                   Text +='</div>';
              Text +='</div>';
    
         
              Text +='</div>';
    
    
    
         Text +='</div></div></div></div>';
     }



	return Text;
}
 
Util.updateSectionCat = function(focusedId){
      
      var Text = '';

      if(currentAPPType == "m3u"){
          Text +='<div class="">'
     
          Text +='<div class="row liveHeadLine rowSec" source="liveHeadLine">'
          if(focusedId == "leftLiveArrow"){
               Text +='<div class="col-md-2"><img src="images/left_icon_cat.png" source="arrows"  id="leftLiveArrow" class="arrowsIcon imageFocus"></div>'
          }else{
               Text +='<div class="col-md-2"><img src="images/left_icon_cat.png" source="arrows"  id="leftLiveArrow" class="arrowsIcon"></div>'
          }
          Text +='<div class="col-md-8 headSectionsLive"><p>'+liveSectionDetails.category.category_name+'</p></div>'
          if(focusedId == "rightLiveArrow"){
              Text +='<div class="col-md-2"><img src="images/right_icon_cat.png" class="arrowsIcon imageFocus" source="arrows" id="rightLiveArrow" ></div></div>'
          }else{
              Text +='<div class="col-md-2"><img src="images/right_icon_cat.png" class="arrowsIcon" source="arrows" id="rightLiveArrow" ></div></div>'
          }
     
     // var sortingType = localStorage.getItem('liveSorting');
     //                        if(sortingType=="" || sortingType == null){
     //                            sortingType = "default";
     //                       }
     //                       if(sortingType == "default"){
     
     //                           var liveDataWithoutCategories = JSON.parse(liveSectionDefaultWithoutSorting);
     //                           var liveDataCategories = JSON.parse(liveSectionDefaultWithoutSortingCategories);
     //                           liveSectionDetails = liveDataWithoutCategories;
     //                           liveSectionDetails.category = liveDataCategories;
     //             //               console.log(liveSectionDetails);
     
     //             //              abc = abcd.livesectiondetails;
     //             //              var abc = helper.arr.multisort(items, ['num'], ['DESC']);
     //                       }else if(sortingType == "atoz"){
     //                           var abc = helper.arr.multisort(liveSectionDetails, ['name'], ['ASC']);
     //                       }else if(sortingType == "ztoa"){
     //                           var abc = helper.arr.multisort(liveSectionDetails, ['name'], ['DESC']);
     //                       }else if(sortingType == "topadded"){
     //                           var abc = helper.arr.multisort(liveSectionDetails, ['added'], ['DESC']);
     //                       }else if(sortingType == "channelnum_asc"){
     //                           var abc = helper.arr.multisort(liveSectionDetails, ['num'], ['ASC']);
     //                       }else if(sortingType == "channelnum_desc"){
     //                           var abc = helper.arr.multisort(liveSectionDetails, ['num'], ['DESC']);
     //                       }
     
     
     
     //                         if(sortingType != "default"){
     //                                liveSectionDetails = abc;
     //                         }
     //                         var allLiveFavourites = JSON.parse(localStorage.getItem("allM3UFavourites"));
     //                           if(allLiveFavourites !== null) {
     //                             for(var j=0;j<allLiveFavourites.length;j++){
     //                                    if(allLiveFavourites[j][0] == Main.profile.m3uLine){
     //                                        var items =  allLiveFavourites[j][1];
     //                                    }
     //                             }
     //                           }
     
                               
          Text +='<div class="liveDetails" style="overflow: scroll;height: 83%;">'

          Text +='<div id="allChannelsDiv" style="    height: 100%;  width: 100%;"></div>'

     //      for(var i=0;i<liveSectionDetails.length;i++){
     //           // if(i > 6){break;}
     //           // else {
     //                Text +='<div class="row rowSec '+((playingChannel == liveSectionDetails[i].url)? "playing" : "")+'"  dropdown-clickable-attr="true"  source= "liveChannels" streamId="'+liveSectionDetails[i].url+'"  id="liveChannel-'+i+'" index='+i+' count="'+liveSectionDetails.length+'" >'
     //                Text +='<div class="liveDetailsH1" dropdown-clickable-attr="true"><h1 dropdown-clickable-attr="true">'+liveSectionDetails[i].num+'</h1></div>'
     //                Text +='<div class="liveDetailsImg" dropdown-clickable-attr="true"><img dropdown-clickable-attr="true" src="'+liveSectionDetails[i].stream_icon+'" class="channellogo-img" onerror="this.src=\'images/logo.png\';" ></div>'
     //                Text +='<div class="liveDetailPlayImg" dropdown-clickable-attr="true"><i class="fa fa-play playShowImg" style="color: white;text-shadow: 0px 4px 9px rgba(0, 0, 0, 0.39);"></i></div>'
     
     //                Text +='<div class="liveDetailsName" dropdown-clickable-attr="true">'
     //                if(liveSectionDetails[i].name.length < 20 )
     //                     Text+= '<h1 dropdown-clickable-attr="true"><span dropdown-clickable-attr="true">'+liveSectionDetails[i].name+'</span></h1/></div>'
     //                else
     //                     Text+= '<h1 dropdown-clickable-attr="true"><span dropdown-clickable-attr="true" class="namescroll">'+liveSectionDetails[i].name+'</span></h1/></div>'
     
     
     // //                var items = JSON.parse(localStorage.getItem('favChannelsList'));
     
     //                 if(items!=null && jQuery.inArray(liveSectionDetails[i].url, items) != -1) {
     //                      var found = true;
     //                      Text +='<div class="liveDetailPlayImg" dropdown-clickable-attr="true" style="float: right; ">    <i  source="favButton" class="fa fa-heart activefav liveFavHeart show" id="favStar_'+i+'" aria-hidden="true" ></i>     </div>'
     //                   }else{
     //                      var found = false;
     //                      Text +='<div class="liveDetailPlayImg" dropdown-clickable-attr="true" style="float: right; ">     <i  source="favButton" class="fa fa-heart activefav liveFavHeart hide" id="favStar_'+i+'" aria-hidden="true" ></i>    </div>'
     //                   }
     //                  Text +='<div class="dropdown-content" id="dropdown_id_'+i+'" style="margin-left: -130px;z-index:99;"><a href="#" id="play_link_'+i+'" onclick="playLink()" class="playLinkClass">Play</a>'
     
     //                  if(found) {
     //                        Text +='<a href="#" onclick="removeFromFavLink(\''+liveSectionDetails[i].url+'\','+i+')" id="remove_from_fav_link_'+i+'" class="RemoveFromFavClass">Remove From Favourite</a>'
     //                    } else {
     //                        Text +='<a href="#" onclick="addToFavLink(\''+liveSectionDetails[i].url+'\','+i+')" id="add_to_fav_link_'+i+'" class="addToFavClass">Add to Favourite</a>'
     //                    }
     
     //                  Text +='<a href="#" onclick="viewFullEPG(\''+liveSectionDetails[i].url+'\','+i+');" id="full_epg_menu_link_'+i+'"  class="fullEPGMenuClass">View Full EPG</a>'
     //                  Text +='<a href="#" onclick="hideAddToFav();" id="close_menu_link_'+i+'" class="closeMenuClass">Close</a></div>'
     //                  Text +='</div>'
     
     // //               Text +='</div>'
     //           // }
     //      }
          Text +='</div>'
     
          Text +='<div class="liveDetailsName norecordfound" style="width: 100%;display:none; position: absolute;top: 200;"><h1><span class="namescroll" style="text-align: center;">No Record Found</span></h1></div>'
     
          Text +='</div>'
      }else{
          Text +='<div class="">'
     
          Text +='<div class="row liveHeadLine rowSec" source="liveHeadLine">'
          if(focusedId == "leftLiveArrow"){
               Text +='<div class="col-md-2"><img src="images/left_icon_cat.png" source="arrows"  id="leftLiveArrow" class="arrowsIcon imageFocus"></div>'
          }else{
               Text +='<div class="col-md-2"><img src="images/left_icon_cat.png" source="arrows"  id="leftLiveArrow" class="arrowsIcon"></div>'
          }
          Text +='<div class="col-md-8 headSectionsLive"><p>'+liveSectionDetails.category.category_name+'</p></div>'
          if(focusedId == "rightLiveArrow"){
              Text +='<div class="col-md-2"><img src="images/right_icon_cat.png" class="arrowsIcon imageFocus" source="arrows" id="rightLiveArrow" ></div></div>'
          }else{
              Text +='<div class="col-md-2"><img src="images/right_icon_cat.png" class="arrowsIcon" source="arrows" id="rightLiveArrow" ></div></div>'
          }
     
     // var sortingType = localStorage.getItem('liveSorting');
     //                        if(sortingType=="" || sortingType == null){
     //                            sortingType = "default";
     //                       }
     //                       if(sortingType == "default"){
     
     //                           var liveDataWithoutCategories = JSON.parse(liveSectionDefaultWithoutSorting);
     //                           var liveDataCategories = JSON.parse(liveSectionDefaultWithoutSortingCategories);
     //                           liveSectionDetails = liveDataWithoutCategories;
     //                           liveSectionDetails.category = liveDataCategories;
     //             //               console.log(liveSectionDetails);
     
     //             //              abc = abcd.livesectiondetails;
     //             //              var abc = helper.arr.multisort(items, ['num'], ['DESC']);
     //                       }else if(sortingType == "atoz"){
     //                           var abc = helper.arr.multisort(liveSectionDetails, ['name'], ['ASC']);
     //                       }else if(sortingType == "ztoa"){
     //                           var abc = helper.arr.multisort(liveSectionDetails, ['name'], ['DESC']);
     //                       }else if(sortingType == "topadded"){
     //                           var abc = helper.arr.multisort(liveSectionDetails, ['added'], ['DESC']);
     //                       }else if(sortingType == "channelnum_asc"){
     //                           var abc = helper.arr.multisort(liveSectionDetails, ['num'], ['ASC']);
     //                       }else if(sortingType == "channelnum_desc"){
     //                           var abc = helper.arr.multisort(liveSectionDetails, ['num'], ['DESC']);
     //                       }
     
     
     
     //                         if(sortingType != "default"){
     //                                liveSectionDetails = abc;
     //                         }

     
                               
          Text +='<div class="liveDetails" style="overflow: scroll;height: 83%;">'

          Text +='<div id="allChannelsDiv" style="    height: 100%;  width: 100%;"></div>'

     //      for(var i=0;i<liveSectionDetails.length;i++){
     //           // if(i > 6){break;}
     //           // else {
     //                Text +='<div class="row rowSec '+((playingChannel == liveSectionDetails[i].stream_id)? "playing" : "")+'"  dropdown-clickable-attr="true"  source= "liveChannels" streamId="'+liveSectionDetails[i].stream_id+'"  id="liveChannel-'+i+'" index='+i+' count="'+liveSectionDetails.length+'" >'
     //                Text +='<div class="liveDetailsH1" dropdown-clickable-attr="true"><h1 dropdown-clickable-attr="true">'+liveSectionDetails[i].num+'</h1></div>'
     //                Text +='<div class="liveDetailsImg" dropdown-clickable-attr="true"><img dropdown-clickable-attr="true" src="'+liveSectionDetails[i].stream_icon+'" class="channellogo-img" onerror="this.src=\'images/logo.png\';" ></div>'
     //                Text +='<div class="liveDetailPlayImg" dropdown-clickable-attr="true"><i class="fa fa-play playShowImg" style="color: white;text-shadow: 0px 4px 9px rgba(0, 0, 0, 0.39);"></i></div>'
     
     //                Text +='<div class="liveDetailsName" dropdown-clickable-attr="true">'
     //                if(liveSectionDetails[i].name.length < 20 )
     //                     Text+= '<h1 dropdown-clickable-attr="true"><span dropdown-clickable-attr="true">'+liveSectionDetails[i].name+'</span></h1/></div>'
     //                else
     //                     Text+= '<h1 dropdown-clickable-attr="true"><span dropdown-clickable-attr="true" class="namescroll">'+liveSectionDetails[i].name+'</span></h1/></div>'
     
     
     // //                var items = JSON.parse(localStorage.getItem('favChannelsList'));
     
     //                 if(items!=null && jQuery.inArray(liveSectionDetails[i].stream_id, items) != -1) {
     //                      var found = true;
     //                      Text +='<div class="liveDetailPlayImg" dropdown-clickable-attr="true" style="float: right; ">    <i  source="favButton" class="fa fa-heart activefav liveFavHeart show" id="favStar_'+i+'" aria-hidden="true" ></i>     </div>'
     //                   }else{
     //                      var found = false;
     //                      Text +='<div class="liveDetailPlayImg" dropdown-clickable-attr="true" style="float: right; ">     <i  source="favButton" class="fa fa-heart activefav liveFavHeart hide" id="favStar_'+i+'" aria-hidden="true" ></i>    </div>'
     //                   }
     //                  Text +='<div class="dropdown-content" id="dropdown_id_'+i+'" style="margin-left: -130px;z-index:99;"><a href="#" id="play_link_'+i+'" onclick="playLink()" class="playLinkClass">Play</a>'
     
     //                  if(found) {
     //                        Text +='<a href="#" onclick="removeFromFavLink('+liveSectionDetails[i].stream_id+','+i+')" id="remove_from_fav_link_'+i+'" class="RemoveFromFavClass">Remove From Favourite</a>'
     //                    } else {
     //                        Text +='<a href="#" onclick="addToFavLink('+liveSectionDetails[i].stream_id+','+i+')" id="add_to_fav_link_'+i+'" class="addToFavClass">Add to Favourite</a>'
     //                    }
     
     //                  Text +='<a href="#" onclick="viewFullEPG('+liveSectionDetails[i].stream_id+','+i+');" id="full_epg_menu_link_'+i+'"  class="fullEPGMenuClass">View Full EPG</a>'
     //                  Text +='<a href="#" onclick="hideAddToFav();" id="close_menu_link_'+i+'" class="closeMenuClass">Close</a></div>'
     //                  Text +='</div>'
     
     // //               Text +='</div>'
     //           // }
     //      }
          Text +='</div>'
     
          Text +='<div class="liveDetailsName norecordfound" style="width: 100%;display:none;    position: absolute;top: 200;"><h1><span class="namescroll" style="text-align: center;">No Record Found</span></h1></div>'
     
          Text +='</div>'
      }

      return Text;

     
}

//Util.popupMenuLogin = function(){
//var Text ='';
//Text +='<div class="dropdown">'
//          Text +='<div class="dropdown-content">
//            Text +='<a href="#">Login</a>
//            Text +='<a href="#">Delete</a>
//          Text +='</div>
//        Text +='</div>';
//	return Text;
//}

Util.listUserPage = function(){
	var Text = '';
     Text += '<div class="mainHome">'
     Text +='<div class="container">'
      Text +='<div class="row">'
      Text +='<div class="mainHomeContent header-margin-top">'
	
			Text += '<div class="homeHeader">'
				Text +='<div class="row">';
					Text += '<div class="col-md-4"><img src="images/home-logo.png" class="logImg" /></div>';
	
					
					Text += '<div class="col-md-4"><h1 class="pagesTitle">LIST PLAYLIST</h1></div>'
					Text += '<div class="col-md-4"><div class="floatRight" ><img src="images/add_more_user.png"  source="addUser" class="addUserIcon"/><b id="addUserBtn">ADD PLAYLIST</b></div></div>'
				Text +='</div>';
			Text +='</div>';
	
			Text += '<div class="scrollBarClass" style="    height: 70%;    margin-top: 20px;overflow: overlay;">'
				Text +='<div>';
                    var listData = JSON.parse(localStorage.getItem('listData'));
                    var listDataM3U = JSON.parse(localStorage.getItem('listDataM3U'));
                    // console.log(listData);
                          
                         //     listData.reverse(); 
                         //    console.log(aa);
                         var profile = JSON.parse(localStorage.getItem('profile'));
					 

                         var firstList = false;
                         var secondList =false;
                         try{
                              if(listData.length>0){
                                   firstList = true; 
                              }else{
                                   firstList = false;
                              }
                         }catch(e){
                              firstList = false;
                         }
                         

                         try{
                              if(listDataM3U.length>0){
                                   secondList = true; 
                              }else{
                                   secondList = false;
                              }
                         }catch(e){
                              secondList = false;
                         }


                         if(!firstList && !secondList){
						Text +='<div id="listCenterButton"  class="listCenterButton imageFocus"><img src="images/add_more_user.png" class="addUserIcon2" /><b id="addUserButton">ADD NEW PLAYLIST</b></div>';
                         }else{

                              if(firstList){
                                   if(listData.length>0){
                                        for(var i=0;i<listData.length;i++){
                                             // console.log(listData[i].user_info);
               
                                                  // if(i == 0){
                                                  //      Text +='<div style="float: left;width: 50%;" class="dropdownBox"><div class="listBlock dropdown"><div index='+i+' source="listSessions" class="listIcons imageFocus" id="listIcons-'+i+'" count='+listData.length+'><div class="listImg"><img src="images/user-icon.png" ></div><div class="listTitles"><h1>'+listData[i].user_info.name+'</h1><p>Username : '+listData[i].user_info.username+'</p><p>URL : '+listData[i].user_info.login_url+'</p></div></div>'
                                                  //      Text +='<div class="dropdown-content" id="dropdown_id_'+i+'" style="float: right;position: inherit;"><a href="#" id="login_link_'+i+'" onclick="loginLink()">Login</a><a href="#" onclick="deleteLink('+i+')" id="delete_link_'+i+'">Delete</a></div></div></div>'
                                                  // }else{
                                                       Text +='<div style="float: left;width: 50%;" class="dropdownBox"><div class="listBlock dropdown"><div index='+i+' loginType="api" source="listSessions"  class="listIcons"   id="listIcons-'+i+'"  count='+listData.length+'><div class="listImg"><img src="images/user-icon.png" ></div><div class="listTitles"><h1>'+listData[i].user_info.name+'</h1><p>Username : '+listData[i].user_info.username+'</p></div></div>'
                                                       Text +='<div class="dropdown-content" id="dropdown_id_'+i+'" style="float: right;position: inherit;"><a href="#" onclick="loginLink(\'api\')" id="login_link_'+i+'">Login</a><a href="#" onclick="deleteLink('+i+',\'api\')" id="delete_link_'+i+'">Delete</a></div></div></div>'
                                                  // }
                                             }
                                   }
                              }
                              

                              if(secondList){
                                   if(listDataM3U.length>0){
                                        for(var i=0;i<listDataM3U.length;i++){
                                             // console.log(listData[i].user_info);
               
                                                  // if(i == 0){
                                                  //      Text +='<div style="float: left;width: 50%;" class="dropdownBox"><div class="listBlock dropdown"><div index='+i+' source="listSessions" class="listIcons imageFocus" id="listIconsM3U-'+i+'" count='+listDataM3U.length+'><div class="listImg"><img src="images/user-icon.png" ></div><div class="listTitles"><h1>'+listDataM3U[i].playlistname+'</h1><p>URL : '+listDataM3U[i].m3uLine+'</p></div></div>'
                                                  //      Text +='<div class="dropdown-content" id="dropdown_id_'+i+'" style="float: right;position: inherit;"><a href="#" id="login_link_'+i+'" onclick="loginLink()">Login</a><a href="#" onclick="deleteLink('+i+')" id="delete_link_'+i+'">Delete</a></div></div></div>'
                                                  // }else{
                                                       Text +='<div style="float: left;width: 50%;" class="dropdownBox"><div class="listBlock dropdown"><div index='+i+' loginType="m3u" source="listSessions"  class="listIcons"   id="listIconsM3U-'+i+'"  count='+listDataM3U.length+'><div class="listImg"><img src="images/playlist-icon.png" ></div><div class="listTitles"><h1>'+listDataM3U[i].playlistname+'</h1>'
                                                       if(listDataM3U[i].m3uType == "url"){
                                                            Text +='<p>URL : '+listDataM3U[i].m3uLine+'</p>';
                                                       }else if(listDataM3U[i].m3uType == "file"){
                                                            Text +='<p>File : '+listDataM3U[i].m3uLine+'</p>';
                                                       }
                                                       Text +='</div></div>'
                                                       Text +='<div class="dropdown-content" id="dropdown_id_'+i+'" style="float: right;position: inherit;"><a href="#" onclick="loginLink(\'m3u\')" id="login_link_'+i+'">Login</a><a href="#" onclick="deleteLink('+i+',\'m3u\')" id="delete_link_'+i+'">Delete</a></div></div></div>'
                                                  // }
                                             }
                                   }
                              }
                              
                         }
                         

                         




			
				/* 	Text +='<div class="col-md-2"><div id="homeLiveTile" class="homeLiveTile imageFocus"><div class="wrapCenter"><img src="images/live-tv-icon.png"><p>LIVE TV</p></div></div></div>';
					Text +='<div class="col-md-4"><div  id="moviesTile" class="moviesTile"><div class="wrapLeft"><img src="images/movie-icon.png"><p>MOVIES</p></div></div></div>';
					Text +='<div class="col-md-4"><div  id="seriesTile" class="seriesTile"><div class="wrapLeft"><img src="images/series-icon.png"><p>SERIES</p></div></div></div>';
				 */
				Text +='</div>';
			Text +='</div>';
	
			Text += '<div class="homeBottom">'
				
			Text +='</div>';
	
	
	
		Text +='</div></div></div></div></div>';
	
	return Text;
}



function dateUtilNew(date){
	var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
	"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
   ];
	var date = new Date(date);
	
	var year = date.getFullYear();
	var month = date.getMonth();
	var day = date.getDate();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();

	return day+" "+monthNames[month] + " " + year;
}

function dateUtil(epocTime){
	var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
	"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
   ];
	var date = new Date(parseInt(epocTime));
	
	var year = date.getFullYear();
	var month = date.getMonth();
	var day = date.getDate();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();

	return day+" "+monthNames[month] + ", " + year;
}



Util.playerBody = function(){
	var Text = '';
	
		Text +='<div id="PlayBackImage" style="display:none">'
		/* var image = 'https://d3lyihdno7nd8k.cloudfront.net/image/livebg.jpg';
		
		//image = selectedMovie.backgroundImage;
		Text +='<div id="playerBackImg" style="background:url('+image+') no-repeat;background-size: 100% 100%;background-repeat:no-repeat;height:100%;" ></div> '
		Text += '<img src="images/TV_Loader.png" class="imgLoaderForMovies">'
		Text +='<div class="liveGradient"></div>' */
		
		
		Text += '</div>'
		
		
		Text +='<div class="playerDivision">'
			
	
			Text +='<div class="player-content">'
			Text +='<div class="container">'
				Text +='<p></p>'
			Text +='</div>'
			Text +='</div>'
				
			/* Text += '<div class="play-icon-wrap">'
		   
			Text +='<span class="play-icon" style="display:none" source="play-icon"><img src="images/play-icon.png"/></span>';
			 Text +='<div source="playerPrev" id="playerPrev"><div class="snapImage"><img src=""/></div></div>';
			Text +=	'<div source="playerNext" id="playerNext"><div class="snapImage"><img src=""/></div></div>';
			
			Text += '</div>'; */
			Text +='<div class="player-inner"></div>'
               Text +='<div class="flix-mov-title" id="flix-mov-title">'
               if(Player.data.stream_icon)
                    Text +='<div class="iconPlay"><img src="'+Player.data.stream_icon+'"  onerror="this.src=\'images/logo.png\';"></div>'
               else
                    Text +='<div class="iconPlay"><img src="'+Player.data.movie_image+'"  onerror="this.src=\'images/logo.png\';"></div>'

				Text +='<div class="playIconText">'+ Player.data.name
				+'</div>'
			Text +='</div>'
			


			Text +='<div class="playerBottomDiv">';
				Text +='<div class="flix-seekbar"  id="flix-seekbar" onmouseover=\'progressIconHandle(event, "over");\' onclick=\'progressIconHandle(event, "click");\' onmousedown=\'progressIconHandle(event, "down");\' onmouseout=\'progressIconHandle(event, "out");\'>'
				
						
				Text +='<div class="flix-seekbar-load" id="flix-seekbar-load"></div>'
				Text +='<div class="flix-seekbar-run" id="flix-seekbar-run"></div>'
				Text +='<a href="#" class="seek-picker" id="seek-picker" source="picker"></a>'
				Text +='<span class="seek-picker-runtime" id="seek-picker-runtime"></span>'
				Text += '</div><div id="playerLog" ></div>' 
			
				Text +='<span class="seek-picker-start" id="seek-picker-start">00:00:00</span>'
				Text +='<span class="seek-picker-end" id="seek-picker-end">00:00:00</span>'
				

				/* Text += '<div class="sub-title" source="subtitles">'
				Text += '<span><img src="images/subtitle.png"/></span>'
				Text += '<span>Sub title</span>'
				//Text += '<div class="listSubs"><b>English</b></div>';
				Text += '</div>' */	
			Text += '</div>'
			
		    Text +='</div>'
			Text +='</div>'
		Text +='</div>'
	  return Text;
}



Util.confirmPin = function(code,message,btnText){
var Text = '';
     Text += '<script> $(".overlay-screen").show();  </script>'
     Text += '<div class="info-msg-cont">'
     Text += "<div class='error epgRow' style='margin: 0px;'></div>"
     Text += '<div class="col-sm-12">'
     Text += '<div>'
     
     Text +='<div>'
          // Text +='<div class="form-group" style="    width: 100%;">'
          //      Text +=' <label for="pin"  class="epgRow" style="padding: 20px;    font-weight: bold;">Enter Pin</label>'
          //      Text += '<input type="password" class="form-control  pinSetting" source="pinSetting" max-length="10" style="margin-bottom: 30px;padding-top: 30px;padding-bottom: 30px;font-size: 24px;" id="pin" autofocus>'
          // Text +='</div>'
          Text += '<div style="    margin: 0 auto; width: 100%;float:left">'
          Text +='       <label for="pin"  class="epgRow" style="margin-left: 0px;padding-left: 0px;float: left;width: 100%;margin-top: 7px;text-align:center;">Enter Your Pin:</label>'
          Text +='       <div style="    float: left; width: 100%; margin-left: 15px;"><input type="password" id="pin"></div>'
          Text +='</div>'
     Text +='</div>'

     // Text += '<img src="'+image+'" class="img-responsive pop-err-ico" alt="">'
     Text += '</div>'
     Text += '</div>'
    /*  Text += '<p class="dis-block">'+message+'</p>' */
     Text += '<a href="#" class="popUpBtn popUpBtn-orange remove-margin listUserButton imageFocus" id="confirmPin" style="margin:0px;    margin-top: 50px;    float: inherit;">Confirm</a>'
     Text += '</div>'
     Text += '<script>$("#pin").pincodeInput({hideDigits:true,complete:function(value, e, errorElement){ }}); $("#pin").pincodeInput().data("plugin_pincodeInput").focus();</script>'

return Text;
}

Util.searchPopUp = function(type){
var Text = '';
var Text = '<script> $(".overlay-screen").show();</script>';
     // Text += '<div class="overlay-screen"></div>'
     Text += '<div class="info-msg-cont">'
     Text += "<div class='error epgRow' style='margin: 0px;'></div>"
     Text += '<div class="row remove-margin">'
     Text += '<div class="col-md-2 col-lg-2 col-xl-2"></div>'
     Text += '<div class="col-md-8 col-lg-8 col-xl-8">'

     Text +='<div class="row">'
          Text +='<div class="form-group" style="    width: 100%;">'
            if(type == "searchMovies"){
                if(pageType == "movies"){
                    Text +=' <label for="pin" class="epgRow" style="padding: 20px;    font-weight: bold;">Search Any Movie</label>'
                }else{
                    Text +=' <label for="pin" class="epgRow" style="padding: 20px;    font-weight: bold;">Search Any Series</label>'
                }

            }else if(type == "searchChannels"){
                Text +=' <label for="pin" class="epgRow" style="padding: 20px;    font-weight: bold;">Search Any Channel</label>'
            }else if(type == "searchLiveCategories"){
               Text +=' <label for="pin" class="epgRow" style="padding: 20px;    font-weight: bold;">Search Any Live Category</label>'
            }else if(type == "searchMoviesCategories"){
               Text +=' <label for="pin" class="epgRow" style="padding: 20px;    font-weight: bold;">Search Any Movie Category</label>'
            }else if(type == "searchSeriesCategories"){
               Text +=' <label for="pin" class="epgRow" style="padding: 20px;    font-weight: bold;">Search Any Series Category</label>'
            }else if(type == "searchCatchupCategories"){
               Text +=' <label for="pin" class="epgRow" style="padding: 20px;    font-weight: bold;">Search Any Catchup Category</label>'
            }
               Text += '<input type="text" class="form-control  pinSetting" source="pinSetting" max-length="10" style="margin-bottom: 30px;    padding-top: 30px;padding-bottom: 30px;font-size: 24px;" id="searchedText" autofocus>'
          Text +='</div>'
     Text +='</div>'

     // Text += '<img src="'+image+'" class="img-responsive pop-err-ico" alt="">'
     Text += '</div>'
     Text += '<div class="col-md-2 col-lg-2 col-xl-2"></div>'
     Text += '</div>'
    /*  Text += '<p class="dis-block">'+message+'</p>' */
     Text += '<a href="#" class="orange-button" id="searchButton" sourceType="'+type+'" source="searchButton" style="margin:0px;    display: none;">Search</a>'
     Text += '<a href="#" class="orange-button" id="cancelButtonSearch" source="cancelButtonSearch" style="margin:0px;margin-left: 20px;">CLOSE</a>'

     Text += '</div>'

return Text;
}

Util.sortPopUp = function(type){
var Text = '<script> $(".overlay-screen").show();</script>';
     // Text += '<div class="overlay-screen"></div>'
     Text += '<div class="info-msg-cont">'
     Text += "<div class='error epgRow' style='margin: 0px;'></div>"
     Text += '<div class="row remove-margin">'
     Text += '<div class="col-md-12 col-lg-12 col-xl-12">'

     Text +='<div class="row">'
          Text +='<div class="form-group">'
            if(type == "sortMovies"){
                if(pageType == "movies"){
                    var sortingType = localStorage.getItem('moviesSorting');
                 }else{
                    var sortingType = localStorage.getItem('seriesSorting');
                 }

            }else if(type == "sortChannels"){
                  var sortingType = localStorage.getItem('liveSorting');
            }
                Text +=' <label for="pin" class="epgRow" style="padding: 20px;    font-weight: bold;">Sort According to:-</label>'

               if(sortingType=="" || sortingType == null){
                      sortingType = "default";
                 }
               Text += '<div class="row accountData" style="text-align: left;padding-top:0px;padding-bottom:0px;">'
                   if(sortingType == "default"){
                        Text += '<label class="containerBtn imageFocus" index="0" id="containerBtn-0" source="inputButtons"> Default<input type="radio" name="radio" value="default" checked> <span class="checkmark"></span></label>'
                   }else{
                        Text += '<label class="containerBtn" index="0" id="containerBtn-0" source="inputButtons"> Default<input type="radio" name="radio" value="default"> <span class="checkmark"></span></label>'
                   }

                   if(sortingType == "atoz"){
                        Text += '<label class="containerBtn imageFocus" index="1" id="containerBtn-1" source="inputButtons"> A-Z<input type="radio" checked  name="radio" value="atoz"> <span class="checkmark"></span></label>'
                   }else{
                        Text += '<label class="containerBtn" index="1" id="containerBtn-1" source="inputButtons"> A-Z<input type="radio"   name="radio" value="atoz"> <span class="checkmark"></span></label>'
                   }

                   if(sortingType == "ztoa"){
                        Text += '<label class="containerBtn imageFocus" index="2" id="containerBtn-2" source="inputButtons"> Z-A<input type="radio" checked  name="radio" value="ztoa"> <span class="checkmark"></span></label>'
                   }else{
                        Text += '<label class="containerBtn" index="2" id="containerBtn-2" source="inputButtons"> Z-A<input type="radio"  name="radio" value="ztoa"> <span class="checkmark"></span></label>'
                   }

                   if(sortingType == "topadded"){
                        Text += '<label class="containerBtn imageFocus" index="3" id="containerBtn-3" source="inputButtons"> Top Added<input type="radio" checked   name="radio" value="topadded"> <span class="checkmark"></span></label>'
                   }else{
                        Text += '<label class="containerBtn" index="3" id="containerBtn-3" source="inputButtons"> Top Added<input type="radio"   name="radio" value="topadded"> <span class="checkmark"></span></label>'
                   }

                   if(type == "sortChannels"){

                       if(sortingType == "channelnum_asc"){
                            Text += '<label class="containerBtn imageFocus" index="4" id="containerBtn-4" source="inputButtons"> Channel Number ASC<input type="radio" checked  name="radio" value="channelnum_asc"> <span class="checkmark"></span></label>'
                       }else{
                            Text += '<label class="containerBtn" index="4" id="containerBtn-4" source="inputButtons"> Channel Number ASC<input type="radio"   name="radio" value="channelnum_asc"> <span class="checkmark"></span></label>'
                       }

                       if(sortingType == "channelnum_desc"){
                            Text += '<label class="containerBtn imageFocus" index="5" id="containerBtn-5" source="inputButtons"> Channel Number DESC<input type="radio" checked   name="radio" value="channelnum_desc"> <span class="checkmark"></span></label>'
                       }else{
                            Text += '<label class="containerBtn" index="5" id="containerBtn-5" source="inputButtons"> Channel Number DESC<input type="radio"   name="radio" value="channelnum_desc"> <span class="checkmark"></span></label>'
                       }

                   }
                   if(pageType == "series" || pageType == "movies"){
                     if(sortingType == "toprated"){
                          Text += '<label class="containerBtn imageFocus" index="4" id="containerBtn-4" source="inputButtons"> Top Rated<input type="radio" checked   name="radio" value="toprated"> <span class="checkmark"></span></label>'
                     }else{
                          Text += '<label class="containerBtn" index="4" id="containerBtn-4" source="inputButtons"> Top Rated<input type="radio"   name="radio" value="toprated"> <span class="checkmark"></span></label>'
                     }
                   }

               Text += '</div>'

          Text +='</div>'
     Text +='</div>'

     // Text += '<img src="'+image+'" class="img-responsive pop-err-ico" alt="">'
     Text += '</div>'
     Text += '<div class="col-md-2 col-lg-2 col-xl-2"></div>'
     Text += '</div>'
    /*  Text += '<p class="dis-block">'+message+'</p>' */
     Text += '<a href="#" class="orange-button" id="sortButton" source="sortButton" style="margin:0px">Sort</a>'
     Text += '<a href="#" class="orange-button" id="cancelButtonSort" source="cancelButtonSort" style="margin:0px;margin-left: 20px;">Cancel</a>'
     Text += '</div>'

return Text;
}



Util.showStatusPopUp = function(code,message,btnText){
    var Text = '';
    Text += '<script> $(".overlay-screen").show();</script>'
    Text += '<div class="info-msg-cont">'
    Text += '<div class="row remove-margin">'
    Text += '<div class="col-md-4 col-lg-4 col-xl-4"></div>'
    Text += '<div class="col-md-4 col-lg-4 col-xl-4">'
    var image = 'https://d20w296omhlpzq.cloudfront.net/devices/common/shape-5@3x.png';
    if(code == 0)
        image = 'images/error.png';
    else if(code ==1)
        image = 'images/success.png';
    else
        image = 'images/info.png';
    
   // Text += '<img src="'+image+'" class="img-responsive pop-err-ico" alt="">'
    Text += '</div>'
    Text += '<div class="col-md-4 col-lg-4 col-xl-4"></div>'
    Text += '</div>'
    Text += '<p class="dis-block">'+message+'</p>'
    Text += '<a href="#" class="orange-button" style="margin:0px">'+btnText+'</a>'
    Text += '</div>'

    return Text;
}

Util.showPopUp1 = function(no,title,desc,info1,info2){
    var Text = '';
    Text += '<div class="">'
    Text += '<div class="overlay-screen">'
    Text += '</div>'
    Text += '<div class="popup-Message-container popup-lg">'
	Text += '<h4 class="popUpSubhead">'+title+'</h4>'
	Text += '<h4 class="sumHead"></h4>'
    Text += '<div class="readmoreText " >'+desc
    Text += '</div>'
    Text +=   '<div class="col-md-12 col-lg-12 col-xl-12 remove-padding mt30">'
    if(no == 2){
        
        Text +=     '<a id="Btn-0" class="popUpBtn popUpBtn-orange remove-margin" index="0"> << '+info1+'</a>'
        Text +=     '<a id="Btn-1" class="popUpBtn  ml30 popUpBtn-red  remove-margin" index="1">'+info2+'</a>'
        
    }
    else if(no == 1){
            Text +=     '<a id="Btn-0" index = "0" class="popUpBtn-orange btn btn-default popUpBtn remove-margin" style="margin-left: -2%;"> '+info1+'</a>'
    }
    else {
        
    }
    Text +=   '</div>  '
    Text +=   ''
    Text += '</div>'
    Text += ''
    Text += '</div>'
return Text;
}
Util.showPopUp1 = function(no,title,desc,info1,info2){
    var Text = '';
    Text += '<div class="">'
    Text += '<div class="overlay-screen">'
    Text += '</div>'
    Text += '<div class="popup-Message-container popup-lg">'
	Text += '<h4 class="popUpSubhead">'+title+'</h4>'
	Text += '<h4 class="sumHead"></h4>'
    Text += '<div class="readmoreText " >'+desc
    Text += '</div>'
    Text +=   '<div class="col-md-12 col-lg-12 col-xl-12 remove-padding mt30">'
    if(no == 2){
        
        Text +=     '<a id="Btn-0" class="popUpBtn popUpBtn-orange remove-margin" index="0"> << '+info1+'</a>'
        Text +=     '<a id="Btn-1" class="popUpBtn  ml30  popUpBtn-red remove-margin" index="1">'+info2+'</a>'
        
    }
    else if(no == 1){
            Text +=     '<a id="Btn-0" index = "0" class="popUpBtn-orange btn btn-default popUpBtn remove-margin" style="margin-left: -2%;"> '+info1+'</a>'
    }
    else {
        
    }
    Text +=   '</div>  '
    Text +=   ''
    Text += '</div>'
    Text += ''
    Text += '</div>'
return Text;
}


Util.showMenuPopUp = function(seasonNo,list,name){
    var Text = '';
    Text += '<script> $(".overlay-screen").show();</script>'
    Text += '<div class="info-msg-cont" style="    padding: 20px 50px 50px 50px;">'
    Text += '<img src="images/close.png" class="closeModal" id="closeModal" style=" position: absolute; right: -25px;  top: -25px;background: rgba(60, 52, 52, 0.8);border-radius: 100%;    width: 50px;cursor: pointer;">'
    Text += '<div class="row remove-margin">'
	Text += '<div class="col-md-12 col-lg-12 col-xl-12" style="font-size: 34px; border-bottom: 1px solid white; margin-bottom: 30px; padding-bottom: 15px;">Seasons</div>'
	var count = Object.keys(list).length;
	for(var i=0;i<count;i++){
		if(Object.keys(seriesPage.episodes)[i] == (seasonNo))
			Text += '<a index='+i+' count='+count+' id="ssList-'+i+'" class="btn btn-default btn-block btnCust imageFocus" >'+name+" - "+Object.keys(seriesPage.episodes)[i]+'</a>'		
		else{
			if((count - 12) > 0 && i < (count - 12))
				 Text += '<a index='+i+' count='+count+' style="display:none" id="ssList-'+i+'" class="btn btn-default btn-block btnCust" >'+name+" - "+Object.keys(seriesPage.episodes)[i]+'</a>'
			else
				Text += '<a index='+i+' count='+count+' id="ssList-'+i+'" class="btn btn-default btn-block btnCust" >'+name+" - "+ Object.keys(seriesPage.episodes)[i]+'</a>'			
		}
		
	}
	 Text += '<div class="col-md-4 col-lg-4 col-xl-4"></div>'
    Text += '</div>'
    Text += '</div>'

    return Text;
}

Util.TermsPopUp = function(no,title,desc,info1,info2){
     var Text = '';
     Text += '<div class="">'
     Text += '<div class="overlay-screen">'
     Text += '</div>'
     Text += '<div class="Termspopup-Message-container popup-lg">'
     
     Text += '<div class="descData" >'
     Text += '<h4 class="popup-subhead" style="color:black">'+title+'</h4>'
     Text += '<p>'+desc + '</p>';
     Text += '</div>'
     Text +=   '<div class="col-md-12 col-lg-12 col-xl-12 remove-padding popup-btn-wrap mt30">'
     Text +=   '</div>  '
     Text +=   ''
     Text += '</div>'
     Text += ''
     Text +=     '<a id="acceptBtn" index = "0" class="popUpBtn-orange termsBtn  remove-margin" style="bottom: 0px;text-align: center;z-index: 200;color: #FFF;background-color: #2196F3;max-width: 1200px;min-width: 900px;width: auto;position: fixed;-webkit-transition: all 0.3s ease;padding: 20px;left: 50%;transform: translate(-50%, -50%);-webkit-transform: translate(-50%, -50%);margin-bottom: 0px;">'+info1+'</a>'
Text += '</div>'
 return Text;
 }

Util.showPopUp = function(no,title,desc,info1,info2){
    var Text = '';
    Text += '<script> $(".overlay-screen").show();</script>'
    Text += '<div class="">'
    Text += '<div class="overlay-screen">'
    Text += '</div>'
    Text += '<div class="popup-Message-container popup-lg">'
    Text += '<h4 class="popup-subhead">'+title+'</h4>'
    Text += '<p class="popup-p" >'+desc
    Text += '</p>'
    Text +=   '<div class="col-md-12 col-lg-12 col-xl-12 remove-padding popup-btn-wrap mt30">'
    if(no == 2){
        
        Text +=     '<a id="Btn-0" class="popUpBtn popUpBtn-orange remove-margin" index="0">'+info1+'</a>'
        Text +=     '<a id="Btn-1" class="popUpBtn  ml30  popUpBtn-red remove-margin" index="1">'+info2+'</a>'
        
    }
    else if(no == 1){
            Text +=     '<a id="Btn-0" index = "0" class="popUpBtn-orange popUpBtn remove-margin">'+info1+'</a>'
    }
    else {
          Text +=     '<a id="Btn-1" class="popUpBtn  ml30 popUpBtn-red remove-margin imageFocus" index="1">'+info2+'</a>'
    }
    Text +=   '</div>  '
    Text +=   ''
    Text += '</div>'
    Text += ''
    Text += '</div>'
return Text;
}

Util.parentalControlPopUp = function(){
     var Text = '';
     Text += '<script> $(".overlay-screen").show();</script>'
     Text += '<div class="">'
     Text += '<div class="overlay-screen">'
     Text += '</div>'
     Text += '<div class="popup-Message-container popup-lg">'
     Text += '<h4 class="popup-subhead">Parental Control</h4>' 

     Text += '<div class="row pinControl" style="padding-left: 50px;padding-right: 50px;padding-bottom: 30px;margin: 0px;">'
          Text += '<span class="epgRow" id="parental_msg" style="  text-align: center; float: left; background: red; margin-left: 0px;    margin-bottom: 30px;display:none"></span>'
          // Text += '<div class="form-group"> <label for="pin"  class="epgRow" style="margin-left: 0px;padding-left: 0px;">Enter Your Pin:</label><input type="password" class="form-control pinSetting" max-length="10" source="sourceAddPinField" id="pin"></div><div class="form-group"> <label for="cpin" class="epgRow" style="margin-left: 0px;padding-left: 0px;">Confirm Your Pin</label><input type="password" class="form-control pinSetting" max-length="10" source="sourceAddPinField" id="cpin"></div></div>'


     Text += '<div style="    margin: 0 auto; width: 100%;float:left">'
     Text +='       <label for="pin"  class="epgRow" style="margin-left: 0px;padding-left: 0px;float: left;width: 28%;margin-top: 7px;">Enter Your Pin:</label>'
     Text +='       <input type="password" id="pincode-input1">'
     Text +='</div>'

     Text += '<div style="    margin: 0 auto; width: 100%;float:left;    margin-top: 50px;">'
     Text +='       <label for="pin"  class="epgRow" style="margin-left: 0px;padding-left: 0px;float: left;width: 28%;margin-top: 7px;">Confirm Your Pin:</label>'
     Text +='       <input type="password" id="pincode-input2">'
     Text +='</div>'


     Text +=   '<div class="col-md-12 col-lg-12 col-xl-12 remove-padding popup-btn-wrap mt30" style="    margin-top: 60px;">'
     
         
     Text +=     '<a id="Btn-0" class="popUpBtn popUpBtn-orange remove-margin" index="0">Skip</a>'
     Text +=     '<a id="Btn-1" class="popUpBtn popUpBtn-red  ml30  remove-margin" index="1">Set</a>'
         
     
     Text +=   '</div>  '
     Text += '</div>'
     Text += '</div>'
 return Text;
 }

Util.showCastingDevices = function(){
     var Text = '';
     Text += '<script> $(".overlay-screen").show();</script>'
     Text += '<div class="">'
     Text += '<div class="overlay-screen">'
     Text += '</div>'
     Text += '<div class="popup-Message-container popup-lg">'

     Text += '<span class=""><p class="popup-p">Cast To:-</p></span>'
     Text += '<div class="castingDevicesBox">'
     try{
          if(newReceivers.length>0){
               var CastingIndex = 0;
               newReceivers.forEach(function (item) {
                    Text += '<div class="section castingDevices" onclick="castingDevices('+CastingIndex+',&quot;false&quot;);" castingIndex="'+CastingIndex+'"><div class="floatLeft"><img src="images/tv-shows.png"><p><span>'+item.friendlyName+'</span></p></div></div>'
                    // if(item.service_fullname!== undefined && item.friendlyName!==undefined && item.receiverType=="CAST"){
                    //      newReceivers[receiverkey] = item;
                    CastingIndex++;
                    // } 
                 });
          }
     }catch(err){

     }
     
     

     Text +='</div>'




      Text += '</div>'
     Text += ''
     Text += '</div>'
 return Text;
 }

 Util.loadFromM3U = function(){
     $('#routingPage').fadeOut();
     $('#m3uPage').fadeIn();
     localStorage.setItem("currentAPPType","m3u");
     currentAPPType = localStorage.getItem("currentAPPType");

     // alert(currentAPPType);
     

 }

 Util.loadFromAPI = function(){
     $('#routingPage').fadeOut();
     $('#xtreamPage').fadeIn(); 
     localStorage.setItem("currentAPPType","api");
     currentAPPType = localStorage.getItem("currentAPPType");
     // alert(currentAPPType);
     
 }
Util.signIn = function(){
 	var Text = "";
	Text += '<div class="login-page">'
     


	Text += '        <div class="login-container" id="routingPage">'
	Text += '            <div>'
 
     if(Main.routing == true){
          
          Text += '            <div class="login-html" style="width: 65%;top: 17%;">'
          Text += '                <div class="login-form">'
          Text += '                     <center><img src="images/logo.png" class="login-logo"></center>'
          Text += '                    <div class="login-header"></div>'
          Text += '                    <div class="login-content">'      
          Text += '                            <div class="btn-action">'
          Text += '                                <b type="submit" class="btn login-btn  accountBack listUserButton" source="listUsers" id="loadyourplaylist" onclick="Util.loadFromM3U();">Load Your Playlist Or File/URL</b>'
          Text += '                                <b type="submit" id="loginwithxtreamapi" source="loginForm" class="btn login-btn accoutnLogout addUserButton" onclick="Util.loadFromAPI();">PLAYER API</b>'
          Text += `<div style="text-align: center;"><button id="poppop" onclick="showModal()" style="margin-top: 20px;padding: 20px;">LOCAL AUDIO/VIDEO DATA</button></div>

          <style>
               .termspopup {
                    display: none;
                    /* Hidden by default */
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    /* Semi-transparent background */
                    justify-content: center;
                    align-items: center;
               }
          
               .terms-popup-content {
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 5px;
                    text-align: left;
                    width: 1200px;
                    /* Set fixed width */
                    height: initial;
                    /* Set fixed height */
                    max-width: 100%;
                    /* Make sure it adapts to smaller screens */
                    overflow: auto;
                    /* If content is too large */
                    font-family: sans-serif;
                    padding-left: 38px;
               }
          
               .accept-cancel-btns {
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    cursor: pointer;
                    font-size: 16px;
                    margin-top: 20px;
                    text-align: center;
                    /* Center text inside button */
                    display: inline-block;
               }
          
               .terms-h2 {
                    text-align: center !important;
                    /* Center the heading */
                    margin-bottom: 20px;
                    border-bottom: 2px solid lightgray;
                    padding-bottom: 23px;
               }
          
               .terms-h3 {
                    text-align: left !important;
                    font-size: 25px;
                    font-weight: 700;
               }
          
               .butons {
                    border-top: 2px solid lightgray !important;
               }
          
               #acceptBtn {
                    background-color: #0c6dfd !important;
                    border-radius: 5px !important;
               }
          
               #cancelBtn {
                    background-color: #6c757d !important;
                    border-radius: 5px !important;
               }
          </style>

          <!-- Terms and Conditions Popup -->
          <div id="terms-popup" class="termspopup">
               <div class="terms-popup-content">
                    <h2 class="terms-h2">YOU HEREBY AGREE TO TERMS HERE OTHERWISE DO NOT USE THE APP</h2>
                    <p>IPTV Smarters is an advanced player that uses M3U and JSON user-created playlists.</p>
                    <p>We do not provide any actual playlists or contents</p>
                    <p>This application is designed to use with the user’s own or created playlist with legal contents.</p>
                    <p>You are responsible to check your created playlists/contents are legal and you have full rights to use
                         and/or RECORD contents.</p>
                    <p>We are not responsible for misuse of copyright or third party contents using our software and please
                         check your</p>
                    <p>contents are legal and/or you have rights to use and/or RECORD.</p>
                    <p>By using our application means you accept the above terms and conditions</p>
                    <h3 class="terms-h3">Disclaimer</h3>
                    <p>IPTV Smarters does not provide or solicit any audiovisual content to the users.</p>
                    <p>IPTV Smarters has no affiliation with any third-party provider what so ever.</p>
                    <p>Users must provide their own contents.</p>
                    <p>We strictly do not endorse the streaming of copyright-protected material without permission of the
                         copyright holder.</p>
                    <div style=" text-align: center; " class="butons"><button class="accept-cancel-btns" id="acceptBtn">Accept</button>
                         <button class="accept-cancel-btns" id="cancelBtn">cancel</button>
                    </div>
               </div>
          </div>
          
          <script>
     $(document).ready(function(){
          var popup = document.getElementById("terms-popup");

          // Check if user has already accepted the terms
          if (!localStorage.getItem("termsAccepted")) {
               popup.style.display = "flex"; // Show the popup if not accepted
          } else {
               $("#backArrow").show(); // Show back arrow if terms were accepted previously
          }

          // When the "Accept" button is clicked
          document.getElementById("acceptBtn").onclick = function () {
               localStorage.setItem("termsAccepted", "true"); // Store acceptance in localStorage
               popup.style.display = "none"; // Hide the popup
               $("#backArrow").show(); // Show the back arrow
          };

          // When the "Cancel" button is clicked
          document.getElementById("cancelBtn").onclick = function () {
               popup.style.display = "none"; // Hide the popup
               $("#backArrow").show(); // Show the back arrow
          };
     });
</script>
          
          <!-- Modal -->
          <div id="myModal" class="modal">
              <div class="modal-content">
                  <h2>Coming Soon!</h2>
                  <p>Stay tuned for more updates.</p>
                  <!-- Close button -->
                  <button class="close-btn" onclick="closeModal()">Close</button>
              </div>
          </div>
          <style>
          #poppop {
               padding: 10px 20px;
               font-size: 16px;
               cursor: pointer;
               background-color: #007bff;
               color: white;
               border: none;
               border-radius: 5px;
               transition: background-color 0.3s ease;
           }
   
           #poppop:hover {
               background-color: #0056b3;
           }
           .modal {
               display: none; /* Hidden by default */
               position: fixed;
               top: 0;
               left: 0;
               width: 100%;
               height: 100%;
               background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
               z-index: 1000; /* Ensure it's on top */
               justify-content: center;
               align-items: center;
               transition: opacity 0.3s ease;
               text-align: center;
           }
   
           
           .modal-content {
               background-color: white;
               padding: 30px;
               border-radius: 8px;
               text-align: center;
               box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
               width: 300px;
               max-width: 90%;
           }
   
           h2 {
               margin-bottom: 20px;
               font-size: 24px;
               color: #333;
               font-weight: bold;
           }
   
           p {
               font-size: 16px;
               
           }
   
           
           .close-btn {
               display: inline-block;
               background-color: #dc3545;
               color: white;
               padding: 8px 16px;
               border-radius: 5px;
               cursor: pointer;
               font-size: 16px;
               margin-top: 20px;
               text-decoration: none;
               padding: 10px 20px;
               font-size: 16px;
               cursor: pointer;
               color: white;
               border: none;
               border-radius: 5px;
               transition: background-color 0.3s ease;
           }
   
           .close-btn:hover {
               background-color: #c82333;
           }
   
           
           .modal.show {
               display: flex !important;
               opacity: 1;
           }
           </style>
          <script>
        // Get the modal element
        var modal = document.getElementById("myModal");

        // Function to show the modal
        function showModal() {
            modal.classList.add("show");  // Add the class to show the modal with smooth transition
        }

        // Function to close the modal
        function closeModal() {
            modal.classList.remove("show");  // Remove the class to hide the modal
        }

        // Close the modal if the user clicks outside of it
        window.onclick = function(event) {
            if (event.target == modal) {
                closeModal();
            }
        }
        
    </script>`
    Text += '<div <span class="tosClass" style="text-align: center;margin-top: 20px;padding: 20px;color:white;font-size: 18px;white;">By using this application, you agree to the <a style="font-weight:bold;color: #007bff !important;text-decoration: underline !important;" href="javascript:" onclick="Util.createBrowserWindow();">Terms of Services</a></span></div>'
    // Text +='               <span class="tosClass" style="text-align: center;">By using this application, you agree to the <a href="javascript:" onclick="Util.createBrowserWindow();">Terms of Services.</a></span>'
          
          Text += '                     </div>'
          
          Text += '                   </div>'
          Text += '                </div>'
          Text += '              </div>'
     
          Text += '            </div>'
          
          //j asi div to bahr show krni aa eh wali line te eh wale nu uncomment krna hai 
          // Text += '<div <span class="tosClass"style="position: absolute; bottom: 76px; width: 100%; text-align: center; font-size: 21px; color: #fff;">By using this application, you agree to the <a style="font-weight:bold;color: #007bff !important;text-decoration: underline !important;" href="javascript:" onclick="Util.createBrowserWindow();">Terms of Services</a></span></div>'
          Text += '        </div>'

     }

     
     if(Main.routing == true){
          Text += '        <div class="login-container"   style="display:none;"  id="m3uPage">'
     }else{
          if(currentAPPType == "m3u"){
               Text += '        <div class="login-container"  id="m3uPage">'
          }else{
               Text += '        <div class="login-container"   style="display:none;"  id="m3uPage">'
          }
     }
	Text += '            <div>'
 

	Text += '            <div class="login-html">'
	

     Text += '                <div class="login-form">'
     Text += '                     <center><img src="images/logo.png" class="login-logo"></center>'
     Text += '                     <span class="epgRow" id="login_error_msg_m3u" style="text-align: center;float: left;background: #d21111;margin-left: 0px;margin-top: 25px;    border-radius: 8px;display:none;"></span>'
	Text += '                    <div class="login-header">Enter Your Playlist Details</div>'
	Text += '                    <div class="login-content">'    
     

	Text += '                            <div class="form-group">'
	Text += '                                <input type="text" placeholder="Playlist Name" id="playlistname" value="" source="loginForm" class="form-control signin imageFocus"/>'
     Text += '                            </div>'

     Text += '                     <div class="form-group radioButtonDivLogin">'
     Text += '                          <label for="filetypeLabel"> <input type="radio" id="filetypeLabel" name="fileM3U" class="fileTypeRadioButton" checked><span class="fileTypeSpan">File Type</span></label>'
     Text += '                          <label for="urltypeLabel">  <input type="radio" id="urltypeLabel" name="fileM3U" class="urlTypeRadioButton"> <span class="urlTypeSpan">URL Type</span> </label>'
     Text += '                     </div>'

 

	Text += '                            <div class="form-group">'
     Text += '                                    <b type="submit" class="btn login-btn  accountBack listUserButton imageFocus" source="listUsers" id="browseBtn" style="background: rgba(0, 0, 0, 0.24)!important;">BROWSE</b>'
     Text += '                                    <span id="browsedPath" style="display:none"></span>'
     Text += '                                    <input type="text" placeholder="Input M3U Line" id="m3uLineInput" value="" source="loginForm" style="display:none;"   class="form-control signin"/>'
     Text += '                            </div>'



	Text += '                            <div class="btn-action">'
	Text += '                                <b type="submit" class="btn login-btn  accountBack listUserButton" source="listUsers" id="listUsersBtn" >LIST PLAYLIST</b>'
     Text += '                                <b type="submit" id="loginFromM3U" source="loginForm" class="btn login-btn accoutnLogout addUserButton">ADD PLAYLIST</b>'
	Text += '                            </div>'
	Text += '                    </div>'
	Text += '                </div>'

	Text += '            </div>'

	Text += '            </div>'
     Text += '        </div>'


     


     if(Main.routing == true){
          Text += '        <div class="login-container" style="display:none;" id="xtreamPage">'
     }else{
          if(currentAPPType == "m3u"){
               Text += '        <div class="login-container" style="display:none;" id="xtreamPage">'
          }else{
               Text += '        <div class="login-container" id="xtreamPage">'
          }
     }
	Text += '            <div>'
 

	Text += '            <div class="login-html">'
	

     Text += '                <div class="login-form">'
     Text += '                     <center><img src="images/logo.png" class="login-logo"></center>'
     Text += '                     <span class="epgRow" id="login_error_msg" style="text-align: center;float: left;background: #d21111;margin-left: 0px;margin-top: 25px;    border-radius: 8px;display:none;"></span>'
	Text += '                    <div class="login-header">Enter Your Login Details</div>'
	Text += '                    <div class="login-content">'
     Text += '                        <form id="loginForm">'
     
     Text += '<input name="m" value="gu" type="hidden">'
     Text += '<input name="sc" id="scText" value="" type="hidden">'
     Text += '<input name="dt" value="unknown" type="hidden">'
     Text += '<input name="av" value="1.6.9" type="hidden">'
     Text += '<input name="do" value="8.1.0 O" type="hidden">'
     Text += '<input name="d" value="Google Andriod SDK built for x86" type="hidden">'
     Text += '<input name="r" value="'+getRandomArbitrary(10000,8388600)+'" type="hidden">'
    
     

	Text += '                            <div class="form-group">'
	Text += '                                <input type="text" placeholder="Any Name" id="name" value="" source="loginForm" class="form-control signin imageFocus"/>'
	Text += '                            </div>'
	Text += '                            <div class="form-group">'
	Text += '                                <input type="text" placeholder="Username" id="username" value="" name="u" source="loginForm" class="form-control signin"/>'
	Text += '                            </div>'

	Text += '                            <div class="form-group">'
	Text += '                                <input type="password" placeholder="Password" id="password" value="" source="loginForm" name="p"  class="form-control signin"/>'
	Text += '                            </div>'

	Text += '                            <div class="form-group">'
	Text += '                                <input type="text" placeholder="http://url_here.com:port" id="port" value="" source="loginForm" name="k" class="form-control signin"/>'
	Text += '                            </div>'

	Text += '                            <div class="btn-action">'
	Text += '                                <b type="submit" class="btn login-btn  accountBack listUserButton" source="listUsers" id="listUsersBtn" >LIST PLAYLIST</b>'
     Text += '                                <b type="submit" id="login" source="loginForm" class="btn login-btn accoutnLogout addUserButton">ADD PLAYLIST</b>'
	Text += '                            </div>'
	Text += '                        </form>'
	Text += '                    </div>'
	Text += '                </div>'

	Text += '            </div>'
     Text += '            <div style="position: absolute; bottom: 37px; width: 100%; text-align: center; font-size: 21px; color: #c0c0c0;">Get your playlist from your TV service provider</div>'
	Text += '            </div>'
     Text += '        </div>'








     
 
     



     
     Text += '    </div>'


     // Text += '    <script>'
     
     // Text += '$(function(){'
     //      Text += '     $(\'input[name="fileM3U"]\').click(function(){'
     //           Text += '       if ($(this).is(\':checked\')){'
     //           Text += 'if($(this).attr("id") == "filetypeLabel"){'
     //                Text += '     $("#browseBtn").show();'
     //                Text += '     $("#m3uLineInput").hide();'
     //                Text += '}else if($(this).attr("id") == "urltypeLabel"){'
     //                     Text += '     $("#browseBtn").hide();'
     //                     Text += '     $("#m3uLineInput").show();'
     //                     Text += '}    ' 
     //                Text += '       }'
     //                Text += '     });'
     //                Text += '   });'
     // Text += '    </script>'


     Text += ' <script>'

     Text += '      $(function(){'
     Text += '           $(\'input[name="fileM3U"]\').click(function(){'
     Text += '                if ($(this).is(\':checked\')){'
     Text += '                     if($(this).attr("id") == "filetypeLabel"){'
     Text += '                          $("#browseBtn").show();'
     Text += '                          $("#browsedPath").show();'
     Text += '                          $("#m3uLineInput").hide();'
     Text += '                     }else if($(this).attr("id") == "urltypeLabel"){'
     Text += '                          $("#browseBtn").hide();'
     Text += '                          $("#browsedPath").hide();'
     Text += '                          $("#m3uLineInput").show();'
     Text += '                      }    ' 
     Text += '                }'
     Text += '           });'
     Text += '      });'
     Text += ' </script>'


 
	
	return Text;
}


Util.displayTime = function(){
  var Text = '';
  Text +='<div class="time_bar" id="timeBar" source ="timeBar">'
   //for(var x = 0;x<dates.length;x++){
      
      for(var y=0;y<timeArray.length;y++){
          Text +='<div class="time_period" ><span class="time_period" >'+timeArray[y]+'</span></div>'//id="timeArray_'+x+'_'+y+'"
      }
      //Text += '</div>'
  //}
  Text += '</div>'
    
   return Text;
}
String.prototype.replaceBetween = function(start, end, what) {
    return this.substring(0, start) + what + this.substring(end);
};

Util.displayDateFormat = function(epgSelectedDate){
	var date = epgSelectedDate;
	var dayName = date.toString().split(' ')[0];
	return dayName+','+ monthFullNames[date.getMonth()]+' '+date.getDate()+','+date.getFullYear();

}

 
Util.listMultiScreenChannelsPage = function(section){
	var Text = ''; 

 


Text +='<div class="blueBackgroundCenter" style="    width: 95%;margin: 0 auto;border: 2px solid white;">'
Text +='<div class="container">'
Text +='        <div class="row">'
Text +='            <div class="col-sm-12 header-margin-top"> '
Text +='                <div class="row">'
                     

Text +='                    <div class="col-md-4">'
Text +='                        <img src="images/home-logo.png" class="logImg">'
Text +='                      </div>'
Text +='                      <div class="col-md-4" style="display: flex;">'
if(currentAPPType == "m3u"){
     Text +='                        <span class="pagesTitle">LIVE TV, MOVIES & SERIES</span>'
}else{
     Text +='                        <span class="pagesTitle">LIVE TV CHANNELS</span>'
}
Text +='                      </div>'
Text +='                     <div class="col-md-4">'
                        
Text +='                      </div>'

Text +='                </div>'
Text +='            </div>'

Text +='    </div>'
Text +='    </div>'

Text +='            <div class="col-sm-12 scrollBarClass categoriesPadding" style="height: 83%;    overflow: auto;"> '
Text +='              <div class="row">'

Text +='            <div id="allMultiscreenChannelsDiv" style="    height: 100%;  width: 100%;"></div>'

// for(var i=0;i<section.length;i++){
//           Text +='  <div class="col-sm-6 categoriesSection"><div class="section" id="sectionCatchup-'+i+'"  categ="'+section[i].category_id+'" stream_icon="'+section[i].stream_icon+'" stream_id="'+section[i].stream_id+'" channel_name="'+section[i].name+'" count='+section.length+'  ><div class="floatLeft"><img src="'+section[i].stream_icon+'" style="width:86px;height:62px" onerror="this.src=\'images/logo.png\';" ><p><span>'+section[i].name+'</span></p></div></div></div> ' 
// }
 
Text +='           </div>'
          
Text +='          </div>';

  
	return Text;
}


Util.listCatchUpChannelsPage = function(section){
	var Text = ''; 

 


Text +='<div class="blueBackgroundCenter">'
Text +='<div class="container">'
Text +='        <div class="row">'
Text +='            <div class="col-sm-12 header-margin-top" > '
Text +='                <div class="row">'
                     

Text +='                    <div class="col-md-4">'
Text +='                        <img src="images/home-logo.png" class="logImg">'
Text +='                      </div>'
Text +='                      <div class="col-md-4" style="display: flex;">'
Text +='                        <span class="pagesTitle">CATCH UP CHANNELS</span>'
Text +='                      </div>'
Text +='                     <div class="col-md-4">'
                        
Text +='                      </div>'

Text +='                </div>'
Text +='            </div>'

Text +='    </div>'
Text +='    </div>'
Text +='            <div class="col-sm-12 scrollBarClass categoriesPadding" style="height: 83%;    overflow: auto;"> '
Text +='              <div class="row">'

Text +='            <div id="allCatchupChannelsDiv" style="    height: 100%;  width: 100%;"></div>'

// for(var i=0;i<section.length;i++){
//           Text +='  <div class="col-sm-6 categoriesSection"><div class="section" id="sectionCatchup-'+i+'"  categ="'+section[i].category_id+'"  stream_id="'+section[i].stream_id+'"  count='+section.length+'  ><div class="floatLeft"><img src="'+section[i].stream_icon+'" style="width:86px;height:62px" onerror="this.src=\'images/logo.png\';" ><p><span>'+section[i].name+'</span></p></div></div></div> ' 
// }
 
Text +='           </div>'
          
Text +='          </div>';

  
	return Text;
}


Util.listCatchUpProgramsPage = function(tabsHTML,tabsData){
	var Text = ''; 

 


Text +='<div class="blueBackgroundCenter" id="catchupContainer" style="    float: left;width: 100%;">'
Text +='<div class="container" >'
Text +='        <div class="row">'
Text +='            <div class="col-sm-12 header-margin-top" > '
Text +='                <div class="row">'
                     

Text +='                    <div class="col-md-4">'
Text +='                        <img src="images/home-logo.png" class="logImg">'
Text +='                      </div>'
Text +='                      <div class="col-md-4" style="display: flex;">'
Text +='                        <span class="pagesTitle">CATCH UP PROGRAMS</span>'
Text +='                      </div>'
Text +='                     <div class="col-md-4">'
                        
Text +='                      </div>'

Text +='                </div>'
Text +='            </div>'


Text +='            <div class="col-sm-12 scrollBarClass" style="height: 83%;    overflow: auto;"> '
Text +='              <div class="row">'

 
Text +='<div id="tab-container" aria-multiselectable="false" class="tabs-view">'
Text += tabsHTML
Text +='         <div id="panels">'
if(tabsData.length>0){
     Text += tabsData
}else{
     Text += '<div><center style="    font-size: 28px;margin-top: 200px;">No Archive Found!</center></div>'
}
Text +='         </div>'
Text +='       </div>'




 
Text +='           </div>'
          
Text +='          </div>'

Text +='    </div>'
Text +='    </div></div>'




Text +='<div id="HTML5Div"></div>'

 
	return Text;
}

// Util.listCatchUpProgramsPage = function(tabsHTML,tabsData){
// 	var Text = '';
// 	Text += '<div class="mainHome"><div class="mainHomeContent">'

// 			Text += '<div class="homeHeader">'
// 				Text +='<div class="row">';
// 					Text += '<div class="col-md-4"><img src="images/home-logo.png" class="logImg"/></div>';

//                     var type = "CATCH UP PROGRAMS";

// 					Text += '<div class="col-md-4"><h1 class="LiveH1">'+type+'</h1></div>'
//                          Text += '<div class="col-md-4"><div class="floatRight"></div></div>'
//                          //<img src="images/search-ico.png" class="bellIcon"/>
// 				Text +='</div>';
// 			Text +='</div>';
// 			Text += '<div class="homeBody">'
// 				Text +='<div class="row" style="margin-top: -60px;">';



//                 Text +='<div id="tab-container" aria-multiselectable="false" class="tabs-view">'
//                 Text += tabsHTML

//                 Text +='         <div id="panels">'

//                 Text += tabsData




//                 Text +='         </div>'
//                 Text +='       </div>'







// 				Text +='</div>';
// 			Text +='</div>';

// 			Text += '<div class="homeBottom">'

// 			Text +='</div>';



// 		Text +='</div></div>';

// 	return Text;
// }

Util.fullEPGPopUp = function(tdText,channelName){
	var Text = '';
	Text += '<div class="row accountElements">'
	            Text += '<div class="account-title">'+channelName+'</div>'
                Text += '<div class="row account-title-body">'
                Text += '<table class="fullEPGTable">'
                  Text += '<thead><tr>'
                    Text += '<th style="width: 15%;">START TIME</th>'
                    Text += '<th style="width: 15%;">END TIME</th>'
                    Text += '<th style="width: 20%;">TITLE</th>'
                    Text += '<th style="width: 50%;">DESCRIPTION</th>'
                  Text += '</tr></thead>'
                  Text += '<tbody>'

                  Text +=  tdText


                Text += '</tbody></table>'

                Text += '</div>'

	        Text +='</div>';

	return Text;
}

//Util.SearchModal = function(){
//	var Text = '';
//Text +='<div class="modal" tabindex="-1" role="dialog">'
//  Text +='<div class="modal-dialog" role="document">'
//    Text +='<div class="modal-content">'
//      Text +='<div class="modal-header">'
//        Text +='<h5 class="modal-title">Modal title</h5>'
//       Text +=' <button type="button" class="close" data-dismiss="modal" aria-label="Close">'
//         Text +=' <span aria-hidden="true">&times;</span>'
//       Text +=' </button>'
//     Text +=' </div>'
//     Text +=' <div class="modal-body">'
//      Text +='  <p>Modal body text goes here.</p>'
//     Text +=' </div>'
//      Text +='<div class="modal-footer">'
//        Text +='<button type="button" class="btn btn-primary">Save changes</button>'
//       Text +=' <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'
//      Text +='</div>'
//    Text +='</div>'
// Text +=' </div>'
//Text +='</div>'
//  	return Text;
//
//}



Util.maximumLimitReachedPopUp = function(type){
     var Text = '';
          Text += '<div class="overlay-screen" style="background: rgba(0, 0, 0, 0.87);opacity: 1;"></div>'
          Text += '<div class="info-msg-cont"><div class="row remove-margin"><div class="error"></div><div class="col-md-12 col-lg-12 col-xl-12"><div class="row"><div class="form-group"> <label for="pin" style="font-size: 25px;padding: 20px;">Unable to download data. Please try again later.</label></div></div></div></div><a href="#" class="orange-button imageFocus" style="margin:0px;margin-left: 20px;">Ok</a></div>';
          Text += '</div>'
     
     return Text;
     }