import React, { useState, useEffect } from 'react';
import { visualTypeToDataRoles, dataRolesToFields } from '../utils/constants';
import './VisualCreatorModal.css';

const VisualCreatorModal = ({ show, onClose, onCreate }) => {
    const [selectedVisualType, setSelectedVisualType] = useState(visualTypeToDataRoles[0].name);
    const [selectedFields, setSelectedFields] = useState({});

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

    const handleCreate = () => {
        onCreate(selectedVisualType, selectedFields);
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
                            <label className="form-label">Visual Type</label>
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

                        <div className="row">
                            {currentVisualConfig.dataRoles.map(role => {
                                const availableFields = dataRolesToFields.find(r => r.dataRole === role)?.Fields || [];
                                return (
                                    <div className="col-md-6 mb-3" key={role}>
                                        <label className="form-label">{role}</label>
                                        <select 
                                            className="form-select"
                                            value={selectedFields[role] || ''}
                                            onChange={(e) => handleFieldChange(role, e.target.value)}
                                        >
                                            <option value="">Select Field</option>
                                            {availableFields.map(field => (
                                                <option key={field} value={field}>{field}</option>
                                            ))}
                                        </select>
                                    </div>
                                );
                            })}
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
