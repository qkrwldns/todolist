const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const getRandomQuoteButton = document.getElementById("get-random-quote");
const apiUrl = "https://type.fit/api/quotes";
// 명언 데이터 가져오기
function fetchRandomQuote() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const quotes = data;
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const randomQuote = quotes[randomIndex];
            // 명언에서 ", type.fit"을 제거하여 표시
            if (randomQuote.author === "type.fit") {
                var cleanedText = randomQuote.author.replace("type.fit", 'Unknown');
            } else {
                var cleanedText = randomQuote.author.replace(", type.fit", '');
            }
            // 명언에서 ", type.fit"을 제거하여 표시       
            quoteText.textContent = randomQuote.text;
            quoteAuthor.textContent = cleanedText;
        })
        .catch(error => {
            console.error("데이터를 가져오는 중 오류가 발생했습니다: " + error);
        });
}
// 초기 명언 가져오기
fetchRandomQuote();
// "다른 명언" 버튼 클릭 시 이벤트 처리
getRandomQuoteButton.addEventListener("click", fetchRandomQuote);

//fetch("https://type.fit/api/quotes")
// .then(function(response) {
//   return response.json();
// })
// .then(function(data) {
//   console.log(data);
// });