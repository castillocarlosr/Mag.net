'use strict';

console.log('working');

document.body.addEventListener('click', function(){
  document.getElementById('sidebar').classList.toggle('active');
  document.querySelector('.toggle-btn').classList.toggle('remove');
})

//   console.log('working');

