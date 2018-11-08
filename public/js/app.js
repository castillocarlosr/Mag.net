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
  $.ajax({
    method: 'POST',
    url: '/fridge',
    data: { magnetID: id, magnetX: x, magnetY: y }
  })
    .done($.get('/fridge'));
}

// MAGNET DRAGGING LISTENERS AND HANDLERS
$( function() {
  $('.letterMag').draggable({
    cursor: 'move',
    revert: 'invalid',
    stop: function (event, ui) {
      $('#fridgeImg').on('drop',function(event, ui) {
        savePosition(event.target.id, ui.position.left, ui.position.top);
      });
    }
  });

  $('.memeMag').draggable({
    cursor: 'move',
    revert: 'invalid',
    stop: function (event, ui) {
      $('#fridgeImg').on('drop', function(event, ui) {
        savePosition(event.target.id, ui.position.left, ui.position.top);
      });
    }
  });

  $('.wordMag').draggable({
    cursor: 'move',
    revert: 'invalid',
    stop: function (event, ui) {
      $('#fridgeImg').on('drop',function(event, ui) {
        savePosition(event.target.id, ui.position.left, ui.position.top);
      });
    }
  });

  $('#fridgeImg').droppable ({
    accept: '*',
    drop: function(event, ui) {
      savePosition(event.target.id, ui.position.left, ui.position.top);
    }
  });
});

