import moment from 'moment';

function formatDate(
  dateString: string | null | undefined,
  formattedDateFormat: string
): string {
  return dateString ? moment(dateString).format(formattedDateFormat) : '';
}

function formatDate2(
  dateString: string | null | undefined,
  currentDateFormat: string,
  formattedDateFormat: string
): string {
  return dateString
    ? moment(dateString, currentDateFormat).format(formattedDateFormat)
    : '';
}

function makeRandomString(length: number = 20): string {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default {
  formatDate,
  makeRandomString,
  formatDate2,
};
