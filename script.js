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

    formElement.setAttribute('novalidate', '')                          // disable built-in HTML5 form validation

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
                return matchedElement && matchedElement.value.trim() === input.value.trim()
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
                input.classList.remove('valid')
                error.textContent = option.errorMsg(input, label)
                inputError = true
            } 
            if (inputError == false) {
                input.classList.remove('invalid')
                input.classList.add('valid')
                error.textContent = ''
            }
        }
        return !inputError
    }

    function validateFormInputs(formToValidate) {                   
        const formInputs = Array.from(formToValidate.querySelectorAll('.formInput'))

        return formInputs.every(formInput => validateInput(formInput))  // loop through array and return T/F for each input
    }

    formElement.addEventListener('submit', e => {
        e.preventDefault()
        const isFormValid = validateFormInputs(formElement)             // check if all input vields are valid
        if (!isFormValid) console.log("Form is NOT valid.")
        else console.log("Form is valid.")
    })
}

validateForm('#signupForm')
