fetch("./travel_recommendation_api.json")
	.then(response => {
		return response.json();
	})
	.then(json => {
		console.log(json);
		ready(json);
	})
	.catch(error => {
		console.log("FAILED", error);
	});

var searchBar = document.getElementById("searchBar");
var searchBtn = document.getElementById("searchBtn");
var resetBtn = document.getElementById("resetBtn");
var recommendations = document.getElementById("recommendations");

function ready (api) {
	searchBar.addEventListener("keydown", function (e) {
		if (e.key === "Enter") {
			searchBtn.click();
		}
	});
	searchBtn.addEventListener("click", function () {
		recommendations.innerHTML = "";
		let terms = {
			"countr": "countries",
			"temple": "temples",
			"beach": "beaches"
		};
		for (let term of Object.keys(terms)) {
			if (searchBar.value.toLowerCase().indexOf(term) !== -1) {
				console.log("To display:", api[terms[term]]);
				for (let cardData of api[terms[term]]) {
					if ("cities" in cardData) {
						for (let card of cardData.cities) {
							let cardDiv = createCard(card);
							recommendations.appendChild(cardDiv);
						}
					} else {
						let cardDiv = createCard(cardData);
						recommendations.appendChild(cardDiv);
					}
				}
			}
		}
	});
	resetBtn.addEventListener("click", function () {
		recommendations.innerHTML = "";
		searchBar.value = "";
	})
}

function createCard (card) {
	let cardDiv = document.createElement("div");
	cardDiv.className = "card";
	let img = document.createElement("img");
	img.src = card.imageUrl;
	img.alt = card.name;
	img.width = "360";
	let h2 = document.createElement("h2");
	h2.textContent = card.name;
	let p = document.createElement("p");
	p.textContent = card.description;
	cardDiv.appendChild(img);
	cardDiv.appendChild(h2);
	cardDiv.appendChild(p);
	return cardDiv;
}