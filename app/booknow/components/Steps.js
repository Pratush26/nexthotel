'use client';
import { useStep } from '../StepContext';

export default function Steps() {
  const { step } = useStep();

  const progressHeight =
    step === 2
      ? 'h-1/2'
      : step === 3
      ? 'h-full'
      : 'h-0';

  return (
    <div className="flex flex-col items-center justify-center sm:w-3/4 w-full h-auto bg-emerald-800/30 rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-center m-4">Booking Steps</h2>
      <div className="grid grid-cols-[30%_70%] w-full">
        <div className="flex flex-col items-center justify-center gap-2 relative overflow-hidden">
          <span className={`absolute top-0 right-[48%] z-0 w-1 bg-emerald-600 rounded-full ${progressHeight}`} />
          <span className={`flex items-center justify-center w-8 h-8 text-white rounded-full z-10 ${step >= 1 ? 'bg-emerald-700' : 'bg-gray-600'}`}>1</span>
          <span className={`flex items-center justify-center w-8 h-8 text-white rounded-full z-10 ${step >= 2 ? 'bg-emerald-700' : 'bg-gray-600'}`}>2</span>
          <span className={`flex items-center justify-center w-8 h-8 text-white rounded-full z-10 ${step === 3 ? 'bg-emerald-700' : 'bg-gray-600'}`}>3</span>
        </div>
        <div className="flex flex-col items-baseline justify-center gap-4">
          <span>Give your Details</span>
          <span>Check Price</span>
          <span>Payment</span>
        </div>
      </div>
    </div>
  );
}
