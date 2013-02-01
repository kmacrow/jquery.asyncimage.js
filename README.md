jquery.asyncimage.js
====================

HTML5 currently doesn't support any kind of loading progress events on images,
although Adobe is currently pushing for it--this plugin is very roughly based
on one of their demos. (They use XMLHttpRequest directly, I've used $.ajax for 
better compatability.)

This plugin helps you load large/HiRes images over ajax by
providing <code>start</code>, <code>progress</code> and <code>end</code> events 
for the lifecycle of the download. The image data is base 64 encoded and embedded 
in a data URI for you.

Grab the code and do something like this:

```
$('#my-img').asychimage({'src': '/images/wallpaper.jpg',
						 'start': function(){ ... },
						 'progress': function(progress){ ... },
						 'end': function(){ ... }});
```

See the code for more details and advanced settings.