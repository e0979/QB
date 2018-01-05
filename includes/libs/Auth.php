<?php

	class Auth {
		/*
		 * evalua el controlador iniciado, 
		 * verifica segun los permisos si el usuario tiene acceso a ejecutar dicho controlador
		 * verifica si el usuario está previamente logeado y lo redirige
		 * verifica si el usuario tiene sesion vencida
		 */		
		public static function handleLogin($controller) {
			
			$area = 'miweb';
			
			@session_start();
			
			if (isset($_SESSION['loggedIn']	)) {
				
				//User is logged			
				$logged = $_SESSION['loggedIn'];
				
				$role 	  = $_SESSION['role'];
				$username = $_SESSION['username'];
				
				
				//validar tipo de session y redirect if needed
				$currentpage = Auth::getCurrentArea();
				switch ($currentpage[0]) {
			
					case 'account':
						
						/*switch ($currentpage[1]) {
							case 'firstlogin':		//it´s ok, go on						
								break;
							case 'authenticate':	//it´s ok, go on
								break;
							case 'profile':	//it´s ok, go on
								break;
							
							default:
								
								User::checkSession($controller); //check for session
								break;
						}						
						*/
						break;					
					
					/*case 'miweb':
						
						//check for valid role access
						echo $controller;
						//User::checkSession($controller); //check for session
						//redirect if already logged in
						break;
					 */
					 default:
						// echo $controller;
						 //check for valid role access
						User::checkSession($controller); //check for session
						break;
				
				}
				
				
				
			} else {
			// If No sessions	
			//Check if in Login Page
			$currentpage = Auth::getCurrentPage();	
			
			
			 switch ($currentpage[0]) {
				
				case 'account':
					break;
										
				default:
				
					if (!isset($logged)) {
						
						header('location: '. URL);			
						
					}
					break;
					
			}
			}
			
		
		}
		
	
		static function getCurrentPage() {
			
			$currentpage = $_SERVER['QUERY_STRING']; //$_SERVER['REQUEST_URI'];
			$currentpage = explode('/', $currentpage);
			
			if(isset($currentpage[1])){
				$currentpage[0] = $currentpage[1];
			}
		//	$currentpage = $currentpage[count($currentpage) - 1]; //Last segment of array
		//	$currentpage = $currentpage[1];
			//print_r($currentpage);	
			return $currentpage;
		}
		
		static function getCurrentArea() {
			
			$currentpage = $_SERVER['QUERY_STRING']; 
			$currentpage = explode('/', $currentpage);		
			
			//remove "url=" string in server's response
			$currentpage = str_replace("url=","", $currentpage);
			
			return $currentpage;
		}
		
	}

?>