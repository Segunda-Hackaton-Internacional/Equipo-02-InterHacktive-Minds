import {
  DivideSquare,
  Minus,
  Plus,
  RotateCcw,
  X,
} from "lucide-react";
import * as React from "react";
import { Button } from "../atoms/ui/button";
import { Card } from "../atoms/ui/card";
import { InputNumber } from "../atoms/ui/number-imput";

interface UseCounterDemoProps {
  initialValue: number;
  title: string;
  cantIncrementFurtherFromInitialValue?: boolean;
  showButtoms?: boolean;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onReset?: () => void;
  setCount?: React.Dispatch<React.SetStateAction<number>>;
}

export function UseCounterDemo({ 
  initialValue = 0, 
  title = "", 
  cantIncrementFurtherFromInitialValue = false,
  showButtoms = true,
  onIncrement,
  onDecrement,
  onReset,
  setCount
}: UseCounterDemoProps) {
  
  const [internalCount, setInternalCount] = React.useState(initialValue);
  
  const isControlled = setCount !== undefined;
  
  const count = isControlled ? initialValue : internalCount;
  
  const updateCount = (newValue: number | ((prev: number) => number)) => {
    if (isControlled) {
      if (setCount) {
        if (typeof newValue === 'function') {
          setCount(newValue);
        } else {
          setCount(newValue);
        }
      }
    } else {
      if (typeof newValue === 'function') {
        setInternalCount(newValue);
      } else {
        setInternalCount(newValue);
      }
    }
  };

  const handleIncrement = () => {
    if (cantIncrementFurtherFromInitialValue && count >= initialValue) return;
    if (onIncrement) {
      onIncrement();
    } else {
      updateCount(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if(count < 0) return;
    if (onDecrement) {
      onDecrement();
    } else {
      updateCount(prev => prev - 1);
    }
  };

  const handleReset = () => {
    if (onReset) {
      onReset();
    } else {
      updateCount(initialValue);
    }
  };

  const multiplyBy2 = () => {
    updateCount(prev => prev * 2);
  };

  const divideBy2 = () => {
    updateCount(prev => Math.floor(prev / 2));
  };

  return (
    <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
      {/* Left Column - Interactive Demo */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3>{title}</h3>
          </div>

          {/* Counter Display */}
          <div className="flex flex-col items-center space-y-4">
            <div className="text-7xl font-bold tabular-nums">{count}</div>
            <InputNumber
              type="number"
              value={count}
              onChange={(e) => updateCount(Number(e.target.value))}
              className="w-32 text-center"
            />
          </div>
          
          {showButtoms && (
            <>
              {/* Basic Controls */}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={handleIncrement}
                  disabled={(isControlled) ? cantIncrementFurtherFromInitialValue && count >= initialValue : cantIncrementFurtherFromInitialValue && internalCount >= initialValue}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Increment
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDecrement}
                  disabled={(isControlled) ? count <= 0 : internalCount <= 0}
                  className="flex items-center gap-2"
                >
                  <Minus className="h-4 w-4" />
                  Decrement
                </Button>
              </div>

              {/* Advanced Controls */}
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="secondary"
                  onClick={multiplyBy2}
                  className="flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  ×2
                </Button>
                <Button
                  variant="secondary"
                  onClick={divideBy2}
                  className="flex items-center gap-2"
                >
                  <DivideSquare className="h-4 w-4" />
                  ÷2
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleReset}
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}