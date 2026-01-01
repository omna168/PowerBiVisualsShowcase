import React, { useState } from 'react';

const ConfigForm = ({ onConfigSubmit, onMockMode }) => {
    const [config, setConfig] = useState({
        embedUrl: '',
        accessToken: '',
        reportId: ''
    });

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

    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">Power BI Embed Configuration</h5>
                </div>
                <div className="card-body">
                    <div className="mb-4">
                        <h6 className="fw-bold text-muted text-uppercase small">Quick Start</h6>
                        <div className="d-grid gap-2">
                            <button type="button" className="btn btn-success btn-lg" onClick={async () => {
                                try {
                                    const response = await fetch("/playground/report/45ce895e-0693-46c7-b984-c849948414e1/GenerateToken");
                                    const data = await response.json();
                                    onConfigSubmit({
                                        embedUrl: data.embedUrl,
                                        reportId: "45ce895e-0693-46c7-b984-c849948414e1",
                                        accessToken: data.token,
                                        tokenType: 1 // Embed Token
                                    });
                                } catch (e) {
                                    alert("Failed to load sample. Please check console.");
                                    console.error(e);
                                }
                            }}>
                                <i className="bi bi-play-fill me-2"></i>Load Microsoft Sample Report
                            </button>
                            <button type="button" className="btn btn-outline-secondary" onClick={onMockMode}>
                                Use Mock Mode (Test UI Only)
                            </button>
                        </div>
                    </div>

                    <hr className="my-4" />

                    <h6 className="fw-bold text-muted text-uppercase small mb-3">Manual Configuration</h6>
                    <p className="text-muted small mb-3">
                        If you have your own report, enter the details below. You can get a token from the <a href="https://playground.powerbi.com/en-us/dev-sandbox" target="_blank" rel="noreferrer">Power BI Playground</a>.
                    </p>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Embed URL</label>
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
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Report ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="reportId"
                                    value={config.reportId}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-8 mb-3">
                                <label className="form-label">Access Token</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="accessToken"
                                    value={config.accessToken}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary">Load Custom Report</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ConfigForm;
