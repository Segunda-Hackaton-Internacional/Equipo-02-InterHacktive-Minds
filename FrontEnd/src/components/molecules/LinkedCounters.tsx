import * as React from "react";
import { UseCounterDemo } from "./Use-Counter";

interface LinkedCountersProps {
  availableInitialValue: number;
  processingInitialValue?: number;
  availableTitle?: string;
  processingTitle?: string;
}

export function LinkedCounters({
  availableInitialValue,
  processingInitialValue = 0,
  availableTitle = "Disponible...",
  processingTitle = "A procesar...",
}: LinkedCountersProps) {
  const [availableCount, setAvailableCount] = React.useState(availableInitialValue);
  const [processingCount, setProcessingCount] = React.useState(processingInitialValue);

  const handleAvailableIncrement = () => {
    if (processingCount > 0) {
      setAvailableCount(prev => prev + 1);
      setProcessingCount(prev => prev - 1);
    }
  };

  const handleAvailableDecrement = () => {
    if (availableCount > 0) {
      setAvailableCount(prev => prev - 1);
      setProcessingCount(prev => prev + 1);
    }
  };

  const handleProcessingIncrement = () => {
    if (availableCount > 0) {
      setProcessingCount(prev => prev + 1);
      setAvailableCount(prev => prev - 1);
    }
  };

  const handleProcessingDecrement = () => {
    if (processingCount > 0) {
      setProcessingCount(prev => prev - 1);
      setAvailableCount(prev => prev + 1);
    }
  };

  const resetCounters = () => {
    setAvailableCount(availableInitialValue);
    setProcessingCount(processingInitialValue);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      <div className="flex-1 min-w-0">
        <UseCounterDemo 
          initialValue={availableCount}
          title={availableTitle}
          cantIncrementFurtherFromInitialValue={true}
          showButtoms={false}
          onIncrement={handleAvailableIncrement}
          onDecrement={handleAvailableDecrement}
          onReset={resetCounters}
          setCount={setAvailableCount}
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <UseCounterDemo 
          initialValue={processingCount}
          title={processingTitle}
          onIncrement={handleProcessingIncrement}
          onDecrement={handleProcessingDecrement}
          onReset={resetCounters}
          setCount={setProcessingCount}
        />
      </div>
    </div>
  );
}