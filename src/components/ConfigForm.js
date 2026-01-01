import React, { useState } from 'react';

const ConfigForm = ({ onConfigSubmit, onMockMode }) => {
    const [config, setConfig] = useState({
        embedUrl: '',
        accessToken: '',
        reportId: ''
    });
    const [showManual, setShowManual] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConfig(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfigSubmit(config);
    };

    const handleSampleLoad = async () => {
        try {
            const response = await fetch("/playground/report/45ce895e-0693-46c7-b984-c849948414e1/GenerateToken");
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            onConfigSubmit({
                embedUrl: data.embedUrl,
                reportId: "45ce895e-0693-46c7-b984-c849948414e1",
                accessToken: data.token,
                tokenType: 1 // Embed Token
            });
        } catch (e) {
            console.error(e);
            alert("Could not load live sample. Switching to Mock Mode for demonstration.");
            onMockMode();
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '800px' }}>
            
            {/* Header */}
            <div className="text-center mb-5">
                <h2 className="fw-bold text-dark mb-2">Welcome to Visual Creator</h2>
                <p className="text-muted">Choose how you want to start creating Power BI visuals.</p>
            </div>

            <div className="row g-4 mb-5">
                {/* Option 1: Sample Report */}
                <div className="col-md-6">
                    <div className="config-card primary p-4 h-100" onClick={handleSampleLoad}>
                        <div className="config-icon primary">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 20V10M12 20V4M6 20v-6" />
                            </svg>
                        </div>
                        <h3 className="config-title">Load Sample Report</h3>
                        <p className="config-desc">
                            Instantly load a Microsoft sample report. Best for testing the "Create Visual" workflow with real data.
                        </p>
                        <div className="mt-3 text-primary fw-bold small">
                            Start Now →
                        </div>
                    </div>
                </div>

                {/* Option 2: Mock Mode */}
                <div className="col-md-6">
                    <div className="config-card secondary p-4 h-100" onClick={onMockMode}>
                        <div className="config-icon secondary">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 16l6-6 4 4 6-6M4 20h16" />
                            </svg>
                        </div>
                        <h3 className="config-title">Try Mock Mode</h3>
                        <p className="config-desc">
                            Test the UI and visual creation flow without connecting to Power BI services. No API keys required.
                        </p>
                        <div className="mt-3 text-secondary fw-bold small">
                            Enter Mock Mode →
                        </div>
                    </div>
                </div>
            </div>

            {/* Manual Config Toggle */}
            <div className="text-center mb-4">
                <button 
                    className="btn btn-link text-muted text-decoration-none"
                    onClick={() => setShowManual(!showManual)}
                    style={{ fontSize: '0.9rem' }}
                >
                    {showManual ? 'Hide Advanced Configuration' : 'I have my own Report ID & Token'} 
                    <i className={`bi bi-chevron-${showManual ? 'up' : 'down'} ms-1`}></i>
                </button>
            </div>

            {/* Manual Config Form (Collapsible) */}
            {showManual && (
                <div className="card shadow-sm border-0 bg-light fade-in" style={{ borderRadius: '12px' }}>
                    <div className="card-body p-4">
                        <h6 className="fw-bold text-muted text-uppercase small mb-3">Manual Configuration</h6>
                        <p className="text-muted small mb-3">
                            Enter details from the <a href="https://playground.powerbi.com/en-us/dev-sandbox" target="_blank" rel="noreferrer">Power BI Playground</a>.
                        </p>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-secondary">Embed URL</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="embedUrl"
                                    value={config.embedUrl}
                                    onChange={handleChange}
                                    required
                                    placeholder="https://app.powerbi.com/reportEmbed?..."
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-secondary">Report ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="reportId"
                                    value={config.reportId}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-secondary">Access Token</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="accessToken"
                                    value={config.accessToken}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="form-text text-warning">
                                    <i className="bi bi-exclamation-triangle me-1"></i>
                                    Token must have <strong>Edit permissions</strong> to create visuals.
                                </div>
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-dark">Load Custom Report</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConfigForm;
