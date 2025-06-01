function getChartTypes() {

    const uppercase = document.querySelector('#include_uppercase').checked;
    const lowercase = document.querySelector('#include_lowercase').checked;
    const number = document.querySelector('#include_number').checked;
    const specialCharacter = document.querySelector('#include_specialCharacter').checked;

    const charTypes = [];

    if (uppercase) {
        charTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    }

    if (lowercase) {
        charTypes.push('abcdefghijklmnopqrstuvwxyz');
    }

    if (number) {
        charTypes.push('0123456789');
    }

    if (specialCharacter) {
        charTypes.push('!@#$%&*{}[]()_-+/|^~´`><;:.,="?');
    }

    return charTypes;

}

function getPasswordSize() {
    const size = document.querySelector('#size').value;

    if (isNaN(size) || size < 4 || size > 50) {
        message('Tamanho inválido, Digite um numéro entre 4 e 50!', 'error');
    }

    return size;
}

function randomCharType(charTypes) {
    const randomIndex = Math.floor(Math.random() * charTypes.length);

    return charTypes[randomIndex][Math.floor(Math.random() * charTypes[randomIndex].length)];
}

function generatePassword(size, charTypes) {
    let passwordGenerated = '';

    while (passwordGenerated.length < size) {
        passwordGenerated += randomCharType(charTypes);
    }

    return passwordGenerated;
}

function message(text, status = 'success') {
    Toastify({
        text: text,
        duration: 2000,
        style: {
            background: status === 'success' ? '#20C943' : '#F2412A',
            boxShadow: 'none'
        }
    }).showToast();

}

document.querySelector('#generate').addEventListener('click', function () {
    const size = getPasswordSize();
    const charTypes = getChartTypes();


    if (!size) {
        return
    }

    if (!charTypes.length) {
        message('Selecione pelo menos um caractere!', 'error');
        return
    }

    const passwordGenerated = generatePassword(size, charTypes);


    document.querySelector('#div_password').classList.add('show');
    document.querySelector('#password').textContent = passwordGenerated;
});

document.querySelector('#copy').addEventListener('click', function () {
    navigator.clipboard.writeText(document.querySelector('#password').textContent)
    message('Senha copiada com sucesso!', 'success')
})
