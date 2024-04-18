import { CalendarIcon } from "@radix-ui/react-icons"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Check, Trash2, ScrollText,Scroll,CirclePlay } from 'lucide-react';
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
function Task({task, handleProgress,handleDelete}) {
  const progress = task.progress;
  const date = moment(task.due_date).format('MMM Do, YYYY');
  return (
    <>
      <Card className="flex flex-row gap-8 w-[940px] h-[66px] justify-start items-center">
        <CardHeader className="w-56">
          <CardTitle>{task.title}</CardTitle>
        </CardHeader>
        <CardDescription className="flex flex-row gap-2 justify-start items-center">
          <CardTitle className="w-23 flex justify-center items-center">Due Date</CardTitle>
          <Input disabled type="text" value={date} className="w-32 mr-3" />
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
        <div className="flex justify-between items-center ml-[-15px] w-[340px]">
        <Select>
          <SelectTrigger className="w-28 h-8">
            <SelectValue placeholder="Assignees"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {task.assignees.map((user) => <SelectLabel key={task._id}>{user.name}</SelectLabel>)}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Sheet>
          <SheetTrigger asChild>
              <Button variant="outline" className="flex h-7 w-7 items-center justify-center rounded-md md:h-8 md:w-20 p-2 text-muted-foreground transition-cozlors hover:text-foreground"><span className="p-1">Logs</span>&nbsp;<ScrollText size={24} /></Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{task.title} Logs</SheetTitle>
              <SheetDescription>
                You can track the progress of your task in this segment.
              </SheetDescription>
            </SheetHeader>
            <div className="h-full w-full mt-6 border-2 rounded-md border-slate-400">
             
            </div>
          </SheetContent>
          </Sheet>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-cozlors hover:text-foreground md:h-8 md:w-8 p-1"><CirclePlay size={24}/></Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Start Timer</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={() => handleProgress(task._id, true)} variant="outline" className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-cozlors hover:text-foreground md:h-8 md:w-8 p-1 border-2 border-teal-500"><Check size={24} color="green"/></Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Task Completed</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={() => handleDelete(task._id)} variant="outline" className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-cozlors hover:text-foreground md:h-8 md:w-8 p-1 bg-slate-800 hover:bg-slate-900"><Trash2 size={24} color="white" /></Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete Task</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </Card>
    </>
  )
}

export default Task