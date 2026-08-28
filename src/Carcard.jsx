import { useState } from "react";

function Carcard({ car }) {
  const { model, price, img, engine, horsepower, transmission, drivetype } =
    car;
  const [show, setShow] = useState(false);

  return (
    <div className="group max-w-xs w-full rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#C9A96E]/70 hover:-translate-y-2 animate-fade-up">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={img}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        <span className="absolute top-3 left-3 bg-[#C9A96E] text-black text-[10px] font-bold uppercase px-3 py-1 rounded-full tracking-wider">
          Featured
        </span>
        <button className="absolute top-3 right-3 bg-[#C9A96E] text-black text-xs font-bold px-4 py-1 rounded-full shadow-md hover:bg-black hover:text-white transition">
          Reserve
        </button>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800 truncate">{model}</h3>
          <p className="text-lg font-bold text-[#C9A96E]">
            ${parseInt(price.replace(/,/g, "")).toLocaleString()}
          </p>
        </div>

        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{engine}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
            {horsepower}
          </span>
          <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
            {transmission}
          </span>
          <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
            {drivetype}
          </span>
        </div>

        <button
          onClick={() => setShow((prev) => !prev)}
          className="w-full text-center border border-gray-300 text-gray-700 py-2 rounded-full text-sm font-medium hover:bg-black hover:text-white hover:border-black transition duration-300"
        >
          {show ? "Hide Details" : "View Details"}
        </button>

        {show && (
          <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-600 space-y-1 max-h-32 overflow-y-auto">
            <p>
              <span className="font-semibold">Torque:</span> {car.torque}
            </p>
            <p>
              <span className="font-semibold">Top Speed:</span> {car.topspeed}
            </p>
            <p>
              <span className="font-semibold">0-100:</span> {car.kmh}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
export default Carcard;