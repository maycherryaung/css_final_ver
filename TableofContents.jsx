"use client";
import PrecautionsCarousel from './PrecautionCarousel';  // import the carousel
import { ChevronRight } from 'lucide-react';
import FAQSection from './FAQSection';

const variantsData = [
  {
    name: 'Alpha Variant (B.1.1.7)',
    country: 'United Kingdom',
    infectivity: '50% more contagious',
    symptoms: 'Headaches, muscle aches, loss of appetite, chills',
    year: '2020',
    info: 'This variant began to spread quickly in December, around the same time that infections surged. The Alpha variant actually disappeared in late 2021 due to the competition of other variants that are more contagious.'
  },
  {
    name: 'Delta Variant (B.1.617.2)',
    country: 'India',
    infectivity: '100% more contagious than the original strain, making it about twice more transmissible',
    symptoms: 'Headaches, sore throat, running nose, fever',
    year: '2021',
    info: 'It was named on 31 May 2021 and had spread to over 179 countries by 22 November 2021. It has mutations in its genes that make the spike protein, leading to mutations like T478K, P681R, and L452R. These mutations made the virus spread more easily.'
  },
  {
    name: 'Omicron Variant (B.1.1.529)',
    country: 'South Africa',
    infectivity: '300-400% more transmissible',
    symptoms: 'Headaches, body aches, cough, fatigue, fever, loss of smell or taste, night sweats, skin rash',
    year: '2022',
    info: 'Several subvariants of Omicron have emerged following the original B.1.1.529, including BA.1, BA.2, BA.3, BA.4, and BA.5. As of September 2024, a new subvariant of Omicron labeled XEC has emerged. This variant was found in Europe, and in 25 states in the United States of America.'
  }
];

export default function TableOfContentsPage() {
  return (
    <div style={{ display: 'flex', padding: '20px' }}>
      
    {/* table of contents on the left */}
<div style={{
  backgroundColor: '#f9f9f9',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  maxWidth: '300px',
  margin: '20px',
  border: '1px solid #e0e0e0',
  height: 'fit-content',
  position: 'sticky',
  top: '20px',
  alignSelf: 'flex-start'
}}>  
  <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Table of Contents</h2>

  <a href="#origin" style={{
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    transition: 'color 0.3s'
  }}
  onMouseOver={(e) => e.target.style.color = '#0056b3'}
  onMouseOut={(e) => e.target.style.color = '#007bff'}
  >
    <ChevronRight size={18} style={{ marginRight: '8px' }} />
    Origin of Coronavirus
  </a>
  <a href="#covid-strains" style={{
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    transition: 'color 0.3s'
  }}
  onMouseOver={(e) => e.target.style.color = '#0056b3'}
  onMouseOut={(e) => e.target.style.color = '#007bff'}
  >
    <ChevronRight size={18} style={{ marginRight: '8px' }} />
    What are the COVID-19 strains?
  </a>

  <a href="#precautions" style={{
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    transition: 'color 0.3s'
  }}
  onMouseOver={(e) => e.target.style.color = '#0056b3'}
  onMouseOut={(e) => e.target.style.color = '#007bff'}
  >
    
    <ChevronRight size={18} style={{ marginRight: '8px' }} />
    What are some precautions that can be taken?
  </a>

  <a href="#faq" style={{
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    transition: 'color 0.3s'
  }}
  onMouseOver={(e) => e.target.style.color = '#0056b3'}
  onMouseOut={(e) => e.target.style.color = '#007bff'}
  >
    <ChevronRight size={18} style={{ marginRight: '8px' }} />
    Frequently Asked Questions (FAQs)
  </a>
</div>

{/* main content on the right */}
<div style={{
  width: '75%',
  padding: '20px',
}}>
  <section id="origin" style={{ marginBottom: '40px'}}>
    <h2>Origin of Coronavirus</h2>
    <p style={{ fontSize: '18px' }}>
      Latest intelligence reports agree that the virus responsible for SARS-CoV-2, was not developed to be a biological weapon. While it is plausible that the virus originated when a version of a coronavirus
      was being studied with animals in a lab, there isn't definitive evidence on the real cause. <br></br><br></br>
      The virus that causes Covid-19 was given its name because it is genetically similar to the virus that caused the 2003 Sars outbreak. Viruses are typically given their names
      based of their genetic structure. <br></br><br></br>Covid-19 first appeared in November 2019 with the initial large outbreak in Wuhan,China, in December 2019. It is widely believed that the virus was 
      able to jump to humans through exposure at the open-air wet markets in Wuhan, known for selling fresh produce and meat. These markets are conducive environments for the transmission of 
      diseases to occur due to the close proximity of humans and a variety of wild animals.
    </p>
  </section>
  <section id="covid-strains" style={{ marginBottom: '40px' }}>
    <h2>What are the COVID-19 strains?</h2>
    <p style={{ fontSize: '18px', marginBottom: '80px'}}> 
      Like any other virus, Covid-19 has undergone significant changes over time, due to various factors like its genetic makeup and environmental exposure. As a virus replicates, small errors can occur in its genetic code.These errors are known as genetic mutation and can accumulate and alter how the virus behaves. <br></br><br>
      </br>Some mutations have little to no effect, while others can cause severe changes to the way it spreads or even how it evades the immune system. Over time, these mutations lead to multiple variants or strains of the Covid-19 virus, each with unique characteristics that influenced the course of the pandemic.
    </p>
     {/* Cards Layout */}
     <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '20px'
        }}>
     
          {/* Mapping Over Variants Data */}
          {variantsData.map((variant, index) => (
            <div key={index} style={{
              position: 'relative',
              backgroundColor: '#fff',
              padding: '15px',
              borderRadius: '10px',
              border: '1px solid #ddd',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              width: '30%',
              textAlign: 'center',
              zIndex: 1
            }}>
              {/* Variant Name */}
              <p style={{ fontSize: '22px', fontWeight: 'bold' }}>{variant.name}</p>

              {/* Variant Details */}
              <p><strong>Country of Origin:</strong> {variant.country}</p>
              <p><strong>Infectivity:</strong> {variant.infectivity}</p>
              <p><strong>Symptoms:</strong> {variant.symptoms}</p>
              <p>{variant.info}</p>
              
              {/* Line */}
              <div style={{
                position: 'absolute',
                top: '-8%',
                left: '0',
                right: '0',
                height: '4px',  // Line thickness
                backgroundColor: 'black',  // Line color
                zIndex: 0  // Send the line behind the labels
                }}></div>

              {/* Year Label */}
              <span style={{
                position: 'absolute',
                top: '-50px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#fff',
                padding: '2px 8px',
                borderRadius: '5px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                fontSize: '20px',
                color: '#555'
              }}>{variant.year}</span>
            </div>
          ))}
        </div>
        
        {/* Add extra space below the year labels */}
        <div style={{ height: '60px' }}></div>
      </section>

  <section id="precautions" style={{ marginBottom: '40px' }}>
    <h2>What are some precautions that can be taken?</h2>
    <PrecautionsCarousel></PrecautionsCarousel>
  </section>

  <div style={{ display: 'flex', justifyContent: 'flex-start', 
  alignItems: 'flex-start',textAlign: 'left', maxWidth: '600px', margin: '0' }}>
  <section id="faq">
  <FAQSection />
  </section>
</div>
</div>

</div>)}
