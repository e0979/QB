<?php 

	//Current Language
	define ('DEFAULT_LANGUAGE', 'es_ES');
	
	date_default_timezone_set('America/Caracas');	
	//Path info
	define ('SITE_PATH', dirname(dirname(realpath(__FILE__))).'/'); 
	define ('SITE_NAME', "QUINBI");
	define ('PUBLIC_PATH', URL . 'public/');
	define ('CSS', URL . 'public/css/'); 
	define ('IMG', URL . 'public/img/'); 
	define ('ICONS', URL . 'public/img/icons/'); 
	define ('IMAGES', URL . 'public/images/'); 
	define ('JS', URL . 'public/js/'); 
	define ('LIBS', SITE_PATH . 'libs/');
	define ('LANG', SITE_PATH . 'lang/'); 
	define ('SIDEBARS', SITE_PATH . '/app/views/sidebars/'); 
	define ('DATA', SITE_PATH . '../html/public/data/'); 
	
	//Email Configuration
	define ('SYSTEM_EMAIL', 'quinbi@besign.com.ve');
	define ('MAIL_SERVER', 'smtp.gmail.com');
	define ('MAIL_HOST', 'mail.besign.com.ve');
	define ('MAIL_PORT', 587);	
	define ('MAIL_PASSWORD', '$20BeE13$');
	define ('MAIL_SECURE','tls');
	
		
	//Hash definitions
	define("PBKDF2_HASH_ALGORITHM", "");
	define("PBKDF2_ITERATIONS", 1);
	define("PBKDF2_SALT_BYTE_SIZE", 1);
	define("PBKDF2_HASH_BYTE_SIZE", 1);
	
	define("HASH_SECTIONS", 1);
	define("HASH_ALGORITHM_INDEX", 0);
	define("HASH_ITERATION_INDEX", 1);
	define("HASH_SALT_INDEX", 2);
	define("HASH_PBKDF2_INDEX", 3);
	
	

	//Database Meekro Class Config
	DB::$user = DB_USER;
	DB::$password = DB_PASSWORD;
	DB::$dbName = DB_NAME;
	DB::$host = DB_HOST;
	DB::$encoding = 'UTF8';	
	
	DB::$error_handler = 'my_error_handler'; 
	
	function my_error_handler($params) {
	   echo "Error: " . $params['error'] . "Query: " . $params['query'] . "<br>\n";
	   die; 
	}	 
	DB::$success_handler = 'my_success_handler'; // If Success
	function my_success_handler($params) {
	  return true;
	}
	
?>