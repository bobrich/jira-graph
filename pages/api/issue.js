// pages/api/issue.js
export default async function handler(req, res) {
    const { issueKey } = req.query;
  
    try {
      const response = await fetch(`https://bobrich.net/rest/api/3/issue/${issueKey}`, { 
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + btoa(`${process.env.JIRA_EMAIL}:${process.env.JIRA_API_TOKEN}`),
          'Accept': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Issue not found');
      }
      const data = await response.json();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  