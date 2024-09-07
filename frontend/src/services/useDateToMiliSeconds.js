function prepareDate(date) {
  const [m, d, y] = date.split(" ");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthIndex = months.findIndex((month) => month == m);
  return [y, monthIndex, d];
}

let str = "Aug 29 2023";
let d = new Date(...prepareDate(str));

let finalDate = `${d.getFullYear()} ${d.getMonth()} ${d.getDate()}`;
const date = new Date(finalDate);

console.log(date.getMilliseconds());
