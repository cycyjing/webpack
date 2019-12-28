const a = require('./a.js')
require('./index.css')
require('./index.less')

import bg from './avatar2.jpg'
console.log(a)

@dec
class B { 
  b = 2
}
const obj = new B()
console.log(obj,'===============11');
function dec(target){
  console.log(target,'==============13')
}

console.log($)

const img = new Image()
img.src = bg
document.body.append(img)