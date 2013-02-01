/**
 * jquery.asyncimage.js <https://github.com/kmacrow/jquery.asyncimage.js>
 * 
 * Copyright (C) Kalan MacRow, 2013
 * Simple plugin to provide start, progress and success events for the 
 * lifecycle of large image downloads. Inspired by Adobe's HTML5 Image
 * Progress Events effort: 
 * http://blogs.adobe.com/webplatform/2012/01/13/html5-image-progress-events/
 *
 * This code is MIT licensed <http://opensource.org/licenses/MIT>
 * You may use it for personal or commercial projects with or without
 * attribution. 
*/

(function($)
{
    "use strict";

    // btoa doesn't work for xhr.responseText :'(
    function b64enc(str) 
    {
       var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
           out = "", i = 0;
       
       while (i < str.length) {
           var byte1, byte2, byte3,
                enc1, enc2, enc3, enc4;

           byte1 = str.charCodeAt(i++) & 0xff;
           byte2 = str.charCodeAt(i++) & 0xff;
           byte3 = str.charCodeAt(i++) & 0xff;
    
           enc1 = byte1 >> 2;
           enc2 = ((byte1 & 3) << 4) | (byte2 >> 4);
           
           if (isNaN(byte2)) {
               enc3 = enc4 = 64;
           } else {
               enc3 = ((byte2 & 15) << 2) | (byte3 >> 6);
               if (isNaN(byte3)) {
                   enc4 = 64;
               } else {
                   enc4 = byte3 & 63;
               }
           }
    
           out += b64.charAt(enc1) 
                    + b64.charAt(enc2) 
                    + b64.charAt(enc3) 
                    + b64.charAt(enc4);
        } 
       
        return out;
    }

    // Load images asynchronously with progress events, yay!
    $.fn.asyncimage = function(options) 
    {
        
        var settings = {
                // image src to load
                 'src': null,
               'start': $.noop,
            'progress': $.noop,
            'complete': $.noop,
             'success': $.noop,
               'error': $.noop,
               // timeout in ms, defauly is 5min
             'timeout': 60*5*1000,
               // set image as background-image?
          'background': false,
               // send credentials on XHR?
         'credentials': false
        };

        if(typeof options != 'undefined') {
            for(var setting in settings) {
                if(options.hasOwnProperty(setting)
                    && typeof options[setting] != 'undefined') {
                    settings[setting] = options[setting];
                }
            }
        }

        if(!settings.src) {
            return this;
        }

        if(!window.XMLHttpRequest) {
            console.error('jquery.asyncimage: no XMLHttpRequest detected.');
            return;
        }

        $.ajax({
            'xhr': function(){
                var xhr = new window.XMLHttpRequest();
                xhr.withCredentials = settings.credentials;
                xhr.overrideMimeType('text/plain; charset=x-user-defined'); 

                xhr.addEventListener('progress', function(evt) {
                    var p = 0;
                    if(evt.lengthComputable) {
                        p = (evt.loaded / evt.total) * 100;
                    }
                    settings.progress(p, evt);
                }, false);

                xhr.addEventListener('loadstart', function(evt) {
                    settings.start(evt);
                }, false);

                return xhr;
            },
            'success': function(data, status, jqXhr) {
                var uri = 'data:' 
                           + jqXhr.getResponseHeader('Content-Type')
                           + ';base64,' 
                           + b64enc(jqXhr.responseText);

                if($this.prop('tagName') == 'IMG') {
                    $this.attr('src', uri);
                } else if(settings.background) {
                    $this.css('background-image', 'url("' + uri + '")');
                }

                settings.success(uri, status, jqXhr);
            },
               'type': 'GET',
                'url': settings.src,
            'timeout': settings.timeout,
              'error': settings.error,
           'complete': settings.complete
        });

    };

})(jQuery);
