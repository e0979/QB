<?php
	
	//This is Session
	class User extends Hash {
		
		public function __construct() {
					
		}
		
		public static function init() {
			@session_start();
		}
		
		public static function set($key, $value) {
			
			if ($key === 'loggedIn') {
				$_SESSION['loggedIn'] = time();
				$_SESSION['randomkey'] = uniqid(rand(), true); //random session id 
				
			} else {	
				$_SESSION[$key] = $value;
			}
		}
		
		public static function get($key) {
			
			if (isset($_SESSION[$key])) {
				
      			return escape_value($_SESSION[$key]);
				
			} else {
				//	no setted
				return false;
			}
					
		}
		
		public static function destroy() {
				
			//unset($_SESSION);
			@session_destroy();			
			
		}
		
		
		/* Model Login */
		
		public function validatePassword($username, $data) {
				
			//retrieve hash from database
			
			$hash = $this->getHash($username);
			
			$hash = $hash[0]['pass_hash'];
			
		   	$result = $this->validate_password($data, $hash);
		 	
		   	return $result;
		   
		}
		
		public function validateRole($username, $area) {
				
			$role = $this->validateUsername($username);
			
			$role = $role[0]['role'];
			
			switch ($role) {

				case 'admin':
					
					return true;
					break;
			
								
				default:
					
					if($role === $area) {
						return true;
					
					} else {
						return false;
					}
					
					break;
			
			}
					   
		}
		
		
		
		
		
		public function getUserdata(){
			
			$user = $this->get('username');
			
			if (!empty($user)) {
				$role = $this->get('role');
			
				$table = $role; //'user_profile';
				$field = 'username';
									
				return DB::query("SELECT * FROM ". DB_PREFIX . $table ." WHERE ". $field ."=%s LIMIT 1", $user);
			}
		
		}
		
		
		
		static function checkSession($controller=''){
				
			$data  = User::get('username');
			$role  = User::get('role');				
			
			//Check if user valid
			$usr = new User();
			$check_uservalid = $usr->validateUsername($data);
			//Check if user is loggin first time
			$check_firsttime_session = DB::query("SELECT * FROM ". DB_PREFIX . "user_session WHERE username=%s LIMIT 1", $data);
			//Check if active session from User is already registered
			$check_previous_session = User::check_session_inDB($data);
			
			
			//El usuario no existe, existía una sesión vieja iniciada tal vez
		 	if(empty($check_uservalid)) {		 		
				User::destroy();
				header('location: '.URL);
				exit;	
		 	} else {
		 		
				//User exists, not fake session, do everything then
				User::activeSession();
			
				if(empty($check_firsttime_session)) {
					
					switch ($role) {
							
						// DISTRIBUIDOR password is self choised, so log and move on
						case 'cliente':
							
							if(empty($check_session)) { //if session not registered, log
								User::logSession($data);
							}
							break;
						
						default:
							//requieres Password Change First time	
							header('location: '.URL.'account/firstlogin/');
							exit;
							break;
					}
						
					
				} else {
					//Not first Session, so log and move on
					//Check if User is allowed to used this area or controlller
					
					User::checkPermissions($role, $controller);
					//If allowed, move on and log
					if(empty($check_session)) { //if session not registered, log
						User::logSession($data);
					}
					
					
				}
				
		 	}
			
		 	
		
		}
		
		static private function activeSession() {
			//TODO change to cookies??
			
			$session_limit = SESSION_LIMIT; // 5 minutes
			$role = User::get('role');
			
			$session_analysis = time() - $_SESSION['loggedIn'];
			
			if ($session_analysis < $session_limit) {
				//renew time 	
				$_SESSION['loggedIn'] = time();
				
			} else {
				echo("<script>alert('".USER_INACTIVE_MESSAGE."');window.location.replace('". URL . $role ."');</script>");
				User::destroy();
			}
						
		
		}
		
		static function logSession($username) {
			
			$check_previous_session = User::check_session_inDB($username);
			
			if (empty($check_previous_session)) {
				
				$array_session = array();
				$array_session['username'] 	 = $username;
				$array_session['session_randomkey'] = escape_value($_SESSION['randomkey']);
				$array_session['url_in'] = $_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
				$array_session['ip_address'] = Helper::getIpAddress();	
								
				Helper::insert('user_session', $array_session ,1);
			}
			
		}
		
		public function profile () {
			
			$view = new View();
			
			$view->titulo = "Configuración | Perfil";
			
			$view->render("settings/default/head");
			$view->render("settings/nav");
			$view->render("settings/password-change");
			$view->render("settings/footer");
			
		}
		
		//MODEL DATABASE
		
		public function validateUsername($data) {
			
			return DB::query("SELECT * FROM ". DB_PREFIX ."users WHERE username=%s LIMIT 1", $data);
		
		}
		private function getHash($username) {
			
			return DB::query("SELECT * FROM ". DB_PREFIX ."users WHERE username=%s LIMIT 1", $username);
			
		}
		
		static private function check_session_inDB ($username) {
				
			$randomkey = User::get('randomkey');			
			$check_session = DB::query("SELECT * FROM ". DB_PREFIX . "user_session WHERE username=%s AND session_randomkey='".$randomkey."' ORDER BY timestamp DESC LIMIT 1", $username);
			
			return $check_session;
		}
		
		
		public function checkPermissions ($role, $controller) {
			
			$permisos =	DB::query("SELECT * FROM " . DB_PREFIX . "users_role_permissions WHERE role=%s", $role);
			
			$permisos_result = json_decode($permisos[0]['permissions'], TRUE);
			
			foreach ($permisos_result as $key => $value) {
				//Check if Menu is authorized for user role
				if ($value == 1) { 
					$menu = DB::query("SELECT * FROM " . DB_PREFIX . "users_role_menu WHERE id=%s AND status='active' LIMIT 1", $key);	
					$authorized[] = $menu[0]['url'];							
				}
			}
			
			/*if ($controller == 'miweb') {
					
				$authorized_url[] = $permisos[0]['area'];
				
			} else {*/
			/*
			 * En este caso el nivel de autorizacion depende del controlador completo,
			 * no se evalua el metodo.
			 * Si se distinguirán niveles de acceso segun el metodo, hay que reformular 
			 * el handlelogin() para que obtenga el metodo convocado tambien
			 */
				foreach ($authorized as $key => $value) {
					//tomar controller autorizado
					$url = explode('/', $value);
					$authorized_url[] = $url[0];	
				}
				
			//}
			//If not Authorized, Redirect to authorized home
			if (!in_array($controller,$authorized_url)) {
				//print_r($_SESSION);
				echo "<h3 class='text-center'>".RESTICTED_AREA_SESSION."</h3>";				
				exit;
			}
			
			
		}
		
		
 		public static function gotoMainArea() {
			$role = User::get('role');
			$permisos =	DB::query("SELECT * FROM " . DB_PREFIX . "users_role_permissions WHERE role=%s", $role);

			header('location: '.URL.$permisos[0]['area']);
		}
		
		
					
	}
?>