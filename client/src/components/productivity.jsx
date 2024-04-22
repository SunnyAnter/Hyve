import { useEffect, useState } from "react"
import apiService from "@/services/apiServices";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  useToast
} from "@ui";
import { Car } from "lucide-react";

function Productivity({ user }) {
  const [userLogs, setUserLogs] = useState([]);
  const hour = 3600000;
  useEffect(() => {
    const getUserLogs = async () => {
      const logs = await apiService.getLogs(user.id);
      setUserLogs(logs);
    }
    getUserLogs();
  }, [])
  function getDayOfWeek(timestamp) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(timestamp);
    return days[date.getDay()];
  }

  function getCurrentWeekRange() {
    const today = new Date();
    const currentDay = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return [startOfWeek.getTime(), endOfWeek.getTime()];
  }

  function filterMessagesForCurrentWeekAndDay(day) {
    const [startOfWeek, endOfWeek] = getCurrentWeekRange();
    return userLogs.filter(message => {
      const messageDay = getDayOfWeek(message.date);
      return messageDay === day && message.date >= startOfWeek && message.date <= endOfWeek;
    });
  }

  const mondayMessages = filterMessagesForCurrentWeekAndDay('Monday');
  console.log("Monday Messages for Current Week:", mondayMessages);
  const time = (t) => {
    const secs = Math.round(t / 1000);
    const mins = Math.round(secs / 60);
    const hours = Math.round(mins / 60);
    const days = Math.round(hours / 24);
    if (days >= 1) { return days === 1 ? `${days} day` : `${days} days` }
    if (hours >= 1) { return hours === 1 ? `${hours} hour` : `${hours} hours` }
    if (mins >= 1) { return mins === 1 ? `${mins} min` : `${mins} mins` }
    if (secs >= 1) { return `${secs} secs` }
  }
  console.log(time(hour))
  console.log(userLogs)
  return (
    <>
      <div className='flex flex-col w-screen gap-7 justify-center items-center'>
        <Tabs defaultValue="day" className="w-[1050px]">
          <div className="flex w-[1050px] justify-between">
            <TabsList>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="day">
            <Card className="w-[1050px] h-[520px] flex flex-col gap-3 justify-start items-center overflow-scroll">
            </Card>
          </TabsContent>
          <TabsContent value="week">
            <Card className="w-[1050px] h-[520px] flex justify-evenly items-center pl-16 pr-16">
              <div className="h-4/5 w-28 flex flex-col justify-end">
                <Card className="h-56">
                  <div className="w-full bg-cyan-500 h-full rounded-xl">
                  </div>
                </Card>
                <div className="h-12 flex justify-center items-center flex-col">
                  <CardTitle>Monday</CardTitle>
                  <CardDescription>Apr 22th, 24</CardDescription>
                </div>
              </div>
              <div className="h-4/5 w-28 flex flex-col justify-end">
                <Card className="h-96">
                  <div className="w-full bg-cyan-500 h-full rounded-xl">
                  </div>
                </Card>
                <div className="h-12 flex justify-center items-center flex-col">
                  <CardTitle>Tuesday</CardTitle>
                  <CardDescription>Apr 23th, 24</CardDescription>
                </div>
              </div>
              <div className="h-4/5 w-28 flex flex-col justify-end">
                <Card className="h-32">
                  <div className="w-full bg-cyan-500 h-full rounded-xl">
                  </div>
                </Card>
                <div className="h-12 flex justify-center items-center flex-col">
                  <CardTitle>Wednesday</CardTitle>
                  <CardDescription>Apr 24th, 24</CardDescription>
                </div>
              </div>
              <div className="h-4/5 w-28 flex flex-col justify-end">
                <Card className="h-3/5">
                  <div className="w-full bg-cyan-500 h-full rounded-xl">
                  </div>
                </Card>
                <div className="h-12 flex justify-center items-center flex-col">
                  <CardTitle>Thursday</CardTitle>
                  <CardDescription>Apr 25th, 24</CardDescription>
                </div>
              </div>
              <div className="h-4/5 w-28 flex flex-col justify-end">
                <Card className="h-2/5">
                  <div className="w-full bg-cyan-500 h-full rounded-xl">
                  </div>
                </Card>
                <div className="h-12 flex justify-center items-center flex-col">
                  <CardTitle>Friday</CardTitle>
                  <CardDescription>Apr 26th, 24</CardDescription>
                </div>
              </div>
              <div className="h-4/5 w-28 flex flex-col justify-end">
                <Card className="h-4/5">
                  <div className="w-full bg-cyan-500 h-full rounded-xl">
                  </div>
                </Card>
                <div className="h-12 flex justify-center items-center flex-col">
                  <CardTitle>Saturday</CardTitle>
                  <CardDescription>Apr 27th, 24</CardDescription>
                </div>
              </div>
              <div className="h-4/5 w-28 flex flex-col justify-end">
                <Card className="h-3/5">
                  <div className="w-full bg-cyan-500 h-full rounded-xl">
                  </div>
                </Card>
                <div className="h-12 flex justify-center items-center flex-col">
                  <CardTitle>Sunday</CardTitle>
                  <CardDescription>Apr 28th, 24</CardDescription>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default Productivity