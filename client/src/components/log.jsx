import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "./ui/separator"
import moment from "moment"
function Log() {
  const today = Date.now()
  return (
    <>
      <Card className="bg-slate-800 text-white">
        <CardHeader>
          <CardTitle className="text-xs flex justify-between"><span className="flex">Sunny &nbsp;<Separator orientation="vertical" className="bg-white" />&nbsp; 2 Hours</span><span>{moment(today).format("MMMM Do, YYYY")}</span></CardTitle>
          <Separator className="w-full"/>
          <CardDescription className="text-xs text-slate-100">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta est obcaecati aperiam incidunt. Atque minus possimus libero eligendi nemo assumenda debitis doloremque delectus tempora? Laudantium omnis quae ipsum facilis aut. lore</CardDescription>
        </CardHeader>
      </Card>
    </>
  )
}

export default Log