<?php
class Api extends ApiQuery {

	public function __construct() {

	}
	// 	api/get/json/egresos_comprobantes/
									  // /id/150
	public function get($print = "json", $what, $param, $id, $data = "false") {
		
		/*echo "<pre>";
	    print_r($_REQUEST);
	    echo "</pre>";
*/
	    $draw = $_REQUEST['draw'];

	    //order
	    //start
	    //lenght

		$what = escape_value($what);
		$id = escape_value($id);
		$param = escape_value($param);

		if ($per_page != "") {
			
		}

		$array_entity  = ApiQuery::get($what, $param, $id);
		$profileFields = DB::columnList($what);
		
		$i = 0;
		if ($data == "true") {
			//This would be used for jquery.DataTable to convert array to 'data'
			$what = "data"; 
		} 

		$array_final['draw'] = 0;
		$array_final['recordsTotal'] = count($array_entity);

		//if !($_REQUEST['search']) {
	    	$array_final['recordsFiltered'] = count($array_entity);
	    //} else {

	    //}
		
	    foreach ($array_entity as $Entity) {

	    	$array_final[$what][$i][] 	= $Entity['id'];
	    	$array_final[$what][$i][] 	= $Entity['beneficiario'];
			/*foreach ($Entity as $key => $value) {				
				$array_final[$what][$i][] 	= $value;				
			}*/
			$i++;
		}
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
			echo json_encode($array_final, JSON_UNESCAPED_UNICODE);
			/*echo json_encode(
				SSP::simple( $_GET, $sql_details, $table, $primaryKey, $columns )
			);*/
		} else {//modo "array"
			return $array_final;
		}
	}

}
?>