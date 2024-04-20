import {
  useToast,
  Button,
  Label,
  Input,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandList,
  CommandInput,
  CommandItem,
  CommandSeparator,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui";
import { useState } from "react";
import { CirclePlus, CalendarRange, ChevronsUpDown } from 'lucide-react';
import { cn } from "@/lib/utils";
import apiService from "@/services/apiServices";
import moment from "moment";

function NewTaskButton({user, tasks, setTasks, users, setUsers}) {

  const [date, setDate] = useState();
  const [assignees, setAssignees] = useState([]);
  const [title, setTitle] = useState("");

  const { toast } = useToast();

  const handleChange = (e) => {
    setTitle(e.target.value)
  }
  const handleNewTask = async () => {
    const today = Date.now();
    const UserIds = assignees.map((user) => user._id)
    UserIds.push(user.id);
    if (title.length === 0 || !date || UserIds.length === 0) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Please fill missing fields"
      })
      return
    }
    if (Date.parse(date) < today) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Due date can't be in the past"
      })
      return
    }
    const newTask = {
      title,
      due_date: Date.parse(date),
      progress: 0,
      assignees: UserIds,
      logs: []
    };
    const task = await apiService.createTask(newTask);
    setTasks([task, ...tasks]);
    setUsers([...assignees, ...users]);
    setDate();
    setTitle('');
    setAssignees([]);
  }
  return (
    <>    
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
              <CalendarRange className="mr-2 h-4 w-4" />
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
                  : <span>Select users...</span>
                }
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search user..." className="h-9" />
                <CommandEmpty>No user found.</CommandEmpty>
                <CommandGroup heading="Assigned Users">
                  <CommandList>
                    {assignees.length > 0 ?
                      assignees.map((user) => (
                        <CommandItem
                          key={user.name}
                          value={user.name}
                          onSelect={() => {
                            setUsers([...users, user])
                            setAssignees((prev) => {
                              return prev.filter(filteredUser => filteredUser.name !== user.name)
                            })
                          }}
                        >
                          {user.name}
                        </CommandItem>
                      )) : <></>}
                  </CommandList>
                </CommandGroup>
                <CommandSeparator />
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
    </>
  )
}

export default NewTaskButton
