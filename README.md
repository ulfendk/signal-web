# Signal Web Client

A Progressive Web App (PWA) implementation of the Signal Private Messenger for web browsers. This client supports QR code login for device linking, similar to Signal on iPad.

🚀 **[Live Demo](https://ulfendk.github.io/signal-web/)** - Try the app on GitHub Pages

## Features

- 🔐 **End-to-End Encryption**: All messages are encrypted using the Signal Protocol
- 📱 **QR Code Login**: Link your device by scanning a QR code with your phone
- 💾 **PWA Support**: Install as a standalone app on any device
- 🌐 **Cross-Platform**: Works on desktop and mobile browsers
- 📴 **Offline Support**: Service worker enables offline functionality
- ⚡ **Fast & Modern**: Built with Vite, React, and TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Signal account on your mobile device

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ulfendk/signal-web.git
cd signal-web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Building for Production

Build the production-ready application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

The build output will be in the `dist` directory, ready for deployment.

## Deployment

This project is configured for automatic deployment to GitHub Pages. When changes are merged to the `main` branch:

1. GitHub Actions automatically builds the project
2. The built files are deployed to GitHub Pages
3. The site becomes available at `https://ulfendk.github.io/signal-web/`

### Manual Deployment

To deploy manually to other hosting providers:

## How to Use

### Linking Your Device

1. Open the Signal Web Client in your browser
2. A QR code will be displayed on the login screen
3. On your phone:
   - Open Signal
   - Go to Settings → Linked Devices
   - Tap the + button (iPhone) or "Link New Device" (Android)
   - Scan the QR code displayed on your browser
4. Once scanned, your device will be linked and you can start messaging

### Installing as PWA

#### Desktop (Chrome, Edge, Brave)
1. Click the install icon (⊕) in the address bar
2. Click "Install" in the popup dialog

#### Mobile (Chrome, Safari)
1. Open the browser menu (⋮ or ⋯)
2. Tap "Add to Home Screen"
3. Tap "Add" to confirm

## Technology Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **PWA**: vite-plugin-pwa with Workbox
- **QR Code**: qrcode.react
- **Cryptography**: Web Crypto API (browser-native)
- **Styling**: CSS3 with responsive design
- **Connections**: Direct WebSocket to Signal servers (no relay)

## Project Structure

```
signal-web/
├── public/              # Static assets
│   ├── icon-192.svg    # PWA icon 192x192
│   └── icon-512.svg    # PWA icon 512x512
├── src/
│   ├── components/     # React components
│   │   ├── LoginScreen.tsx      # QR code login interface
│   │   └── ChatInterface.tsx    # Main chat UI
│   ├── services/       # Business logic
│   │   └── signalService.ts     # Signal Protocol integration
│   ├── App.tsx         # Main application component
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global styles
├── index.html          # HTML entry point
├── vite.config.ts      # Vite configuration
└── package.json        # Project dependencies
```

## Signal Protocol Integration

This implementation uses the **Web Crypto API** for cryptographic operations in a browser-compatible way. The architecture uses **direct WebSocket connections to Signal servers without any relay**.

### Current Implementation

1. **Browser-Native Cryptography**: Uses the Web Crypto API for all cryptographic operations
2. **Direct Server Connection**: WebSocket connections directly to Signal's servers (no relay)
3. **Key Generation**: Uses Web Crypto API's ECDH with P-256 curve
4. **HKDF**: Uses Web Crypto API's HKDF implementation for key derivation

### Production Requirements

For a full production deployment, you would need to implement:

1. **Complete Session Management**
   - Session state storage in IndexedDB
   - PreKey bundle generation and management
   - Signed PreKey rotation

2. **Backend Integration**
   - REST API for contact management
   - Push notification service
   - Media upload/download endpoints

3. **Storage**
   - IndexedDB for messages and metadata
   - Secure key storage with encryption at rest
   - Contact synchronization

4. **Message Protocol**
   - Full Double Ratchet implementation (consider using Web Crypto API or waiting for browser-compatible Signal libraries)
   - Message authentication and verification
   - Perfect forward secrecy

## Security Considerations

⚠️ **Important**: This is a demonstration/prototype implementation. For production use:

- Implement proper Signal Protocol encryption using libsignal
- Use HTTPS/WSS for all connections
- Implement proper key management and storage
- Add message authentication and verification
- Implement perfect forward secrecy
- Add security headers and CSP policies
- Conduct security audits

## Development Notes

### WebAssembly (WASM) Implementation

This implementation uses the **Web Crypto API** which is natively supported in all modern browsers. This provides:

1. **Browser Compatibility**: Works out-of-the-box in all modern browsers
2. **No External Dependencies**: Uses browser-native cryptographic functions
3. **Smaller Bundle Size**: No need to include large WASM modules
4. **Direct WebSocket Connections**: No relay infrastructure needed

The Web Crypto API is used for:
- Elliptic Curve key generation and agreement (ECDH with P-256)
- HKDF key derivation
- AES encryption/decryption

**Note**: `@signalapp/libsignal-client` is a Node.js-only library that cannot run in browsers. For a production implementation of the full Signal Protocol in browsers, you would need to either:
1. Wait for an official browser-compatible Signal Protocol library
2. Use unofficial WASM builds (not recommended for production)
3. Implement the Signal Protocol using Web Crypto API primitives

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the GPL-3.0 License - see the LICENSE file for details.

## Disclaimer

This is an unofficial Signal client implementation for educational and development purposes. It is not affiliated with or endorsed by Signal Messenger LLC. For production use, please refer to the official Signal applications.

## Resources

- [Signal Protocol Documentation](https://signal.org/docs/)
- [Signal Desktop Source Code](https://github.com/signalapp/Signal-Desktop)
- [libsignal-protocol-javascript](https://github.com/signalapp/libsignal-protocol-javascript)
- [Progressive Web Apps](https://web.dev/progressive-web-apps/)
