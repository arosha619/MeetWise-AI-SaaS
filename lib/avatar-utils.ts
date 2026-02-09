/**
 * Returns an avatar image URL. Uses the provided image if available,
 * otherwise generates one from the name using UI Avatars.
 */
export function getAvatarUrl(
  image: string | null | undefined,
  name: string | null | undefined
): string {
  if (image && typeof image === "string") return image;
  const displayName = name && typeof name === "string" ? name.trim() : "User";
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`;
}
