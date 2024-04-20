import moment from "moment"
import {
  Card,
  useToast
} from "@ui";
import apiService from "@/services/apiServices";
import Task from "./task";

function FilterCard({tasks,setTasks, user, progress}) {
  
  const { toast } = useToast();

  const handleProgress = async (id, isComp) => {
    const updatedTask = await apiService.updateProgress(id, isComp);
    setTasks(tasks.map(task => task._id === id ? updatedTask : task));
  }
  const handleDelete = async (id) => {
    const date = Date.now();
    const deleteMessage = await apiService.delete(id);
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
          {tasks.filter(task => task.progress === progress).map((task) => <Task task={task} key={task._id} handleProgress={handleProgress} handleDelete={handleDelete} user={user} />)}
          </Card> :
          <Card className="w-[1050px] h-[520px] flex flex-col gap-3 justify-start items-center pt-4 overflow-scroll">
            {tasks.map((task) => <Task task={task} key={task._id} handleProgress={handleProgress} handleDelete={handleDelete} user={user} />)}
          </Card>
      }
    </>
  )
}

export default FilterCard