import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@ui";
import circ from '../assets/circ-logo.png'
import { Home, ClipboardList, AlarmClockCheck, Settings, BellRing, BellOff } from 'lucide-react';

export default function Dashboard({setPage,setUser, notifications, setNotifications}) {
  return (
    <div className="w-[70px] h-screen bg-slate-100 flex flex-col justify-start items-center gap-3 pt-5 border-r shadow-lg">
      <div className="w-12 h-14 flex justify-center">
      <img src={circ} alt="" className="w-10 h-10 hover:w-[41px] hover:h-[41px]"/>
      </div>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
            <Button variant="outline" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-cozlors hover:text-foreground md:h-10 md:w-10 p-2"
            onClick={()=>setPage('home')}>
            <Home color="black" size={24} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Home</p>
        </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-cozlors hover:text-foreground md:h-10 md:w-10 p-2"
              onClick={() => setPage('tasks')}>
              <ClipboardList color="black" size={24} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Tasks</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-cozlors hover:text-foreground md:h-10 md:w-10 p-2"
              onClick={() => setPage('productivity')}>
              <AlarmClockCheck color="black" size={24} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Productivity</p>
          </TooltipContent>
        </Tooltip>
        <div className="absolute bottom-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-cozlors hover:text-foreground md:h-10 md:w-10 p-2">
                    <Settings color="black" size={24} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[300px] flex justify-center">
                  <DialogFooter>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-cozlors hover:text-foreground md:h-9 md:w-9 p-2" onClick={()=>setNotifications(!notifications)}>
                          {notifications ?
                            <BellOff color="black" size={24} /> :
                            <BellRing color="black" size={24} />}</Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        {
                          notifications ?
                            <p>Notifications Off</p> :
                            <p>Notifications On</p>
                        }
                      </TooltipContent>
                    </Tooltip>
                    <Button onClick={() => { setUser(null); setPage('home') }}>Sign Out</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  )
}