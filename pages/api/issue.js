// pages/api/issue.js
export default async function handler(req, res) {
  const { issueKey } = req.query;

  try {
    console.error(`https://bobrich.atlassian.net/rest/api/3/issue/${issueKey}`);
    
    const response = await fetch(`https://bobrich.atlassian.net/rest/api/3/issue/${issueKey}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa(`${process.env.JIRA_EMAIL}:${process.env.JIRA_API_TOKEN}`),
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.error('Jira API response not OK:', response.status, response.statusText);
      throw new Error(`Jira API error: Status ${response.status}, Status Text: ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Error occurred in /api/issue:', err.message, 'Error type:', err.constructor.name);
    res.status(500).json({ 
      error: `An error occurred: ${err.message}`, 
      type: err.constructor.name 
    });
  }
}
