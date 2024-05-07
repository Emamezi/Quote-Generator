let apiQuotes = [];
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

//show quote function
function newQuote() {
  //Pick random quote from apiqoutes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  const { text, author } = quote;
  //check if author field is blank
  !author
    ? (authorText.textContent = "unknown")
    : (authorText.textContent = author);

  if (text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = text;
}

//Get quotes from API
async function getQuotes() {
  try {
    const apiUrl =
      "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    console.log(apiQuotes);
    newQuote();
  } catch (error) {}
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// onload
getQuotes();

//Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
