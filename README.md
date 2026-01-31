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
- **Signal Protocol**: @signalapp/libsignal-client (with signal-wasm backend)
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

This implementation uses `@signalapp/libsignal-client` which provides the Signal Protocol with a signal-wasm backend for cryptographic operations. The architecture uses **direct WebSocket connections to Signal servers without any relay**.

### Current Implementation

1. **libsignal-client Integration**: Uses the official Signal Protocol library with signal-wasm backend
2. **Direct Server Connection**: WebSocket connections directly to Signal's servers (no relay)
3. **Key Generation**: Uses libsignal's Curve25519 key generation (via signal-wasm)
4. **HKDF**: Uses libsignal's HKDF implementation for key derivation

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
   - Full Double Ratchet implementation using libsignal-client
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

This implementation now uses `@signalapp/libsignal-client` which includes a **signal-wasm backend** for cryptographic operations. This provides the best of both worlds:

1. **Official Signal Protocol**: Uses the official Signal Protocol implementation
2. **Performance**: WASM-accelerated crypto operations where beneficial
3. **Browser Integration**: Still integrates well with web-specific features
4. **No Relay**: Direct WebSocket connections to Signal servers (no relay infrastructure needed)
5. **Maintained**: Officially maintained by Signal Foundation

The signal-wasm backend is automatically used by libsignal-client for performance-critical cryptographic operations like:
- Curve25519 key generation and agreement
- Ed25519 signatures
- AES-GCM-SIV encryption
- HKDF key derivation

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
