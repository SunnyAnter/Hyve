import '../App.css'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  Button,
  Input,
  useToast
} from "@ui";
import { BadgeCheck, MessageSquareMore, Send, MessageSquareDot } from 'lucide-react';
import { useState, useEffect, useRef} from "react";
import apiService from "@/services/apiServices";
import Message from "./messages"

function ChatButton({ user, task, socket, notifications}) {
  const [msgs, setMsgs] = useState(task.messages);
  const messageRef = useRef(null);
  const [newMsg, setNewMsg] = useState('');
  const [newNotification, setNewNotification] = useState(null);
  const [open, setOpen] = useState(false);
  
  const { toast } = useToast();

  useEffect(() => {
    socket.on("recieve-message", (data) => {
      if (data.room === task._id) {
        setNewNotification(data.msg)
        setMsgs((prev)=>[...prev, data.msg]);
      }
    })
  }, [notifications])
  
  useEffect(() => {
    function scroll() {
      if (messageRef.current) {
        messageRef.current.scrollTop = messageRef.current.scrollHeight;
      } else {
        setTimeout(() => {
          scroll()
        }, 200);
      }
    }
    scroll();
  }, [msgs, messageRef]);

  useEffect(() => {
    if (newNotification) {
      newToast(newNotification);
    }
},[newNotification])
  
  useEffect(() => {
    join();
  }, [])
  
  function newToast(data) {
    if (notifications && !open) {
      toast({
        title: `${task.title}`,
        description: `New message from ${data.user.name}.`
      })
    }
  }
  
  const join = () => {
    socket.emit("join-room", task._id);
  }

  const sendMessage = (msg) => {
    socket.emit("send-message", {msg, room:task._id})
    setMsgs([...msgs, msg])
    setNewMsg('');
    setNewNotification(null)
  }
  const handleNewMessage = async () => {
    if (newMsg.length === 0) return;
    const msg = {
      user: user.id,
      msg: newMsg
    }

    const sentMessage = await apiService.sendMessage(msg, task._id);
    sendMessage(sentMessage);
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
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button onClick={() => { setNewNotification(null)}} variant="outline" className="flex h-7 w-7 items-center justify-center rounded-md md:h-8 md:w-20 p-2 text-muted-foreground transition-cozlors hover:text-foreground">
              <span className="p-1">Chat</span> &nbsp;{newNotification ? <MessageSquareDot size={24} color='red' /> : <MessageSquareMore size={24} />}</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[650px]">
            <div id="message" ref={messageRef} className="h-[550px] mt-4 rounded-xl border-slate-200 pt-5 pr-3 pl-3 pb-5 flex flex-col gap-4 overflow-scroll scrollbar-none shadow-inner">
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
        </Dialog> : <Button disabled variant="outline" className="flex h-7 w-7 items-center justify-center rounded-md md:h-8 md:w-20 p-2 text-muted-foreground transition-cozlors hover:text-foreground"><span className="p-1">Solo</span> &nbsp;<BadgeCheck size={24} /></Button>
    }
    </>
  )
}

export default ChatButton