<?php

class View {

    function __construct() {
        //echo 'this is the view';
    }

    public function render($name)    {
        require '../app/views/' . $name . '.php';    
    }
	
	 public function insert($filename)    {
        echo  '<img src="private/'.$filename.'" class="img-responsive" /> '; 
    }
	
	public function buildpage($content = 'index', $area = ''){
		
		switch ($area) {
			case 'doctor':				
				$head 	= "panel/head";
				$nav 	= "panel/nav";
				$footer = "panel/footer";
				$ruta	 = '';
				break;
			
			case 'settings':				
				$head 	= "settings/default/head";
				$nav 	= "settings/default/nav";
				$footer = "settings/default/footer";
				$ruta	 = '';
				break;
				
			default:				
				$head 	= "default/head";
				$nav 	= "default/nav";
				$footer = "default/footer";	
				$ruta 	= '';			
				break;
		}
		
		
		$this->render($head);			
		$this->render($nav);		
		$this->render($ruta.$content);		
		$this->render($footer);
	
	}
		
	
	//Redirects from all Controllers to Settings Controller
	
	public function settings ($method = 'index', $param1 ='', $param2 ='',$param3 ='') { //Added 27-10-13
		
		$out = '';
		
		if ($param1 !== '') {
				$method .= '/'.$param1;
				$out 	.= '../';
			}
			if ($param2 !== '') {
				$method .=  '/'.$param2;
				$out 	.= '../';
			}
			if ($param3 !== '') {
				$method .= '/'.$param3;
				$out 	.= '../';
			}			
			
			header('location:../../'.$out.'settings/'.$method);
	}
}
?>