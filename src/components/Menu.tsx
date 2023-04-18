import { MenuHeader } from '@/components/MenuHeader';
import DialogueList from '@/components/DialogueList';
import {useState} from 'react';
import SearchedUsers from './SearchedUsers';

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
        date: new Date()}]}]

const Menu = () => {
    const [isSearchEnabled, setSearchEnabled] = useState(false);

  return (
    <div className="w-4/12 bg-amber-500 h-screen">
      <MenuHeader handleFocus={setSearchEnabled.bind(null, !isSearchEnabled)}/>
      {isSearchEnabled ? <SearchedUsers/> : <DialogueList dialogues={MOCK_DIALOGUES} />}
    </div>
  );
};

export default Menu;
