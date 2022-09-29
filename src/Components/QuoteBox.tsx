import React from 'react'
import { useState, useEffect, useCallback } from 'react';
import options from './Config'
import Loader from './Loader';
import Twitter from '../twitter.png'

function QuoteBox() {
    const [quote, setQuote] = useState({
        // quote:{
        //     text:"The most beautiful moments in life are moments when you are expressing your joy, not when you are seeking it.",
        //     author:"Sadhguru"
        // }, 
        quote:{
            text:"",
            author:""
        },
    });
    const [IsLoaded, setIsLoaded] = useState(false);
    
    function handleClick() {
        // setQuote({
        //     quote:{
        //     text:"There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is.",
        //     author:"Albert Einstein"
        //     }
        // })
        newQuotes();
    };

    const newQuotes = useCallback(()=>{
        setIsLoaded(false);
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
            setIsLoaded(true);
        })
        .catch(err => console.error(err));
    },[])

    useEffect(()=>{
        newQuotes();
    },[newQuotes]);
    
    return (
        <div id="quote-box">
            { IsLoaded ? <><div><p id="text">{quote.quote.text}</p>
            <span id="author">{quote.quote.author}</span></div>
            <a href="twitter.com/intent/tweet" id="tweet-quote"><img src={Twitter} alt="Tweet" id='tweet' /></a>
            <button id="new-quote" onClick={handleClick}>Next</button></> : <Loader/>}
        </div>
      )
}

export default QuoteBox