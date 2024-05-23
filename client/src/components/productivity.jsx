import { useEffect, useState } from "react";
import apiService from "@/services/apiServices";
import { Palette } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Card,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@ui";
import TableBar from "./tableBar";

function Productivity({ user }) {
  const [colorState, setColorState] = useState("cyan");
  const [userLogs, setUserLogs] = useState([]);

  useEffect(() => {
    const getUserLogs = async () => {
      const logs = await apiService.getLogs(user.id);
      setUserLogs(logs);
    };
    getUserLogs();
  }, []);
  const handleSort = (sortBy) => {
    switch (sortBy) {
      case "cyan":
        setColorState("cyan");
        break;
      case "teal":
        setColorState("teal");
        break;
      case "rose":
        setColorState("rose");
        break;
      case "violet":
        setColorState("violet");
        break;
      case "orange":
        setColorState("orange");
        break;
      default:
        break;
    }
  };

  function getDayOfWeek(timestamp) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
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
    const fileteredLogs = userLogs.filter((message) => {
      const messageDay = getDayOfWeek(message.date);
      return (
        messageDay === day &&
        message.date >= startOfWeek &&
        message.date <= endOfWeek
      );
    });
    return fileteredLogs;
  }

  return (
    <>
      <div className="flex flex-col w-screen gap-7 justify-center items-center">
        <Tabs defaultValue="week" className="w-[1050px]">
          <div className="flex w-[1050px] justify-between">
            <TabsList>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="day">Day</TabsTrigger>
            </TabsList>
            <Select onValueChange={handleSort}>
              <SelectTrigger className=" bg-slate-200 text-black hover:bg-slate-300 gap-1 w-32">
                <Palette className="h-5 w-5 ml-[-6px]" />
                <SelectValue placeholder="Pick Style" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Pick Style</SelectLabel>
                  <SelectItem value="cyan">Cyan</SelectItem>
                  <SelectItem value="teal">Teal</SelectItem>
                  <SelectItem value="rose">Rose</SelectItem>
                  <SelectItem value="violet">Violet</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <TabsContent value="day">
            <Card className="w-[1050px] h-[520px] flex flex-col gap-3 justify-center items-center overflow-scroll">
              Coming Soon.
            </Card>
          </TabsContent>
          <TabsContent value="week">
            <Card className="w-[1050px] h-[520px] flex justify-evenly items-center pl-16 pr-16">
              <TableBar
                day={"Monday"}
                logs={filterMessagesForCurrentWeekAndDay("Monday")}
                colorState={colorState}
              />
              <TableBar
                day={"Tuesday"}
                logs={filterMessagesForCurrentWeekAndDay("Tuesday")}
                colorState={colorState}
              />
              <TableBar
                day={"Wednesday"}
                logs={filterMessagesForCurrentWeekAndDay("Wednesday")}
                colorState={colorState}
              />
              <TableBar
                day={"Thursday"}
                logs={filterMessagesForCurrentWeekAndDay("Thurday")}
                colorState={colorState}
              />
              <TableBar
                day={"Friday"}
                logs={filterMessagesForCurrentWeekAndDay("Friday")}
                colorState={colorState}
              />
              <TableBar
                day={"Saturday"}
                logs={filterMessagesForCurrentWeekAndDay("Saturday")}
                colorState={colorState}
              />
              <TableBar
                day={"Sunday"}
                logs={filterMessagesForCurrentWeekAndDay("Sunday")}
                colorState={colorState}
              />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default Productivity;
