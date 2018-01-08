<div class="col-lg-6 col-md-6">
	searchbar <input type="text" />
</div>
<div class="col-lg-6 col-md-6 text-right right">
	
	<img src="<?php echo IMG; ?>favico.jpg" class="img-circle" width="32" height="32" />
	<?php echo $this->user[0]['username']; ?>
	
	<ul class="nav navbar-nav">
		<li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown"><img src="<?php echo IMG; ?>icon-menu.png" class="pull-right" /></a>
          <ul class="dropdown-menu">
            <li class="divider"></li>
            <li><a href="<?php echo URL; ?>account/logout">Cerrar Sesión <span class="glyphicon glyphicon-log-out pull-right"></span></a></li>
          </ul>
        </li>
    </ul>
</div>