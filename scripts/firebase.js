		
	
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
	
	var gameList = [];
	var i = 0;
	var j = 0;
	

	

	var gamerVar;
	var nGame;
	var currentGame;

	

	firebaseVar.child('instances').on('child_added',function (snapshot) {
														if(!snapshot.hasChild('info/player/id')) {
															gameList[i++] = snapshot;
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
			picRobe('newgame');
		
		}

		function showGames(){
			$('#joingame').html("<ol id='games'></ol>");
			for(j=0;j<i;j++) {
				var buttonText = 'Against '+gameList[j].child('info/host/id').val()+' in '+gameList[j].child('info/host/robe').val()+' robe.';
				
				$('#games').append("<li><button onclick='chooseGame("+j+")''>"+buttonText+"</button></li>");
			}
	
		}

		function chooseGame(num){
			userVar.child('games').child(gameList[num].name()).set('player',function (error) {
				if(!error) {
					currentGame = userVar.child('games/current');
					currentGame.set(gameList[num].name());
					firebaseVar.child('instances/'+gameList[num].name()+'/info/player/id').set(userVar.name());
					
					picRobe('games');
				}
				else	alert('Oops! The game Exists!');
			});
		}

		function myGames(){
			$('#mygames').html("<ol id='listmygames'></ol>");

		}

		function assignRobe(robe){
			gamerVar.child('robe').set(robe,alert('hello')); 
			$('#picrobe').html('<a href="play.html"><button>Lets Play then!</button></a>');

		}
			
			
		
				
		
		function authLogin(){
			auth.login('password',{
				email: $("#useremail").val(),
				password: $("#userpasswd").val()
			});
		}
		

		function authRegister() {
			auth.createUser($("#useremail").val(), $("#userpasswd").val(), function(error, user) {
  				if (!error) {
    				console.log('User Id: ' + user.id + ', Email: ' + user.email);
 				}
			});
		}
							