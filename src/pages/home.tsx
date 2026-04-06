import { useWindow } from '@lib/context/window-context';
import { ProtectedLayout } from '@components/layout/common-layout';
import { MainLayout } from '@components/layout/main-layout';
import { SEO } from '@components/common/seo';
import { MainContainer } from '@components/home/main-container';
import { Input } from '@components/input/input';
import { UpdateUsername } from '@components/home/update-username';
import { MainHeader } from '@components/home/main-header';
import type { ReactElement, ReactNode } from 'react';

export default function Home(): JSX.Element {
  const { isMobile } = useWindow();

  return (
    <MainContainer>
      <SEO title='Home / PeytOtoria' />
      <MainHeader
        useMobileSidebar
        title='Home'
        className='flex items-center justify-between'
      >
        <UpdateUsername />
      </MainHeader>
      {!isMobile && <Input />}
      <section className='mt-0.5 xs:mt-0'>
        <div className='border-b border-light-border p-8 text-center dark:border-dark-border'>
          <p className='text-light-secondary dark:text-dark-secondary'>
            Feed feature coming soon! Tweets will appear here once fully integrated with Supabase.
          </p>
        </div>
      </section>
    </MainContainer>
  );
}

Home.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <HomeLayout>{page}</HomeLayout>
    </MainLayout>
  </ProtectedLayout>
);
