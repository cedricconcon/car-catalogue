import "@fontsource/playfair-display";
import "@fontsource/inter";

function Financing() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-32">
      <h1 className="text-5xl font-bold fonr-[playfair] text-center mb-6">
        Financing Made Simple
      </h1>
      <p className="text-center text-gray-600 text-lg mx-w-2xl mx-auto mb-16">
        Drive your dream car today with flexible financing options tailored to
        you.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadown-2xl transition">
          <div className="text-4xl mb-4">💳</div>
          <h3 className="text-xl font-bold mb-2">Low Interest Rates</h3>
          <p className="text-gray-600 text-sm">
            Competitive rates starting at 5.9% APR for qualified buyers.
            Pre-approval in minutes.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadown-2xl transition">
          <div className="text-4xl mb-4">💳</div>
          <h3 className="text-xl font-bold mb-2">Flexible Terms</h3>
          <p className="text-gray-600 text-sm">
            Choose between 24, 36, 48, or 60-month financing plans. No hidden
            fees.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadown-2xl transition">
          <div className="text-4xl mb-4">💳</div>
          <h3 className="text-xl font-bold mb-2">Instant Approval</h3>
          <p className="text-gray-600 text-sm">
            Get approved online in under 2 minutes. Drive off the lot the same
            day
          </p>
        </div>
      </div>

      <div className="mt-16 bg-[#C9A96E]/10 rounded-2xl p-8 text-center border border-[#C9A96E]/30">
        <p className="text-lg font-medium text-gray-800">
          "Your dream car is closer than you think."
        </p>
        <p className="text-sm text-gray-600 mt-2">Contact us for a personalized quote.</p>
      </div>
    </div>
  );
}
export default Financing;
