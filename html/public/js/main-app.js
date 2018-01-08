require.config({
  baseUrl: "http://localhost/QB/html/public/js",
  requireDefine:true,
  waitSeconds:200,
    //Include the FileUpload as a package, so it can load all its own dependencies
    packages: [
    {
      name: "jquery.fileupload",
      location:"assets/fileupload/",
      main: "jquery.fileupload-ui"
    }
    ],
    paths: {
      'jquery':[ '//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min','assets/jquery.min'],
      jqueryui:[ '//ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min'],
      'async': 'assets/requirejs-plugins/async',    
      popper:[ '//cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min'],
      slim:  [ '//code.jquery.com/jquery-3.2.1.slim.min'],
      bootstrap: "//maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap",

      
      //File uploader external dependencies...
      'jquery.ui.widget':'assets/fileupload/jquery.ui.widget',        
      'tmpl':'assets/fileupload/external/jquery.tmpl.min',
      'load-image':'assets/fileupload/external/load-image',
      'load-image-ios':'assets/fileupload/external/load-image-ios',        
      'load-image-exif':'fileuploader/external/load-image-exif',
      'load-image-meta':'assets/fileupload/external/load-image-meta',
      'canvas-to-blob':'assets/fileupload/external/canvas-to-blob.min'
    },  

    shim: {
      'jquery': {
        exports: '$'
      },
      gmaps: {
        exports: 'google',
        exports: '$',
      },       
      'bootstrap.min': {
        deps: ['jquery',"popper"],
        exports: '$'
      },
      'assets/all': ['jquery'],
      'assets/bootstrap.min' : ['jquery'],
      'assets/jquery.validate.min': ['jquery'],
      'assets/jquery.easing.min': ['jquery'],   
      'assets/jquery.scrollTo.min': ['jquery'], 
      'assets/slidebars.min': ['jquery'], 
      'functions': ['jquery', 'assets/jquery.validate.min'],
      'appassets/stepform' : ['jquery', 'globals', 'assets/jquery.validate.min'],
      'assets/handlebars.min' :['jquery'],
      'assets/bootstrap-editable.min':['jquery','assets/bootstrap.min'],
      'assets/jquery.dataTables.min': ['jquery','assets/bootstrap.min'],
      //'assets/jquery.maskedinput.min': ['jquery'],
      //'assets/dataTables.bootstrap': ['jquery', 'assets/bootstrap.min', 'assets/jquery.dataTables.min'], 
      //'paging': ['jquery','assets/jquery.dataTables.min'],
      //'assets/fullcalendar.min': ['jquery'/*,'assets/fullcalendar-es'*/],
      'assets/jquery.geocomplete.min' : ['jquery'],
      'assets/bootstrap-datetimepicker-v4':['jquery','assets/bootstrap.min'],
      'assets/ jquery.carouFredSel-6.1.0-packed':['jquery','assets/easing.min'],

      'common': ['jquery','assets/all','assets/jquery-ui.min','assets/bootstrap.min',
      'assets/jquery.validate.min','assets/jquery.easing.min',
      'assets/bootstrap-editable.min','assets/jquery.scrollTo.min','assets/bootstrap-datetimepicker-v4','assets/jquery.geocomplete.min','assets/moment.min','assets/fullcalendar.min','assets/jsonsql','functions','config'],
      'app/app': ['jquery','common', 'globals','assets/jquery.validate.min', 'app/posts'],
      'app/login': ['jquery','globals','assets/jquery.validate.min'],
      'app/egresos': ['jquery', 'globals','assets/jquery.dataTables.min'],
      'app/hashchange': ['common', 'assets/handlebars.min', 'app/login'],
      }
    });

require([
  'jquery',
    'globals', //would replace 'common' eventually
    'app/hashchange'
    ],
    function($, app, start) { 

      var accessArray = window.location.pathname.split('/');
      var accessHash = $.param.fragment();
      var accessHashPart = accessHash.split('/');

      console.log("Access:" + accessArray +" Hash:" + accessHash);

      switch(accessArray[3]) {
        case "":
          require(['app/login'], function(login) {              
            login.run();
          }); 
          break;    
      }      
      

    });