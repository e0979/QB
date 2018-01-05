<?php
	//Main anti XSS function
	function escape_value($data) {
		if (ini_get('magic_quotes_gpc')) {
			$data = stripslashes($data);
		}
		$data = strip_tags($data, '<p><a><br>');
		//use this if local
		return mysql_real_escape_string($data);
		//use this for server
		//return mysql_escape_string($data); 
	}
	
	function create_slug($data) {
		$search = explode(',','&iacute;,&eacute;,&aacute;,&oacute;,&uacute;,&ntilde;,&aacute;,Á,É,Í,Ó,Ú,á,é,í,ó,ú,ñ,#,.,@, ,');
		$replace = explode(",","i,e,a,o,u,n,a,A,E,I,O,U,a,e,i,o,u,n,,_,_,-");
		$data = str_replace($search, $replace, $data);
		return $data;
	}
	
	//Replace commas with dot, for numerical Values
	function pointforcomma($data){
		$data = str_replace(",", ".", $data);
		return $data;	
	}
		
	

?>