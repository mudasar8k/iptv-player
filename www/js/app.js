/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var tvKeyCode = {};
var scount = 0,mainCount = 0;
var vers = null;
var eventTimer = '';
var scrollEvent = true;
var airMouse = false;

var selectedMovie = '',view = '';

var app = {
    // Application Constructor
    initialize: function() {
    	 document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
		// this.onDeviceReady();

    },

    onDeviceReady: function() {
        this.receivedEvent('deviceready');
       
    },
    
    receivedEvent: function(id) {

        toast.inputdevice.getSupportedKeys(function (keys) {
	        for(var i=0, len=keys.length; i<len; i++) {
	            tvKeyCode[keys[i].name] = keys[i].code;
	           if(['MediaPlay', 'MediaPause', 'MediaFastForward', 'MediaRewind', 'MediaStop','MediaPlayPause'].indexOf(keys[i].name) >= 0) {
					toast.inputdevice.registerKey(keys[i].name,function () {});
				}
	        }
	    });
        var handleKeys = function (e) {
	        
	    	airMouse = false;
	    	var source = $(".imageFocus").attr("source");
	    	//console.log("source"+source);
			
			//e.preventDefault();
			
	        if(source && source == "list"){
	        	if(!scrollEvent){}
	            else{
	            	Main.processTrigger(e);
	            	scrollEvent = false;
	            	
	            	eventTimer = setTimeout(function(){
	            		scrollEvent = true;
	            		clearTimeout(eventTimer);
	                	eventTimer = '';
	            	},100);
	            }
	        }
	        else{
	        	console.log("Triggered");
	        	Main.processTrigger(e);
	        }
	    };
	    
        window.removeEventListener("keydown", handleKeys);
	    window.addEventListener('keydown', handleKeys);
		
	    function checkMain(){
	    	try{
	    		if(Main){
	    			Main.initialize();
	    			clearInterval(loadTimeInterval);
	    			loadTimeInterval = '';
	    		}
	    	}
	    	catch(e){
	    		clearInterval(loadTimeInterval);
    			loadTimeInterval = '';
	    		loadTimeInterval = setTimeout(checkMain,500);
	    	}
	    		
	    }
	    var loadTimeInterval = setTimeout(checkMain,500);
    
   
    }
};

$(document).ready(function(){ app.initialize(); });
