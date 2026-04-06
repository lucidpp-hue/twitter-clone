import { useState } from 'react';
import toast from 'react-hot-toast';
import { NextImage } from '../ui/next-image';
import { CustomIcon } from '../ui/custom-icon';
import { Button } from '../ui/button';
import { useAuth } from '../../lib/context/auth-context';

export function LoginMain(): JSX.Element {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');
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

    if (authMode === 'signup' && !username) {
      toast.error('Please enter a username');
      return;
    }

    setIsSubmitting(true);

    try {
      if (authMode === 'signup') {
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
    <main className='grid lg:grid-cols-[1fr,45vw]'>
      <div className='relative hidden items-center justify-center  lg:flex'>
        <NextImage
          imgClassName='object-cover'
          blurClassName='bg-accent-blue'
          src='/assets/twitter-banner.png'
          alt='Twitter banner'
          layout='fill'
          useSkeleton
        />
        <i className='absolute'>
          <CustomIcon className='h-96 w-96 text-white' iconName='TwitterIcon' />
        </i>
      </div>
      <div className='flex flex-col items-center justify-between gap-6 p-8 lg:items-start lg:justify-center'>
        <i className='mb-0 self-center lg:mb-10 lg:self-auto'>
          <CustomIcon
            className='-mt-4 h-6 w-6 text-accent-blue lg:h-12 lg:w-12 dark:lg:text-twitter-icon'
            iconName='TwitterIcon'
          />
        </i>
        <div className='flex max-w-xs flex-col gap-4 font-twitter-chirp-extended lg:max-w-none lg:gap-16'>
          <h1
            className='text-3xl before:content-["See_what's_happening_in_the_world_right_now."] 
                       lg:text-6xl lg:before:content-["2026_PeytOtoria"]'
          />
          <h2 className='hidden text-xl lg:block lg:text-3xl'>
            Join PeytOtoria today.
          </h2>
        </div>
        <div className='flex max-w-xs flex-col gap-6'>
          <form onSubmit={handleSubmit} className='w-full max-w-xs space-y-4'>
            {authMode === 'signup' && (
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
              {isSubmitting ? 'Loading...' : authMode === 'signup' ? 'Sign Up' : 'Sign In'}
            </Button>
          </form>
          
          <div className='flex flex-col gap-3 text-center'>
            {authMode === 'signup' ? (
              <>
                <p className='text-sm text-light-secondary dark:text-dark-secondary'>
                  Already have an account?{' '}
                  <button
                    onClick={() => setAuthMode('signin')}
                    className='font-bold text-accent-blue hover:underline'
                  >
                    Sign In
                  </button>
                </p>
              </>
            ) : (
              <>
                <p className='text-sm text-light-secondary dark:text-dark-secondary'>
                  Don&apos;t have an account?{' '}
                  <button
                    onClick={() => setAuthMode('signup')}
                    className='font-bold text-accent-blue hover:underline'
                  >
                    Sign Up
                  </button>
                </p>
              </>
            )}
          </div>

          <p
            className='inner:custom-underline inner:custom-underline text-center text-xs
                       text-light-secondary inner:text-accent-blue dark:text-dark-secondary'
          >
            By signing up, you agree to the{' '}
            <a
              href='https://twitter.com/tos'
              target='_blank'
              rel='noreferrer'
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              href='https://twitter.com/privacy'
              target='_blank'
              rel='noreferrer'
            >
              Privacy Policy
            </a>
            , including{' '}
            <a
              href='https://help.twitter.com/rules-and-policies/twitter-cookies'
              target='_blank'
              rel='noreferrer'
            >
              Cookie Use
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
