import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPhotos, searchPhotos, PER_PAGE } from "../interface/unsplash";
import type { UnsplashPhoto } from "../types/unsplash";

import SearchBar from "../components/SearchBar";
import PhotoCard from "../components/PhotoCard";
import { useDebounce } from "../hooks/useDebounce";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const qc = useQueryClient();
  const navigate = useNavigate();

  const queryKey = debouncedSearch
    ? ["search", debouncedSearch, page]
    : ["photos", page];

  const photosQuery = useQuery<UnsplashPhoto[], Error>({
    queryKey,
    queryFn: async () => {
      if (!debouncedSearch) return fetchPhotos({ page });
      const r = await searchPhotos({ query: debouncedSearch, page });
      return r.results;
    },
    placeholderData: () => qc.getQueryData<UnsplashPhoto[]>(queryKey),
  });

  const photos = photosQuery.data ?? [];

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <header className="mb-6 text-center">
        <h1 className="p- text-4xl underline text-blue-500 px-6 py-3 rounded-lg font-bold">
          Gallery
        </h1>
      </header>
      <div className="mb-6 flex justify-center">
        <SearchBar
          value={search}
          onChange={(v: string) => {
            setSearch(v);
            setPage(1);
          }}
        />
      </div>

      <div className="grid grid-cols-5 gap-4">
        {photos.slice(0, 20).map((p) => (
          <PhotoCard
            key={p.id}
            photo={p}
            onClick={() => navigate(`/photo/${p.id}`, { state: { photo: p } })}
          />
        ))}
      </div>

      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          disabled={page === 1 || photosQuery.isFetching}
          onClick={() => setPage((s) => Math.max(1, s - 1))}
          className={`
  px-6 py-2 rounded-xl font-semibold
  transition-all duration-200
  ${
    page === 1 || photosQuery.isFetching
      ? "bg-red-300 text-white cursor-not-allowed opacity-70"
      : "bg-red-500 text-white hover:bg-red-600 hover:shadow-lg active:scale-95 cursor-pointer"
  }
`}
        >
          Previous
        </button>

        <span className="text-white font-medium">
          Showing {photos.length} photos • Page {page}
        </span>

        <button
          disabled={photosQuery.isFetching || photos.length < PER_PAGE}
          onClick={() => setPage((s) => s + 1)}
          className={`px-6 py-2 rounded-lg text-white font-medium transition duration-200 ${
            photosQuery.isFetching || photos.length < PER_PAGE
              ? "bg-red-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg cursor-pointer"
          }`}
        >
          Next
        </button>
      </div>

      {photosQuery.isLoading && (
        <div className="mt-6 text-center text-gray-600">Loading…</div>
      )}
      {photosQuery.isError && (
        <div className="mt-6 text-center text-red-600">
          Error loading photos
        </div>
      )}
    </section>
  );
}
