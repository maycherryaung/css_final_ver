import { useState } from 'react';

export default function FAQSection() {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (questionNumber) => {
    if (openQuestion === questionNumber) {
      setOpenQuestion(null);
    } else {
      setOpenQuestion(questionNumber);
    }
  };

  return (
    <div style={{ marginTop: '40px', maxWidth: '600px', marginLeft: '0'}}>
      <h2 style={{ textAlign: 'left', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Frequently Asked Questions</h2>
  
      {/* Question 1 */}
      <div style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
        <button 
          onClick={() => toggleQuestion(1)} 
          style={{ 
            width: '100%', 
            backgroundColor: 'white', 
            border: 'none', 
            textAlign: 'left', 
            fontSize: '18px', 
            cursor: 'pointer', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center'
          }}
        >
          Are the Covid-19 vaccines safe and effective?
          <span style={{ transform: openQuestion === 1 ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
            {'\u25BC'} {/* Downward arrow */}
          </span>
        </button>
        {openQuestion === 1 && (
          <p style={{ marginTop: '10px', fontSize: '16px',textAlign: 'left' }}>
            Yes, Covid-19 vaccines have been developed as rapidly as possible following the multiple variants that emerged. The vaccines
            must undergo rigorous testing in labs to prove that they meet the safety requirements that has been agreed upon. Only then can a vaccine
            receive validation from trusted organizations like WHO.
          </p>
        )}
      </div>
  
      {/* Question 2 */}
      <div style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
        <button 
          onClick={() => toggleQuestion(2)} 
          style={{ 
            width: '100%', 
            backgroundColor: 'white', 
            border: 'none', 
            textAlign: 'left', 
            fontSize: '18px', 
            cursor: 'pointer', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center'
          }}
        >
          How severe is Covid-19 infection?
          <span style={{ transform: openQuestion === 2 ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
            {'\u25BC'} {/* Downward arrow */}
          </span>
        </button>
        {openQuestion === 2 && (
          <p style={{ marginTop: '10px', fontSize: '16px', textAlign: 'left' }}>
            Some people that is infected with the virus will experience mild respiratory illnesses and most will recover without needing special treatment. 
            However, Covid-19 can sometimes be a severe disease that could cause serious respiratory inefficiency requiring intensive care and sometimes leads to death.
            People with weaker immune systems like the elderly or those with underlying medical conditions are more likely to develop serious illness from the virus.
          </p>
        )}
      </div>
    </div>
  );
  }
  