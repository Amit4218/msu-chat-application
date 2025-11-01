import React, { useRef, useState } from "react";
import { Send } from "lucide-react";

const ChatPage = (props) => {
  const sentMessage = useRef(null);
  const [messageData, setMessageData] = useState([]);

  const sendMessage = () => {
    if (sentMessage.current.value === "") return;
    const msg = {
      user: props.chatUser,
      type: "sent",
      sent: sentMessage.current.value,
      dateAndTime: new Date().toLocaleString()
    };
    console.log(msg);
    setMessageData([...messageData, msg]);
    sentMessage.current.value = "";
    
  };
  const receiveMessage = (msg) => {
    setMessageData([
      ...messageData,msg
    ]);
  };

  return (
    <div>
      <div className="w-full h-[80vh] overflow-auto no-scrollbar">
        {messageData.map((message, index) =>
          message.type !== "sent" ? (
            <label htmlFor="received-message" key={index}>
              <div className="p-4">
                <div className="relative w-100 p-2 flex flex-col-reverse rounded-[15px] text-white bg-slate-600 ">
                  <div className="absolute text-[.6rem] font-bold right-3 bottom-3">
                    {message.dateAndTime}
                  </div>
                  <div className="p-2 text-sm">{message.received}</div>
                </div>
              </div>
            </label>
          ) : (
            <label
              htmlFor="sent-message"
              className="flex justify-end"
              key={index}
            >
              <div className="p-4">
                <div className="relative shadow-xl w-100 p-3 flex flex-col-reverse rounded-[15px] bg-blue-500 text-white">
                  <div className="absolute text-[.6rem] font-bold right-3 bottom-2">
                    {message.dateAndTime}
                  </div>
                  <div className="p-2 text-sm">{message.sent}</div>
                </div>
              </div>
            </label>
          )
        )}
      </div>
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Message"
            className="w-full h-15 p-2 font-medium z-50 border-4"
            ref={sentMessage}
          />
          <button
            className="absolute right-8 w-4 hover:cursor-pointer z-50"
            onClick={sendMessage}
          >
            <Send />
          </button>
        </div>
    </div>
  );
};

export default ChatPage;
