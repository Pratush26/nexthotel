
import Steps from "./components/Steps";
import BookingForm from "./components/BookingForm";
import { StepProvider } from './StepContext';

export default function BookNow() {
  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 items-center justify-items-center min-h-[80vh]">
      <StepProvider>
        <Steps />
        <BookingForm />
      </StepProvider>
    </main>
  )

}