import { Link } from "react-router-dom";
import Carcard from "../Carcard";
//Import for State (only)
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
//Import Assets (image only)
import backgroundPicture from "../assets/BgFerrari.jpg";

//Import Fonts
import "@fontsource/playfair-display";
import "@fontsource/inter";

//Catalouge
function Catalogue() {
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [inquiry, setInquiry] = useState({
    name: "",
    email: "",
    phone: "",
    car_model: "",
    message: "",
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [showInquireModal, setShowInquireModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cars, setCars] = useState([]);

  useEffect(() => {
    async function fetchCars() {
      const { data, error } = await supabase.from("cars").select("*");
      if (error) {
        console.error("Supabase error:", error);
      } else {
        console.log("Cars recieved from Supabase:", data);
        setCars(data);
      }
    }
    fetchCars();
  }, []);
  const filteredCarsAndPrice = cars.filter((car) => {
    const brandMatch = brand === "" || car.brand === brand;
    const priceMatch = price === "" || car.price === price;
    const searchMatch =
      searchTerm === "" ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase());
    return brandMatch && priceMatch && searchMatch;
  });
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search inventory..."
    className="w-full sm:w-auto bg-transparent text-white px-4 py-3 outline-none border-b sm:border-b-0 sm:border-r border-white/20 placeholder:text-gray-400"
  />;
  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.from("inquiries").insert([
      {
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone,
        car_model: inquiry.car_model,
        message: inquiry.message,
      },
    ]);
    setSubmitting(false);

    if (error) {
      alert("Something went wrong. Please try again.");
      console.error(error);
    } else {
      setInquirySuccess(true);
      setInquiry({
        name: "",
        email: "",
        phone: "",
        car_model: "",
        message: "",
      });
      setTimeout(() => {
        setInquirySuccess(false);
        setShowInquireModal(false);
      }, 3000);
    }
  };
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <h2
          className="text-2x1 md:text-3x1 font-bold tracking-widest text-black"
          style={{ fontFamily: "playfair-display" }}
        >
          LUXE AUTO
        </h2>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
          <Link
            to="/"
            className="relative hover:text-black cursor-pointer group"
          >
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#C9A96E] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/inventory"
            className="relative hover:text-black cursor-pointer group"
          >
            Inventory
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#C9A96E] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/trims"
            className="relative hover:text-black cursor-pointer group"
          >
            Trims
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#C9A96E] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/financing"
            className="relative hover:text-black cursor-pointer group"
          >
            Financing
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#C9A96E] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/heritage"
            className="relative hover:text-black cursor-pointer group"
          >
            Heritage
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#C9A96E] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/ownership"
            className="relative hover:text-black cursor-pointer group"
          >
            Ownership
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#C9A96E] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>
        <button
          onClick={() => setShowInquireModal((prev) => !prev)}
          className="border border-black text-black hover:bg-black hover:text-white px-6 py-2 rounded-full text-sm font-semibold transition duration-300"
        >
          Inquire
        </button>
      </header>
      {showInquireModal && (
        <div className="bg-black/50 fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold font-[playfair]">
                Inquire About a Car
              </h2>
              <button
                onClick={() => setShowInquireModal(false)}
                className="text-gray-500 hover:text-black text-2xl"
              >
                ✕
              </button>
            </div>

            {inquirySuccess ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-center">
                ✅ Thank you! Your inquiry has been sent. We'll contact you
                soon.
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Car Model
                  </label>
                  <input
                    type="text"
                    value={inquiry.car_model}
                    onChange={(e) =>
                      setInquiry({ ...inquiry, car_model: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="e.g., BMW 3 Series"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={inquiry.name}
                    onChange={(e) =>
                      setInquiry({ ...inquiry, name: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Juan Dela Cruz"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={inquiry.email}
                    onChange={(e) =>
                      setInquiry({ ...inquiry, email: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="juan@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={inquiry.phone}
                    onChange={(e) =>
                      setInquiry({ ...inquiry, phone: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="0917-123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message (Optional)
                  </label>
                  <textarea
                    value={inquiry.message}
                    onChange={(e) =>
                      setInquiry({ ...inquiry, message: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black h-24 resize-none"
                    placeholder="I'm interested in this car. Can I schedule a test drive?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#C9A96E] text-black py-3 rounded-lg font-semibold hover:bg-black hover:text-white transition duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Inquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
      <main
        className="relative min-h-[90vh] w-full bg-no-repeat bg-cover bg-center bg-fixed bg-black flex items-center justify-center flex-col px-4 pt-20 animate-fade-up"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 100%), url(${backgroundPicture})`,
        }}
      >
        <h1 className="text-white font-bold text-4xl md:text-6xl lg:text-7xl text-center leading-tight drop-shadow-[0_0_30px_rgba(201,169,110,0.3)]">
          Find Your <span className="text-[#C9A96E]">Perfect</span> Drive.
        </h1>
        <p className="text-gray-300 text-sm md:text-base text-center max-w-2xl mt-4 tracking-wide">
          Curated selection of premium automobiles for the modern enthusiast
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-8 w-full max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20 shadow-lg">
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full sm:w-auto bg-transparent text-white px-4 py-3 outline-none cursor-pointer border-b sm:border-b-0 sm:border-r border-white/20"
          >
            <option value="" disabled selected hidden>
              All Car Brands
            </option>
            <option className="text-black" value="BMW">
              BMW
            </option>
            <option className="text-black" value="Ford">
              Ford
            </option>
            <option className="text-black" value="Nissan">
              Nissan
            </option>
            <option className="text-black" value="Toyota">
              Toyota
            </option>
            <option className="text-black" value="Subaru">
              Subaru
            </option>
          </select>
          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full sm:w-auto bg-transparent text-white px-4 py-3 outline-none cursor-pointer border-b sm:border-b-0 sm:border-r border-white/20"
          >
            <option value="" disabled selected hidden>
              Any Price Range
            </option>
            <option className="text-black" value="30,000">
              $30,000
            </option>
            <option className="text-black" value="55,000">
              $55,000
            </option>
            <option className="text-black" value="400,000">
              $400,000
            </option>
            <option className="text-black" value="2,525,000">
              $2MIL
            </option>
          </select>
        </div>

        <div className="flex justify-between items-center px-4 max-w-6xl mx-auto w-full mt-16 mb-6">
          <h2 className="text-3xl md:text-4xl font-bold font-[playfair] tracking-wide">
            Featured Models
          </h2>
          <span
            className="text-sm font-medium text-gray-500 hover:text-black border-b border-transparent hover:border-black transition cursor-pointer"
            onClick={() => {
              setBrand("");
              setPrice("");
              setSearchTerm("");
            }}
          >
            View Full Catalog →
          </span>
        </div>
        <article className="flex gap-6 justify-center flex-wrap items-start px-4">
          {filteredCarsAndPrice.map((car) => (
            <Carcard key={car.id} car={car} />
          ))}
        </article>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 bg-[#C9A96E] text-black p-3 rounded-full shadow-lg hover:bg-black hover:text-white transition z-50"
        >
          ↑
        </button>
      </main>
      <footer className="mt-20 bg-gradient-to-b from-black to-[#1a1a1b] text-white py-12 px-6 border-t border-[#C9A96E]/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <h2 className="text-2xl font-bold text-[#C9A96E] font-[playfair] tracking-widest">
            LUXE AUTO
          </h2>
          <ul className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <li className="hover:text-white cursor-pointer transition">
              Privacy Policy
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Terms of Service
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Sustainability
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Careers
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Press Room
            </li>
          </ul>
          <p className="text-xs text-gray-600">
            © 2026 LUXE AUTO ENGINEERING. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </>
  );
}
export default Catalogue;
