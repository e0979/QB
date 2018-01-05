var modo = 'local';//local or server

var f = 'bootstrap4';
//To Avoid multiple AJAX requests
var isProcessing = false;

if (modo === 'local') {

	var URL = "http://localhost/QB/html/";
	var urlCheck = '/html/';

	var position = 2;

} else {
	var URL = "http://likes.colmenadeideas.com";
	var urlCheck = '/';
	var position = 1;

}
