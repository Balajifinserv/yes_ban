import card from './assets/card.png';
import PairsLayout from './PairsLayout';




function SecondPage() {
  return (
    <div className='max-w-md mx-auto p-4 mt-4 bg-white rounded shadow text-center'>
      <h1 className='mx-auto bg-orange-500'>Grid Confirmation</h1>
      <p className='mx-auto bg-orange-500'>ONE STEP AWAY TO COLLECT YOUR REWARD POINT GIFT </p>
      <img src={card} alt='Grid' className='mx-auto' />
      <PairsLayout/>
    </div>
  );
}


export default SecondPage;