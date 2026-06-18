import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* ── Navbar ── */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100 max-w-6xl mx-auto w-full">
        <span className="text-xl font-bold tracking-tight">
          Dev<span className="text-indigo-600">Pulse</span>
        </span>
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="#features" className="hover:text-gray-900 transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="hover:text-gray-900 transition-colors">
            Pricing
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            Get started
          </Link>
        </nav>
      </header>

      <main className="flex flex-col items-center flex-1">
        {/* ── Hero ── */}
        <section className="flex flex-col items-center text-center px-6 pt-24 pb-20 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mb-6">
            AI-Powered News Digest
          </span>
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 mb-6">
            Your industry, distilled
            <br />
            <span className="text-indigo-600">every morning.</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mb-10">
            DevPulse reads hundreds of sources overnight, picks what matters to you,
            and delivers a crisp AI-written summary straight to your inbox. No tabs.
            No noise.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/signup"
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
            >
              Start free — no credit card
            </Link>
            <Link
              href="#features"
              className="px-6 py-3 rounded-xl border border-gray-200 font-semibold hover:bg-gray-50 transition-colors"
            >
              See how it works
            </Link>
          </div>
        </section>

        {/* ── Features ── */}
        <section
          id="features"
          className="w-full bg-gray-50 py-20 px-6"
        >
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Everything you need to stay sharp
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                >
                  <div className="text-3xl mb-4">{f.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section id="pricing" className="w-full py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Simple pricing</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {plans.map((p) => (
                <div
                  key={p.name}
                  className={`rounded-2xl p-8 border ${
                    p.highlighted
                      ? "border-indigo-600 shadow-lg shadow-indigo-100"
                      : "border-gray-200"
                  }`}
                >
                  {p.highlighted && (
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
                      Most popular
                    </span>
                  )}
                  <h3 className="text-2xl font-bold mt-2">{p.name}</h3>
                  <p className="text-4xl font-extrabold mt-3">
                    {p.price}
                    <span className="text-base font-medium text-gray-400">/mo</span>
                  </p>
                  <ul className="mt-6 space-y-3 text-sm text-gray-600">
                    {p.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2">
                        <span className="text-indigo-500 font-bold">✓</span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/signup"
                    className={`mt-8 block text-center py-3 rounded-xl font-semibold transition-colors ${
                      p.highlighted
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    Get started
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-8 px-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} DevPulse. Built with Next.js, Tailwind, and too much coffee.
      </footer>
    </div>
  );
}

const features = [
  {
    icon: "🤖",
    title: "AI summarization",
    body: "Our agent reads 200+ sources nightly and writes a tight, human-quality digest tailored to your chosen topics.",
  },
  {
    icon: "📬",
    title: "Inbox delivery",
    body: "Arrives at 7 AM in your timezone via Email.js — formatted beautifully for mobile and desktop.",
  },
  {
    icon: "⚡",
    title: "Real-time topics",
    body: "Choose from tech, finance, AI, startup news, or define your own keywords. Change anytime.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$0",
    highlighted: false,
    features: ["1 topic digest", "Delivered weekly", "Email support"],
  },
  {
    name: "Pro",
    price: "$9",
    highlighted: true,
    features: [
      "5 topic digests",
      "Delivered daily",
      "Priority AI model",
      "Custom keywords",
    ],
  },
];
