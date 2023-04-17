import Head from 'next/head';
import { Inter } from 'next/font/google';
import { Menu } from '@/components/Menu';
import DialogueList from '@/components/DialogueList';
import ChatInput from '@/components/ChatInput';
import ChatBubblesContainer from '@/components/ChatBubblesContainer';
import ChatHeader from '@/components/ChatHeader';

const MOCK_MESSAGES = require('../../public/MOCK_DATA.json');
const MOCK_DIALOGUES = [
  {_id:'asdsadasdasd', name:'Troy', messages: [{
    _id: '123123123123',
      sender: '2312asdasdasd',
      text: 'Hi there I want you to know you are the most beatiful woman I\'ve ever seen. It\'s hard to do, but there is no other choice. I have to let you go. So, as final summaries listen this',
      date: new Date()
  }]}, {_id:'asdsaddsfdsfasdasd',name:'Rat',messages: [{
    _id: '123123123123',
      sender: '2312asdasdasd',
      text: 'What\'s up?',
      date: new Date()
  }]}, {_id:'asdsfdfsadasdasd',name:'John',messages: [{
    _id: '123123123123',
      sender: '2312asdasdasd',
      text: 'Welcome to another lesson, this is John Berlin',
      date: new Date()
  }]}
]

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>QChat</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex">
        <div className="w-4/12 bg-amber-500 h-screen">
          <Menu />
          <DialogueList dialogues={MOCK_DIALOGUES}/>
        </div>

        <div className="w-8/12 flex flex-col h-screen relative">
          <ChatHeader/>
          <div className="chat-main bg-fuchsia-600 flex flex-col items-center" style={{height:'calc(100% - 3rem)', marginTop: '3rem'}}>
            <section className="w-full h-auto flex justify-center mb-2 overflow-y-auto scrollbar-thumb-rose-500 scrollbar-thin scrollbar-corner-orange-600">
              <div className="chat-bubbles w-2/3 mb-2 h-full">
                <ChatBubblesContainer messages={MOCK_MESSAGES} />
              </div>
            </section>

            <ChatInput />
          </div>
        </div>
      </main>
    </>
  );
}
