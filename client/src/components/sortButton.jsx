import { ListFilter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@ui";

function SortButton({tasks, setTasks}) {

  const handleSort = (sortBy) => {
    let sortedTasks = [...tasks];

    switch (sortBy) {
      case "recent":
        sortedTasks.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        break;
      case "due_date":
        sortedTasks.sort((a, b) => {
          return new Date(a.due_date) - new Date(b.due_date);
        });
        break;
      case "progress":
        sortedTasks.sort((a, b) => {
          return a.progress - b.progress;
        });
        break;
      default:
        break;
    }

    setTasks(sortedTasks);
  };
  return (
    <>
      <Select onValueChange={handleSort}>
        <SelectTrigger className=" bg-slate-200 text-black hover:bg-slate-300 gap-1">
          <ListFilter className="h-5 w-5 ml-[-6px]" /><SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort</SelectLabel>
            <SelectItem value="recent">Recent</SelectItem>
            <SelectItem value="due_date">Due Date</SelectItem>
            <SelectItem value="progress">Progress</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}

export default SortButton