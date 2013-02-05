# jquery.asyncimage.js

HTML5 currently doesn't support any kind of loading progress events on images, although Adobe is currently pushing for it&mdash;this plugin is very roughly based on one of their demos. (They use XMLHttpRequest directly, I've used $.ajax for better compatability.)

This plugin helps you load large/HiRes images over ajax by providing <code>start</code>, <code>progress</code>and <code>success</code> events for the life-cycle of the download. The image data is base 64 encoded and embedded in a data URI for you.

# Quick Start

To load a big background image for <code>#mylayer</code>, try this:

```javascript
$('#mylayer').asyncimage({'src': 'big.jpg',
						  'background': true,
						  'start': function(){ ... },
						  'progress': function(progress){ ... },
						  'success': function(){ ... }});
```

See the code and demo for more details and advanced settings.