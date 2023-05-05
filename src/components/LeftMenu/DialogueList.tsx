import { useDispatch, useSelector } from 'react-redux';
import DialogueItem from './DialogueItem';
import { AppDispatch, RootState } from '@/store/store';
import { useEffect } from 'react';
import { searchConversationsByUserId } from '@/store/actions/userConversationsThunk';
import { socket } from '@/lib/socket/socketInitializer';
import { Message } from '@/types/types';
import { storeMessageFromSocket } from '@/store/reducers/userConversationsSlice';

const DialogueList = () => {
  const { conversations, loading } = useSelector((state: RootState) => state.userConversations);
  const conversationsToDisplay = [...conversations];
  const userId = useSelector((state: RootState) => state.user.data._id);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (userId) {
      dispatch(searchConversationsByUserId({ userId }));
    }
  }, [dispatch, userId]);

// TODO TRY TO MAKE AS USEEFFECTS COMPONENT, THEN MEMOIZE IT TO NOT RERENDER
    // socket.on('newIncomingMessage', ({ message }: { message: Message }) => {
    //   const targetConversationId = conversations.find((conv)=>conv.members[0]._id === message.sender || conv.members[1]._id === message.sender )?._id;
    //   if (targetConversationId) {
    //     console.log('SEND ME TWICE YEAH');
    //     dispatch(storeMessageFromSocket({targetConversationId, message}));
    //   }
    // });


  return (
    <div className="mt-2">
      {conversationsToDisplay[0]
        ? conversationsToDisplay
            .sort((a, b) => b.order - a.order)
            .map(conversation => <DialogueItem key={conversation._id} conversation={conversation} />)
        : null}
    </div>
  );
};

export default DialogueList;
