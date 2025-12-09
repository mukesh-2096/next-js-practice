// Static Page - Pre-rendered at build time
export const revalidate = false;

const facts = [
    { id: 1, label: 'Name', value: 'Mukesh' },
    { id: 2, label: 'Role', value: 'Frontend Developer' },
    { id: 3, label: 'Location', value: 'Chittoor, India' },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-linear-to-br from-purple-50 via-indigo-50 to-sky-50 py-12 px-6">
            <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-3xl p-10">
                <header className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">About Me</h1>
                    <p className="text-gray-600 mt-2">Static Site Generation (SSG)</p>
                </header>

                <section className="mb-8 rounded-2xl bg-blue-50 p-6">
                    <p className="font-semibold text-blue-800">Rendering Mode: Static</p>
                    <p className="text-sm text-blue-700 mt-2">
                        This page is rendered at build time and served instantly without revalidation.
                    </p>
                </section>

                <section className="space-y-4">
                    {facts.map((item) => (
                        <div key={item.id} className="rounded-2xl border border-gray-200 p-6 hover:border-blue-300 transition-colors">
                            <p className="text-sm text-gray-500">{item.label}</p>
                            <p className="text-xl font-semibold text-gray-900 mt-1">{item.value}</p>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}
