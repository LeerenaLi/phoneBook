import * as control from './js/control';
import {renderPhoneBook, renderContacts} from './js/render';
import service from './js/serviceStorages';

// import './index.html'; // пока идет разработка, убрать при сборке в продакшен

import './scss/index.scss';

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

    init('#app', 'Елена');
}

