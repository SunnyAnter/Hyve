import '../App.css'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  Button,
  Input
} from "@ui";
import { BadgeCheck, MessageSquareMore, Send } from 'lucide-react';
import { useState } from "react";
import apiService from "@/services/apiServices";
import Message from "./messages"

function ChatButton({ user, task }) {

  const [msgs, setMsgs] = useState(task.messages);
  const [newMsg, setNewMsg] = useState('');

  const handleNewMessage = async () => {
    if (newMsg.length === 0) return;
    const msg = {
      user: user.id,
      msg: newMsg
    }

    const sentMessage = await apiService.sendMessage(msg, task._id);
    setMsgs([...msgs, sentMessage]);
    setNewMsg('');
  }

  const handleMsgInput = (e) => {
    setNewMsg(e.target.value);
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleNewMessage();
    }
  };
  return (
    <>
      {task.assignees.length > 1 ?
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex h-7 w-7 items-center justify-center rounded-md md:h-8 md:w-20 p-2 text-muted-foreground transition-cozlors hover:text-foreground"><span className="p-1">Chat</span> &nbsp;<MessageSquareMore size={24} /></Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[650px]">
            <div id="message" className="h-[550px] mt-4 rounded-xl border-slate-200 pt-5 pr-3 pl-3 pb-5 flex flex-col gap-4 overflow-scroll scrollbar-none shadow-inner">
              {(msgs.length === 0) ?
                <div className="w-full h-full flex justify-center items-start pt-14"><h1>No Messages</h1></div> :
                <>
                  {msgs.map((msg) => <Message key={msg._id} msg={msg} user={user} />)}
                </>
              }
            </div>
            <DialogFooter>
              <Input rows={1} className="h-full rounded-lg focus:outline-none focus:bg-transparent focus:border-none" value={newMsg} onChange={handleMsgInput} onKeyDown={handleKeyDown} />
              <Button className="h-10 bg-blue-500 w-12 p-1 rounded-xl flex justify-center items-center hover:bg-blue-600" variant="outline"><Send size={24} color="white" onClick={handleNewMessage} /></Button>
            </DialogFooter>
          </DialogContent>
        </Dialog> : <Button variant="outline" className="flex h-7 w-7 items-center justify-center rounded-md md:h-8 md:w-20 p-2 text-muted-foreground transition-cozlors hover:text-foreground"><span className="p-1">Solo</span> &nbsp;<BadgeCheck size={24} /></Button>
    }
    </>
  )
}

export default ChatButton