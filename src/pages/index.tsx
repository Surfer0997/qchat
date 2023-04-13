import Head from 'next/head';
import { Inter } from 'next/font/google';
import { Menu } from '@/components/Menu';
import DialogueList from '@/components/DialogueList';
import ChatInput from '@/components/ChatInput';
import ChatBubblesContainer from '@/components/ChatBubblesContainer';
const MOCK_MESSAGES = require('../../public/MOCK_DATA.json');

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
          <DialogueList />
        </div>

        <div className="w-8/12 flex flex-col h-screen">
          <div className="chat-header bg-neutral-400 h-16 w-full"></div>
          <div className="chat-main bg-fuchsia-600 h-full flex flex-col items-center">
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
