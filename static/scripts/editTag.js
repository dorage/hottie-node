/* eslint-disable */

function deleteTag(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(post) {
        console.log(post);
        location.reload();
    };
    xhttp.open('DELETE', `https://api.catloverlife.com/ui/tags?id=${id}`, true);
    xhttp.send();
}

function deleteTagOnLocal(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(post) {
        console.log(post);
        location.reload();
    };
    xhttp.open('DELETE', `http://localhost:8383/ui/tags?id=${id}`, true);
    xhttp.send();
}
