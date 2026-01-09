import React, { useState } from 'react';

const VisualRenderer = ({ visual, isLarge, theme, isDarkMode, isPreview }) => {
    const colors = theme ? theme.dataColors : ['#0078D4', '#102576', '#E06C36', '#6B007B', '#E6389F'];
    const textColor = isDarkMode ? '#ffffff' : '#333333';
    const axisColor = isDarkMode ? '#cccccc' : '#666666';
    const gridColor = isDarkMode ? '#484644' : '#e6e6e6';

    const [tooltip, setTooltip] = useState(null);
    const [hoverLine, setHoverLine] = useState(null);
    const [zoom, setZoom] = useState(1);

    const ZoomControls = () => (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '5px', gap: '8px', borderTop: '1px solid #eee', marginTop: '5px'}}>
            <span style={{fontSize: '10px', color: '#666', minWidth: '35px'}}>{Math.round(zoom * 100)}%</span>
            <input 
                type="range" 
                min="1" max="4" step="0.1" 
                value={zoom} 
                onChange={e => setZoom(parseFloat(e.target.value))}
                style={{width: '80px', height: '4px', cursor: 'pointer', accentColor: '#0078D4'}}
            />
        </div>
    );

    const handleMouseMove = (e, title, items, lineX = null) => {
        const x = e.clientX;
        const y = e.clientY;
        // Keep tooltip within window bounds
        const xOffset = x + 220 > window.innerWidth ? -210 : 15;
        const yOffset = y + 150 > window.innerHeight ? -100 : 15;
        
        setTooltip({
            x: x + xOffset,
            y: y + yOffset,
            title,
            items
        });

        if (lineX !== null) {
            setHoverLine(lineX);
        } else {
            setHoverLine(null);
        }
    };

    const handleMouseLeave = () => {
        setTooltip(null);
        setHoverLine(null);
    };

    const handleChartHover = (e, dataPoints, width, height, renderCallback) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        
        // Find nearest point
        const fraction = mouseX / rect.width;
        const index = Math.min(Math.max(Math.round(fraction * (dataPoints.length - 1)), 0), dataPoints.length - 1);
        const point = dataPoints[index];
        
        // Calculate SVG X position (tracking mouse continuously)
        const svgX = mouseX * (width / rect.width);

        // Call standard tooltip handler with gathered data
        if (renderCallback) {
             const { title, items } = renderCallback(point, index);
             handleMouseMove(e, title, items, svgX);
        }
    };

    const isSpecific = !isPreview && (
        (visual.title === "Actual Revenue by Industry" || (visual.fields?.Category === 'Industry' && visual.fields?.Y === 'Actual Revenue')) ||
        (visual.title === "Number of Opportunities by Industry" || (visual.fields?.Category === 'Industry' && visual.fields?.Y === 'Number of Opportunities')) ||
        (visual.title === "Estimated Revenue by Salesperson") ||
        (visual.title === "Number of Opportunities by Opportunity Status") ||
        (visual.title === "Number of Opportunities by Salesperson") ||
        (visual.title === "this is the system embeded programming")
    );

    return (
        <>
            {/* 1. Actual Revenue by Industry */}
            {!isPreview && (visual.title === "Actual Revenue by Industry" || (visual.fields?.Category === 'Industry' && visual.fields?.Y === 'Actual Revenue')) && (
                <div className="chart-container">
                    <div className="d-flex flex-row h-100">
                        <div className="y-axis-label" style={isLarge ? {fontSize: '14px', fontWeight: 'bold', color: textColor} : {color: axisColor}}>
                            {isLarge ? "Actual Revenue" : "Actual Rev..."}
                        </div>
                        <div className="y-axis" style={isLarge ? {justifyContent: 'space-between', height: '90%', marginBottom: '20px', color: axisColor} : {color: axisColor}}>
                            {isLarge ? (
                                <><span>$40M</span><span>$30M</span><span>$20M</span><span>$10M</span><span>$0M</span></>
                            ) : (
                                <><span>$40M</span><span>$30M</span><span>$20M</span><span>$0M</span></>
                            )}
                        </div>
                        <div className="plot-area">
                            {[
                                {h: '75%', l: '$30M', full: 'Consumer Goods', short: 'Con...'}, 
                                {h: '37%', l: '$15M', full: 'Business Services', short: 'Busi...'}, 
                                {h: '35%', l: '', full: 'Financial Services', short: 'Fina...'}, 
                                {h: '30%', l: '$12M', full: 'Wholesale', short: 'Wh...'}, 
                                {h: '27%', l: '', full: 'Durable Goods', short: 'Dur...'}, 
                                {h: '22%', l: '$9M', full: 'Transportation', short: 'Tran...'}, 
                                {h: '20%', l: '$8M', full: 'Insurance', short: 'Insu...'}, 
                                {h: '10%', l: '$4M', full: 'Vehicle', short: 'Vehi...'}, 
                                {h: '10%', l: '$4M', full: 'Broadcasting', short: 'Broa...'}
                            ].map((d, i) => (
                                <div key={i} className="column-bar-group"
                                    onMouseMove={(e) => handleMouseMove(e, d.full, [{label: 'Actual Revenue', value: d.l || 'N/A', color: colors[0]}])}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <span className="data-label" style={isLarge ? {fontSize: '12px', color: textColor} : {color: textColor}}>{d.l}</span>
                                    <div className="column-bar" style={{height: d.h, backgroundColor: colors[0]}}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="x-axis" style={isLarge ? {marginTop: '10px'} : {}}>
                        {[
                            {full: 'Consumer Goods', short: 'Con...'}, 
                            {full: 'Business Services', short: 'Busi...'}, 
                            {full: 'Financial Services', short: 'Fina...'}, 
                            {full: 'Wholesale', short: 'Wh...'}, 
                            {full: 'Durable Goods', short: 'Dur...'}, 
                            {full: 'Transportation', short: 'Tran...'}, 
                            {full: 'Insurance', short: 'Insu...'}, 
                            {full: 'Vehicle', short: 'Vehi...'}, 
                            {full: 'Broadcasting', short: 'Broa...'}
                        ].map((l, i) => (
                            <span key={i} style={isLarge ? {
                                transform: 'none', 
                                textAlign: 'center', 
                                width: '60px', 
                                fontSize: '12px', 
                                color: axisColor,
                                whiteSpace: 'normal',
                                lineHeight: '1.1'
                            } : {
                                transform: 'rotate(-45deg)', 
                                transformOrigin: 'top left', 
                                marginTop: '5px', 
                                fontSize: '9px',
                                width: '20px',
                                whiteSpace: 'nowrap',
                                color: axisColor
                            }}>
                                {isLarge ? l.full : l.short}
                            </span>
                        ))}
                    </div>
                    {isLarge && <div style={{textAlign: 'center', fontWeight: 'bold', marginTop: '10px', fontSize: '14px', color: textColor}}>Industry</div>}
                </div>
            )}

            {/* 2. Number of Opportunities by Industry */}
            {!isPreview && (visual.title === "Number of Opportunities by Industry" || (visual.fields?.Category === 'Industry' && visual.fields?.Y === 'Number of Opportunities')) && (
                <div className="chart-container">
                    <div className="d-flex flex-row h-100">
                        <div className="y-axis-label" style={{color: axisColor}}>Number ...</div>
                        <div className="y-axis" style={{color: axisColor}}>
                            <span>100</span><span>0</span>
                        </div>
                        <div className="plot-area" style={{alignItems: 'stretch'}}>
                            <svg width="100%" height="100%" viewBox="0 0 300 150" preserveAspectRatio="none">
                                <path d="M0 150 L0 20 L40 80 L80 85 L120 85 L160 90 L200 92 L240 95 L280 110 L320 112 V 150 Z" fill={colors[0]} opacity="0.5" />
                                <path d="M0 20 L40 80 L80 85 L120 85 L160 90 L200 92 L240 95 L280 110 L320 112" fill="none" stroke={colors[0]} strokeWidth="3" />
                            </svg>
                        </div>
                    </div>
                    <div className="x-axis">
                        {['Co...', 'Bus...', 'Fin...', 'Wh...', 'Dur...', 'Tra...', 'Ins...', 'Ve...', 'Bro...'].map((l, i) => (
                            <span key={i} style={{transform: 'rotate(-90deg)', transformOrigin: 'top left', marginTop: '10px', fontSize: '9px', color: axisColor}}>{l}</span>
                        ))}
                    </div>
                </div>
            )}

            {/* 3. Estimated Revenue by Salesperson */}
            {!isPreview && visual.title === "Estimated Revenue by Salesperson" && (
                <div className="bar-chart-container">
                    <div className="d-flex flex-row w-100 h-100">
                        <div className="y-axis-label" style={{color: axisColor}}>Salesperson</div>
                        <div className="bar-y-axis" style={{color: axisColor}}>
                            <span>June Sm...</span>
                            <span>Sanjay S...</span>
                        </div>
                        <div className="bar-plot-area">
                            <div className="bar-horizontal" 
                                style={{width: '80%', backgroundColor: colors[0]}}
                                onMouseMove={(e) => handleMouseMove(e, 'June Smith', [{label: 'Estimated Revenue', value: '$33M', color: colors[0]}])}
                                onMouseLeave={handleMouseLeave}
                            >$33M</div>
                            <div className="bar-horizontal" 
                                style={{width: '45%', backgroundColor: colors[0]}}
                                onMouseMove={(e) => handleMouseMove(e, 'Sanjay Shah', [{label: 'Estimated Revenue', value: '$19M', color: colors[0]}])}
                                onMouseLeave={handleMouseLeave}
                            >$19M</div>
                        </div>
                    </div>
                    <div className="bar-x-axis" style={{color: axisColor}}>
                        <span>$0M</span><span>$20M</span><span>$40M</span>
                    </div>
                </div>
            )}

            {/* 4. Pie Chart */}
            {!isPreview && visual.title === "Number of Opportunities by Opportunity Status" && (
                <div className="pie-container">
                    <div className="pie-placeholder" style={{
                        background: `conic-gradient(
                            ${colors[0]} 0% 35%, 
                            ${colors[1]} 35% 60%, 
                            ${colors[2]} 60% 77%, 
                            ${colors[3]} 77% 90%, 
                            ${colors[4]} 90% 100%
                        )`
                    }}></div>
                    <div className="pie-label" 
                        style={{top: '10%', right: '0', color: textColor, cursor: 'default'}}
                        onMouseMove={(e) => handleMouseMove(e, 'Closed Won', [{label: 'Count', value: '124', color: colors[0]}])}
                        onMouseLeave={handleMouseLeave}
                    >Closed Won<br/>124</div>
                    <div className="pie-label" 
                        style={{bottom: '10%', right: '10%', color: textColor, cursor: 'default'}}
                        onMouseMove={(e) => handleMouseMove(e, 'Closed Lost', [{label: 'Count', value: '88', color: colors[1]}])}
                        onMouseLeave={handleMouseLeave}
                    >Close... 88</div>
                    <div className="pie-label" 
                        style={{bottom: '20%', left: '0', color: textColor, cursor: 'default'}}
                        onMouseMove={(e) => handleMouseMove(e, 'Quote Sent', [{label: 'Count', value: '61', color: colors[2]}])}
                        onMouseLeave={handleMouseLeave}
                    >Quote Sent<br/>61</div>
                    <div className="pie-label" 
                        style={{top: '10%', left: '0', color: textColor, cursor: 'default'}}
                        onMouseMove={(e) => handleMouseMove(e, 'Meeting Scheduled', [{label: 'Count', value: '46', color: colors[3]}])}
                        onMouseLeave={handleMouseLeave}
                    >Meeting Sch...<br/>46</div>
                </div>
            )}

            {/* 5. Line Chart */}
            {!isPreview && visual.title === "Number of Opportunities by Salesperson" && (
                <div className="chart-container">
                    <div className="d-flex flex-row h-100">
                        <div className="y-axis-label" style={isLarge ? {fontSize: '14px', fontWeight: 'bold', color: textColor} : {color: axisColor}}>
                            {isLarge ? "Number of Opportunities" : "Number o..."}
                        </div>
                        <div className="y-axis" style={isLarge ? {justifyContent: 'space-between', height: '85%', marginTop: 'auto', marginBottom: '30px', borderRight: 'none', color: axisColor} : {color: axisColor}}>
                            {isLarge ? (
                                <>
                                    <span style={{fontSize: '12px', color: axisColor}}>100</span>
                                    <span style={{fontSize: '12px', color: axisColor}}>50</span>
                                    <span style={{fontSize: '12px', color: axisColor}}>0</span>
                                </>
                            ) : (
                                <><span>100</span><span>0</span></>
                            )}
                        </div>
                        <div style={{flex: 1, minWidth: 0, overflowX: 'auto', overflowY: 'hidden', display: 'flex', flexDirection: 'column'}}>
                            <div className="plot-area" style={{alignItems: 'stretch', position: 'relative', width: `${zoom * 100}%`, minWidth: '100%', transition: 'width 0.2s ease'}}>
                                <svg className="line-chart-svg" viewBox={isLarge ? "0 0 800 400" : "0 0 300 150"} preserveAspectRatio="none" style={{overflow: 'visible'}}>
                                    {/* Grid lines for Large View */}
                                    {isLarge && (
                                        <>
                                            <line x1="0" y1="0" x2="800" y2="0" stroke={gridColor} strokeWidth="1" />
                                            <line x1="0" y1="200" x2="800" y2="200" stroke={gridColor} strokeWidth="1" />
                                            <line x1="0" y1="400" x2="800" y2="400" stroke={gridColor} strokeWidth="1" />
                                        </>
                                    )}

                                    {/* Hover Line */}
                                    {hoverLine !== null && (
                                        <line 
                                            x1={hoverLine} 
                                            y1={0} 
                                            x2={hoverLine} 
                                            y2={isLarge ? 400 : 150} 
                                            stroke="#666" 
                                            strokeWidth="0.5" 
                                            strokeDasharray="4 4"
                                            style={{pointerEvents: 'none'}} 
                                        />
                                    )}
                                    
                                    <path 
                                        d={isLarge 
                                            ? "M40 224 L120 344 L200 316 L280 328 L360 112 L440 336 L520 204 L600 320 L680 304" 
                                            : "M10 100 L45 130 L80 120 L115 125 L150 30 L185 128 L220 70 L255 120 L290 118"
                                        } 
                                        fill="none" 
                                        stroke={colors[0]} 
                                        strokeWidth={isLarge ? "4" : "3"} 
                                    />
                                    
                                    {/* Overlay Rect for Hover Detection */}
                                    <rect 
                                        x="0" y="0" width="800" height="400" 
                                        fill="transparent" 
                                        style={{cursor: 'crosshair'}}
                                        onMouseMove={(e) => {
                                            const largePoints = [
                                                {x: 40, y: 224, v: 44}, {x: 120, y: 344, v: 14}, {x: 200, y: 316, v: 21},
                                                {x: 280, y: 328, v: 18}, {x: 360, y: 112, v: 128}, {x: 440, y: 336, v: 16},
                                                {x: 520, y: 204, v: 74}, {x: 600, y: 320, v: 20}, {x: 680, y: 304, v: 24}
                                            ];
                                            // Points for small view are not aligned cleanly for this overlay logic without more work, 
                                            // so we prioritize Large view or just map roughly for small.
                                            // Since the user is likely looking at the expanded visual (Large), let's focus on that UX.
                                            // For simplicity, we use the same points array structure but mapped if needed.
                                            
                                            const points = isLarge ? largePoints : [
                                                {x: 10, y: 100, v: 44}, {x: 45, y: 130, v: 14}, {x: 80, y: 120, v: 21},
                                                {x: 115, y: 125, v: 18}, {x: 150, y: 30, v: 128}, {x: 185, y: 128, v: 16},
                                                {x: 220, y: 70, v: 74}, {x: 255, y: 120, v: 20}, {x: 290, y: 118, v: 24}
                                            ];

                                            const rect = e.currentTarget.getBoundingClientRect();
                                            const mouseX = e.clientX - rect.left;
                                            const viewBoxWidth = isLarge ? 800 : 300;
                                            
                                            // Map mouseX to SVG space
                                            const svgMouseX = mouseX * (viewBoxWidth / rect.width);
                                            
                                            let minDist = Infinity;
                                            let closestIndex = 0;
                                            
                                            points.forEach((p, i) => {
                                                // Points are already in their respective coordinate spaces (Small vs Large)
                                                // No need for re-scaling if we match ViewBox to the points set
                                                const dist = Math.abs(p.x - svgMouseX);
                                                if (dist < minDist) {
                                                    minDist = dist;
                                                    closestIndex = i;
                                                }
                                            });

                                            const p = points[closestIndex];
                                            const names = ['Alicia Thomber', 'Anne Weiler', 'Carlos Grilo', 'Christa Geller', 'June Smith', 'Molly Clark', 'Sanjay Shah', 'Spencer Low', 'Sven Mortensen'];
                                            
                                            handleMouseMove(e, names[closestIndex], [{label: 'Opportunities', value: p.v, color: colors[0]}], svgMouseX); 
                                            
                                            // Always show hover line in both modes now, or just Large? 
                                            // Previous code: if (isLarge) setHoverLine(svgMouseX);
                                            // Let's enable for both
                                            setHoverLine(svgMouseX);
                                        }}
                                        onMouseLeave={handleMouseLeave}
                                    />

                                    {/* Data Points & Labels */}
                                    {(isLarge ? [
                                        {x: 40, y: 224, v: 44}, {x: 120, y: 344, v: 14}, {x: 200, y: 316, v: 21},
                                        {x: 280, y: 328, v: 18}, {x: 360, y: 112, v: 128}, {x: 440, y: 336, v: 16},
                                        {x: 520, y: 204, v: 74}, {x: 600, y: 320, v: 20}, {x: 680, y: 304, v: 24}
                                    ] : [
                                        {x: 10, y: 100, v: 44}, {x: 45, y: 130, v: 14}, {x: 80, y: 120, v: 21},
                                        {x: 115, y: 125, v: 18}, {x: 150, y: 30, v: 128}, {x: 185, y: 128, v: 16},
                                        {x: 220, y: 70, v: 74}, {x: 255, y: 120, v: 20}, {x: 290, y: 118, v: 24}
                                    ]).map((p, i) => (
                                        <g key={i} style={{pointerEvents: 'none'}}>
                                            <text 
                                                x={p.x} 
                                                y={p.y - 15} 
                                                className="line-point-label" 
                                                style={isLarge ? {fontSize: '14px', fill: axisColor} : {fill: axisColor, fontSize: '10px'}}
                                            >
                                                {p.v}
                                            </text>
                                        </g>
                                    ))}
                                </svg>
                            </div>
                    
                            <div className="x-axis" style={isLarge ? {borderTop: 'none', marginTop: '0', paddingTop: '10px', width: `${zoom * 100}%`, minWidth: '100%'} : {}}>
                                {(isLarge ? [
                                    'Alicia\nThomber', 'Anne Weiler', 'Carlos Grilo', 'Christa Geller', 
                                    'June Smith', 'Molly Clark', 'Sanjay Shah', 'Spencer Low', 'Sven\nMortensen'
                                ] : [
                                    'Alici...', 'Ann...', 'Carl...', 'Chris...', 'June...', 'Moll...', 'Sanj...', 'Spen...', 'Sven...'
                                ]).map((l, i) => (
                                    <span key={i} style={isLarge ? {
                                        transform: 'none', 
                                        textAlign: 'center', 
                                        width: '80px', 
                                        fontSize: '12px', 
                                        color: axisColor,
                                        whiteSpace: 'pre-line'
                                    } : {
                                        transform: 'rotate(-45deg)', 
                                        transformOrigin: 'top left', 
                                        marginTop: '5px', 
                                        fontSize: '9px',
                                        color: axisColor
                                    }}>
                                        {l}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    {isLarge && <div style={{textAlign: 'center', fontWeight: 'bold', marginTop: '10px', fontSize: '14px', color: textColor}}>Salesperson</div>}
                    {isLarge && <ZoomControls />}
                </div>
            )}

            {/* 6. System Embedded Programming (Column) */}
            {!isPreview && visual.title === "this is the system embeded programming" && (
                <div className="chart-container">
                    <div className="d-flex flex-row h-100">
                        <div className="y-axis-label" style={{color: axisColor}}>Actual R...</div>
                        <div className="y-axis" style={{color: axisColor}}>
                            <span>$20M</span><span>$0M</span>
                        </div>
                        <div className="plot-area">
                            {[
                                {h: '90%', l: ''}, {h: '60%', l: ''}, {h: '55%', l: ''}, 
                                {h: '50%', l: ''}, {h: '45%', l: ''}, {h: '40%', l: ''}, 
                                {h: '20%', l: ''}, {h: '18%', l: ''}
                            ].map((d, i) => (
                                <div key={i} className="column-bar-group">
                                    <div className="column-bar" style={{height: d.h, backgroundColor: colors[0]}}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="x-axis">
                        {['Con...', 'Bus...', 'Fin...', 'Wh...', 'Dur...', 'Tra...', 'Ins...', 'Veh...', 'Bro...'].map((l, i) => (
                            <span key={i} style={{transform: 'rotate(-90deg)', transformOrigin: 'top left', marginTop: '10px', fontSize: '9px', color: axisColor}}>{l}</span>
                        ))}
                    </div>
                </div>
            )}

            {/* Generic Renderer for Newly Created Visuals */}
            {!isSpecific && (isPreview || (visual.title && (visual.title.startsWith("New ") || visual.formatting))) && (
                <div className="chart-container" style={{justifyContent: 'center', alignItems: 'center', display: 'flex', height: '100%', width: '100%', flexDirection: 'column'}}>
                    
                    {/* Legend (Top) */}
                    {visual.formatting?.legend && (
                        <div className="d-flex justify-content-center w-100 mb-2" style={{fontSize: '10px', color: axisColor}}>
                            <div className="d-flex align-items-center me-3">
                                <div style={{width: '8px', height: '8px', backgroundColor: colors[0], borderRadius: '50%', marginRight: '4px'}}></div>
                                <span>{visual.fields?.Series || 'Series 1'}</span>
                            </div>
                            <div className="d-flex align-items-center">
                                <div style={{width: '8px', height: '8px', backgroundColor: colors[1], borderRadius: '50%', marginRight: '4px'}}></div>
                                <span>{visual.fields?.Series ? 'Series 2' : 'Series 2'}</span>
                            </div>
                        </div>
                    )}

                    {(() => {
                        // Helper to generate deterministic mock data based on fields
                        const getMockData = (count) => {
                            const seedStr = (visual.fields?.Category || '') + (visual.fields?.Y || '') + (visual.fields?.Series || '') + (visual.title || '');
                            const seed = seedStr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                            return Array.from({ length: count }, (_, i) => {
                                const x = Math.sin(seed + i * 123) * 10000;
                                return Math.floor((x - Math.floor(x)) * 60) + 30; // 30-90 range for better visuals
                            });
                        };
                        
                        const catLabel = visual.fields?.Category ? visual.fields.Category.substring(0, 3) : 'Cat';
                        const data8 = getMockData(8); // Increased to 8 points
                        const data3 = getMockData(3);

                        return (
                            <>
                                {(visual.type === "Column Chart" || visual.type === "columnChart") && (
                                    <div className="chart-container" style={{flex: 1, minHeight: 0, position: 'relative'}}>
                                        {visual.formatting?.grid && (
                                            <div className="grid-lines" style={{position: 'absolute', top: 0, left: '30px', right: 0, bottom: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pointerEvents: 'none'}}>
                                                <div style={{borderTop: '1px dashed #e0e0e0', width: '100%', height: '1px'}}></div>
                                                <div style={{borderTop: '1px dashed #e0e0e0', width: '100%', height: '1px'}}></div>
                                                <div style={{borderTop: '1px dashed #e0e0e0', width: '100%', height: '1px'}}></div>
                                                <div style={{borderTop: '1px dashed #e0e0e0', width: '100%', height: '1px'}}></div>
                                            </div>
                                        )}
                                        <div className="d-flex flex-row" style={{flex: 1, minHeight: 0, zIndex: 1}}>
                                            <div className="y-axis" style={{color: axisColor, fontSize: '10px', paddingRight: '5px'}}><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div>
                                            <div className="plot-area" style={{gap: '2%'}}>
                                                {data8.map((h, i) => (
                                                    <div key={i} className="column-bar-group" style={{width: '10%'}}
                                                        onMouseMove={(e) => handleMouseMove(e, `${catLabel} ${i+1}`, [
                                                            { label: visual.fields?.Series || 'Value', value: h, color: colors[0] }
                                                        ])}
                                                        onMouseLeave={handleMouseLeave}
                                                    >
                                                        {visual.formatting?.value && <span className="data-label" style={{marginBottom: '2px', color: textColor, fontSize: '10px'}}>{h}</span>}
                                                        <div className="column-bar" style={{height: `${h}%`, backgroundColor: colors[0], borderRadius: '2px 2px 0 0'}}></div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        {visual.formatting?.category !== false && (
                                            <div className="x-axis" style={{color: axisColor, paddingLeft: '30px', marginTop: '5px'}}>
                                                {data8.map((_, i) => <span key={i} style={{fontSize: '10px'}}>{catLabel} {i+1}</span>)}
                                            </div>
                                        )}
                                    </div>
                                )}
                                {(visual.type === "Bar Chart" || visual.type === "barChart") && (
                                    <div className="bar-chart-container" style={{flex: 1, minHeight: 0, overflowY: 'auto'}}>
                                        <div className="d-flex flex-row w-100 h-100">
                                            {visual.formatting?.category !== false && (
                                                <div className="bar-y-axis" style={{color: axisColor, paddingRight: '10px', justifyContent: 'space-around'}}>
                                                    {data8.map((_, i) => <span key={i} style={{fontSize: '10px'}}>{catLabel} {i+1}</span>)}
                                                </div>
                                            )}
                                            <div className="bar-plot-area" style={{justifyContent: 'space-around'}}>
                                                {data8.map((w, i) => (
                                                    <div key={i} className="d-flex align-items-center" style={{width: '100%', height: '10%'}}>
                                                        <div className="bar-horizontal" 
                                                            style={{width: `${w}%`, backgroundColor: colors[0], justifyContent: 'flex-end', paddingRight: '5px', borderRadius: '0 2px 2px 0'}}
                                                            onMouseMove={(e) => handleMouseMove(e, `${catLabel} ${i+1}`, [
                                                                { label: visual.fields?.Series || 'Value', value: w, color: colors[0] }
                                                            ])}
                                                            onMouseLeave={handleMouseLeave}
                                                        >
                                                            {visual.formatting?.value && <span style={{color: 'white', fontSize: '9px', fontWeight: 'bold'}}>{w}</span>}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {(visual.type === "Pie Chart" || visual.type === "pieChart") && (
                                    <div className="pie-container" style={{flexDirection: 'column', flex: 1, minHeight: 0}}>
                                        {(() => {
                                            const pieData = data8.slice(0, 4);
                                            const total = pieData.reduce((a, b) => a + b, 0);
                                            let currentAngle = 0;
                                            const gradientParts = pieData.map((val, i) => {
                                                const percentage = (val / total) * 100;
                                                const start = currentAngle;
                                                currentAngle += percentage;
                                                return `${colors[i % colors.length]} ${start}% ${currentAngle}%`;
                                            }).join(', ');
                                            
                                            return (
                                                <div className="pie-placeholder" style={{
                                                    width: '140px', height: '140px',
                                                    background: `conic-gradient(${gradientParts})`,
                                                    position: 'relative',
                                                    borderRadius: '50%',
                                                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                                                }}>
                                                    {visual.formatting?.value && (
                                                        <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none'}}>
                                                            <span style={{backgroundColor: 'rgba(255,255,255,0.7)', padding: '2px 4px', borderRadius: '4px', fontSize: '10px', color: '#333'}}>
                                                                {Math.round(pieData[0]/total*100)}%
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })()}
                                    </div>
                                )}
                                {(visual.type === "Line Chart" || visual.type === "lineChart") && (
                                    <div className="chart-container" style={{flex: 1, minHeight: 0, position: 'relative', display: 'flex', flexDirection: 'column'}}>
                                        <div className="d-flex flex-row" style={{flex: 1, minHeight: 0, zIndex: 1}}>
                                            <div className="y-axis" style={{color: axisColor, fontSize: '10px', paddingRight: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div>
                                            <div style={{flex: 1, minWidth: 0, overflowX: 'auto', overflowY: 'hidden', display: 'flex', flexDirection: 'column'}}>
                                                <div className="plot-area" style={{alignItems: 'stretch', width: `${zoom * 100}%`, minWidth: '100%'}}>
                                                    {visual.formatting?.grid && (
                                                        <div className="grid-lines" style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pointerEvents: 'none', zIndex: 0}}>
                                                            <div style={{borderTop: '1px dashed #e0e0e0', width: '100%', height: '1px'}}></div>
                                                            <div style={{borderTop: '1px dashed #e0e0e0', width: '100%', height: '1px'}}></div>
                                                            <div style={{borderTop: '1px dashed #e0e0e0', width: '100%', height: '1px'}}></div>
                                                            <div style={{borderTop: '1px dashed #e0e0e0', width: '100%', height: '1px'}}></div>
                                                        </div>
                                                    )}
                                                    <svg width="100%" height="100%" viewBox="0 0 500 300" preserveAspectRatio="none" style={{overflow: 'visible'}}>
                                                        {(() => {
                                                            const step = 500 / (data8.length - 1);
                                                            const pathD = data8.map((v, i) => `${i === 0 ? 'M' : 'L'}${i * step} ${300 - v*3}`).join(' ');
                                                            return (
                                                                <>
                                                                    {/* Hover Line */}
                                                                    {hoverLine !== null && (
                                                                        <line 
                                                                            x1={hoverLine} 
                                                                            y1={0} 
                                                                            x2={hoverLine} 
                                                                            y2={300} 
                                                                            stroke="#666" 
                                                                            strokeWidth="0.5" 
                                                                            strokeDasharray="4 4"
                                                                            style={{pointerEvents: 'none'}} 
                                                                        />
                                                                    )}
                                                                    
                                                                    <path d={pathD} fill="none" stroke={colors[0]} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                                    
                                                                    <rect 
                                                                        x="0" y="0" width="500" height="300"
                                                                        fill="transparent"
                                                                        style={{cursor: 'crosshair'}}
                                                                        onMouseMove={(e) => {
                                                                            const points = data8.map((v, i) => ({ x: i * step, v, i }));
                                                                            handleChartHover(e, points, 500, 300, (p, i) => ({
                                                                                title: `${catLabel} ${i+1}`,
                                                                                items: [{ label: visual.fields?.Series || 'Value', value: p.v, color: colors[0] }]
                                                                            }));
                                                                        }}
                                                                        onMouseLeave={handleMouseLeave}
                                                                    />

                                                                    {data8.map((v, i) => (
                                                                        <g key={i} style={{pointerEvents: 'none'}}>
                                                                            <circle cx={i * step} cy={300 - v*3} r="4" fill="white" stroke={colors[0]} strokeWidth="2" />
                                                                            {visual.formatting?.value && (
                                                                                <text x={i * step} y={300 - v*3 - 10} textAnchor="middle" fontSize="10" fill={textColor}>{v}</text>
                                                                            )}
                                                                        </g>
                                                                    ))}
                                                                </>
                                                            );
                                                        })()}
                                                    </svg>
                                                </div>
                                                {visual.formatting?.category !== false && (
                                                    <div className="x-axis" style={{color: axisColor, marginTop: '5px', display: 'flex', justifyContent: 'space-between', width: `${zoom * 100}%`, minWidth: '100%'}}>
                                                        {data8.map((_, i) => <span key={i} style={{fontSize: '10px'}}>{catLabel} {i+1}</span>)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <ZoomControls />
                                    </div>
                                )}

                                {(visual.type === "Area Chart" || visual.type === "areaChart") && (
                                    <div className="chart-container" style={{flex: 1, minHeight: 0, position: 'relative', display: 'flex', flexDirection: 'column'}}>
                                        <div className="d-flex flex-row" style={{flex: 1, minHeight: 0, zIndex: 1}}>
                                            <div className="y-axis" style={{justifyContent: 'space-between', height: '100%', paddingBottom: '20px', color: axisColor, fontSize: '10px', paddingRight: '5px', display: 'flex', flexDirection: 'column'}}>
                                                <span>100</span><span>75</span><span>50</span><span>25</span><span>0</span>
                                            </div>
                                            <div style={{flex: 1, minWidth: 0, overflowX: 'auto', overflowY: 'hidden', display: 'flex', flexDirection: 'column'}}>
                                                <div className="plot-area" style={{alignItems: 'stretch', position: 'relative', width: `${zoom * 100}%`, minWidth: '100%'}}>
                                                    {visual.formatting?.grid && (
                                                        <div className="grid-lines" style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pointerEvents: 'none', zIndex: 0}}>
                                                            <div style={{borderTop: '1px dashed #e0e0e0', width: '100%', height: '1px'}}></div>
                                                            <div style={{borderTop: '1px dashed #e0e0e0', width: '100%', height: '1px'}}></div>
                                                            <div style={{borderTop: '1px dashed #e0e0e0', width: '100%', height: '1px'}}></div>
                                                            <div style={{borderTop: '1px dashed #e0e0e0', width: '100%', height: '1px'}}></div>
                                                        </div>
                                                    )}
                                                    <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none" style={{overflow: 'visible'}}>
                                                        <defs>
                                                            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="0%" stopColor={colors[0]} stopOpacity="0.5"/>
                                                                <stop offset="100%" stopColor={colors[0]} stopOpacity="0.1"/>
                                                            </linearGradient>
                                                        </defs>
                                                        {(() => {
                                                            const step = 400 / (data8.length - 1);
                                                            const pathPoints = data8.map((v, i) => `${i * step} ${200 - v*2}`).join(' ');
                                                            
                                                            return (
                                                                <>
                                                                    {/* Hover Line */}
                                                                    {hoverLine !== null && (
                                                                        <line 
                                                                            x1={hoverLine} 
                                                                            y1={0} 
                                                                            x2={hoverLine} 
                                                                            y2={200} 
                                                                            stroke="#666" 
                                                                            strokeWidth="0.5" 
                                                                            strokeDasharray="4 4"
                                                                            style={{pointerEvents: 'none'}} 
                                                                        />
                                                                    )}

                                                                    <path d={`M0 200 L${pathPoints} V 200 Z`} fill="url(#areaGradient)" />
                                                                    <path d={`M${pathPoints.replace(/ /g, ',').split(',').map((c, i, arr) => i % 2 === 0 ? 'L' + c : c).join(' ').replace('ML', 'M')}`} fill="none" stroke={colors[0]} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                                    
                                                                    <rect 
                                                                        x="0" y="0" width="400" height="200"
                                                                        fill="transparent"
                                                                        style={{cursor: 'crosshair'}}
                                                                        onMouseMove={(e) => {
                                                                            const points = data8.map((v, i) => ({ x: i * step, v, i }));
                                                                            handleChartHover(e, points, 400, 200, (p, i) => ({
                                                                                title: `${catLabel} ${i+1}`,
                                                                                items: [{ label: visual.fields?.Series || 'Value', value: p.v, color: colors[0] }]
                                                                            }));
                                                                        }}
                                                                        onMouseLeave={handleMouseLeave}
                                                                    />

                                                                    {data8.map((v, i) => (
                                                                        <g key={i} style={{pointerEvents: 'none'}}>
                                                                            <circle cx={i * step} cy={200 - v*2} r="4" fill={colors[0]} stroke="white" strokeWidth="2" style={{pointerEvents: 'none'}} />
                                                                            {visual.formatting?.value && (
                                                                                <text x={i * step} y={200 - v*2 - 10} textAnchor="middle" fontSize="10" fill={textColor}>{v}</text>
                                                                            )}
                                                                        </g>
                                                                    ))}
                                                                </>
                                                            );
                                                        })()}
                                                    </svg>
                                                </div>
                                                {visual.formatting?.category !== false && (
                                                    <div className="x-axis" style={{color: axisColor, marginTop: '5px', display: 'flex', justifyContent: 'space-between', width: `${zoom * 100}%`, minWidth: '100%'}}>
                                                        {data8.map((_, i) => <span key={i} style={{fontSize: '10px'}}>{catLabel} {i+1}</span>)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <ZoomControls />
                                    </div>
                                )}
                            </>
                        );
                    })()}
                    {!["Column Chart", "Bar Chart", "Pie Chart", "Line Chart", "Area Chart", "columnChart", "barChart", "pieChart", "lineChart", "areaChart"].includes(visual.type) && (
                        <div style={{color: axisColor, fontSize: '12px'}}>Visual type not supported in mock mode: {visual.type}</div>
                    )}
                </div>
            )}

            {tooltip && (
                <div style={{
                    position: 'fixed',
                    left: tooltip.x,
                    top: tooltip.y,
                    backgroundColor: 'white',
                    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                    padding: '8px 12px',
                    zIndex: 9999,
                    pointerEvents: 'none',
                    minWidth: '200px',
                    borderRadius: '2px',
                    fontFamily: '"Segoe UI", sans-serif',
                }}>
                    <div style={{
                        fontSize: '12px', 
                        color: '#666', 
                        marginBottom: '6px',
                        paddingBottom: '4px',
                        borderBottom: '1px solid #eee'
                    }}>
                        {tooltip.title}
                    </div>
                    {tooltip.items.map((item, i) => (
                        <div key={i} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px'}}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <div style={{width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color, marginRight: '8px'}}></div>
                                <span style={{color: '#333'}}>{item.label}</span>
                            </div>
                            <span style={{fontWeight: '600', color: '#333'}}>{item.value}</span>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default VisualRenderer;
