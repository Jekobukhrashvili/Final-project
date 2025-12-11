import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { UnsplashPhoto } from "../types/unsplash";

function PhotoDetailComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const photo = location.state?.photo as UnsplashPhoto | undefined;

  if (!photo) {
    return (
      <div className="p-4 text-center bg-red-100 rounded-lg shadow-md max-w-md mx-auto mt-10">
        <p className="text-red-700 font-semibold mb-4">Photo not found.</p>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 flex flex-col items-center bg-white rounded-xl shadow-lg mt-10">
      <button
        className="
          mb-4 px-5 py-2.5 
          bg-blue-600 text-white font-medium 
          rounded-xl shadow 
          hover:bg-blue-700 
          hover:shadow-lg 
          hover:scale-[1.03] 
          active:scale-95
          transition-all duration-200
          cursor-pointer
        "
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <div
        className="overflow-hidden rounded-xl mb-6 shadow-md"
        style={{ width: "500px", height: "500px" }}
      >
        <img
          src={photo.urls.regular}
          alt={photo.alt_description ?? "photo"}
          className="w-full h-full object-cover"
        />
      </div>

      <h1 className="text-2xl font-bold mb-2 text-center">
        {photo.alt_description ?? "No description"}
      </h1>

      <p className="text-red-700 font-bold text-center mb-1">
        <span className="font-bold text-green-600">Photographer:</span>{" "}
        {photo.user.name}
      </p>

      <p className="text-red-700 font-bold text-center">
        <span className="font-bold text-green-600">Views:</span> {photo.likes}
      </p>
    </div>
  );
}

export default React.memo(PhotoDetailComponent);
