import { useEffect, useState } from 'react';

function App2() {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    async function fetchFolders() {
      try {
        // Fetch the contents of the 'apps' directory
        const response = await fetch('https://api.github.com/repos/JustinPihowich/tester-test/contents/test-repo/apps');
        const data = await response.json();
    
        console.log("API Response:", data); // Log the entire response

        if (data.message) {
          console.error("Error from GitHub API:", data.message);
          return;
        }

        // Filter out any items that are not directories or have 'e2e' in their name
        const folderPaths = data
          .filter(item => item.type === 'dir' && !/e2e/.test(item.name))
          .map(item => item.name);

        console.log("Extracted Folders:", folderPaths); // Log the extracted folders
    
        setFolders(folderPaths);
      } catch (error) {
        console.error("Error fetching folders:", error);
      }
    }
    
    fetchFolders();
  }, []);

  return (
    <div>
      <h1>Folders under 'apps'</h1>
      <ul>
        {folders.map(folder => (
          <li key={folder}>{folder}</li>
        ))}
      </ul>
    </div>
  );
}

export default App2;
