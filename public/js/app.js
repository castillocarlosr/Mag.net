'use strict';

console.log('working');

function dragstart_handler(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
  event.dropEffect = 'move';
}
