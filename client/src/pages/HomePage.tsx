import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getExperiences } from "../lib/api";
import type { Experience } from "../types";
import ExperienceCard from "../components/ExperienceCard";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";

export default function Home() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        setLoading(true);
        setError(null);
        const data = await getExperiences();
        setExperiences(data);
        setFilteredExperiences(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load experiences. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchExperiences();
  }, []);

  // Filter experiences based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredExperiences(experiences);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = experiences.filter(
      (exp) =>
        exp.title.toLowerCase().includes(query) ||
        exp.description.toLowerCase().includes(query) ||
        exp.location.toLowerCase().includes(query) ||
        exp.category.toLowerCase().includes(query)
    );
    setFilteredExperiences(filtered);
  }, [searchQuery, experiences]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading && (
          <div className="flex justify-center items-center min-h-[400px]">
            <LoadingSpinner size="lg" message="Loading experiences..." />
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
              <svg
                className="w-12 h-12 text-red-500 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h2 className="text-lg font-semibold text-red-900 mb-2">
                Oops! Something went wrong
              </h2>
              <p className="text-red-700">{error}</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && experiences.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="text-center">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                No experiences available
              </h2>
              <p className="text-gray-600">
                Check back later for new travel experiences
              </p>
            </div>
          </div>
        )}

        {!loading && !error && experiences.length > 0 && (
          <>
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Discover Amazing Experiences
                  </h1>
                  <p className="text-gray-600">
                    Curated small-group experiences. Certified guide. Safety
                    first with gear included.
                  </p>
                </div>

                <div className="lg:w-96">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-4 pr-10 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  {searchQuery && (
                    <p className="mt-2 text-xs text-gray-500">
                      Found {filteredExperiences.length}{" "}
                      {filteredExperiences.length === 1
                        ? "experience"
                        : "experiences"}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {filteredExperiences.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="w-16 h-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  No experiences found
                </h2>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search to find what you're looking for
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-6 py-2 bg-primary text-gray-900 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {filteredExperiences.map((experience, index) => (
                  <motion.div
                    key={experience._id}
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: 50,
                      },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.5,
                          ease: "easeOut",
                        },
                      },
                    }}
                    whileHover={{
                      y: -8,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <ExperienceCard
                      id={experience._id}
                      title={experience.title}
                      description={experience.description}
                      image={experience.image}
                      price={experience.price}
                      duration={experience.duration}
                      location={experience.location}
                      isFeatured={index === 2}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
