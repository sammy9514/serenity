import type { ReactNode } from "react";
import {
  LuWifi,
  LuTv,
  LuLock,
  LuCar,
  LuUtensils,
  LuRefrigerator,
  LuWashingMachine,
  LuBath,
  LuShowerHead,
  LuWind,
  LuBed,
  LuSofa,
  LuTrees,
  LuCheck,
} from "react-icons/lu";

// longest match wins, so "walk-in shower" beats "shower"
const byKeyword: { keyword: string; icon: ReactNode }[] = [
  { keyword: "wifi", icon: <LuWifi /> },
  { keyword: "tv", icon: <LuTv /> },
  { keyword: "lockbox", icon: <LuLock /> },
  { keyword: "parking", icon: <LuCar /> },
  { keyword: "oven", icon: <LuUtensils /> },
  { keyword: "cookware", icon: <LuUtensils /> },
  { keyword: "dishwasher", icon: <LuUtensils /> },
  { keyword: "fridge", icon: <LuRefrigerator /> },
  { keyword: "washer", icon: <LuWashingMachine /> },
  { keyword: "bathtub", icon: <LuBath /> },
  { keyword: "shower", icon: <LuShowerHead /> },
  { keyword: "towels", icon: <LuBath /> },
  { keyword: "hairdryer", icon: <LuWind /> },
  { keyword: "curtains", icon: <LuWind /> },
  { keyword: "bed", icon: <LuBed /> },
  { keyword: "sofa", icon: <LuSofa /> },
  { keyword: "garden", icon: <LuTrees /> },
];

export const amenityIcon = (label: string): ReactNode => {
  const text = label.toLowerCase();
  const match = byKeyword.find((entry) => text.includes(entry.keyword));
  return match ? match.icon : <LuCheck />;
};
