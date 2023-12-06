import Image from 'next/image'

export default function Home({ issueData, error }: { issueData: any, error: string | null }) {
  // Render your page with the issueData and error props
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Displaying Issue Data */}
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
  )
}

export async function getServerSideProps(context: any) {
  // Extract issue key from query parameters or context
  let issueKey = context.query.issueKey; // Adjust based on your URL structure

  let issueData = null;
  let error = null;

  try {
    // Perform your API call here
    const response = await fetch(`https://bobrich.atlassian.net/rest/api/3/issue/${issueKey}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa(`${process.env.JIRA_EMAIL}:${process.env.JIRA_API_TOKEN}`),
        'Accept': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Issue not found');
    }
    issueData = await response.json();
  } catch (err: any) {
    error = err.message;
  }

  // Pass data to the page via props
  return { props: { issueData, error } };
}
