import { useSelector } from "react-redux";
import ChatBubblesContainer from "./ChatBubblesContainer";
import ChatInput from "./ChatInput";
import { RootState } from "@/store/store";
import Socket from "../helpers/Socket";

const ChatWindow = () => {
  const userId = useSelector((state:RootState)=>state.user.data._id);
  return (
    <div
            className="chat-main bg-fuchsia-600 flex flex-col items-center"
            style={{ height: 'calc(100% - 3rem)', marginTop: '3rem' }}
          >
        {/* {userId && <Socket/>} */}
            <section className="w-full h-auto flex justify-center mb-2 overflow-y-auto scrollbar-thumb-rose-500 scrollbar-thin scrollbar-corner-orange-600 mt-auto">
              <div className="chat-bubbles w-2/3 mb-2 h-full">
                <ChatBubblesContainer/>
              </div>
            </section>

           {userId && <ChatInput />}
          </div>
  )
}

export default ChatWindow;