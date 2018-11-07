'use strict';

function dragstart_handler(event) {
  console.log(event.target.id);
  event.dataTransfer.setData('text/plain', event.target.id);
  event.dropEffect = 'move';
}


