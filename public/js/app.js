'use strict';


$('#register').on('submit', checkUsers);
$('#login').on('submit', loginUser);

function checkUsers(e) {
  e.preventDefault();
  console.log(e.target.username.value);
  console.log(e.target.Email.value);

  $.ajax({
    url: '/register',
    type: 'POST',
    data: {username: e.target.username.value, email: e.target.Email.value}
  })
    .done(response => {
      console.log(response);
      if (response === '1') {
        alert('username or email already taken');
      } else {
        location.href = '/fridge';
      }
    })

}

function loginUser(e) {
  e.preventDefault();
  console.log(e.target.Email.value);

  $.ajax({
    url: '/login',
    type: 'POST',
    data: {email: e.target.Email.value}
  })
    .done(response => {
      console.log(response);
      if (response === '1') {
        alert('This email is not registered. Head to the register page to sign up!');
      } else {
        location.href = '/fridge';
      }
    })
}


document.body.addEventListener('click', function(){
  document.getElementById('sidebar').classList.toggle('active');
  document.querySelector('.toggle-btn').classList.toggle('remove');
})

// SAVE X/Y COORDS TO DB BASED ON ID
let savePosition = (id, x, y) => {
  console.log('In savePosition');
  console.log(`ID: ${id} || X: ${x} || Y: ${y}`);

  $.ajax({
    method: 'POST',
    url: '/fridge',
    data: { magnetID: id, magnetX: x, magnetY: y }
  })
    .done($.get('/fridge'));
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
    contaiment: $('#fridgeImg'),
    cursor: 'move',
    revert: 'invalid',
    stop: function(event, ui) {
      console.log('In stop');
      console.log(`EVENT: ${event.target.id} || UI-X: ${ui.position.left} || UI-Y: ${ui.position.top}`);
      savePosition(event.target.id, ui.position.left, ui.position.top);
    }
  });

  $("#fridgeImg").droppable ({
    // over: function() {
    //   $(this).effect('shake');
    // },
    accept: '*'
  });
  
});

