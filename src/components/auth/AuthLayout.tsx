import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { BrandMark } from "@/components/common/brand-mark";
import { cn } from "@/lib/utils";

export function AuthLayout({
  children,
  showBrand = true,
}: { children: React.ReactNode; showBrand?: boolean }) {
  return (
    <main className="min-h-screen bg-background p-4 md:p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-[1400] mx-auto">
        {showBrand && (
          <BrandMark
            size="lg"
            showWordmark={true}
            tone="dark"
            className="mb-8"
          />
        )}
        <section className="w-full max-w-[1400] mx-auto">{children}</section>
      </div>
    </main>
  );
}