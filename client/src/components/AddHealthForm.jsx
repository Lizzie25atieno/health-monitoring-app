// AddHealthForm.jsx
// Form to add a new health record with proper token and navigation handling

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api"; // Use the API instance

const AddHealthForm = () => {
  const navigate = useNavigate();

  // Initialize all fields to avoid uncontrolled input errors
  const [formData, setFormData] = useState({
    date: "",            // YYYY-MM-DD
    weight: "",          // in kg
    bloodPressure: "",   // e.g., 120/80
    heartRate: "",       // bpm
    notes: "",           // optional
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); 
  const [loading, setLoading] = useState(false); 

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Basic validation
    if (formData.weight <= 0) {
      setError("Weight must be positive");
      setLoading(false);
      return;
    }
    if (formData.heartRate <= 0 || formData.heartRate > 250) {
      setError("Heart rate must be between 1-250 bpm");
      setLoading(false);
      return;
    }
    if (!formData.bloodPressure.match(/^\d{2,3}\/\d{2,3}$/)) {
      setError("Blood pressure should be like 120/80");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("You must be logged in");

      // Use the API instance (token is attached automatically via interceptor)
      await API.post("/health", formData);

      setSuccess("Health record added successfully!");
      
      // Wait 1.5 seconds to show success message, then redirect
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Failed to add record");
      setLoading(false); // ✅ Reset loading on error
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-blue-600">Add Health Record</h2>

      {success && <p className="text-green-500 mb-2">{success}</p>}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Blood Pressure</label>
          <input
            type="text"
            name="bloodPressure"
            value={formData.bloodPressure}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="e.g., 120/80"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Heart Rate (bpm)</label>
          <input
            type="number"
            name="heartRate"
            value={formData.heartRate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Optional notes"
          />
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>

          {/* submit button */}
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-blue-300"
          >
            {loading ? "Adding..." : "Add Record"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHealthForm;