'use strict';

// function dragstart_handler(event) {
//   console.log('In dragstart')
//   console.log('  ', event.target.id);
//   event.dataTransfer.setData('text/plain', event.target.id);
//   event.dropEffect = 'move';
// }

// function dragover_handler(event) {
//   console.log('In dragover')
//   event.preventDefault();
//   event.dataTransfer.dropEffect = 'move';
// }

// function drop_handler(event) {
//   console.log('In drop');
//   event.preventDefault();
//   let data = event.dataTransfer.getData('text/plain');
//   let selected = document.getElementById(data);
//   event.target.appendChild(document.getElementById(data));
//   selected.style.position = 'absolute';
//   selected.style.left = event.pageX - selected.offsetWidth / 2 + 'px';
//   selected.style.top = event.pageY - selected.offsetHeight / 2 + 'px';


// //   // grabMagnet(event,data);
// }


