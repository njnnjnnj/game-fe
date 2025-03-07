import {
  FunctionComponent,
  PropsWithChildren,
  // useEffect,
  // useState,
} from "react";

// import Image from "next/image";

// import MainImage from "@/public/assets/png/main-bg.webp";
// import SplashBg from "@/public/assets/png/slot-machine/bg.webp";

export const SplashScreen: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  // const [progress, setProgress] = useState(0);
  // const [showChildren, setShowChildren] = useState(false);
  // console.log("Splash screen");

  // useEffect(() => {
  //   setTimeout(() => {
  //     setProgress((progress) => progress + 50);
  //   }, 1000);
  // }, []);
  return children;
  // return !showChildren ? (
  //   <div className="fixed inset-0 z-50 flex items-center justify-center">
  //     <Image src={SplashBg} sizes="100vw" alt="Splash screen" fill />

  //     <div className="absolute bottom-5 mx-auto h-2.5 w-1/2 rounded bg-[rgba(0,0,0,0.3)]">
  //       <div
  //         className="h-full max-w-full rounded bg-[#FFCC00] transition-[width] duration-300"
  //         style={{
  //           width: `${progress}%`,
  //           minWidth: progress > 0 ? 1 : undefined,
  //         }}
  //         onTransitionEnd={() => {
  //           if (progress === 100) {
  //             setShowChildren(true);
  //           }
  //         }}
  //       />
  //     </div>

  //     <Image
  //       className="invisible"
  //       src={MainImage}
  //       onLoad={() => {
  //         setProgress((progress) => progress + 50);
  //       }}
  //       alt="main-bg"
  //       fill
  //     />
  //   </div>
  // ) : (
  //   children
  // );
};
