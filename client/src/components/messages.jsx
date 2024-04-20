import {
  Badge,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui";
import moment from "moment";

function Message({msg, user}) {
  return (
    <>
      {(msg.user._id === user.id) ?
      <div className="w-[350px] flex justify-start items-end ml-[223px]">
        <Card className="w-full p-0 bg-slate-200">
          <CardHeader className="pt-3 pl-4 pb-4">
              <CardTitle className="text-sm flex justify-between"><span className="text-xs text-muted-foreground">{moment(msg.createdAt).format('LT')}</span></CardTitle>
              <CardDescription className="text-xs flex justify-end">{msg.msg}</CardDescription>
          </CardHeader>
        </Card>
        &nbsp;
        &nbsp;
          <Badge className="h-9 w-9 rounded-3xl bg-violet-500 hover:bg-violet-600 flex justify-center items-center cursor-default">{msg.user.name[0].toUpperCase()}{msg.user.lastName[0].toUpperCase()}</Badge>
        </div> : <div className="w-[330px] flex justify-start items-end">
          <Badge className="h-9 w-9 rounded-3xl bg-teal-500 flex hover:bg-teal-600 justify-center items-center cursor-default">{msg.user.name[0].toUpperCase()}{msg.user.lastName[0].toUpperCase()}</Badge>
        &nbsp;
        &nbsp;
        <Card className="w-full p-0">
          <CardHeader className="pt-3 pl-4 pb-4">
              <CardTitle className="text-sm flex justify-between"><span>{msg.user.name}&nbsp;{msg.user.lastName}</span><span className="text-xs text-muted-foreground">{moment(msg.createdAt).format('LT')}</span></CardTitle>
              <CardDescription className="text-xs">{msg.msg}</CardDescription>
          </CardHeader>
        </Card>
      </div> 
      }
    </>
  )
}

export default Message