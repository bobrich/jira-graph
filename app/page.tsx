import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [issueKey, setIssueKey] = useState('');
  const [issueData, setIssueData] = useState<{ fields: { summary: string, status: { name: string } } } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleIssueLookup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://bobrich.atlassian.net/rest/api/3/issue/${issueKey}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + btoa('bobrich@gmail.com:ATATT3xFfGF0mk7Mkb0uJItDwlaDFPthF0xNsrnyDDtFGXq7w40HOn4qup5LHli_pW3yN8cD9Hi9YwsPez9DteS1qNVRHwpLa5nSh-FOXam9rA8l9ZDXhndmmwIW5Y7vwZyo3viE0Ne_sKjWCyi9i82aMBD0oqjXHbOptNXBCIvy88I_JmAYcVo=A99C0989'),
          'Accept': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Issue not found');
      }
      const data = await response.json();
      setIssueData(data as { fields: { summary: string, status: { name: string } } });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Issue Lookup Form */}
      <form onSubmit={handleIssueLookup} className="mb-4">
        <input
          type="text"
          value={issueKey}
          onChange={(e) => setIssueKey(e.target.value)}
          placeholder="Enter Jira Issue Key"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Lookup Issue
        </button>
      </form>

      {/* Displaying Issue Data */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {issueData && (
        <div className="issue-data">
          <h3>Issue Details:</h3>
          <p>Title: {issueData.fields.summary}</p>
          <p>Status: {issueData.fields.status.name}</p>
          {/* Add more fields as needed */}
        </div>
      )}
    </main>
  );
}