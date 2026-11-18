import { formatDistanceToNowStrict, parseISO } from 'date-fns';

export const TimeStamp = (date) => {
    const parsedDate = parseISO(date.replace(' ', 'T'));
    const timeAgo = formatDistanceToNowStrict(parsedDate, { addSuffix: true});

    return timeAgo;
};