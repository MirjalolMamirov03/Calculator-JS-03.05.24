const numbers = [...document.querySelectorAll('.num')]
const display = document.querySelector('input')
const signs = [...document.querySelectorAll('.sign')]
const dot = document.querySelector('.dot')
const clear = document.querySelector('.c')
const remove = document.querySelector('.r')
const equal = document.querySelector('.equal')


class Calculator {
    // display

    signView
    signOperator
    operators = ['÷', '-', '+', '✕']
    setDisplay(value) {
        display.value = display.value + value
    }

    get lastValue () {
        return display.value[display.value.length - 1]
    }

    get firstValue () {
        return display.value[0]
    }

    numbers(event) {
        // console.log(event.target.textContent)
        const num = event.target.textContent

        /*

            oxirgi qiymati 0 bo'lsa va uzunligi 1 ga teng bo'lsa
            ishoradan keyingi oxirigi qiymati 0 bo'lsa
        
        */

        if (this.lastValue == 0 && display.value.length == 1) 
            return display.value = num

        if(
            this.lastValue == 0 && this.signView
        ) return display.value = display.value.slice(0, -1) + num        

        this.setDisplay(num)
    }

    signs(event) {
        
        const signView = event.target.textContent.trim()
        const signOperator = event.target.dataset.sign


        /*
            display qiymati bo'sh bo'lsa
            oxirgi qiymati ishora bo'lsa
            oxirgi qiymati nuqta bo'lsa
        */

            if (
                this.operators.includes(this.lastValue)
            )return display.value = display.value.slice(0, -1) + signView

            if (
                !display.value ||
                this.lastValue == this.signView ||
                this.lastValue == '.'
            ) return
        
        this.signView = signView
        this.signOperator = signOperator
        
        // console.log(signOperator);
        
        this.setDisplay(signView)
    }

    dot() {

        /*
            display bo'sh bo'lsa
            oxirgi qiymati nuqta bo'lsa
            oxirgi qiymati ishora bo'lsa
        */

            if (
                !display.value ||
                this.operators.includes(this.lastValue)
            ){
                display.value = display.value + '0.'
            }

            if(
                this.lastValue == '.'
            ) return

        this.setDisplay('.')
    }

    clear() {
        display.value = null
    }

    remove() {
        let deleted = display.value.split('')

        let newValue = deleted.slice(0, -1).join("")

        display.value = newValue
    }

    equal() {
        const [num1, num2] = display.value.split(this.signView)

        display.value = eval(num1 + this.signOperator + num2)
    }
}

const calculator = new Calculator();

for (const number of numbers) {
    number.addEventListener('click', function (event) {
        calculator.numbers(event)
    })
}

for (const sign of signs) {
    sign.addEventListener('click', function (event) {
        calculator.signs(event)
    })
}

dot.addEventListener('click', function() {
    calculator.dot()
})

clear.addEventListener('click', function() {
    calculator.clear()
})

remove.addEventListener('click', function() {
    calculator.remove()
})

equal.addEventListener('click', function() {
    calculator.equal()
})