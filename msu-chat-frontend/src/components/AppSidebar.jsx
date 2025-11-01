import { useState } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInput,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronUp, Search } from "lucide-react";

import ModeToggle from "./theme/ThemeToggle";
import ChatPage from "./ChatPage";

const AppSidebar = () => {
  const [chatUser, setChatUser] = useState("Start a chat");
  const [userAvatar, setUserAvatar] = useState("");
  const [searchUser, setSearchUser] = useState("");

  // Sample chat list
  const contacts = [
    {
      title: "Ankit",
      avatarUrl:
        "https://cdn.creazilla.com/cliparts/7826/student-with-backpack-clipart-xl.png",
    },
    {
      title: "Amit",
      avatarUrl:
        "https://cdn.creazilla.com/cliparts/7826/student-with-backpack-clipart-xl.png",
    },
    {
      title: "Balram",
      avatarUrl:
        "https://cdn.creazilla.com/cliparts/7826/student-with-backpack-clipart-xl.png",
    },
  ];

  // Filter by search
  const filteredContacts = contacts.filter((item) =>
    item.title.toLowerCase().includes(searchUser.toLowerCase())
  );

  // When user clicks contact
  const selectChatUser = (user, avatar) => {
    setChatUser(user);
    setUserAvatar(avatar);
  };

  return (
    <SidebarProvider>
      <div className="flex w-screen p-1">
        {/* Sidebar Section */}
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <img
                className="w-10 h-10"
                src="./src/assets/image/msu.webp"
                alt="MSU Logo"
              />
              <h1 className="text-2xl font-light tracking-wide">MSU Chat</h1>
            </div>

            <SidebarGroupLabel>
              <h2 className="text-xl font-medium">Chats</h2>
            </SidebarGroupLabel>

            <div className="relative w-full p-1">
              <SidebarInput
                id="search"
                placeholder="Search contact..."
                className="pl-8"
                onChange={(e) => setSearchUser(e.target.value)}
              />
              <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 opacity-50" />
            </div>
          </SidebarHeader>

          <SidebarContent className="no-scrollbar">
            <SidebarGroup>
              <SidebarGroupContent className="mt-4">
                <SidebarMenu>
                  {filteredContacts.map((item) => (
                    <SidebarMenuItem
                      key={item.title}
                      className="mb-3 border-b pb-3 cursor-pointer"
                      onClick={() => selectChatUser(item.title, item.avatarUrl)}
                    >
                      <SidebarMenuButton asChild>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              className="p-1 rounded-full"
                              src={item.avatarUrl}
                            />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            className="p-1"
                            src="https://cdn.creazilla.com/cliparts/7826/student-with-backpack-clipart-xl.png"
                          />
                          <AvatarFallback>Me</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">Username</span>
                      </div>
                      <ChevronUp className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent side="top" className="w-60">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>
                      <Button className="w-full">Sign out</Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        {/* Chat Section */}
        <main className="flex-1 relative">
          <div className="flex items-center justify-between border-b mb-3 pr-1 h-15">
            <SidebarTrigger />

            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage className="p-1" src={userAvatar} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <h1 className="text-sm font-medium">{chatUser}</h1>
                {chatUser !== "Start a chat" && (
                  <p className="text-[.6rem] text-gray-400">Typing...</p>
                )}
              </div>
            </div>

            <ModeToggle />
          </div>
          { chatUser === "Start a chat" ? (
            <div className="flex items-center justify-center h-full">
              <h2 className="text-2xl font-light text-gray-500">
                Select a chat to start messaging
              </h2>
            </div>
          ) : (
            <ChatPage chatUser={chatUser} userAvatar={userAvatar} />
          )}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppSidebar;
