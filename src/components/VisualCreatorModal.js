import React, { useState, useEffect } from 'react';
import { visualTypeToDataRoles, dataRolesToFields } from '../utils/constants';
import VisualRenderer from './VisualRenderer';
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
    const [zoomLevel, setZoomLevel] = useState(100);

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

    const getMappedFields = () => {
        const mappedFields = {};
        Object.keys(selectedFields).forEach(displayRole => {
            const roleIndex = currentVisualConfig.dataRoles.indexOf(displayRole);
            if (roleIndex !== -1) {
                const internalRole = currentVisualConfig.dataRoleNames[roleIndex];
                mappedFields[internalRole] = selectedFields[displayRole];
            }
        });
        return mappedFields;
    };

    const handleCreate = () => {
        // Map selectedFields (display names) to internal names
        const mappedFields = getMappedFields();

        onCreate(selectedVisualType, mappedFields, formatting);
        onClose();
    };

    const previewVisual = {
        type: selectedVisualType,
        title: formatting.customTitle || currentVisualConfig.displayName,
        fields: getMappedFields(),
        formatting: formatting
    };

    const hasSelectedFields = Object.values(selectedFields).some(val => val && val !== '');

    if (!show) return null;

    return (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
            <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
                <div className="modal-content visual-creator-modal">
                    <div className="modal-header border-0 pb-0">
                        <h5 className="modal-title fw-bold">Create quick visual</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="row h-100">
                            {/* Left Panel - Controls */}
                            <div className="col-md-4 border-end pe-4 overflow-auto h-100">
                                <div className="mb-4">
                                    <label className="form-label fw-bold small">Choose the visual type</label>
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

                                <div className="mb-4">
                                    <label className="form-label fw-bold small mb-3">Set your fields</label>
                                    {currentVisualConfig.dataRoles.map(role => {
                                        const availableFields = dataRolesToFields.find(r => r.dataRole === role)?.Fields || [];
                                        return (
                                            <div className="mb-2 row align-items-center" key={role}>
                                                <label className="col-sm-4 col-form-label text-muted small">{role}</label>
                                                <div className="col-sm-8">
                                                    <select 
                                                        className="form-select form-select-sm"
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

                                <div className="mb-4">
                                    <label className="form-label fw-bold small mb-3">Format your visual</label>
                                    
                                    {/* Toggles */}
                                    {['Legend', 'Category', 'Value', 'Title'].map(item => (
                                        <div className="d-flex justify-content-between align-items-center mb-2" key={item}>
                                            <label className="form-check-label text-muted small">{item}</label>
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
                                    {formatting.title && (
                                        <div className="mt-3">
                                            <div className="input-group mb-3">
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Type your personalized title"
                                                    value={formatting.customTitle}
                                                    onChange={(e) => handleFormatChange('customTitle', e.target.value)}
                                                />
                                                <span className="input-group-text bg-white border-start-0">
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8 1L10 6L15 8L10 10L8 15L6 10L1 8L6 6L8 1Z" fill="#C8C8C8"/>
                                                    </svg>
                                                </span>
                                            </div>

                                            <div className="d-flex align-items-center justify-content-between">
                                                <label className="text-muted small">Title alignment</label>
                                                <div className="btn-group" role="group">
                                                    {['left', 'center', 'right'].map(align => (
                                                        <button 
                                                            key={align}
                                                            type="button" 
                                                            className={`btn btn-sm btn-outline-secondary border-0 ${formatting.titleAlignment === align ? 'active' : ''}`}
                                                            onClick={() => handleFormatChange('titleAlignment', align)}
                                                        >
                                                            {align === 'left' && <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M1 2H15V3H1V2ZM1 6H10V7H1V6ZM1 10H15V11H1V10ZM1 14H10V15H1V14Z"/></svg>}
                                                            {align === 'center' && <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M1 2H15V3H1V2ZM3 6H13V7H3V6ZM1 10H15V11H1V10ZM3 14H13V15H3V14Z"/></svg>}
                                                            {align === 'right' && <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M1 2H15V3H1V2ZM6 6H15V7H6V6ZM1 10H15V11H1V10ZM6 14H15V15H6V14Z"/></svg>}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Right Panel - Preview */}
                            <div className={`col-md-8 bg-light d-flex flex-column ${hasSelectedFields ? '' : 'align-items-center justify-content-center'} rounded-3 p-4`}>
                                {hasSelectedFields ? (
                                    <>
                                        <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                            <div style={{ 
                                                width: '100%', 
                                                height: '100%', 
                                                backgroundColor: 'white', 
                                                padding: '20px', 
                                                borderRadius: '4px', 
                                                overflow: 'hidden', 
                                                display: 'flex', 
                                                flexDirection: 'column', 
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                                transform: `scale(${zoomLevel / 100})`,
                                                transformOrigin: 'center center',
                                                transition: 'transform 0.2s ease-out'
                                            }}>
                                                {formatting.title && (
                                                    <div style={{ marginBottom: '10px', fontWeight: 'bold', fontSize: '16px', textAlign: formatting.titleAlignment, color: '#333' }}>
                                                        {previewVisual.title}
                                                    </div>
                                                )}
                                                <div style={{ flex: 1, position: 'relative', minHeight: '0' }}>
                                                    <VisualRenderer visual={previewVisual} isPreview={true} />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="d-flex align-items-center justify-content-center mt-3" style={{ width: '100%' }}>
                                            <button 
                                                className="btn btn-link text-secondary text-decoration-none p-0 me-2" 
                                                onClick={() => setZoomLevel(prev => Math.max(50, prev - 10))}
                                                style={{ fontSize: '24px', lineHeight: '1' }}
                                            >
                                                -
                                            </button>
                                            <input 
                                                type="range" 
                                                className="form-range" 
                                                min="50" 
                                                max="150" 
                                                step="10" 
                                                value={zoomLevel} 
                                                onChange={(e) => setZoomLevel(Number(e.target.value))}
                                                style={{ width: '150px' }}
                                            />
                                            <button 
                                                className="btn btn-link text-secondary text-decoration-none p-0 ms-2" 
                                                onClick={() => setZoomLevel(prev => Math.min(150, prev + 10))}
                                                style={{ fontSize: '24px', lineHeight: '1' }}
                                            >
                                                +
                                            </button>
                                            <span className="ms-3 text-muted small" style={{ minWidth: '40px' }}>{zoomLevel}%</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center text-muted">
                                        <div className="mb-3">
                                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M12 20h9"></path>
                                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                            </svg>
                                        </div>
                                        <p>Your visual preview will appear here</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer border-0">
                        <button type="button" className="btn btn-primary px-4" onClick={handleCreate}>Create</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisualCreatorModal;
