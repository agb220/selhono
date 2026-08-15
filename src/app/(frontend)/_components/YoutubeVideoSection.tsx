export const YoutubeVideoSection = ({ url }: { url: string }) => {
  if (!url) return null

  const convertYouTubeLink = () => {
    const shortsRegex = /^https:\/\/www\.youtube\.com\/shorts\/([a-zA-Z0-9_-]+)(\?.*)?$/
    const normalRegex = /^https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)(\?.*)?$/
    const shortUrlRegex = /^https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)(\?.*)?$/

    let match
    if ((match = url.match(shortsRegex))) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&playlist=${match[1]}&loop=1&controls=0`
    } else if ((match = url.match(normalRegex)) || (match = url.match(shortUrlRegex))) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&loop=1&playlist=${match[1]}&controls=0`
    }
    return null
  }

  const convertedLink = convertYouTubeLink()

  if (!convertedLink) return null

  return (
    <section className="pb-16 md:pb-24 mx-auto container">
      <div className="relative w-full aspect-video md:aspect-1210/599 rounded-[30px] md:rounded-[40px] overflow-hidden shadow-sm bg-slate-100">
        <iframe
          src={convertedLink}
          title="YouTube Video"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="w-full h-[125%] mt-[-8%] scale-120 xl:scale-105 border-0 pointer-events-none"
        />
      </div>
    </section>
  )
}
