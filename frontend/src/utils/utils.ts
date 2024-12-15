export function formatDate(dateString) {

    console.log(dateString)
  const date = new Date(dateString);

  // Get day and add suffix
  const day = date?.getDate();
  const daySuffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  // Get month name
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date?.getMonth()];

  // Get year
  const year = date?.getFullYear();

  // Format time in 12-hour format
  let hours = date?.getHours();
  const minutes = date?.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 0 hours to 12
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Combine into final format
  return `${day}${daySuffix} ${month}, ${year}, ${hours}:${formattedMinutes} ${ampm}`;
}

 