// src/frontend/services/packages.js
export async function fetchPackages(baseUrl) {
  try {
    const res = await fetch(`${baseUrl}/api/package-api`);
    if (!res.ok) throw new Error(`Failed to fetch packages, status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching packages:", err);
    return [];
  }
}

export async function fetchPackageBySlug(baseUrl, slug) {
  try {
    const res = await fetch(`${baseUrl}/api/package-api/${slug}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("Error fetching package:", err);
    return null;
  }
}
