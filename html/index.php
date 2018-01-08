<?php
	
	error_reporting(E_ALL);
	ini_set("display_error",1);
	
	require_once ('../includes/config/local.php'); 
	require_once ('../includes/config/config.php');
	
	
	function __autoload($class) {
			
		require ( LIBS . $class. '.php');		
		
	}
	require ( LIBS . 'Functions.php');
	require ( LANG . DEFAULT_LANGUAGE .'.php');
	
	$app = new App();
	
	$app->init();	
	
?>