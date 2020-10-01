const express = require("express");
const cors = require("cors");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
const isBetween = require("dayjs/plugin/isBetween");
const events = require("./events");

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);

const app = express();
app.use(cors());

app.get("/events", (req, res) => {
  const start = dayjs(req.query.start, "YYYY-MM-DD", true);
  const end = dayjs(req.query.end, "YYYY-MM-DD", true);

  if (!start.isValid() || !end.isValid()) {
    res.status(400);
    res.send({
      message: "Missing or invalid request parameter(s)"
    });
  } else {
    res.send(events.getEvents(start, end));
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
