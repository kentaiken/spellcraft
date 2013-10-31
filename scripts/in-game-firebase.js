var firebaseVar = new Firebase('https://the-spellcraft.firebaseio.com');
var userVar;
var userid;

var robesVar = firebaseVar.child('robes');
var spellsVar = firebaseVar.child('spells');
var gamerRole;
var enemyRole;
var instanceVar;
var gamerVar;
var gamerScoreVar;
var enemyScoreVar;
var chatVar;
var currentGame;
var auth = new FirebaseSimpleLogin(firebaseVar, function (error, user) {
																	if (error) {
																		alert(error);
																	} else if (user) {
																				alert('User ID: ' + user.id + ', Provider: ' + user.provider);
																				userid = user.id;
																				userVar = firebaseVar.child('users').child(user.id);
																				currentGame = userVar.child('games/current');
																				init();
																			} else {
																							
																				}
			});

var turn = 0;
var score = { gamer : { life : 10, mana : 10 }, enemy : { life : 10, mana : 10 } };

instanceVar.child('info/'+enemyRole+'/cast_spells').on('child_added',function (castspell) {
	spellsVar.child(castspell.val()).once('value',function (snapshot) {
																	score.enemy.life -= snapshot.child('life').val() - snapshot.child('plifechange').val();
																	score.enemy.mana -= snapshot.child('mana').val() - snapshot.child('pmanachange').val();
																	score.gamer.life += snapshot.child('oplifechange').val();
																	score.gamer.mana += snapshot.child('opmanachange').val();
																	saveValues();
																});
});

chatVar.on('child_added',function (snapshot)	{
								var message = snapshot.val();
								message = message.comment;
								addChatMessage(message);
							});


function init()	{
	currentGame.once('value',function (snapshot) { 
							instanceVar = firebaseVar.child('instances').child(snapshot.val());
							chatVar = instanceVar.child('chat');
							userVar.child('games').child(snapshot.val()).once('value',function (role) {
											gamerRole = role.val();
                                            gamerVar = instanceVar.child('info').child(role.val());
                                            gamerScoreVar = gamerVar.child('score').child(role.val());
                                            if(role.val() == 'host') {
                                              enemyRole = 'player';
                                              enemyScoreVar = gamerVar.child('score').child('player');
											}
                                            else	{
                                              enemyRole = 'host';
                                              enemyScoreVar = gamerVar.child('score').child('host');
                                            }
                                            gamerVar.child('cast_spells').once('value',function (snapshot) {
												if(!snapshot.val()) saveValues();
												else	loadValues();
											});	
							});
							
	});

	
}

function saveValues() {
	gamerVar.child('turn').set(turn);
	gamerScoreVar.child('life').set(score.gamer.life);
	gamerScoreVar.child('mana').set(score.gamer.mana);
	enemyScoreVar.child('life').set(score.enemy.life);
	enemyScoreVar.child('mana').set(score.enemy.mana);

}

function loadValues() {
	gamerVar.child('turn').once('value',function (snapshot) {
		turn = snapshot.val();
	});
	gamerScoreVar.once('value',function (snapshot) {
		score.gamer.life = snapshot.child('life').val();
		score.gamer.mana = snapshot.child('mana').val();
	});
	enemyScoreVar.once('value',function (snapshot) {
		score.enemy.life = snapshot.child('life').val();
		score.enemy.mana = snapshot.child('mana').val();
	});
}


function cast(spell)	{
	gamerVar.child('cast_spells').child(turn+1).set(spell,function (error) {
															if(!error)	{
																++turn;
																spellsVar.child(spell).once('value',function (snapshot) {
																	score.gamer.life -= snapshot.child('life').val() - snapshot.child('plifechange').val();
																	score.gamer.mana -= snapshot.child('mana').val() - snapshot.child('pmanachange').val();
																	score.enemy.life += snapshot.child('oplifechange').val();
																	score.enemy.mana += snapshot.child('opmanachange').val();
																	saveValues();
																});
															}
														});
	






}

function addChatMessage(message){

						
	  
			var chat = docGet('chat')
			var newMessage = document.createElement('span')	
			newMessage.setAttribute("class",'ChatMessage')
			newMessage.innerHTML = "<span class = 'SenderName'>" + docGet('playerName').innerHTML + " : </span> <span class ='ChatText'>"+ message + "</span> </br>"
			chat.appendChild(newMessage)
			newMessage.style.width = "100%"
			setChatScroll()
			chatScrollbar.scrollTo(0,docGet("chat").clientHeight)
			

		}


function saveChatMessage(){
			if($('#inputBox').val()){
				var text = $('#inputBox').val();
				chatVar.push({ user: userid, comment: text});
				$('#inputBox').val('');
			}
}
