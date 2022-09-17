import React from 'react'
import { useState, useEffect } from 'react';

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_APIKEY,
		'X-RapidAPI-Host': process.env.REACT_APP_APIHOST
    }
};


console.log(options);

function QuoteBox() {
    const [quote, setQuote] = useState({
        quote:{
            text:"The most beautiful moments in life are moments when you are expressing your joy, not when you are seeking it.",
            author:"Sadhguru"
        },
    });
    
    function handleClick() {
        setQuote({
            quote:{
            text:"There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is.",
            author:"Albert Einstein"
            }
        })
    };
    
    useEffect(()=>{
        fetch('https://quotes15.p.rapidapi.com/quotes/random/?language_code=en', options)
        .then(response => response.json())
        .then((response) => {
            console.log(response);
            setQuote({
                quote:{
                    text: response.content,
                    author: response.originator.name
                }
            });
        })
        .catch(err => console.error(err));
    },[]);
    
      return (
    <div id="quote-box">
        <p id="text">{quote.quote.text}</p>
        <span id="author">{quote.quote.author}</span>
        <a href="twitter.com/intent/tweet" id="tweet-quote">Tweet</a>
        <button id="new-quote" onClick={handleClick}>Next</button>
    </div>
  )
}

export default QuoteBox