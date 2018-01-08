<?php
	class desktopController extends Controller {
		public function __construct() {
	
			parent::__construct();
			Auth::handleLogin();
			$this->view->title = SITE_NAME. ' | Desktop';
	        $this->view->user = $this->user->getUserdata();
		}
		
		public function index() {
			$this->view->render("app/default/head");
			$this->view->render("app/default/nav");
			$this->view->render("app/clear");
			$this->view->render("app/default/footer");
		}	

		public function welcome() {
			/*$hasBoards = Api::boards("array", "from", $this->view->user[0]['id']);
			if ($hasBoards[0]['empty'] == 1){
			//No boards, show tutorial
				$this->view->render("app/welcome/tutorial");
			} else {
			//else show latest activity
				$this->view->render("app/welcome/activity");
			}*/
			echo "d";
		}

		public function egresos($action = '') {
			switch ($action) {
				/*case 'add':
					$this->view->render("app/board/add");
					break;*/				
				default:
					$this->view->render("app/egresos/list");
					break;
			}
		}
		
	}
?>