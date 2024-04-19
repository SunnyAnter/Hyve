import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "./ui/separator"
import moment from "moment"
function Log({log}) {
  const today = log.date;
  return (
    <>
      <Card className="bg-slate-800 text-white">
        <CardHeader>
          <CardTitle className="text-xs flex justify-between"><span className="flex">{log.user.name} &nbsp;<Separator orientation="vertical" className="bg-white" />&nbsp;{log.time}</span><span>{moment(today).format("MMMM Do, YYYY")}</span></CardTitle>
          <Separator className="w-full"/>
          <CardDescription className="text-xs text-slate-100">{log.msg}</CardDescription>
        </CardHeader>
      </Card>
    </>
  )
}

export default Log