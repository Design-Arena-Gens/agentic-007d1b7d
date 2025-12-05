'use client';

import { useState } from 'react';

interface Job {
  title: string;
  company: string;
  location: string;
  salary?: string;
  postedDate: string;
  url: string;
  source: string;
  visaInfo: string;
  country: string;
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchJobs = async () => {
    setLoading(true);
    setError(null);
    setJobs([]);

    try {
      const response = await fetch('/api/search-jobs');
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const data = await response.json();
      setJobs(data.jobs || []);

      if (data.jobs.length === 0) {
        setError('No visa-sponsored jobs found in the last 14 days. Try again later.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Visa-Sponsored Job Finder
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Marketing • Content Creation • Videography • Editing • Community Management • WordPress
          </p>
          <p className="text-sm text-gray-500 mb-6">
            🌍 UK • Ireland • Belgium • Netherlands • Italy
          </p>
          <button
            onClick={searchJobs}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors duration-200"
          >
            {loading ? 'Searching...' : 'Search Latest Jobs'}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Searching official portals...</p>
          </div>
        )}

        {!loading && jobs.length > 0 && (
          <div className="space-y-4">
            <div className="bg-white px-4 py-3 rounded-lg shadow-sm">
              <p className="text-gray-700 font-semibold">
                Found {jobs.length} visa-sponsored job{jobs.length !== 1 ? 's' : ''}
              </p>
            </div>

            {jobs.map((job, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">
                      {job.title}
                    </h2>
                    <p className="text-gray-700 font-medium">{job.company}</p>
                  </div>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {job.country}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-gray-600">
                    📍 <span className="font-medium">{job.location}</span>
                  </p>
                  {job.salary && (
                    <p className="text-gray-600">
                      💰 <span className="font-medium">{job.salary}</span>
                    </p>
                  )}
                  <p className="text-gray-500 text-sm">
                    📅 Posted: {job.postedDate}
                  </p>
                  <p className="text-green-700 bg-green-50 px-3 py-2 rounded-md inline-block">
                    ✅ {job.visaInfo}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-500">
                    Source: {job.source}
                  </span>
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                  >
                    Apply Now →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
