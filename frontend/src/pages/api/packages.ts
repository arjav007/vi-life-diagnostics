import type { NextApiRequest, NextApiResponse } from "next";

const packages = [
  {
    id: 1,
    name: "Full Body Checkup",
    price: 1999,
    parameterCount: 75,
    slug: "full-body-checkup",
    featured: true,
  },
  {
    id: 2,
    name: "Diabetes Package",
    price: 799,
    parameterCount: 20,
    slug: "diabetes-package",
    featured: true,
  },
  {
    id: 3,
    name: "Heart Checkup",
    price: 1499,
    parameterCount: 35,
    slug: "heart-checkup",
    featured: false,
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { featured } = req.query;

  const filteredPackages = featured
    ? packages.filter((pkg) => pkg.featured)
    : packages;

  res.status(200).json(filteredPackages);
}
