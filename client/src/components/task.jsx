import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@ui";
import moment from "moment";
import { useState } from "react";
import ChatButton from "./chatButton";
import LogsButton from "./logButton";
import TimerButton from "./timerButton";
import ProgressBadge from "./progressBadge";
import CheckAndDeleteButtons from "./checkAndDeleteButtons";

function Task({ task, handleProgress, handleDelete, user, socket, notifications}) {

  const [logs, setLogs] = useState(task.logs);

  return (
    <>
      <Card className="flex flex-row gap-8 w-[1015px] h-[66px] justify-start items-center">
        <CardHeader className="w-56">
          <CardTitle className="cursor-default">{task.title}</CardTitle>
        </CardHeader>
          <CardDescription className="flex justify-between items-center ml-[-15px] w-[750px]">
          <CardTitle className="w-23 flex justify-center items-center cursor-default">Due Date</CardTitle>
          <Input disabled type="text" value={moment(task.due_date).format('MMM Do, YYYY')} className="w-32 cursor-default" /> 
          <ProgressBadge progress={task.progress}/>
        <Select>
          <SelectTrigger className="w-28 h-8">
            <SelectValue placeholder="Assignees"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {task.assignees.map((user) => <SelectLabel key={task._id +(Math.random()*1000000)}>{user.name}</SelectLabel>)}
            </SelectGroup>
          </SelectContent>
          </Select>
          <ChatButton user={user} task={task} socket={socket} notifications={notifications} />
          <LogsButton logs={logs} title={task.title} />
          <TimerButton task={task} handleProgress={handleProgress} user={user} logs={logs} setLogs={setLogs} socket={socket}/>
          <CheckAndDeleteButtons task={task} handleDelete={handleDelete} handleProgress={handleProgress}/>
        </CardDescription>
      </Card>
    </>
  )
}

export default Task