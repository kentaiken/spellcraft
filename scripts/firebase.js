		
	
var firebaseVar = new Firebase('https://the-spellcraft.firebaseio.com/');
var auth = new FirebaseSimpleLogin(firebaseVar, function (error, user) {

	if (error) {
	    // an error occurred while attempting login
	    alert(error);
	  } else if (user) {
	    // user authenticated with Firebase
	   $(document).ready( function(){

		   $("#logout").show();
			
		   $.ajax({
			    url: "user_home.html"
		   })
		   .done( function(data){
			
			    $(".login").hide();
			    $(".content").html(data);
			    $("#username").append(user.id);

		    });
	   });
	} else {
	    // user is logged out
	     $(document).ready( function(){

		     $("#logout").hide();
		     $(".login").show();
		     $(document).ready( function(){
				$.ajax({
			        	url: "home.html"
		          	})
		   		.done( function(data){
			
				    $(".content").html(data);

		    		});
			});
	     });

	}
});
	
	
var instanceVar = firebaseVar.child('instances').push();
var chatVar = instanceVar.child('chat');
var player = instanceVar.child('player');
var enemy = instanceVar.child('enemy');
var events = instanceVar.child('events');

chatVar.on('child_added',function (snapshot){ 

	var message = snapshot.val();
	message = message.text;
	addChatMessage(message);
});
					
		
function saveChatMessage(){

	if($('#inputBox').val()){

		var text = $('#inputBox').val();
		chatVar.push({name: docGet('playerName').innerHTML,text: text});
		$('#inputBox').val('');
	}

}


$(document).ready( function(){
	$("#facebook_login").click( function(){

		auth.login('facebook',{
		});

	});
});


$(document).ready( function(){
	$("#email_login").click( function(){

		auth.login('password',{
			email: $("#useremail").val(),
			password: $("#userpasswd").val()
		});

	});
});


$(document).ready( function(){
	$("#logout").click( function(){

		auth.logout();

	});
});
		

		
