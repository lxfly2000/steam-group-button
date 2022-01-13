// ==UserScript==
// @name         Steam官方组按钮
// @namespace    https://github.com/lxfly2000/steam-group-button
// @version      1.1
// @updateURL    https://github.com/lxfly2000/steam-group-button/raw/master/steam-group-button.user.js
// @downloadURL  https://github.com/lxfly2000/steam-group-button/raw/master/steam-group-button.user.js
// @description  在Steam商店页和社区页添加官方组按钮
// @author       lxfly2000
// @match        *://steamcommunity.com/*
// @match        *://store.steampowered.com/*
// @icon         https://store.steampowered.com/favicon.ico
// @grant        none
// ==/UserScript==

function SteamGroupButton_AddButton(){
    var btns=document.getElementsByClassName("btnv6_blue_hoverfade");
    var rapp=new RegExp("(steamcommunity|store.steampowered).com/app/([0-9]+)","i");
    for (const itbtn of btns) {
        if(itbtn.href!==undefined&&rapp.test(itbtn.href)){
            var appid=itbtn.href.match(rapp)[2];
            var newNode=itbtn.cloneNode(true);
            newNode.href=location.protocol+"//steamcommunity.com/games/"+appid;
            newNode.innerHTML="<span>官方组</span>";
            itbtn.parentElement.insertBefore(newNode,itbtn);
            itbtn.parentElement.insertBefore(document.createTextNode(" "),itbtn);
            break;
        }
    }
}

function SteamGroupButton_AddGameAvatarsOption(){
    var adom=document.createElement("a");
    adom.className="popup_menu_item";
    adom.href=location.protocol+"//steamcommunity.com/actions/GameAvatars/";
    adom.textContent="修改头像";
    var dp=document.getElementById("account_dropdown");
    if(dp===undefined||dp===null){
        return;
    }
    var mp=dp.getElementsByClassName("popup_menu");
    if(mp.length===0){
        return;
    }
    mp[0].insertBefore(adom,mp[0].firstElementChild);
}

(function() {
    'use strict';

    if(/^\/app/.test(location.pathname)){
        SteamGroupButton_AddButton();
    }
    SteamGroupButton_AddGameAvatarsOption();
})();
