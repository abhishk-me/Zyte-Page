
// Nothing to show on the homepage as it's a test website. The landing pages appear on their respective routes.
export default function Index() {
  return (
    <>
      <div className='flex flex-col items-center pt-48'>
        <h1 className='text-4xl font-bold'>Uh-oh!</h1>
        <h3 className='text-lg font-bold mt-2'>Nothing to show here!</h3>
        <p>
          <span>This is a test website for building landing pages.</span>
        </p>
      </div>
    </>
  );
}