import { subscribe, unsubscribe } from "../utils/console-monkey-patch";
import { useState, useEffect, useRef } from "react";
import * as d3 from 'd3';

/**
 * Component that visualises values from the strudel logs using D3
 */
export function D3Visualiser() {

    // Store effect values that are extracted from strudel logs
    const [EffectValuesForD3, setEffectValuesForD3] = useState([]);

    // Selected effect value to be graphed
    const [selectedEffect, setSelectedEffect] = useState("gain");

    // Store the raw strudel log data
    const [logData, setLogData] = useState([]);

    // Reference to the SVG element
    const svgRef = useRef(null);

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
            let regex = `\\s${selectedEffect}:([\\d.]+)`
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

        // Don't render if there is no data
        if (!EffectValuesForD3 || EffectValuesForD3.length === 0) {
            return;
        }

        let barWidth = w / EffectValuesForD3.length;

        // Add padding to the maxValue for aesthetics
        const maxValue = d3.max(EffectValuesForD3) + d3.max(EffectValuesForD3)/20;

        // Create scale for y-axis
        let yScale = d3.scaleLinear()
            .domain([0, maxValue])
            .range([h, 0]);

        let chartGroup = svg.append('g').classed('chartGroup', true);

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

    }, [EffectValuesForD3])

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between">
                <h5 className="mb-0">D3 Visualizer</h5>
                <select value={selectedEffect} onChange={(e) => setSelectedEffect(e.target.value)}>
                    <option value="gain">Gain</option>
                    <option value="room">Room</option>
                    <option value="cutoff">Cutoff (lpf)</option>
                </select>
            </div>
            <div className="card-body">
                <svg ref={svgRef} width="100%" height="300px"></svg>
            </div>
        </div>
    );
}