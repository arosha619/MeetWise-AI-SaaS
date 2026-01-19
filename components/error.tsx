type ErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
};

export const ErrorState = ({
  title = "Something went wrong",
  description = "We couldn’t complete your request. Please try again.",
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-full max-w-sm rounded-2xl border bg-background p-6 shadow-sm">
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Error Icon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
            <span className="text-xl font-bold">!</span>
          </div>

          {/* Title */}
          <h2 className="text-lg font-semibold">{title}</h2>

          {/* Description */}
          <p className="text-sm text-muted-foreground">{description}</p>

          {/* Retry Button (optional) */}
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
