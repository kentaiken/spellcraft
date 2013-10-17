		

		var firebaseVar= new Firebase('https://the-spellcraft.firebaseio.com');
		



		var chatVar = firebaseVar.child('chat');
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