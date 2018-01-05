<?
	class apiModel extends Model {
	
		public function __construct() {
	
			parent::__construct();
		}
		
		public function search_list($variable){	
			return DB::query("SELECT * FROM " . DB_PREFIX . "tabla",$variable);
		}
		
		
		
	}
?>