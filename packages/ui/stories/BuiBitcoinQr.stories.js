import '../bitcoin-qr.js';

export default {
  title: 'BUI/Bitcoin QR',
  component: 'bui-bitcoin-qr',
  tags: ['autodocs'],
  argTypes: {
    bitcoinAddress: { control: 'text' },
    lightningInvoice: { control: 'text' },
    parameters: { control: 'text' },
    qrMode: { control: { type: 'select' }, options: ['unified', 'lightning', 'bitcoin'] },
    width: { control: { type: 'number', min: 100, max: 500, step: 10 } },
    height: { control: { type: 'number', min: 100, max: 500, step: 10 } },
    margin: { control: { type: 'number', min: 0, max: 50, step: 5 } },
    image: { control: 'text' },
    imageSize: { control: { type: 'number', min: 10, max: 100, step: 5 } },
    imageMargin: { control: { type: 'number', min: 0, max: 20, step: 2 } },
    imageEmbedded: { control: 'boolean' },
    dotsType: { control: { type: 'select' }, options: ['square', 'dots', 'rounded', 'classy', 'classy-rounded', 'extra-rounded'] },
    dotsColor: { control: 'color' },
    backgroundColor: { control: 'color' },
    cornersSquareType: { control: { type: 'select' }, options: ['square', 'extra-rounded', 'dot'] },
    cornersSquareColor: { control: 'color' },
    cornersDotType: { control: { type: 'select' }, options: ['square', 'dot'] },
    cornersDotColor: { control: 'color' },
    qrErrorCorrectionLevel: { control: { type: 'select' }, options: ['L', 'M', 'Q', 'H'] },
  },
  args: {
    bitcoinAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    lightningInvoice: 'lnbc10u1p3pj257pp5yztkwjcz5ftl5laxkav23zmzekaw37zk6kmv80pk4xaev5qhtz7qdpdwd3xger9wd5kwm36yprx7u3qd36kucmgyp282etnv3shjcqzpgxqyz5vqsp5usyc4lk9chsfp53kvcnvq456ganh60d89reykdngsmtj6yw3nhvq9qyyssqjcewm5cjwz4a6rfjx77c490yced6pemk0upkxhy89cmm7sct66k8gneanwykzgdrwrfje69h9u5u0w57rrcsysas7gadwmzxc8c6t0spjazup6',
    width: 256,
    height: 256,
    margin: 10,
    qrMode: 'unified',
    qrErrorCorrectionLevel: 'M',
  },
};

// Basic unified QR code
export const Unified = {
  args: {
    bitcoinAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    lightningInvoice: 'lnbc10u1p3pj257pp5yztkwjcz5ftl5laxkav23zmzekaw37zk6kmv80pk4xaev5qhtz7qdpdwd3xger9wd5kwm36yprx7u3qd36kucmgyp282etnv3shjcqzpgxqyz5vqsp5usyc4lk9chsfp53kvcnvq456ganh60d89reykdngsmtj6yw3nhvq9qyyssqjcewm5cjwz4a6rfjx77c490yced6pemk0upkxhy89cmm7sct66k8gneanwykzgdrwrfje69h9u5u0w57rrcsysas7gadwmzxc8c6t0spjazup6',
    qrMode: 'unified',
  },
};

// Lightning only QR code
export const LightningOnly = {
  args: {
    lightningInvoice: 'lnbc10u1p3pj257pp5yztkwjcz5ftl5laxkav23zmzekaw37zk6kmv80pk4xaev5qhtz7qdpdwd3xger9wd5kwm36yprx7u3qd36kucmgyp282etnv3shjcqzpgxqyz5vqsp5usyc4lk9chsfp53kvcnvq456ganh60d89reykdngsmtj6yw3nhvq9qyyssqjcewm5cjwz4a6rfjx77c490yced6pemk0upkxhy89cmm7sct66k8gneanwykzgdrwrfje69h9u5u0w57rrcsysas7gadwmzxc8c6t0spjazup6',
    qrMode: 'lightning',
  },
};

// Bitcoin address only QR code
export const OnChainOnly = {
  args: {
    bitcoinAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    qrMode: 'bitcoin',
  },
};

// QR code with additional parameters
export const WithParameters = {
  args: {
    bitcoinAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    lightningInvoice: 'lnbc10u1p3pj257pp5yztkwjcz5ftl5laxkav23zmzekaw37zk6kmv80pk4xaev5qhtz7qdpdwd3xger9wd5kwm36yprx7u3qd36kucmgyp282etnv3shjcqzpgxqyz5vqsp5usyc4lk9chsfp53kvcnvq456ganh60d89reykdngsmtj6yw3nhvq9qyyssqjcewm5cjwz4a6rfjx77c490yced6pemk0upkxhy89cmm7sct66k8gneanwykzgdrwrfje69h9u5u0w57rrcsysas7gadwmzxc8c6t0spjazup6',
    parameters: '&amount=0.00001&label=Coffee&message=Payment%20for%20coffee',
    qrMode: 'unified',
  },
};

// Styled QR code with custom colors
export const CustomStyling = {
  args: {
    bitcoinAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    lightningInvoice: 'lnbc10u1p3pj257pp5yztkwjcz5ftl5laxkav23zmzekaw37zk6kmv80pk4xaev5qhtz7qdpdwd3xger9wd5kwm36yprx7u3qd36kucmgyp282etnv3shjcqzpgxqyz5vqsp5usyc4lk9chsfp53kvcnvq456ganh60d89reykdngsmtj6yw3nhvq9qyyssqjcewm5cjwz4a6rfjx77c490yced6pemk0upkxhy89cmm7sct66k8gneanwykzgdrwrfje69h9u5u0w57rrcsysas7gadwmzxc8c6t0spjazup6',
    dotsType: 'rounded',
    dotsColor: '#f7931a',
    backgroundColor: '#ffffff',
    cornersSquareType: 'extra-rounded',
    cornersSquareColor: '#000000',
    cornersDotType: 'dot',
    cornersDotColor: '#f7931a',
    qrMode: 'unified',
  },
};

// QR code with embedded logo
export const WithLogo = {
  args: {
    bitcoinAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    lightningInvoice: 'lnbc10u1p3pj257pp5yztkwjcz5ftl5laxkav23zmzekaw37zk6kmv80pk4xaev5qhtz7qdpdwd3xger9wd5kwm36yprx7u3qd36kucmgyp282etnv3shjcqzpgxqyz5vqsp5usyc4lk9chsfp53kvcnvq456ganh60d89reykdngsmtj6yw3nhvq9qyyssqjcewm5cjwz4a6rfjx77c490yced6pemk0upkxhy89cmm7sct66k8gneanwykzgdrwrfje69h9u5u0w57rrcsysas7gadwmzxc8c6t0spjazup6',
    image: 'https://bitcoin.org/img/icons/opengraph.png',
    imageSize: 40,
    imageMargin: 5,
    imageEmbedded: true,
    qrErrorCorrectionLevel: 'H',
    qrMode: 'unified',
  },
};

// Large QR code
export const Large = {
  args: {
    bitcoinAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    lightningInvoice: 'lnbc10u1p3pj257pp5yztkwjcz5ftl5laxkav23zmzekaw37zk6kmv80pk4xaev5qhtz7qdpdwd3xger9wd5kwm36yprx7u3qd36kucmgyp282etnv3shjcqzpgxqyz5vqsp5usyc4lk9chsfp53kvcnvq456ganh60d89reykdngsmtj6yw3nhvq9qyyssqjcewm5cjwz4a6rfjx77c490yced6pemk0upkxhy89cmm7sct66k8gneanwykzgdrwrfje69h9u5u0w57rrcsysas7gadwmzxc8c6t0spjazup6',
    width: 400,
    height: 400,
    margin: 20,
    qrMode: 'unified',
  },
};

// Interactive demonstration showing all modes
export const InteractiveDemo = {
  args: {
    bitcoinAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    lightningInvoice: 'lnbc10u1p3pj257pp5yztkwjcz5ftl5laxkav23zmzekaw37zk6kmv80pk4xaev5qhtz7qdpdwd3xger9wd5kwm36yprx7u3qd36kucmgyp282etnv3shjcqzpgxqyz5vqsp5usyc4lk9chsfp53kvcnvq456ganh60d89reykdngsmtj6yw3nhvq9qyyssqjcewm5cjwz4a6rfjx77c490yced6pemk0upkxhy89cmm7sct66k8gneanwykzgdrwrfje69h9u5u0w57rrcsysas7gadwmzxc8c6t0spjazup6',
    parameters: '&amount=0.00001&label=Demo%20Payment&message=Click%20the%20dots%20to%20switch%20QR%20modes',
    dotsType: 'rounded',
    dotsColor: '#f7931a',
    backgroundColor: '#ffffff',
    qrMode: 'unified',
  },
  render: (args) => {
    const container = document.createElement('div');
    container.style.padding = '2rem';
    container.style.backgroundColor = '#f8f9fa';
    container.style.borderRadius = '8px';
    container.style.textAlign = 'center';
    
    const title = document.createElement('h3');
    title.textContent = 'Interactive Bitcoin QR Code';
    title.style.marginBottom = '1rem';
    title.style.color = '#333';
    
    const description = document.createElement('p');
    description.textContent = 'This QR code supports Bitcoin on-chain, Lightning Network, and unified BIP-21 payments. Click the dots below the QR code to switch between modes.';
    description.style.marginBottom = '2rem';
    description.style.color = '#666';
    description.style.maxWidth = '400px';
    description.style.margin = '0 auto 2rem auto';
    description.style.lineHeight = '1.5';
    
    const qr = document.createElement('bui-bitcoin-qr');
    qr.setAttribute('bitcoin-address', args.bitcoinAddress);
    qr.setAttribute('lightning-invoice', args.lightningInvoice);
    qr.setAttribute('parameters', args.parameters);
    qr.setAttribute('width', args.width);
    qr.setAttribute('height', args.height);
    qr.setAttribute('margin', args.margin);
    qr.setAttribute('dots-type', args.dotsType);
    qr.setAttribute('dots-color', args.dotsColor);
    qr.setAttribute('background-color', args.backgroundColor);
    qr.setAttribute('qr-mode', args.qrMode);
    
    container.appendChild(title);
    container.appendChild(description);
    container.appendChild(qr);
    
    return container;
  },
};

// Error state - no data provided
export const NoData = {
  args: {
    // No bitcoin address or lightning invoice provided
  },
};

// Error state - only address provided
export const OnlyAddress = {
  args: {
    bitcoinAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    // No lightning invoice, so unified mode won't be available
  },
};

// Error state - only invoice provided
export const OnlyInvoice = {
  args: {
    lightningInvoice: 'lnbc10u1p3pj257pp5yztkwjcz5ftl5laxkav23zmzekaw37zk6kmv80pk4xaev5qhtz7qdpdwd3xger9wd5kwm36yprx7u3qd36kucmgyp282etnv3shjcqzpgxqyz5vqsp5usyc4lk9chsfp53kvcnvq456ganh60d89reykdngsmtj6yw3nhvq9qyyssqjcewm5cjwz4a6rfjx77c490yced6pemk0upkxhy89cmm7sct66k8gneanwykzgdrwrfje69h9u5u0w57rrcsysas7gadwmzxc8c6t0spjazup6',
    // No bitcoin address, so unified mode won't be available
  },
};