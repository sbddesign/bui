import { useEffect, useState } from 'react'
import './App.css'
import '@bui/ui/tokens.css'
import '@bui/ui/button.js'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Add Inter font if not already loaded
    if (!document.querySelector('link[href*="fonts.googleapis.com"]')) {
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = 'https://fonts.googleapis.com'
      document.head.appendChild(link)
      
      const link2 = document.createElement('link')
      link2.rel = 'preconnect'
      link2.href = 'https://fonts.gstatic.com'
      link2.crossOrigin = 'true'
      document.head.appendChild(link2)
      
      const link3 = document.createElement('link')
      link3.href = 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'
      link3.rel = 'stylesheet'
      document.head.appendChild(link3)
    }
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="app" data-theme="bitcoindesign" data-mode={isDarkMode ? "dark" : "light"}>
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        {isDarkMode ? '☀️' : '🌙'}
      </button>
      <main className="main">
        <h1>Bitcoin Wallet</h1>
        <p>A simple bitcoin wallet</p>
        <div>
          <bui-button
            style-type="filled" 
            size="large" 
            label="Get Started"
            wide
          ></bui-button>
          </div>
          <div>
          <bui-button
            style-type="outline" 
            size="large" 
            label="Restore Wallet"
            wide
          ></bui-button>
        </div>
      </main>
    </div>
  )
}

export default App
