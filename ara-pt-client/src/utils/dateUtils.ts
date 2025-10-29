import moment from "moment";

export function getFormattedDate(dateString: string): string {
  const momentDate = moment.utc(dateString).local();
  return momentDate.isValid() ? momentDate.format('DD MMM YYYY, h:mm:ss A') : '';
}