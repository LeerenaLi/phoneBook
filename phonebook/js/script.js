import * as control from './modules/control.js';
import {renderPhoneBook, renderContacts} from './modules/render.js';
import service from './modules/serviceStorages.js';

const {
    getStorage,
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

        control.hoverRow(allRow, logo);
        control.deleteControl(btnDell, list);
        control.formControl(form, list, closeModal);

        control.sortName(list);
    };

    window.phoneBookInit = init;
}
