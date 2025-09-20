import HeroSectionDynamic from "../../components/HeroSectionDynamic";
import ContentManager from "../../components/ContentManager";
import { getContent } from "../../utils/contentLoader";

export default function DemoPage() {
  const content = getContent();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dynamic Content Demo</h1>
              <p className="text-gray-600">This page demonstrates the dynamic content system</p>
            </div>
            <div className="text-sm text-gray-500">
              Content loaded from: <code className="bg-gray-100 px-2 py-1 rounded">websiteContent.json</code>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <HeroSectionDynamic />

      {/* Content Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Current Content Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Event Name:</span>
                <span className="font-medium">{content.event.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hashtag:</span>
                <span className="font-medium">{content.event.hashtag}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Dates:</span>
                <span className="font-medium">{content.event.dates.display}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium">{content.event.location.display}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Featured Speakers:</span>
                <span className="font-medium">{content.speakers.featured.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sponsorship Packages:</span>
                <span className="font-medium">{content.sponsors.packages.length}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">How It Works</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                All website content is now stored in a single JSON file at <code className="bg-gray-100 px-2 py-1 rounded text-sm">src/data/websiteContent.json</code>
              </p>
              <p>
                The <code className="bg-gray-100 px-2 py-1 rounded text-sm">useContent</code> hook provides easy access to all content with TypeScript support.
              </p>
              <p>
                Components can be made dynamic by replacing hardcoded text with content from the JSON file.
              </p>
              <p>
                The Content Manager widget (top-right) allows you to edit content in real-time.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Available Content Sections</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: 'Event', desc: 'Event details, dates, location' },
              { name: 'Hero', desc: 'Main hero section content' },
              { name: 'About', desc: 'About section text and CTA' },
              { name: 'Speakers', desc: 'Speaker profiles and information' },
              { name: 'Schedule', desc: 'Event schedule and sessions' },
              { name: 'Sponsors', desc: 'Sponsorship packages and partners' },
              { name: 'Venue', desc: 'Venue information and features' },
              { name: 'Registration', desc: 'Ticket types and pricing' },
              { name: 'Footer', desc: 'Footer links and social media' },
              { name: 'Theme', desc: 'Colors, typography, animations' },
              { name: 'SEO', desc: 'Meta tags and SEO settings' },
              { name: 'Navigation', desc: 'Navigation menu items' }
            ].map((section) => (
              <div key={section.name} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-900">{section.name}</div>
                <div className="text-sm text-gray-600 mt-1">{section.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Manager Widget */}
      <ContentManager />
    </div>
  );
}