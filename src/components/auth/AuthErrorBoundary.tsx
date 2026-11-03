"use client";

import { useState } from "react";
import { mapSupabaseAuthError } from "@/lib/auth/errors";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface AuthErrorBoundaryProps {
  error: Error | { message: string };
  reset: () => void;
}

export function AuthErrorBoundary({ error, reset }: AuthErrorBoundaryProps) {
  const [displayError, setDisplayError] = useState<string | null>(null);

  useEffect(() => {
    // Map Supabase-specific errors to user-friendly messages
    setDisplayError(mapSupabaseAuthError(error as { message: string }));
  }, [error, reset]);

  return (
    <div className="rounded-lg border border-error/20 bg-error/5 p-6 max-w-md mx-auto">
      <div className="flex items-start gap-3">
        <Badge tone="error" className="h-5 w-5 flex-shrink-0">
          <X className="h-3 w-3" strokeWidth={1.8} />
        </Badge>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-error mb-1">
            {displayError || "Authentication error"}
          </p>
          <p className="text-xs text-error/80 line-clamp-2">
            {displayError || "An authentication error occurred. Please try again."}
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={reset}
          aria-label="Try again"
        >
          Try Again
        </Button>
        <Button
          variant="link"
          size="sm"
          ml-2
          onClick={() => {
            reset();
            // Could redirect to sign in
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}