import { addNewSocketUser, addSocketUsers } from '@/store/reducers/otherUsersSlice';
import {memo, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { socketInitializer } from './useSocket';
import { RootState } from '@/store/store';


export let socket = io('', {autoConnect:false});
const Socket = () => {
    const user = useSelector((state:RootState)=>state.user.data)
    console.log('SOCKET COMPONENT');
    const dispatch = useDispatch();
    useEffect(()=>{
        console.log('EFFECT');
        socketInitializer(dispatch).then(() => {
                socket.auth = { userID: user._id };
                socket.connect();
              });
    }, [dispatch, user._id])


    return null;
}
export default memo(Socket);