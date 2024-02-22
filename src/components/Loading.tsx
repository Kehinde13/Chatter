import loadingGif from '../assets/loading2.gif'


const Loading = () => {
  return (
    <div className="fixed inset-0 grid place-items-center bg-white z-30">
      <img className="w-[20rem]" src={loadingGif} alt="loading" />
    </div>
  );
};

export default Loading;