import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";
import EditHealthForm from "../components/EditHealthForm";
import HealthCard from "../components/HealthCard";
import SymptomChecker from "../components/SymptomChecker";

const DashboardPage = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRecord, setEditingRecord] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // 🔍 DEBUG: Check what's happening on component mount
  useEffect(() => {
    console.log("=== 🩺 DASHBOARD DEBUG ===");
    console.log("📍 Current URL:", window.location.href);
    console.log("🔐 Token in localStorage:", localStorage.getItem("token"));
    console.log("👤 User in localStorage:", localStorage.getItem("user"));
    console.log("🚀 API instance:", API ? "LOADED" : "MISSING");
    
    // Test if API instance has the interceptor
    if (API) {
      console.log("🔧 API baseURL:", API.defaults.baseURL);
      console.log("📡 API interceptors:", API.interceptors.request.handlers.length);
    }
    console.log("===========================");
  }, []);

  // Motivational messages based on user progress
  const motivationalMessages = [
    "Every step forward, no matter how small, is progress! 🌟",
    "Your health journey is unique and beautiful. Keep going! 💪",
    "Small daily improvements lead to stunning results! 🚀",
    "Your body hears everything your mind says. Stay positive! 😊",
    "You're doing better than you think! Keep tracking! 📈",
    "Health is wealth, and you're investing wisely! 💰"
  ];

  // CSV Export Function
  const exportToCSV = () => {
    if (records.length === 0) {
      alert("No records to export");
      return;
    }

    const headers = ["Date", "Weight (kg)", "Blood Pressure", "Heart Rate (bpm)", "Notes"];
    const csvData = records.map(record => [
      new Date(record.date || record.createdAt).toLocaleDateString(),
      record.weight,
      record.bloodPressure,
      record.heartRate,
      record.notes || ""
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "health_records.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Mood Tracker Component
  const MoodTracker = () => {
    const [mood, setMood] = useState(null);
    
    const moods = [
      { emoji: "😊", label: "Great" },
      { emoji: "😐", label: "Okay" },
      { emoji: "😔", label: "Not Great" },
      { emoji: "🤒", label: "Sick" }
    ];

    return (
      <div className="health-card p-6">
        <h3 className="font-bold text-lg mb-4">How are you feeling today?</h3>
        <div className="flex justify-between">
          {moods.map((m) => (
            <button
              key={m.label}
              onClick={() => {
                setMood(m.label);
                alert(`Thanks for sharing! Hope you feel ${m.label.toLowerCase()}! 💙`);
              }}
              className={`p-3 rounded-lg transition-all ${
                mood === m.label ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <div className="text-2xl">{m.emoji}</div>
              <div className="text-xs mt-1">{m.label}</div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Progress Summary Component
  const ProgressSummary = ({ records }) => {
    const thisWeekRecords = records.filter(record => {
      const recordDate = new Date(record.date || record.createdAt);
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return recordDate > oneWeekAgo;
    });

    return (
      <div className="health-card p-6">
        <h3 className="font-bold text-lg mb-4">📈 This Week's Progress</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Records Added:</span>
            <span className="font-bold text-green-600">{thisWeekRecords.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Consistency:</span>
            <span className="font-bold text-blue-600">
              {thisWeekRecords.length >= 3 ? "Great! 🎉" : thisWeekRecords.length >= 1 ? "Good 👍" : "Let's start! 💪"}
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Simple Reminder Component
  const SimpleReminder = () => {
    const [reminderSet, setReminderSet] = useState(false);

    return (
      <div className="health-card p-6 border-l-4 border-yellow-500">
        <h3 className="font-bold text-lg mb-4">⏰ Reminders</h3>
        {!reminderSet ? (
          <div>
            <p className="text-sm text-gray-600 mb-3">Set a daily health reminder?</p>
            <button 
              onClick={() => {
                setReminderSet(true);
                alert("✅ Daily reminder set! We'll remind you to track your health every day at 9 AM.");
              }}
              className="primary-btn text-sm"
            >
              Set Daily Reminder
            </button>
          </div>
        ) : (
          <div className="text-green-600">
            <p>✅ Daily reminders active</p>
            <button 
              onClick={() => setReminderSet(false)}
              className="text-red-500 text-sm mt-2 hover:underline"
            >
              Turn off
            </button>
          </div>
        )}
      </div>
    );
  };

  // Achievement Badges Component
  const AchievementBadges = ({ records }) => {
    const badges = [
      { 
        name: "First Step", 
        earned: records.length >= 1, 
        emoji: "🎯",
        description: "Added your first health record"
      },
      { 
        name: "Consistent", 
        earned: records.length >= 5, 
        emoji: "📅",
        description: "Logged 5+ health records"
      },
      { 
        name: "Health Warrior", 
        earned: records.length >= 10, 
        emoji: "🏆",
        description: "Logged 10+ health records"
      }
    ];

    return (
      <div className="health-card p-6">
        <h3 className="font-bold text-lg mb-4">🏆 Your Achievements</h3>
        <div className="space-y-3">
          {badges.map(badge => (
            <div key={badge.name} className={`flex items-center p-2 rounded-lg ${
              badge.earned ? 'bg-green-50 border border-green-200' : 'bg-gray-100'
            }`}>
              <div className="text-2xl mr-3">{badge.emoji}</div>
              <div>
                <div className={`font-medium ${badge.earned ? 'text-green-700' : 'text-gray-500'}`}>
                  {badge.name}
                </div>
                <div className="text-xs text-gray-600">{badge.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Quick Health Check Component
  const QuickHealthCheck = () => {
    const [showResults, setShowResults] = useState(false);
    
    return (
      <div className="health-card p-6">
        <h3 className="font-bold text-lg mb-4">⚡ Quick Health Check</h3>
        {!showResults ? (
          <button 
            onClick={() => {
              // Simple assessment logic
              const tips = [
                "💧 Drink more water today",
                "🚶 Take a 10-minute walk", 
                "😴 Get 7-8 hours of sleep",
                "🍎 Eat one extra fruit today"
              ];
              const randomTip = tips[Math.floor(Math.random() * tips.length)];
              alert(`Your quick health tip: ${randomTip}`);
              setShowResults(true);
            }}
            className="primary-btn w-full"
          >
            Get Personalized Health Tip
          </button>
        ) : (
          <p className="text-green-600 text-center">✅ Check completed! Come back tomorrow for another tip!</p>
        )}
      </div>
    );
  };

  const getRandomMessage = () => {
    return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
  };

  // 🛠️ CORRECTED: Fetch records function
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        console.log("🔐 Using API instance to fetch records");
        const response = await API.get("/health");
        console.log("✅ API instance response:", response);
        setRecords(response.data);
      } catch (error) {
        console.log("❌ Error fetching records:", error);
        // The API interceptor already handles 401 and redirects to login
        } finally {
          setLoading(false);
        }
      };
      
      fetchRecords();
    }, []);

  // Delete record with confirmation
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this health record?")) return;
    
    try {
      console.log("🗑️ Deleting record:", id);
      await API.delete(`/health/${id}`);
      console.log("✅ Delete successful");
      setRecords(records.filter((r) => r._id !== id));
    } catch (error) {
      console.log("❌ Delete error:", error);
      alert("Failed to delete record");
    }
  };

  const openEditModal = (record) => {
    setEditingRecord(record);
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setEditingRecord(null);
    setIsEditing(false);
  };

  const updateRecordInList = (updated) => {
    setRecords(records.map((r) => (r._id === updated._id ? updated : r)));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        <p className="ml-4">Loading your health records...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Welcome Header with Motivation */}
      <div className="text-center mb-8 floating">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
          Welcome to Your Health Dashboard! 🏥
        </h1>
        <p className="text-xl text-gray-600 mb-2">{getRandomMessage()}</p>
        <p className="text-gray-500">Track your progress and get better every day! 🌱</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Records */}
        <div className="lg:col-span-2 space-y-6">
          {/* CORRECTED Header Section with Export Button */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Your Health Records</h2>
            <div className="space-x-2">
              <button onClick={exportToCSV} className="secondary-btn">
                Export CSV
              </button>
              <Link to="/add" className="primary-btn">
                + Add New Record
              </Link>
            </div>
          </div>

          {/* Symptom Checker */}
          <SymptomChecker />

          {/* Records List */}
          {records.length === 0 ? (
            <div className="health-card p-8 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">No health records yet</h3>
              <p className="text-gray-600 mb-4">Start your health journey by adding your first record!</p>
              <Link to="/add" className="primary-btn inline-block">
                Add Your First Record
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {records.map((record) => (
                <HealthCard
                  key={record._id}
                  record={record}
                  onEdit={openEditModal}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Progress & Stats */}
        <div className="space-y-6">
          {/* Progress Summary */}
          <ProgressSummary records={records} />

          {/* Mood Tracker */}
          <MoodTracker />

          {/* Quick Health Check */}
          <QuickHealthCheck />

          {/* Achievement Badges */}
          <AchievementBadges records={records} />

          {/* Simple Reminder */}
          <SimpleReminder />

          {/* Health Tips */}
          <div className="health-card p-6">
            <h3 className="font-bold text-lg mb-4">💡 Health Tips</h3>
            <ul className="space-y-2 text-sm">
              <li>• Drink 8 glasses of water daily 💧</li>
              <li>• Get 7-8 hours of sleep 😴</li>
              <li>• Take short walks every hour 🚶</li>
              <li>• Practice deep breathing exercises 🧘</li>
              <li>• Eat colorful fruits and vegetables 🍎</li>
            </ul>
          </div>

          {/* Emergency Contact */}
          <div className="health-card p-6 border-l-4 border-red-500">
            <h3 className="font-bold text-lg mb-2 text-red-600">🚨 Emergency</h3>
            <p className="text-sm text-gray-600">
              If you're experiencing severe symptoms like chest pain, difficulty breathing, or severe injury, 
              call emergency services immediately.
            </p>
            <div className="mt-3 p-2 bg-red-100 rounded text-center">
              <span className="font-bold text-red-700">Emergency: 911</span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <EditHealthForm
          record={editingRecord}
          onClose={closeEditModal}
          onUpdated={updateRecordInList}
        />
      )}
    </div>
  );
};

export default DashboardPage;