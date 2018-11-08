'use strict';

// SAVE X/Y COORDS TO DB BASED ON ID
function savePosition(id, x, y) {
  console.log('In savePosition');
  console.log(`ID: ${id} || X: ${x} || Y: ${y}`);

  let magPositionUpdate = $.ajax({
    method: 'POST',
    url: '/fridge',
    data: { magnetID: id, magnetX: x, magnetY: y }
  });

  magPositionUpdate.done( msg => alert( 'Data Saved: ' + msg));
}

// MAGNET DRAGGING LISTENERS AND HANDLERS
$( function() {
  $(".letterMag").draggable({
    drag: function(event, ui) {
      console.log('In draggable');
      console.log(`EVENT: ${event.target.id} || UI-X: ${ui.position.left} || UI-Y: ${ui.position.top}`);
    },
    stop: function(event, ui) {
      console.log('In stop');
      console.log(`EVENT: ${event.target.id} || UI-X: ${ui.position.left} || UI-Y: ${ui.position.top}`);
      savePosition(event.target.id, ui.position.left, ui.position.top);
    },
    contaiment: $('#fridgeImg'),
    cursor: 'move',
    revert: 'invalid'
  });

  $(".memeMag").draggable({
    drag: function(event, ui) {
      console.log('In draggable');
      console.log(`EVENT: ${event.target.id} || UI-X: ${ui.position.left} || UI-Y: ${ui.position.top}`);
    },
    stop: function(event, ui) {
      console.log('In stop');
      console.log(`EVENT: ${event.target.id} || UI-X: ${ui.position.left} || UI-Y: ${ui.position.top}`);
      savePosition(event.target.id, ui.position.left, ui.position.top);
    },
    contaiment: $('#fridgeImg'),
    cursor: 'move',
    revert: 'invalid'
  });

  $(".wordMag").draggable({
    drag: function(event, ui) {
      console.log('In draggable');
      console.log(`EVENT: ${event.target.id} || UI-X: ${ui.position.left} || UI-Y: ${ui.position.top}`);
    },
    stop: function(event, ui) {
      console.log('In stop');
      console.log(`EVENT: ${event.target.id} || UI-X: ${ui.position.left} || UI-Y: ${ui.position.top}`);
      savePosition(event.target.id, ui.position.left, ui.position.top);
    },
    contaiment: $('#fridgeImg'),
    cursor: 'move',
    revert: 'invalid'
  });

  $("#fridgeImg").droppable ({
    over: function() {
      $(this).effect('shake');
    },
    accept: '*'
  });
  
});

