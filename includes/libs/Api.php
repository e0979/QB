<?php
class Api extends ApiQuery {

	public function __construct() {

	}
	// 	api/get/json/egresos_comprobantes/
									  // /id/150
	public function get($print = "json", $what, $param, $id, $data = "false") {

		$what = escape_value($what);
		$id = escape_value($id);
		$param = escape_value($param);

		
		$array_entity  = ApiQuery::get($what, $param, $id);
		$profileFields = DB::columnList($what);
		
		
		
		/*foreach ($array_entity as $Entity) {
			//$array_final[$what][$i] = $Entity; //CON FIELDS y VALUE
			$i++;
		}*/

		require( 'dataTables/ssp.class.php' );
		
		$sql_details = array(
			'user' => DB_USER,
			'pass' => DB_PASS,
			'db'   => DB_NAME,
			'host' => DB_HOST
		);
		
		$columns = array(
			array( 'db' => 'id',  'dt' => 0 ),	
			array( 'db' => 'beneficiario', 'dt' => 1 )
				
		);

		$table = $what;
		$primaryKey = 'id';
		//$columns
		//print_r($array_final);
		if ($print == 'json') {
			//echo json_encode($array_final, JSON_UNESCAPED_UNICODE);
			echo json_encode(
				SSP::simple( $_GET, $sql_details, $table, $primaryKey, $columns )
			);
		} else {//modo "array"
			return $array_final;
		}
	}

}
?>