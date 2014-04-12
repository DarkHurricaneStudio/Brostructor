var keys = new Array();

document.addEventListener('keydown', function(evt) {
    keys[evt.keyCode] = true;
});

document.addEventListener('keyup', function(evt) {
    keys[evt.keyCode] = false;
});