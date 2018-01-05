<?php
	class ApiQuery {
		//Modelo
		
		public function __construct() {
			
	
		}
		
	
		public function ejemplo($parametro){
			
			return DB::query("SELECT* FROM " . DB_PREFIX . "tabla", $parametro);		
			
		}
	
	}
?>