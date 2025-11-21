import { useState } from "react";

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simulated AI Analysis (in real app, this would call an API)
  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) return;
    
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const symptomAnalysis = {
      possibleConditions: getPossibleConditions(symptoms),
      severity: assessSeverity(symptoms),
      recommendations: generateRecommendations(symptoms),
      emergency: checkEmergency(symptoms)
    };
    
    setAnalysis(symptomAnalysis);
    setLoading(false);
  };

  // Helper functions for symptom analysis
  const getPossibleConditions = (symptoms) => {
    const symptomsLower = symptoms.toLowerCase();
    const conditions = [];

    if (symptomsLower.includes('fever') && symptomsLower.includes('cough')) {
      conditions.push("Common Cold", "Flu (Influenza)", "COVID-19");
    }
    if (symptomsLower.includes('headache') && symptomsLower.includes('nausea')) {
      conditions.push("Migraine", "Tension Headache");
    }
    if (symptomsLower.includes('chest') && symptomsLower.includes('pain')) {
      conditions.push("Heart-related issues", "Acid Reflux", "Muscle Strain");
    }
    if (symptomsLower.includes('fatigue') && symptomsLower.includes('joint')) {
      conditions.push("Arthritis", "Fibromyalgia");
    }

    return conditions.length > 0 ? conditions : ["General discomfort - consider describing more specific symptoms"];
  };

  const assessSeverity = (symptoms) => {
    const emergencyKeywords = ['chest pain', 'difficulty breathing', 'severe pain', 'unconscious'];
    return emergencyKeywords.some(keyword => symptoms.toLowerCase().includes(keyword)) ? 'high' : 'low';
  };

  const generateRecommendations = (symptoms) => {
    const recommendations = ["Rest well", "Stay hydrated"];
    
    if (symptoms.toLowerCase().includes('fever')) {
      recommendations.push("Take temperature regularly", "Consider fever-reducing medication");
    }
    if (symptoms.toLowerCase().includes('pain')) {
      recommendations.push("Apply cold/hot compress", "Consider over-the-counter pain relief");
    }
    
    return recommendations;
  };

  const checkEmergency = (symptoms) => {
    const emergencySymptoms = ['chest pain', 'difficulty breathing', 'severe bleeding', 'unconscious'];
    return emergencySymptoms.some(symptom => symptoms.toLowerCase().includes(symptom));
  };

  return (
    <div className="health-card p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        🤖 AI Symptom Checker
      </h2>
      
      <div className="mb-4">
        <label className="block font-medium mb-2">Describe your symptoms:</label>
        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Example: headache, fever, cough, fatigue..."
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
          rows="4"
        />
      </div>

      <button
        onClick={analyzeSymptoms}
        disabled={loading || !symptoms.trim()}
        className="primary-btn disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Analyzing...
          </span>
        ) : (
          "Analyze Symptoms"
        )}
      </button>

      {analysis && (
        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <h3 className="font-bold text-lg mb-3 text-blue-800">Analysis Results:</h3>
          
          {analysis.emergency && (
            <div className="p-3 bg-red-100 border border-red-300 rounded-lg mb-4 pulse-soft">
              <p className="text-red-700 font-bold">⚠️ Seek immediate medical attention!</p>
            </div>
          )}

          <div className="space-y-3">
            <div>
              <strong>Possible Conditions:</strong>
              <ul className="list-disc list-inside ml-4">
                {analysis.possibleConditions.map((condition, index) => (
                  <li key={index}>{condition}</li>
                ))}
              </ul>
            </div>

            <div>
              <strong>Recommendations:</strong>
              <ul className="list-disc list-inside ml-4">
                {analysis.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>

            <div className="text-sm text-gray-600 italic">
              <strong>Disclaimer:</strong> This is AI-powered guidance, not medical advice. 
              Always consult a healthcare professional for proper diagnosis.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;