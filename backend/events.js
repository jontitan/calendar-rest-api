const dayjs = require("dayjs");

const PREV_MONTH = "prev-month";
const CURRENT_MONTH = "current-month";
const NEXT_MONTH = "next-month";

const events = [
  {
    id: 1,
    title: "Lunch with Tim",
    description: "Meet at the restaurant",
    month: PREV_MONTH,
    day: 20,
    startTime: "13:00",
    endTime: "14:30"
  },
  {
    id: 2,
    title: "Movie night",
    month: PREV_MONTH,
    day: 4,
    startTime: "20:00",
    endTime: "23:00"
  },
  {
    id: 3,
    title: "Dentist",
    description: "Remember new insurance info",
    month: CURRENT_MONTH,
    day: 1,
    startTime: "10:00",
    endTime: "10:20"
  },
  {
    id: 4,
    title: "Lunch",
    description: "",
    month: CURRENT_MONTH,
    day: 9,
    startTime: "12:30",
    endTime: "13:00"
  },
  {
    id: 5,
    title: "Call with Lisa",
    description: "Lisa to Call",
    month: CURRENT_MONTH,
    day: 9,
    startTime: "12:00",
    endTime: "12:30"
  },
  {
    id: 6,
    title: "car service",
    month: NEXT_MONTH,
    day: 18,
    startTime: "08:00",
    endTime: "08:05"
  },
  {
    id: 7,
    title: "Beers",
    description: "Place TBD",
    month: NEXT_MONTH,
    day: 15,
    startTime: "18:00",
    endTime: "20:00"
  }
];

function getTime(event, time) {
  const hour = time.split(":")[0];
  const minute = time.split(":")[1];

  return dayjs()
    .add(
      event.month === PREV_MONTH ? -1 : event.month === CURRENT_MONTH ? 0 : 1,
      "month"
    )
    .date(event.day)
    .hour(hour)
    .minute(minute)
    .second(0)
    .format();
}

exports.getEvents = function (start, end) {
  return events
    .map(event => {
      return {
        id: event.id,
        title: event.title,
        description: event.description,
        startTime: getTime(event, event.startTime),
        endTime: getTime(event, event.endTime)
      };
    })
    .filter(e => dayjs(e.startTime).isBetween(start, end, "day", "[]"));
};
