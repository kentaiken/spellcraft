
// Globals
//---------------------------------------------------------------------------------------------------- 


var spells;
var spellsScroller;
var spellsScrollbar;


var chatScroller;
var chatScrollbar;
var chatScrollWrapper;
var chatScrollbarWrapper;

// Helpers 
//----------------------------------------------------------------------------------------------------
		function docGet(id){
			return document.getElementById(id);
		}

		function toNumber(str){
			var ret = 0;
			for(var i = 0; i < str.length; ++i)
				ret = ret*10 + (str.charCodeAt(i) - 48);
			return ret;
		}
// Handlers
//----------------------------------------------------------------------------------------------------
		
		function setChatScroll(){
				chatScrollWrapper = docGet("scrollChat")
				chatScrollbarWrapper = docGet("scontainer")
				chatScroller = new jsScroller(chatScrollWrapper,100,100)
				chatScrollbar = new jsScrollbar(chatScrollbarWrapper,chatScroller,false)
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
		function fixHeight(){
			var container = docGet('container')
			container.style.height = window.innerHeight - 85;
		}


		//Tracks window zooms and adjusts container's margin.
		$(window).resize( function(){
			fixMargin()
		});

		//Sets spell list icons after the initial loading.
		function updateSpellList(){
			var spelist = docGet("sl")
			var img;
			for(spell in spells)
			{
				img = document.createElement("img")
				img.className = "SpellListIcon"
				img.setAttribute("src", spells[spell]["img-url"])
				img.setAttribute("onmouseover","select(this)")
				img.setAttribute("onmouseout","deselect(this)")
				spelist.appendChild(img)
			}
		}

		//Selection effects for spell icons.
		function select(elm){
			$(elm).css("border-width","2px");
			$(elm).fadeTo(600,"1.0")
			updateSpellInfo($(elm).attr("src"))
		}

		function deselect(elm)
		{
			$(elm).fadeTo("fast","0.6")
		}
		
		//Implements a loading screen.
		function displaySplash(){
			var screen = document.createElement("div")
			var img = document.createElement("img")
			var sstyle = screen.style
			var message = document.createElement("span")

			message.style.display = "block"
			message.style.color = "white"
			message.innerHTML = "Loading Spells.."
			message.style.marginTop = "10%"
			message.style.fontStyle = "italic"
			message.style.letterSpacing = "5px"

			img.style.width = "200px"
			img.style.height = "20px"
			img.src = "public/images/loader.gif"
			img.style.marginTop = "40%"
			img.style.marginLeft = "4%"


			screen.setAttribute("id","splashScreen")
			sstyle.width = "300px"
			sstyle.height = "300px"
			sstyle.left = window.innerWidth/2 - 160
			sstyle.top = window.innerHeight/2 - 100
			sstyle.position  = "absolute"
			sstyle.zIndex = 2
			sstyle.fontSize = "20px"
			sstyle.textAlign = "center"
			sstyle.backgroundImage = "url('css/images/loadscreenbk.png')"
			screen.appendChild(message)
			screen.appendChild(img)
			document.body.appendChild(screen)
		}

		function removeSplash(){
			$(document).ready( function(){
				$("#splashScreen").fadeOut("slow")
			});
		}

		//Loads spells data.
		function loadSpells(){
			var req = new XMLHttpRequest()
			req.onloadstart = displaySplash()
			req.onload = function(){ 
					if(req.status != 200)
					{
						alert("Something went wrong. The spells could not be loaded.")
					}
					else 
					{
						removeSplash()
						spells = JSON.parse(req.response)
						updateSpellList()
						spellsScroller = new jsScroller(docGet("slcontainer"),100,100)
						spellsScrollbar = new jsScrollbar(docGet("sbcontainer"),spellsScroller,true)
					}

			}
			req.open("GET","https://spellcraftbase.firebaseio.com/spells.json",true);
			req.send();
		}

		//This centers the container vertically on different window sizes.
		function fixMargin(){
			var container = docGet("container")
			if(window.innerHeight > container.clientHeight + 60)
				container.style.marginTop = ((window.innerHeight -  (container.clientHeight+60)) /2) + "px"
		}
	
		//Updates player/enemy's life and mana attrs.
		function updateStatus(dueler,life,mana){
			var lifeElm = docGet(dueler + "Life");
			var manaElm = docGet(dueler + "Mana");
			lifeElm.innerHTML = toNumber(lifeElm.innerHTML) + life;
			manaElm.innerHTML = toNumber(manaElm.innerHTML) + mana;

		}
		
		//Updates the spell info section with the selected spell's info.
		function updateSpellInfo(spellUrl){
			if(spells != null)
			{
				var spellName = /[\w']+/.exec(/[\w']+\..+$/.exec(spellUrl))
					docGet("spellMana").innerHTML = "Mana : " + spells[spellName]["mana"]
					docGet("spellLife").innerHTML = "Life : " + spells[spellName]["life"]
					docGet("spellInfo").innerHTML = spells[spellName]["description"]
					docGet("spellName").innerHTML = spellName[0].replace(/_/," ")
				
			}
		}

