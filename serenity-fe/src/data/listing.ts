interface Listing {
  id: string;
  name: string;
  summary: string;
  pricePerNight: number;
  sleeps: number;
}

export const listings: Listing[] = [
  {
    id: "apt-1",
    name: "[Apartment 1 name]",
    summary: "2 bedrooms · 2 bathrooms · private garden · parking.",
    pricePerNight: 500,
    sleeps: 6,
  },
  {
    id: "apt-2",
    name: "[Apartment 2 name]",
    summary: "2 bedrooms · 2 bathrooms · [what makes it different].",
    pricePerNight: 500,
    sleeps: 6,
  },
];
