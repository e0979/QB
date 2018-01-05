<?php
	
	class Helper {
	
		function __construct() {			
		
		}
		
		static function getIpAddress($ip = USER_IP) {
			
			if ($ip === '') {
				
				if(!empty($_SERVER['HTTP_CLIENT_IP'])) {
					$ip = $_SERVER['HTTP_CLIENT_IP'];
				} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
					$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
				} else {
					$ip = $_SERVER['REMOTE_ADDR'];
				}
				
			}
			return $ip;
		}
		
		//Database	Basic Usage
		static function insert($tablename, $vars){
			
			$tablename = escape_value($tablename);
			
			$query = DB::insert( DB_PREFIX . $tablename, $vars);
			return DB::affectedRows();
		}
		
		static function update($tablename, $id, $vars, $by ='id'){
				
			$tablename = escape_value($tablename);
			$id = escape_value($id);
			$by = escape_value($by);
			
			$query = DB::update( DB_PREFIX . $tablename, $vars, $by."=%s", $id);		
			return DB::affectedRows();
			
				//return DB::update(DB_PREFIX . $tablename, $vars, "id=%s", $id);
	  			
		}
		static function delete($tablename, $id, $by ='id'){
				
			$tablename = escape_value($tablename);
			$id = escape_value($id);
			$by = escape_value($by);			
							
			$query =  DB::delete( DB_PREFIX . $tablename, $by."=%s", $id);	
			return DB::affectedRows();
		}
		
		
		
		
	}

?>