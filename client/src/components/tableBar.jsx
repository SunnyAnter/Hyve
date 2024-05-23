import {
  Card,
  CardDescription,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Button,
  CardTitle,
} from "@ui";
import Log from "./log";

function TableBar({ day, logs, colorState }) {
  const addedTime = logs.length
    ? Math.round(
        logs.reduce((total, log) => total + log.time, 0) / 1000 / 60 / 60
      ) *
      2 *
      4
    : 4;
  const barHeight = addedTime < 4 ? 4 : addedTime > 96 ? 96 : addedTime;
  if (day === "Tuesday") {
    console.log(barHeight);
  }

  return (
    <div className="h-4/5 w-28 flex flex-col justify-end">
      <Card className={`h-${barHeight}`}>
        <div className={`w-full bg-${colorState}-500 h-full rounded-sm`}></div>
      </Card>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button
            variant="link"
            className="h-12 flex justify-center items-center flex-col"
          >
            <CardTitle>{day}</CardTitle>
            <CardDescription></CardDescription>
          </Button>
        </HoverCardTrigger>
        {logs.length ? (
          <HoverCardContent
            className="w-72 h-72 flex flex-col justify-start items-center pt-4 gap-4"
            sideOffset={5}
            side="top"
          >
            <h1 className="font-semibold text-md">{day}&nbsp; Logs</h1>
            <div className="h-full w-full flex flex-col overflow-scroll scrollbar-none gap-4">
              {logs.map((log) => (
                <Log key={log._id} log={log} />
              ))}
            </div>
          </HoverCardContent>
        ) : (
          <HoverCardContent
            className="w-56 h-24 flex justify-center items-center"
            sideOffset={5}
            side="top"
          >
            <h1>No Progress Recorded</h1>
          </HoverCardContent>
        )}
      </HoverCard>
    </div>
  );
}

export default TableBar;
