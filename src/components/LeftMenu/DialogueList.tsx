import { useDispatch, useSelector } from 'react-redux';
import DialogueItem from './DialogueItem';
import { AppDispatch, RootState } from '@/store/store';
import { useEffect } from 'react';
import { searchConversationsByUserId } from '@/store/actions/userConversationsThunk';
import LoaderYellow from '../../../public/LoaderYellow.svg';
import Image from 'next/image';

const DialogueList = () => {
  const { conversations, loading } = useSelector((state: RootState) => state.userConversations);
  const conversationsToDisplay = [...conversations];
  const userId = useSelector((state: RootState) => state.user.data._id);
  const currentConvId = useSelector((state:RootState)=>state.currentConversation.conversation._id)
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (userId) {
      dispatch(searchConversationsByUserId({ userId }));
    }
  }, [dispatch, userId]);
  if (loading)
    return (
      <div className='w-full flex justify-center mt-12'>
        <Image width={50} height={50} src={LoaderYellow} alt="Loading..." />
      </div>
    );
  return (
    <div className="mt-12">
      {conversationsToDisplay[0]
        ? conversationsToDisplay
            .sort((a, b) => b.order - a.order)
            .map(conversation => <DialogueItem key={conversation._id} conversation={conversation} active={currentConvId === conversation._id}/>)
        : null}
    </div>
  );
};

export default DialogueList;
