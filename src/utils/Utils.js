import moment from 'moment';

const formatTime = (time) => {
    if(!time) return null;
    return moment(time).format("hh:mm A");
};

const formatDate = (date) => {
    if(!date) return null;
    return moment(date).format("DD MMMM");
};

export {
    formatTime,
    formatDate
}