type Props = {
  url?: string;
  caption: string;
  className?: string;
};

/** an image, or a labelled placeholder while the client's photos are pending */
const Photo = ({ url, caption, className = "" }: Props) => {
  if (url)
    return (
      <img
        src={url}
        alt={caption}
        className={`bg-taupe object-cover ${className}`}
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
