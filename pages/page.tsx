// pages/page.tsx
'use client';
import { useState } from 'react';

export default function Page() {
    const [issueKey, setIssueKey] = useState('');
    const [issueData, setIssueData] = useState<any>(null); // Set the type of issueData to 'any'
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchIssueData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/issue?issueKey=${issueKey}`);
            if (!response.ok) {
                throw new Error('Issue fetching failed');
            }
            const data = await response.json();
            setIssueData(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchIssueData();
    };

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={issueKey}
                    onChange={(e) => setIssueKey(e.target.value)}
                    placeholder="Enter Jira Issue Key"
                />
                <button type="submit">Lookup Issue</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {issueData && (
                <div>
                    <h3>Issue Details:</h3>
                    <p>Title: {issueData?.fields?.summary}</p> {/* Add optional chaining to handle null values */}
                    <p>Status: {issueData?.fields?.status?.name}</p> {/* Add optional chaining to handle null values */}
                    {/* Add more fields as needed */}
                </div>
            )}
        </main>
    );
}