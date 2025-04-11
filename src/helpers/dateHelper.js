export const getCurrentSGDate = () => {
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timeZone: 'Asia/Singapore'
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date());
};