import React, { useState } from 'react';
import { Calculator as CalculatorIcon } from 'lucide-react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNumber = (num: string) => {
    setDisplay(display === '0' ? num : display + num);
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const calculate = () => {
    try {
      const result = eval(equation + display);
      setDisplay(result.toString());
      setEquation('');
    } catch (error) {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-64">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <CalculatorIcon className="w-5 h-5 mr-2" />
        Calculator
      </h3>
      <div className="mb-4">
        <div className="text-right text-gray-500 text-sm">{equation}</div>
        <div className="text-right text-2xl font-mono">{display}</div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn) => (
          <button
            key={btn}
            onClick={() => {
              switch (btn) {
                case '=': calculate(); break;
                case '÷': handleOperator('/'); break;
                case '×': handleOperator('*'); break;
                case '+':
                case '-': handleOperator(btn); break;
                default: handleNumber(btn);
              }
            }}
            className={`p-2 text-center rounded-md ${
              ['÷', '×', '-', '+'].includes(btn)
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : btn === '='
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {btn}
          </button>
        ))}
        <button
          onClick={clear}
          className="col-span-4 p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Clear
        </button>
      </div>
    </div>
  );
}