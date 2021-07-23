const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default class FormatUtils {
    getformattedTodayDate = () => {
        const today = new Date();
        const day = days[today.getDay()];
        const date = today.getDate();
        const month = months[today.getMonth()];
        return `${day} ${date}${getDateSuffix(date)} ${month}`;
    };

    getTimeFromTimeStamp = (timeStamp) => {
        const date = new Date(timeStamp * 1000);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return (hours < 10 ? `0${hours}` : hours) + ':' + (minutes < 10 ? `0${minutes}` : minutes);
    };

    getDisplayTime = (dateString) => {
        const date = new Date(dateString);
        var hours = date.getHours();
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return `${hours}${ampm}`;
    };

    capitalizeFirstLetters = s => {
        if (!s) return '';
        return s.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    getDay = (dateString) => days[new Date(dateString).getDay()];
    
    getShortDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}`;
    };
}

const getDateSuffix = date => {
    switch (date % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
};