		
	
	var firebaseVar = new Firebase('https://the-spellcraft.firebaseio.com');
	var userVar;
	var auth = new FirebaseSimpleLogin(firebaseVar, function (error, user) {
																	if (error) {
																	// an error occurred while attempting login
																		alert(error);
																			} else if (user) {
																					// user authenticated with Firebase
																						alert('User ID: ' + user.id + ', Provider: ' + user.provider);
																						userVar = firebaseVar.child('users').child(user.id);
																						} else {
																							// user is logged out
																							}
																		});
	
	
	
	var robes = firebaseVar.child('robes');
	var spells = firebaseVar.child('spells');
	var playerRobe;
	var enemyRobe;
	
	var instanceVar;
	var chatVar;
	var player;
	var enemy;
	var events;

	chatVar.on('child_added',function (snapshot) { 		
								var message = snapshot.val();
								message = message.text;
								addChatMessage(message);
							});
							
	
	
							
	$('#vitalrobe').click(assignRobe('vitality'));
	$('#demonrobe').click(assignRobe('demonic'));
	
		function picRobe(id){
			$('#'+id).html("<a href='play.html'><button id='vitalrobe'> Weareth Vitality Robe </button><button id='demonrobe'> Ja Demonic Robe </button></a>");
		}
		
		
		function newGame(){
			instanceVar = firebaseVar.child('instances').push();
			chatVar = instanceVar.child('chat');
			player = instanceVar.child(auth.id);
			events = instanceVar.child('events');
			
			userVar.child('current_game').set(instanceVar.name());
			picRobe('newgame');
		
		}

		function showGames(){
			
		
		}
			
			
		
				
		function saveChatMessage(){
			if($('#inputBox').val()){
				var text = $('#inputBox').val();
				chatVar.push({name: docGet('playerName').innerHTML,text: text});
				$('#inputBox').val('');
			}
		}

		function authLogin(){
			auth.login('password',{
				email: $("#useremail").val(),
				password: $("#userpasswd").val()
			});
		}
		
		
		
			
			
			
		
		