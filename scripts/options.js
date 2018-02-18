if (localStorage["minifluxlogin"] == undefined && localStorage["minifluxlogin"] == undefined && localStorage["minifluxlogin"] == undefined) {
    $("div#status").attr("class", "info");
    $('div#status').text('Enter your data to login to the Miniflux.');

    document.getElementById('minifluxurl').value = '';
    document.getElementById('minifluxlogin').value = '';
    document.getElementById('minifluxpassword').value = '';

    $('#check_update').hide();
} else {
    load_settings();
}

$("#submit").click(function() {
    localStorage["minifluxurl"] = document.getElementById('minifluxurl').value;
    localStorage["minifluxlogin"] = document.getElementById('minifluxlogin').value;
    localStorage["minifluxpassword"] = document.getElementById('minifluxpassword').value;
    localStorage["update_seconds"] = document.getElementById('update_seconds').value;
});


$("#update").click(function() {
    localStorage["update_seconds"] = document.getElementById('update_seconds').value;
});

function load_settings() {
	var minifluxurl = localStorage["minifluxurl"];
    var minifluxlogin = localStorage["minifluxlogin"];
    var minifluxpassword = localStorage["minifluxpassword"];
    var update_seconds = localStorage["update_seconds"];

    document.getElementById('minifluxurl').value = minifluxurl;
    document.getElementById('minifluxlogin').value = minifluxlogin;
    document.getElementById('minifluxpassword').value = '';
    document.getElementById('update_seconds').value = update_seconds;
}

if (localStorage["minifluxlogin"] != undefined && localStorage["minifluxlogin"] != undefined && localStorage["minifluxlogin"] != undefined) {
    var headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(localStorage["minifluxlogin"] + ':' + localStorage["minifluxpassword"]));

    fetch(localStorage["minifluxurl"] + '/v1/users/' + localStorage["minifluxlogin"], {
            method:'GET',
            headers: headers,
        })
        .then(
            r => r.json()
        )
        .then(
            obj => {
                if (obj.username == localStorage["minifluxlogin"]) {
                    $("div#status").attr("class", "success");
                    $('div#status').text('You are connected with your Miniflux.');
                } else {
                    $("div#status").attr("class", "error");
                    $('div#status').text('You are not connected with any Miniflux.');
                    alert('Please enter your correct login details');
                }
            }
        );
}