<?php

class Router {

	//Build a Collection of url's alllowed to consult

	private $_url = array();

	public function add($url) {

		$this -> _url[] = $url;
	}

}
?>