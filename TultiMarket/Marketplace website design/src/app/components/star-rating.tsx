import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  showCount?: boolean;
  count?: number;
}

export function StarRating({
  rating,
  maxStars = 5,
  size = 16,
  interactive = false,
  onChange,
  showCount = false,
  count,
}: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: maxStars }, (_, i) => {
          const filled = i < Math.floor(rating);
          const halfFilled = !filled && i < rating;
          return (
            <button
              key={i}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onChange?.(i + 1)}
              className={`${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"} transition-transform`}
            >
              <Star
                size={size}
                className={
                  filled
                    ? "fill-amber-400 text-amber-400"
                    : halfFilled
                    ? "fill-amber-400/50 text-amber-400"
                    : "fill-gray-200 text-gray-300"
                }
              />
            </button>
          );
        })}
      </div>
      {showCount && count !== undefined && (
        <span className="text-muted-foreground ml-1" style={{ fontSize: size - 2 }}>
          ({count})
        </span>
      )}
    </div>
  );
}
