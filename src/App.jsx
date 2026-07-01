import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [dept, setDept] = useState('프로덕트팀');
  const [role, setRole] = useState('팀원');
  const [isIssued, setIsIssued] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [validUntil, setValidUntil] = useState('');

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isAuthenticated) return;

    const handleKeyDown = (e) => {
      if (hasError) return;

      if (e.key >= '0' && e.key <= '9') {
        setPasscode((prev) => {
          if (prev.length < 5) {
            return prev + e.key;
          }
          return prev;
        });
      } else if (e.key === 'Backspace') {
        setPasscode((prev) => prev.slice(0, -1));
      } else if (e.key === 'Escape') {
        setPasscode('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthenticated, hasError]);

  useEffect(() => {
    if (passcode.length === 5) {
      if (passcode === '00347') {
        setIsAuthenticated(true);
      } else {
        setHasError(true);
        const timer = setTimeout(() => {
          setPasscode('');
          setHasError(false);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [passcode]);

  const handleKeypadPress = (val) => {
    if (hasError) return;
    if (val === 'clear') {
      setPasscode('');
    } else if (val === 'backspace') {
      setPasscode((prev) => prev.slice(0, -1));
    } else {
      setPasscode((prev) => {
        if (prev.length < 5) {
          return prev + val;
        }
        return prev;
      });
    }
  };


  const getEnglishName = () => {
    const map = {
      '임소정': 'Lim Sojeong',
      '류나온': 'Ryu Naon',
      '양소연': 'Yang Soyeon',
      '남가인': 'Nam Gain',
      '권한별': 'Kwon Hanbyul',
      '권희원': 'Kwon Heewon',
      '이재환': 'Lee Jaehwan',
      '강준서': 'Kang Junseo',
      '인서진': 'In Seojin',
      '김성현': 'Kim Sunghyun',
      '박성민': 'Park Sungmin',
      '양수빈': 'Yang Subin',
    };
    return map[name] || '';
  };

  useEffect(() => {
    if (name === '임소정') {
      setDept('브랜드경험팀');
      setRole('브랜드 디자이너');
    } else if (name === '류나온') {
      setDept('운영문화팀');
      setRole('총괄 매니저');
    } else if (name === '양소연') {
      setDept('운영문화팀');
      setRole('인사 및 문화 담당');
    } else if (name === '남가인') {
      setDept('코칭지원팀');
      setRole('코칭사');
    } else if (name === '권한별') {
      setDept('코칭지원팀');
      setRole('코칭사');
    } else if (name === '권희원') {
      setDept('코칭지원팀');
      setRole('코칭사');
    } else if (name === '이재환') {
      setDept('코칭지원팀');
      setRole('코칭사');
    } else if (name === '강준서') {
      setDept('코칭지원팀');
      setRole('코칭사');
    } else if (name === '인서진') {
      setDept('코칭지원팀');
      setRole('코칭사');
    } else if (name === '김성현') {
      setDept('코칭지원팀');
      setRole('코칭사');
    } else if (name === '박성민') {
      setDept('코칭지원팀');
      setRole('코칭사');
    } else if (name === '양수빈') {
      setDept('코칭지원팀');
      setRole('코칭사');
    }
  }, [name]);

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
    if (fullName === '류나온') {
      return (
        <img 
          src="/NAON.jpg" 
          alt="Profile" 
          className="profile-img"
        />
      );
    }
    if (fullName === '양소연') {
      return (
        <img 
          src="/SO.jpg" 
          alt="Profile" 
          className="profile-img"
        />
      );
    }
    if (fullName === '남가인') {
      return (
        <img 
          src="/GAIN.jpg" 
          alt="Profile" 
          className="profile-img"
        />
      );
    }
    if (fullName === '권한별') {
      return (
        <img 
          src="/HANBYUL.jpg" 
          alt="Profile" 
          className="profile-img"
        />
      );
    }
    if (fullName === '권희원') {
      return (
        <img src="/HEEWON.jpg" alt="Profile" className="profile-img" />
      );
    }
    if (fullName === '이재환') {
      return (
        <img src="/JAEHWAN.jpg" alt="Profile" className="profile-img" />
      );
    }
    if (fullName === '강준서') {
      return (
        <img src="/JUNSEO.jpg" alt="Profile" className="profile-img" />
      );
    }
    if (fullName === '인서진') {
      return (
        <img src="/SEOJIN.jpg" alt="Profile" className="profile-img" />
      );
    }
    if (fullName === '김성현') {
      return (
        <img src="/SUNGHYUN.jpg" alt="Profile" className="profile-img" />
      );
    }
    if (fullName === '박성민') {
      return (
        <img src="/SUNGMIN.jpg" alt="Profile" className="profile-img" />
      );
    }
    if (fullName === '양수빈') {
      return (
        <img src="/SUBIN.jpg" alt="Profile" className="profile-img" />
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

  if (!isAuthenticated) {
    return (
      <div className={`glass-panel lock-screen-card ${hasError ? 'shake' : ''}`}>
        <div className="lock-screen-header">
          <div className="lock-icon-wrapper">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h2 className="lock-screen-title">VELTO SECURE ACCESS</h2>
          <p className="lock-screen-subtitle">시스템 접속을 위해 5자리 비밀번호를 입력해주세요.</p>
        </div>

        <div className="pin-display-container">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`pin-dot ${i < passcode.length ? 'filled' : ''} ${hasError ? 'error' : ''}`}
            />
          ))}
        </div>

        <div className={`lock-error-message ${hasError ? 'visible' : ''}`}>
          올바르지 않은 비밀번호입니다. 다시 시도해 주세요.
        </div>

        <div className="keypad-grid">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              type="button"
              className="keypad-btn"
              onClick={() => handleKeypadPress(num)}
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            className="keypad-btn action-btn"
            onClick={() => handleKeypadPress('clear')}
          >
            Clear
          </button>
          <button
            type="button"
            className="keypad-btn"
            onClick={() => handleKeypadPress('0')}
          >
            0
          </button>
          <button
            type="button"
            className="keypad-btn action-btn backspace-btn"
            onClick={() => handleKeypadPress('backspace')}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
              <line x1="18" y1="9" x2="12" y2="15" />
              <line x1="12" y1="9" x2="18" y2="15" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

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
          <label htmlFor="userId">사원 ID (User ID)</label>
          <input
            id="userId"
            className="input-field"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="name">이름 (Name)</label>
          <input
            id="name"
            className="input-field"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="dept">부서</label>
          <input
            id="dept"
            className="input-field"
            type="text"
            value={dept}
            onChange={(e) => setDept(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="role">직책</label>
          <input
            id="role"
            className="input-field"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
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
                  <div className="profile-placeholder">
                    {renderProfileContent(name)}
                  </div>
                </div>


                
                <div className="info-section">
                  <div className="name-wrapper">
                    <div className="name-row">
                      <div className="name">{name}</div>
                      {getEnglishName() && <div className="name-en">{getEnglishName()}</div>}
                    </div>
                  </div>
                  <div className="dept-badge">
                    <span className="dept-label">부서:</span> {dept}
                  </div>
                  <div className="dept-badge">
                    <span className="dept-label">직책:</span> {role}
                  </div>
                  <div className="email-badge">
                    blt.official_01@belto.com
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
