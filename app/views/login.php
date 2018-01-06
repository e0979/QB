<!DOCTYPE html>
<html lang="es">
<head>	
	<meta charset="<?php echo DB_ENCODE; ?>">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="">
	<meta name="author" content="">
	<link rel="shortcut icon" href="<?php echo IMG; ?>favicon.gif">

	<title><?php echo $this->title; ?></title>

	<link href="<?php echo CSS; ?>bootstrap.min.css" rel="stylesheet">
	<link href="<?php echo CSS; ?>bootstrap-editable.css" rel="stylesheet">
	<link href="<?php echo CSS; ?>font-awesome.min.css" rel="stylesheet">
	<link href="<?php echo CSS; ?>styles.css" rel="stylesheet">
	<link href="<?php echo CSS; ?>nq.css" rel="stylesheet">

	<?php echo GOOGLE_FONTS; ?>
	<?php echo GOOGLE_ANALYTICS; ?>
	
	
	<script data-main="<?php echo JS;?>main-app" src="<?php echo JS; ?>assets/require.js"></script>

</head>
<body class="home-login">
	
	<div class="onepcssgrid-1200">	
		<div id="container">
			<div class="clear"></div>
			<form id="form-login" role="form" class="form-signin">
				<h1 class="form-signin-heading text-muted quinbi-login"><!--img src="<?php echo IMG; ?>quinbi.png"--></h1>

				<input type="text" class="form-control user" id="email" name="email" required autofocus="">
				<input type="password" class="form-control password" id="password" name="password" required>
				<button id="send" type="submit" class=" btn btn-lg btn-login  btn-block">
						<i class="glyphicon glyphicon-log-in"></i>
					</button>
				<div class="clear" style="height:20px"></div>
				<div id="response-login"></div>
			</form>
		</div><!--end container -->
	</div>
</body>
</html>