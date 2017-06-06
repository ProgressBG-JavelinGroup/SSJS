"use strict";

let hours_per_day = 8;
let articleNodes = document.querySelectorAll('.themes>article>section');
articleNodes.shown = true;
let subThemesNodes = document.getElementsByClassName('sub_themes');
subThemesNodes.shown = false;


window.onload = function(){
    init();
}
function init(){
    attachEvents();
    // setSubThemesLinks();
    setHours();
    calcTotalHours();
    calcTotalDays();
    calcThemeHours();
    hideAllNodes(subThemesNodes)
}
function attachEvents(){
    // onclick to themes/sub-themes titles:
    let titleNodes = document.querySelectorAll('.themes>article>h2, .themes>article h3');
    // console.log("titleNodes:", titleNodes);
    for (let i = 0; i < titleNodes.length; i++) {
        let element = titleNodes[i];
        element.addEventListener( "click", function(){
            // showHideNodes(this.nextElementSibling)
            // console.log("THIS:", this);
            showHideNodes(getNextSiblings(this));
        });
    };

    // onclick to toggleThemes button
    let toggleThemesNodes = document.querySelectorAll('.toggleThemes');
    for (let i = 0; i < toggleThemesNodes.length; i++) {
        let element = toggleThemesNodes[i];
        element.addEventListener( "click", function(){
            showHideAll( element, articleNodes );
        });
    };

    // onclick to toggleSubThemes button
    let toggleSubThemesNodes = document.querySelectorAll('.toggleSubThemes');
    // console.log("toggleSubThemesNodes:", toggleSubThemesNodes);
    for (let i = 0; i < toggleSubThemesNodes.length; i++) {
        let element = toggleSubThemesNodes[i];
        element.addEventListener( "click", function(){
            showHideAll( element, subThemesNodes );
        });
    };
}
function setSubThemesLinks(){
    var themesPath = 'pages/themes';

    // get subThemesNodes:
    let subThemesNodes = document.querySelectorAll(".themes>article>section");

    for (let i = 0, len = subThemesNodes.length; i < len ; i++) {
        let subThemeID, subThemeTitleNode, linkNode;
        try{
            subThemeID = subThemesNodes[i].id;
            subThemeTitleNode = subThemesNodes[i].querySelector("h3");

            // create link
            linkNode = document.createElement('a');
            linkNode.setAttribute("title", "slides");
            linkNode.href = themesPath + '/' + subThemeID + '/' + subThemeID + '.html';
            linkNode.innerHTML = subThemeTitleNode.innerHTML;

            subThemeTitleNode.innerHTML = '';
            subThemeTitleNode.appendChild(linkNode);

        }catch(e){
            console.log(e);
        }
    }

}
function setHours(){
    // get sections:
    let sections = document.querySelectorAll(".themes>article>section");

    // insert <span class="hours">2</span> after each h3
    for (let i = 0, len = sections.length; i < len ; i++) {
        // create output node:
        let outNode = document.createElement('span');
        outNode.className = 'subThemeHours';

        // get hours from data-time attribute of the section
        outNode.innerHTML = sections[i].getAttribute('data-time');

        sections[i].children[0].appendChild(outNode);
    }
}
function calcThemeHours(){
    // get themes:
    let themes = document.querySelectorAll(".themes>article");

    for (let i = 0, len = themes.length; i < len ; i++) {
        let currentThemeHours = 0;
        let themeHours = 0;

        // create output node:
        let outNode = document.createElement('span');
        outNode.className = 'themeHours';
        themes[i].children[0].appendChild(outNode);

        // calculate hours per section:
        let subThemeHoursNodes = themes[i].querySelectorAll(".subThemeHours");
        for (let i = 0, len = subThemeHoursNodes.length; i < len; i++) {
            themeHours += subThemeHoursNodes[i].childNodes[0].nodeValue*1;
        }

        currentThemeHours += themeHours;

        // output
        outNode.title = "total theme days:" + currentThemeHours/hours_per_day;

        outNode.innerHTML = "Theme Hours: " + themeHours;
    };
}
function calcTotalHours(){
    let out_node = document.getElementById("total_hours");
    let hours_nodes = document.getElementsByClassName("subThemeHours");
    let total = 0;
    for (let i = 0; i < hours_nodes.length; i++) {
        let theme_hours = hours_nodes[i].innerHTML*1 || 0; // cause of NaN
        total += theme_hours;
        // console.log("total hours=", total);
    };
    out_node.innerHTML = total;
}
function calcTotalDays(){
    let hours_nodes = document.getElementsByClassName("subThemeHours");
    let out_node = document.getElementById("total_days");
    let current_hours = 0;
    let total_days = 0;
    for (let i = 0; i < hours_nodes.length; i++) {
        let theme_hours = hours_nodes[i].innerHTML*1 || 0; // cause of NaN
        current_hours += theme_hours;

        // calculate current days and show it as tooltip
        let current_days;
        // if ( current_hours % hours_per_day > 0){
        //     current_days = Math.floor( current_hours / hours_per_day) + 1;
        // }else{
        //     current_days = Math.floor( current_hours / hours_per_day);
        // }

        // do not round:
        current_days = current_hours / hours_per_day;

        // output
        hours_nodes[i].title = "current hours:" + current_hours;
        hours_nodes[i].title += "\n"+"current days:" + current_days;

        total_days = current_days;
    };
    // calculate total days
    out_node.innerHTML = total_days;
}

function showHideAll( clicked_node, effected_nodes ){
   if (effected_nodes.shown) {
        hideAllNodes(effected_nodes);
        effected_nodes.shown = false;
        clicked_node.title = 'Hide Subtopics';
    }else{
        showAllNodes(effected_nodes);
        effected_nodes.shown = true;
        clicked_node.title = 'Show Subtopics';
    }
}
function showAllNodes ( effected_nodes){
    for (let i = 0; i < effected_nodes.length; i++) {
        showNode(effected_nodes[i]);
    };
}
function hideAllNodes ( effected_nodes){
    for (let i = 0; i < effected_nodes.length; i++) {
        hideNode(effected_nodes[i]);
    };
}
function showHideNodes(effected_nodes){
    // console.log('showHideNode - effected_nodes:'+effected_nodes);
    effected_nodes.forEach( function(effected_node){
        if ( effected_node.classList.contains("hidden") ){
            showNode(effected_node);
            effected_node.previousElementSibling.title = 'Hide Subtopics';
        }else {
            hideNode(effected_node);
            effected_node.previousElementSibling.title = 'Show Subtopics';
        }
    });
}
function showNode(effected_node){
    // console.log("showNode IN: effected_node", effected_node);
    // show node
    // effected_node.style.display = 'block';
    effected_node.classList.remove("hidden");

    // change title of the H3 element
    effected_node.parentElement.getElementsByTagName("h3")[0].title = 'Hide Subtopics';
    // change arrow
    let arr_node = effected_node.parentElement.getElementsByTagName("h3")[0];
    // console.log("arr_node:", arr_node);
    changeArrow( arr_node, 'up');
};
function hideNode (effected_node) {
    // console.log("hideNode IN: effected_node", effected_node);
    // hide node
    // effected_node.style.display = 'none';
    effected_node.classList.add("hidden");

    // change title of the H3 element
    effected_node.parentElement.getElementsByTagName("h3")[0].title = 'Show Subtopics';
    // change arrow
    let arr_node = effected_node.parentElement.getElementsByTagName("h3")[0];
    // console.log("arr_node:", arr_node);
    changeArrow( arr_node, 'down');
}
function changeArrow ( node, direction ) {
    if ( direction == 'up' ){
        node.classList.remove("arrow_down");
        node.classList.add("arrow_up");
    }else{
        node.classList.remove("arrow_up");
        node.classList.add("arrow_down");
    }
}



