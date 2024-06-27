class Form{
    constructor(){
        this.form = document.querySelector('.form')
        this.evento()
    }

    evento(){
        this.form.addEventListener('submit', e => {
        this.handleSubmit(e)
        })
    }
    handleSubmit(e){
        e.preventDefault()

        const checaCampos = this.checkBox()
        const checaSenhas = this.checkPassword()

        if(checaCampos && checaSenhas){
            alert('Formulário enviado.')
            this.form.submit();
        }
    }
    
    checkPassword(){
        let valid = true

        const password = document.querySelector('.password')
        const rpassword = document.querySelector('.rpassword')

        if(password.value.length > 12 || password.value.length < 6){
            this.createError(password, 'A senha deve ter de 6 a 12 caracteres.')
            valid = false
        }

        if(password.value !== rpassword.value){

            this.createError(password, 'As senhas devem ser iguais')
            this.createError(rpassword, 'As senhas devem ser iguais')

            valid = false
        }

        return valid
    
    }

    checkBox(){
        let valid = true

        for(let errorText of this.form.querySelectorAll('.error-text')) {
            errorText.remove();
          }

        for(let box of this.form.querySelectorAll('.valida')){
            const label = box.previousElementSibling.innerHTML

            if(!box.value){
                this.createError(box, `Campo "${label}" não pode estar em branco.`);
                valid = false;
            }
            if(box.classList.contains('cpf')){
                if(!this.validaCPF(box)) valid = false
            }
            if(box.classList.contains('user')){
                if(!this.validUser(box)) valid = false
            }
        }

        return valid
    }

    validUser(box){
        let valid = true

        const user = box.value

        if(user.length > 12 || user.length < 3){
            this.createError(box, 'Usuário deve ter entre 3 a 12 caracteres.')
            valid = false
        }

        if(!user.match(/^[a-zA-Z0-9]+$/g)){
            this.createError(box, 'Nome de usuário deve conter apenas letras e/ou números')
            valid = false
        }

        return valid
    }

    validaCPF(box){
        const validadorCPF = new ValidaCPF(box.value)

        if(!validadorCPF.valida()){
            this.createError(box, 'Cpf inválido')
            return false
        }

        return true
    }

    createError(box, msg){
        const div = document.createElement('div')
        div.innerHTML = msg
        div.classList.add('error-text')
        box.insertAdjacentElement('afterend', div)
    }
}

const valida = new Form()