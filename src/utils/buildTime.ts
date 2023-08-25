export function BuildTime(utcTimestamp: string) {
  const torontoOffset = -4; // Eastern Time (UTC-4) during daylight saving time

  const utcDate = new Date(utcTimestamp);
  const torontoTime = new Date(
    utcDate.getTime() + torontoOffset * 60 * 60 * 1000
  );

  function formatTime(date: any) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  const torontoFormattedTime = formatTime(torontoTime);
  const torontoFormattedDate = torontoTime.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const parts = torontoFormattedDate.split("/");
  const month = parseInt(parts[0]);
  const day = parseInt(parts[1]);
  const year = parseInt(parts[2]);
  const formattedDay = day < 10 ? `0${day}` : day.toString();
  const months = [
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

  const formattedDate = `${formattedDay} ${months[month - 1]} ${year}`;

  const formattedDateTime = `${torontoFormattedTime}, ${formattedDate}`;

  return formattedDateTime;
}
