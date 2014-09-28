document.querySelector('input').addEventListener('keydown', function (e) {
    if (e.which == 9) {
        e.preventDefault();
    }
});
alert('test');
