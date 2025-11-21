import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const WelcomePage = () => {
  const { user } = useContext(AuthContext);

  // If user is logged in, redirect to dashboard
  if (user) {
    window.location.href = "/dashboard";
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4">
      <div className="max-w-4xl text-center">
        {/* Animated Header */}
        <div className="floating mb-8">
          <div className="text-6xl mb-4">💙</div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            HealthTracker Pro
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your personal health companion for a better, healthier life
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="health-card p-6 text-center">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="font-bold text-lg mb-2">Track Progress</h3>
            <p className="text-gray-600">Monitor weight, blood pressure, heart rate and more</p>
          </div>
          
          <div className="health-card p-6 text-center">
            <div className="text-3xl mb-4">🤖</div>
            <h3 className="font-bold text-lg mb-2">AI Symptom Checker</h3>
            <p className="text-gray-600">Get insights about your symptoms and health conditions</p>
          </div>
          
          <div className="health-card p-6 text-center">
            <div className="text-3xl mb-4">📈</div>
            <h3 className="font-bold text-lg mb-2">Health Analytics</h3>
            <p className="text-gray-600">Visualize your health journey with beautiful charts</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
          <Link to="/register" className="primary-btn inline-block">
            Start Your Health Journey
          </Link>
          <Link to="/login" className="secondary-btn inline-block">
            Returning User? Login
          </Link>
        </div>

        {/* Motivational Quote */}
        <div className="mt-12 p-6 bg-white/80 rounded-2xl shadow-lg">
          <p className="text-lg italic text-gray-700">
            "Take care of your body. It's the only place you have to live."
          </p>
          <p className="text-sm text-gray-500 mt-2">- Jim Rohn</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;