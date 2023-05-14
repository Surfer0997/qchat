import React from 'react';

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  inputConfig: {
    [name: string]: string | boolean | undefined;
  };
  style?: any;
}

const LoginPageInput = React.forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
  return (
    <input
      className={`border-black border-solid border-2 rounded-md w-full h-8 indent-2 ${props.style}`}
      ref={ref}
      {...props.inputConfig}
      onChange={props.onChange}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
    />
  );
});
LoginPageInput.displayName = 'LoginPageInput';
export default LoginPageInput;
