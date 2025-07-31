import { useState } from "react";
import { Box, Button } from "../ui";

interface ImageCarouselProps {
  pictures: { url: string }[];
  altBase?: string;
}

export function ImageCarousel({
  pictures,
  altBase = "Imagem",
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? pictures.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === pictures.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box className="relative w-full max-w-md flex flex-col items-center gap-2">
      <Box className="relative w-full overflow-hidden rounded border border-gray-200">
        <img
          src={pictures[currentIndex].url}
          alt={`${altBase} ${currentIndex + 1}`}
          className="w-full object-contain rounded"
        />

        {/* Left arrow */}
        <Button
          onClick={handlePrev}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/70 rounded-full px-2 py-1 shadow hover:bg-white"
        >
          ◀
        </Button>

        {/* Right arrow */}
        <Button
          onClick={handleNext}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/70 rounded-full px-2 py-1 shadow hover:bg-white"
        >
          ▶
        </Button>
      </Box>

      <Box className="text-sm text-gray-600">
        {currentIndex + 1} / {pictures.length}
      </Box>
    </Box>
  );
}
