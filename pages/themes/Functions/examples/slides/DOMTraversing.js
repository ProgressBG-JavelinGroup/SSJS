function traverseDOM(node) {
     if (node.className == 'red') {
         node.style.color = "red";
     }

     node.childNodes.forEach(function(nestedNode) {
         traverseDOM(nestedNode);
     });
 }

 traverseDOM(document.body);