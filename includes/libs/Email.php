<?php
require_once ( LIBS . 'PHPMailer/class.phpmailer.php');
require_once ( LIBS . 'PHPMailer/class.smtp.php');

class Email extends PHPMailer{
	
    function __construct() {	
		
		$this->IsSMTP(); 
		$this->Host       = MAIL_HOST; 
		$this->SMTPDebug  = 0;         
		$this->SMTPAuth   = true;      
		$this->SMTPSecure = MAIL_SECURE;     
		$this->Host       = MAIL_SERVER; 
		$this->Port       = MAIL_PORT;
		$this->IsHTML(true);		
		$this->Password   = MAIL_PASSWORD;   
		$this->CharSet	  = EMAIL_ENCODE;
		
		 
    }
	
	public function sendMail($to, $from = SYSTEM_EMAIL, $subject = '', $body = '') {
			  
			  $this->Username  = $from;
			  $this->AddReplyTo($from); //('dlarez@besign.com.ve', 'First Last');
			  $this->AddAddress($to);
			  $this->SetFrom($from);
			  $this->Subject = $subject;
			  $this->MsgHTML($body);
			  $this->Send();
			  
		
   	}
	
	public function sendMailwithCC ($to, $from = SYSTEM_EMAIL, $subject = '', $body = '', $toCC1 ='', $toCC2 ='',$toCC3 ='' ) {
		
			  $this->Username  = $from;
			  $this->AddReplyTo($from);
			  $this->AddAddress($to);
			  if ($toCC1 !== '') {
			  	$this->AddCC($toCC1);
			  }
			  if ($toCC2 !== '') {
			  	$this->AddCC($toCC2);
			  }
			  if ($toCC3 !== '') {
			  	$this->AddCC($toCC3);
			  }
			  $this->SetFrom($from);
			  $this->Subject = $subject;
			  $this->MsgHTML($body);
			  $this->Send();
			 
		
	}
	

}
?>
