import React from 'react';

const VisualRenderer = ({ visual, isLarge, theme, isDarkMode }) => {
    const colors = theme ? theme.dataColors : ['#0078D4', '#102576', '#E06C36', '#6B007B', '#E6389F'];
    const textColor = isDarkMode ? '#ffffff' : '#333333';
    const axisColor = isDarkMode ? '#cccccc' : '#666666';
    const gridColor = isDarkMode ? '#484644' : '#e6e6e6';

    return (
        <>
            {/* 1. Actual Revenue by Industry */}
            {(visual.title === "Actual Revenue by Industry" || (visual.fields?.Category === 'Industry' && visual.fields?.Y === 'Actual Revenue')) && (
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
            {(visual.title === "Number of Opportunities by Industry" || (visual.fields?.Category === 'Industry' && visual.fields?.Y === 'Number of Opportunities')) && (
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
            {visual.title === "Estimated Revenue by Salesperson" && (
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
            {visual.title === "Number of Opportunities by Opportunity Status" && (
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
            {visual.title === "Number of Opportunities by Salesperson" && (
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
            {visual.title === "this is the system embeded programming" && (
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
            {(visual.title && (visual.title.startsWith("New ") || visual.formatting)) && (
                <div className="chart-container" style={{justifyContent: 'center', alignItems: 'center', display: 'flex', height: '100%', width: '100%', flexDirection: 'column'}}>
                    
                    {/* Legend (Top) */}
                    {visual.formatting?.legend && (
                        <div className="d-flex justify-content-center w-100 mb-2" style={{fontSize: '10px', color: axisColor}}>
                            <div className="d-flex align-items-center me-3">
                                <div style={{width: '8px', height: '8px', backgroundColor: colors[0], borderRadius: '50%', marginRight: '4px'}}></div>
                                <span>Series 1</span>
                            </div>
                            <div className="d-flex align-items-center">
                                <div style={{width: '8px', height: '8px', backgroundColor: colors[1], borderRadius: '50%', marginRight: '4px'}}></div>
                                <span>Series 2</span>
                            </div>
                        </div>
                    )}

                    {(visual.type === "Column Chart" || visual.type === "columnChart") && (
                        <div className="chart-container">
                            <div className="d-flex flex-row h-100">
                                <div className="y-axis" style={{color: axisColor}}><span>100</span><span>50</span><span>0</span></div>
                                <div className="plot-area">
                                    {[60, 80, 45, 90, 30].map((h, i) => (
                                        <div key={i} className="column-bar-group" style={{width: '15%'}}>
                                            {visual.formatting?.value && <span className="data-label" style={{marginBottom: '2px', color: textColor}}>{h}</span>}
                                            <div className="column-bar" style={{height: `${h}%`, backgroundColor: colors[0]}}></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {visual.formatting?.category !== false && (
                                <div className="x-axis" style={{color: axisColor}}><span>A</span><span>B</span><span>C</span><span>D</span><span>E</span></div>
                            )}
                        </div>
                    )}
                    {(visual.type === "Bar Chart" || visual.type === "barChart") && (
                        <div className="bar-chart-container">
                            <div className="d-flex flex-row w-100 h-100">
                                {visual.formatting?.category !== false && (
                                    <div className="bar-y-axis" style={{color: axisColor}}><span>Cat A</span><span>Cat B</span><span>Cat C</span></div>
                                )}
                                <div className="bar-plot-area">
                                    {[
                                        {w: 70, c: colors[0]}, 
                                        {w: 40, c: colors[0]}, 
                                        {w: 90, c: colors[0]}
                                    ].map((d, i) => (
                                        <div key={i} className="d-flex align-items-center" style={{width: '100%', marginBottom: '10px'}}>
                                            <div className="bar-horizontal" style={{width: `${d.w}%`, backgroundColor: d.c, justifyContent: 'center'}}>
                                                {visual.formatting?.value && <span style={{color: 'white', fontSize: '9px'}}>{d.w}</span>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    {(visual.type === "Pie Chart" || visual.type === "pieChart") && (
                        <div className="pie-container" style={{flexDirection: 'column'}}>
                            <div className="pie-placeholder" style={{
                                width: '120px', height: '120px',
                                background: `conic-gradient(${colors[0]} 0% 33%, ${colors[1]} 33% 66%, ${colors[2]} 66% 100%)`,
                                position: 'relative'
                            }}>
                                {visual.formatting?.value && (
                                    <>
                                        <span style={{position: 'absolute', top: '20%', right: '20%', color: 'white', fontSize: '10px'}}>33%</span>
                                        <span style={{position: 'absolute', bottom: '10%', left: '40%', color: 'white', fontSize: '10px'}}>34%</span>
                                        <span style={{position: 'absolute', top: '20%', left: '20%', color: 'white', fontSize: '10px'}}>33%</span>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                    {(visual.type === "Line Chart" || visual.type === "lineChart") && (
                        <div className="chart-container">
                            <div className="plot-area" style={{alignItems: 'stretch'}}>
                                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{overflow: 'visible'}}>
                                    <path d="M0 80 L25 40 L50 60 L75 20 L100 50" fill="none" stroke={colors[0]} strokeWidth="2" />
                                    {[
                                        {x: 0, y: 80, v: 20}, {x: 25, y: 40, v: 60}, {x: 50, y: 60, v: 40}, 
                                        {x: 75, y: 20, v: 80}, {x: 100, y: 50, v: 50}
                                    ].map((p, i) => (
                                        <g key={i}>
                                            <circle cx={p.x} cy={p.y} r="2" fill={colors[0]} />
                                            {visual.formatting?.value && (
                                                <text x={p.x} y={p.y - 5} textAnchor="middle" fontSize="8" fill={textColor}>{p.v}</text>
                                            )}
                                        </g>
                                    ))}
                                </svg>
                            </div>
                            {visual.formatting?.category !== false && (
                                <div className="x-axis" style={{color: axisColor}}><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span></div>
                            )}
                        </div>
                    )}
                    {(visual.type === "Area Chart" || visual.type === "areaChart") && (
                        <div className="chart-container">
                            <div className="d-flex flex-row h-100">
                                <div className="y-axis" style={{justifyContent: 'space-between', height: '100%', paddingBottom: '20px', color: axisColor}}>
                                    <span>100</span><span>50</span><span>0</span>
                                </div>
                                <div className="plot-area" style={{alignItems: 'stretch', position: 'relative', flex: 1}}>
                                    <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none" style={{overflow: 'visible'}}>
                                        <defs>
                                            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor={colors[0]} stopOpacity="0.5"/>
                                                <stop offset="100%" stopColor={colors[0]} stopOpacity="0.1"/>
                                            </linearGradient>
                                        </defs>
                                        <path d="M0 200 L0 120 L80 80 L160 140 L240 60 L320 100 L400 40 V 200 Z" fill="url(#areaGradient)" />
                                        <path d="M0 120 L80 80 L160 140 L240 60 L320 100 L400 40" fill="none" stroke={colors[0]} strokeWidth="3" />
                                        
                                        {/* Data Points */}
                                        {[
                                            {x: 0, y: 120, v: 40}, {x: 80, y: 80, v: 60}, {x: 160, y: 140, v: 30}, 
                                            {x: 240, y: 60, v: 70}, {x: 320, y: 100, v: 50}, {x: 400, y: 40, v: 80}
                                        ].map((p, i) => (
                                            <g key={i}>
                                                <circle cx={p.x} cy={p.y} r="4" fill={colors[0]} stroke="white" strokeWidth="2" />
                                                {visual.formatting?.value && (
                                                    <text x={p.x} y={p.y - 10} textAnchor="middle" fontSize="10" fill={textColor}>{p.v}</text>
                                                )}
                                            </g>
                                        ))}
                                    </svg>
                                </div>
                            </div>
                            {visual.formatting?.category !== false && (
                                <div className="x-axis" style={{marginTop: '10px', color: axisColor}}>
                                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                                </div>
                            )}
                        </div>
                    )}
                    {!["Column Chart", "Bar Chart", "Pie Chart", "Line Chart", "Area Chart", "columnChart", "barChart", "pieChart", "lineChart", "areaChart"].includes(visual.type) && (
                        <div style={{color: axisColor, fontSize: '12px'}}>Visual type not supported in mock mode: {visual.type}</div>
                    )}
                </div>
            )}
        </>
    );
};

export default VisualRenderer;
