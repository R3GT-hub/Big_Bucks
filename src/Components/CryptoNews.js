import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./CryptoNews.css";

const NewsSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('https://bing-news-search1.p.rapidapi.com/news', {
        params: {
          safeSearch: 'Off',
          textFormat: 'Raw'
        },
        headers: {
          'X-BingApis-SDK': 'true',
          'X-RapidAPI-Key': '7580808f09msha9dcc1f63ed65edp183362jsne549db30ac0e',
          'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
        }
      });

      setArticles(response.data.value);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://bing-news-search1.p.rapidapi.com/news/search', {
        headers: {
          'X-RapidAPI-Key': 'f0021db587msh781fb1cbef39856p11c183jsn45521d5d1c85',
        },
        params: {
          q: searchQuery,
          count: 7,
        },
      });
  
      setArticles(response.data?.value || []);
    } catch (error) {
      console.error('Error searching news:', error);
    }
  };

  return (
    <div className='newsbox'>
      <input
        className='newssearch'
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search news..."
      />
      <button className='newsbutton' onClick={handleSearch}>Search</button>

      <h2>News Articles</h2>
      <div className='newsarticles'>
        <ul>
          {articles.map((article) => (
            <li key={article.url}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewsSearch;
