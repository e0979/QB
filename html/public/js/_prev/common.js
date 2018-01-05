function getPage(position) {

	var pathArray = window.location.pathname.split('/');
	var accessToArray = pathArray[position];
	console.log("Access:" + accessToArray)
	return accessToArray;

}


function uniqId() {
  return Math.round(new Date().getTime() + (Math.random() * 100));
}