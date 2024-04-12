console.log('Connected!')

class FormValidator {
    errors = {};

    constructor(form, fields) {
        this.form = form;
        this.fields = fields;
    }

    checkUserInput() {
        this.fields.forEach(field => {
            const input = document.querySelector(`#${field}`);
            this.errors[input.id] = {};

            input.addEventListener('input', event => {
                this.validateFields(input);
            });
            input.addEventListener('blur', event => {
                this.validateFields(input);
            });
        })
    }

    validateFields(field) {
        if(field.value.trim() === '' && !this.errors[field.id].required) {
            this.setStatus(field, 'Required field', 'error', 'required');
            this.errors[field.id].required = true;
        } else if(field.value.trim() !== '' && this.errors[field.id].required) {
            this.setStatus(field, '', 'success', 'required');
            this.errors[field.id].required = false;
        }

        if(field.type === 'email') {
            const r = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!r.test(field.value) && !this.errors[field.id].email) {
                this.setStatus(field, 'Please enter a valid email', 'error', 'emailFormat');
                this.errors[field.id].email = true;
            } else if(r.test(field.value) && this.errors[field.id].email) {
                
                this.setStatus(field, '', 'success', 'emailFormat');
                this.errors[field.id].email = false;
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
}

const form = document.querySelector('.form');
const fields = ['name', 'email', 'telephone'];

const formValidation = new FormValidator(form, fields);
formValidation.checkUserInput();

class TabsController {

}

// make html semantic
// improve form accessibility
// add form validation
// add form clues
// add select with area of expertise or something
// add some nice hero banner
// style form nicely
// style nav to match rest of site
// make it responsive