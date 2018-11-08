'use strict';

$( function() {
  console.log('In draggable');
  $(".letterMag").draggable({
    drag: function(event, ui) {
      console.log(`EVENT: ${event.target.id} || UI ${ui.position.left}`);


    }
  });

  $(".memeMag").draggable({
    
  });

  $(".wordMag").draggable({
    
  });
});
