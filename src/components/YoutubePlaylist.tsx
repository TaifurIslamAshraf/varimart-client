const YoutubePlaylist = () => {
  return (
    <div className="mx-auto max-w-[600px] w-full max-h-[400px] h-full">
      <iframe
        className="aspect-video w-full"
        src="https://www.youtube.com/embed/videoseries?si=-cZSsFaBfbjipiUE&amp;list=PL5WqtuU6JrnXjsGO4WUpJuSVmlDcEgEYb"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default YoutubePlaylist;
