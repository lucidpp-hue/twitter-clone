import { useState } from 'react';
import { NextImage } from '@components/ui/next-image';
import { CustomIcon } from '@components/ui/custom-icon';
import { Button } from '@components/ui/button';
import { AuthForm } from './auth-form';

export function LoginMain(): JSX.Element {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');

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
          <AuthForm mode={authMode} />
          
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
