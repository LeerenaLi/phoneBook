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

export default {
    getStorage,
    setStorage,
    addContactData,
    removeStorage,
};
