import moment from "moment";

export const formatDate = (date: Date | string, format = "DD/MM/YYYY") => {
  return moment(date).format(format);
};
