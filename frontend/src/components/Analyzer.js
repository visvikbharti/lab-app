import React, { useState } from 'react';

const Analyzer = () => {
  const [sample1, setSample1] = useState('');
  const [sample2, setSample2] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    // Basic validation
    if (!sample1 || !sample2) {
      setError('Both samples are required');
      setResult(null);
      return;
    }
    
    const sample1Array = sample1.split(',').map(Number);
    const sample2Array = sample2.split(',').map(Number);

    if (sample1Array.some(isNaN) || sample2Array.some(isNaN)) {
      setError('All values must be numbers');
      setResult(null);
      return;
    }

    if (sample1Array.length < 2 || sample2Array.length < 2) {
      setError('Each sample must contain at least two values');
      setResult(null);
      return;
    }

    setError(null);

    console.log('Analyzing with samples:', sample1Array, sample2Array);
    try {
      const response = await fetch('/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sample1: sample1Array,
          sample2: sample2Array
        })
      });
      console.log('Response received:', response);
      if (response.ok) {
        const data = await response.json();
        console.log('Data received:', data);
        setResult(data);
        setError(null);
      } else {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        setError(errorData.error || 'Unknown error');
        setResult(null);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Fetch error: ' + error.message);
      setResult(null);
    }
  };

  return (
    <div>
      <h2>Statistical Analysis</h2>
      <div>
        <label>
          Sample 1 (comma-separated values):
          <input
            type="text"
            value={sample1}
            onChange={(e) => setSample1(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Sample 2 (comma-separated values):
          <input
            type="text"
            value={sample2}
            onChange={(e) => setSample2(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleAnalyze}>Analyze</button>
      {error && (
        <div style={{ color: 'red' }}>
          <h3>Error:</h3>
          <p>{error}</p>
        </div>
      )}
      {result && (
        <div>
          <h3>Results:</h3>
          <p>T-statistic: {result.t_stat}</p>
          <p>P-value: {result.p_value}</p>
        </div>
      )}
    </div>
  );
};

export default Analyzer;
