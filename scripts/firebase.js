		
	
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
	
	var gameList = new Array();
	var i = 0;
	var j = 0;
	var robes = firebaseVar.child('robes');
	var spells = firebaseVar.child('spells');

	
	var instanceVar;
	var gamerVar;
	var chatVar;


	chatVar.on('child_added',function (snapshot) { 		
								var message = snapshot.val();
								message = message.text;
								addChatMessage(message);
							});

	firebaseVAr.child('instances').on('child_added',function (snapshot) {
														if(!snapshot.child('player/id').exists()) {
															gameList[i++] = snapshot;
														}

	})
							
	
	
							
	$('#vitalrobe').click(assignRobe('vitality'));
	$('#demonrobe').click(assignRobe('demonic'));
	
		function picRobe(id){
			$('#'+id).html("<div id='picrobe'><button id='vitalrobe'> Weareth Vitality Robe </button><br/><button id='demonrobe'> Ja Demonic Robe </button></div>");

		}
		
		
		function newGame(){
			var newGame = userVar.child('games').push('host');
			var currentGame = userVar.child('games/current').set(newGame.name());
			firebaseVar.child('instances/'+currentGame.val()+'/info/host/id').set(auth.id);
			gamerVar = firebaseVar.child('instances/'+currentGame.val()+'/info/host');
			picRobe('newgame');
		
		}

		function showGames(){
			$('#joingame').html("<ol id='games'></ol>");
			for(j=0;j<=i;j++) {
				var buttonText = 'against '+gameList[j].child('info/host/id').val()+' in '+gameList[j].child('info/host/robe').val()+' robe.';
				var instanceid = gameList[j].name();
				$('#games').append("<li><button onclick='chooseGame("+j+")''>"+buttonText+"</button></li>");
			}
	
		}

		function chooseGame(num){
			var newGame = userVar.child('games').child(gameList[num].name()).set('player');
			var currentGame = userVar.child('games/current').set(newGame.name());
			firebaseVar.child('instances/'+currentGame.val()+'/info/player/id').set(auth.id);
			gamerVar = firebaseVar.child('instances/'+currentGame.val()+'/info/player');

			picRobe('games');

		}

		function myGames(){
			$('#mygames').html("<ol id='listmygames'></ol>");

		}

		function assignRobe(robe){
			gamerVar.child('robe').set(robe);
			$('#picrobe').html('<a href="play.html"><button>Lets Play then!</button></a>')

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
		