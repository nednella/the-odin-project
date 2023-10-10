// JavaScript

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        }
    )
}

function validateForm(formSelector) {
    const formElement = document.querySelector(formSelector)

    const validationOptions = [
        {
            attribute: 'pattern',
            isValid: input => {
                const patternRegex = new RegExp(input.pattern)
                return patternRegex.test(input.value)
            },
            errorMsg: (input, label) => `Not a valid ${toTitleCase(label.textContent)}`,

        },
        {
            attribute: 'custommaxlength',
            isValid: input => input.value && input.value.length <= parseInt(input.getAttribute('custommaxlength')),
            errorMsg: (input, label) => `${toTitleCase(label.textContent)} needs to be less than or equal to ${input.getAttribute('custommaxlength')} characters`,

        },
        {
            attribute: 'minlength',
            isValid: input => input.value && input.value.length >= parseInt(input.minLength),
            errorMsg: (input, label) => `${toTitleCase(label.textContent)} needs to be at least ${input.minLength} characters`,

        },
        {
            attribute: 'match',
            isValid: input => {
                const matchSelector = input.getAttribute('match')
                const matchedElement = formElement.querySelector(`#${matchSelector}`)
                return matchedElement && matchedElement.value.trim() == input.value.trim
            },
            errorMsg: (input, label) => `Passwords must match`,
        },
        {
            attribute: 'required',
            isValid: input => input.value.trim() !== '',
            errorMsg: (input, label) => `${toTitleCase(label.textContent)} is required`
        }
         
    ]

    function validateInput(formInput) {
        const label = formInput.querySelector('label')
        const input = formInput.querySelector('input')
        const error = formInput.querySelector('.errorMsg')

        let inputError = false
        for (const option of validationOptions) {
            // 'required' attribute
            if (input.hasAttribute(option.attribute) && !option.isValid(input)) {
                input.classList.add('invalid')
                input.classList.remove('valid') // maybe remove this feature
                error.textContent = option.errorMsg(input, label)
                inputError = true
            } 
            if (inputError == false) {
                input.classList.remove('invalid')
                input.classList.add('valid') // maybe remove this feature
                error.textContent = ''
            }
        }
    }

    formElement.setAttribute('novalidate', '')                      // disable built-in HTML5 form validation

    formElement.addEventListener('submit', e => {                   // on form submission,  
        e.preventDefault()                                              // disable default submit behaviour of register button
        validateFormInputs(formElement)                                 // validate all input fields
    })

    function validateFormInputs(formToValidate) {                   
        const formInputs = Array.from(formToValidate.querySelectorAll('.formInput'))
        formInputs.forEach(formInput => {                           // loop through array and validate each input
            validateInput(formInput)
        })
    }
}

validateForm('#signupForm')
