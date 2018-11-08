'use strict';

$('#register').on('submit', checkUsers);

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
      if (response === 1) {
        alert('username or email already in use');
      } else {
        $.get('/fridge');
      }
    })

}
