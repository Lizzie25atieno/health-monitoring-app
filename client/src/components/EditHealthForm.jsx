import { useState } from "react";
import API from "../api/api"; // Import the API instance

const EditHealthForm = ({ record, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({
    date: record.date ? new Date(record.date).toISOString().split('T')[0] : "", // Add date
    weight: record.weight || "",
    bloodPressure: record.bloodPressure || "",
    heartRate: record.heartRate || "",
    notes: record.notes || "",
  });

  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Convert numbers and date before sending
      const payload = {
        ...formData,
        date: formData.date, // Include the date
        weight: Number(formData.weight),
        heartRate: Number(formData.heartRate),
      };

      const res = await API.put(`/health/${record._id}`, payload); // Use API instance

      onUpdated(res.data);
      onClose();
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update record. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Edit Health Record</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Date</label>
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
            <label>Weight (kg)</label>
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
            <label>Blood Pressure</label>
            <input
              type="text"
              name="bloodPressure"
              value={formData.bloodPressure}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label>Heart Rate (bpm)</label>
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
            <label>Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-blue-300"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHealthForm;