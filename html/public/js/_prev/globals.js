define(['module'], function(module) {

	function hash() {
	    var accessHash = $.param.fragment();
    	var accessHashPart = accessHash.split('/');
    	return accessHashPart;
	}

	var getUserFunction = function (){		
		/*var userObj;
		$.ajax({ 	//Get user data by session
			type: "POST",
		  	url : URL + "account/getsession",
		  	success: function (response) {
			    var response = JSON.parse(response);
		        userObj = response; 
			}, 
		  	async: false // <- this turns it into synchronous
		});
		return userObj;*/
	}();

    return {
    	f: 'bootstrap4',
		isProcessing: false, //To Avoid multiple AJAX requests
		URL: "http://localhost/QB/html/",
		urlCheck: '/html/',
		position: 2,
		hash: hash,
		getUser: getUserFunction
    }
});