import { useState } from 'react';
import './index.css';

function App() {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [isIssued, setIsIssued] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

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

  // Generate some dummy barcode stripes for visual
  const generateBarcode = () => {
    const stripes = [];
    for (let i = 0; i < 40; i++) {
      const width = Math.random() > 0.5 ? '2px' : '4px';
      const opacity = Math.random() > 0.3 ? 1 : 0.4;
      stripes.push(<div key={i} style={{ width, opacity, height: '100%', backgroundColor: 'var(--color-text)', marginRight: '2px' }} />);
    }
    return stripes;
  };

  return (
    <>
      <header>
        <h1>
          VELTO<span className="dot">●</span>
        </h1>
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
            <div className="glass-panel card-face card-front tech-bg">
              {/* Corner Crosshairs */}
              <div className="crosshair top-left"></div>
              <div className="crosshair top-right"></div>
              <div className="crosshair bottom-left"></div>
              <div className="crosshair bottom-right"></div>

              {/* Edge Scales */}
              <div className="scale-rule scale-left"></div>
              <div className="scale-rule scale-right"></div>

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
                    <circle cx="80" cy="80" r="78" fill="none" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="4 4" opacity="0.8"/>
                    {/* Angle ticks */}
                    <line x1="80" y1="0" x2="80" y2="6" stroke="var(--color-accent)" strokeWidth="2" />
                    <line x1="80" y1="154" x2="80" y2="160" stroke="var(--color-accent)" strokeWidth="2" />
                    <line x1="0" y1="80" x2="6" y2="80" stroke="var(--color-accent)" strokeWidth="2" />
                    <line x1="154" y1="80" x2="160" y2="80" stroke="var(--color-accent)" strokeWidth="2" />
                    <text x="80" y="15" fill="var(--color-accent)" fontSize="8" textAnchor="middle" opacity="0.6">0°</text>
                    <text x="145" y="83" fill="var(--color-accent)" fontSize="8" textAnchor="middle" opacity="0.6">90°</text>
                    <text x="80" y="150" fill="var(--color-accent)" fontSize="8" textAnchor="middle" opacity="0.6">180°</text>
                    <text x="15" y="83" fill="var(--color-accent)" fontSize="8" textAnchor="middle" opacity="0.6">270°</text>
                  </svg>
                  <div className="profile-placeholder">
                    {renderProfileContent(name)}
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
                    JOINED: 2026.01
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <div className="barcode-container">
                  {generateBarcode()}
                </div>
                <div className="slogan">
                  "We turn creative feelings into smart logic."
                </div>
              </div>
            </div>

            {/* Back of Card */}
            <div className="glass-panel card-face card-back tech-bg">
              {/* Corner Crosshairs */}
              <div className="crosshair top-left"></div>
              <div className="crosshair top-right"></div>
              <div className="crosshair bottom-left"></div>
              <div className="crosshair bottom-right"></div>

              <div className="sys-ver back-ver">VELTO SECURE NETWORK</div>
              
              <div className="qr-container">
                <div className="qr-brackets top-left"></div>
                <div className="qr-brackets top-right"></div>
                <div className="qr-brackets bottom-left"></div>
                <div className="qr-brackets bottom-right"></div>
                
                <div className="qr-placeholder">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H10V10H4V4Z" fill="#ffffff"/>
                    <path d="M14 4H20V10H14V4Z" fill="#ffffff"/>
                    <path d="M4 14H10V20H4V14Z" fill="#ffffff"/>
                    <path d="M14 14H16V16H14V14Z" fill="#ffffff"/>
                    <path d="M18 14H20V16H18V14Z" fill="#ffffff"/>
                    <path d="M14 18H16V20H14V18Z" fill="#ffffff"/>
                    <path d="M18 18H20V20H18V18Z" fill="#ffffff"/>
                    <path d="M16 16H18V18H16V16Z" fill="#ffffff"/>
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
