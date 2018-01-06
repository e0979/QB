<?php

	class accountModel extends Model {
	
		public function __construct() {
	
			parent::__construct();
		}
		
		public function getAccount($data, $by='id') {
			
			$result = DB::query("SELECT * FROM " . DB_PREFIX . "users WHERE $by=%s LIMIT 1", $data);
			
			return $result;
		}
				
	}
		
?>