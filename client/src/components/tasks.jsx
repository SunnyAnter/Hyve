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
import { CirclePlus, ListFilter, CircleUser } from 'lucide-react';
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
function Tasks() {
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
                      <Input id="title" value="exercise" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="date" className="text-right">
                        Due Date
                      </Label>
                      <Input id="date" value="Pedro Duarte" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="assignees" className="text-right">
                        Assignees
                      </Label>
                      <Input id="assignees" value="select" className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={()=>console.log('hey')}>Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <TabsContent value="all">
            <Card className="w-[980px] h-[520px] flex flex-col gap-3 justify-start items-center pt-4">
              <Task />
              <Task />
              <Task />
              <Task />
              <Task />
              <Task />
            </Card>
          </TabsContent>
          <TabsContent value="start">
            <Card className="w-[980px] h-[520px] flex flex-col gap-3 justify-start items-center pt-4">
              <h1>start</h1>
            </Card>
          </TabsContent>
          <TabsContent value="progress">
            <Card className="w-[980px] h-[520px] flex flex-col gap-3 justify-start items-center pt-4">
              <h1>progress</h1>
            </Card>
          </TabsContent>
          <TabsContent value="completed">
            <Card className="w-[980px] h-[520px] flex flex-col gap-3 justify-start items-center pt-4">
              <h1>completed</h1>
            </Card>
          </TabsContent>
          <TabsContent value="overdue">
            <Card className="w-[980px] h-[520px] flex flex-col gap-3 justify-start items-center pt-4">
              <h1>overdue</h1>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default Tasks