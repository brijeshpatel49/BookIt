import { useNavigate } from "react-router-dom";

interface ExperienceCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  location: string;
  isFeatured?: boolean;
}

export default function ExperienceCard({
  id,
  title,
  description,
  image,
  price,
  location,
}: ExperienceCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/experiences/${id}`);
  };

  return (
    <div
      className="bg-white rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 duration-300"
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
    >
      <div className="relative w-full h-56 bg-gray-200">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Location badge */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-md text-xs font-medium text-gray-700 shadow-md">
          {location}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 block mb-0.5">From </span>
            <span className="text-2xl font-bold text-gray-900">₹{price}</span>
          </div>
          <button
            onClick={handleClick}
            className="px-5 py-2.5 bg-yellow-400 text-gray-900 rounded-lg text-sm font-semibold hover:bg-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
