//Change Validation default Messages

jQuery.extend(jQuery.validator.messages, {
	required : "requerido",
	email : "Hay un error con el correo.. revisalo!",
	url : "Esto no parece un URL...",
	date : "Please enter a valid date.",
	number : "Sólo números",
	digits : "Sólo números.",
	creditcard : "Please enter a valid credit card number.",
	equalTo : "los campos no coinciden",
	accept : "Please enter a value with a valid extension.",
	maxlength : jQuery.validator.format("Please enter no more than {0} characters."),
	minlength : jQuery.validator.format("Coloca al menos {0} caracteres."),
	rangelength : jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
	range : jQuery.validator.format("Please enter a value between {0} and {1}."),
	max : jQuery.validator.format("Please enter a value less than or equal to {0}."),
	min : jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});

// Datatable vars
language_emptytable = "No hay resultados";
language_processing = "Cargando...";
language_info = "_START_ - _END_ de _TOTAL_";
language_show = "_MENU_ items";
language_search = "Buscar: ";
language_search_placeholder = 'Escriba para filtrar...';


jQuery.validator.addMethod("check_age", function(value, element) {
	//this.optional(element) || /^(V|E|P|J|G)([0-9]{9})$/i.test(value);
	var fulldate = value; //this.optional(element).val();
	var fulldate = fulldate.split("/");
	var day = fulldate[0];
    var month = fulldate[1];
    var year = fulldate[2];
    var age =  18;

    var mydate = new Date();
    mydate.setFullYear(year, month-1, day);

    var currdate = new Date();
    currdate.setFullYear(currdate.getFullYear() - age);

    return currdate > mydate;
    
}, "Debes tener al menos 18 años para registrarte");