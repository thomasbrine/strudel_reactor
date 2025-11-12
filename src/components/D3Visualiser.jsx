import { subscribe, unsubscribe } from "../utils/console-monkey-patch";
import { useState, useEffect, useRef } from "react";
import * as d3 from 'd3';

/**
 * Component that visualises values from the strudel logs using D3
 */
export function D3Visualiser({instruments}) {

    // Store effect values that are extracted from strudel logs
    const [EffectValuesForD3, setEffectValuesForD3] = useState([]);

    // Selected effect value to be graphed
    const [selectedEffect, setSelectedEffect] = useState("gain");

    // Store the raw strudel log data
    const [logData, setLogData] = useState([]);

    // Reference to the SVG element
    const svgRef = useRef(null);

    // Get the currently logged instrument
    const loggedInstrument = instruments.instrumentValues.find(
        instrument => instrument.id === instruments.selectedLoggingInstrument
    );

    // Get effects currently on the logged instrument
    const availableEffects = loggedInstrument ? loggedInstrument.effects : [];

    // Update selected effect when logged instrument changes
    useEffect(() => {
        if (availableEffects.length > 0) {
            setSelectedEffect(availableEffects[0].name);
        }
    }, [availableEffects, instruments.selectedLoggingInstrument]);

    // Subscribe to d3Data events and save strudel logs to logData
    useEffect(() => {
        const handleLogData = (event) => {
            setLogData(event.detail);
        }

        subscribe("d3Data", handleLogData);

        // Unsubscribe when component is removed
        return () => {
            unsubscribe("d3Data", handleLogData);
        }
    }, [])

    // Extract effect values whenever the log data updates
    useEffect(() => {
        const effectValues = logData.map(item => {
            let effectName = selectedEffect;
            if (selectedEffect === "lpf") {
                effectName = "cutoff";
            }
            let regex = `\\s${effectName}:([\\d.]+)`
            const match = item.match(new RegExp(regex));
            return match ? parseFloat(match[1]) : 0;
        });

        setEffectValuesForD3(effectValues);
    }, [logData, selectedEffect])

    // Render the D3 line chart whenever data updates
    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        svg.html("");

        let w = svg.node().getBoundingClientRect().width;
        let h = svg.node().getBoundingClientRect().height;

        let barWidth = w / EffectValuesForD3.length;

        // Add padding to the maxValue for aesthetics
        const maxValue = d3.max(EffectValuesForD3) + d3.max(EffectValuesForD3)/20;

        // Create scale for y-axis
        let yScale = d3.scaleLinear()
            .domain([0, maxValue])
            .range([h, 0]);

        let chartGroup = svg.append('g')
            .classed('chartGroup', true)
            .attr('transform', 'translate(40, 10)');

        // Draw the line chart
        chartGroup
            .append('path')
            .datum(EffectValuesForD3)
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('stroke-width', 4)
            .attr('d', d3.line()
                    .x((d, i) => i * barWidth)
                    .y((d) => yScale(d))
                );

        // add y axis
        let yAxis = d3.axisLeft(yScale);
        chartGroup.append('g')
                .classed('axis y', true)
                .call(yAxis);


    }, [EffectValuesForD3])

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">

                <div className="d-flex gap-2 align-items-center">
                    {/* Instrument selector dropdown */}
                    <div className="d-flex align-items-center gap-2">
                        <label className="text-muted small">Instrument:</label>
                        <select
                            className="form-select form-select-sm"
                            value={instruments.selectedLoggingInstrument}
                            onChange={(e) => instruments.setSelectedLoggingInstrument(e.target.value)}
                        >
                            <option value="">None</option>
                            {instruments.instrumentValues.map(instrument => (
                                <option key={instrument.id} value={instrument.id}>
                                    {instrument.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Effect selector dropdown that is only shown if instrument is selected */}
                    {loggedInstrument && (
                        <div className="d-flex align-items-center gap-2">
                            <label className="text-muted small">Effect:</label>
                            <select
                                className="form-select form-select-sm"
                                value={selectedEffect}
                                onChange={(e) => setSelectedEffect(e.target.value)}
                            >
                                {availableEffects.map(effect => (
                                    <option key={effect.id} value={effect.name}>
                                        {effect.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="card-body">
                <svg ref={svgRef} width="100%" height="300px"></svg>
            </div>
        </div>
    );
}