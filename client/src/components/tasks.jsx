import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@ui";
import { Toaster } from "./ui/toaster";
import { useEffect, useState } from "react";
import apiService from "@/services/apiServices";
import NewTaskButton from "./newTaskButton";
import SortButton from "./sortButton";
import FilterCard from "./filterCard";

function Tasks({ user, socket, notifications }) {

  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const today = Date.now();
    const fetch = async () => {
      const users = await apiService.getUsers();
      const tasks = await apiService.getTasks(user.id);
      const filteredUsers = users.filter((x)=> x._id !== user.id)
      setUsers(filteredUsers)
      const updatedTasks = await Promise.all(tasks.map(async (task) => {
        if (today > task.due_date && task.progress !== 3) {
          const updatedTask = await apiService.updateOverdue(task._id);
          return updatedTask;
        } else {
          return task;
        }
      }));
      setTasks(updatedTasks.reverse())
    }
    fetch();
  }, [user])

  return (
    <>
      <div className='flex flex-col w-screen gap-7 justify-center items-center'>
        <Tabs defaultValue="all" className="w-[1050px]">
          <div className="flex w-[1050px] justify-between">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="start">Not Started</TabsTrigger>
            <TabsTrigger value="progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
            </TabsList>
            <div className="flex gap-3">
              <SortButton tasks={tasks} setTasks={setTasks}/>
              <NewTaskButton user={user} tasks={tasks} setTasks={setTasks} users={users} setUsers={setUsers} />
            </div>
          </div>
          <TabsContent value="all">
            <FilterCard tasks={tasks} setTasks={setTasks} user={user} progress={null} socket={socket} notifications={notifications} key={0}/>
          </TabsContent>
          <TabsContent value="start">
            <FilterCard tasks={tasks} setTasks={setTasks} user={user} progress={0} socket={socket} notifications={notifications} key={1} />
          </TabsContent>
          <TabsContent value="progress">
            <FilterCard tasks={tasks} setTasks={setTasks} user={user} progress={1} socket={socket} notifications={notifications} key={2} />
          </TabsContent>
          <TabsContent value="completed">
            <FilterCard tasks={tasks} setTasks={setTasks} user={user} progress={2} socket={socket} notifications={notifications} key={3} />
          </TabsContent>
          <TabsContent value="overdue">
            <FilterCard tasks={tasks} setTasks={setTasks} user={user} progress={3} socket={socket} notifications={notifications} key={4} />
          </TabsContent>
        </Tabs>
        <Toaster/>
      </div>
    </>
  )
}

export default Tasks