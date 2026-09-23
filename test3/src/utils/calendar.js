const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const MONTH_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const DAY_NAMES = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

export function formatDate(dateStr) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-").map(Number);
  if (!year || !month || !day) return dateStr;
  return `${MONTH_NAMES[month - 1]} ${day}, ${year}`;
}

export function formatDay(dateStr) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-").map(Number);
  if (!year || !month || !day) return "";
  const d = new Date(Date.UTC(year, month - 1, day));
  return DAY_NAMES[d.getUTCDay()];
}

export function formatTime(timeStr) {
  if (!timeStr) return "";
  const [hourStr, minStr] = timeStr.split(":");
  let hour = parseInt(hourStr, 10);
  const min = minStr || "00";
  if (isNaN(hour)) return timeStr;
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${String(hour).padStart(2, "0")}:${min} ${ampm}`;
}

export function formatDateTime(isoStr) {
  if (!isoStr) return "";
  const match = isoStr.trim().match(/^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{1,2}):(\d{2}))?/);
  if (!match) return isoStr;
  const [, y, m, d, h, min] = match;
  const dateFormatted = `${MONTH_SHORT[Number(m) - 1]} ${Number(d)}, ${y}`;
  if (!h || !min) return dateFormatted;
  let hourNum = Number(h);
  const ampm = hourNum >= 12 ? "PM" : "AM";
  hourNum = hourNum % 12 || 12;
  return `${dateFormatted}, ${hourNum}:${min} ${ampm}`;
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function buildCalendarRange(dateStr, timeStr, durationHours = 4) {
  const [year, month, day] = (dateStr || "").split("-").map(Number);
  const [hour, minute] = (timeStr || "00:00").split(":").map(Number);
  if (!year || !month || !day) return null;

  const start = new Date(year, month - 1, day, hour || 0, minute || 0, 0);
  const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000);

  const formatCal = (d) =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

  return {
    start: formatCal(start),
    end: formatCal(end)
  };
}

export function generateIcs(data) {
  const range = buildCalendarRange(data.weddingDate, data.weddingTime, 5);
  if (!range) return "";

  const title = `${data.groomName} & ${data.brideName}'s Wedding`;
  const location = [data.venueName, data.venueAddress].filter(Boolean).join(", ");
  const description = `Wedding celebration of ${data.groomName} & ${data.brideName}`;
  const uid = `${Date.now()}-${Math.random().toString(36).slice(2)}@zareqia`;
  const nowStr = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const escapeIcs = (str) =>
    (str || "").replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Zareqia//Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${nowStr}`,
    `DTSTART:${range.start}`,
    `DTEND:${range.end}`,
    `SUMMARY:${escapeIcs(title)}`,
    location ? `LOCATION:${escapeIcs(location)}` : "",
    description ? `DESCRIPTION:${escapeIcs(description)}` : "",
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeIcs(title)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR"
  ].filter(Boolean);

  return lines.join("\r\n");
}

export function downloadIcs(data, filename = "wedding-invitation.ics") {
  const content = generateIcs(data);
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export function getCalendarUrls(data) {
  const range = buildCalendarRange(data.weddingDate, data.weddingTime, 5);
  if (!range) return {};

  const title = encodeURIComponent(`${data.groomName} & ${data.brideName}'s Wedding`);
  const location = encodeURIComponent([data.venueName, data.venueAddress].filter(Boolean).join(", "));
  const description = encodeURIComponent(`Wedding celebration of ${data.groomName} & ${data.brideName}`);

  const google = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${range.start}/${range.end}&details=${description}&location=${location}`;

  const outlook = `https://outlook.office.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${title}&body=${description}&location=${location}`;

  const yahoo = `https://calendar.yahoo.com/?v=60&title=${title}&st=${range.start}&et=${range.end}&desc=${description}&in_loc=${location}`;

  return { google, outlook, yahoo };
}
