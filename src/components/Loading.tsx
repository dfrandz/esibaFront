import logo from '/assets/images/95.jpg';
import '../index.css';

function Loading({ isLoading, children }: any) {
  return (
    <div className="">
      {
        isLoading ?
          <div className="mx-auto max-w-2xl md:text-center">
            <div className="flex items-center justify-center h-screen">
              <img src={logo} width={"20%"} height={"100vh"} alt="Logo" className="animate-bounce text-center max-w-full h-auto transition-all ease-in-out" />
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
