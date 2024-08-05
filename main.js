let firstValue = ''
let secondValue = ''
let operationSign = ''
let resultActive = false
let key = ''

const digitButtons = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
const actionButtons = ['-', '+', 'x', '÷']
const idActionButtons = ['Backspace', 'Delete', 'percent', 'division', 'multiplication', 'subtraction', 'addition', 'result', ',', 'Enter', '/', '*', '←', '%']
const screenOut = document.querySelector('.calculator__screen')

function clearAll() {
  firstValue = ''
  secondValue = ''
  operationSign = ''
  resultActive = false
  screenOut.textContent = 0
}

function clearAfrerResult() {
  firstValue = String(firstValue)
  secondValue = ''
  operationSign = ''
  resultActive = false
}

// удаление последнего символа строки
function sliceEndValue(value) {
  value = value.slice(0, -1)
  console.log('slice: ', value)
  return value
}

// если больше н-ного числа символов после точки округляем до digits
function roundingNumberAfterDot(number, digits) {
  // Преобразуем число в строку
  let numberString = number.toString();

  // Найдем позицию точки
  let decimalIndex = numberString.indexOf('.');

  // Если точки нет, значит это целое число
  if (decimalIndex === -1) {
    return numberString;
  }

  // Получаем дробную часть числа
  let decimalPart = numberString.slice(decimalIndex + 1);

  // Если длина дробной части больше заданного количества цифр
  if (decimalPart.length > digits) {
    // Округляем до нужного количества цифр
    return number.toFixed(digits);
  } else {
    // Возвращаем оригинальное число
    return numberString;
  }
}

// выполнение операции
function result(key) {
  if (key === '=' && firstValue !== '' && secondValue !== '') {
    const firstValueEnd = firstValue

    switch (operationSign) {
      case '+': {
        firstValue = (+firstValue * 1000 + +secondValue * 1000) / 1000
        break
      }
      case '-': {
        firstValue = firstValue - secondValue
        break
      }
      case 'x': {
        firstValue = roundingNumberAfterDot(firstValue * secondValue, 3)
        break
      }
      case '÷': {
        if (secondValue === '0') {
          clearAll()
          return
        }
        firstValue = roundingNumberAfterDot(firstValue / secondValue, 3)
        break
      }
    }
    screenOut.textContent = firstValue
    console.log(`Конец операции : ${firstValueEnd} ${operationSign} ${secondValue} = ${firstValue}`)
    clearAfrerResult()
  }
}

function calculator(key) {
  // полная очистка значений
  if (key === 'Delete') {
    clearAll()
    console.log('Нажатая кнопка клавиатуры: ', key === 'Delete')
  }

  // удаление последнего значений
  if (key === 'Backspace') {
    if (secondValue === '') {
      firstValue = sliceEndValue(firstValue)
      if (firstValue === '') {
        screenOut.textContent = '0'
        operationSign = ''
      } else {
        screenOut.textContent = firstValue
      }
    }
    if (secondValue !== '') {
      secondValue = sliceEndValue(secondValue)
      if (secondValue === '') {
        screenOut.textContent = firstValue + operationSign + ''
      } else {
        screenOut.textContent = firstValue + operationSign + secondValue
      }
    }
  }

  // if (key === '%') {
  //   if (firstValue !== '' && secondValue === '') {
  //     operationSign = '>'
  //     screenOut.textContent = firstValue + '%'
  //   } else {
  //     secondValue = firstValue * secondValue / 100
  //     if (operationSign === 'x') {
  //       operationSign = '÷'
  //       screenOut.textContent = firstValue + 'x' + secondValue + '%'
  //     } else if (operationSign === '÷') {
  //       operationSign = 'x'
  //       screenOut.textContent = firstValue + '÷' + secondValue + '%'
  //     } else {
  //       screenOut.textContent = firstValue + operationSign + secondValue + '%'
  //     }
  //   }
  // }

  // наполнение значений
  if (digitButtons.includes(key)) {

    console.log('Значение ключа: ', key)

    if (secondValue === '' && operationSign === '') {
      if (key === '0' && firstValue === '' || firstValue === '0') return

      if (key === '.' && firstValue === '') {
        firstValue = '0.'
        screenOut.textContent = firstValue
      } else if (key === '.' && firstValue.includes('.')) {
        return
      } else {
        firstValue += key
        screenOut.textContent = firstValue
        console.log(`Первое значение:  ${firstValue} ${operationSign} ${secondValue}`)
      }
    } else {
      if (key === '0' && secondValue === '' || secondValue === '0') return

      if (key === '.' && secondValue === '') {
        secondValue = '0.'
        screenOut.textContent = firstValue + operationSign + secondValue
      } else if (key === '.' && secondValue.includes('.')) {
        return
      } else {
        secondValue += key
        console.log(`Второе значение:  ${firstValue} ${operationSign} ${secondValue}`)
        screenOut.textContent = firstValue + operationSign + secondValue
      }
    }
    if (firstValue.length >= 30 || secondValue.length >= 30) {
      screenOut.scrollTop = screenOut.scrollHeight
      console.log('Scroll is active!')
    }
  }

  // выбор оператора
  if (actionButtons.includes(key) && firstValue !== '' && firstValue !== '0') {
    operationSign = key
    screenOut.textContent = firstValue + operationSign + secondValue
    console.log(`Выбор операции:  ${firstValue} ${operationSign} ${secondValue}`)
    return
  }

  // выполнение операции
  result(key)

}
// ввод даных с клавиатуры
window.addEventListener('keydown', (event) => {

  console.log('Нажата клавиша: ', event.key)

  if (digitButtons.includes(event.key) || actionButtons.includes(event.key) || idActionButtons.includes(event.key)) {
    if (event.key === ',') {
      key = '.'
    } else if (event.key === 'Enter') {
      key = '='
    } else if (event.key === '/') {
      key = '÷'
    } else if (event.key === '*') {
      key = 'x'
    } else {
      key = event.key
    }

    console.log('Нажатая клавиша прошедшая проверку: ', key)
    calculator(key)
  }
})


document.querySelector('.calculator__buttons').onclick = (event) => {
  // при нажатии вне кнопок, возвращается
  if (!event.target.classList.contains('calculator__button')) return

  if (event.target.textContent === 'C') {
    key = 'Delete'
  } else if (event.target.textContent === '←') {
    key = 'Backspace'
  } else {
    key = event.target.textContent
  }

  console.log('Клик по кнопке: ', key)
  calculator(key)
}

/*
___изменения___
- автоскролл экрана вниз
- событие на нажатие клавиш
*/
