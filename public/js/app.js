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
