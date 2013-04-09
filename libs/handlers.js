var spells;

		//document.getElementById is lengthy -_-
		function docGet(id){
			return document.getElementById(id);
		}
		
		$(window).resize( function(){
			fixHeight()
		});
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

		function select(elm){
			$(elm).css("border-color","white");
			$(elm).css("border-width","2px");
			$(elm).fadeTo("fast","1.0")
			updateSpellInfo($(elm).attr("src"))
		}

		function deselect(elm)
		{
			$(elm).css("border-color","black");
			$(elm).fadeTo("fast","0.9")
		}
		//Initial Load
		function loadSpells(){
			var req = new XMLHttpRequest()
			req.onload = function(){ 
					if(req.status != 200)
						alert("Something went wrong. The spells could not be loaded.")
					else 
					{
						spells = JSON.parse(req.response)
						updateSpellList()
					}

			}
			req.open("GET","https://spellcraftbase.firebaseio.com/spells.json",true);
			req.send();
		}

		//This centers the container vertically on different window sizes.
		function fixHeight(){
			var container = docGet("container")
			if(window.innerHeight > container.clientHeight)
				container.style.marginTop = ((window.innerHeight - container.clientHeight) /2) + "px"
		}
		//There ain't a single method for String to convert a string to number.
		function toNumber(str){
			var ret = 0;
			for(var i = 0; i < str.length; ++i)
				ret = ret*10 + (str.charCodeAt(i) - 48);
			return ret;
		}
		function removeScores(str){
			var ret = ""
			str = str[0].split("_")
			for(i=0; i < str.length;++i)
				ret += str[i] + " "
			return ret
		}	
		function updateBars(dueler,life,mana){
			var lifebar = docGet(dueler + 'lifefill');
			var manaBar = docGet(dueler + 'manafill');
			var lifeChange = toNumber(life)*10;
			var manaChange = toNumber(mana)*10;
			$(document).ready( function(){

				$(lifebar).animate({width: lifeChange + "%" },"fast");
				$(manaBar).animate({width: manaChange + "%"},"fast");
			});
		}
		//This one updates the player's or enemy's attributes shown in the page
	        //with the given attribute state changes.
		//Still got a lot of work to do.
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
				var spellName = /[(a-z)(A-Z)_']+/.exec(/[(a-z)(A-Z)_']+\..+$/.exec(spellUrl))
					docGet("spellMana").innerHTML = "Mana : " + spells[spellName]["mana"]
					docGet("spellLife").innerHTML = "Life : " + spells[spellName]["life"]
					docGet("spellInfo").innerHTML = spells[spellName]["description"]
					docGet("spellName").innerHTML = removeScores(spellName)
				
			}
		}

