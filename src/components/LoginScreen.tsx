import { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import './LoginScreen.css'
import { generateLinkingURI } from '../services/signalService'

interface LoginScreenProps {
  onLogin: () => void
}

function LoginScreen({ onLogin }: LoginScreenProps) {
  const [linkingURI, setLinkingURI] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Generate a unique linking URI for QR code
    const generateQRCode = async () => {
      try {
        const uri = await generateLinkingURI()
        setLinkingURI(uri)
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to generate linking URI:', error)
        setIsLoading(false)
      }
    }

    generateQRCode()
  }, [])

  // Simulate QR code scan authentication
  const handleDemoLogin = () => {
    onLogin()
  }

  return (
    <div className="login-screen">
      <div className="login-container">
        <div className="logo">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="40" fill="#2090EA"/>
            <path d="M40 15C26.2 15 15 26.2 15 40C15 42.8 15.6 45.4 16.6 47.8L15.2 54.8L22.4 53.4C24.7 54.3 27.2 54.8 29.9 54.9C31.8 60.7 37.4 65 44 65C52.8 65 60 57.8 60 49C60 40.2 52.8 33 44 33C43.3 33 42.6 33.1 41.9 33.2C41.3 23.6 33.2 16 23 16C22.3 16 21.7 16.1 21 16.1C21 15.7 21 15.4 21 15C28.7 15 35 21.3 35 29C35 29.7 34.9 30.3 34.8 31C36.1 30.4 37.5 30 39 30C46.7 30 53 36.3 53 44C53 51.7 46.7 58 39 58C33.5 58 28.8 54.5 27 49.6C26.4 49.7 25.7 49.8 25 49.8C23.9 49.8 22.8 49.7 21.8 49.4L20 50L20.6 47.2C19.6 45.3 19 43.2 19 41C19 32.7 25.7 26 34 26C34.7 26 35.3 26.1 36 26.2C36 26.1 36 26.1 36 26C36 19.9 40.9 15 47 15C47.7 15 48.3 15.1 49 15.2C48.1 17.3 47.5 19.6 47.2 22C46.4 22 45.7 22 45 22C41.1 22 38 25.1 38 29C38 32.9 41.1 36 45 36C48.9 36 52 32.9 52 29C52 27.3 51.4 25.7 50.4 24.4C52.6 23.5 55 23 57.5 23C64.4 23 70 28.6 70 35.5C70 42.4 64.4 48 57.5 48C56.3 48 55.2 47.8 54.1 47.5C53.4 51.8 49.1 55 44 55C38.5 55 34 50.5 34 45C34 39.5 38.5 35 44 35C49.5 35 54 39.5 54 45C54 45.3 54 45.7 53.9 46C55.3 46.4 56.9 46.6 58.5 46.6C66.2 46.6 72.4 40.4 72.4 32.7C72.4 25 66.2 18.8 58.5 18.8C55.8 18.8 53.3 19.6 51.2 21C50.3 18.5 48.7 16.3 46.7 14.5C50.9 12.9 55.5 12 60.4 12C68.9 12 75.8 18.9 75.8 27.4C75.8 35.9 68.9 42.8 60.4 42.8C59.3 42.8 58.3 42.7 57.3 42.5C56.3 47.3 51.8 51 46.4 51C40.4 51 35.5 46.1 35.5 40.1C35.5 34.1 40.4 29.2 46.4 29.2C52.4 29.2 57.3 34.1 57.3 40.1C57.3 40.7 57.2 41.3 57.1 41.9C58.4 42.2 59.8 42.3 61.3 42.3C70.5 42.3 78 34.8 78 25.6C78 16.4 70.5 8.9 61.3 8.9C57.8 8.9 54.6 10 51.9 11.8C49.9 9.3 47.1 7.4 43.9 6.4C48.6 4.4 53.8 3.3 59.3 3.3C69.8 3.3 78.3 11.8 78.3 22.3C78.3 32.8 69.8 41.3 59.3 41.3C57.9 41.3 56.6 41.2 55.3 40.9C53.8 46.4 48.7 50.5 42.6 50.5C35.8 50.5 30.3 45 30.3 38.2C30.3 31.4 35.8 25.9 42.6 25.9C49.4 25.9 54.9 31.4 54.9 38.2C54.9 39 54.8 39.8 54.7 40.5C56.2 40.9 57.9 41.1 59.6 41.1C70.2 41.1 78.8 32.5 78.8 21.9C78.8 11.3 70.2 2.7 59.6 2.7C55.5 2.7 51.8 4 48.7 6.1C46.3 3.2 42.9 1.2 39 0.4C44.6 0.1 50 1.4 54.8 3.7C59.1 1.4 64 0.1 69.2 0.1C81.1 0.1 90.7 9.7 90.7 21.6C90.7 33.5 81.1 43.1 69.2 43.1C67.5 43.1 65.9 42.9 64.3 42.6C62.3 48.8 56.3 53.3 49.3 53.3C41.5 53.3 35.1 46.9 35.1 39.1C35.1 31.3 41.5 24.9 49.3 24.9C57.1 24.9 63.5 31.3 63.5 39.1C63.5 40.1 63.4 41 63.2 41.9C65.1 42.4 67.1 42.7 69.2 42.7C81.9 42.7 92.2 32.4 92.2 19.7C92.2 7 81.9 -3.3 69.2 -3.3" fill="white"/>
          </svg>
        </div>
        
        <h1>Signal Web Client</h1>
        <p className="subtitle">Link this device to your Signal account</p>
        
        <div className="qr-section">
          {isLoading ? (
            <div className="qr-placeholder">
              <div className="spinner"></div>
              <p>Generating QR code...</p>
            </div>
          ) : linkingURI ? (
            <div className="qr-container">
              <QRCodeSVG value={linkingURI} size={256} level="H" />
            </div>
          ) : (
            <div className="qr-placeholder">
              <p>Failed to generate QR code</p>
            </div>
          )}
        </div>
        
        <div className="instructions">
          <h3>How to link your device:</h3>
          <ol>
            <li>Open Signal on your phone</li>
            <li>Tap Settings → Linked Devices</li>
            <li>Tap the + button (iPhone) or Link New Device (Android)</li>
            <li>Scan this QR code with your phone</li>
          </ol>
        </div>

        <button className="demo-login-btn" onClick={handleDemoLogin}>
          Demo Login (Development)
        </button>
        
        <div className="footer">
          <p>This is a web implementation of Signal. Messages are end-to-end encrypted.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
