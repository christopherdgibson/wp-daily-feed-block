import { __ } from "@wordpress/i18n";

import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { memo } from "react";
import type { RefObject} from 'react';

import './assets/css/dailyApi.css';
import './assets/css/calendar.css';
import { CalendarControl } from "./assets/js/calendar.js";
import { refreshRawJsonData, populateDailyApiData } from "./assets/js/dailyApi.js";
import { useRef, useEffect, useState } from "@wordpress/element";
import type { EditProps, ThemeStyles } from "@daily-feed-block/types";


import CalendarColorsPanel from "@components/ui-panels/CalendarColorsPanel";
import CardColorsPanel from "@components/ui-panels/CardColorsPanel";

interface CalendarMountProps {
    containerRef: RefObject<HTMLDivElement>;
    style?: React.CSSProperties;
}

const CalendarMount = memo(
    ({ containerRef, style }: CalendarMountProps) => (
        <div ref={containerRef} className="calendar" style={style}></div>
    ),
	() => true
    // (prevProps, nextProps) => prevProps.style.display === nextProps.style.display
);

export default function Edit({ attributes, setAttributes }: EditProps): JSX.Element {
	const { calendarBgColor, calendarFontColor, cardBgColor, cardFontColor, gradientColorLeft, gradientColorRight } =
    attributes;

	const [calendarInstance, setCalendarInstance] = useState<CalendarControl | null>(null);
	const blockProps = useBlockProps({ className: "api-data-container" });

	const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const apiDataRef = useRef<HTMLDivElement>(null);
	const calendarContainerRef = useRef<HTMLDivElement>(null);
	const rawJsonRef = useRef<HTMLDivElement>(null);
	const calendarRef = useRef<HTMLDivElement>(null);
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [isRawExpanded, setIsRawExpanded] = useState<boolean>(false);

	useEffect(() => {
    // prime the proxy with a cheap request on mount
	console.log("Prime the proxy with a cheap request on mount.")
    fetch(
      `${dailyFeedBlock.ajaxUrl}?action=api_proxy&url=https://today.zenquotes.io/api/01/01;`,
    ).catch(() => {}); // silently discard result
  }, []);

	useEffect(() => {
    if (!calendarInstance && calendarContainerRef.current) {
        const instance = new CalendarControl(calendarContainerRef.current);
        instance.setOnDateChange((date: Date) => {
            populateDailyApiData(containerRef.current, date);
			setSelectedDate(date);
        });
        setCalendarInstance(instance);
    }
	}, [calendarInstance]);

	const currentDay = selectedDate.getDate().toString();
	const currentMonth = selectedDate.toLocaleString("default", { month: "long" });

	return (
		<>
			<InspectorControls>
				{
					<CalendarColorsPanel
						attributes={attributes}
						setAttributes={setAttributes}
					/>
				}
				{
					<CardColorsPanel
						attributes={attributes}
						setAttributes={setAttributes}
					/>
				}
			</InspectorControls>
			<div {...blockProps}
				style={{
					"--base-bg": cardBgColor,
					"--font-selected": cardFontColor,
					"--accent-primary": gradientColorLeft,
					"--accent-secondary": gradientColorRight,
				} as ThemeStyles}>
					<svg width="0" height="0" style={{ position: "absolute" }}>
						<defs>
							<linearGradient id="iconGrad" x1="0" y1="0" x2="1" y2="1">
								<stop offset="0%" stopColor="var(--accent-primary)" />
								<stop offset="100%" stopColor="var(--accent-secondary)" />
							</linearGradient>
						</defs>
					</svg>
				<div
				className="card"
				ref={containerRef}
				>
					<div className="card-container">
						<div className={`calendar-overlay${isCalendarOpen ? " expanded" : ""}`}
								onClick={(e) => {
										 if (calendarRef?.current !== null && !calendarRef.current.contains(e.target as Node))
											setIsCalendarOpen(false);
										}}>
							<div ref={calendarContainerRef} className="calendar-container"
								style={{
										"--calendar-bg-color": calendarBgColor,
										"--calendar-font-color": calendarFontColor,
									} as React.CSSProperties}>
								
									<button className="close-popup">
										X
									</button>
									<CalendarMount
										containerRef={calendarRef}
									/>
							</div>
						</div>
						<div className="api-data-column">
							<div className="api-data-date-container">
								<div className="api-data-date">
									Daily feed for {currentDay} {currentMonth}
								</div>
								<button className="btn-calendar-toggle"
									onClick={(e) => {
										// e.preventDefault();
										setIsCalendarOpen(true);
										e.stopPropagation();
									}}
								>
									<div className="calendar-icon">
										<span className="tool-tip">Open calendar to choose date</span>
										<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
											<g fill="url(#iconGrad)">
												<path d="M24,29H8a5,5,0,0,1-5-5V10A5,5,0,0,1,8,5H24a5,5,0,0,1,5,5V24A5,5,0,0,1,24,29ZM8,7a3,3,0,0,0-3,3V24a3,3,0,0,0,3,3H24a3,3,0,0,0,3-3V10a3,3,0,0,0-3-3Z" />
												<path d="M24,25H20a1,1,0,0,1-1-1V20a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v4A1,1,0,0,1,24,25Zm-3-2h2V21H21Z" />
												<path d="M28,13H4a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Z" />
												<path d="M11,9a1,1,0,0,1-1-1V4a1,1,0,0,1,2,0V8A1,1,0,0,1,11,9Z" />
												<path d="M21,9a1,1,0,0,1-1-1V4a1,1,0,0,1,2,0V8A1,1,0,0,1,21,9Z" />
											</g>
										</svg>
									</div>
								</button>
							</div>
							<div className="api-data" ref={apiDataRef}>
								Loading api data...
							</div>
						</div>
					</div>
				</div>
				<div className="raw-json-btn-container">
					<button className="btn-raw-json primary"
						onClick={(e) => {
							setIsRawExpanded(true);
							refreshRawJsonData(rawJsonRef.current, selectedDate);
							e.stopPropagation();
						}}
					>
						Refresh raw data
					</button>
					<button className="btn-raw-json secondary"
						onClick={(e) => {
							setIsRawExpanded(!isRawExpanded);
						}}
					>
						{isRawExpanded ? " Hide " : "Show "}raw data
					</button>
				</div>
				<div ref={rawJsonRef} className={`raw-json-dta${isRawExpanded ? " expanded" : ""}`}>
					Click "Refresh raw data" to populate.
				</div>
			</div>
		</>
	);
}
