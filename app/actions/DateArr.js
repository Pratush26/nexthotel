// export default function generateDateRange(checkInStr, checkOutStr) {
//   const checkIn = new Date(checkInStr);
//   const checkOut = new Date(checkOutStr);
//   const dates = [];

//   let current = new Date(checkIn.getTime()); // Create independent copy
//     console.log(checkIn,checkOut,current)
//   while (current < checkOut) {
//     dates.push(new Date(current).toISOString().split("T")[0]); // Push normalized date
//     current.setDate(current.getDate() + 1); // Increment safely
//   }
//   console.log(dates)
//   return dates;
// }
function formatDateLocal(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function generateDateRange(checkInStr, checkOutStr) {
  const checkIn = new Date(checkInStr);
  const checkOut = new Date(checkOutStr);
  const dates = [];

  let current = new Date(checkIn.getTime());
  console.log(checkIn, checkOut, current);

  while (current < checkOut) {
    dates.push(formatDateLocal(current));  // Use local date format here
    current.setDate(current.getDate() + 1);
  }

  console.log(dates);
  return dates;
}
