<?php

	class egresosController extends Controller {

		public function __construct() {
	
			parent::__construct();
			Auth::handleLogin();
		}
		
		public function index() {
			print_r($_SESSION);
			DB::debugMode(true);
			$this->view->titulo = 'Egresos';
			$this->view->userdata = $this->user->getUserdata();
								
			//$this->render('comprobantes');
		}	
		
	}
?>