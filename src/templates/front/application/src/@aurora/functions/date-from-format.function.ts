import dayjs from 'dayjs';

export const dateFromFormat = (date: string, format: string = 'YYYY-MM-DD H:mm:ss'): dayjs.Dayjs =>
{
    return dayjs(date, format);
};
