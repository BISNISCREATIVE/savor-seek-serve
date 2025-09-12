import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const formatCurrency = (amount: number, currency = 'IDR') => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date: string | Date) => {
  return dayjs(date).format('DD MMM YYYY');
};

export const formatTime = (date: string | Date) => {
  return dayjs(date).format('HH:mm');
};

export const formatDateTime = (date: string | Date) => {
  return dayjs(date).format('DD MMM YYYY, HH:mm');
};

export const formatRelativeTime = (date: string | Date) => {
  return dayjs(date).fromNow();
};

export const formatDistance = (distance: number) => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  return `${distance.toFixed(1)}km`;
};

export const formatRating = (rating: number) => {
  return rating.toFixed(1);
};

export const formatDeliveryTime = (minutes: number) => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 
    ? `${hours}h ${remainingMinutes}min`
    : `${hours}h`;
};