import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import Carcard from "../Carcard";
import "@fontsource/playfair-display";
import "@fontsource/inter";

function Inventory() {
  const [cars, setCars] = useState([]);
  const [sortOrder, setSortOrder] = useState("none");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllCars() {
      setLoading(true);
      const { data } = await supabase.from("cars").select("*");
      setCars(data);
      setLoading(false)
    }
    fetchAllCars();
  }, []);


  const sortedCars = [...cars].sort((a, b) => {
    if (sortOrder === "none") return 0;

    const priceA = Number(a.price.replace(/,/g, ""));
    const priceB = Number(b.price.replace(/,/g, ""));

    if (sortOrder === "low") {
      return priceA - priceB;
    } else if (sortOrder === "high") {
      return priceB - priceA;
    }
    return 0;
  });

  const toggleSort = () => {
    if (sortOrder === "none") setSortOrder("low");
    else if (sortOrder === "low") setSortOrder("high");
    else setSortOrder("none");
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-24 animate-fade-up">
        <h1 className="text-4xl font-bold font-[playfair] mb-8">
          Full Inventory
        </h1>

        <button
          onClick={toggleSort}
          className="bg-gray-200 text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-300 transition active:scale-95"
        >
          {sortOrder === "none" && "Sort by Price"}
          {sortOrder === "low" && "Low -> High"}
          {sortOrder === "high" && "High -> Low"}
        </button>
        <div className="flex flex-wrap gap-6 justify-center">
          {loading ? (
            <div className="text-center text-gray-500 py-20">Loading cars...</div>
          ) : sortedCars.length === 0 ? (
            <div className="text-center text-gray-500 py-20">No cars found. Add some in the admin panel.</div>
          ) : (
            sortedCars.map((car) => <Carcard key={car.id} car={car} />)
          )}
        </div>
      </div>
    </>
  );
}
export default Inventory;
