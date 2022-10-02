import createEl from './createElements.js';
import service from './serviceStorages.js';

const {
    createRow,
} = createEl;

const {
    addContactData,
    removeStorage,
} = service;

export const hoverRow = (allRow, logo) => {
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

export const modalControl = (btnAdd, formOverlay) => {
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

export const deleteControl = (btnDell, list) => {
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

export const addContactPage = (contact, list) => {
    list.append(createRow(contact));
};

export const formControl = (form, list, closeModal) => {
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

// export default {
//     hoverRow,
//     modalControl,
//     deleteControl,
//     addContactPage,
//     formControl,
// };
