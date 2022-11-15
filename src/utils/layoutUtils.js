const renderPage = (activePage) => {
	switch (activePage) {
		case "Series":
			return "/series";
		case "Animes":
			return "/animes";
		case "Films":
			return "/films";
		case "Documentaires":
			return "/documentaires";
		case "Clips":
			return "/clips";
		case "Audiotheque":
			return "/audiotheque";
		case "Conferences":
			return "/conferences";
		case "Web-radios":
			return "/radio";
		case "Formations":
			return "/learning";
		default:
			return "/";
	}
};

const rubriques = [
	"Documentaires",
	"Conferences",
	"Formations",
	"Audiotheque",
	"Web-radios",
];
module.exports = {
	renderPage,
	rubriques,
};
