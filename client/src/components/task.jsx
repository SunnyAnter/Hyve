import { CalendarIcon } from "@radix-ui/react-icons"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
function Task({task}) {
  const progress = task.progress;
  const date = moment(task.due_date).format('MMM Do, YY');
  return (
    <>
      <Card className="flex flex-row gap-8 w-[940px] h-[66px]">
        <CardHeader className="w-56">
          <CardTitle>{task.title}</CardTitle>
        </CardHeader>
        <CardDescription className="flex flex-row gap-2">
          <CardTitle className="mt-6 w-23">Due Date</CardTitle>
          <Input disabled type="text" value={date} className="mt-3.5 w-28" />
          <CalendarIcon className="ml-[-3px] h-7 w-7 mt-4 opacity-50 mr-3" />
          {
            (progress === 0) ?
              <Badge className="h-8 w-24 mt-4 bg-cyan-500 hover:bg-cyan-600 flex justify-center text-cyan-50">Not Started</Badge>
              : progress === 1 ?
                <Badge className="h-8 w-24 mt-4 bg-indigo-500 hover:bg-indigo-600 flex justify-center text-indigo-50">In Progress</Badge>
                : progress === 2 ?
                  <Badge className="h-8 w-24 mt-4 bg-teal-500 hover:bg-teal-600 flex justify-center text-teal-50">Completed</Badge>
                  : <Badge className="h-8 w-24 mt-4 bg-rose-500 hover:bg-rose-600 flex justify-center text-rose-50">Overdue</Badge>

          }
        </CardDescription>
        <Select>
          <SelectTrigger className="w-28 mt-4 h-8 ml-[-10px]">
            <SelectValue placeholder="Assignees" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {task.assignees.map((user) => <SelectLabel>{user.name}</SelectLabel>)}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Card>
    </>
  )
}

export default Task