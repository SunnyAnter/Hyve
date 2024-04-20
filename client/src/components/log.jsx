import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator
} from "@ui";
import moment from "moment";
function Log({ log }) {
  const time = (t) => {
    const secs = Math.round(t / 1000);
    const mins = Math.round(secs / 60);
    const hours = Math.round(mins / 60);
    const days = Math.round(hours / 24);
    if (days >= 1) { return days === 1 ? `${days} day` : `${days} days` }
    if (hours >= 1) { return hours === 1 ? `${hours} hour` : `${hours} hours` }
    if (mins >= 1) { return mins === 1 ? `${mins} min` : `${mins} mins` }
    if (secs >= 1) { return `${secs} secs` }
  }
  const today = log.date;
  return (
    <>
      <Card className="bg-slate-800 text-white">
        <CardHeader>
          <CardTitle className="text-xs flex justify-between"><span className="flex">{log.user.name} &nbsp;<Separator orientation="vertical" className="bg-white" />&nbsp;{time(log.time)}</span><span>{moment(today).format("MMMM Do, YYYY")}</span></CardTitle>
          <Separator className="w-full"/>
          <CardDescription className="text-xs text-slate-100">{log.msg}</CardDescription>
        </CardHeader>
      </Card>
    </>
  )
}

export default Log