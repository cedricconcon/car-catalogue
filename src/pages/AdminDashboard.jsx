import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

function AdminDashboard({ onLogout }) {
  const [cars, setCars] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    price: "",
    img: "",
    engine: "",
    horsepower: "",
    torque: "",
    transmission: "",
    drivetype: "",
    kmh: "",
    topspeed: "",
  });
  const [viewMode, setViewMode] = useState("cars");
  const [employees, setEmployees] = useState([]);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [employeeFormData, setEmployeeFormData] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
  });
  const fetchEmployees = async () => {
    const { data } = await supabase.from("employees").select("*");
    setEmployees(data);
  };

  const handleEmployeeSubmit = async (e) => {
    e.preventDefault();
    if (editingEmployee) {
      await supabase
        .from("employees")
        .update(employeeFormData)
        .eq("id", editingEmployee.id);
    } else {
      await supabase.from("employees").insert([employeeFormData]);
    }
    setEmployeeFormData({ name: "", role: "", email: "", phone: "" });
    setShowEmployeeForm(false);
    setEditingEmployee(null);
    fetchEmployees();
  };
  const deleteEmployee = async (id) => {
    if (confirm("Are you sure?")) {
      await supabase.from("employees").delete().eq("id", id);
      fetchEmployees();
    }
  };
  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const { data } = await supabase.from("cars").select("*");
    setCars(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingCar) {
      await supabase.from("cars").update(formData).eq("id", editingCar.id);
    } else {
      await supabase.from("cars").insert([formData]);
    }
    setFormData({
      brand: "",
      model: "",
      price: "",
      img: "",
      engine: "",
      horsepower: "",
      torque: "",
      transmission: "",
      drivetype: "",
      kmh: "",
      topspeed: "",
    });
    setShowAddForm(false);
    setEditingCar(null);
    fetchCars();
  };

  const deleteCar = async (id) => {
    if (confirm("Are you sure?")) {
      await supabase.from("cars").delete().eq("id", id);
      fetchCars();
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 animate-fade-up">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold font-[playfair] bg-gradient-to-r from-[#C9A96E] to-[#b8952e] bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    <div className="flex flex-wrap-gap-4 items-center mb-6">
       <button
        onClick={() => setViewMode("cars")}
        className={`px-6 py-2 rounded-full font-semibold transition ${
          viewMode === "cars"
            ? "bg-[#C9A96E] text-black"
            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
        }`}
      >
        Manage Cars
      </button>
      <button
        onClick={() => {
          setViewMode("employees");
          fetchEmployees();
        }}
        className={`px-6 py-2 rounded-full font-semibold transition ${
          viewMode === "employees"
            ? "bg-[#C9A96E] text-black"
            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
        }`}
      >
        Manage Staff
      </button>
      <button
        onClick={() => {
          if (viewMode === "cars") {
            setShowAddForm(true);
          } else {
            setShowEmployeeForm(true);
          }
        }}
        className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 transition ml-auto"
      >
        + Add {viewMode === "cars" ? "Car" : "Staff"}
      </button>
    </div>
     
      {(showAddForm || editingCar) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold font-[playfair] mb-6">
              {editingCar ? "Edit Car" : "Add New Car"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Brand"
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
              <input
                type="text"
                placeholder="Model"
                value={formData.model}
                onChange={(e) =>
                  setFormData({ ...formData, model: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
              <input
                type="text"
                placeholder="Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={formData.img}
                onChange={(e) =>
                  setFormData({ ...formData, img: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="text"
                placeholder="Engine"
                value={formData.engine}
                onChange={(e) =>
                  setFormData({ ...formData, engine: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="text"
                placeholder="Horsepower"
                value={formData.horsepower}
                onChange={(e) =>
                  setFormData({ ...formData, horsepower: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="text"
                placeholder="Torque"
                value={formData.torque}
                onChange={(e) =>
                  setFormData({ ...formData, torque: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="text"
                placeholder="Transmission"
                value={formData.transmission}
                onChange={(e) =>
                  setFormData({ ...formData, transmission: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="text"
                placeholder="Drive Type"
                value={formData.drivetype}
                onChange={(e) =>
                  setFormData({ ...formData, drivetype: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="text"
                placeholder="KM/H"
                value={formData.kmh}
                onChange={(e) =>
                  setFormData({ ...formData, kmh: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="text"
                placeholder="Top Speed"
                value={formData.topspeed}
                onChange={(e) =>
                  setFormData({ ...formData, topspeed: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-[#C9A96E] text-black px-6 py-2 rounded-lg font-semibold hover:bg-black hover:text-white transition"
                >
                  {editingCar ? "Update" : "Add"} Car
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingCar(null);
                  }}
                  className="bg-gray-300 text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {(showEmployeeForm || editingEmployee) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold font-[playfair] mb-6">
              {editingEmployee ? "Edit Staff" : "Add New Staff"}
            </h2>
            <form onSubmit={handleEmployeeSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={employeeFormData.name}
                onChange={(e) =>
                  setEmployeeFormData({
                    ...employeeFormData,
                    name: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
              <input
                type="text"
                placeholder="Role (e.g., Seller, Advertiser, Manager)"
                value={employeeFormData.role}
                onChange={(e) =>
                  setEmployeeFormData({
                    ...employeeFormData,
                    role: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={employeeFormData.email}
                onChange={(e) =>
                  setEmployeeFormData({
                    ...employeeFormData,
                    email: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={employeeFormData.phone}
                onChange={(e) =>
                  setEmployeeFormData({
                    ...employeeFormData,
                    phone: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-[#C9A96E] text-black px-6 py-2 rounded-lg font-semibold hover:bg-black hover:text-white transition"
                >
                  {editingEmployee ? "Update" : "Add"} Staff
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEmployeeForm(false);
                    setEditingEmployee(null);
                  }}
                  className="bg-gray-300 text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Car Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              {viewMode === "cars" ? (
                <>
                  <th className="border p-2 text-left">Brand</th>
                  <th className="border p-2 text-left">Model</th>
                  <th className="border p-2 text-left">Price</th>
                </>
              ) : (
                <>
                  <th className="border p-2 text-left">Name</th>
                  <th className="border p-2 text-left">Role</th>
                  <th className="border p-2 text-left">Email</th>
                  <th className="border p-2 text-left">Phone</th>
                </>
              )}
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {viewMode === "cars"
            ? cars.map((car) => (
                <tr key={car.id} className="hover:bg-[#C9A96E]/10 transition">
                  <td className="border p-2">{car.brand}</td>
                  <td className="border p-2">{car.model}</td>
                  <td className="border p-2">${car.price}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => {
                        setEditingCar(car);
                        setFormData(car);
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCar(car.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            :
              employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-[#C9A96E]/10 transition">
                  <td className="border p-2">{emp.name}</td>
                  <td className="border p-2">{emp.role}</td>
                  <td className="border p-2">{emp.email || "—"}</td>
                  <td className="border p-2">{emp.phone || "—"}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => {
                        setEditingEmployee(emp);
                        setEmployeeFormData(emp);
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteEmployee(emp.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
          
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
