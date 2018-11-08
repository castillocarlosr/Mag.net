'use strict';

// SAVE X/Y COORDS TO DB BASED ON ID
function savePosition(id, x, y) {
  console.log('In savePosition');
  console.log(`ID: ${id} || X: ${x} || Y: ${y}`);
  $.ajax
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
    accept: '*'
    // over: function() {
    //   console.log('In Droppable');
    //   $(this).animate({ 'border-width' : '1vw', 'border-color' : 'red' }, 500);
    //   $(".letterMag").draggable('option', 'containment', $(this));
    // }
  });
  
});

