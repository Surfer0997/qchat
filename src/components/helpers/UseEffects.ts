import { showToast } from '@/lib/showToast';
import { socket, socketInitializer } from '@/lib/socket/socketInitializer';
import { isAuth } from '@/store/actions/userThunk';
import { clearNotifications } from '@/store/reducers/notificationsSlice';
import { AppDispatch, RootState } from '@/store/store';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Message } from '@/types/types';
import { storeSentMessageOnClient } from '@/store/reducers/userConversationsSlice';
import { sendMessageOnClient } from '@/store/reducers/currentConversationSlice';
import { searchAllUsers } from '@/store/actions/otherUsersThunk';
import { searchConversationsByUserId } from '@/store/actions/userConversationsThunk';

const UseEffects = () => {
  const dispatch = useDispatch<AppDispatch>();

  ///////////////

  const notifications = useSelector((state: RootState) => state.notifications);
  const user = useSelector((state: RootState) => state.user.data);
  const conversations = useSelector((state: RootState) => state.userConversations.conversations);
  const currentConversationId = useSelector((state: RootState) => state.currentConversation.conversation._id);
  const lastMessage = useRef({} as Message);

  const sentInCurrentConv = useRef(false);

  useEffect(() => {
    socket.on('newIncomingMessage', ({ message }: { message: Message }) => {
      const targetConversationId = conversations.find(
        conv => conv.members[0]._id === message.sender || conv.members[1]._id === message.sender
      )?._id;
      if (targetConversationId) {
        if (lastMessage.current.date !== message.date) {
          sentInCurrentConv.current = false;
          dispatch(storeSentMessageOnClient({ targetConversationId, message }));
        }

        if (targetConversationId === currentConversationId) {
          if (!sentInCurrentConv.current) {
            dispatch(sendMessageOnClient(message));
            sentInCurrentConv.current = true;
          }
        }
      } else {
        if (user._id)
          if (lastMessage.current.date !== message.date) dispatch(searchConversationsByUserId({ userId: user._id })); // Refresh user conv-s to get new one
      }
      lastMessage.current = message;
    });
  }, [conversations, dispatch, currentConversationId, user._id]);

 

  useEffect(() => {
    // SIGN IN WITH COOKIE
    dispatch(isAuth())
      .unwrap()
      .then(() => {
        socketInitializer(dispatch).then(() => {
          socket.auth = { userID: user._id, nickname: user.nickname };
          socket.connect();
        });
      });

    return () => {
      socket.disconnect();
    };
  }, [dispatch, user._id, user.nickname]);

  useEffect(() => {
    if (user._id)
    dispatch(searchAllUsers());
  }, [dispatch, user._id]);

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
