import type { ErrorMessageProps } from "../types";

export function ErrorMessage({
  message = "Ocorreu um erro.",
  onRetry,
  children,
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-red-600">
      <svg
        className="w-12 h-12 mb-4 text-red-600"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01M4.93 19.07a10 10 0 1114.14 0M12 5v.01"
        />
      </svg>

      {children || <p className="mb-4 text-center">{message}</p>}

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          aria-label="Tentar novamente"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
