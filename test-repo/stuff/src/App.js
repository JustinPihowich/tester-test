import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';

function App() {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    async function fetchFolders() {
      try {
        const response = await fetch('https://api.github.com/repos/JustinPihowich/tester-test/git/trees/main?recursive=1');
        const data = await response.json();
    
        console.log("API Response:", data); // Log the entire response
        console.log("First few items of tree:", data.tree.slice(0, 5));
    
        if (data.message) {
          console.error("Error from GitHub API:", data.message);
          return;
        }
    
        const folderPaths = data.tree
        .filter(item => item.type === 'tree' && item.path.startsWith('test-repo/apps/'))
        .map(item => item.path.replace('test-repo/apps/', ''))
        .filter(folderName => !folderName.includes('/') && !/e2e/.test(folderName));



    
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
      <SearchBar data={folders} />
    </div>
  );
}

export default App;

