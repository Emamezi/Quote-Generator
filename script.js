let apiQuotes = [];
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const quoteContainer = document.getElementById("quote-container");
const loader = document.querySelector(".loader");

//Show loading
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
//Hide showLoadingSpinner
function hideLoadingSpinner() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}
//show quote function
function newQuote() {
  showLoadingSpinner();
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
  //set Quote, Hide loader
  quoteText.textContent = text;
  hideLoadingSpinner();
}

//Get quotes from API
async function getQuotes() {
  showLoadingSpinner();
  try {
    const apiUrl =
      "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    newQuote();
  }
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
