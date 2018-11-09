'use strict'

window.setInterval(() => {
  $.get('/update')
    .then(res => {
    //   console.log(res);
      res.forEach(magnet => {
        // console.log(magnet, 'magnet');
        $(`#${magnet.id}`).attr('style', `position: absolute; left: ${magnet.x}px; top: ${magnet.y}px; color: #${magnet.color}`)
        // $(`#${magnet.id}`).attr('style', `left: ${magnet.x};`)
      })
    })
}, 10000);

