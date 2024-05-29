// import logo from '/img/logo.png';
import '../index.css';

function Loading({ isLoading, children }: any) {
  return (
    <div className="">
      {
        isLoading ?
          <div className="tw-mx-auto tw-max-w-2xl md:tw-text-center">
            <div className="tw-flex tw-items-center tw-justify-center tw-h-screen">
              <img src="" width={"20%"} height={"100vh"} alt="Logo" className="tw-animate-bounce tw-text-center tw-max-w-full tw-h-auto tw-transition-all tw-ease-in-out" />
            </div>
          </div>
          :
          <div>
            {children}
          </div>
      }
    </div>
  );
}

export default Loading;
