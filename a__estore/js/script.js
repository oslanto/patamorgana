// 
//	jQuery Validate example script
//
//	Prepared by David Cochran
//	
//	Free for your use -- No warranties, no guarantees!
//

$(document).ready(function(){

	// Validate
	// http://bassistance.de/jquery-plugins/jquery-plugin-validation/
	// http://docs.jquery.com/Plugins/Validation/
	// http://docs.jquery.com/Plugins/Validation/validate#toptions
	$.validator.addMethod(
      "inDate",
      function (value, element) {
        // put your own logic here, this is just a (crappy) example 
        return value.match(/^(0?[1-9]|[12]\d|3[01])[\/\-](0?[1-9]|1[012])[\/\-](19\d{2}|20\d{2})$/);
      },
      "Please enter a date in the format dd-mm-yyyy"
    );
	
	jQuery.validator.addMethod("cekadd", function(value, element) {
        return this.optional(element) || /^[a-z0-9\-,.+/\s]+$/i.test(value);
		}, "Address must contain only letters, numbers, or dashes." );
		
	jQuery.validator.addMethod("alpha", function(value, element) {
        return this.optional(element) || /^[a-z0-9\-\s]+$/i.test(value);
		}, "Must contain only letters, numbers, or dashes." );
		
	jQuery.validator.addMethod("boxCheck",function (value, element)
    {
    if (element.value == "0") {return false;}
    else return true;
    }, "Required - select an option." );

		$('#verify').validate({
	    rules: {
	      fname: {
	        minlength: 2,
			alpha:true,
	        required: true
	      },
		  lname: {
	        minlength: 2,
			alpha:true
	      },
		  birth: {
	        required: true,
			//dateISO: true
			inDate:true
	      },
	      Email: {
	        required: true,
	        email: true
	      },
		  retypeEmail: {
	        required: true,
	        email: true,
			equalTo: "#Email"
	      },
		  Emailcari: {
	        email: true
	      },
		  mobile: {
	      	cekadd : true,
	        required: true
	      },
		   mobile2: {
	      	cekadd : true,
	        required: true
	      },
	      cardno: {
	      	//minlength: 2,
	        required: true,
		  	alpha :true,
			minlength: 4,
			maxlength:18
	      },
		  cardno2: {
	        required: true,
		 	alpha :true
	      },
		   Password: {
	        required: true,
			minlength: 8
	      },
		  address: {
	      	cekadd : true,
	        required: true
	      },
		  address2: {
	      	//minlength: 4,
	        cekadd : true
	      },
		  city: {
	      	//minlength: 4,
	        //required: true
			 boxCheck : true
	      },
		  postcode: {
	      	//minlength: 4,
	        required: true,
			maxlength: 5,
			minlength: 5,
			number:true
	      },
		  Card_Number: {
	      	minlength: 16,
			maxlength: 16,
			number: true,
	        required: true
	      },
		  Pin: {
	      	minlength: 8,
			number: true,
	        required: true
	      },
		 retype: {
			required: true,
			minlength:4,
      		equalTo: "#Password"
		 }
		},
	    highlight: function(label) {
	    	$(label).closest('.control-group').addClass('error');
	    },
	    success: function(label) {
	    	label
	    		.text('OK!').addClass('valid')
	    		.closest('.control-group').addClass('success');
	    }
	  });
	  
	  $('#create').validate({
	    rules: {
	    
	      Email: {
	        required: true,
	        email: true
	      },
		   password: {
	        required: true,
			minlength: 4
	      },
		  fname: {
	        minlength: 2,
			alpha:true,
	        required: true
	      },
		  lname: {
			alpha:true,
	        minlength: 2,
	        required: true
	      },
		  birth: {
	        required: true,
			date:true
	      },
		  cardno: {
	        required: true,
		    alpha :true,
			minlength: 4,
			maxlength: 18
	      },
		  cardno2: {
	        required: true,
		 	alpha :true
	      },
		  address: {
			cekadd : true,
	        required: true
	      },
		  address2: {
	        cekadd : true
	      },
		  city: {
	        //required: true
			 boxCheck : true
	      },
		  postcode: {
	        required: true,
			number:true,
			length: 5
	      },
		   card: {
	        boxCheck: true
	      },
		   reason: {
	        boxCheck: true
	      },
		 mobile: {
	      	cekadd : true,
	        required: true
	      },
		   mobile2: {
	      	cekadd : true,
	        required: true
	      }
		},
	    highlight: function(label) {
	    	$(label).closest('.control-group').addClass('error');
	    },
	    success: function(label) {
	    	label
	    		.text('OK!').addClass('valid')
	    		.closest('.control-group').addClass('success');
	    }
	  });
	
	 $('#create2').validate({
	    rules: {
	      fname: {
	        minlength: 2,
	        required: true
	      },
		  birth: {
	        required: true,
			date:true
	      },
		  cardno: {
	        required: true,
		 	alpha :true,
			minlength: 4,
			maxlength: 18
	      },
		  cardno2: {
	        required: true,
		 	alpha :true
	      },
		  address2: {
			cekadd : true,
	        required: true
	      },
		  address: {
			cekadd : true
	      },
		  city: {
	        //required: true
			 boxCheck : true
	      },
		  mobile: {
	      	cekadd : true,
	        required: true
	      },
		   mobile2: {
	      	cekadd : true,
	        required: true
	      },
		  postcode: {
	        required: true,
			number:true,
			length: 5
	      }
		},
	    highlight: function(label) {
	    	$(label).closest('.control-group').addClass('error');
	    },
	    success: function(label) {
	    	label
	    		.text('OK!').addClass('valid')
	    		.closest('.control-group').addClass('success');
	    }
	  });
	  
});
 // end document.ready
/*function loadTrans(){
			$("#details").hide();
	$("#trans").click(function() {
		//$('#details').toggle() 
		$("#details").toggle("slow");
      /* if($(this).text() == '+ View last 10 transactions')
       {
		  
           $(this).text('- View last 10 transactions');
		   
       }
       else
       {
           $(this).text('+ View last 10 transactions');
		        }
	});
		}*/

function loadReset(){
	$('#formReset').hide();
	$('#butRes').click(function() {
		$('#formReset').toggle() 
	});
}

function loadAdd(){
	$('#formAdd').hide();
	$('#add').click(function() {
		$('#formAdd').toggle() 
	});
}

