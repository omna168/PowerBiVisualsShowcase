import React from 'react';

const VisualRenderer = ({ visual, isLarge, theme, isDarkMode, isPreview }) => {
    const colors = theme ? theme.dataColors : ['#0078D4', '#102576', '#E06C36', '#6B007B', '#E6389F'];
    const textColor = isDarkMode ? '#ffffff' : '#333333';
    const axisColor = isDarkMode ? '#cccccc' : '#666666';
    const gridColor = isDarkMode ? '#484644' : '#e6e6e6';

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
                                <div key={i} className="column-bar-group">
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
                            <div className="bar-horizontal" style={{width: '80%', backgroundColor: colors[0]}}>$33M</div>
                            <div className="bar-horizontal" style={{width: '45%', backgroundColor: colors[0]}}>$19M</div>
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
                    <div className="pie-label" style={{top: '10%', right: '0', color: textColor}}>Closed Won<br/>124</div>
                    <div className="pie-label" style={{bottom: '10%', right: '10%', color: textColor}}>Close... 88</div>
                    <div className="pie-label" style={{bottom: '20%', left: '0', color: textColor}}>Quote Sent<br/>61</div>
                    <div className="pie-label" style={{top: '10%', left: '0', color: textColor}}>Meeting Sch...<br/>46</div>
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
                        <div className="plot-area" style={{alignItems: 'stretch', position: 'relative'}}>
                            <svg className="line-chart-svg" viewBox="0 0 800 400" preserveAspectRatio="none" style={{overflow: 'visible'}}>
                                {/* Grid lines for Large View */}
                                {isLarge && (
                                    <>
                                        <line x1="0" y1="0" x2="800" y2="0" stroke={gridColor} strokeWidth="1" />
                                        <line x1="0" y1="200" x2="800" y2="200" stroke={gridColor} strokeWidth="1" />
                                        <line x1="0" y1="400" x2="800" y2="400" stroke={gridColor} strokeWidth="1" />
                                    </>
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
                                    <g key={i}>
                                        {!isLarge && <circle cx={p.x} cy={p.y} r="3" fill={colors[0]} />}
                                        <text 
                                            x={p.x} 
                                            y={p.y - 15} 
                                            className="line-point-label" 
                                            style={isLarge ? {fontSize: '14px', fill: axisColor} : {fill: axisColor}}
                                        >
                                            {p.v}
                                        </text>
                                    </g>
                                ))}
                            </svg>
                        </div>
                    </div>
                    <div className="x-axis" style={isLarge ? {borderTop: 'none', marginTop: '0', paddingTop: '10px'} : {}}>
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
                    {isLarge && <div style={{textAlign: 'center', fontWeight: 'bold', marginTop: '10px', fontSize: '14px', color: textColor}}>Salesperson</div>}
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
            {(isPreview || (visual.title && (visual.title.startsWith("New ") || visual.formatting))) && (
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
                                                    <div key={i} className="column-bar-group" style={{width: '10%'}}>
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
                                                        <div className="bar-horizontal" style={{width: `${w}%`, backgroundColor: colors[0], justifyContent: 'flex-end', paddingRight: '5px', borderRadius: '0 2px 2px 0'}}>
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
                                    <div className="chart-container" style={{flex: 1, minHeight: 0, position: 'relative'}}>
                                        {visual.formatting?.grid && (
                                            <div className="grid-lines" style={{position: 'absolute', top: 0, left: '30px', right: 0, bottom: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pointerEvents: 'none', zIndex: 0}}>
                                                <div style={{borderTop: '1px dashed #e0e0e0', width: '100%', height: '1px'}}></div>
                                                <div style={{borderTop: '1px dashed #e0e0e0', width: '100%', height: '1px'}}></div>
                                                <div style={{borderTop: '1px dashed #e0e0e0', width: '100%', height: '1px'}}></div>
                                                <div style={{borderTop: '1px dashed #e0e0e0', width: '100%', height: '1px'}}></div>
                                            </div>
                                        )}
                                        <div className="d-flex flex-row" style={{flex: 1, minHeight: 0, zIndex: 1}}>
                                            <div className="y-axis" style={{color: axisColor, fontSize: '10px', paddingRight: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div>
                                            <div className="plot-area" style={{alignItems: 'stretch', flex: 1}}>
                                                <svg width="100%" height="100%" viewBox="0 0 500 300" preserveAspectRatio="none" style={{overflow: 'visible'}}>
                                                    {(() => {
                                                        const step = 500 / (data8.length - 1);
                                                        const pathD = data8.map((v, i) => `${i === 0 ? 'M' : 'L'}${i * step} ${300 - v*3}`).join(' ');
                                                        return (
                                                            <>
                                                                <path d={pathD} fill="none" stroke={colors[0]} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                                {data8.map((v, i) => (
                                                                    <g key={i}>
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
                                        </div>
                                        {visual.formatting?.category !== false && (
                                            <div className="x-axis" style={{color: axisColor, paddingLeft: '30px', marginTop: '5px', display: 'flex', justifyContent: 'space-between'}}>
                                                {data8.map((_, i) => <span key={i} style={{fontSize: '10px'}}>{catLabel} {i+1}</span>)}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {(visual.type === "Area Chart" || visual.type === "areaChart") && (
                                    <div className="chart-container" style={{flex: 1, minHeight: 0, position: 'relative'}}>
                                        {visual.formatting?.grid && (
                                            <div className="grid-lines" style={{position: 'absolute', top: 0, left: '30px', right: 0, bottom: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pointerEvents: 'none', zIndex: 0}}>
                                                <div style={{borderTop: '1px dashed #e0e0e0', width: '100%', height: '1px'}}></div>
                                                <div style={{borderTop: '1px dashed #e0e0e0', width: '100%', height: '1px'}}></div>
                                                <div style={{borderTop: '1px dashed #e0e0e0', width: '100%', height: '1px'}}></div>
                                                <div style={{borderTop: '1px dashed #e0e0e0', width: '100%', height: '1px'}}></div>
                                            </div>
                                        )}
                                        <div className="d-flex flex-row" style={{flex: 1, minHeight: 0, zIndex: 1}}>
                                            <div className="y-axis" style={{justifyContent: 'space-between', height: '100%', paddingBottom: '20px', color: axisColor, fontSize: '10px', paddingRight: '5px', display: 'flex', flexDirection: 'column'}}>
                                                <span>100</span><span>75</span><span>50</span><span>25</span><span>0</span>
                                            </div>
                                            <div className="plot-area" style={{alignItems: 'stretch', position: 'relative', flex: 1}}>
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
                                                                <path d={`M0 200 L${pathPoints} V 200 Z`} fill="url(#areaGradient)" />
                                                                <path d={`M${pathPoints.replace(/ /g, ',').split(',').map((c, i, arr) => i % 2 === 0 ? 'L' + c : c).join(' ').replace('ML', 'M')}`} fill="none" stroke={colors[0]} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                                
                                                                {data8.map((v, i) => (
                                                                    <g key={i}>
                                                                        <circle cx={i * step} cy={200 - v*2} r="4" fill={colors[0]} stroke="white" strokeWidth="2" />
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
                                        </div>
                                        {visual.formatting?.category !== false && (
                                            <div className="x-axis" style={{color: axisColor, paddingLeft: '30px', marginTop: '5px', display: 'flex', justifyContent: 'space-between'}}>
                                                {data8.map((_, i) => <span key={i} style={{fontSize: '10px'}}>{catLabel} {i+1}</span>)}
                                            </div>
                                        )}
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
        </>
    );
};

export default VisualRenderer;
