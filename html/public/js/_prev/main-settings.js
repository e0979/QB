require.config({
    baseUrl: "http://localhost/QB/html/public/js",
    requireDefine:true,
    waitSeconds:200,
    paths: {
          jquery:[  'assets/jquery.min', '//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min'], // 2.0.0
          'async': 'assets/requirejs-plugins/async',          
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
            deps: ['jquery'],
            exports: '$'
          },
          'assets/all': ['jquery'],
          'assets/bootstrap.min' : ['jquery'],
          'assets/jquery.validate.min': ['jquery'],
          'assets/jquery.easing.min': ['jquery'],   
          'functions': ['jquery', 'assets/jquery.validate.min'],
          'assets/fullcalendar.min': ['jquery'],
         'assets/jquery.geocomplete.min' : ['jquery'],
         'assets/bootstrap-datetimepicker':['jquery','assets/bootstrap.min'],
         
         'common': ['jquery','assets/all','assets/jquery-ui.min','assets/bootstrap.min','assets/jquery.validate.min','assets/jquery.easing.min','assets/jquery.scrollTo.min','assets/jquery.backstretch.min','assets/bootstrap-datetimepicker','assets/jquery.geocomplete.min','assets/moment.min','assets/fullcalendar.min','functions','config'],
         'app/settings': ['jquery','common', 'globals'],
         
       }
});
require([
    'jquery',
    'globals', //would replace 'common' eventually
    'app/settings'
    ],
    function($, app, start) { 

      require(['app/settings'], function(settings) {              
        settings.run();
      });

    }
);