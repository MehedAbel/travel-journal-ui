const formatDate = (date) => {
    if (!date) return '';

    if (typeof date === 'string') {
        const year = date.slice(0, 4);
        const month = date.slice(4, 6).padStart(2, '0');
        const day = date.slice(6, 8).padStart(2, '0');

        return `${year}-${month}-${day}`;
    } else if (Array.isArray(date) && date.length === 3) {
        const [year, month, day] = date.map((item) => String(item).padStart(2, '0'));
        return `${year}-${month}-${day}`;
    }
};

export { formatDate };
