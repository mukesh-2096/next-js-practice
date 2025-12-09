export const revalidate = 60;

const articles = [
	{
		id: 1,
		title: 'My week in tech',
		summary: 'Notes from experiments with React Server Components and what surprised me the most.',
		published: 'December 8, 2025',
	},
	{
		id: 2,
		title: 'Small wins log',
		summary: 'Celebrating the little things: fixed a sticky layout bug and launched a mini side project.',
		published: 'December 5, 2025',
	},
	{
		id: 3,
		title: 'Reading list',
		summary: 'Three articles that helped me understand caching and data fetching in Next.js.',
		published: 'November 30, 2025',
	},
];

export default function NewsPage() {
	return (
		<div className="min-h-screen bg-linear-to-br from-purple-50 via-indigo-50 to-sky-50 py-12 px-6">
			<div className="max-w-3xl mx-auto bg-white shadow-xl rounded-3xl p-10">
				<div className="mb-8 text-center">
					<h1 className="text-4xl font-bold text-gray-900">Latest Updates</h1>
					<p className="text-gray-600 mt-2">Incremental Static Regeneration (ISR)</p>
				</div>

				<div className="mb-8 rounded-2xl bg-purple-50 p-6">
					<p className="font-semibold text-purple-800">♻️ Rendering Mode: ISR</p>
					<p className="text-sm text-purple-700 mt-2">
						This page is statically generated and automatically refreshed every 60 seconds.
					</p>
					<p className="text-xs text-purple-600 mt-3">
						Revalidation interval: <strong>60 seconds</strong>
					</p>
				</div>

				<section className="space-y-4">
					{articles.map((article) => (
						<article key={article.id} className="rounded-2xl border border-gray-200 p-6 hover:border-purple-300 transition-colors">
							<p className="text-sm text-gray-500">📅 {article.published}</p>
							<h2 className="mt-2 text-2xl font-semibold text-gray-900">{article.title}</h2>
							<p className="text-gray-600 mt-2">{article.summary}</p>
						</article>
					))}
				</section>

				<section className="mt-10 rounded-2xl bg-gray-50 p-6">
					<h3 className="text-lg font-semibold text-gray-900">📝 About this page</h3>
					<p className="text-gray-600 mt-2">
						I use ISR when I want mostly static content that still refreshes occasionally. It keeps hosting
						costs low while ensuring the notes you see here are never too outdated.
					</p>
				</section>
			</div>
		</div>
	);
}
