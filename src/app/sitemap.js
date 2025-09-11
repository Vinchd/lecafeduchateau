export default function sitemap() {
	return [
		{
			url: "https://www.lecafeduchateau.fr/",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: "https://www.lecafeduchateau.fr/menu",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: "https://www.lecafeduchateau.fr/informations",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: "https://www.lecafeduchateau.fr/dimanches-du-chateau",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.7,
		},
	];
}
