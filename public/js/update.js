'use strict'

window.setInterval(() => {
  $.get('/update')
    .then(res => {
    //   console.log(res);
      res.forEach(magnet => {
        //   console.log(magnet, 'magnet');
        $(`#${magnet.id}`).attr('style', `position: absolute; left: ${magnet.x}vw; top: ${magnet.y}vh`)
        // $(`#${magnet.id}`).attr('style', `left: ${magnet.x};`)
      })
    })
}, 10000);
