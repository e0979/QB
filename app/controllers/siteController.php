<?php
	class siteController extends Controller {
		public function __construct() {
	
			parent::__construct();
			//Auth::handleLogin();
		}
		
		public function index() {
			
			$this->loginscreen();
		}

		public function loginscreen() {
			
			$this->view->titulo = SITE_NAME. ' | login ';		
			$this->view->render('login');

		}
		
	}
?>