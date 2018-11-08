'use strict';

// SAVE X/Y COORDS TO DB BASED ON ID
function savePosition(id, x, y) {
  console.log('In savePosition');
  console.log(`ID: ${id} || X: ${x} || Y: ${y}`);
}

// MAGNET DRAGGING LISTENERS AND HANDLERS
$( function() {
  $(".letterMag").draggable({
    drag: function(event, ui) {
      console.log('In draggable');
      console.log(`EVENT: ${event.target.id} || UI-X: ${ui.position.left} || UI-Y: ${ui.position.top}`);
      savePosition(event.target.id, ui.position.left, ui.position.top);
    }
  });

  $(".memeMag").draggable({
    
  });

  $(".wordMag").draggable({
    
  });
});
