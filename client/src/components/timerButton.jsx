import {
  Textarea,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui";
import apiService from "@/services/apiServices";
import { CirclePlay, CircleStop } from 'lucide-react';
import { useState, useEffect } from "react";

function TimerButton({task, handleProgress, user, logs, setLogs, socket}) {
  const [timer, setTimer] = useState(true);
  const [workTime, setWorkTime] = useState(0);
  const [newLog, setNewLog] = useState('');
  const [logInputs, setNewLogInputs] = useState(null);

  useEffect(() => {
    socket.on("new-log", (data) => {
      setNewLogInputs(data);
    })
  }, [socket]);

  useEffect(() => {
    if (logInputs) {
      setLogs([...logs, logInputs]);
    }
  }, [logInputs]);

  const sendNewLog = (log) => {
    socket.emit("send-new-log", log)
  }
  const handleLogInput = (e) => {
    setNewLog(e.target.value);
  }
  const handleKeyDownLog = (e) => {
    if (e.key === 'Enter') {
      handleLogTimer(false)
    }
  };

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
      sendNewLog(createdLog)
      setLogs([...logs, createdLog]);
      handleProgress(task._id, false)
      setNewLog('');
      setTimer(true)
    }
  }
  return (
    <>
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
                    <Button variant="outline" className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-cozlors hover:text-foreground md:h-8 md:w-8 p-1"><CircleStop size={24} color="red" /></Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="grid w-full gap-2">
                      <Textarea placeholder="Type your update here." value={newLog} onChange={handleLogInput} onKeyDown={handleKeyDownLog} />
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
    </>
  )
}

export default TimerButton