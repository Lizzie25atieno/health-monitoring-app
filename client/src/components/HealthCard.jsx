const HealthCard = ({ record, onEdit, onDelete }) => {
  return (
    <div className="health-card p-6">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center mb-3">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2 pulse-soft"></div>
            <p className="text-sm text-gray-500">
              {new Date(record.date || record.createdAt).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Weight</p>
              <p className="text-lg font-bold">{record.weight} kg</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-green-600 font-medium">Blood Pressure</p>
              <p className="text-lg font-bold">{record.bloodPressure}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-sm text-purple-600 font-medium">Heart Rate</p>
              <p className="text-lg font-bold">{record.heartRate} bpm</p>
            </div>
            {record.notes && (
              <div className="bg-yellow-50 p-3 rounded-lg col-span-2">
                <p className="text-sm text-yellow-600 font-medium">Notes</p>
                <p className="text-sm">{record.notes}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 ml-4">
          <button
            onClick={() => onEdit(record)}
            className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors font-medium"
          >
            ✏️ Edit
          </button>

          <button
            onClick={() => onDelete(record._id)}
            className="danger-btn"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthCard;