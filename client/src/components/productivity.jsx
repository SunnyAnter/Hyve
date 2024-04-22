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
  console.log(userLogs.map(log=> log.time))
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
            <Card className="w-[1050px] h-[520px] flex justify-evenly items-center pl-12 pr-12">
              <div className="flex flex-col h-4/5 w-16">

              </div>
              <div className="flex flex-col h-4/5 w-16">

              </div>
              <div className="flex flex-col h-4/5 w-16">

              </div>
              <div className="flex flex-col h-4/5 w-16">

              </div>
              <div className="flex flex-col h-4/5 w-16">

              </div>
              <div className="flex flex-col h-4/5 w-16">

              </div>
              <div className="flex flex-col h-4/5 w-16">
                
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default Productivity