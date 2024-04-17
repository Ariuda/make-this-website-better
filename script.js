console.log('Connected!')

class FormValidator {
    errors = {};

    constructor(form, fields) {
        this.form = form;
        this.fields = fields;
    }

    checkUserInput() {
        this.formHasErrors();
        this.fields.forEach(field => {
            const input = document.querySelector(`#${field}`);
            this.errors[input.id] = {};

            input.addEventListener('input', event => {
                this.validateFields(input);
                this.formHasErrors();
            });
            input.addEventListener('blur', event => {
                this.validateFields(input);
            });
        })
    }

    validateFields(field) {
        const errors = this.errors[field.id];

        if(field.value.trim() === '' && !errors.required) {
            this.setStatus(field, 'Required field', 'error', 'required');
            errors.required = true;
        } else if(field.value.trim() !== '' && errors.required) {
            this.setStatus(field, '', 'success', 'required');
            errors.required = false;
        }

        if(field.type === 'email') {
            const r = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!r.test(field.value) && !errors.email) {
                this.setStatus(field, 'Please enter a valid email', 'error', 'emailFormat');
                errors.email = true;
            } else if(r.test(field.value) && errors.email) {
                this.setStatus(field, '', 'success', 'emailFormat');
                errors.email = false;
            }
        }
    }

    setStatus(field, message, status, type) {
        const errorMessage = document.createElement("p");
        errorMessage.classList.add('error-message', type);
        let content = document.createTextNode(message);

        if(status === 'error') {
            errorMessage.appendChild(content);
            field.parentElement.appendChild(errorMessage);
        }

        if(status === 'success') {
            const msg = field.parentElement.querySelector(`.${type}`);
            if(msg) msg.remove();
        }  
    }

    formHasErrors() {
        const form = document.querySelector('.form');
        const button = document.querySelector('#submit-button');
        form.checkValidity() ? button.disabled = false : button.disabled = true;
    }
}

const form = document.querySelector('.form');
const fields = ['name', 'email', 'telephone', 'years', 'why'];

const formValidation = new FormValidator(form, fields);
formValidation.checkUserInput();

// make html semantic
// improve form accessibility
// add form validation
// add form clues
// style form
// style nav to match rest of site
// make it responsive