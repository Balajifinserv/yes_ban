import { useNavigate } from 'react-router-dom';
import card from './assets/card.png';
import PairsLayout from './PairsLayout';




function SecondPage() {
    const navigate = useNavigate();
  return (
    <div className='max-w-md mx-auto p-4 mt-4 bg-white rounded shadow text-center'>
      <h1 className='mx-auto bg-slate-400'>Grid Confirmation</h1>
      <p className='mx-auto bg-slate-400'>ONE STEP AWAY TO COLLECT YOUR REWARD POINT GIFT </p>
      <img src={card} alt='Grid' className='mx-auto' />
      <PairsLayout/>
      <button className='mx-auto mt-4 rounded p-2 bg-slate-600' onClick={() => navigate('/third-page')}>Go to Third Page</button>
    </div>
  );
}


export default SecondPage;