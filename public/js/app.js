'use strict';

function dragstart_handler(event) {
  console.log('In dragstart')
  console.log('  ', event.target.id);
  event.dataTransfer.setData('text/plain', event.target.id);
  event.dropEffect = 'move';
}

function dragover_handler(ev) {
  console.log('In dragover')
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
}

