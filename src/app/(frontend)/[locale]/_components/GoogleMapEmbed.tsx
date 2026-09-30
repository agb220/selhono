'use client'

interface GoogleMapEmbedProps {
  mapEmbedUrl?: string
}

export default function GoogleMapEmbed({ mapEmbedUrl }: GoogleMapEmbedProps) {
  if (!mapEmbedUrl) return null

  const isEmbedUrl =
    mapEmbedUrl.includes('google.com/maps/embed') || mapEmbedUrl.includes('output=embed')

  const src = isEmbedUrl
    ? mapEmbedUrl
    : `https://maps.google.com/maps?q=${encodeURIComponent(mapEmbedUrl)}&t=&z=15&ie=UTF8&iwloc=&output=embed`

  return (
    <section className="container pb-16 md:pb-24">
      <div className="w-full h-80 md:h-100 rounded-3xl overflow-hidden relative border border-dark-200/10 shadow-2xl">
        <iframe
          src={src}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full filter invert-[0.9] hue-rotate-180 contrast-[1.2]"
        />
      </div>
    </section>
  )
}
