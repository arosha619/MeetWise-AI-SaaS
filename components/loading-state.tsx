type LoadingCardProps = {
  title?: string;
  description?: string;
};

export const LoadingState = ({
  title = "Loading",
  description = "Please wait while we process your request",
}: LoadingCardProps) => {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center">
      <div className="w-full max-w-sm rounded-2xl border bg-background p-6 shadow-sm">
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Spinner */}
          <div className="relative h-8 w-8 animate-spin rounded-full bg-linear-to-r from-indigo-600 to-sky-500">
            <div className="absolute inset-1 rounded-full bg-background"></div>
          </div>

          {/* Title */}
          <h2 className="text-lg font-semibold">{title}</h2>

          {/* Description */}
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};
