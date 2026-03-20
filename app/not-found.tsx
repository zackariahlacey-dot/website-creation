import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center px-4 text-center">
      <div>
        <div className="text-8xl font-black gradient-text mb-4">404</div>
        <h1 className="text-3xl font-black text-white mb-3">Page Not Found</h1>
        <p className="text-white/60 mb-8 max-w-sm mx-auto">
          This page doesn&apos;t exist. But your new website can — built in days, zero deposit.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary px-6">← Back to Home</Link>
          <Link href="/start" className="btn-secondary px-6">Get Started</Link>
        </div>
      </div>
    </div>
  );
}
