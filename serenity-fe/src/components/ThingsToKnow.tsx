const groups = [
  {
    title: "House rules",
    items: [
      "Check-in after 3:00 pm",
      "Checkout before 11:00 am",
      "Maximum 6 guests",
      "No smoking, no parties",
    ],
  },
  {
    title: "Cancellation",
    items: [
      "Free cancellation up to [N] days before check-in.",
      "After that, the first night is non-refundable.",
    ],
  },
  {
    title: "Safety",
    items: ["Smoke alarm", "Carbon monoxide alarm", "First aid kit"],
  },
];

const ThingsToKnow = () => {
  return (
    <section className="mt-12 border-t border-line pt-12 pb-16">
      <h2 className="font-display text-3xl">Things to know</h2>
      <div className="mt-6 grid grid-cols-1 gap-10 sm:grid-cols-3">
        {groups.map((group) => (
          <div key={group.title} className="flex flex-col gap-2">
            <h3 className="text-xs font-bold uppercase tracking-widest">
              {group.title}
            </h3>
            {group.items.map((item) => (
              <p key={item} className="text-sm leading-relaxed text-ink/80">
                {item}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ThingsToKnow;
