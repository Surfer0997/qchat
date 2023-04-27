import { User } from '@/store/reducers/userSlice';
import { RootState } from '@/store/store';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';

interface PreventExtraSignInProps {
  children: ReactNode;
}

export const PreventExtraSignIn = (props: PreventExtraSignInProps) => {
  const user = useSelector((state: RootState) => state.user);

  const router = useRouter(); // PreventExtraSignIn
  useEffect(() => {
    if (user.auth) {
      router.push('/');
    }
  }, [user.auth, router]);

  return <>{user.auth ? null : props.children}</>;
};
