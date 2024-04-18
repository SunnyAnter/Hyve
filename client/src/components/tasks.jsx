import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "./ui/button"
import {
  Card
} from "@/components/ui/card"
import { CirclePlus, ListFilter} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Task from "./task";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CalendarIcon,CaretSortIcon} from "@radix-ui/react-icons"
import moment from "moment";

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandList,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import apiService from "@/services/apiServices";
import { useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";

function Tasks({ user }) {
  const [tasks, setTasks] = useState([]);
  const { toast } = useToast();
  const [users, setUsers] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [date, setDate] = useState();
  const [title, setTitle] = useState("");

  const handleProgress = async (id, isComp) => {
    const updatedTask = await apiService.updateProgress(id, isComp);
    setTasks(tasks.map(task => task._id === id ? updatedTask : task));
  }

  const handleChange = (e) => {
    setTitle(e.target.value)
  }
  const handleNewTask = async () => {
    const today = Date.now();
    const UserIds = assignees.map((user) => user._id)
    UserIds.push(user.id);
    if (title.length === 0 || !date || UserIds.length ===0){
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Please fill missing fields"
      })
      return
    }
    // if (Date.parse(date) < today) {
    //   toast({
    //     title: "Uh oh! Something went wrong.",
    //     description: "Due date can't be in the past"
    //   })
    //   return
    // }
    const newTask = {
      title,
      due_date: Date.parse(date),
      progress: 0,
      assignees: UserIds
    };
    const task = await apiService.createTask(newTask);
    setTasks([task, ...tasks]);
    setUsers([...assignees, ...users]);
    setDate();
    setTitle('');
    setAssignees([]);
  }
  useEffect(() => {
    const today = Date.now();
    const fetch = async () => {
      const users = await apiService.getUsers();
      const tasks = await apiService.getTasks(user.id);
      const filteredUsers = users.filter((x)=> x._id !== user.id)
      setUsers(filteredUsers)
      const updatedTasks = await Promise.all(tasks.map(async (task) => {
        if (today > task.due_date) {
          const updatedTask = await apiService.updateOverdue(task._id);
          return updatedTask;
        } else {
          return task;
        }
      }));
      setTasks(updatedTasks)
    }
    fetch();
  },[user])
  return (
    <>
      <div className='flex flex-col w-screen gap-7 justify-center items-center'>
        <Tabs defaultValue="all" className="w-[980px]">
          <div className="flex w-[980px] justify-between">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="start">Not Started</TabsTrigger>
            <TabsTrigger value="progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
            </TabsList>
            <div className="flex gap-3">
              <Select>
                <SelectTrigger className=" bg-slate-200 text-black hover:bg-slate-300 gap-1">
                  <ListFilter className="h-5 w-5 ml-[-6px]" /><SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sort</SelectLabel>
                    <SelectItem value="recent">Recent</SelectItem>
                    <SelectItem value="due-date">Due Date</SelectItem>
                    <SelectItem value="progress">Progress</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-1"><CirclePlus className="h-5 w-5 ml-[-6px]" />New Task</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create a task</DialogTitle>
                    <DialogDescription>
                      Add required information to create new task.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Title
                      </Label>
                      <Input id="title" value={title} placeholder="Enter title" className="col-span-3 w-[240px]" onChange={handleChange} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="date" className="text-right">
                        Due Date
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? moment(date).format("MMMM Do, YYYY") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="assignees" className="text-right">
                        Assign User
                      </Label>
                      <div className="flex max-w-sm items-center space-x-2 w-[240px]">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className="w-full justify-between"
                            >
                              {assignees.length > 0 ? 
                                <span className="flex">{
                                  assignees.slice(0, 3).map((x, i) => {
                                    return (
                                      (i === 2 && assignees.length > 3) ? <p key={i}>{x.name}&nbsp;...</p> :
                                        (i === 0 && assignees.length > 1) ? <p key={i}>{x.name},&nbsp;</p> :
                                          (i === 1 && assignees.length > 2) ? <p key={i}>{x.name},&nbsp;</p> :
                                            <p key={i}>{x.name}</p>
                                    );
                                  })}
                                  {assignees.length <= 3 && assignees.map((x, i) => i >= 3 && <p key={i}>{x.name}</p>)}
                                </span>
                              :<span>Select users...</span>
                              }
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Search user..." className="h-9" />
                              <CommandEmpty>No user found.</CommandEmpty>
                              <CommandGroup heading="Assigned Users">
                                <CommandList>
                                  {assignees.length>0 ?
                                    assignees.map((user) => (
                                  <CommandItem
                                    key={user.name}
                                    value={user.name}
                                    onSelect={() => {      
                                      setUsers([...users,user])     
                                      setAssignees((prev) => {
                                       return  prev.filter(filteredUser => filteredUser.name !== user.name)
                                      })
                                    }}                      
                                  >
                                    {user.name}
                                  </CommandItem>
                                    )): <></>}
                                </CommandList>
                              </CommandGroup>
                              <CommandSeparator/>
                              <CommandGroup heading="All Users">
                                <CommandList>
                                {users.map((user) => (
                                  <CommandItem
                                    key={user.name}
                                    value={user.name}
                                    onSelect={() => {
                                      setAssignees([...assignees, user])                                   
                                      setUsers((prev) => {
                                        return prev.filter(users => users.name !== user.name)
                                      })                                    
                                    }}                      
                                  >
                                    {user.name}                                 
                                  </CommandItem>
                                ))}
                                </CommandList>
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleNewTask}>Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <TabsContent value="all">
            <Card className="w-[980px] h-[520px] flex flex-col gap-3 justify-start items-center pt-4 overflow-scroll">
              {tasks.map((task) => <Task task={task} key={task._id} handleProgress={handleProgress}/>) } 
            </Card>
          </TabsContent>
          <TabsContent value="start">
            <Card className="w-[980px] h-[520px] flex flex-col gap-3 justify-start items-center pt-4 overflow-scroll">
              {tasks.filter(task => task.progress === 0).map((task) => <Task task={task} key={task._id} handleProgress={handleProgress} />)} 
            </Card>
          </TabsContent>
          <TabsContent value="progress">
            <Card className="w-[980px] h-[520px] flex flex-col gap-3 justify-start items-center pt-4 overflow-scroll">
              {tasks.filter(task => task.progress === 1).map((task) => <Task task={task} key={task._id} handleProgress={handleProgress} />)} 
            </Card>
          </TabsContent>
          <TabsContent value="completed">
            <Card className="w-[980px] h-[520px] flex flex-col gap-3 justify-start items-center pt-4 overflow-scroll">
              {tasks.filter(task => task.progress === 2).map((task) => <Task task={task} key={task._id} handleProgress={handleProgress} />)} 
            </Card>
          </TabsContent>
          <TabsContent value="overdue">
            <Card className="w-[980px] h-[520px] flex flex-col gap-3 justify-start items-center pt-4 overflow-scroll">
              {tasks.filter(task => task.progress === 3).map((task) => <Task task={task} key={task._id} handleProgress={handleProgress} />)} 
            </Card>
          </TabsContent>
        </Tabs>
        <Toaster/>
      </div>
    </>
  )
}

export default Tasks