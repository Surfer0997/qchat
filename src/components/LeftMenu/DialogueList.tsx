import { useDispatch, useSelector } from 'react-redux';
import DialogueItem from './DialogueItem';
import { AppDispatch, RootState } from '@/store/store';
import { useEffect } from 'react';
import { searchConversationsByUserId } from '@/store/actions/userConversationsThunk';

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

  return (
    <div className="mt-2">
      {conversationsToDisplay[0] ? conversationsToDisplay.sort((a,b)=>b.order - a.order).map(conversation => (
        <DialogueItem key={conversation._id} conversation={conversation} />
      )) : null}
    </div>
  );
};

export default DialogueList;
