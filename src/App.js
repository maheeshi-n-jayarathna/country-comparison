import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country1, setCountry1] = useState('');
  const [country2, setCountry2] = useState('');
  const [countryData1, setCountryData1] = useState(null);
  const [countryData2, setCountryData2] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // REST Countries API එකෙන් රටවල් ලැයිස්තුව ගන්න
    axios.get('https://restcountries.com/v2/all')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        setError('Error fetching countries.');
      });
  }, []);

  const fetchCountryData = (countryCode, setCountryData) => {
    axios.get(`https://restcountries.com/v2/alpha/${countryCode}`)
      .then(response => {
        setCountryData(response.data);
      })
      .catch(error => {
        setError('Error fetching country data.');
      });
  };

  const handleCompare = () => {
    // රටවල් දෙකේ විස්තර ලබාගන්න
    fetchCountryData(country1, setCountryData1);
    fetchCountryData(country2, setCountryData2);
  };

  return (
    <div className="App">
      <h1>Country Comparison</h1>
      {error && <p>{error}</p>}

      <div className='comparisoncountry'>
        <div>
          <label>Country 1 :</label>
          <select onChange={e => setCountry1(e.target.value)}>
            <option value="">Select Country</option>
            {countries.map(country => (
              <option key={country.alpha3Code} value={country.alpha3Code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Country 2 :</label>
          <select onChange={e => setCountry2(e.target.value)}>
            <option value="">Select Country</option>
            {countries.map(country => (
              <option key={country.alpha3Code} value={country.alpha3Code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button className='button' onClick={handleCompare}>Compare</button>

      {countryData1 && countryData2 && (
        <div className="comparison">
          <div>
            <h2>{countryData1.name}</h2>
            <img src={countryData1.flag} alt={`${countryData1.name} flag`} width="100" />
            <p>Capital : {countryData1.capital}</p>
            <p>Population : {countryData1.population}</p>
            <p>Area : {countryData1.area} km²</p>
            <p>Languages : {countryData1.languages.map(lang => lang.name).join(', ')}</p>
          </div>

          <div>
            <h2>{countryData2.name}</h2>
            <img src={countryData2.flag} alt={`${countryData2.name} flag`} width="100" />
            <p>Capital : {countryData2.capital}</p>
            <p>Population : {countryData2.population}</p>
            <p>Area : {countryData2.area} km²</p>
            <p>Languages : {countryData2.languages.map(lang => lang.name).join(', ')}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
