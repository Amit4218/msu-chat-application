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
  useSidebar,
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

function App_sidebar({ setChatUser, setUserAvatar }) {
  const [searchUser, setSearchUser] = useState("");

  const items = [
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

  const filteredUser = items.filter((item) =>
    item.title.toLowerCase().includes(searchUser.toLowerCase())
  );
  const chatWith = (user, avatar) => () => {
    setChatUser(user);
    setUserAvatar(avatar);
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="w-full flex gap-2 items-center">
          <img
            className=" w-10 h-10"
            src="./src/assets/image/msu.webp"
            alt="MSU Logo"
          />
          <h1 className="text-2xl font-light tracking-wide ">MSU Chat</h1>
        </div>
        <SidebarGroupLabel>
          <h1 className="text-xl">Chats</h1>
        </SidebarGroupLabel>
        <SidebarGroupLabel className="relative w-full p-1">
          <SidebarInput
            id="search"
            placeholder="Search by contact num..."
            className="pl-8"
            onChange={(e) => setSearchUser(e.target.value)}
          />
          <Search className="hover:cursor-pointer absolute top-1/2 left-4 size-4 -translate-y-1/2 opacity-50 select-none" />
        </SidebarGroupLabel>
      </SidebarHeader>

      <SidebarContent className="no-scrollbar">
        <SidebarGroup>
          <SidebarGroupContent className="mt-4">
            <SidebarMenu>
              {filteredUser.map((item, index) => (
                <SidebarMenuItem
                  key={item.title}
                  className="mb-3 border-b pb-3"
                  onClick={chatWith(item.title, item.avatarUrl)}
                >
                  <SidebarMenuButton asChild isActive={false}>
                    <a href={item.url}>
                      <Avatar>
                        <AvatarImage
                          className=" p-1 rounded-full"
                          src={`${item.avatarUrl}`}
                        />
                        <AvatarFallback>Profile</AvatarFallback>
                      </Avatar>
                      <span>{item.title}</span>
                    </a>
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
                        className=" p-1"
                        src="https://cdn.creazilla.com/cliparts/7826/student-with-backpack-clipart-xl.png"
                      />
                      <AvatarFallback>Profile</AvatarFallback>
                    </Avatar>
                    <h1 className="text-sm font-medium">Username</h1>
                  </div>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-70 md:w-60">
                <DropdownMenuItem>
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button className="w-full">Sign out</Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

function Layout({ children }) {
  const [chatUser, setChatUser] = useState("Start a chat");
  const [userAvatar, setUserAvatar] = useState("");

  // console.log("chatUser in layout:", chatUser);
  // console.log("chatUser in layout:", userAvatar);
  
  return (
    <SidebarProvider>
      <div className="flex w-screen p-1">
        <App_sidebar setChatUser={setChatUser} setUserAvatar={setUserAvatar} />
        <main className="flex-1 relative ">
          <div className="flex w-full h-15 mb-3 items-center justify-between pr-1 border-b">
            <SidebarTrigger />
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage className=" p-1" src={`${userAvatar}`} />
                <AvatarFallback>Profile</AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-center items-start">
                <h1>{chatUser}</h1>
                <p className="text-[.6rem]">Typing.....</p>
              </div>
            </div>
            <ModeToggle />
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}

function AppSidebar() {
  return (
    <Layout className="">
      <ChatPage />
    </Layout>
  );
}

export default AppSidebar;
