<?php
	class desktopController extends Controller {
		public function __construct() {
	
			parent::__construct();
			Auth::handleLogin();
		}
		
		public function index() {
			print_r($_SESSION);	
			echo "hi"; //$this->loginscreen();
		}	
		
	}
?>