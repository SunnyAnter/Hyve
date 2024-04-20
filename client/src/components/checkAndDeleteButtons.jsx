import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui";
import { Check, Trash2 } from 'lucide-react';

function CheckAndDeleteButtons({handleProgress, handleDelete, task}) {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={() => handleProgress(task._id, true)} variant="outline" className="box-border flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-cozlors hover:text-foreground md:h-8 md:w-8 p-1 border-2 border-teal-500"><Check size={24} color="green" /></Button>
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
    </>
  )
}

export default CheckAndDeleteButtons