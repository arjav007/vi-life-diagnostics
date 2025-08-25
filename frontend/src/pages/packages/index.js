import { useEffect, useState } from "react";

export default function PackagesPage() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetch("/api/packages")
      .then((res) => res.json())
      .then((data) => setPackages(data));
  }, []);

  return (
    <div>
      <h1>Available Packages</h1>
      <ul>
        {packages.map((pkg) => (
          <li key={pkg.id}>{pkg.name} — {pkg.price}₹</li>
        ))}
      </ul>
    </div>
  );
}
