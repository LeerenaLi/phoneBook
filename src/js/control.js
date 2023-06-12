import createEl from './createElements';
import service from './serviceStorages';
import {renderContacts} from './render';

const {
    createRow,
} = createEl;

const {
    getStorage,
    setStorage,
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

const sortArray = param => {
    if (param === 'surname') {
        return ((a, b) => a.surname.localeCompare(b.surname));
    }
    if (param === 'name') {
        return ((a, b) => a.name.localeCompare(b.name));
    }
};

export const sortName = (list) => {
    const table = document.querySelector('.table');
    table.addEventListener('click', e => {
        const target = e.target;
        const dataArr = getStorage('dataArr');

        const findParam = () => {
            if (target.closest('.sort-surname')) {
                const param = 'surname';
                return param;
            }
            if (target.closest('.sort-name')) {
                const param = 'name';
                return param;
            }
        };
        const param = findParam();

        const newArray = dataArr.sort(sortArray(param));
        setStorage(newArray);

        const oldRows = document.querySelectorAll('.contact');
        oldRows.forEach(del => {
            del.classList.add('delete');
        });

        const newRow = renderContacts(list, newArray);
        return newRow;
    });
};
