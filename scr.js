//- Дана textarea.
// В неё вводится текст.
// Сделайте так, чтобы после захода на эту страницу через некоторое время, введенный текст остался в textarea.

// let myForm = document.forms.form;
// let textArea = myForm.text;
// textArea.value = localStorage.getItem('user text');
//
// let userText;
// textArea.oninput = (ev) => {
//     userText = textArea.value;
//     localStorage.setItem('user text', userText);
// }

// - Дана форма с инпутами, текстареа, чекбоксами, радио кнопочками, селектами и тп.
// Пользователь вводит какие-то данные и закрывает страницу (не факт, что он заполнил всю форму).
// Сделайте так, чтобы при следующем заходе на страницу введенные им ранее данные стояли на своих местах.
// Сделайте ваш скрипт как можно более универсальным.

// let myForm = document.forms.form;
//
// let {text, submit, checkbox} = myForm;
// let [radio1, radio2] = document.querySelectorAll('.radio');
//
// text.value = localStorage.getItem('textInput');
// checkbox.checked = localStorage.getItem('checkboxInput') === 'true';
// radio1.checked = localStorage.getItem('radio1Input') === 'true';
// radio2.checked = localStorage.getItem('radio2Input') === 'true';
//
// text.oninput = () => {
//     localStorage.setItem('textInput', text.value);
// }
//
// checkbox.onclick = () => {
//     localStorage.setItem('checkboxInput', checkbox.checked);
// }
//
// radio1.onclick = () => {
//     localStorage.setItem('radio1Input', true);
//     localStorage.setItem('radio2Input', false);
// }
//
// radio2.onclick = () => {
//     localStorage.setItem('radio1Input', false);
//     localStorage.setItem('radio2Input', true);
// }

// -Дан текстареа. В него можно ввести данные, нажать кнопку "сохранить" и они "фикисруются" (в хранилище), затем поредактировать их, затем еще поредактировать и возможно еще.....
// Требование : хранить историю своих изменений (даже после перезагрузки страницы).
// Сверху над текстареа должны появится стрелочки, с помощью которых можно перемещаться по истории (не забудьте!чекпоинт истории - нажатеи кнопки сохранить).

// let [saveButton, prevButton, nextButton] = document.querySelectorAll('.button');
// let myForm = document.forms.form;
// let textArea = myForm.text;
//
// let history = (localStorage.getItem('History') !== null) ? localStorage.getItem('History').split(',') : [];
// let currentHistoryEntry = history.length - 1;
//
// saveButton.onclick = () => {
//     history.push(textArea.value);
//     currentHistoryEntry++;
//
//     console.log(history, currentHistoryEntry);
//
//     localStorage.setItem('History', history);
// }
//
// prevButton.onclick = () => {
//     if (history[currentHistoryEntry - 1] !== undefined)
//         textArea.value = history[--currentHistoryEntry];
// }
//
// nextButton.onclick = () => {
//     if (history[currentHistoryEntry + 1] !== undefined)
//         textArea.value = history[++currentHistoryEntry];
// }

// - Реализуйте записную книгу, хранящую данные в локальном хранилище.
// Данные которые надо сохранять : ФИО, номер, почта, фирма, отдел, день рождения
// Данные вводить через соответсвующую форму.
// --Каждому контакту добавить кнопку для удаления контакта.
// --Каждому контакту добавить кнопку редактироваиня. При нажати на нее появляется форма, в которой есть все необходимые инпуты для редактирования, которые уже заполнены данными объекта
class Contact {
    constructor(name, number, email, firm, department, birthday) {
        this._name = name;
        this._number = number;
        this._email = email;
        this._firm = firm;
        this._department = department;
        this._birthday = birthday;
    }

    get name() {
        return this._name;
    }

    get number() {
        return this._number;
    }

    get email() {
        return this._email;
    }

    get firm() {
        return this._firm;
    }

    get department() {
        return this._department;
    }

    get birthday() {
        return this._birthday;
    }
}

let myForm = document.forms.form;
let {name, number, email, firm, department, birthday, submit} = myForm;

let contactsBook = (localStorage.getItem('Contacts')) ? localStorage.getItem('Contacts').split('\n') : [];

console.log(contactsBook);
for (let contact of contactsBook) {
    contact = contact.trim();
    displayNewContact(JSON.parse(contact));
}

submit.onclick = (ev) => {
    ev.preventDefault();
    let [nameValue, numberValue, emailValue, firmValue, departmentValue, birthdayValue] = [name.value, number.value, email.value, firm.value, department.value, birthday.value];
    let newContact = new Contact(nameValue, numberValue, emailValue, firmValue, departmentValue, birthdayValue);

    contactsBook.push(JSON.stringify(newContact));
    displayNewContact(newContact);
    console.log(contactsBook);

    localStorage.setItem('Contacts', contactsBook.join('\n'));
}

function displayNewContact(contact)
{
    let newContentWrap = document.createElement('div');
    newContentWrap.classList.add('contactWrap');

    let newContactInfo = document.createElement('div');
    newContentWrap.appendChild(newContactInfo);

    let {_name: name, _number: number, _email: email, _firm: firm, _department: department, _birthday: birthday} = contact;

    newContactInfo.innerHTML += `<hr>`;
    newContactInfo.innerHTML += `<p>Name: ${name}</p>`;
    newContactInfo.innerHTML += `<p>Number: ${number}</p>`;
    newContactInfo.innerHTML += `<p>Email: ${email}</p>`;
    newContactInfo.innerHTML += `<p>Firm: ${firm}</p>`;
    newContactInfo.innerHTML += `<p>Department: ${department}</p>`;
    newContactInfo.innerHTML += `<p>Birthday: ${birthday}</p>`;

    createButtons(newContactInfo, contact, newContentWrap);

    document.body.appendChild(newContentWrap);
}

function createButtons (newContactBlock, contact, newContentWrap)
{
    let newEditButton = document.createElement('div');
    newEditButton.classList.add('button');
    newEditButton.innerHTML = '<p>Edit</p>';

    let newDeleteButton = document.createElement('div');
    newDeleteButton.classList.add('button');
    newDeleteButton.innerHTML = '<p>Delete</p>';

    setEvents(newDeleteButton, newEditButton, contact, newContentWrap);

    newContactBlock.appendChild(newEditButton);
    newContactBlock.appendChild(newDeleteButton);
}

function setEvents(newDeleteButton, newEditButton, contact, newContentWrap) {
    let listOfContactFields = ['Name', 'Number', 'Email', 'Firm', 'Department', 'Birthday',];

    newDeleteButton.onclick = () => {
        document.body.removeChild(newContentWrap);
        let indexToRemove = contactsBook.findIndex(value => JSON.stringify(contact) === value);
        contactsBook.splice(indexToRemove, 1);
        localStorage.setItem('Contacts', contactsBook.join('\n'));
    }

    newEditButton.onclick = () => {
        let editFormWrap = document.createElement('div');
        editFormWrap.classList.add('editFormWrap');

        let editForm = document.createElement('form');
        editFormWrap.appendChild(editForm);

        let {_name: name, _number: number, _email: email, _firm: firm, _department: department, _birthday: birthday} = contact;
        let contactFields = [name, number, email, firm, department, birthday];

        for (let i = 0; i < contactFields.length; i++) {
            let newInputMessage = document.createElement('p');
            newInputMessage.innerText = `${listOfContactFields[i]}:`;
            editForm.appendChild(newInputMessage);

            let newInput = document.createElement('input');
            newInput.setAttribute('type', 'text');
            newInput.setAttribute('name', listOfContactFields[i]);
            newInput.value = contactFields[i];
            editForm.appendChild(newInput);
        }

        let newSubmit = document.createElement('input');
        newSubmit.setAttribute('type', 'submit');
        editForm.appendChild(newSubmit);

        newSubmit.onclick = (ev) => {
            ev.preventDefault();
            let oldContact = JSON.stringify(contact);

            let i = 0;
            for (let contactKey in contact) {
                contact[contactKey] = editForm[listOfContactFields[i]].value;
                i++
            }

            let indexToReplace = contactsBook.findIndex(value => value === oldContact);
            contactsBook.splice(indexToReplace, 1, JSON.stringify(contact));
            localStorage.setItem('Contacts', contactsBook.join('\n'));

            document.body.removeChild(newContentWrap);
            displayNewContact(contact);
        }

        newContentWrap.appendChild(editFormWrap);
    }
}