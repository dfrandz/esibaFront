

import { Button } from "@/components/ui/button";
import slider1 from '/assets/slider/slider2.png'
import googleimage from '/assets/images/playgoogle.png'
import section from '/assets/images/section.png'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, CardContent } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { useSnapshot } from "valtio";
import state from '../valtio/store';
import { useQuery } from "@tanstack/react-query";

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none", background: "green" }}
      onClick={onClick}
    />
  );
}

const Accueil = () => {


  const snap = useSnapshot(state);

  const setting = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 6000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
    // cssEase: "linear"
  };

  const { data, isLoading } = useQuery({
    queryKey: ['pays'],
    queryFn: () => state.valtioCount.getPays()
  });

  console.log("chargement ", isLoading)
  console.log("pays ", snap.valtioCount.pays)
  console.log("data ", data)


  return (
    <>
      <section className="">

        <div className="overflow-hidden  min-h-[550px] sm:min-h-[100px] bg-[#CE7D1E] flex justify-center items-center">
          <div className="container pb-8 sm:pb-0">
            <Slider {...setting}>
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <div className="flex flex-col justify-center gap-4 sm:pl-3 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative ">
                    <h1 className="text-2xl sm:text-6xl lg:text-2xl font-bold text-white font-title">Vous etes a la recherche d'un article d occasion?</h1>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white font-title">Bienvenue <span className="text-lime-900"></span></h1>
                    <h1 className="text-5xl uppercase text-white sm:text-[80px] md:text-[100px] xl:text-[120px] font-bold ">headphone</h1>
                    <div className="text-black">
                      <Button variant={"outline"} className="bg-black text-white" size={"full"} >
                        Voir nos services
                      </Button>
                    </div>
                  </div>
                  <div className="order-1 sm:order-2">
                    <div className="relative">
                      <img src={slider1} alt="slider1" className="w-[300px] sm:w-[450px] h-[300px] sm:h-[361px] sm:scale-105 lg:scale-120 object-contain mx-auto drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)] relative z-40" />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  <div className="flex flex-col justify-center gap-4 sm:pl-3 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative ">
                    <h1 className="text-2xl sm:text-6xl lg:text-2xl font-bold text-white">Vous etes a la recherche d'un article d occasion?</h1>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white">Bienvenue sur <span className="text-lime-900">Flaxh vente</span></h1>
                    {/* <h1 className="text-5xl uppercase text-white sm:text-[80px] md:text-[100px] xl:text-[120px] font-bold ">headphone</h1> */}
                    <div className="text-black">
                      <Button variant={"outline"} className="bg-black text-white" size={"full"} >
                        Voir nos services
                      </Button>
                    </div>
                  </div>
                  <div className="order-1 sm:order-2">
                    <div className="relative">
                      <img src={slider1} alt="slider1" className="w-[300px] sm:w-[450px] h-[300px] sm:h-[361px] sm:scale-105 lg:scale-120 object-contain mx-auto drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)] relative z-40" />
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>

        {/* <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
          </div>
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Announcing our next round of funding. <a href="#" className="font-semibold text-indigo-600"><span className="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></a>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Data to enrich your online business</h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.</p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a href="#" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</a>
                <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Learn more <span aria-hidden="true">→</span></a>
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
            <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
          </div>
        </div> */}



        <section className="mx-auto mt-4 ">
          <Card className="w-full border-0 bg-gradient-to-r from-white to-[#CD670F]">
            <div className="grid grid-cols-1 sm:grid-cols-2 justify-center items-center gap-2 py-2 ">
              <div className="flex items-center justify-center">
                <h3 className="uppercase text-3xl font-title">App is live. get it now</h3>
              </div>
              <div className="flex flex-col items-center justify-center">
                {/* <h2 className="uppercase">telecharger notre appli</h2> */}
                <div className="flex items-center justify-center">
                  <Link to="/">
                    <img src={googleimage} alt="" className="w-[10rem] hover:scale-105 transition-all ease-linear duration-150" />
                  </Link>
                  <Link to="/">
                    <img src={googleimage} alt="" className="w-[10rem] hover:scale-105 transition-all ease-linear duration-150" />
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <div className="flex flex-col items-center justify-center p-4">
          <h2 className="text-3xl font-bold p-4 font-title">Get Your better sleep</h2>
          <p className="px-2 text-md font-semibold font-title italic">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti voluptas quo eos. Corrupti </p>
        </div>

        <div className="mx-auto p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div className="flex items-center justify-between gap-4 ">
            <div>
              <Button variant="outline" className="rounded-full">
                All
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4 shrink-0 opacity-50">
                  <path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </Button>
            </div>
            <div>
              <Button variant="outline" className="rounded-full">
                Chaises
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4 shrink-0 opacity-50">
                  <path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </Button>
            </div>
            <div>
              <Button variant="outline" className="rounded-full">
                Tables bureaux
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4 shrink-0 opacity-50">
                  <path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </Button>
            </div>
          </div>
          <div>
            <Button variant="outline" className="rounded-full">
              Tables bureaux
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4 shrink-0 opacity-50">
                <path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
            </Button>
          </div>
        </div>

        <section className="mx-auto mt-4 ">

          <div className="p-4">
            <h2 className="text-3xl font-bold font-dona">Les ventes en urgences</h2>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-6">
              <Card className=" shadow-none flex flex-col gap-2 w-full hover:scale-105 transition-all ease-linear duration-200">
                <CardContent className="border rounded-lg p-4 bg-slate-400">
                  <div className="flex justify-end items-end ">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4 shrink-0 opacity-50 bg-white rounded-md">
                      <path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div className="">
                    <img src={section} alt="" className="" />
                  </div>
                </CardContent>
                <div className="p-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">Chaise Gaming</h3>
                    <span className="flex">$100</span>
                  </div>
                  <span className="text-sm">Lorem ipsum dolor sit</span>
                  <div className="mt-2">
                    <span className="border p-1 rounded-full text-sm px-4">Add to Cart</span>
                  </div>
                </div>
              </Card>
              <Card className=" shadow-none flex flex-col gap-2 w-full hover:scale-105 transition-all ease-linear duration-200">
                <CardContent className="border rounded-lg p-4 bg-slate-400">
                  <div className="flex justify-end bg-white rounded-lg">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4 shrink-0 opacity-50 bg-white rounded-md">
                      <path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div className="">
                    <img src={section} alt="" className="" />
                  </div>
                </CardContent>
                <div className="p-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">Chaise Gaming</h3>
                    <span className="flex">$100</span>
                  </div>
                  <span className="text-sm">Lorem ipsum dolor sit</span>
                  <div className="mt-2">
                    <span className="border p-1 rounded-full text-sm px-4">Add to Cart</span>
                  </div>
                </div>
              </Card>
              <Card className=" shadow-none flex flex-col gap-2 w-full hover:scale-105 transition-all ease-linear duration-200">
                <CardContent className="border rounded-lg p-4 bg-slate-400">
                  <div className="flex justify-end bg-white rounded-lg">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4 shrink-0 opacity-50 bg-white rounded-md">
                      <path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div className="">
                    <img src={section} alt="" className="" />
                  </div>
                </CardContent>
                <div className="p-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">Chaise Gaming</h3>
                    <span className="flex">$100</span>
                  </div>
                  <span className="text-sm">Lorem ipsum dolor sit</span>
                  <div className="mt-2">
                    <span className="border p-1 rounded-full text-sm px-4">Add to Cart</span>
                  </div>
                </div>
              </Card>
              <Card className=" shadow-none flex flex-col gap-2 w-full hover:scale-105 transition-all ease-linear duration-200">
                <CardContent className="border rounded-lg p-4 bg-slate-400">
                  <div className="flex justify-end bg-white rounded-lg">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4 shrink-0 opacity-50 bg-white rounded-md">
                      <path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div className="">
                    <img src={section} alt="" className="" />
                  </div>
                </CardContent>
                <div className="p-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">Chaise Gaming</h3>
                    <span className="flex">$100</span>
                  </div>
                  <span className="text-sm">Lorem ipsum dolor sit</span>
                  <div className="mt-2">
                    <span className="border p-1 rounded-full text-sm px-4">Add to Cart</span>
                  </div>
                </div>
              </Card>
              <Card className=" shadow-none flex flex-col gap-2 w-full hover:scale-105 transition-all ease-linear duration-200">
                <CardContent className="border rounded-lg p-4 bg-slate-400">
                  <div className="flex justify-end bg-white rounded-lg">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4 shrink-0 opacity-50 bg-white rounded-md">
                      <path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div className="">
                    <img src={section} alt="" className="" />
                  </div>
                </CardContent>
                <div className="p-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">Chaise Gaming</h3>
                    <span className="flex">$100</span>
                  </div>
                  <span className="text-sm">Lorem ipsum dolor sit</span>
                  <div className="mt-2">
                    <span className="border p-1 rounded-full text-sm px-4">Add to Cart</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

        </section>

        <section className="mx-auto mt-4 ">

          <div className="p-4">
            <h2 className="text-3xl font-bold">Les ventes en urgences</h2>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-4">
              <Card className=" shadow-none flex flex-col gap-2 w-full hover:scale-105 transition-all ease-linear duration-200">
                <CardContent className="border rounded-lg p-4 bg-slate-400">
                  <div className="flex justify-end bg-white rounded-lg">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4 shrink-0 opacity-50 bg-white rounded-md">
                      <path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div className="">
                    <img src={section} alt="" className="" />
                  </div>
                </CardContent>
                <div className="p-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">Chaise Gaming</h3>
                    <span className="flex">$100</span>
                  </div>
                  <span className="text-sm">Lorem ipsum dolor sit</span>
                  <div className="mt-2">
                    <span className="border p-1 rounded-full text-sm px-4">Add to Cart</span>
                  </div>
                </div>
              </Card>
              <Card className=" shadow-none flex flex-col gap-2 w-full hover:scale-105 transition-all ease-linear duration-200">
                <CardContent className="border rounded-lg p-4 bg-slate-400">
                  <div className="flex justify-end bg-white rounded-lg">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4 shrink-0 opacity-50 bg-white rounded-md">
                      <path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div className="">
                    <img src={section} alt="" className="" />
                  </div>
                </CardContent>
                <div className="p-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">Chaise Gaming</h3>
                    <span className="flex">$100</span>
                  </div>
                  <span className="text-sm">Lorem ipsum dolor sit</span>
                  <div className="mt-2">
                    <span className="border p-1 rounded-full text-sm px-4">Add to Cart</span>
                  </div>
                </div>
              </Card>
              <Card className=" shadow-none flex flex-col gap-2 w-full hover:scale-105 transition-all ease-linear duration-200">
                <CardContent className="border rounded-lg p-4 bg-slate-400">
                  <div className="flex justify-end bg-white rounded-lg">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4 shrink-0 opacity-50 bg-white rounded-md">
                      <path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div className="">
                    <img src={section} alt="" className="" />
                  </div>
                </CardContent>
                <div className="p-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">Chaise Gaming</h3>
                    <span className="flex">$100</span>
                  </div>
                  <span className="text-sm">Lorem ipsum dolor sit</span>
                  <div className="mt-2">
                    <span className="border p-1 rounded-full text-sm px-4">Add to Cart</span>
                  </div>
                </div>
              </Card>
              <Card className=" shadow-none flex flex-col gap-2 w-full hover:scale-105 transition-all ease-linear duration-200">
                <CardContent className="border rounded-lg p-4 bg-slate-400">
                  <div className="flex justify-end bg-white rounded-lg">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4 shrink-0 opacity-50 bg-white rounded-md">
                      <path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div className="">
                    <img src={section} alt="" className="" />
                  </div>
                </CardContent>
                <div className="p-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">Chaise Gaming</h3>
                    <span className="flex">$100</span>
                  </div>
                  <span className="text-sm">Lorem ipsum dolor sit</span>
                  <div className="mt-2">
                    <span className="border p-1 rounded-full text-sm px-4">Add to Cart</span>
                  </div>
                </div>
              </Card>
              <Card className=" shadow-none flex flex-col gap-2 w-full hover:scale-105 transition-all ease-linear duration-200">
                <CardContent className="border rounded-lg p-4 bg-slate-400">
                  <div className="flex justify-end bg-white rounded-lg">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4 shrink-0 opacity-50 bg-white rounded-md">
                      <path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div className="">
                    <img src={section} alt="" className="" />
                  </div>
                </CardContent>
                <div className="p-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">Chaise Gaming</h3>
                    <span className="flex">$100</span>
                  </div>
                  <span className="text-sm">Lorem ipsum dolor sit</span>
                  <div className="mt-2">
                    <span className="border p-1 rounded-full text-sm px-4">Add to Cart</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          {/* <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="account" className="">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>

              <TabsContent value="account">
                <div className="w-full">
                  <Card
                    className="" x-chunk="dashboard-01-chunk-4"
                  >
                    <CardHeader className="flex flex-row items-center">
                      list expert top
                    </CardHeader>
                    <CardContent>

                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="password">
                <div>
                  password
                </div>
              </TabsContent>
            </Tabs>
          </main> */}
        </section>

      </section>
        
    </>
  )
}

export default Accueil