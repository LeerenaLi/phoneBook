import * as control from './modules/control.js';
import {renderPhoneBook, renderContacts} from './modules/render.js';
import service from './modules/serviceStorages.js';

const {
    getStorage,
    setStorage,
} = service;

{
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
        const {closeModal} = control.modalControl(btnAdd, formOverlay);
        // addContactData();

        control.hoverRow(allRow, logo);
        control.deleteControl(btnDell, list);
        control.formControl(form, list, closeModal);

        const table = document.querySelector('.table');

        const sortArray = param => {
            if (param === 'surname') {
                return ((a, b) => a.surname.localeCompare(b.surname));
            }
            if (param === 'name') {
                return ((a, b) => a.name.localeCompare(b.name));
            }
        };

        table.addEventListener('click', e => {
            const target = e.target;
            console.log('target: ', target);
            if (target.closest('.sort-surname')) {
                const dataArr = getStorage('dataArr');
                const newArrey = dataArr.sort(sortArray('surname'));
                setStorage(newArrey);
                console.log('newArrey: ', newArrey);

                const oldRows = document.querySelectorAll('.contact');
                oldRows.forEach(del => {
                    del.classList.add('delete');
                });

                const newRow = renderContacts(list, newArrey);
                return newRow;
            }
            if (target.closest('.sort-name')) {
                const dataArr = getStorage('dataArr');
                const newArrey = dataArr.sort(sortArray('name'));
                setStorage(newArrey);
                console.log('newArrey: ', newArrey);

                const oldRows = document.querySelectorAll('.contact');
                oldRows.forEach(del => {
                    del.classList.add('delete');
                });

                const newRow = renderContacts(list, newArrey);
                return newRow;
            }
        });
    };

    window.phoneBookInit = init;
}
