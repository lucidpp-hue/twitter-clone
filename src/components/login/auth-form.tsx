import { useState } from 'react';
import { useAuth } from '@lib/context/auth-context';
import { Button } from '@components/ui/button';
import toast from 'react-hot-toast';

type AuthFormProps = {
  mode: 'signin' | 'signup';
};

export function AuthForm({ mode }: AuthFormProps): JSX.Element {
  const { signUp, signIn, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (mode === 'signup' && !username) {
      toast.error('Please enter a username');
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === 'signup') {
        await signUp(email, password, username);
        toast.success('Account created! Redirecting...');
      } else {
        await signIn(email, password);
        toast.success('Signed in! Redirecting...');
      }
    } catch (err) {
      toast.error((err as Error).message || 'Authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-xs space-y-4'>
      {mode === 'signup' && (
        <div>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-full rounded border border-light-border bg-transparent px-4 py-2
                       text-light-primary placeholder-light-secondary focus:border-accent-blue focus:outline-none
                       dark:border-dark-border dark:text-dark-primary dark:placeholder-dark-secondary'
            disabled={isSubmitting || loading}
          />
        </div>
      )}
      
      <div>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full rounded border border-light-border bg-transparent px-4 py-2
                     text-light-primary placeholder-light-secondary focus:border-accent-blue focus:outline-none
                     dark:border-dark-border dark:text-dark-primary dark:placeholder-dark-secondary'
          disabled={isSubmitting || loading}
        />
      </div>

      <div>
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full rounded border border-light-border bg-transparent px-4 py-2
                     text-light-primary placeholder-light-secondary focus:border-accent-blue focus:outline-none
                     dark:border-dark-border dark:text-dark-primary dark:placeholder-dark-secondary'
          disabled={isSubmitting || loading}
        />
      </div>

      {error && (
        <p className='text-xs text-red-500'>
          {(error as any)?.message || 'Authentication failed'}
        </p>
      )}

      <Button
        type='submit'
        disabled={isSubmitting || loading}
        className='w-full bg-accent-blue text-white transition hover:brightness-90
                   focus-visible:!ring-accent-blue/80 focus-visible:brightness-90 active:brightness-75
                   disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {isSubmitting ? 'Loading...' : mode === 'signup' ? 'Sign Up' : 'Sign In'}
      </Button>
    </form>
  );
}
