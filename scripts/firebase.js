		
	
	var firebaseVar = new Firebase('https://the-spellcraft.firebaseio.com');
	var auth = new FirebaseSimpleLogin(firebaseVar, function (error, user) {
					  if (error) {
  									  // an error occurred while attempting login
    								alert(error);
 									 } else if (user) {
  										  // user authenticated with Firebase
  											  alert('User ID: ' + user.id + ', Provider: ' + user.provider);
 												 } else {
 															   // user is logged out
 													 }
																});
		
	
	var instanceVar = firebaseVar.child('instances').push();
	var chatVar = instanceVar.child('chat');
	var player = instanceVar.child('player');
	var enemy = instanceVar.child('enemy');
	var events = instanceVar.child('events');

		chatVar.on('child_added',function (snapshot) { var message = snapshot.val();
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