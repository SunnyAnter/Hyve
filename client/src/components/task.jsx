import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import '../App.css'
import { Check, Trash2, ScrollText, Scroll, CirclePlay, CircleStop, MessageSquareMore, Send } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
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
import { useState } from "react";
import Log from "./log";
import apiService from "@/services/apiServices";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import Message from "./messages";
function Task({ task, handleProgress, handleDelete, user }) {
  const [workTime, setWorkTime] = useState(0);
  const [newLog, setNewLog] = useState('');
  const [logs, setLogs] = useState(task.logs);
  const [timer, setTimer] = useState(true);
  const progress = task.progress;
  const date = moment(task.due_date).format('MMM Do, YYYY');
  const handleLogInput = (e) => {
    setNewLog(e.target.value);
  }
  const handleLogTimer = async (isStart) => {
    if (isStart) {
      setWorkTime(Date.now());
      setTimer(false);
    } else {
      const time = Date.now() - workTime;
      const log = {
        user: user.id,
        time,
        date: Date.now(),
        msg: newLog
      };
      const createdLog = await apiService.createLog(log, task._id);
      setLogs([...logs, createdLog]);
      handleProgress(task._id, false)
      setNewLog('');
      setTimer(true)
    }
  }
  return (
    <>
      <Card className="flex flex-row gap-8 w-[1015px] h-[66px] justify-start items-center">
        <CardHeader className="w-56">
          <CardTitle className="cursor-default">{task.title}</CardTitle>
        </CardHeader>
        <CardDescription className="flex flex-row gap-2 justify-start items-center">
          <CardTitle className="w-23 flex justify-center items-center cursor-default">Due Date</CardTitle>
          <Input disabled type="text" value={date} className="w-32 mr-3 cursor-default" />
          {
            (progress === 0) ?
              <Badge className="h-8 w-24 bg-cyan-500 hover:bg-cyan-600 flex justify-center text-cyan-50 cursor-default">Not Started</Badge>
              : progress === 1 ?
                <Badge className="h-8 w-24 bg-indigo-500 hover:bg-indigo-600 flex justify-center text-indigo-50 cursor-default">In Progress</Badge>
                : progress === 2 ?
                  <Badge className="h-8 w-24 bg-rose-500 hover:bg-rose-600 flex justify-center text-rose-50 cursor-default">Overdue</Badge> :
                    <Badge className="h-8 w-24 bg-teal-500 hover:bg-teal-600 flex justify-center text-teal-50 cursor-default">Completed</Badge>
          }
        </CardDescription>
        <div className="flex justify-between items-center ml-[-15px] w-[420px]">
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
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex h-7 w-7 items-center justify-center rounded-md md:h-8 md:w-20 p-2 text-muted-foreground transition-cozlors hover:text-foreground"><span className="p-1">Chat</span> &nbsp;<MessageSquareMore size={24} /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[650px]">
              <div id="message" className="h-[550px] mt-4 rounded-xl border-slate-200 pt-5 pr-3 pl-3 pb-5 flex flex-col gap-4 overflow-scroll scrollbar-none shadow-inner">
                <Message />
                <Message />
                <Message />
                <Message />
              </div>
              <DialogFooter>
                <Input rows={1} className="h-full rounded-xl focus:outline-none" />
                <Button className="h-10 bg-blue-500 w-12 p-1 rounded-xl flex justify-center items-center" variant="outline"><Send size={24} color="white"/></Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        <Sheet>
          <SheetTrigger asChild>
              <Button variant="outline" className="flex h-7 w-7 items-center justify-center rounded-md md:h-8 md:w-20 p-2 text-muted-foreground transition-cozlors hover:text-foreground">
                <span className="p-1">Logs</span>&nbsp; {logs.length === 0 ?<Scroll size={24} />:<ScrollText size={24}/>}</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{task.title} Logs</SheetTitle>
              <SheetDescription>
                You can track the progress of your task in this segment.
              </SheetDescription>
            </SheetHeader>
              <div className="h-full flex flex-col w-full mt-4 rounded-md pt-4 pl-4 pr-4 pb-20 overflow-scroll gap-4 scrollbar-none">
                {(logs.length === 0) ?
                  <div className="w-full h-full flex justify-center items-start pt-14"><h1>No Logs Created</h1></div> :
                  <>
                    {logs.map((log) => <Log key={log._id} log={log} />)}
                  </> 
                  }
            </div>
          </SheetContent>
          </Sheet>
          {
            timer ?
              <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-cozlors hover:text-foreground md:h-8 md:w-8 p-1" onClick={() => handleLogTimer(true)}><CirclePlay size={24} /></Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clock In</p>
                </TooltipContent>
              </Tooltip>
              </TooltipProvider> :
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-cozlors hover:text-foreground md:h-8 md:w-8 p-1"><CircleStop size={24} color="red"/></Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="grid w-full gap-2">
                          <Textarea placeholder="Type your update here." value={newLog} onChange={handleLogInput} />
                          <Button onClick={() => handleLogTimer(false)}>Submit Log</Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Clock Out</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
          }
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={() => handleProgress(task._id, true)} variant="outline" className="box-border flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-cozlors hover:text-foreground md:h-8 md:w-8 p-1 border-2 border-teal-500"><Check size={24} color="green"/></Button>
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