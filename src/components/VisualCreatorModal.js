import React, { useState, useEffect } from 'react';
import { visualTypeToDataRoles, dataRolesToFields } from '../utils/constants';
import './VisualCreatorModal.css';

const VisualCreatorModal = ({ show, onClose, onCreate }) => {
    const [selectedVisualType, setSelectedVisualType] = useState(visualTypeToDataRoles[0].name);
    const [selectedFields, setSelectedFields] = useState({});
    const [formatting, setFormatting] = useState({
        legend: false,
        category: false,
        value: false,
        title: true,
        customTitle: '',
        titleAlignment: 'left'
    });

    const currentVisualConfig = visualTypeToDataRoles.find(v => v.name === selectedVisualType);

    useEffect(() => {
        // Reset fields when visual type changes
        setSelectedFields({});
    }, [selectedVisualType]);

    const handleFieldChange = (role, field) => {
        setSelectedFields(prev => ({
            ...prev,
            [role]: field
        }));
    };

    const handleFormatChange = (key, value) => {
        setFormatting(prev => ({ ...prev, [key]: value }));
    };

    const handleCreate = () => {
        onCreate(selectedVisualType, selectedFields, formatting);
        onClose();
    };

    if (!show) return null;

    return (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create Visual</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Choose the visual type</label>
                            <select 
                                className="form-select" 
                                value={selectedVisualType} 
                                onChange={(e) => setSelectedVisualType(e.target.value)}
                            >
                                {visualTypeToDataRoles.map(v => (
                                    <option key={v.name} value={v.name}>{v.displayName}</option>
                                ))}
                            </select>
                        </div>

                        <h6 className="mt-4 mb-3">Set your fields</h6>
                        <div className="row">
                            {currentVisualConfig.dataRoles.map(role => {
                                const availableFields = dataRolesToFields.find(r => r.dataRole === role)?.Fields || [];
                                return (
                                    <div className="col-md-12 mb-3" key={role}>
                                        <div className="d-flex align-items-center">
                                            <label className="form-label me-3" style={{minWidth: '80px'}}>{role}</label>
                                            <select 
                                                className="form-select"
                                                value={selectedFields[role] || ''}
                                                onChange={(e) => handleFieldChange(role, e.target.value)}
                                            >
                                                <option value="">Select {role}</option>
                                                {availableFields.map(field => (
                                                    <option key={field} value={field}>{field}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <h6 className="text-muted mt-4 mb-3" style={{color: '#a19f9d'}}>Format your visual</h6>
                        
                        {/* Toggles */}
                        {['Legend', 'Category', 'Value', 'Title'].map(item => (
                            <div className="d-flex justify-content-between align-items-center mb-3" key={item}>
                                <label className="form-check-label" style={{color: '#605e5c'}}>{item}</label>
                                <div className="form-check form-switch">
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox" 
                                        checked={formatting[item.toLowerCase()]}
                                        onChange={(e) => handleFormatChange(item.toLowerCase(), e.target.checked)}
                                        style={{cursor: 'pointer'}}
                                    />
                                </div>
                            </div>
                        ))}

                        {/* Title Input */}
                        <div className="mb-3">
                            <div className="input-group">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Type your personalized title"
                                    value={formatting.customTitle}
                                    onChange={(e) => handleFormatChange('customTitle', e.target.value)}
                                />
                                <span className="input-group-text bg-white">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                                </span>
                            </div>
                        </div>

                        {/* Title Alignment */}
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <label className="form-check-label" style={{color: '#605e5c'}}>Title alignment</label>
                            <div className="btn-group" role="group">
                                {['left', 'center', 'right'].map(align => (
                                    <button 
                                        key={align}
                                        type="button" 
                                        className={`btn btn-sm ${formatting.titleAlignment === align ? '' : ''}`}
                                        onClick={() => handleFormatChange('titleAlignment', align)}
                                        style={{border: 'none', background: 'transparent', color: formatting.titleAlignment === align ? '#0078d4' : '#a19f9d'}}
                                    >
                                        {align === 'left' && <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 6h18v2H3V6zm0 5h12v2H3v-2zm0 5h18v2H3v-2z"/></svg>}
                                        {align === 'center' && <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 6h18v2H3V6zm4 5h10v2H7v-2zm-4 5h18v2H3v-2z"/></svg>}
                                        {align === 'right' && <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 6h18v2H3V6zm6 5h12v2H9v-2zm-6 5h18v2H3v-2z"/></svg>}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleCreate}>Create</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisualCreatorModal;
