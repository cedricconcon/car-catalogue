import "@fontsource/playfair-display";
import "@fontsource/inter";

function Ownership() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-32">
      <h1 className="text-5xl font-bold font-[playfair] text-center mb-6">
        Ownership Experience
      </h1>
      <p className="text-center text-gray-600 text-lg max-w-2xl mx-auto mb-16">
        Beyond the drive. A lifetime of premium care and community.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition">
          <div className="text-4xl mb-4">🛠️</div>
          <h3 className="text-xl font-bold mb-2">Warranty & Maintenance</h3>
          <p className="text-gray-600 text-sm">
            5-year / 100,000 km warranty. Free scheduled maintenance for the first 3 years.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-xl font-bold mb-2">Owner Community</h3>
          <p className="text-gray-600 text-sm">
            Join exclusive track days, car meets, and private events. Connect with fellow enthusiasts.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition">
          <div className="text-4xl mb-4">📞</div>
          <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
          <p className="text-gray-600 text-sm">
            Dedicated concierge service. Roadside assistance. Accident recovery. Always here for you.
          </p>
        </div>
      </div>

      <div className="mt-16 bg-gray-900 rounded-2xl p-8 text-center text-white">
        <h3 className="text-2xl font-bold font-[playfair] mb-2">Join the LUXE AUTO Family</h3>
        <p className="text-gray-400 text-sm">
          Ownership is just the beginning. Welcome to the community.
        </p>
      </div>
    </div>
  );
}

export default Ownership;