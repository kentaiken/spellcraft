		
	
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
	var nGame;
	var currentGame;

	chatVar.on('child_added',function (snapshot) { 		
								var message = snapshot.val();
								message = message.text;
								addChatMessage(message);
							});

	firebaseVar.child('instances').on('child_added',function (snapshot) {
														if(!snapshot.hasChild('info/player/id')) {
															gameList[i++] = firebaseVar.child('instances/'+snapshot.val());
															console.log('game '+i+' added');
														}

	});

							
	

	
	
		function picRobe(id){
			$('#'+id).html("<div id='picrobe'><button id='vitalrobe'> Weareth Vitality Robe </button><br/><button id='demonrobe'> Ja Demonic Robe </button></div><script> $('#vitalrobe').click(function () { assignRobe('vitality'); } ); $('#demonrobe').click(function () { assignRobe('demonic'); }); </script>");

		}
		
		
		function newGame(){
			nGame = userVar.child('games').push('host');
			currentGame = userVar.child('games/current');
			currentGame.set(nGame.name());
			
			firebaseVar.child('instances/'+nGame.name()+'/info/host/id').set(userVar.name());
			gamerVar = firebaseVar.child('instances/'+nGame.name()+'/info/host');
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
			nGame = userVar.child('games').child(gameList[num].name()).set('player');
			currentGame = userVar.child('games/current');
			currentGame.set(nGame.name());
			firebaseVar.child('instances/'+nGame.name()+'/info/player/id').set(auth.id);
			gamerVar = firebaseVar.child('instances/'+nGame.name()+'/info/player');

			picRobe('games');

		}

		function myGames(){
			$('#mygames').html("<ol id='listmygames'></ol>");

		}

		function assignRobe(robe){
			gamerVar.child('robe').set(robe,alert('hello')); 
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
		

	
							