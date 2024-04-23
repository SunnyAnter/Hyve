import {
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@ui";
import {ScrollText, Scroll} from 'lucide-react';
import Log from "./log";

function LogsButton({logs, title}) {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="flex h-7 w-7 items-center justify-center rounded-md md:h-8 md:w-20 p-2 text-muted-foreground transition-cozlors hover:text-foreground">
            <span className="p-1">Logs</span>&nbsp; {logs.length === 0 ? <Scroll size={24} /> : <ScrollText size={24} />}</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{title} Logs</SheetTitle>
            <SheetDescription>
              You can track the progress of your task in this segment.
            </SheetDescription>
          </SheetHeader>
          <div className="h-full flex flex-col w-full mt-4 rounded-md pt-4 pl-4 pr-4 pb-20 overflow-scroll gap-4 scrollbar-none">
            {(logs.length === 0) ?
              <div className="w-full h-full flex justify-center items-start pt-14"><h1>No Logs Created</h1></div> :
              <>
                {logs.sort((a,b) => b.date - a.date).map((log) => <Log key={log._id} log={log} />)}
              </>
            }
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default LogsButton