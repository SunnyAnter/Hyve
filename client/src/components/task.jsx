import { CalendarIcon } from "@radix-ui/react-icons"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Check, Trash2 } from 'lucide-react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import moment from "moment"
import { Button } from "./ui/button"
function Task({task, handleProgress,handleDelete}) {
  const progress = task.progress;
  const date = moment(task.due_date).format('MMM Do, YY');
  return (
    <>
      <Card className="flex flex-row gap-8 w-[940px] h-[66px] justify-start items-center">
        <CardHeader className="w-56">
          <CardTitle>{task.title}</CardTitle>
        </CardHeader>
        <CardDescription className="flex flex-row gap-2 justify-start items-center">
          <CardTitle className="w-23 flex justify-center items-center">Due Date</CardTitle>
          <Input disabled type="text" value={date} className="w-28" />
          <CalendarIcon className="ml-[-3px] h-7 w-7 opacity-50 mr-3" />
          {
            (progress === 0) ?
              <Badge className="h-8 w-24 bg-cyan-500 hover:bg-cyan-600 flex justify-center text-cyan-50">Not Started</Badge>
              : progress === 1 ?
                <Badge className="h-8 w-24 bg-indigo-500 hover:bg-indigo-600 flex justify-center text-indigo-50">In Progress</Badge>
                : progress === 2 ?
                  <Badge className="h-8 w-24 bg-teal-500 hover:bg-teal-600 flex justify-center text-teal-50">Completed</Badge>
                  : <Badge className="h-8 w-24 bg-rose-500 hover:bg-rose-600 flex justify-center text-rose-50">Overdue</Badge>

          }
        </CardDescription>
        <Select>
          <SelectTrigger className="w-28 h-8 ml-[-10px]">
            <SelectValue placeholder="Assignees" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {task.assignees.map((user) => <SelectLabel key={task._id}>{user.name}</SelectLabel>)}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex gap-2">
        <Button onClick={() => handleDelete(task._id)} variant="outline" className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-cozlors hover:text-foreground md:h-6 md:w-6 p-1"><Trash2 size={24} /></Button>
        <Button onClick={() => handleProgress(task._id, true)} variant="outline" className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-cozlors hover:text-foreground md:h-6 md:w-6 p-1"><Check size={24}/></Button>
        </div>
      </Card>
    </>
  )
}

export default Task