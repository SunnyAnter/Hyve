import moment from "moment"
import {
  Card,
  useToast
} from "@ui";
import apiService from "@/services/apiServices";
import Task from "./task";
import { useEffect, useState } from "react";

function FilterCard({tasks,setTasks, user, progress, socket, notifications}) {
  
  const { toast } = useToast();

  const [deletedTaskId, setDeletedTaskId] = useState(null);
  const [updatedTaskGrab, setUpdatedTaskGrab] = useState(null);

  useEffect(() => {
    if (deletedTaskId) {
      if (tasks.some((task) => task._id === deletedTaskId.taskId)) {
        const task = tasks.filter(task => task._id === deletedTaskId.taskId);
        console.log(task)
        setTasks(tasks.filter(task => task._id !== deletedTaskId.taskId))
        toast({
          title: `${deletedTaskId.user.name} deleted ${task[0].title}.`,
          description: moment(Date.now()).format('LLLL')
        })
        setDeletedTaskId(null);
        return;
      }
    }
    if (updatedTaskGrab) {
      setTasks(tasks.map(task => task._id === updatedTaskGrab._id ? updatedTaskGrab : task));
      setUpdatedTaskGrab(null);
      return;
    }
  }, [deletedTaskId, updatedTaskGrab])



  useEffect(() => {
    socket.on("deleted-task", (data) => {
      setDeletedTaskId(data);
    })
    socket.on("updated-task", (updatedTask) => {
      setUpdatedTaskGrab(updatedTask);
    })
  }, [socket]);

  const deleteTaskById = (taskId, user) => {
    socket.emit("delete-task", {taskId, user})
  }

  const updatedTaskEmit = (updatedTask) => {
    socket.emit("update-task", updatedTask)
  }

  const handleProgress = async (id, isComp) => {
    const updatedTask = await apiService.updateProgress(id, isComp);
    updatedTaskEmit(updatedTask);
    setTasks(tasks.map(task => task._id === id ? updatedTask : task));
  }
  const handleDelete = async (id) => {
    const date = Date.now();
    const deleteMessage = await apiService.delete(id);
    deleteTaskById(id, user);
    setTasks(tasks.filter(task => task._id !== id));
    toast({
      title: deleteMessage.data.msg,
      description: moment(date).format('LLLL')
    })
  }
  return (
    <>
      {
        progress !== null ?
          <Card className="w-[1050px] h-[520px] flex flex-col gap-3 justify-start items-center pt-4 overflow-scroll">
            {tasks.filter(task => task.progress === progress).map((task) => <Task task={task} key={task._id} handleProgress={handleProgress} handleDelete={handleDelete} user={user} socket={socket} notifications={notifications} />)}
          </Card> :
          <Card className="w-[1050px] h-[520px] flex flex-col gap-3 justify-start items-center pt-4 overflow-scroll">
            {tasks.map((task) => <Task task={task} key={task._id} handleProgress={handleProgress} handleDelete={handleDelete} user={user} socket={socket} notifications={notifications} />)}
          </Card>
      }
    </>
  )
}

export default FilterCard