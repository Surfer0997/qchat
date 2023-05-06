import { showToast } from '@/lib/showToast';
import { socket, socketInitializer } from '@/lib/socket/socketInitializer';
import { isAuth } from '@/store/actions/userThunk';
import { clearNotifications } from '@/store/reducers/notificationsSlice';
import { AppDispatch, RootState } from '@/store/store';
import { useEffect,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/router';
import { Message } from '@/types/types';
import { storeMessageFromSocket } from '@/store/reducers/userConversationsSlice';
import { sendMessageOnClient } from '@/store/reducers/currentConversationSlice';
import { searchAllUsers } from '@/store/actions/otherUsersThunk';

const UseEffects = () => {
  const dispatch = useDispatch<AppDispatch>();

  ///////////////

  const notifications = useSelector((state: RootState) => state.notifications);
  const user = useSelector((state: RootState) => state.user.data);
  const conversations = useSelector((state:RootState)=>state.userConversations.conversations)
  const currentConversationId = useSelector((state:RootState)=>state.currentConversation.conversation._id)
  const letGettingMessage = useRef(true);

  useEffect(()=>{
    if (letGettingMessage.current) {
      socket.on('newIncomingMessage', ({ message }: { message: Message }) => {
        
        const targetConversationId = conversations.find((conv)=>conv.members[0]._id === message.sender || conv.members[1]._id === message.sender )?._id;
        if (targetConversationId) {
          dispatch(storeMessageFromSocket({targetConversationId, message}));
          if (targetConversationId === currentConversationId) {
            dispatch(sendMessageOnClient(message));
          }
          letGettingMessage.current = false;
        }
      });
    }
   letGettingMessage.current = true;
  }, [conversations, dispatch, currentConversationId]);

  const router = useRouter();
  useEffect(() => {
    if (!user._id) router.push('/login');
  }, [user._id]);

  useEffect(() => {
    // SIGN IN WITH COOKIE

    dispatch(isAuth())
      .unwrap()
      .then(() => {
        socketInitializer(dispatch).then(() => {
          socket.auth = { userID: user._id };
          socket.connect();
        });
      });

      return ()=>{
        socket.disconnect();
      }
  }, [dispatch, user._id]);

  useEffect(()=>{
    dispatch(searchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    const { global } = notifications;

    if (notifications && global.error) {
      const msg = global.msg ? global.msg : 'Error';
      showToast('ERROR', msg);
      dispatch(clearNotifications());
    }
    if (notifications && global.success) {
      const msg = global.msg ? global.msg : 'Good!';
      showToast('SUCCESS', msg);
      dispatch(clearNotifications());
    }
  }, [notifications, dispatch]);
  return null;
};

export default UseEffects;
