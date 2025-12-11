import type { UnsplashPhoto } from "../types/unsplash";

export default function PhotoCard({
  photo,
  onClick,
}: {
  photo: UnsplashPhoto;
  onClick: () => void;
}) {
  return (
    <article
      onClick={onClick}
      className="bg-white rounded overflow-hidden cursor-pointer hover:scale-[1.02] transition transform duration-200"
    >
      <img
        src={photo.urls.small}
        alt={photo.alt_description ?? "photo"}
        className="w-full aspect-square object-cover"
        loading="lazy"
      />
    </article>
  );
}
