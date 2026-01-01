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
        <div className="container mt-5" style={{ maxWidth: '600px' }}>
            
            {/* Header */}
            <div className="text-center mb-5">
                <h2 className="fw-bold text-dark">Welcome to Visual Creator</h2>
                <p className="text-muted">Create custom Power BI visuals in seconds.</p>
            </div>

            {/* Quick Start Card */}
            <div className="card shadow-lg border-0 mb-4" style={{ borderRadius: '12px' }}>
                <div className="card-body p-5 text-center">
                    <div className="mb-4">
                        <span style={{ fontSize: '3rem' }}>🚀</span>
                    </div>
                    <h3 className="fw-bold mb-3">Get Started</h3>
                    <p className="text-muted mb-4">Load a Microsoft sample report and start creating visuals instantly.</p>
                    
                    <button 
                        type="button" 
                        className="btn btn-primary btn-lg w-100 py-3 fw-bold shadow-sm mb-3" 
                        onClick={handleSampleLoad}
                        style={{ borderRadius: '8px' }}
                    >
                        Load Sample Report
                    </button>

                    <button 
                        type="button" 
                        className="btn btn-outline-secondary w-100 py-2" 
                        onClick={onMockMode}
                        style={{ borderRadius: '8px', border: 'none', background: '#f8f9fa' }}
                    >
                        Try Mock Mode (No API required)
                    </button>
                </div>
            </div>

            {/* Manual Config Toggle */}
            <div className="text-center mb-4">
                <button 
                    className="btn btn-link text-muted text-decoration-none"
                    onClick={() => setShowManual(!showManual)}
                    style={{ fontSize: '0.9rem' }}
                >
                    {showManual ? 'Hide Advanced Configuration' : 'Advanced / Custom Report'} 
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
