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
      setIsFlipped(false); // Reset flip state when re-issuing
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
          style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} 
        />
      );
    }
    if (!fullName) return '';
    return fullName.substring(0, 2);
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
            <div className="glass-panel card-face card-front">
              <div className="card-header">
                <span className="tag">● VELTO MEMBER</span>
                <span className="id-text">{userId}</span>
              </div>
              
              <div className="profile-section">
                <div className="profile-placeholder">
                  {renderProfileContent(name)}
                </div>
                
                <div className="info-section">
                  <div className="name">{name}</div>
                  <div className="eng-name">VELTO STAFF</div>
                  <div className="role">Product Team</div>
                </div>
              </div>
            </div>

            {/* Back of Card */}
            <div className="glass-panel card-face card-back">
              <div className="qr-placeholder">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H10V10H4V4Z" fill="#000000"/>
                  <path d="M14 4H20V10H14V4Z" fill="#000000"/>
                  <path d="M4 14H10V20H4V14Z" fill="#000000"/>
                  <path d="M14 14H16V16H14V14Z" fill="#000000"/>
                  <path d="M18 14H20V16H18V14Z" fill="#000000"/>
                  <path d="M14 18H16V20H14V18Z" fill="#000000"/>
                  <path d="M18 18H20V20H18V18Z" fill="#000000"/>
                  <path d="M16 16H18V18H16V16Z" fill="#000000"/>
                </svg>
              </div>
              <div className="auth-data">
                AUTH_DATA: {userId}_{name}
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
