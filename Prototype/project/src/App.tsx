import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import type { FraudData } from './types';
import * as XLSX from 'xlsx';

function App() {
  const [formData, setFormData] = useState<FraudData>({} as FraudData);
  const [prediction, setPrediction] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (evt) => {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        
        if (data.length > 0) {
          setFormData(data[0] as FraudData);
          
          // Auto-submit the form after setting the data
          setLoading(true);
          try {
            const response = await fetch('http://localhost:5000/predict', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data[0]),
            });
            const result = await response.json();
            setPrediction(result.prediction === 1 ? 'Fraudulent' : 'Not Fraudulent');
          } catch (error) {
            console.error('Error:', error);
            setPrediction('Error occurred during prediction');
          }
          setLoading(false);
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setPrediction(data.prediction === 1 ? 'Fraudulent' : 'Not Fraudulent');
    } catch (error) {
      console.error('Error:', error);
      setPrediction('Error occurred during prediction');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#8E1B54] text-white py-6 px-8">
        <div className="container mx-auto flex items-center gap-4">
          <h1 className="text-2xl font-bold">SBI Insurance Fraud Detection System</h1>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Manual Data Entry</h2>
              
              <form onSubmit={handleSubmit} className="space-y-10">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Basic Information</h3>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Assured Age
                      </label>
                      <input
                        type="number"
                        name="ASSURED_AGE"
                        value={formData.ASSURED_AGE || ''}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-2.5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nominee Relation
                      </label>
                      <input
                        type="text"
                        name="NOMINEE_RELATION"
                        value={formData.NOMINEE_RELATION || ''}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-2.5"
                      />
                    </div>
                  </div>
                </div>

                <button
                  className="w-full bg-[#8E1B54] text-white py-3 px-6 rounded-lg hover:bg-[#7A1847]"
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Bulk Upload</h2>
              <div className="text-center">
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-12">
                  <h3 className="text-xl font-semibold mb-2">Upload Excel Sheet</h3>
                  <p className="text-gray-500 mb-6">
                    Upload your Excel file containing insurance data for bulk processing
                  </p>
                  <label className="inline-flex items-center px-6 py-3 bg-[#8E1B54] text-white rounded-lg hover:bg-[#7A1847] cursor-pointer">
                    <Upload className="w-5 h-5 mr-2" />
                    Choose File
                    <input
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {prediction && (
              <div className={`mt-6 p-4 rounded-lg ${
                prediction === 'Fraudulent' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
              }`}>
                <h3 className="font-semibold mb-2">Analysis Result</h3>
                <p className="font-medium">Prediction: {prediction}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
