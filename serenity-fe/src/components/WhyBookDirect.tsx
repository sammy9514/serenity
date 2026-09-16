const whyBook = [
  {
    title: "Best rate, booked direct",
    summary: "No platform fees. The price you see is the price you pay.",
  },
  {
    title: "Walk through before you book",
    summary: "A full virtual tour of every room in each apartment.",
  },
  {
    title: "Self check-in, any time",
    summary: "Lockbox access and parking beside the house.",
  },
];
const WhyBookDirect = () => {
  return (
    <section>
      <div className="my-20 border-t border-line " />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {whyBook.map((desc) => (
          <div key={desc.title}>
            <h3 className="font-display text-2xl ">{desc.title}</h3>
            <p className="text-sm">{desc.summary} </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyBookDirect;
