/*
Copyright 2015 Samsung Electronics Co., Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/* Cordova plugin TOAST version 1.3.0 (2019-05-09 16:36:55 GMT+0530) */
;(function() {
// jshint strict:false
var require = cordova.require,
    define = cordova.define;

// file: www/inputdevice.js
define('cordova-plugin-toast.inputdevice', function(require, exports, module) {

'use strict';

var argscheck = require('cordova/argscheck'),
    exec = require('cordova/exec');

var inputdeviceExport = {
    getSupportedKeys: function (callback, error) {
        argscheck.checkArgs('fF', 'inputdevice.getSupportedKeys', arguments);
        var args = [];
        error = error || function () {};
        exec(callback, error, 'toast.inputdevice', 'getSupportedKeys', args);
    },
    getKey: function (keyName, callback, error) {
        argscheck.checkArgs('sfF', 'inputdevice.getKey', arguments);
        var args = [keyName];
        error = error || function () {};
        exec(callback, error, 'toast.inputdevice', 'getKey', args);
    },
    registerKey: function (keyName, callback, error) {
        argscheck.checkArgs('sfF', 'inputdevice.registerKey', arguments);
        var args = [keyName];
        error = error || function () {};
        exec(callback, error, 'toast.inputdevice', 'registerKey', args);
    },
    unregisterKey: function (keyName, callback, error) {
        argscheck.checkArgs('sfF', 'inputdevice.unregisterKey', arguments);
        var args = [keyName];
        error = error || function () {};
        exec(callback, error, 'toast.inputdevice', 'unregisterKey', args);
    }
};

module.exports = inputdeviceExport;

});

// file: www/tvchannel.js
define('cordova-plugin-toast.tvchannel', function(require, exports, module) {

'use strict';

var tuneModeList = ['ALL', 'DIGITAL', 'ANALOG', 'FAVORITE'];

var argscheck = require('cordova/argscheck'),
    exec = require('cordova/exec');

var tvchannelExport = {
    tune: function (tuneOption, successCallback, errorCallback) {
        argscheck.checkArgs('ooF', 'tvchannel.tune', arguments);
        if(typeof tuneOption.major != 'number') {
            throw new TypeError('tuneOption is not a number.');
        }
        if(typeof tuneOption.minor != 'number') {
            throw new TypeError('tuneOption is not a number.');
        }
        if(!successCallback.onsuccess || typeof successCallback.onsuccess != 'function') {
            throw new TypeError('successCallback.onsuccess is not a function.');
        }
        if(!successCallback.onnosignal || typeof successCallback.onnosignal != 'function') {
            throw new TypeError('successCallback.onnosignal is not a function.');
        }
        if(!successCallback.onprograminforeceived || typeof successCallback.onprograminforeceived != 'function') {
            throw new TypeError('successCallback.onprograminforeceived is not a function.');
        }

        errorCallback = errorCallback || function () {};

        var args = [tuneOption];
        exec(successCallback, errorCallback, 'toast.tvchannel', 'tune', args);
    },
    tuneUp: function (successCallback, errorCallback, tuneMode) {
        argscheck.checkArgs('oFS', 'tvchannel.tuneUp', arguments);
        if(!successCallback.onsuccess || typeof successCallback.onsuccess != 'function') {
            throw new TypeError('successCallback.onsuccess is not a function.');
        }
        if(!successCallback.onnosignal || typeof successCallback.onnosignal != 'function') {
            throw new TypeError('successCallback.onnosignal is not a function.');
        }
        if(!successCallback.onprograminforeceived || typeof successCallback.onprograminforeceived != 'function') {
            throw new TypeError('successCallback.onprograminforeceived is not a function.');
        }

        errorCallback = errorCallback || function () {};
        tuneMode = tuneMode || 'ALL';

        var match = false;
        for (var i = 0; i < tuneModeList.length; i++) {
            if (tuneMode == tuneModeList[i]) {
                match = true;
                break;
            }
        }
        if (!match) {
            throw new RangeError('tuneMode is wrong.');
        }

        var args = [tuneMode];
        exec(successCallback, errorCallback, 'toast.tvchannel', 'tuneUp', args);
    },
    tuneDown: function (successCallback, errorCallback, tuneMode) {
        argscheck.checkArgs('oFS', 'tvchannel.tuneDown', arguments);
        if(!successCallback.onsuccess || typeof successCallback.onsuccess != 'function') {
            throw new TypeError('successCallback.onsuccess is not a function.');
        }
        if(!successCallback.onnosignal || typeof successCallback.onnosignal != 'function') {
            throw new TypeError('successCallback.onnosignal is not a function.');
        }
        if(!successCallback.onprograminforeceived || typeof successCallback.onprograminforeceived != 'function') {
            throw new TypeError('successCallback.onprograminforeceived is not a function.');
        }

        errorCallback = errorCallback || function () {};
        tuneMode = tuneMode || 'ALL';

        var match = false;
        for (var i = 0; i < tuneModeList.length; i++) {
            if (tuneMode == tuneModeList[i]) {
                match = true;
                break;
            }
        }
        if (!match) {
            throw new RangeError('tuneMode is wrong.');
        }

        var args = [tuneMode];
        exec(successCallback, errorCallback, 'toast.tvchannel', 'tuneDown', args);
    },
    findChannel: function (major, minor, successCallback, errorCallback) {
        argscheck.checkArgs('nnfF', 'tvchannel.findChannel', arguments);

        errorCallback = errorCallback || function () {};

        var args = [major, minor];
        exec(successCallback, errorCallback, 'toast.tvchannel', 'findChannel', args);
    },
    getChannelList: function (successCallback, errorCallback, tuneMode, nStart, number) {
        argscheck.checkArgs('fFSNN', 'tvchannel.getChannelList', arguments);

        errorCallback = errorCallback || function () {};
        tuneMode = tuneMode || 'ALL';
        nStart = nStart || 0;
        number = number || '';

        var match = false;
        for (var i = 0; i < tuneModeList.length; i++) {
            if (tuneMode == tuneModeList[i]) {
                match = true;
                break;
            }
        }
        if (!match) {
            throw new RangeError('tuneMode is wrong.');
        }
        if(nStart < 0) {
            throw new RangeError('nStart is a negative number.');
        }
        if(number < 0) {
            throw new RangeError('number is a negative number.');
        }

        var args = [tuneMode, nStart, number];
        exec(successCallback, errorCallback, 'toast.tvchannel', 'getChannelList', args);
    },
    getCurrentChannel: function (successCallback, errorCallback) {
        argscheck.checkArgs('fF', 'tvchannel.getCurrentChannel', arguments);

        errorCallback = errorCallback || function () {};

        var args = [];
        exec(successCallback, errorCallback, 'toast.tvchannel', 'getCurrentChannel', args);
    },
    getProgramList: function (channelInfo, startTime, successCallback, errorCallback, duration) {
        argscheck.checkArgs('odfFN', 'tvchannel.getProgramList', arguments);
        if(!channelInfo.major || typeof channelInfo.major != 'number') {
            throw new TypeError('channelInfo.major is not a number.');
        }
        if(!channelInfo.minor || typeof channelInfo.minor != 'number') {
            throw new TypeError('channelInfo.minor is not a number.');
        }

        errorCallback = errorCallback || function () {};
        duration = duration || '';

        if(duration < 0) {
            throw new RangeError('duration is a negative number.');
        }

        var args = [channelInfo, startTime, duration];
        exec(successCallback, errorCallback, 'toast.tvchannel', 'getProgramList', args);
    },
    getCurrentProgram: function (successCallback, errorCallback) {
        argscheck.checkArgs('fF', 'tvchannel.getCurrentProgram', arguments);

        errorCallback = errorCallback || function () {};

        var args = [];
        exec(successCallback, errorCallback, 'toast.tvchannel', 'getCurrentProgram', args);
    },
    addChannelChangeListener: function (callback) {
        argscheck.checkArgs('f', 'tvchannel.addChannelChangeListener', arguments);

        var args = [];
        exec(callback, null, 'toast.tvchannel', 'addChannelChangeListener', args);
    },
    removeChannelChangeListener: function (callback) {
        argscheck.checkArgs('F', 'tvchannel.removeChannelChangeListener', arguments);

        var args = [];
        exec(callback, null, 'toast.tvchannel', 'removeChannelChangeListener', args);
    }
};

module.exports = tvchannelExport;

});

// file: www/tvwindow.js
define('cordova-plugin-toast.tvwindow', function(require, exports, module) {

'use strict';

var videoSourceList = [
    'TV1',
    'AV1', 'AV2', 'AV3', 'AV4',
    'SVIDEO1', 'SVIDEO2', 'SVIDEO3', 'SVIDEO4',
    'COMP1', 'COMP2', 'COMP3', 'COMP4',
    'PC1', 'PC2', 'PC3', 'PC4',
    'HDMI1', 'HDMI2', 'HDMI3', 'HDMI4',
    'SCART1', 'SCART2', 'SCART3', 'SCART4',
    'DVI1', 'DVI2', 'DVI3', 'DVI4'
];

var argscheck = require('cordova/argscheck'),
    exec = require('cordova/exec');

var tvwindowExport = {
    setSource: function (videoSource, successCallback, errorCallback) {
        argscheck.checkArgs('ofF', 'tvwindow.setSource', arguments);
        if(!videoSource.type || typeof videoSource.type != 'string') {
            throw new TypeError('videoSource.type is not a string.');
        }
        if(!videoSource.number || typeof videoSource.number != 'number') {
            throw new TypeError('videoSource.number is not a number.');
        }
        var match = false;
        for (var i = 0; i < videoSourceList.length; i++) {
            if (videoSource.type + videoSource.number == videoSourceList[i]) {
                match = true;
                break;
            }
        }
        if (!match) {
            throw new TypeError('videoSource is wrong.');
        }

        errorCallback = errorCallback || function () {};

        var args = [videoSource];
        exec(successCallback, errorCallback, 'toast.tvwindow', 'setSource', args);
    },
    getSource: function (successCallback, errorCallback) {
        argscheck.checkArgs('fF', 'tvwindow.getSource', arguments);

        errorCallback = errorCallback || function () {};

        var args = [];
        exec(successCallback, errorCallback, 'toast.tvwindow', 'getSource', args);
    },
    show: function (rectangle, successCallback, errorCallback) {
        argscheck.checkArgs('afF', 'tvwindow.show', arguments);
        if(rectangle.length != 4) {
            throw new TypeError('rectangle.length is wrong.');
        }
        if(typeof rectangle[0] != 'number' || rectangle[0] < 0) {
            throw new TypeError('rectangle[0] is not a positive number.');
        }
        if(typeof rectangle[1] != 'number' || rectangle[1] < 0) {
            throw new TypeError('rectangle[1] is not a positive number.');
        }
        if(typeof rectangle[2] != 'number' || rectangle[2] < 0) {
            throw new TypeError('rectangle[2] is not a positive number.');
        }
        if(typeof rectangle[3] != 'number' || rectangle[3] < 0) {
            throw new TypeError('rectangle[3] is not a positive number.');
        }

        errorCallback = errorCallback || function () {};

        var args = [rectangle];
        exec(successCallback, errorCallback, 'toast.tvwindow', 'show', args);
    },
    hide: function (successCallback, errorCallback) {
        argscheck.checkArgs('fF', 'tvwindow.hide', arguments);

        errorCallback = errorCallback || function () {};

        var args = [];
        exec(successCallback, errorCallback, 'toast.tvwindow', 'hide', args);
    },
    getRect: function (successCallback, errorCallback) {
        argscheck.checkArgs('fF', 'tvwindow.getRect', arguments);

        errorCallback = errorCallback || function () {};

        var args = [];
        exec(successCallback, errorCallback, 'toast.tvwindow', 'getRect', args);
    }
};

module.exports = tvwindowExport;

});

// file: www/tvaudiocontrol.js
define('cordova-plugin-toast.tvaudiocontrol', function(require, exports, module) {


'use strict';

var argscheck = require('cordova/argscheck'),
    exec = require('cordova/exec');

var tvaudiocontrolExport = {
    setMute: function (mute, successCallback, errorCallback) {
        argscheck.checkArgs('*fF', 'tvaudiocontrol.setMute', arguments);
        errorCallback = errorCallback || function () {};

        if(typeof mute != 'boolean') {
            var error = new TypeError('First parameter needs to be boolean type.');
            throw error;
        }

        var args = [mute];
        exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'setMute', args);
    },
    isMute: function (successCallback, errorCallback) {
        argscheck.checkArgs('fF', 'tvaudiocontrol.isMute', arguments);
        errorCallback = errorCallback || function () {};

        var args = [];
        exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'isMute', args);
    },
    setVolume: function (volume, successCallback, errorCallback) {
        argscheck.checkArgs('nfF', 'tvaudiocontrol.setVolume', arguments);
        errorCallback = errorCallback || function () {};

        var args = [volume];
        exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'setVolume', args);
    },
    setVolumeUp: function (successCallback, errorCallback) {
        argscheck.checkArgs('fF', 'tvaudiocontrol.setVolumeUp', arguments);
        errorCallback = errorCallback || function () {};

        var args = [];
        exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'setVolumeUp', args);
    },
    setVolumeDown: function (successCallback, errorCallback) {
        argscheck.checkArgs('fF', 'tvaudiocontrol.setVolumeDown', arguments);
        errorCallback = errorCallback || function () {};

        var args = [];
        exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'setVolumeDown', args);
    },
    getVolume: function (successCallback, errorCallback) {
        argscheck.checkArgs('fF', 'tvaudiocontrol.getVolume', arguments);
        errorCallback = errorCallback || function () {};

        var args = [];
        exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'getVolume', args);
    },
    setVolumeChangeListener: function (callback, successCallback, errorCallback) {
        argscheck.checkArgs('ffF', 'tvaudiocontrol.setVolumeChangeListener', arguments);
        errorCallback = errorCallback || function () {};

        var args = [callback];
        exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'setVolumeChangeListener', args);
    },
    unsetVolumeChangeListener: function (successCallback, errorCallback) {
        argscheck.checkArgs('fF', 'tvaudiocontrol.unsetVolumeChangeListener', arguments);
        errorCallback = errorCallback || function () {};

        var args = [];
        exec(successCallback, errorCallback, 'toast.tvaudiocontrol', 'unsetVolumeChangeListener', args);
    }
};

module.exports = tvaudiocontrolExport;

});

// file: www/drminfo.js
define('cordova-plugin-toast.drminfo', function(require, exports, module) {


'use strict';

var argscheck = require('cordova/argscheck'),
    exec = require('cordova/exec');

var drminfoExport = {
    getEsn: function (compName, successCallback, errorCallback) {
        argscheck.checkArgs('sfF', 'drminfo.getEsn', arguments);
        errorCallback = errorCallback || function () {};

        var args = [compName];
        exec(successCallback, errorCallback, 'toast.drminfo', 'getEsn', args);
    },
    getSdi: function (successCallback, errorCallback) {
        argscheck.checkArgs('fF', 'drminfo.getSdiId', arguments);
        errorCallback = errorCallback || function () {};

        var args = [];
        exec(successCallback, errorCallback, 'toast.drminfo', 'getSdi', args);
    }
};

module.exports = drminfoExport;

});

// file: www/application.js
define('cordova-plugin-toast.application', function(require, exports, module) {
'use strict';

var argscheck = require('cordova/argscheck'),
    exec = require('cordova/exec');

module.exports = {
    exit: function () {
        exec(null, null, 'toast.application', 'exit', null);
    },
    launchApp: function (appInfo, successCallback, errorCallback) {
        argscheck.checkArgs('ofF', 'application.launchApp', arguments);
        if(!appInfo.appId || typeof appInfo.appId != 'string') {
            throw new TypeError('appControl.appId is not a string');
        }

        appInfo.data = appInfo.data || {};
        if(typeof appInfo.data != 'object') {
            throw new TypeError('appControl.data is not a object');
        }

        var args = [appInfo];
        exec(successCallback, errorCallback, 'toast.application', 'launchApp', args);
    },
    getRequestedAppInfo: function (successCallback, errorCallback) {
        argscheck.checkArgs('fF', 'application.getRequestedAppInfo', arguments);

        errorCallback = errorCallback || function () {};

        var args = [];
        exec(successCallback, errorCallback, 'toast.application', 'getRequestedAppInfo', args);
    }
};

});

// file: www/Media.js
define('cordova-plugin-toast.Media', function(require, exports, module) {


'use strict';

var argscheck = require('cordova/argscheck'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec');

var mediaObjects = null;

var Media = function () {
    if(!mediaObjects) {
        this.id = utils.createUUID();
        mediaObjects = {};
        mediaObjects[this.id] = this;
        this._mediaEventCallBack = {};
        this._containerElem = -1;
        this._duration = -1;
        this._position = 0;
        this._hooks = {};
        exec(null, null, 'toast.Media', 'create',[this.id]);
    }
    else {
        throw new RangeError('Media instance exists already. toast Media supported single instance');
    }
};

// Media EventType
Media.EVENT_STATE = 'STATE';
Media.EVENT_DURATION = 'DURATION';
Media.EVENT_POSITION = 'POSITION';
Media.EVENT_BUFFERINGPROGRESS = 'BUFFERINGPROGRESS';
Media.EVENT_SUBTITLE = 'SUBTITLE';
Media.EVENT_ENDED = 'ENDED';

//Media.MEDIA_SUBTITLE = 5;

// Media states
Media.STATE_IDLE = 'IDLE';
Media.STATE_PLAYING = 'PLAYING';
Media.STATE_PAUSED = 'PAUSED';
Media.STATE_STALLED = 'STALLED';
Media.STATE_SEEK = 'SEEK';

Media._MEDIA_CONTAINER = 'CONTAINER';
Media._MEDIA_ERROR = 'ERROR';

Media.mediaEvent = function(id, value) {
    var media = mediaObjects[id];
    if(media) {
        switch(value.type) {
        case Media.EVENT_STATE :
            if(media._mediaEventCallBack.onevent && value.data.oldState === null) {
                media._mediaEventCallBack.onevent(value);
            }
            else if(media._mediaEventCallBack.onevent && value.data.oldState !== value.data.state) {
                media._mediaEventCallBack.onevent(value);
            }
            break;
        case Media.EVENT_DURATION :
            media._duration = value.data.duration;
            media._mediaEventCallBack.onevent && media._mediaEventCallBack.onevent(value);
            break;
        case Media.EVENT_POSITION :
            media._position = Number(value.data.position);
            media._mediaEventCallBack.onevent && media._mediaEventCallBack.onevent(value);
            break;
        case Media.EVENT_BUFFERINGPROGRESS :
            media._mediaEventCallBack.onevent && media._mediaEventCallBack.onevent(value);
            break;
        case Media.EVENT_SUBTITLE :
            media._mediaEventCallBack.onevent && media._mediaEventCallBack.onevent(value);
            break;
        case Media.EVENT_ENDED :
            media.stop();
            media._mediaEventCallBack.onevent && media._mediaEventCallBack.onevent(value);
            break;
        case Media._MEDIA_CONTAINER :
            media._containerElem = value.data.containerElem;
            break;
        case Media._MEDIA_ERROR :
            media._mediaEventCallBack.onerror && media._mediaEventCallBack.onerror(value);
            break;
        default :
            console.log('Unhandled Media.mediaEvent :: ' + value.type);
            break;
        }
    }
    else {
        console.log('Received Media.onStatus callback for unknown media:: ' + id);
    }
};

Media.getInstance = function() {
    if(mediaObjects && typeof mediaObjects == 'object') {
        for(var key in mediaObjects) {
            if (mediaObjects.hasOwnProperty(key)) {
                return mediaObjects[key];
            }
        }
    }
    else {
        return new Media();
    }
};

Media.prototype.open = function(mediaUrl) {
    argscheck.checkArgs('s', 'Media.open', arguments);
    this.src = mediaUrl;
    invokeHooks('beforeopen', [this].concat(arguments));
    exec(null, null, 'toast.Media', 'open', [this.id,this.src]);
    invokeHooks('afteropen', [this].concat(arguments));
};

Media.prototype.getContainerElement = function() {
    return this._containerElem;
};

Media.prototype.play = function() {
    invokeHooks('beforeplay', [this].concat(arguments));
    exec(null, null, 'toast.Media', 'play', [this.id]);
    invokeHooks('afterplay', [this].concat(arguments));
};

Media.prototype.stop = function() {
    var me = this,
        media = mediaObjects[this.id];
    media.resetPlugin();
    exec(function() {
        me._position = 0;
        me._duration = -1;
    }, null, 'toast.Media', 'stop', [this.id]);
};

Media.prototype.seekTo = function(milliseconds) {
    argscheck.checkArgs('n', 'Media.seekTo', arguments);
    var me = this;
    exec(function(p) {
        me._position = p;
    }, null, 'toast.Media', 'seekTo', [this.id, milliseconds]);
};

Media.prototype.pause = function() {
    exec(null, null, 'toast.Media', 'pause', [this.id]);
};

Media.prototype.getDuration = function() {
    return this._duration;
};

Media.prototype.getCurrentPosition = function() {
    return this._position;
};

Media.prototype.setListener = function(listener) {
    argscheck.checkArgs('o', 'Media.setListener', arguments);
    if(arguments[0].onevent && typeof arguments[0].onevent !== 'function') {
        throw new TypeError('Type of listener.onevnet is not function');
    }
    if(arguments[0].onerror && typeof arguments[0].onerror !== 'function') {
        throw new TypeError('Type of listener.onerror is not function');
    }
    mediaObjects[this.id]._mediaEventCallBack = listener;
};

Media.prototype.unsetListener = function() {
    mediaObjects[this.id]._mediaEventCallBack = {};
};

Media.prototype.resetHook = function () {
    for(var hook in this._hooks) {
        if(this._hooks.hasOwnProperty(hook)) {
            for(var i=this._hooks[hook].length-1; i>=0; i--) {
                delete this._hooks[hook][i];
            }
            delete this._hooks[hook];
        }
    }
    this._hooks = {};
};
Media.prototype.registerHook = function (hook, fn) {
    this._hooks[hook] = this._hooks[hook] || [];
    this._hooks[hook].push(fn);
};
Media.prototype.unregisterHook = function (hook, fn) {
    if(!this._hooks[hook]) {
        return;
    }
    for(var i=this._hooks[hook].length-1; i>=0; i--) {
        if(this._hooks[hook][i] === fn) {
            this._hooks[hook].splice(i, 1);
        }
    }
};
Media.prototype.resetPlugin = function () {
    this.resetHook();
};
Media.prototype.attachPlugin = function (plugin) {
    if(plugin.onAttachToMedia) {
        plugin.onAttachToMedia(this);
    }
};

//synchronize VideoRect With Container Element
Media.prototype.syncVideoRect = function() {
    var me = this;
    exec(function(p) {
        me._position = p;
    }, null, 'toast.Media', 'syncVideoRect');
};

Media.prototype.setSubtitlePath = function(path) {
    argscheck.checkArgs('s', 'Media.setSubtitlePath', arguments);
    exec(null, null, 'toast.Media', 'setSubtitlePath',[this.id,path]);
};

Media.prototype.getSubtitleLanguageList = function(successCallback, errorCallback) {
    argscheck.checkArgs('fF', 'Media.getSubtitleLanguageList', arguments);
    errorCallback = errorCallback || function () {};
    exec(successCallback, errorCallback, 'toast.Media', 'getSubtitleLanguageList',[this.id]);
};

Media.prototype.setSubtitleLanguage = function(language) {
    argscheck.checkArgs('s', 'Media.setSubtitleLanguage', arguments);
    exec(null, null, 'toast.Media', 'setSubtitleLanguage',[this.id,language]);
};

Media.prototype.setSubtitleSync = function(milliseconds) {
    argscheck.checkArgs('n', 'Media.setSubtitleSync', arguments);
    exec(null, null, 'toast.Media', 'setSubtitleSync',[this.id,milliseconds]);
};

function invokeHooks (hook, args) {
    var media = args[0];
    args = args.slice(1);
    if(!media._hooks[hook]) {
        return;
    }
    for(var i=0; i<media._hooks[hook].length; i++) {
        media._hooks[hook][i](media, args);
    }
}

module.exports = Media;

});

// file: www/MediaPlugin.js
define('cordova-plugin-toast.MediaPlugin', function(require, exports, module) {


'use strict';

function MediaPlugin (opts) {
    this.options = opts;
}

MediaPlugin.prototype.setOption = function (key, value) {
    this.options = this.options || {};
    this.options[key] = value;
};
MediaPlugin.prototype.unsetOption = function (key) {
    if(typeof this.options === 'object' && this.options.hasOwnProperty(key)) {
        delete this.options[key];
    }
};

module.exports = MediaPlugin;

});

// file: www/util.js
define('cordova-plugin-toast.util', function(require, exports, module) {
'use strict';

function trim(str) {
    if (typeof str !== 'string') {
        return str;
    }
    return str.replace(/^\s+|\s+$/g, '');
}

function isHTMLElement(value) {
    return (value instanceof HTMLElement);
}

function isChildOf(element, parent) {
    if (!isHTMLElement(element) || !element.parentElement) {
        return false;
    }
    if (element.parentElement === parent) {
        return true;
    }
    else {
        return isChildOf(element.parentElement, parent);
    }
}

function contains(parent, element) {
    return isChildOf(element, parent);
}

function removeClass(element, classnm) {
    if (element instanceof window.NodeList) {
        for (var i = 0; i < element.length; i++) {
            removeClass(element[i], classnm);
        }
        return;
    }
    if (!isHTMLElement(element) || typeof classnm !== 'string') {
        return false;
    }
    var className = element.className + '';
    var regex = new RegExp('(?:^|\\s+)' + classnm + '(?:\\s+|$)', 'g');
    className = className.replace(regex, ' ');
    element.className = className;

    if (hasClass(element, classnm)) { // still have the class
        removeClass(element, classnm);
    }
    element.className = trim(element.className);

    return true;
}

function addClass(element, classnm) {
    var i;
    if (element instanceof window.NodeList) {
        for (i = 0; i < element.length; i++) {
            addClass(element[i], classnm);
        }
        return;
    }
    if (!isHTMLElement(element) || typeof classnm !== 'string') {
        return false;
    }
    var tmp = classnm.split(' ');
    if (tmp.length > 1) {
        var success = true;
        for (i = 0; i < tmp.length; i++) {
            if (!addClass(element, tmp[i])) {
                success = false;
            }
        }
        return success;
    }

    if (hasClass(element, classnm)) {
        return false;
    }
    element.className = trim([element.className, classnm].join(' '));
    return true;
}

function hasClass(element, classnm) {
    if (!isHTMLElement(element) || typeof classnm !== 'string') {
        return;
    }
    var className = element.className + '';
    var regex = new RegExp('(?:^|\\s+)' + classnm + '(?:\\s+|$)', 'g');
    return regex.test(className);
}

function getElementExp(elmt) {
    if (!isHTMLElement(elmt)) {
        return '';
    }
    var id = elmt.id || '';
    var cls = elmt.className || '';
    return elmt.tagName + (id ? ('#' + id) : '') + (cls ? ('.' + cls.replace(/ /g, '.')) : '');
}

function isRemoteUrl(url) {
    var reg = /^((ftp|https?):\/\/)?([\da-z\.-]+\.[a-z\.]{2,6}|[\d\.]+)/igm;
    return !!reg.test(url);
}

function getValueOf(exp, base) {
    if (typeof exp !== 'string') {
        return exp;
    }
    var depths = exp.split('.');
    if (depths.length && depths[0] === 'window') {
        depths.shift(); // remove first 'window'
    }

    var curValue = base || window;
    for (var i = 0, len = depths.length; i < len; i++) {
        if (typeof curValue[depths[i]] === 'undefined') {
            return undefined;
        }
        curValue = curValue[depths[i]];
    }
    return curValue;
}

/**
 * getBoundingRect has argument 'mode' as 2nd parameter.
 * This will determine which rectangle would be returned.
 * +-----------------------+--> mode: 'margin'
 * |        margin         |
 * |  +-----------------+--+--> mode: default(undefined)
 * |  |     border      |  |
 * |  |  +-----------+--+--+--> mode: 'innerborder'
 * |  |  |  padding  |  |  |
 * |  |  |  +-----+--+--+--+--> mode: 'innerpadding'
 * |  |  |  |     |  |  |  |
 * |  |  |  +-----+  |  |  |
 * |  |  +-----------+  |  |
 * |  +-----------------+  |
 * +-----------------------+
 */
function getBoundingRect(el, mode) {
    var width = 0,
        height = 0,
        left = 0,
        top = 0,
        borderLeft,
        borderRight,
        borderTop,
        borderBottom,
        marginLeft,
        marginRight,
        marginTop,
        marginBottom,
        paddingLeft,
        paddingRight,
        paddingTop,
        paddingBottom;
    if (el && el === el.window) { // window
        width = el.document.documentElement.clientWidth;
        height = el.document.documentElement.clientHeight;
        return {
            left: 0,
            top: 0,
            width: width,
            height: height,
            right: width,
            bottom: height
        };
    }
    if (el && el.nodeType && el.nodeType === 9) { // document
        width = Math.max(el.body.scrollWidth, el.documentElement.scrollWidth, el.body.offsetWidth, el.documentElement.offsetWidth, el.documentElement.clientWidth);
        height = Math.max(el.body.scrollHeight, el.documentElement.scrollHeight, el.body.offsetHeight, el.documentElement.offsetHeight, el.documentElement.clientHeight);
        return {
            left: 0,
            top: 0,
            width: width,
            height: height,
            right: width,
            bottom: height
        };
    }

    if (!isHTMLElement(el) || !el.ownerDocument) {
        return null;
    }

    if ('getBoundingClientRect' in document.documentElement) {
        var clientRect = el.getBoundingClientRect();
        if (el === el.ownerDocument.body) {
            left = document.body.offsetLeft + parseFloat(getStyle(el, 'marginLeft') || 0);
            top = document.body.offsetTop + parseFloat(getStyle(el, 'marginTop') || 0);
        }
        else {
            left += clientRect.left;
            top += clientRect.top;

            // left += (window.pageXOffset || el.ownerDocument.documentElement.scrollLeft || document.body.scrollLeft);
            // top += (window.pageYOffset || el.ownerDocument.documentElement.scrollTop || document.body.scrollTop);
            left -= el.ownerDocument.documentElement.clientLeft;
            top -= el.ownerDocument.documentElement.clientTop;
        }
        width = clientRect.width;
        height = clientRect.height;
    }
    else if (typeof el.offsetWidth !== 'undefined' || typeof el.offsetHeight !== 'undefined') {
        left = parseInt(el.offsetLeft, 10);
        top = parseInt(el.offsetTop, 10);
        width = parseInt(el.offsetWidth, 10);
        height = parseInt(el.offsetHeight, 10);
    }
    else {
        return null;
    }

    // including margin as bounding rect
    if (mode && mode === 'margin') {
        marginLeft = parseInt(getStyle(el, 'marginLeft'), 10) || 0;
        marginRight = parseInt(getStyle(el, 'marginRight'), 10) || 0;
        marginTop = parseInt(getStyle(el, 'marginTop'), 10) || 0;
        marginBottom = parseInt(getStyle(el, 'marginBottom'), 10) || 0;
        left -= marginLeft;
        top -= marginTop;
        width += marginLeft + marginRight;
        height += marginTop + marginBottom;

        return {
            left: left,
            top: top,
            width: width,
            height: height,
            right: left + width,
            bottom: top + height,
            margin: {
                left: marginLeft,
                right: marginRight,
                top: marginTop,
                bottom: marginBottom
            }
        };
    }
    else if (mode && mode === 'innerborder') {
        borderLeft = parseInt(getStyle(el, 'borderLeftWidth'), 10) || 0;
        borderRight = parseInt(getStyle(el, 'borderRightWidth'), 10) || 0;
        borderTop = parseInt(getStyle(el, 'borderTopWidth'), 10) || 0;
        borderBottom = parseInt(getStyle(el, 'borderBottomWidth'), 10) || 0;
        left += borderLeft;
        top += borderTop;
        width -= borderLeft + borderRight;
        height -= borderTop + borderBottom;

        return {
            left: left,
            top: top,
            width: width,
            height: height,
            right: left + width,
            bottom: top + height,
            border: {
                left: borderLeft,
                right: borderRight,
                top: borderTop,
                bottom: borderBottom
            }
        };
    }
    else if (mode && mode === 'innerpadding') {
        borderLeft = parseInt(getStyle(el, 'borderLeftWidth'), 10) || 0;
        borderRight = parseInt(getStyle(el, 'borderRightWidth'), 10) || 0;
        borderTop = parseInt(getStyle(el, 'borderTopWidth'), 10) || 0;
        borderBottom = parseInt(getStyle(el, 'borderBottomWidth'), 10) || 0;
        paddingLeft = parseInt(getStyle(el, 'paddingLeft'), 10) || 0;
        paddingRight = parseInt(getStyle(el, 'paddingRight'), 10) || 0;
        paddingTop = parseInt(getStyle(el, 'paddingTop'), 10) || 0;
        paddingBottom = parseInt(getStyle(el, 'paddingBottom'), 10) || 0;
        left += borderLeft + paddingLeft;
        top += borderTop + paddingTop;
        width -= borderLeft + paddingLeft + paddingRight + borderRight;
        height -= borderTop + paddingTop + paddingBottom + borderBottom;

        return {
            left: left,
            top: top,
            width: width,
            height: height,
            right: left + width,
            bottom: top + height,
            border: {
                left: borderLeft,
                right: borderRight,
                top: borderTop,
                bottom: borderBottom
            },
            padding: {
                left: paddingLeft,
                right: paddingRight,
                top: paddingTop,
                bottom: paddingBottom
            }
        };
    }
    else {
        return {
            left: left,
            top: top,
            width: width,
            height: height,
            right: left + width,
            bottom: top + height
        };
    }
}

function getPosition(elem) {
    var offsetParent, offset,
        parentOffset = {
            top: 0,
            left: 0
        };

    // Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
    if (getStyle(elem, 'position') === 'fixed') {
        // We assume that getBoundingClientRect is available when computed position is fixed
        offset = elem.getBoundingClientRect();

    }
    else {
        // Get *real* offsetParent
        offsetParent = getOffsetParent(elem);

        // Get correct offsets
        offset = getBoundingOffset(elem);
        parentOffset = getBoundingOffset(offsetParent);

        // Add offsetParent borders
        parentOffset.top += parseFloat(getStyle(offsetParent, 'borderTopWidth'));
        parentOffset.left += parseFloat(getStyle(offsetParent, 'borderLeftWidth'));
    }

    offset.top -= parentOffset.top;
    offset.left -= parentOffset.left;

    offset.top -= parseFloat(getStyle(elem, 'marginTop'));
    offset.left -= parseFloat(getStyle(elem, 'marginLeft'));

    // Subtract parent offsets and element margins
    return offset;
}

function getOffsetParent(el) {
    var docElem = el.ownerDocument.documentElement;
    var offsetParent = el.offsetParent || docElem;

    while (offsetParent && getStyle(offsetParent, 'position') === 'static') {
        offsetParent = offsetParent.offsetParent;
    }

    return offsetParent || docElem;
}

function getBoundingSize(el, mode) {
    if (!isHTMLElement(el)) {
        return null;
    }
    var rect = getBoundingRect(el, mode);
    return {
        width: rect.width,
        height: rect.height
    };
}

function getBoundingOffset(el, mode) {
    if (!isHTMLElement(el)) {
        return null;
    }
    var rect = getBoundingRect(el, mode);
    return {
        left: rect.left,
        top: rect.top
    };
}

function getElementVisibility(el) {
    if (!isHTMLElement(el)) {
        return false;
    }
    if (getStyle(el, 'display') === 'none' || getStyle(el, 'visibility') === 'hidden' || getStyle(el, 'opacity') === '0') {
        return false;
    }
    if (el.parentElement && !getElementVisibility(el.parentElement)) {
        return false;
    }
    return true;
}

var camelCache = {};
var rexHypen = /-(.)/gi;
function camelCase(input) {
    if (!rexHypen.test(input)) {
        return input;
    }
    if (camelCache[input]) {
        return camelCache[input];
    }
    camelCache[input] = input.toLowerCase().replace(rexHypen, function(match, word, index) {
        return index === 0 ? word : word.toUpperCase();
    });
    return camelCache[input];
}

function setStyle(element, prop, value) {
    if (element instanceof window.NodeList) {
        for (var i = 0; i < element.length; i++) {
            setStyle(element[i], prop, value);
        }
        return;
    }

    if (!isHTMLElement(element)) {
        return;
    }

    if (prop instanceof Object) {
        for (var p in prop) {
            if (typeof p === 'string' && prop.hasOwnProperty(p)) {
                setStyle(element, camelCase(p), prop[p]);
            }
        }
    }
    else if (typeof prop === 'string') {
        prop = camelCase(prop);
        element.style[prop] = value;
    }
}

function getStyle(element, prop) {
    prop = camelCase(prop);
    return element.currentStyle ?
        element.currentStyle[prop] :
        document.defaultView.getComputedStyle(element, '')[prop];
}

function createElement(tagName, attributes, children) {
    var elem = document.createElement(tagName);
    for (var attr in attributes) {
        if (attr === 'className') { // 'class' is keyword for JavaScript, so we use 'className' for the name
            elem.setAttribute('class', attributes[attr]);
        }
        else {
            elem.setAttribute(attr, attributes[attr]);
        }
    }
    if (typeof children === 'string') {
        elem.appendChild(document.createTextNode(children));
    }
    else if (children && children.length) {
        for (var i = 0; children && i < children.length; i++) {
            if (isHTMLElement(children[i])) {
                elem.appendChild(children[i]);
            }
        }
    }
    else if (isHTMLElement(children)) {
        elem.appendChild(children);
    }
    return elem;
}

module.exports = {
    trim: trim,
    createElement: createElement,
    isHTMLElement: isHTMLElement,
    isChildOf: isChildOf,
    contains: contains,
    removeClass: removeClass,
    hasClass: hasClass,
    addClass: addClass,
    getElementExp: getElementExp,
    isRemoteUrl: isRemoteUrl,
    getValueOf: getValueOf,
    getBoundingRect: getBoundingRect,
    getPosition: getPosition,
    getOffsetParent: getOffsetParent,
    getBoundingSize: getBoundingSize,
    getBoundingOffset: getBoundingOffset,
    getElementVisibility: getElementVisibility,
    setStyle: setStyle,
    getStyle: getStyle
};

});

// file: www/billing.js
define('cordova-plugin-toast.billing', function(require, exports, module) {
'use strict';

var argscheck = require('cordova/argscheck'),
    exec = require('cordova/exec');

module.exports = {
    init: function(billingInfo, successCallback, errorCallback) {
        argscheck.checkArgs('ofF', 'billing.init', arguments);

        errorCallback = errorCallback || function() {};

        if(device.platform != 'sectv-tizen') {
            throw new Error('Not supported platform');
        }

        // madatory param
        if (!billingInfo.key || typeof billingInfo.key != 'object') {
            throw new TypeError('billingInfo.key is not a object');
        }
        if (!billingInfo.appId || typeof billingInfo.appId != 'string') {
            throw new TypeError('billingInfo.appId is not a string');
        }

        // optional param
        if (billingInfo.countryCode && typeof billingInfo.countryCode != 'string') {
            throw new TypeError('billingInfo.countryCode is not a string');
        }
        if (billingInfo.containerId && typeof billingInfo.containerId != 'string') {
            throw new TypeError('billingInfo.containerId is not a string');
        }
        if (billingInfo.lang && typeof billingInfo.lang != 'string') {
            throw new TypeError('billingInfo.countryCode is not a string');
        }
        if (billingInfo.gaWebPropertyId && typeof billingInfo.gaWebPropertyId != 'string') {
            throw new TypeError('billingInfo.gaWebPropertyId is not a string');
        }
        if (billingInfo.serverType && typeof billingInfo.serverType != 'string') {
            throw new TypeError('billingInfo.serverType is not a string');
        }

        var args = [billingInfo];
        exec(successCallback, errorCallback, 'toast.billing', 'init', args);
    },
    buyProduct: function(productInfo, successCallback, errorCallback) {
        argscheck.checkArgs('ofF', 'billing.buyProduct', arguments);

        errorCallback = errorCallback || function() {};

        if(device.platform != 'sectv-tizen') {
            throw new Error('Not supported platform');
        }

        // mandatory param
        if (!productInfo.productId || typeof productInfo.productId != 'string') {
            throw new TypeError('productInfo.strServer is not a string');
        }

        // optional param
        if (productInfo.productName && typeof productInfo.productName != 'string') {
            throw new TypeError('productInfo.productName is not a string');
        }
        if (productInfo.currency && typeof productInfo.currency != 'string') {
            throw new TypeError('productInfo.currency is not a string');
        }
        if (productInfo.amount && typeof productInfo.amount != 'number') {
            throw new TypeError('productInfo.amount is not a number');
        }
        if (productInfo.period && typeof productInfo.period != 'string') {
            throw new TypeError('productInfo.period is not a string');
        }
        if (productInfo.duration && typeof productInfo.duration != 'number') {
            throw new TypeError('productInfo.duration is not a number');
        }
        if (productInfo.userId && typeof productInfo.userId != 'string') {
            throw new TypeError('productInfo.userId is not a string');
        }
        if (productInfo.onExit && typeof productInfo.onExit != 'function') {
            throw new TypeError('productInfo.onExit is not a function');
        }
        if (productInfo.showBackButton && typeof productInfo.showBackButton != 'boolean') {
            throw new TypeError('productInfo.showBackButton is not a boolean');
        }
        if (productInfo.enablePaymentRecoverFlow && typeof productInfo.enablePaymentRecoverFlow != 'boolean') {
            throw new TypeError('productInfo.enablePaymentRecoverFlow is not a boolean');
        }
        if (productInfo.titles && typeof productInfo.titles != 'object') {
            throw new TypeError('productInfo.titles is not a object');
        }
        if (productInfo.orderId && typeof productInfo.orderId != 'string') {
            throw new TypeError('productInfo.orderId is not a string');
        }
        if (productInfo.oerderItemPath && typeof productInfo.oerderItemPath != 'string') {
            throw new TypeError('productInfo.oerderItemPath is not a string');
        }

        var args = [productInfo];
        exec(successCallback, errorCallback, 'toast.billing', 'buyProduct', args);
    },
    cancelSubscription: function(productInfo, successCallback, errorCallback) {
        argscheck.checkArgs('ofF', 'billing.cancelSubscription', arguments);

        errorCallback = errorCallback || function() {};

        if(device.platform != 'sectv-tizen') {
            throw new Error('Not supported platform');
        }

        // mandatory param
        if (!productInfo.productId || typeof productInfo.productId != 'string') {
            throw new TypeError('productInfo.productId is not a string');
        }
        if (!productInfo.userId || typeof productInfo.userId != 'string') {
            throw new TypeError('productInfo.userId is not a string');
        }

        var args = [productInfo];
        exec(successCallback, errorCallback, 'toast.billing', 'cancelSubscription', args);
    },
    checkPurchaseStatus: function(productInfo, successCallback, errorCallback) {
        argscheck.checkArgs('ofF', 'billing.checkPurchaseStatus', arguments);

        errorCallback = errorCallback || function() {};

        if(device.platform != 'sectv-tizen') {
            throw new Error('Not supported platform');
        }

        // mandatory param
        if (!productInfo.productId || typeof productInfo.productId != 'string') {
            throw new TypeError('productInfo.productId is not a string');
        }
        if (!productInfo.userId || typeof productInfo.userId != 'string') {
            throw new TypeError('productInfo.userId is not a string');
        }

        var args = [productInfo];
        exec(successCallback, errorCallback, 'toast.billing', 'checkPurchaseStatus', args);
    },
    requestPurchasesList: function(productInfo, successCallback, errorCallback) {
        argscheck.checkArgs('ofF', 'billing.requestPurchasesList', arguments);

        errorCallback = errorCallback || function() {};

        if(device.platform != 'sectv-tizen') {
            throw new Error('Not supported platform');
        }

        if(!productInfo.itemType || typeof productInfo.itemType != 'string') {
            throw new TypeError('productInfo.itemType is not a string');
        }

        if(!productInfo.pageNumber || typeof productInfo.pageNumber != 'number') {
            throw new TypeError('productInfo.pageNumber is not a number');
        }

        var args = [productInfo];
        exec(successCallback, errorCallback, 'toast.billing', 'requestPurchasesList', args);

    },
    requestProductsList: function(productInfo, successCallback, errorCallback) {
        argscheck.checkArgs('ofF', 'billing.requestProductsList', arguments);

        errorCallback = errorCallback || function() {};

        if(device.platform != 'sectv-tizen') {
            throw new Error('Not supported platform');
        }

        if(productInfo.pageSize && typeof productInfo.pageSize != 'number') {
            throw new TypeError('productInfo.pageSize is not a number');
        }
        if(productInfo.pageNumber && typeof productInfo.pageNumber != 'number') {
            throw new TypeError('productInfo.pageNumber is not a number');
        }

        if(productInfo.pageSize && ((productInfo.pageSize < 0) || (productInfo.pageSize > 100))) {
            throw new RangeError('productInfo.pageSize value is RangeError');
        }

        if(productInfo.pageNumber && (productInfo.pageNumber < 0)) {
            throw new RangeError('productInfo.pageNumber value is RangeError');
        }

        var args = [productInfo];
        exec(successCallback, errorCallback, 'toast.billing', 'requestProductsList', args);

    },
    verifyPurchase: function(productInfo, successCallback, errorCallback) {
        argscheck.checkArgs('ofF', 'billing.verifyPurchase', arguments);

        errorCallback = errorCallback || function() {};

        if(device.platform != 'sectv-tizen') {
            throw new Error('Not supported platform');
        }

        if(!productInfo.invoiceId || typeof productInfo.invoiceId != 'string') {
            throw new TypeError('productInfo.invoiceId is not a string');
        }

        var args = [productInfo];
        exec(successCallback, errorCallback, 'toast.billing', 'verifyPurchase', args);

    },
    applyProduct: function(productInfo, successCallback, errorCallback) {
        argscheck.checkArgs('ofF', 'billing.applyProduct', arguments);

        errorCallback = errorCallback || function() {};

        if(device.platform != 'sectv-tizen') {
            throw new Error('Not supported platform');
        }

        if(!productInfo.invoiceId || typeof productInfo.invoiceId != 'string') {
            throw new TypeError('productInfo.invocieId is not a string');
        }

        var args = [productInfo];
        exec(successCallback, errorCallback, 'toast.billing', 'applyProduct', args);
    }
};

});

// file: src/tv-webos/inputdeviceProxy.js
define('cordova-plugin-toast.inputdeviceProxy', function(require, exports, module) {

'use strict';

var supportedKeys = [
    {name: 'ArrowUp', code: 38},
    {name: 'ArrowDown', code: 40},
    {name: 'ArrowLeft', code: 37},
    {name: 'ArrowRight', code: 39},
    {name: 'Enter', code: 13},
    {name: 'Return', code: 461},
    {name: 'ColorF0Red', code: 403},
    {name: 'ColorF1Green', code: 404},
    {name: 'ColorF2Yellow', code: 405},
    {name: 'ColorF3Blue', code: 406},
    {name: 'MediaStop', code: 413},
    {name: 'MediaFastForward', code: 417},
    {name: 'MediaPlay', code: 415},
    {name: 'MediaPause', code: 19},
    {name: 'MediaRewind', code: 412},
    {name: '0', code: 48},
    {name: '1', code: 49},
    {name: '2', code: 50},
    {name: '3', code: 51},
    {name: '4', code: 52},
    {name: '5', code: 53},
    {name: '6', code: 54},
    {name: '7', code: 55},
    {name: '8', code: 56},
    {name: '9', code: 57}
];

module.exports = {
    getSupportedKeys: function (success, fail, args) {
        try {
            setTimeout(function() {
                success(supportedKeys);
            }, 0);
        }
        catch (e) {
            setTimeout(function() {
                fail(e);
            }, 0);
        }
    },
    getKey: function(success, fail, args) {
        try {
            console.log(args[0]);
            for(var i = 0; i < supportedKeys.length; i++) {
                if(supportedKeys[i].name === args[0]) {
                    break;
                }
            }
            if(i != supportedKeys.length) {
                setTimeout(function() {
                    success(supportedKeys[i]);
                }, 0);
            }
            else {
                var error = new RangeError('keyName is not in the supported keys set.');
                error.name = 'RangeError';
                setTimeout(function() {
                    fail(error);
                }, 0);
            }
        }
        catch(e) {
            setTimeout(function() {
                fail(e);
            }, 0);
        }
    },

    // Not supported method for webos platform
    registerKey: function(success, fail, args) {
        for(var i = 0; i < supportedKeys.length; i++) {
            if(supportedKeys[i].name === args[0]) {
                break;
            }
        }
        if(i == supportedKeys.length) {
            var error = new RangeError('keyName is not in the supported keys set.');
            error.name = 'RangeError';
            setTimeout(function() {
                fail(error);
            }, 0);
        }
        else {
            setTimeout(function() {
                success();
            }, 0);
        }
    },

    // Not supported method for webos platform
    unregisterKey: function(success, fail, args) {
        for(var i = 0; i < supportedKeys.length; i++) {
            if(supportedKeys[i].name === args[0]) {
                break;
            }
        }
        if(i == supportedKeys.length) {
            var error = new RangeError('keyName is not in the supported keys set.');
            error.name = 'RangeError';
            setTimeout(function() {
                fail(error);
            }, 0);
        }
        else {
            setTimeout(function() {
                success();
            }, 0);
        }

    }
};

require('cordova/exec/proxy').add('toast.inputdevice',module.exports);

});

// file: src/tv-webos/tvaudiocontrolProxy.js
define('cordova-plugin-toast.tvaudiocontrolProxy', function(require, exports, module) {


'use strict';

var volumeChangeCallback = null;

function volumeTrigger(volume) {
    if(volumeChangeCallback && (typeof volumeChangeCallback == 'function')) {
        if((typeof volume == 'number') && (volume != -1)) {
            volumeChangeCallback(volume);
        }
        else {
            webOS.service.request('luna://com.webos.audio', {
                method: 'getVolume',
                onSuccess: function (inResponse) {
                    volumeChangeCallback(inResponse.volume);
                },
                onFailure: function (inError) {
                    console.log('failed to volumeTrigger');
                }
            });
        }
    }
}

module.exports = {
    setMute: function (success, fail, args) {
        try {
            var isMuted = args[0];
            webOS.service.request('luna://com.webos.audio', {
                method: 'setMuted',
                parameters: {
                    'muted': isMuted
                },
                onSuccess: function (inResponse) {
                    success();
                },
                onFailure: function (inError) {
                    fail();
                }
            });
        }
        catch (e) {
            var error = new Error('failed to setMute');
            error.name = e.name;
            setTimeout(function() {
                fail(error);
            }, 0);
        }
    },

    isMute: function (success, fail, args) {
        try {
            webOS.service.request('luna://com.webos.audio', {
                method: 'getVolume',
                onSuccess: function (inResponse) {
                    console.log(inResponse);
                    success(inResponse.muted);
                },
                onFailure: function (inError) {
                    fail();
                }
            });
        }
        catch (e) {
            var error = new Error('failed to execute isMute');
            error.name = e.name;
            setTimeout(function() {
                fail(error);
            }, 0);
        }
    },

    setVolume: function (success, fail, args) {
        try {
            var volume = args[0];
            webOS.service.request('luna://com.webos.audio', {
                method: 'setVolume',
                parameters: {
                    'volume': volume
                },
                onSuccess: function (inResponse) {
                    volumeTrigger(volume);
                    success();
                },
                onFailure: function (inError) {
                    fail();
                }
            });
        }
        catch (e) {
            var error = new Error('failed to setVolume');
            error.name = e.name;
            setTimeout(function() {
                fail(error);
            }, 0);
        }
    },

    setVolumeUp: function (success, fail, args) {
        try {
            webOS.service.request('luna://com.webos.audio', {
                method: 'volumeUp',
                onSuccess: function (inResponse) {
                    volumeTrigger();
                    success();
                },
                onFailure: function (inError) {
                    fail();
                }
            });
        }
        catch (e) {
            var error = new Error('failed to setVolumeUp');
            error.name = e.name;
            setTimeout(function() {
                fail(error);
            }, 0);
        }
    },

    setVolumeDown: function (success, fail, args) {
        try {
            webOS.service.request('luna://com.webos.audio', {
                method: 'volumeDown',
                onSuccess: function (inResponse) {
                    volumeTrigger();
                    success();
                },
                onFailure: function (inError) {
                    fail();
                }
            });
        }
        catch (e) {
            var error = new Error('failed to setVolumeDown');
            error.name = e.name;
            setTimeout(function() {
                fail(error);
            }, 0);
        }
    },

    getVolume: function (success, fail, args) {
        try {
            webOS.service.request('luna://com.webos.audio', {
                method: 'getVolume',
                onSuccess: function (inResponse) {
                    console.log(inResponse);
                    success(inResponse.volume);
                },
                onFailure: function (inError) {
                    fail();
                }
            });
        }
        catch (e) {
            var error = new Error('failed to getVolume');
            error.name = e.name;
            setTimeout(function() {
                fail(error);
            }, 0);
        }
    },

    setVolumeChangeListener: function (success, fail, args) {
        volumeChangeCallback = args[0];
        if(volumeChangeCallback) {
            setTimeout(function () {
                success();
            }, 0);
        }
        else {
            var error = new Error('failed to setVolumeChangeListener');
            error.name = 'Fail';
            setTimeout(function() {
                fail(error);
            }, 0);
        }
    },

    unsetVolumeChangeListener: function (success, fail, args) {
        volumeChangeCallback = '';
        if(!volumeChangeCallback) {
            setTimeout(function () {
                success();
            }, 0);
        }
        else {
            var error = new Error('failed to unsetVolumeChangeListener');
            error.name = 'Fail';
            setTimeout(function() {
                fail(error);
            }, 0);
        }
    }
};

require('cordova/exec/proxy').add('toast.tvaudiocontrol', module.exports);

});

// file: src/tv-webos/applicationProxy.js
define('cordova-plugin-toast.applicationProxy', function(require, exports, module) {
'use strict';

// Store success callback of getRequestedAppInfo
var hookSuccessCallback = {};

document.addEventListener('webOSLaunch', function(inData) {
    if(typeof hookSuccessCallback === 'function') {

        // Keep receivedData in localStorage
        window.localStorage.setItem('requestedappinfodata', JSON.stringify(inData.detail));
        hookSuccessCallback({callerAppId: inData.detail.callerAppId, data: inData.detail.data});
    }
}, false);

document.addEventListener('webOSRelaunch', function(inData) {
    if(typeof hookSuccessCallback === 'function') {

        // Keep receivedData in localStorage
        window.localStorage.setItem('requestedappinfodata', JSON.stringify(inData.detail));
        hookSuccessCallback({callerAppId: inData.detail.callerAppId, data: inData.detail.data});
    }

    // Run in the foreground
    /*jshint undef: false */
    PalmSystem.activate();
}, false);

module.exports = {
    exit: function (success, fail, args) {

        // Use web standard 'window.close', since webos doesn't have exit method.
        window.close();
    },
    launchApp: function (success, fail, args) {
        try {
            var paramAppId = args[0].appId;
            var paramData = {};

            paramData.data = args[0].data;

            // When launching callee app with data, pass callerAPPId additionally.
            /*jshint undef: false */
            paramData.callerAppId = webOS.fetchAppId();

            /*jshint undef: false */
            webOS.service.request('luna://com.webos.applicationManager', {
                method: 'launch',
                parameters: {
                    'id': paramAppId,
                    'params': paramData
                },
                onSuccess: function (data) {
                    success(data);
                },
                onFailure: function (e) {
                    var error = new Error();
                    error.name = e.name;
                    throw error;
                }
            });
        }
        catch (e) {
            var error = new Error();
            error.name = e.name;
            setTimeout(function() {
                fail(error);
            }, 0);
        }
    },
    getRequestedAppInfo: function (success, fail, args) {
        try {
            console.log('getRequestedAppInfo');

            var receivedData = {};

            if(!!window.localStorage.getItem('requestedappinfodata')) {

                // If have localStorage value, return receivedData in localStorage.
                receivedData = JSON.parse(window.localStorage.getItem('requestedappinfodata'));
            }

            if(typeof receivedData === 'object' && receivedData.hasOwnProperty('data')) {

                // If receivedData has data, return value.
                success({callerAppId: receivedData.callerAppId, data: receivedData.data});
            }
            else {

                // If receivedData doesn't have data, hold success callback until responding Launch Event from webos.
                hookSuccessCallback = success;
            }
        }
        catch (e) {
            setTimeout(function() {
                fail(e);
            }, 0);
        }
    }
};

require('cordova/exec/proxy').add('toast.application', module.exports);

});

// file: src/tv-webos/mediaProxy.js
define('cordova-plugin-toast.mediaProxy', function(require, exports, module) {


'use strict';

var Media = require('cordova-plugin-toast.Media');
var Util = require('cordova-plugin-toast.util');

var currentMediaState = null;

var containerElem = null;

var mediaObjects = {};

var sourceElem = null;

var containerStylecallbackFnTimer = null;

var mediaId = '';
var mediaSrc = '';

var isDrm = false;
var isOpenFinished = false;
var isPlayCalled = false;

function createVideContainer(id) {
    function setContainerStyleEventListener(elem,callback) {
        var containerObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(e) {
                callback.call(e.target, e.attributeName);
            });
        });

        containerObserver.observe(elem, {
            childList: false,
            subtree: false,
            attributes: true
        });
        Media.mediaEvent(id,getMediaEventValue(Media._MEDIA_CONTAINER,elem));
    }

    if(window.MutationObserver) {
        containerElem = document.createElement('div');
        containerElem.style.left = '0px';
        containerElem.style.top = '0px';
        containerElem.style.width = '0px';
        containerElem.style.height = '0px';
        containerElem.appendChild(mediaObjects[id]);
        setContainerStyleEventListener(containerElem,containerStyleEventCallback);
    }
    else {
        throw new Error('The platform does not support toast.media');
    }
}

function containerStyleEventCallback(MutationRecordProperty) {
    if(containerStylecallbackFnTimer) {
        clearTimeout(containerStylecallbackFnTimer);
    }
    containerStylecallbackFnTimer = setTimeout(function() {
        if (MutationRecordProperty == 'style') {
            var boundingRect = Util.getBoundingRect(containerElem);
            console.log('media:: DisplayRect left = '+boundingRect.left + '/ top = ' + boundingRect.top + '/ width = ' + boundingRect.width + '/ height = ' + boundingRect.height);

            containerElem.childNodes[0].style.width = boundingRect.width + 'px';
            containerElem.childNodes[0].style.height = boundingRect.height + 'px';
        }
    },0);
}

function getMediaEventValue (type,data) {
    var reval = {};
    switch(type) {
    case Media.EVENT_STATE :
        reval = {
            'type': type,
            'data': {
                'state': data,
                'oldState': currentMediaState
            }
        };
        currentMediaState = data;
        break;
    case Media.EVENT_DURATION :
        reval = {
            'type': type,
            'data': {
                'duration': data
            }
        };
        break;
    case Media.EVENT_POSITION :
        reval = {
            'type': type,
            'data': {
                'position': data
            }
        };
        break;
    case Media.EVENT_BUFFERINGPROGRESS :
        reval = {
            'type': type,
            'data': {
                'bufferingPercentage': data
            }
        };
        break;
    case Media.EVENT_ENDED :
        reval = {
            'type': type
        };
        break;
    case Media._MEDIA_CONTAINER :
        reval = {
            'type': type,
            'data': {
                'containerElem': data
            }
        };
        break;
    case Media._MEDIA_ERROR :
        reval = {
            'type': type,
            'data': data
        };
        break;
    }
    return reval;
}

function openMedia(id, src) {

    sourceElem.src = src;

    mediaObjects[id].appendChild(sourceElem);
    mediaObjects[id].load();

    currentMediaState = Media.STATE_IDLE;
    Media.mediaEvent(id, getMediaEventValue(Media.EVENT_STATE, Media.STATE_IDLE));

    isOpenFinished = true;

    if(isPlayCalled === true) {
        mediaObjects[id].play();
        isPlayCalled = false;
    }
}

module.exports = {
    create: function(successCallback, errorCallback, args) {
        var id = args[0];

        console.log('media::create() - id =' + id);

        mediaObjects[id] = document.createElement('video');
        mediaObjects[id].setAttribute('style', 'background-color: black');

        mediaObjects[id].onStalledCB = function () {
            console.log('media::onStalled()');
            Media.mediaEvent(id, getMediaEventValue(Media.EVENT_STATE, Media.STATE_STALLED));
        };
        mediaObjects[id].onEndedCB = function () {
            console.log('media::onEndedCB() - MEDIA_STATE -> IDLE');
            Media.mediaEvent(id, getMediaEventValue(Media.EVENT_ENDED));
        };
        mediaObjects[id].onErrorCB = function () {
            console.log('media::onErrorCB() - MEDIA_ERROR -> ' + event.srcElement.error);
            Media.mediaEvent(id, getMediaEventValue(Media._MEDIA_ERROR, event.srcElement.error));
        };
        mediaObjects[id].onLoadedMetaDataCB = function () {
            Media.mediaEvent(id, getMediaEventValue(Media.EVENT_DURATION, mediaObjects[id].duration * 1000));
        };
        mediaObjects[id].onPlayingCB = function () {
            console.log('media::onPlayingCB() - MEDIA_STATE -> PLAYING');
            Media.mediaEvent(id, getMediaEventValue(Media.EVENT_STATE, Media.STATE_PLAYING));
        };
        mediaObjects[id].onDurationChangeCB = function () {
            console.log('media::onDurationChangeCB() - EVENT_DURATION -> ' + mediaObjects[id].duration * 1000);
            Media.mediaEvent(id, getMediaEventValue(Media.EVENT_DURATION, mediaObjects[id].duration * 1000));
        };
        mediaObjects[id].onTimeUpdateCB = function () {
            console.log('media::onTimeUpdateCB() - EVENT_POSITION -> ' + mediaObjects[id].currentTime * 1000);
            Media.mediaEvent(id, getMediaEventValue(Media.EVENT_POSITION, mediaObjects[id].currentTime * 1000));
        };

        mediaObjects[id].addEventListener('loadedmetadata', mediaObjects[id].onLoadedMetaDataCB);
        mediaObjects[id].addEventListener('ended', mediaObjects[id].onEndedCB);
        mediaObjects[id].addEventListener('timeupdate', mediaObjects[id].onTimeUpdateCB);
        mediaObjects[id].addEventListener('durationchange', mediaObjects[id].onDurationChangeCB);
        mediaObjects[id].addEventListener('playing', mediaObjects[id].onPlayingCB);
        mediaObjects[id].addEventListener('error', mediaObjects[id].onErrorCB);
        mediaObjects[id].addEventListener('stalled', mediaObjects[id].onStalledCB);

        createVideContainer(id);
    },

    open: function(successCallback, errorCallback, args) {
        var id = args[0],
            src = args[1];
        mediaId = id;
        mediaSrc = src;
        isOpenFinished = false;
        console.log('media::open() - id =' + id + ' src =' + src);

        if(isDrm === false) {
            sourceElem = document.createElement('source');
            openMedia(id, src);
        }
    },

    // play
    play: function(successCallback, errorCallback, args) {
        var id = args[0];
        isPlayCalled = true;
        console.log('media::play() - id =' + id);

        var videoChildNodes = mediaObjects[id].childNodes;

        if(isOpenFinished === true) {
            if(videoChildNodes.length === 0) {
                openMedia(id, sourceElem.src);
            }
            else {
                mediaObjects[id].play();
                isPlayCalled = false;
            }
        }
    },

    // Stops the playing media
    stop: function(successCallback, errorCallback, args) {
        var id = args[0];

        mediaObjects[id].pause();
        if (mediaObjects[id].currentTime !== 0) {
            mediaObjects[id].currentTime = 0;
        }
        console.log('media::stop() - MEDIA_STATE -> IDLE');

        mediaObjects[id].removeChild(sourceElem);
        mediaObjects[id].load();

        Media.mediaEvent(id, getMediaEventValue(Media.EVENT_STATE, Media.STATE_IDLE));
        successCallback(mediaObjects[id].currentTime);
    },

    // Seeks to the position in the media
    seekTo: function(successCallback, errorCallback, args) {
        var id = args[0],
            milliseconds = args[1];
        console.log('media::seekTo(): ' + milliseconds);

        mediaObjects[id].currentTime = milliseconds / 1000;
    },

    // Pauses the playing media
    pause: function(successCallback, errorCallback, args) {
        var id = args[0];

        console.log('media::pause() - MEDIA_STATE -> PAUSED');
        mediaObjects[id].pause();
        Media.mediaEvent(id, getMediaEventValue(Media.EVENT_STATE, Media.STATE_PAUSED));
    },

    setDrm: function(successCallback, errorCallback, args) {
        console.log('media::loadDrmClient() - type= ' + args.drmType);

        isDrm = true;

        var appId = webOS.fetchAppId();

        var drmType = args.drmType;
        var clientId;
        var isDrmClientLoaded;

        loadDrmClient();

        function loadDrmClient() {
            webOS.service.request('luna://com.webos.service.drm', {
                method: 'load',
                parameters: {
                    'drmType': drmType,
                    'appId': appId
                },
                onSuccess: function (result) {
                    clientId = result.clientId;
                    isDrmClientLoaded = true;
                    isLoaded();
                    console.log('DRM Client is loaded successfully.');
                },
                onFailure: function (result) {
                    console.log('[' + result.errorCode + ']' + result.errorText);
                }
            });
        }

        function isLoaded() {
            webOS.service.request('luna://com.webos.service.drm', {
                method: 'isLoaded',
                parameters: {
                    appId: appId
                },
                onSuccess: function (result) {
                    sendRightInformation(result.clientId);
                },
                onFailure: function (result) {
                }
            });
        }

        var msg = args.msg;

        var msgType = args.msgType;
        var drmSystemId = args.drmSystemId;
        var sourceType = args.sourceType || 'video/mp4';

        function sendRightInformation(isLoadedclientId) {
            clientId = isLoadedclientId || clientId;
            webOS.service.request('luna://com.webos.service.drm', {
                method: 'sendDrmMessage',
                parameters: {
                    'clientId': clientId,
                    'msgType': msgType,
                    'msg': msg,
                    'drmSystemId': drmSystemId
                },
                onSuccess: function (result) {
                    console.log('sendDrmMessage successded');
                    var mediaOptionObj = JSON.parse(args.mediaOption);
                    mediaOptionObj.option.drm.clientId = clientId;

                    /* jshint undef: false*/
                    var mediaOption = escape(JSON.stringify(mediaOptionObj));
                    sourceElem = document.createElement('source');
                    sourceElem.type = sourceType + ';mediaOption=' + mediaOption;

                    openMedia(mediaId, mediaSrc);
                    isDrm = false;
                },
                onFailure: function (result) {
                    console.log('[' + result.errorCode + ']' + result.errorText);
                    isDrm = false;
                }
            });
        }
    },

    setStreamingProperty: function(successCallback, errorCallback, args) {
        var mediaOptionObj = JSON.parse(args.mediaOption);

        /* jshint undef: false*/
        var mediaOption = escape(JSON.stringify(mediaOptionObj));
        sourceElem.type = 'mediaOption=' + JSON.stringify(mediaOption);
    }
};

require('cordova/exec/proxy').add('toast.Media',module.exports);

});

// file: src/tv-webos/MediaPluginWideVine.js
define('cordova-plugin-toast.MediaPluginWideVine', function(require, exports, module) {


'use strict';

var exec = require('cordova/exec'),
    MediaPlugin = require('cordova-plugin-toast.MediaPlugin');

function MediaPluginWideVine () {
    MediaPlugin.apply(this, arguments);
    this.name = 'MediaPluginWideVine';
}

MediaPluginWideVine.prototype = new MediaPlugin();

MediaPluginWideVine.prototype.onAttachToMedia = function (media) {
    var me = this;

    media.registerHook('beforeopen', function (media, args) {
        exec(null, null, 'toast.Media', 'setDrm', {
            'drmType': 'widevine',
            'msgType': 'application/widevine+xml',
            'drmSystemId': 'urn:dvb:casystemid:19156',
            'mediaOption': me.options.OPTIONS,
            'sourceType': me.options.SOURCE_TYPE,
            'msg': me.options.CUSTOM_DATA
        });
    });
};

module.exports = MediaPluginWideVine;

});

// file: src/tv-webos/MediaPluginHLS.js
define('cordova-plugin-toast.MediaPluginHLS', function(require, exports, module) {


'use strict';

var exec = require('cordova/exec'),
    MediaPlugin = require('cordova-plugin-toast.MediaPlugin');

function MediaPluginHLS () {
    MediaPlugin.apply(this, arguments);
    this.name = 'MediaPluginHLS';
}

MediaPluginHLS.prototype = new MediaPlugin();

MediaPluginHLS.prototype.onAttachToMedia = function (media) {
    var me = this;

    media.registerHook('beforeopen', function (media, args) {
        exec(null, null, 'toast.Media', 'setStreamingProperty', {
            'mediaOption': me.options.OPTIONS
        });
    });
};

module.exports = MediaPluginHLS;

});

// file: src/tv-webos/MediaPluginUHD.js
define('cordova-plugin-toast.MediaPluginUHD', function(require, exports, module) {


'use strict';

var MediaPlugin = require('cordova-plugin-toast.MediaPlugin');

function MediaPluginUHD () {
    throw new Error('UHD Contents playback is not supported on WebOS devices.');
}

MediaPluginUHD.prototype = new MediaPlugin();

MediaPluginUHD.prototype.onAttachToMedia = function (media) {
};

module.exports = MediaPluginUHD;

});

// file: src/tv-webos/MediaPluginPlayReady.js
define('cordova-plugin-toast.MediaPluginPlayReady', function(require, exports, module) {


'use strict';

var exec = require('cordova/exec'),
    MediaPlugin = require('cordova-plugin-toast.MediaPlugin');

function MediaPluginPlayReady () {
    MediaPlugin.apply(this, arguments);
    this.name = 'MediaPluginPlayReady';
}

MediaPluginPlayReady.prototype = new MediaPlugin();

MediaPluginPlayReady.prototype.onAttachToMedia = function (media) {
    var me = this;

    media.registerHook('beforeopen', function (media, args) {
        exec(null, null, 'toast.Media', 'setDrm', {
            'drmType': 'playready',
            'msgType': 'application/vnd.ms-playready.initiator+xml',
            'drmSystemId': 'urn:dvb:casystemid:19219',
            'mediaOption': me.options.OPTIONS,
            'sourceType': me.options.SOURCE_TYPE,
            'msg': me.options.CUSTOM_DATA
        });
    });
};

module.exports = MediaPluginPlayReady;

});

var moduleMapper = require('cordova/modulemapper');
moduleMapper.clobbers('cordova-plugin-toast.inputdevice', 'toast.inputdevice');
moduleMapper.clobbers('cordova-plugin-toast.tvchannel', 'toast.tvchannel');
moduleMapper.clobbers('cordova-plugin-toast.tvwindow', 'toast.tvwindow');
moduleMapper.clobbers('cordova-plugin-toast.tvaudiocontrol', 'toast.tvaudiocontrol');
moduleMapper.clobbers('cordova-plugin-toast.drminfo', 'toast.drminfo');
moduleMapper.clobbers('cordova-plugin-toast.application', 'toast.application');
moduleMapper.clobbers('cordova-plugin-toast.Media', 'toast.Media');
moduleMapper.clobbers('cordova-plugin-toast.MediaPlugin', 'toast.MediaPlugin');
moduleMapper.clobbers('cordova-plugin-toast.billing', 'toast.billing');
moduleMapper.clobbers('cordova-plugin-toast.MediaPluginWideVine', 'toast.MediaPluginWideVine');
moduleMapper.clobbers('cordova-plugin-toast.MediaPluginHLS', 'toast.MediaPluginHLS');
moduleMapper.clobbers('cordova-plugin-toast.MediaPluginUHD', 'toast.MediaPluginUHD');
moduleMapper.clobbers('cordova-plugin-toast.MediaPluginPlayReady', 'toast.MediaPluginPlayReady');
moduleMapper.runs('cordova-plugin-toast.inputdeviceProxy');
moduleMapper.runs('cordova-plugin-toast.tvaudiocontrolProxy');
moduleMapper.runs('cordova-plugin-toast.applicationProxy');
moduleMapper.runs('cordova-plugin-toast.mediaProxy');
moduleMapper.mapModules(window);
window.toast.version = '1.3.0';
})();

