import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [isIssued, setIsIssued] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [validUntil, setValidUntil] = useState('');

  useEffect(() => {
    if (!isIssued) return;

    const updateValidTime = () => {
      const now = new Date();
      now.setSeconds(now.getSeconds() + 30);
      const dateStr = now.toLocaleDateString('en-CA').replace(/-/g, '.'); // YYYY.MM.DD
      const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
      setValidUntil(`${dateStr} ${timeStr}`);
    };

    updateValidTime();
    setTimeLeft(30);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          updateValidTime();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isIssued]);

  const handleIssue = (e) => {
    e.preventDefault();
    if (userId.trim() && name.trim()) {
      setIsIssued(true);
      setIsFlipped(false);
    }
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const renderProfileContent = (fullName) => {
    if (fullName === '임소정') {
      return (
        <img 
          src="/sojeong.jpg" 
          alt="Profile" 
          className="profile-img"
        />
      );
    }
    if (!fullName) return '';
    return <span className="profile-initials">{fullName.substring(0, 2)}</span>;
  };

  const generateBarcode = () => {
    const stripes = [];
    // Generate deterministic barcode based on timeLeft so it "changes" slightly
    for (let i = 0; i < 30; i++) {
      const isThick = (i * timeLeft) % 3 === 0;
      const width = isThick ? '3px' : '1px';
      const opacity = (i + timeLeft) % 2 === 0 ? 1 : 0.5;
      stripes.push(<div key={i} style={{ width, opacity, height: '100%', backgroundColor: 'currentColor', marginRight: '2px' }} />);
    }
    return stripes;
  };

  const getJoinedDate = () => {
    // Return a dummy joined date based on current year
    return "2026.01.15";
  };

  return (
    <>
      <header>
        <div className="logo-area">
          <h1>
            VELTO<span className="dot">●</span>
          </h1>
          <div className="live-status">
            <span className="live-dot"></span>
            <span className="live-text">[ LIVE / SECURE CONNECTION ]</span>
          </div>
        </div>
        <div className="subtitle">DIGITAL ID CARD SYSTEM</div>
      </header>

      <form className="glass-panel form-card" onSubmit={handleIssue}>
        <div className="input-group">
          <label htmlFor="userId">User ID</label>
          <input
            id="userId"
            className="input-field"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            className="input-field"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-primary">
          사원증 발급 / 조회
        </button>
      </form>

      {isIssued && (
        <div 
          className={`id-card-wrapper ${isFlipped ? 'flipped' : ''}`}
          onClick={toggleFlip}
        >
          <div className="id-card-inner">
            {/* Front of Card */}
            <div className="glass-panel card-face card-front white-card">
              <div className="card-orb"></div>
              <div className="card-wave-1"></div>
              <div className="card-wave-2"></div>

              <div className="card-header">
                <div className="header-left">
                  <span className="tag">● VELTO MEMBER</span>
                  <span className="sys-ver">SYS_VER: 2026.06</span>
                </div>
                <div className="header-right">
                  <span className="id-text">{userId}</span>
                  <span className="auth-level">AUTH-LEVEL: 01</span>
                </div>
              </div>
              
              <div className="profile-section">
                <div className="profile-container">
                  <svg className="profile-metrics" viewBox="0 0 160 160">
                    <circle cx="80" cy="80" r="78" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.8"/>
                    <line x1="80" y1="0" x2="80" y2="6" stroke="currentColor" strokeWidth="2" />
                    <line x1="80" y1="154" x2="80" y2="160" stroke="currentColor" strokeWidth="2" />
                    <line x1="0" y1="80" x2="6" y2="80" stroke="currentColor" strokeWidth="2" />
                    <line x1="154" y1="80" x2="160" y2="80" stroke="currentColor" strokeWidth="2" />
                    <text x="80" y="15" fill="currentColor" fontSize="8" textAnchor="middle" opacity="0.6">0°</text>
                    <text x="145" y="83" fill="currentColor" fontSize="8" textAnchor="middle" opacity="0.6">90°</text>
                    <text x="80" y="150" fill="currentColor" fontSize="8" textAnchor="middle" opacity="0.6">180°</text>
                    <text x="15" y="83" fill="currentColor" fontSize="8" textAnchor="middle" opacity="0.6">270°</text>
                  </svg>
                  <div className="profile-placeholder">
                    {renderProfileContent(name)}
                  </div>
                </div>

                <div className="timer-container">
                  <div className="timer-text">
                    VALID UNTIL: {validUntil} <span className="time-left">[ {timeLeft}s ◷ ]</span>
                  </div>
                  <div className="timer-bar-bg">
                    <div className="timer-bar-fill" style={{ width: `${(timeLeft / 30) * 100}%` }}></div>
                  </div>
                </div>
                
                <div className="info-section">
                  <div className="name-wrapper">
                    <div className="name">{name}</div>
                    <div className="signature">{name}</div>
                  </div>
                  <div className="dept-badge">
                    <span className="dept-label">DEPT:</span> PD-01 (Product Team)
                  </div>
                  <div className="joined-date">
                    JOINED: {getJoinedDate()}
                  </div>
                </div>
              </div>

              <div className="card-footer-front">
                <div className="dynamic-qr-front">
                  <div className="qr-scan-line"></div>
                  {/* Small QR placeholder */}
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 3H10V10H3V3Z" fill="currentColor"/>
                    <path d="M14 3H21V10H14V3Z" fill="currentColor"/>
                    <path d="M3 14H10V21H3V14Z" fill="currentColor"/>
                    <rect x="14" y="14" width="3" height="3" fill="currentColor"/>
                    <rect x="18" y="18" width="3" height="3" fill="currentColor"/>
                    <rect x="14" y="18" width="3" height="3" fill="currentColor"/>
                    <rect x="18" y="14" width="3" height="3" fill="currentColor"/>
                  </svg>
                </div>
                <div className="barcode-slogan-wrapper">
                  <div className="barcode-container">
                    {generateBarcode()}
                  </div>
                  <div className="slogan">
                    "We turn creative feelings into smart logic."
                  </div>
                </div>
              </div>
            </div>

            {/* Back of Card */}
            <div className="glass-panel card-face card-back white-card">
              <div className="card-top-status" style={{ left: '50%', transform: 'translateX(-50%)', top: '24px' }}>
                VELTO SECURE NETWORK
              </div>
              
              <div className="qr-container-back">
                <div className="qr-brackets top-left"></div>
                <div className="qr-brackets top-right"></div>
                <div className="qr-brackets bottom-left"></div>
                <div className="qr-brackets bottom-right"></div>
                <div className="qr-scan-line"></div>
                
                <div className="qr-placeholder-large">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H10V10H4V4Z" fill="currentColor"/>
                    <path d="M14 4H20V10H14V4Z" fill="currentColor"/>
                    <path d="M4 14H10V20H4V14Z" fill="currentColor"/>
                    <rect x="14" y="14" width="2" height="2" fill="currentColor"/>
                    <rect x="18" y="18" width="2" height="2" fill="currentColor"/>
                    <rect x="14" y="18" width="2" height="2" fill="currentColor"/>
                    <rect x="18" y="14" width="2" height="2" fill="currentColor"/>
                    <rect x="16" y="16" width="2" height="2" fill="currentColor"/>
                  </svg>
                </div>
              </div>
              
              <div className="auth-data-container">
                <div className="auth-label">ENCRYPTED ID DATA</div>
                <div className="auth-data">
                  [AUTH_DATA]: {userId}_{name}
                </div>
              </div>
              
              <div className="slogan">
                "We turn creative feelings into smart logic."
              </div>

              <div className="wallet-buttons">
                <button className="wallet-btn" onClick={(e) => e.stopPropagation()}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="#fff"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.3 14.8c-.8.4-1.8.8-3 .8-2.6 0-4.7-2.1-4.7-4.7s2.1-4.7 4.7-4.7c1 0 1.9.3 2.6.8l-1.3 1.8c-.4-.3-.8-.5-1.3-.5-1.1 0-2 .9-2 2s.9 2 2 2c.6 0 1.2-.2 1.6-.6l1.1 2.1z"/></svg>
                  Add to Apple Wallet
                </button>
                <button className="wallet-btn" onClick={(e) => e.stopPropagation()}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="#fff"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Google Wallet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
