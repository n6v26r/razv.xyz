// DD/MM/YY -> superior format
export function parseDate(date:string|undefined){
  if(!date){
    return new Date("Invalid Date");
  }
  const [day, month, year] = date.split("/").map(Number);

  return new Date(year, month - 1, day);
}
