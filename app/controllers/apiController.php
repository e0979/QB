<?php
	class apiController extends Controller {
		public function __construct() {
	
			parent::__construct();
		}
		
		public function get($print = "json", $what, $param, $id, $data = "false") {
			//For Get All, leave $param and $id empty
			$this->api->get($print, $what, $param, $id, $data);
			//echo '{"draw":1,"recordsTotal":2,"recordsFiltered":2,"data":[["1", "Martin Polanco Yusti"],["2", "Kover, C.A."]]}';
		}		
	}
?>