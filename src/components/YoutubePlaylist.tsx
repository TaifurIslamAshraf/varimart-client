import { cn } from "@/lib/utils";

const YoutubePlaylist = () => {
  return (
    <iframe
      className={cn("max-w-[800px] w-full max-h-[450px] h-full mx-auto")}
      src="https://www.youtube.com/embed/videoseries?si=NY4QvRG1R3FCBSZI&amp;list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
};

export default YoutubePlaylist;
