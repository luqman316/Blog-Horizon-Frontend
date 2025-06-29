"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
const autoplayPlugin = Autoplay({ delay: 4000 });
// const autoplayPlugin = Autoplay({});
function Hero() {
  return (
    <>
      <Carousel
        plugins={[autoplayPlugin]}
        className="w-full h-full  overflow-hidden"
      >
        <CarouselContent>
          <CarouselItem>
            <div className="relative w-full h-[490px] ">
              <Image
                src="/h1.jpg"
                alt="ss"
                fill
                style={{ objectFit: "cover" }}
                quality={100}
                className=""
                priority
              />
              <div className="px-9 absolute inset-0 flex flex-col justify-between p-8 bg-gradient-to-r from-black/60 via-black/30 to-transparent">
                <div>
                  <span className="bg-white/30 text-white px-4 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                    Destination
                  </span>
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Exploring the Wonders of Hiking
                  </h2>
                  <p className="text-white text-lg max-w-xl mb-6">
                    An iconic landmarks, this post unveils the secrets that make
                    this destination a travelers paradise.
                  </p>
                  <div className="flex items-center gap-3">
                    {/* <Image
                      src="/profile.jpg"
                      alt="Author"
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-white"
                    /> */}
                    <div>
                      <div className="text-white font-semibold">
                        Theodore Reginald
                      </div>
                      <div className="text-white/80 text-sm flex gap-2">
                        <span>24 Jan 2024</span>
                        <span>•</span>
                        <span>10 mins read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="relative w-full h-[490px]">
              <Image
                src="/h2.jpg"
                alt="ss"
                fill
                style={{ objectFit: "cover" }}
                quality={100}
                className=""
              />
              <div className="px-9 absolute inset-0 flex flex-col justify-between p-8 bg-gradient-to-r from-black/60 via-black/30 to-transparent">
                <div>
                  <span className="bg-white/30 text-white px-4 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                    Destination
                  </span>
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Exploring the Wonders of Hiking
                  </h2>
                  <p className="text-white text-lg max-w-xl mb-6">
                    An iconic landmarks, this post unveils the secrets that make
                    this destination a travelers paradise.
                  </p>
                  <div className="flex items-center gap-3">
                    {/* <Image
                      src="/profile.jpg"
                      alt="Author"
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-white"
                    /> */}
                    <div>
                      <div className="text-white font-semibold">
                        Theodore Reginald
                      </div>
                      <div className="text-white/80 text-sm flex gap-2">
                        <span>24 Jan 2024</span>
                        <span>•</span>
                        <span>10 mins read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="relative w-full h-[490px]">
              <Image
                src="/h3.jpg"
                alt="ss"
                fill
                style={{ objectFit: "cover" }}
                quality={100}
                className=""
              />
              <div className="px-9 absolute inset-0 flex flex-col justify-between p-8 bg-gradient-to-r from-black/60 via-black/30 to-transparent">
                <div>
                  <span className="bg-white/30 text-white px-4 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                    Destination
                  </span>
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Exploring the Wonders of Hiking
                  </h2>
                  <p className="text-white text-lg max-w-xl mb-6">
                    An iconic landmarks, this post unveils the secrets that make
                    this destination a travelers paradise.
                  </p>
                  <div className="flex items-center gap-3">
                    {/* <Image
                      src="/profile.jpg"
                      alt="Author"
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-white"
                    /> */}
                    <div>
                      <div className="text-white font-semibold">
                        Theodore Reginald
                      </div>
                      <div className="text-white/80 text-sm flex gap-2">
                        <span>24 Jan 2024</span>
                        <span>•</span>
                        <span>10 mins read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="!left-4 !bg-white !text-black !shadow-md hover:!bg-gray-100" />
        <CarouselNext className="!right-4 !bg-white !text-black !shadow-md hover:!bg-gray-100" />
      </Carousel>
    </>
  );
}

export default Hero;
