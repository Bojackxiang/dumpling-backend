import moment from 'moment';

export const currentDate = () =>
    moment().format('YYYY-mm-ss HH:mm:ss').toLocaleString();
