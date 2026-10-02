type Props = {
  url?: string;
  caption: string;
  className?: string;
  /** rough rendered width, so cloudinary sends a sensibly sized file */
  width?: number;
};

// cloudinary can crop and compress on the fly: g_auto picks the subject rather
// than the middle of the frame, f_auto and q_auto pick format and quality
const transform = (url: string, width: number) =>
  url.includes("/image/upload/")
    ? url.replace(
        "/image/upload/",
        `/image/upload/c_fill,g_auto,f_auto,q_auto,w_${width}/`,
      )
    : url;

/** an image, or a labelled placeholder while the client's photos are pending */
const Photo = ({ url, caption, className = "", width = 1200 }: Props) => {
  if (url)
    return (
      <img
        src={transform(url, width)}
        alt={caption}
        loading="lazy"
        className={`bg-taupe object-cover object-center ${className}`}
      />
    );

  return (
    <div
      className={`flex items-end bg-taupe p-3 text-xs uppercase tracking-widest text-ink/60 ${className}`}
    >
      {caption}
    </div>
  );
};

export default Photo;
