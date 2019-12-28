// if (DEV) {
//   console.log('localhost');
// } else {
//   console.log('www');
// }

// import React from 'react'
// import {render} from 'react-dom'
// render('<h1>love</h1>',window.root)

import a from './a'
import b from './b'
console.log('index.js');

const button = document.createElement('button')
button.innerHTML = 'click'
button.addEventListener('click', function () {
  import('./a.js').then(data => {
    console.log(data)
  })
})
document.body.appendChild(button)