//Script for Rolling stats D&D 5e
//Made by Julexar (https://app.roll20.net/users/9989180/julexar)

//API Commands
//!rollstats <amount of rerolls>

var Rollstats = Rollstats || (function() {
    'use strict';
    
    var version='1.0',
    
    setDefaults = function() {
        state.stats = {
            now: {
                str: 0,
                dex: 0,
                con: 0,
                int: 0,
                wis: 0,
                cha: 0,
                stats: [],
            }
        };
    },
    
    handleInput = function(msg) {
       var args = msg.content.split(",");
        if (msg.type !== "api") {
			return;
		}
		switch (args[0]) {
		    case '!statsmenu':
		        statsmenu();
		        break;
		    case '!rollstats':
		        rollstats(args[1]);
		        break;
		    case '!setstr':
		        setstr(args[1]);
		        statsmenu();
		        break;
		    case '!setdex':
		        setdex(args[1]);
		        statsmenu();
		        break;
		    case '!setcon':
		        setcon(args[1]);
		        statsmenu();
		        break;
		    case '!setint':
		        setint(args[1]);
		        statsmenu();
		        break;
		    case '!setwis':
		        setwis(args[1]);
		        statsmenu();
		        break;
		    case '!setcha':
		        setcha(args[1]);
		        statsmenu();
		        break;
		    case '!choosegroup':
		        choosegroup(args[1]);
		        statsmenu();
		        break;
		}
    },
    
    statsmenu = function() {
        var divstyle = 'style="width: 220px; border: 1px solid black; background-color: #ffffff; padding: 5px;"';
        var astyle1 = 'style="text-align:center; border: 1px solid black; margin: 1px; background-color: #7E2D40; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 100px;';
        var astyle2 = 'style="text-align:center; border: 1px solid black; margin: 1px; background-color: #7E2D40; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 150px;';
        var tablestyle = 'style="text-align:center;"';
        var arrowstyle = 'style="border: none; border-top: 3px solid transparent; border-bottom: 3px solid transparent; border-left: 195px solid rgb(126, 45, 64); margin-bottom: 2px; margin-top: 2px;"';
        var headstyle = 'style="color: rgb(126, 45, 64); font-size: 18px; text-align: left; font-variant: small-caps; font-family: Times, serif;"';
        var substyle = 'style="font-size: 11px; line-height: 13px; margin-top: -3px; font-style: italic;"';
        sendChat("Stats Roller",'<div ' + divstyle + '>' + //--
            '<div ' + headstyle + '>Stats Roller</div>' + //--
            '<div ' + substyle + '>Menu</div>' + //--
            '<div ' + arrowstyle + '></div>' + //--
            '<table>' + //--
            '<div style="text-align:center;">Current Stats</div>' + //--
            '<tr><td>Strength: </td><td><a ' + astyle1 + '" href="!setstr,?{Value?|8}">' + state.stats.now.str + '</a></td></tr>' + //--
            '<tr><td>Dexterity: </td><td><a ' + astyle1 + '" href="!setdex,?{Value?|8}">' + state.stats.now.dex + '</a></td></tr>' + //--
            '<tr><td>Constitution: </td><td><a ' + astyle1 + '" href="!setcon,?{Value?|8}">' + state.stats.now.con + '</a></td></tr>' + //--
            '<tr><td>Intelligence: </td><td><a ' + astyle1 + '" href="!setint,?{Value?|8}">' + state.stats.now.int + '</a></td></tr>' + //--
            '<tr><td>Wisdom: </td><td><a ' + astyle1 + '" href="!setwis,?{Value?|8}">' + state.stats.now.wis + '</a></td></tr>' + //--
            '<tr><td>Charisma: </td><td><a ' + astyle1 + '" href="!setcha,?{Value?|8}">' + state.stats.now.cha + '</a></td></tr>' + //--
            '</table>' + //--
            '<br>' + //--
            '<div style="text-align:center;"><a ' + astyle2 + '" href="!rollstats,?{Number of Rerolls?|1}">Roll Stats</a></div>' + //--
            '</div>'
        );
    },
    
    setstr = function(num) {
        if (Number(num)>18) {
            sendChat("Stats Roller","The given Stat can\'t be higher than 18!");
        } else {
            state.stats.now.str=Number(num);
        }
    },
    
    setdex = function(num) {
        if (Number(num)>18) {
            sendChat("Stats Roller","The given Stat can\'t be higher than 18!");
        } else {
            state.stats.now.dex=Number(num);
        }
    },
    
    setcon = function(num) {
        if (Number(num)>18) {
            sendChat("Stats Roller","The given Stat can\'t be higher than 18!");
        } else {
            state.stats.now.con=Number(num);
        }
    },
    
    setint = function(num) {
        if (Number(num)>18) {
            sendChat("Stats Roller","The given Stat can\'t be higher than 18!");
        } else {
            state.stats.now.int=Number(num);
        }
    },
    
    setwis = function(num) {
        if (Number(num)>18) {
            sendChat("Stats Roller","The given Stat can\'t be higher than 18!");
        } else {
            state.stats.now.wis=Number(num);
        }
    },
    
    setcha = function(num) {
        if (Number(num)>18) {
            sendChat("Stats Roller","The given Stat can\'t be higher than 18!");
        } else {
            state.stats.now.cha=Number(num);
        }
    },
    
    rollstats = function(amount) {
        var str=[];
        var dex=[];
        var con=[];
        var int=[];
        var wis=[];
        var cha=[];
        var min;
        var stats=[];
        var j=0;
        var groupamount=Number(amount)+1;
        if (Number(amount)>=1) {
            for (let h=0;h<groupamount;h++) {
                var strtotal=0;
                var dextotal=0;
                var contotal=0;
                var wistotal=0;
                var inttotal=0;
                var chatotal=0;
                for (let i=0;i<4;i++) {
                    str[i]=randomInteger(6);
                    dex[i]=randomInteger(6);
                    con[i]=randomInteger(6);
                    int[i]=randomInteger(6);
                    wis[i]=randomInteger(6);
                    cha[i]=randomInteger(6);
                }
                min=Number(str[0]);
                for (let k=0;k<str.length;k++) {
                    if (min>Number(str[k])) {
                        min=Number(str[k]);
                    }
                }
                for (let k=0;k<str.length;k++) {
                    if (Number(str[k])!=min) {
                        strtotal+=Number(str[k]);
                    }
                }
                min=Number(dex[0]);
                for (let k=0;k<dex.length;k++) {
                    if (min>Number(dex[k])) {
                        min=Number(dex[k]);
                    }
                }
                for (let k=0;k<dex.length;k++) {
                    if (Number(dex[k])!=min) {
                        dextotal+=Number(dex[k]);
                    }
                }
                min=Number(con[0]);
                for (let k=0;k<con.length;k++) {
                    if (min>Number(con[k])) {
                        min=Number(con[k]);
                    }
                }
                for (let k=0;k<con.length;k++) {
                    if (Number(con[k])!=min) {
                        contotal+=Number(con[k]);
                    }
                }
                min=Number(int[0]);
                for (let k=0;k<int.length;k++) {
                    if (min>Number(int[k])) {
                        min=Number(int[k]);
                    }
                }
                for (let k=0;k<int.length;k++) {
                    if (Number(int[k])!=min) {
                        inttotal+=Number(int[k]);
                    }
                }
                min=Number(wis[0]);
                for (let k=0;k<wis.length;k++) {
                    if (min>Number(wis[k])) {
                        min=Number(wis[k]);
                    }
                }
                for (let k=0;k<wis.length;k++) {
                    if (Number(wis[k])!=min) {
                        wistotal+=Number(wis[k]);
                    }
                }
                min=Number(cha[0]);
                for (let k=0;k<cha.length;k++) {
                    if (min>Number(cha[k])) {
                        min=Number(cha[k]);
                    }
                }
                for (let k=0;k<cha.length;k++) {
                    if (Number(cha[k])!=min) {
                        chatotal+=Number(cha[k]);
                    }
                }
                stats[j]=strtotal;
                stats[j+1]=dextotal;
                stats[j+2]=contotal;
                stats[j+3]=inttotal;
                stats[j+4]=wistotal;
                stats[j+5]=chatotal;
                j+=6;
            }
        } else {
            var strtotal=0;
            var dextotal=0;
            var contotal=0;
            var wistotal=0;
            var inttotal=0;
            var chatotal=0;
            for (let i=0;i<4;i++) {
                str[i]=randomInteger(6);
                dex[i]=randomInteger(6);
                con[i]=randomInteger(6);
                int[i]=randomInteger(6);
                wis[i]=randomInteger(6);
                cha[i]=randomInteger(6);
            }
            min=Number(str[0]);
            for (let k=0;k<str.length;k++) {
                if (min>Number(str[k])) {
                    min=Number(str[k]);
                }
            }
            for (let k=0;k<str.length;k++) {
                if (Number(str[k])!=min) {
                    strtotal+=Number(str[k]);
                }
            }
            min=Number(dex[0]);
            for (let k=0;k<dex.length;k++) {
                if (min>Number(dex[k])) {
                    min=Number(dex[k]);
                }
            }
            for (let k=0;k<dex.length;k++) {
                if (Number(dex[k])!=min) {
                    dextotal+=Number(dex[k]);
                }
            }
            min=Number(con[0]);
            for (let k=0;k<con.length;k++) {
                if (min>Number(con[k])) {
                    min=Number(con[k]);
                }
            }
            for (let k=0;k<con.length;k++) {
                if (Number(con[k])!=min) {
                    contotal+=Number(con[k]);
                }
            }
            min=Number(int[0]);
            for (let k=0;k<int.length;k++) {
                if (min>Number(int[k])) {
                    min=Number(int[k]);
                }
            }
            for (let k=0;k<int.length;k++) {
                if (Number(int[k])!=min) {
                    inttotal+=Number(int[k]);
                }
            }
            min=Number(wis[0]);
            for (let k=0;k<wis.length;k++) {
                if (min>Number(wis[k])) {
                    min=Number(wis[k]);
                }
            }
            for (let k=0;k<wis.length;k++) {
                if (Number(wis[k])!=min) {
                    wistotal+=Number(wis[k]);
                }
            }
            min=Number(cha[0]);
            for (let k=0;k<cha.length;k++) {
                if (min>Number(cha[k])) {
                    min=Number(cha[k]);
                }
            }
            for (let k=0;k<cha.length;k++) {
                if (Number(cha[k])!=min) {
                    chatotal+=Number(cha[k]);
                }
            }
            stats[0]=strtotal;
            stats[1]=dextotal;
            stats[2]=contotal;
            stats[3]=inttotal;
            stats[4]=wistotal;
            stats[5]=chatotal;
        }
        var text="";
        j=0;
        if (groupamount>=2) {
            for (let i=0;i<groupamount;i++) {
                text+="<br>Your Group "+(i+1)+" Stats are:<br><br>Strength: "+stats[j]+"<br>Dexterity: "+stats[j+1]+"<br>Constitution: "+stats[j+2]+"<br>Intelligence: "+stats[j+3]+"<br>Wisdom: "+stats[j+4]+"<br>Charisma: "+stats[j+5]+"<br><br>";
                j+=6;
            }
        } else {
            text="Your Group 1 Stats are:<br><br>Strength: "+stats[0]+"<br>Dexterity: "+stats[1]+"<br>Constitution: "+stats[2]+"<br>Intelligence: "+stats[3]+"<br>Wisdom: "+stats[4]+"<br>Charisma: "+stats[5];
        }
        sendChat("Stats Roller",""+text);
        var divstyle = 'style="width: 220px; border: 1px solid black; background-color: #ffffff; padding: 5px;"';
        var astyle1 = 'style="text-align:center; border: 1px solid black; margin: 1px; background-color: #7E2D40; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 100px;';
        var astyle2 = 'style="text-align:center; border: 1px solid black; margin: 1px; background-color: #7E2D40; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 150px;';
        var tablestyle = 'style="text-align:center;"';
        var arrowstyle = 'style="border: none; border-top: 3px solid transparent; border-bottom: 3px solid transparent; border-left: 195px solid rgb(126, 45, 64); margin-bottom: 2px; margin-top: 2px;"';
        var headstyle = 'style="color: rgb(126, 45, 64); font-size: 18px; text-align: left; font-variant: small-caps; font-family: Times, serif;"';
        var substyle = 'style="font-size: 11px; line-height: 13px; margin-top: -3px; font-style: italic;"';
        if (groupamount==1) {
            state.stats.now.str=stats[0];
            state.stats.now.dex=stats[1];
            state.stats.now.con=stats[2];
            state.stats.now.int=stats[3];
            state.stats.now.wis=stats[4];
            state.stats.now.cha=stats[5];
            statsmenu();
        } else {
            var text="";
            for (let i=1;i<=groupamount;i++) {
                text+="|Group "+i;
            }
            sendChat("Stats Roller",'<div ' + divstyle + '>' + //--
                '<div ' + headstyle + '>Stats Roller</div>' + //--
                '<div ' + substyle + '>Menu</div>' + //--
                '<div ' + arrowstyle + '></div>' + //--
                '<div style="text-align:center;"><a ' + astyle2 + `" href="!choosegroup,?{Group?${text}|None}">Choose Group</a></div>` + //--
                '</div>'
            );
            state.stats.now.stats=stats;
        }
    },
    
    choosegroup = function(group) {
        var stats=state.stats.now.stats;
        if (group!="None") {
            group=group.split(' ');
            var num=Number(group[1])*6;
            state.stats.now.str=stats[num-6];
            state.stats.now.dex=stats[num-5];
            state.stats.now.con=stats[num-4];
            state.stats.now.int=stats[num-3];
            state.stats.now.wis=stats[num-2];
            state.stats.now.cha=stats[num-1];
        }
    },
    
    checkInstall = function() {
        if (!state.stats) {
            setDefaults();
        }
    },
    
    registerEventHandlers = function() {
        on('chat:message', handleInput);
	};

	return {
	    CheckInstall: checkInstall,
		RegisterEventHandlers: registerEventHandlers
	};
}());
on("ready",function(){
	'use strict';
	Rollstats.CheckInstall();
	Rollstats.RegisterEventHandlers();
});
