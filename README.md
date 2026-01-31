# Signal Web Client

A Progressive Web App (PWA) implementation of the Signal Private Messenger for web browsers. This client supports QR code login for device linking, similar to Signal on iPad.

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
- **Styling**: CSS3 with responsive design

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

This implementation provides a foundation for integrating the Signal Protocol. In a production environment, you would need to:

1. **Integrate libsignal**: Use the official Signal Protocol library for encryption
2. **Backend Services**: Connect to Signal's servers or implement your own backend
3. **WebSocket Support**: Implement real-time message delivery
4. **Storage**: Use IndexedDB for persistent message and contact storage
5. **Media Support**: Handle images, videos, and file attachments
6. **Notifications**: Implement web push notifications

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

### WebAssembly (WASM) Consideration

The problem statement mentions considering transpiling the official Signal app to WASM. While this is technically possible, the current implementation uses a web-native approach because:

1. The official Signal Desktop app is built with Electron, which is already web-based
2. Signal Protocol libraries have JavaScript implementations (libsignal-protocol-javascript)
3. A native web approach provides better browser integration and smaller bundle size
4. WASM compilation from Signal-Android/iOS would require extensive modifications

For a production implementation, using the JavaScript Signal Protocol libraries is recommended over WASM compilation.

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
