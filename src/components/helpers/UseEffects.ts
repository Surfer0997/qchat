import { showToast } from "@/lib/showToast";
import { isAuth } from "@/store/actions/userThunk";
import { clearNotifications } from "@/store/reducers/notificationsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UseEffects = () => {
    const dispatch = useDispatch<AppDispatch>();

    const notifications = useSelector((state:RootState)=>state.notifications);

    useEffect(()=>{
       // SIGN IN WITH COOKIE
       dispatch(isAuth());
    }, [dispatch]);

    useEffect(()=>{
        const {global} = notifications;
    
        if(notifications && global.error) {
          const msg = global.msg ? global.msg : 'Error';
          showToast('ERROR', msg);
          dispatch(clearNotifications())
        }
        if(notifications && global.success) {
          const msg = global.msg ? global.msg : 'Good!';
          showToast('SUCCESS', msg);
          dispatch(clearNotifications())
        }
    }, [notifications, dispatch]);
    return null;
}

export default UseEffects;