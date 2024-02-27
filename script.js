
const calculate = (n1, operator, n2) => {
    let result = ''

    if (operator === 'adicao') {
        result = parseFloat(n1) + parseFloat(n2)
    }
    if (operator === 'subtracao') {
        result = parseFloat(n1) - parseFloat(n2)
    }
    if (operator === 'multiplicacao') {
        result = parseFloat(n1) * parseFloat(n2)
    }
    if (operator === 'divisao') {
        if (n2 === '0') {
            result = 'error#divzero'
        }
        else {
            result = parseFloat(n1) / parseFloat(n2)
        }
    }
    return result
}





const calculator = document.querySelector('.calculadora')
const keys = calculator.querySelector('.keys')
const display = document.querySelector('.display')

keys.addEventListener('click', e => {
    if(e.target.matches('button')){
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayedNum = display.textContent
        const previousKeyType = calculator.dataset.previousKeyType

        Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('is-depressed'))

    if (!action) {
        console.log('number key!')
        if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
            display.textContent = keyContent
            // calculator.dataset.previousKeyType = ' '
        }
        else {
            if (display.textContent.length <= 15) {

                display.textContent = displayedNum + keyContent
            }
        }
        calculator.dataset.previousKeyType = 'number'
    }

    if (
        action === 'adicao' ||
        action === 'subtracao' ||
        action === 'multiplicacao' ||
        action === 'divisao'
    ) {
        const firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        const secondValue = displayedNum
        console.log('operator key!')
        display.textContent = '0'
        
        if (firstValue && operator && previousKeyType !== 'operator' &&
        previousKeyType !== 'calculate') {
            const calcValue = calculate(firstValue, operator, secondValue)
            display.textContent = calcValue
            calculator.dataset.firstValue = calcValue
        }
        else {
            if (previousKeyType === 'operator') {
                calculator.dataset.operator = action
            }
            else {

                calculator.dataset.firstValue = displayedNum
            }
        }
        
        
        key.classList.add('is-depressed')
        calculator.dataset.previousKeyType = 'operator'
        calculator.dataset.operator = action

    }

    if (action === 'decimal') {
        console.log('decimal key!')
        if (!displayedNum.includes('.')) {
            display.textContent = displayedNum + '.'
        }
        else if (previousKeyType === 'operator' || previousKeyType === 'calculate'){
            display.textContent = '0.'
        }
        calculator.dataset.previousKeyType = 'decimal'
    }

    if (action === 'clear') {
        console.log('clear key!')
        calculator.dataset.firstValue = ''
        calculator.dataset.modValue = ''
        calculator.dataset.operator = ''
        calculator.dataset.previousKeyType = ''
        display.textContent = 0
        calculator.dataset.previousKeyType = 'clear'
    }
    if (action === 'backspace') {
        console.log('backspace key!')
        if (display.textContent.length > 1) {
            display.textContent = display.textContent.substring(0, display.textContent.length - 1)

        }
        else {
            display.textContent = '0'
        }
        calculator.dataset.previousKeyType = 'backspace'
    }

    if (action === 'calculate') {
        console.log('equal key!')
            let firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            let secondValue = displayedNum

        if (firstValue) {
            if (previousKeyType === 'calculate') {
                firstValue = displayedNum
                secondValue = calculator.dataset.modValue
            }
            
            display.textContent = calculate(firstValue, operator, secondValue)
        }
        calculator.dataset.modValue = secondValue
        calculator.dataset.previousKeyType = 'calculate'
        }
    }
})