const WhereYouSleep = () => {
  const sleepInfo = [
    { roomType: "Mater Bedroom", roomInfo: "1 king bed · ensuite · sleeps 2" },
    { roomType: "Mater Bedroom", roomInfo: "1 king bed · ensuite · sleeps 2" },
    { roomType: "Mater Bedroom", roomInfo: "1 king bed · ensuite · sleeps 2" },
  ];

  return (
    <div>
      <h2 className="text-3xl font-display ">Where you'll sleep</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {sleepInfo.map((info) => (
          <div key={info.roomInfo}>
            <div className="aspect-4/3 bg-taupe p-3 flex items-end mt-5 ">
              {info.roomType}
            </div>

            <h3 className="font-semibold text-lg mt-3 ">{info.roomType} </h3>
            <p>{info.roomInfo}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhereYouSleep;
