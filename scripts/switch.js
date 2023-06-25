document.addEventListener('DOMContentLoaded', function() {
    var switchElem = document.getElementById('flexSwitchCheckDefault');

    switchElem.addEventListener('change', function() {
        if (this.checked) {
            window.location.href = "index_chinese.html";
        } else {
            window.location.href = "index.html";
        }
    });
});