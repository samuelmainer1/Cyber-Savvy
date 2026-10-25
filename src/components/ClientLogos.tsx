import Link from "next/link";

const clientLogos = [
  { name: "Apex Logistics", href: "/case-studies/apex-logistics-ltd", color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
  { name: "BigDrop Kenya", href: "/case-studies/big-drop-kenya", color: "bg-violet-100 text-violet-700 border-violet-200" },
  { name: "Globeflight Kenya", href: "/case-studies/globeflight-kenya", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  { name: "Hawi Travels", href: "/case-studies/hawi-travels", color: "bg-rose-100 text-rose-700 border-rose-200" },
  { name: "Horizon Health", href: "/case-studies/horizon-health-group", color: "bg-cyan-100 text-cyan-700 border-cyan-200" },
  { name: "Safari Luxury", href: "/case-studies/safari-luxury-safaris", color: "bg-amber-100 text-amber-700 border-amber-200" },
  { name: "Nairobi Financial", href: "/case-studies/nairobi-financial-services", color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
];

export default function ClientLogos() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 border-t border-gray-200 bg-white">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
          Trusted By
        </span>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Businesses That Trust Cyber Savvy Pro
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6 lg:gap-8 justify-center items-center">
        {clientLogos.map((client) => (
          <Link
            key={client.name}
            href={client.href}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border bg-white text-center hover:shadow-lg transition-all duration-300 group"
          >
            <span
              className={`inline-flex items-center justify-center w-10 h-10 rounded-xl font-black text-xl select-none ${client.color}`}
            >
              {client.name.charAt(0)}
            </span>
            <span className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors leading-tight">
              {client.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}