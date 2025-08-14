import React from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useState, useEffect, useRef } from 'react';
import 'remixicon/fonts/remixicon.css'

function App() {
  let [showContent, setShowContent] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef(null);

  // Audio functionality
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true; // Set to loop infinitely
      audioRef.current.volume = 0.5; // Set volume to 50%
      
      // Add event listeners for audio state
      audioRef.current.addEventListener('play', () => setIsAudioPlaying(true));
      audioRef.current.addEventListener('pause', () => setIsAudioPlaying(false));
      audioRef.current.addEventListener('ended', () => setIsAudioPlaying(false));
    }
  }, []);

  // Function to handle audio play/pause
  const toggleAudio = async () => {
    if (audioRef.current) {
      try {
        if (isAudioPlaying) {
          audioRef.current.pause();
        } else {
          await audioRef.current.play();
        }
      } catch (error) {
        console.log('Audio play failed:', error);
      }
    }
  };

  // Try to play audio when user interacts with the page
  const handleUserInteraction = async () => {
    if (audioRef.current && !isAudioPlaying) {
      try {
        await audioRef.current.play();
      } catch (error) {
        console.log('Audio play failed:', error);
      }
    }
  };

  // Add user interaction listeners
  useEffect(() => {
    const handleClick = () => handleUserInteraction();
    const handleKeyPress = () => handleUserInteraction();
    
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyPress);
    
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isAudioPlaying]);
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "Expo.easeInOut",
    });

    gsap.to(".sky", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".character", {
      scale: 1.4,
      x: "-50%",
      bottom: "-25%",
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });
  })
 useGSAP(()=>{
  const main = document.querySelector(".main");
  main?.addEventListener("mousemove", function (e) {
    const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
    gsap.to(".imagesdiv .text", {
      x: `${xMove * 0.4}%`,
    });
    gsap.to(".sky", {
      x: xMove,
    });
    gsap.to(".bg", {
      x: xMove * 1.7,
    });
  });
 },[showContent])
 

    

   


   




  return (
    <>
      {/* Audio element for background music */}
      <audio 
        ref={audioRef}
        src="./sound/gtasound.mp3"
        preload="auto"
      />
     <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showContent && <div className="main w-full h-screen ">
        <div className='landing w-full h-screen '>
        <div className="navbar absolute top-0 left-0 z-[10] w-full py-10 px-10">
              <div className="logo flex gap-7">
                <div className="lines flex flex-col gap-[5px]">
                  <div className="line w-15 h-2 bg-white"></div>
                  <div className="line w-8 h-2 bg-white"></div>
                  <div className="line w-5 h-2 bg-white"></div>
                </div>
                <h3 className="text-4xl -mt-[8px] leading-none text-white">
                  Rockstar
                </h3>
              </div>
              {/* Audio Control Button */}
              <button 
                onClick={toggleAudio}
                className="absolute top-10 right-10 text-white text-2xl hover:text-gray-300 transition-colors"
                title={isAudioPlaying ? "Pause Audio" : "Play Audio"}
              >
                {isAudioPlaying ? (
                  <i className="ri-volume-mute-line"></i>
                ) : (
                  <i className="ri-volume-up-line"></i>
                )}
              </button>
            </div>
          <div className='imagesdiv relative w-full h-screen overflow-hidden'>
          <img className='sky scale-[1.2] absolute top-0 left-0 w-full h-full object-cover' src="./sky.png" alt="" />
            <img className='bg scale-[1.2] absolute top-0 left-0 w-full h-full object-cover' src="./bg.png" alt="" />
            <div className="text text-white flex flex-col gap-3 absolute top-[-13%] left-[52%] -translate-x-1/2 scale-[0.6] ">
                <h1 className="text-[12rem] leading-none -ml-40">grand</h1>
                <h1 className="text-[12rem] leading-none ml-20">theft</h1>
                <h1 className="text-[12rem] leading-none -ml-40">auto</h1>
              </div>
            <img
                className="absolute character -bottom-[72%] left-[54%] -translate-x-1/2  scale-[0.8] "
                src="./girlbg.png"
                alt=""
              />
              
          </div>
          <div className="btmbar text-white absolute bottom-0 left-0 w-full py-15 px-10 bg-gradient-to-t from-black to-transparent">
              <div className="flex gap-4 items-center">
                <i className="text-4xl ri-arrow-down-line"></i>
                <h3 className="text-xl font-[Helvetica_Now_Display]">
                  Scroll Down
                </h3>
              </div>
              
              <img
                className="absolute h-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src="./ps5.png"
                alt=""
              />
            </div>
        </div>
        <div className="w-full h-screen flex items-center justify-center bg-black">
            <div className="cntnr flex text-white w-full h-[80%] ">
              <div className="limg relative w-1/2 h-full">
                <img
                  className="absolute scale-[0.8] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  src="./imag.png"
                  alt=""
                />
              </div>
              <div className="rg w-[30%] py-30 absolute right-[20%] bottom-[-98%]">
                <h1 className="text-6xl">Still Running,</h1>
                <h1 className="text-6xl">Not Hunting</h1>
               
                <p className="mt-3 text-lg font-[Helvetica_Now_Display]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                  eius illum fugit eligendi nesciunt quia similique velit
                  excepturi soluta tenetur illo repellat consectetur laborum
                  eveniet eaque, dicta, hic quisquam? Ex cupiditate ipsa nostrum
                  autem sapiente.
                </p>
               
                <button className="bg-yellow-500 px-8 py-8 text-black mt-10 text-2xl">
                  Download Now
                </button>
              </div>
            </div>
          </div>
        </div>
      
      
      }
      
    </>
  )
}

export default App
