'use strict';

{
    const getStorage = () => JSON.parse(localStorage.getItem('dataArr')) || [];

    const setStorage = (contact) => {
        localStorage.setItem('dataArr', JSON.stringify(contact));
    };

    const addContactData = (contact) => {
        const dataArr = getStorage('dataArr');
        dataArr.push(contact);
        setStorage(dataArr);
        console.log('dataArr: ', dataArr);
    };

    const removeStorage = (phone) => {
        const dataArr = getStorage('dataArr');
        const newArr = dataArr.filter(item => item.phone !== phone);
        setStorage(newArr);
        console.log('newArr: ', newArr);
    };

    const createContainer = () => {
        const container = document.createElement('div');
        container.classList.add('container');
        return container;
    };

    const createHeader = () => {
        const header = document.createElement('header');
        header.classList.add('header');

        const headerContainer = createContainer();
        header.append(headerContainer);

        header.headerContainer = headerContainer;

        return header;
    };

    const createFooter = (title) => {
        const footer = document.createElement('footer');
        footer.classList.add('footer');

        footer.insertAdjacentHTML('beforeend', `
            <p>Все права защищены &#169; ${title}</p>
        `);

        const footerContainer = createContainer();
        footer.append(footerContainer);

        footer.footerContainer = footerContainer;

        return footer;
    };

    const createLogo = title => {
        const h1 = document.createElement('h1');
        h1.classList.add('logo');
        h1.textContent = `Телефонный справочник. ${title}`;

        return h1;
    };

    const createMain = () => {
        const main = document.createElement('main');
        const mainContainer = createContainer();

        main.append(mainContainer);
        main.mainContainer = mainContainer;

        return main;
    };

    const createButtonsGroup = params => {
        const btnWrapper = document.createElement('div');
        btnWrapper.classList.add('btn-wrapper');

        const btns = params.map(({className, type, text}) => {
            const button = document.createElement('button');
            button.type = type;
            button.className = className;
            button.textContent = text;

            return button;
        });

        btnWrapper.append(...btns);

        return {
            btnWrapper,
            btns,
        };
    };

    const createTable = () => {
        const table = document.createElement('table');
        table.classList.add('table', 'table-striped');

        const thead = document.createElement('thead');
        thead.insertAdjacentHTML('beforeend', `
            <tr>
                <th class="delete">Удалить</th>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Телефон</th>
            </tr>
        `);

        const tbody = document.createElement('tbody');

        table.append(thead, tbody);
        table.tbody = tbody;

        return table;
    };

    const createForm = () => {
        const overlay = document.createElement('div');
        overlay.classList.add('form-overlay');

        const form = document.createElement('form');
        form.classList.add('form');
        form.insertAdjacentHTML('beforeend', `
            <button class="close" type="button"></button>
            <h2 class="form-title">Добавить контакт</h2>
            <div class="form-group">
                <label class="form-label" for="name">Имя:</label>
                <input class="form-input" name="name"
                id="name" type="text" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="surname">Фамилия:</label>
                <input class="form-input" name="surname"
                id="surname" type="text" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="phone">Телефон:</label>
                <input class="form-input" name="phone"
                id="phone" type="number" required>
            </div>
        `);

        const buttonGroup = createButtonsGroup([
            {
                className: 'btn btn-primary mr-3',
                type: 'submit',
                text: 'Добавить',
            },
            {
                className: 'btn btn-danger',
                type: 'reset',
                text: 'Отмена',
            },
        ]);

        form.append(...buttonGroup.btns);

        overlay.append(form);

        return {
            overlay,
            form,
        };
    };

    const renderPhoneBook = (app, title) => {
        const header = createHeader();
        const logo = createLogo(title);
        const main = createMain();
        const buttonGroup = createButtonsGroup([
            {
                className: 'btn btn-primary mr-3',
                type: 'button',
                text: 'Добавить',
            },
            {
                className: 'btn btn-danger',
                type: 'button',
                text: 'Удалить',
            },
        ]);
        const table = createTable();
        const {form, overlay} = createForm();
        const footer = createFooter(title);

        app.append(header, main, footer);
        header.headerContainer.append(logo);
        main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);

        return {
            list: table.tbody,
            logo,
            btnAdd: buttonGroup.btns[0],
            btnDell: buttonGroup.btns[1],
            formOverlay: overlay,
            form,
        };
    };

    const createRow = ({name: firstName, surname, phone}) => {
        const tr = document.createElement('tr');
        tr.classList.add('contact');

        const tdDell = document.createElement('td');
        tdDell.classList.add('delete');
        const buttonDell = document.createElement('button');
        buttonDell.classList.add('del-icon');
        tdDell.append(buttonDell);

        const tdName = document.createElement('td');
        tdName.classList.add('first-name');
        tdName.textContent = firstName;

        const tdSurname = document.createElement('td');
        tdSurname.classList.add('sur-name');
        tdSurname.textContent = surname;

        const tdPhone = document.createElement('td');
        const phoneLink = document.createElement('a');
        phoneLink.href = `tel:${phone}`;
        phoneLink.textContent = phone;
        tr.phoneLink = phoneLink;

        const tdEdit = document.createElement('td');
        const btnEdit = createButtonsGroup([
            {
                className: 'btn btn-success',
                type: 'button',
                text: 'Редактировать',
            },
        ]);
        tdEdit.append(btnEdit.btnWrapper);

        tdPhone.append(phoneLink);

        tr.append(tdDell, tdName, tdSurname, tdPhone, tdEdit);

        return tr;
    };

    const renderContacts = (elem, data) => {
        const allRow = data.map(createRow);
        elem.append(...allRow);
        return allRow;
    };

    const hoverRow = (allRow, logo) => {
        const text = logo.textContent;

        allRow.forEach(contact => {
            contact.addEventListener('mouseenter', () => {
                logo.textContent = contact.phoneLink.textContent;
            });
            contact.addEventListener('mouseleave', () => {
                logo.textContent = text;
            });
        });
    };

    const modalControl = (btnAdd, formOverlay) => {
        const openModal = () => {
            formOverlay.classList.add('is-visible');
        };

        const closeModal = () => {
            formOverlay.classList.remove('is-visible');
        };

        btnAdd.addEventListener('click', openModal);

        formOverlay.addEventListener('click', e => {
            const target = e.target;
            if (target === formOverlay ||
                target.classList.contains('close')) {
                closeModal();
            }
        });

        return {
            closeModal,
        };
    };

    const deleteControl = (btnDell, list) => {
        btnDell.addEventListener('click', () => {
            document.querySelectorAll('.delete').forEach(del => {
                del.classList.toggle('is-visible');
            });
        });

        list.addEventListener('click', e => {
            const target = e.target;
            const phone = target.closest('tr').querySelector('a').innerHTML;
            if (target.closest('.del-icon')) {
                target.closest('.contact').remove();
                removeStorage(phone);
            }
        });
    };

    const addContactPage = (contact, list) => {
        list.append(createRow(contact));
    };

    const formControl = (form, list, closeModal) => {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const formData = new FormData(e.target);

            const newContact = Object.fromEntries(formData);

            addContactPage(newContact, list);
            addContactData(newContact);

            form.reset();
            closeModal();
        });
    };

    const init = (selectorApp, title) => {
        const data = getStorage();
        const app = document.querySelector(selectorApp);

        const {
            list,
            logo,
            btnAdd,
            formOverlay,
            form,
            btnDell,
        } = renderPhoneBook(app, title);

        // Функционал
        const allRow = renderContacts(list, data);
        const {closeModal} = modalControl(btnAdd, formOverlay);
        // addContactData();

        hoverRow(allRow, logo);
        deleteControl(btnDell, list);
        formControl(form, list, closeModal);

        const sortArray = (a, b) => a.surname.localeCompare(b.surname);

        list.addEventListener('click', e => {
            const target = e.target;
            if (target.closest('.first-name') ||
            target.closest('.sur-name')) {
                const newArrey = data.sort(sortArray);
                setStorage(newArrey);

                const oldRows = document.querySelectorAll('.contact');
                oldRows.forEach(del => {
                    del.classList.add('delete');
                });

                const newRow = renderContacts(list, newArrey);
                newRow.forEach((el) => {
                    el.classList.add('new-row');
                });

                const tdName = document.querySelectorAll('.first-name');
                tdName.forEach((el) => {
                    el.classList.remove('first-name');
                    el.classList.add('back');
                });
                const tdSurname = document.querySelectorAll('.sur-name');
                tdSurname.forEach((el) => {
                    el.classList.remove('sur-name');
                    el.classList.add('back');
                });
                return newRow;
            }
            if (target.closest('.back')) {
                const data = getStorage();
                setStorage(data);
                const oldRows = document.querySelectorAll('.contact');
                oldRows.forEach(del => {
                    del.classList.remove('delete');
                });
                const newRow = document.querySelectorAll('.new-row');
                newRow.forEach((el) => {
                    el.classList.add('delete');
                });

                return oldRows;
            }
        });
    };

    window.phoneBookInit = init;
}
