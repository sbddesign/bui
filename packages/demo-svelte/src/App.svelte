<script>
  import { onMount } from 'svelte';
  
  // Import the button component and CSS
  import '@sbddesign/bui-ui/tokens.css';
  import '@sbddesign/bui-ui/button.js';
  import '@sbddesign/bui-ui/message.js';
  
  onMount(() => {
    // Add Inter font if not already loaded
    if (!document.querySelector('link[href*="fonts.googleapis.com"]')) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = 'https://fonts.googleapis.com';
      document.head.appendChild(link);
      
      const link2 = document.createElement('link');
      link2.rel = 'preconnect';
      link2.href = 'https://fonts.gstatic.com';
      link2.crossOrigin = 'true';
      document.head.appendChild(link2);
      
      const link3 = document.createElement('link');
      link3.href = 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap';
      link3.rel = 'stylesheet';
      document.head.appendChild(link3);
    }
  });
</script>

<main>
  <div class="app" data-theme="bitcoindesign" data-mode="light">
    <div class="main">
      <h1>Bitcoin Wallet</h1>
      <p>A simple bitcoin wallet</p>
      <div>
        <bui-message text="This is a message"></bui-message>
        <bui-button
          style-type="filled" 
          size="large" 
          label="Get Started"
        ></bui-button>
      </div>
      <div>
        <bui-button
          style-type="outline" 
          size="large" 
          label="Restore Wallet"
        ></bui-button>
      </div>
    </div>
  </div>
</main>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :global(body) {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .app {
    width: 100%;
    max-width: 1200px;
    padding: 2rem;
  }

  .main {
    text-align: center;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 4rem 2rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }

  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    color: #2D2D2D;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
  }

  p {
    font-size: 1.25rem;
    color: #5C5C5C;
    margin-bottom: 3rem;
    font-weight: 400;
    line-height: 1.6;
  }

  div {
    margin: 0.5rem 0;
  }

  /* Ensure web components inherit font */
  :global(bui-button) {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
</style>
