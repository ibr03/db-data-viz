import { useState } from 'react';
import axios from 'axios';

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState('');
    const [error, setError] = useState(null);
    const [results, setResults] = useState([]);

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
        // clear error when user starts typing
        setError(null);
    };

    const handleSearch = async () => {
        // check if input is empty
        if (!searchInput.trim()) {
            setError('Empty Input');
            return;
        }

        // send request if non-empty input
        try {
            const response = await axios.get(`http://localhost:4000/api/data?query=${searchInput}`);
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <h1>Search Bar</h1>
            <input 
                type="text" 
                value={searchInput} 
                onChange={handleInputChange}
                placeholder='Enter your search query'
            />
            <button onClick={handleSearch}>Search</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <ul
                style={{
                    margin: '0',
                    padding: '0',
                    listStyleType: 'none',
                }}
            >
                {results.map((result) => (
                <li 
                    key={result.idx}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '8px 0',
                      }}
                >
                    {result.patent_text}
                </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchBar;