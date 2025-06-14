
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create a root container
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
} else {
  console.error("Failed to find the root element");
}
