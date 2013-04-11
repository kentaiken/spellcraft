
// Globals
//---------------------------------------------------------------------------------------------------- 


var spells;


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

		function fixHeight(){
			var container = docGet('container')
			container.style.height = window.innerHeight - 10;
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
			$(elm).css("border-color","#FEFFDB");
			$(elm).css("border-width","2px");
			$(elm).fadeTo("fast","1.0")
			updateSpellInfo($(elm).attr("src"))
		}

		function deselect(elm)
		{
			$(elm).css("border-color","black");
			$(elm).fadeTo("fast","0.9")
		}
		
		//Implements a loading screen.
		function displaySplash(){
			var screen = document.createElement("div")
			var img = document.createElement("img")
			var sstyle = screen.style
			var message = document.createElement("span")

			message.style.display = "block"
			message.style.color = "cyan"
			message.innerHTML = "Loading Spells.."
			message.style.marginTop = "10%"
			message.style.fontStyle = "italic"
			message.style.letterSpacing = "5px"

			img.style.width = "200px"
			img.style.height = "20px"
			img.src = "public/images/loader.gif"
			img.style.marginTop = "40%"
			img.style.marginLeft = "5%"


			screen.setAttribute("id","splatScreen")
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
			document.body.removeChild(docGet("splatScreen"))
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
					}

			}
			req.open("GET","https://spellcraftbase.firebaseio.com/spells.json",true);
			req.send();
		}

		//This centers the container vertically on different window sizes.
		function fixMargin(){
			var container = docGet("container")
			if(window.innerHeight > container.clientHeight)
				container.style.marginTop = ((window.innerHeight - container.clientHeight) /2) + "px"
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

