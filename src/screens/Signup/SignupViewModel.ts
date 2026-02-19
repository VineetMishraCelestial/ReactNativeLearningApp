import { useState } from 'react';

export const useSignupViewModel = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const canSignup = (): boolean => {
    return (
      name.trim().length > 0 &&
      email.trim().length > 0 &&
      password.trim().length > 0
    );
  };

  return {
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    canSignup,
  };
};
