"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import { FiEdit, FiTrash2 } from 'react-icons/fi'

type Issue = {
  id: string;
  title: string;
  description?: string | null;
  createdAt: string;
}

const IssuesPage = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch('/api/issues')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch issues');
        return res.json();
      })
      .then((data: Issue[]) => {
        if (mounted) setIssues(data);
      })
      .catch((err) => {
        if (mounted) setError(err.message ?? 'Unknown error');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  return (
    <div className="space-y-4">
      <nav className="flex items-center gap-2 text-sm">
        <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
          Home
        </Link>
        <span className="text-gray-500 dark:text-gray-400">/</span>
        <span className="text-gray-700 dark:text-gray-300">My Issues</span>
      </nav>

      <p className="text-base text-muted-foreground">
        Welcome to the Issues page. Here you can see all reported issues stored in the database. Use the <b>"New Issue"</b> button to create a new entry.
      </p>

      {loading ? (
        <p>Loading issues...</p>
      ) : error ? (
        <p className="text-destructive">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          {issues.length === 0 ? (
            <p>No issues yet.</p>
          ) : (
            <div className="w-1/2 float-left rounded-2xl bg-gray-100 dark:bg-gray-800 p-3 overflow-hidden border border-gray-400 dark:border-gray-600">
              <table className="w-full table-fixed border-collapse">
                <thead>
                  <tr>
                    <th className="text-left px-3 py-2 text-gray-900 dark:text-gray-100">Title</th>
                    <th className="text-left px-3 py-2 text-gray-900 dark:text-gray-100">Description</th>
                    <th className="text-left px-3 py-2 text-gray-900 dark:text-gray-100">Date</th>
                    <th className="text-left px-3 py-2 text-gray-900 dark:text-gray-100">Time</th>
                    <th className="text-left px-3 py-2 text-gray-900 dark:text-gray-100">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {issues.map((issue) => {
                    const d = new Date(issue.createdAt);
                    const date = d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
                    const time = d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit', hour12: true });
                    return (
                      <tr key={issue.id} className="border-t border-gray-300 dark:border-gray-600">
                        <td className="px-3 py-2 align-top text-gray-900 dark:text-gray-100">{issue.title}</td>
                        <td className="px-3 py-2 align-top text-gray-900 dark:text-gray-100">{issue.description ?? '-'}</td>
                        <td className="px-3 py-2 align-top text-gray-900 dark:text-gray-100">{date}</td>
                        <td className="px-3 py-2 align-top text-gray-900 dark:text-gray-100">{time}</td>
                        <td className="px-3 py-2 align-top">
                          <div className="flex items-center gap-2 justify-start">
                            <Button aria-label="Edit issue" size="3">
                              <FiEdit />
                            </Button>
                            <Button aria-label="Delete issue" variant="ghost" size="3">
                              <FiTrash2 className="text-red-600 dark:text-red-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <div className="clear-left">
        <Button>
          <Link href='/issues/new'>New Issue</Link>
        </Button>
      </div>
    </div>
  )
}

export default IssuesPage
