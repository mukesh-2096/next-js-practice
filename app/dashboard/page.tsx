export const dynamic = 'force-dynamic';

const highlights = [
	{ id: 1, label: 'Current Project', value: 'Next.js Learning Journey' },
	{ id: 2, label: 'Focus Area', value: 'Server Components & Caching' },
	{ id: 3, label: 'Learning Goal', value: 'Ship polished UI demos' },
];

export default function DashboardPage() {
	const serverTime = new Date().toLocaleString();
	const randomScore = Math.floor(Math.random() * 100);

	return (
		<div className="min-h-screen bg-linear-to-br from-purple-50 via-indigo-50 to-sky-50 py-12 px-6">
			<div className="max-w-3xl mx-auto bg-white shadow-xl rounded-3xl p-10">
				<header className="mb-8 text-center">
					<h1 className="text-4xl font-bold text-gray-900">Live Dashboard</h1>
					<p className="text-gray-600 mt-2">Server-Side Rendering (SSR)</p>
				</header>

				<section className="mb-8 rounded-2xl bg-emerald-50 p-6">
					<p className="font-semibold text-emerald-800">Rendering Mode: Dynamic</p>
					<p className="text-sm text-emerald-700 mt-2">
						This page fetches fresh data on every request using server-side rendering.
					</p>
				</section>

				<section className="space-y-4">
					<div className="rounded-2xl border border-gray-200 p-6 hover:border-emerald-300 transition-colors">
						<p className="text-sm text-gray-500">Server Time</p>
						<p className="text-xl font-semibold text-gray-900 mt-1">{serverTime}</p>
					</div>
					<div className="rounded-2xl border border-gray-200 p-6 hover:border-emerald-300 transition-colors">
						<p className="text-sm text-gray-500">Focus Score</p>
						<p className="text-xl font-semibold text-gray-900 mt-1">{randomScore}%</p>
					</div>
					{highlights.map((item) => (
						<div
							key={item.id}
							className="rounded-2xl border border-gray-200 p-6 hover:border-emerald-300 transition-colors"
						>
							<p className="text-sm text-gray-500">{item.label}</p>
							<p className="text-xl font-semibold text-gray-900 mt-1">{item.value}</p>
						</div>
					))}
				</section>

				<section className="mt-10 rounded-2xl bg-gray-50 p-6 text-gray-600">
					<p>Refreshing reveals new server time and focus scores, proving true dynamic rendering.</p>
				</section>
			</div>
		</div>
	);
}
