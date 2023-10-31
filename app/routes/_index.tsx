import { useOutletContext } from '@remix-run/react';
import { PageDataType } from '~/types/page-data';
import { ContainerComponent } from '~/website-themes/dawn/container';

export default function Index() {
  const { page } = useOutletContext<{ page: PageDataType, onSelectElement: (id: string) => void }>();
  return (
    <>
      <div className='flex flex-col items-center pt-48'>
        <h1 className='text-4xl font-bold'>Uh-oh!</h1>
        <h3 className='text-lg font-bold mt-2'>Nothing to show here!</h3>
        <p>
          <span>This is a text website for building landing pages.</span>
        </p>
      </div>
    </>
  );
}