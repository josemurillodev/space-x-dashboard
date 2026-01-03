export function latLngToVector3(lat: number, lng: number, alt: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const r = radius + (alt / 100); // Scaling altitude down for better viz

  const x = -(r * Math.sin(phi) * Math.cos(theta));
  const z = (r * Math.sin(phi) * Math.sin(theta));
  const y = (r * Math.cos(phi));

  return [x, y, z] as [number, number, number];
}