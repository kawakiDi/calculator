let a = ''
let b = ''
let sign = ''
let finish = false

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']

const action = ['-', '+', 'x', '/']

const screenOut = document.querySelector('.calculator__screen-main p')

function clearAll () {
  a = ''
  b = ''
  sign = ''
  finish = false
  screenOut.textContent = 0
}
// 
document.querySelector('#clear').onclick = clearAll

document.querySelector('.calculator__buttons').onclick = (event) => {
  if(!event.target.classList.contains('calculator__button')) return
  //  если нажата ас, очистить
  if(event.target.classList.contains('clear')) return

  screenOut.textContent = ''

  const key = event.target.textContent

  if (digit.includes(key)) {
    if (b === '' && sign === '') {
    a += key
    console.log(a, b, sign)
    screenOut.textContent = a
    }
    else if (a !== '' && b !== '' && finish) {
      b = key
      finish = false
      screenOut.textContent = a + ' ' + sign + ' ' + b
    }
    else {
      b += key
      console.log(a, b, sign)
      screenOut.textContent = a + ' ' + sign + ' ' + b
    }
    console.log(a, b, sign)
    return
  }

  if (action.includes(key)) {
    sign = key
    screenOut.textContent = a + ' ' + sign
    console.log(a, b, sign)
    return
  }

  if (key === '=') {
    if (b === '') b = a
    switch (sign) {
      case '+': {
        a = +a + +b
        break
      }
      case '-': {
        a = +a - +b
        break
      }
      case 'x': {
        a = +a * +b
        break
      }
      case '/': {
        if (b === 0) { clearAll() }
        a = +a / +b
        break
      }
      case '%': {
        a = +a / 100
        break
      }
    }
    finish = true
    screenOut.textContent = a
    console.log(a, b, sign)
  }
}