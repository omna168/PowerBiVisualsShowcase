import React, { useState, useEffect, useRef } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import { getEmbedConfig } from './utils/config';
import { dataFieldsTargets } from './utils/constants';
import VisualCreatorModal from './components/VisualCreatorModal';
import ConfigForm from './components/ConfigForm';
import { createMockReport } from './utils/mockPowerBI';
import { jsonDataColors } from './utils/themes';
import './App.css';

function App() {
  const [embedConfig, setEmbedConfig] = useState(null);
  const [report, setReport] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [showConfigForm, setShowConfigForm] = useState(false);
  const [isMockMode, setIsMockMode] = useState(false);
  const [mockVisuals, setMockVisuals] = useState([]);
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentTheme = jsonDataColors[currentThemeIndex];

  useEffect(() => {
    const fetchConfig = async () => {
      const config = await getEmbedConfig();
      if (!config) {
        // If auto-fetch fails, show the manual config form
        setShowConfigForm(true);
      } else {
        setEmbedConfig(config);
      }
    };
    fetchConfig();
  }, []);

  const handleManualConfig = (config) => {
      const isPublic = !config.accessToken;
      setEmbedConfig({
          type: 'report',
          id: config.reportId,
          embedUrl: config.embedUrl,
          accessToken: config.accessToken || undefined,
          tokenType: config.tokenType !== undefined ? config.tokenType : (isPublic ? undefined : models.TokenType.Aad),
          permissions: isPublic ? models.Permissions.Read : models.Permissions.All,
          settings: {
              panes: {
                  filters: { visible: !isPublic },
                  pageNavigation: { visible: !isPublic }
              },
              bars: {
                  statusBar: { visible: !isPublic }
              }
          }
      });
      setShowConfigForm(false);
      setError(null);
      if (isPublic) {
          setMessage("Loaded Public Report. Note: 'Create Visual' will NOT work in this mode (requires permissions).");
      }
  };

  const enableMockMode = () => {
      setIsMockMode(true);
      setReport(createMockReport());
      setMockVisuals([
          { id: 1, title: "Actual Revenue by Industry", type: "Column Chart" },
          { id: 2, title: "Number of Opportunities by Industry", type: "Area Chart" },
          { id: 3, title: "Estimated Revenue by Salesperson", type: "Bar Chart" },
          { id: 4, title: "Number of Opportunities by Opportunity Status", type: "Pie Chart" },
          { id: 5, title: "Number of Opportunities by Salesperson", type: "Line Chart" },
          { id: 6, title: "this is the system embeded programming", type: "Column Chart" }
      ]);
      setMessage("Mock Mode Enabled. You can now 'Create Visual' to test the logic.");
      setShowConfigForm(false);
      setError(null);
  };

  const handleReportLoad = (event) => {
    const report = event.detail.getReport();
    setReport(report);
    setMessage('Report loaded. Click "Create Visual" to add a custom visual.');
  };

  const handleCreateVisual = async (visualType, selectedFields) => {
    if (!report) return;

    try {
      const pages = await report.getPages();
      const activePage = pages.find(p => p.isActive);

      if (!activePage) {
        setMessage('No active page found.');
        return;
      }

      // Define layout for the new visual
      // Placing it in the center for visibility
      const layout = {
        x: 50,
        y: 50,
        width: 400,
        height: 300,
        displayState: {
          mode: models.VisualContainerDisplayMode.Visible
        }
      };

      // Create the visual
      const visualResponse = await activePage.createVisual(visualType, layout);
      const visual = visualResponse.visual;

      // Add data fields
      for (const [role, fieldName] of Object.entries(selectedFields)) {
        if (fieldName && dataFieldsTargets[fieldName]) {
          const target = dataFieldsTargets[fieldName];
          await visual.addDataField(role, target);
        }
      }

      if (isMockMode) {
          setMockVisuals(prev => [...prev, {
              id: Date.now(),
              type: visualType,
              title: `New ${visualType}`,
              fields: selectedFields,
              style: { 
                  ...layout,
                  x: layout.x + (prev.length * 20), // Offset for visibility
                  y: layout.y + (prev.length * 20)
              }
          }]);
      }

      setMessage(`Created ${visualType} successfully!`);
    } catch (error) {
      console.error('Error creating visual:', error);
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Power BI Visual Creator</span>
          <div className="d-flex align-items-center">
            {message && <span className="text-light me-3 small d-none d-md-inline-block">{message}</span>}
            <button 
              className="btn btn-primary btn-sm fw-bold" 
              onClick={() => setShowModal(true)}
              disabled={!report}
            >
              + Create Visual
            </button>
          </div>
        </div>
      </nav>

      <div className="embed-container">
        {isMockMode ? (
            <div className="wrapper">
                <h1 className="header">
                    <img src="/img/contoso.svg" className="contoso" alt="Contoso" aria-label="Contoso logo" />
                </h1>
                
                <main className="content">
                    <div className={`dropdown fixed-top ${isDropdownOpen ? 'show' : ''}`}>
                        <button 
                            className="btn-theme" 
                            type="button" 
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            aria-haspopup="true" 
                            aria-expanded={isDropdownOpen}
                        >
                            <svg role="presentation" className="bucket-theme" width="16" height="16" viewBox="0 0 16 16" fill="#4A565A" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.2031 7.5L6.5 14.2031L0.796875 8.5L6 3.28906V1.5C6 1.29167 6.03906 1.09635 6.11719 0.914062C6.19531 0.731771 6.30208 0.572917 6.4375 0.4375C6.57292 0.302083 6.73177 0.195312 6.91406 0.117188C7.09635 0.0390625 7.29167 0 7.5 0C7.70833 0 7.90365 0.0390625 8.08594 0.117188C8.26823 0.195312 8.42708 0.302083 8.5625 0.4375C8.69792 0.572917 8.80469 0.731771 8.88281 0.914062C8.96094 1.09635 9 1.29167 9 1.5V6.5H8V1.5C8 1.36458 7.95052 1.2474 7.85156 1.14844C7.7526 1.04948 7.63542 1 7.5 1C7.36458 1 7.2474 1.04948 7.14844 1.14844C7.04948 1.2474 7 1.36458 7 1.5V3.71094L2.71094 8H11.2891L11.7969 7.5L10.1484 5.85156L10.8516 5.14844L13.2031 7.5ZM6.5 12.7969L10.2891 9H2.71094L6.5 12.7969ZM15.4609 12.4219C15.5651 12.6042 15.6432 12.7969 15.6953 13C15.7474 13.2031 15.7734 13.4115 15.7734 13.625C15.7734 13.9427 15.7161 14.2448 15.6016 14.5312C15.487 14.8177 15.3281 15.0703 15.125 15.2891C14.9219 15.5078 14.6797 15.6823 14.3984 15.8125C14.1224 15.9375 13.8229 16 13.5 16C13.1771 16 12.875 15.9375 12.5938 15.8125C12.3125 15.6875 12.0677 15.5208 11.8594 15.3125C11.651 15.099 11.4844 14.8516 11.3594 14.5703C11.2396 14.2839 11.1797 13.9818 11.1797 13.6641C11.1797 13.2526 11.2839 12.8672 11.4922 12.5078L13.5 8.99219L15.4609 12.4219ZM13.5 15C13.6875 15 13.8594 14.9635 14.0156 14.8906C14.1771 14.8125 14.3125 14.7109 14.4219 14.5859C14.5365 14.4557 14.625 14.3073 14.6875 14.1406C14.75 13.974 14.7812 13.7995 14.7812 13.6172C14.7812 13.362 14.7188 13.1276 14.5938 12.9141L13.5 11.0078L12.3594 13.0078C12.2396 13.2161 12.1797 13.4349 12.1797 13.6641C12.1797 13.8464 12.2135 14.0182 12.2812 14.1797C12.3542 14.3411 12.4505 14.4818 12.5703 14.6016C12.6901 14.7214 12.8281 14.8177 12.9844 14.8906C13.1458 14.9635 13.3177 15 13.5 15Z"/>
                            </svg>
                            <label className="theme-selector-label">Choose theme</label>
                        </button>
                        <ul className={`dropdown-menu checkbox-menu allow-focus theme-container ${isDropdownOpen ? 'show' : ''}`} id="theme-dropdown">
                            {jsonDataColors.map((theme, index) => (
                                <li key={theme.name} onClick={() => { setCurrentThemeIndex(index); setIsDropdownOpen(false); }}>
                                    <label>
                                        <div className="data-color-container">
                                            {theme.dataColors.map((color, i) => (
                                                <div key={i} className="data-color" style={{ backgroundColor: color }}></div>
                                            ))}
                                        </div>
                                        <div className="data-color-name" style={{ fontWeight: currentThemeIndex === index ? 'bold' : 'normal' }}>
                                            {theme.name}
                                        </div>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div role="separator" className="horizontal-rule fixed-top"></div>

                    <div className="visuals-grid">
                        {mockVisuals.map((visual) => (
                            <div key={visual.id} className="visual-card">
                                <div className="visual-header">
                                    <span>{visual.title}</span>
                                    <span className="badge bg-light text-dark border">{visual.type}</span>
                                </div>
                                <div className="visual-content" style={{padding: '10px'}}>
                                    {/* 1. Actual Revenue by Industry */}
                                    {visual.title === "Actual Revenue by Industry" && (
                                        <div className="chart-container">
                                            <div className="d-flex flex-row h-100">
                                                <div className="y-axis-label">Actual Rev...</div>
                                                <div className="y-axis">
                                                    <span>$40M</span><span>$30M</span><span>$20M</span><span>$0M</span>
                                                </div>
                                                <div className="plot-area">
                                                    {[
                                                        {h: '75%', l: '$30M', x: 'Con...'}, {h: '37%', l: '$15M', x: 'Busi...'}, 
                                                        {h: '35%', l: '', x: 'Fina...'}, {h: '30%', l: '$12M', x: 'Wh...'}, 
                                                        {h: '27%', l: '', x: 'Dur...'}, {h: '22%', l: '$9M', x: 'Tran...'}, 
                                                        {h: '20%', l: '$8M', x: 'Insu...'}, {h: '10%', l: '$4M', x: 'Vehi...'}, 
                                                        {h: '10%', l: '$4M', x: 'Broa...'}
                                                    ].map((d, i) => (
                                                        <div key={i} className="column-bar-group">
                                                            <span className="data-label">{d.l}</span>
                                                            <div className="column-bar" style={{height: d.h, backgroundColor: '#0078D4'}}></div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="x-axis">
                                                {['Con...', 'Busi...', 'Fina...', 'Wh...', 'Dur...', 'Tran...', 'Insu...', 'Vehi...', 'Broa...'].map((l, i) => (
                                                    <span key={i} style={{transform: 'rotate(-90deg)', transformOrigin: 'top left', marginTop: '10px', fontSize: '9px'}}>{l}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* 2. Number of Opportunities by Industry */}
                                    {visual.title === "Number of Opportunities by Industry" && (
                                        <div className="chart-container">
                                            <div className="d-flex flex-row h-100">
                                                <div className="y-axis-label">Number ...</div>
                                                <div className="y-axis">
                                                    <span>100</span><span>0</span>
                                                </div>
                                                <div className="plot-area" style={{alignItems: 'stretch'}}>
                                                    <svg width="100%" height="100%" viewBox="0 0 300 150" preserveAspectRatio="none">
                                                        <path d="M0 150 L0 20 L40 80 L80 85 L120 85 L160 90 L200 92 L240 95 L280 110 L320 112 V 150 Z" fill="#2B88D8" opacity="0.5" />
                                                        <path d="M0 20 L40 80 L80 85 L120 85 L160 90 L200 92 L240 95 L280 110 L320 112" fill="none" stroke="#0078D4" strokeWidth="3" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="x-axis">
                                                {['Co...', 'Bus...', 'Fin...', 'Wh...', 'Dur...', 'Tra...', 'Ins...', 'Ve...', 'Bro...'].map((l, i) => (
                                                    <span key={i} style={{transform: 'rotate(-90deg)', transformOrigin: 'top left', marginTop: '10px', fontSize: '9px'}}>{l}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* 3. Estimated Revenue by Salesperson */}
                                    {visual.title === "Estimated Revenue by Salesperson" && (
                                        <div className="bar-chart-container">
                                            <div className="d-flex flex-row w-100 h-100">
                                                <div className="y-axis-label">Salesperson</div>
                                                <div className="bar-y-axis">
                                                    <span>June Sm...</span>
                                                    <span>Sanjay S...</span>
                                                </div>
                                                <div className="bar-plot-area">
                                                    <div className="bar-horizontal" style={{width: '80%', backgroundColor: '#0078D4'}}>$33M</div>
                                                    <div className="bar-horizontal" style={{width: '45%', backgroundColor: '#0078D4'}}>$19M</div>
                                                </div>
                                            </div>
                                            <div className="bar-x-axis">
                                                <span>$0M</span><span>$20M</span><span>$40M</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* 4. Pie Chart */}
                                    {visual.title === "Number of Opportunities by Opportunity Status" && (
                                        <div className="pie-container">
                                            <div className="pie-placeholder" style={{
                                                background: `conic-gradient(
                                                    #0078D4 0% 35%, 
                                                    #102576 35% 60%, 
                                                    #E06C36 60% 77%, 
                                                    #6B007B 77% 90%, 
                                                    #E6389F 90% 100%
                                                )`
                                            }}></div>
                                            <div className="pie-label" style={{top: '10%', right: '0'}}>Closed Won<br/>124</div>
                                            <div className="pie-label" style={{bottom: '10%', right: '10%'}}>Close... 88</div>
                                            <div className="pie-label" style={{bottom: '20%', left: '0'}}>Quote Sent<br/>61</div>
                                            <div className="pie-label" style={{top: '10%', left: '0'}}>Meeting Sch...<br/>46</div>
                                        </div>
                                    )}

                                    {/* 5. Line Chart */}
                                    {visual.title === "Number of Opportunities by Salesperson" && (
                                        <div className="chart-container">
                                            <div className="d-flex flex-row h-100">
                                                <div className="y-axis-label">Number o...</div>
                                                <div className="y-axis">
                                                    <span>100</span><span>0</span>
                                                </div>
                                                <div className="plot-area" style={{alignItems: 'stretch'}}>
                                                    <svg className="line-chart-svg" viewBox="0 0 300 150" preserveAspectRatio="none">
                                                        <path d="M10 100 L45 130 L80 120 L115 125 L150 30 L185 128 L220 70 L255 120 L290 118" fill="none" stroke="#0078D4" strokeWidth="3" />
                                                        {/* Data Points & Labels */}
                                                        {[
                                                            {x: 10, y: 100, v: 44}, {x: 45, y: 130, v: 14}, {x: 80, y: 120, v: 21},
                                                            {x: 115, y: 125, v: 18}, {x: 150, y: 30, v: 128}, {x: 185, y: 128, v: 16},
                                                            {x: 220, y: 70, v: 74}, {x: 255, y: 120, v: 20}, {x: 290, y: 118, v: 24}
                                                        ].map((p, i) => (
                                                            <g key={i}>
                                                                <circle cx={p.x} cy={p.y} r="3" fill="#0078D4" />
                                                                <text x={p.x} y={p.y - 10} className="line-point-label">{p.v}</text>
                                                            </g>
                                                        ))}
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="x-axis">
                                                {['Alici...', 'Ann...', 'Carl...', 'Chris...', 'June...', 'Moll...', 'Sanj...', 'Spen...', 'Sven...'].map((l, i) => (
                                                    <span key={i} style={{transform: 'rotate(-45deg)', transformOrigin: 'top left', marginTop: '5px', fontSize: '9px'}}>{l}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* 6. System Embedded Programming (Column) */}
                                    {visual.title === "this is the system embeded programming" && (
                                        <div className="chart-container">
                                            <div className="d-flex flex-row h-100">
                                                <div className="y-axis-label">Actual R...</div>
                                                <div className="y-axis">
                                                    <span>$20M</span><span>$0M</span>
                                                </div>
                                                <div className="plot-area">
                                                    {[
                                                        {h: '90%', l: ''}, {h: '60%', l: ''}, {h: '55%', l: ''}, 
                                                        {h: '50%', l: ''}, {h: '45%', l: ''}, {h: '40%', l: ''}, 
                                                        {h: '20%', l: ''}, {h: '18%', l: ''}
                                                    ].map((d, i) => (
                                                        <div key={i} className="column-bar-group">
                                                            <div className="column-bar" style={{height: d.h, backgroundColor: '#0099FF'}}></div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="x-axis">
                                                {['Con...', 'Bus...', 'Fin...', 'Wh...', 'Dur...', 'Tra...', 'Ins...', 'Veh...', 'Bro...'].map((l, i) => (
                                                    <span key={i} style={{transform: 'rotate(-90deg)', transformOrigin: 'top left', marginTop: '10px', fontSize: '9px'}}>{l}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        
                        {/* Create New Visual Card */}
                        <div className="visual-card create-new-card" onClick={() => setShowModal(true)}>
                            <div className="create-btn-content">
                                <div className="create-icon">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 5v14M5 12h14" />
                                    </svg>
                                </div>
                                <span>Create quick visual</span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        ) : showConfigForm ? (
            <ConfigForm onConfigSubmit={handleManualConfig} onMockMode={enableMockMode} />
        ) : error ? (
            <div className="error-message">{error}</div>
        ) : embedConfig ? (
          <PowerBIEmbed
            embedConfig={embedConfig}
            eventHandlers={
              new Map([
                ['loaded', handleReportLoad],
                ['error', (event) => console.log(event.detail)]
              ])
            }
            cssClassName={"report-style-class"}
            getEmbeddedComponent={(embeddedReport) => {
              window.report = embeddedReport;
            }}
          />
        ) : (
          <div className="loading">Loading Embed Config...</div>
        )}
      </div>

      <VisualCreatorModal 
        show={showModal} 
        onClose={() => setShowModal(false)} 
        onCreate={handleCreateVisual} 
      />
    </div>
  );
}

export default App;
