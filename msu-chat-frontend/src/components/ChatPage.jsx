import React from 'react'
import { Input } from "@/components/ui/input";
import { Send } from 'lucide-react';
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader
} from "@/components/ui/card";

export function InputDemo() {
  return (
    <>
      <div className="relative flex items-center">
        {" "}
        <Input
          type="text"
          placeholder="Message"
          className=" w-full h-15 p-2 font-medium z-50 border-4 "
        />
        <button className="absolute right-8 w-4 hover:cursor-pointer z-50">
          <Send />
        </button>
      </div>
    </>
  );
}


const ChatPage = () => {
  return (
    <>
      <div>
        <div className="w-full h-[80vh] overflow-auto no-scrollbar">
          <label htmlFor="received-message">
            <div className="p-4">
              <Card className="relative w-100 p-2 flex flex-col-reverse rounded-[15px] text-white bg-slate-600 ">
                <CardHeader>
                  <CardTitle className="absolute text-[.6rem] font-bold right-3 bottom-3">
                    Card Time
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2 text-sm">
                  Card content Lorem ipsum, dolor sit amet consectetur
                  adipisicing elit. Alias molestiae maxime tenetur consectetur
                  doloremque iusto accusamus ex voluptatem. Animi, omnis.
                </CardContent>
              </Card>
            </div>
          </label>
          <label htmlFor="sent-message" className="flex justify-end">
            <div className="p-4">
              <Card className="relative shadow-xl w-100 p-2 flex flex-col-reverse rounded-[15px]">
                <CardHeader>
                  <CardTitle className="absolute text-[.6rem] font-bold right-3 bottom-3">
                    Card Time
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2 text-sm">
                  Card content Lorem ipsum, dolor sit amet consectetur
                  adipisicing elit. Alias molestiae maxime tenetur consectetur
                  doloremque iusto accusamus ex voluptatem. Animi, omnis.
                </CardContent>
              </Card>
            </div>
          </label>
        </div>
        <InputDemo />
      </div>
    </>
  );
}

export default ChatPage
