import loadingGif from '../assets/loader.gif'


const Loading = () => {
  return (
    <div className="fixed inset-0 grid place-items-center bg-white dark:bg-slate-800 z-30" data-testid="loading">
      <img className="w-[20rem]" src={loadingGif} alt="loading" />
    </div>
  );
};

export default Loading;