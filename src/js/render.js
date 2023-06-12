import createEl from './createElements';

const {
    createImageLogo,
    createHeader,
    createFooter,
    createLogo,
    createMain,
    createButtonsGroup,
    createTable,
    createForm,
    createRow,
} = createEl;


export const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const imageLogo = createImageLogo();
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
    header.headerContainer.append(imageLogo, logo);
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

export const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
    return allRow;
};


