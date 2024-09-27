document.addEventListener("DOMContentLoaded", () => {
	const cardsContainer = document.getElementById("cards-container");

	// Example data fetched from API
	const cardData = [
		{
			title: "Harbor Deputy Chief Officer - Development",
			location: "Austin, Texas",
			company: "City of Austin, TX",
			date: "2023-06-08",
			categories: [
				"Full Time",
				"Aviation or Harbor",
				"Planning and Development",
				"Clerical and Administrative Management Technical Support",
			],
		},
		{
			title: "Deputy Chief Administrative Officer",
			location: "Austin, Texas",
			company: "City of Austin, TX",
			date: "2023-06-08",
			categories: [
				"Full Time",
				"Project Management",
				"Planning and Development",
				"Clerical and Administrative Management Technical Support",
			],
		},
		{
			title: "Executive Director, Equity, Social Justice, & Inclusion",
			location: "Austin, Texas",
			company: "City of Austin, TX",
			date: "2023-06-08",
			categories: [
				"Full Time",
				"Project Management",
				"Planning and Development",
				"Clerical and Administrative Management Technical Support",
			],
		},
		{
			title: "Airport Program Administrator - Strategic Planning Management",
			location: "Austin, Texas",
			company: "City of Austin, TX",
			date: "2023-06-08",
			categories: [
				"Full Time",
				"Aviation or Harbor",
				"Planning and Development",
				"Clerical and Administrative Management Technical Support",
			],
		},
	];

	const MAX_VISIBLE_CATEGORIES = 2;

	cardData.forEach((card) => {
		const cardElement = document.createElement("article");
		cardElement.classList.add("card");

		// Header section
		const headerOuter = document.createElement("header");
		headerOuter.classList.add("card__header-outer");

		const headerInner = document.createElement("div");
		headerInner.classList.add("card__header-inner");

		const title = document.createElement("h3");
		title.classList.add("card__title");
		title.textContent = card.title;

		headerInner.appendChild(title);
		headerOuter.appendChild(headerInner);
		cardElement.appendChild(headerOuter);

		// Card list section (location, company, date)
		const list = document.createElement("ul");
		list.classList.add("card__list");

		const listItemLocation = createListItem("map-marker", card.location);
		const listItemCompany = createListItem("solar-map", card.company);
		const listItemDate = createListItem(
			"calendar",
			new Date(card.date).toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
			}),
		);

		list.appendChild(listItemLocation);
		list.appendChild(listItemCompany);
		list.appendChild(listItemDate);
		cardElement.appendChild(list);

		// Categories section
		const categoriesOuter = document.createElement("div");
		categoriesOuter.classList.add("card__categories-outer");

		const categoriesInner = document.createElement("ul");
		categoriesInner.classList.add("card__categories-inner");

		card.categories.forEach((category, index) => {
			const categoryItem = document.createElement("li");
			categoryItem.classList.add("card__categories-item");

			const categorySpan = document.createElement("span");
			categorySpan.classList.add("card__categories-title");
			categorySpan.textContent = category;

			categoryItem.appendChild(categorySpan);

			// Only show first few categories
			if (index >= MAX_VISIBLE_CATEGORIES) {
				categoryItem.classList.add("hidden");
			}

			categoriesInner.appendChild(categoryItem);
		});

		categoriesOuter.appendChild(categoriesInner);

		// Show more button
		if (card.categories.length > MAX_VISIBLE_CATEGORIES) {
			const showMoreButton = document.createElement("button");
			showMoreButton.classList.add("card__categories-button");
			const hiddenItemsCount = card.categories.length - MAX_VISIBLE_CATEGORIES;
			showMoreButton.textContent = `Show More (+${hiddenItemsCount})`;

			showMoreButton.addEventListener("click", () => {
				const isExpanded = categoriesInner.classList.toggle("expanded");
				showMoreButton.textContent = isExpanded ? "Show Less" : `Show More (+${hiddenItemsCount})`;

				const hiddenItems = categoriesInner.querySelectorAll(".hidden");
				hiddenItems.forEach((item) => {
					item.classList.toggle("hidden");
				});
			});

			categoriesOuter.appendChild(showMoreButton);
		}

		cardElement.appendChild(categoriesOuter);

		// Read More button
		const buttonOuter = document.createElement("div");
		buttonOuter.classList.add("card__button-outer");

		const readMoreButton = document.createElement("button");
		readMoreButton.classList.add("card__button");
		readMoreButton.textContent = "Read More";

		buttonOuter.appendChild(readMoreButton);
		cardElement.appendChild(buttonOuter);

		// Add card to container
		cardsContainer.appendChild(cardElement);
	});

	function createListItem(iconType, text) {
		const listItem = document.createElement("li");
		listItem.classList.add("card__list-item");

		const listItemText = document.createElement("span");
		
		iconType === "calendar"
			? listItemText.classList.add("card__list-time")
			: listItemText.classList.add("card__list-span");

		listItemText.textContent = text;

		listItem.appendChild(listItemText);

		return listItem;
	}
});
