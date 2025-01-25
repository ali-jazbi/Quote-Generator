'use strict';
const mainParag = document.querySelector('#quoteText');
const authorParag = document.querySelector('#authorText');

const mainQuote = async () => {
	try {
		const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
			method: 'GET',
			headers: {
				'X-Api-Key': 'DLhaH0832Bb9mNNzSAibfw==n2B7NNW9KP0I1nBz',
			},
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const quoteData = await response.json();
		const quoteText = quoteData[0].quote;
		const quoteAuthor = quoteData[0].author;

		const translatedResponse = await fetch(
			`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=fa&dt=t&q=${encodeURIComponent(
				quoteText
			)}`
		);

		if (!translatedResponse.ok) {
			throw new Error('Error translating quote');
		}

		const translatedData = await translatedResponse.json();
		const translatedQuote = translatedData[0][0][0];

		mainParag.textContent = `" ${translatedQuote} "`;
		authorParag.textContent = `${quoteAuthor}   ✍🏻`;
	} catch (error) {
		console.error('Error fetching or translating quote:', error);
		mainParag.textContent = 'Sorry, something went wrong!';
		authorParag.textContent = '';
	}
};
const resetBTN = document.querySelector('#reset');
resetBTN.addEventListener('click', () => {
	mainParag.textContent = 'در حال بارگزاری ...';
	authorParag.textContent = '-------';
	mainQuote();
});
mainQuote();
