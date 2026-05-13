/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import {
	Button,
	SegmentedControl,
} from "@wordpress/components";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
// import "./editor.scss";

import './assets/css/dailyApi.css';
import './assets/css/calendar.css';
import { CalendarControl } from "./assets/js/calendar.js";
import { refreshRawJsonData, populateDailyApiData } from "./assets/js/dailyApi.js";
import { useRef, useEffect, useState } from "@wordpress/element";
import CalendarColorsPanel from "@components/ui-panels/CalendarColorsPanel";
import CardColorsPanel from "@components/ui-panels/CardColorsPanel";

const CalendarMount = React.memo(
    ({ containerRef, style }) => (
        <div ref={containerRef} class="calendar" style={style}></div>
    ),
	() => true
    // (prevProps, nextProps) => prevProps.style.display === nextProps.style.display
);

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { calendarBgColor, calendarFontColor, cardBgColor, cardFontColor, gradientColorLeft, gradientColorRight } =
    attributes;

	const [calendarInstance, setCalendarInstance] = useState(null);
	const blockProps = useBlockProps({ className: "api-data-container" });

	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const containerRef = useRef();
	const apiDataRef = useRef();
	const calendarContainerRef = useRef();
	const rawJsonRef = useRef();
	const calendarRef = useRef();
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [isRawExpanded, setIsRawExpanded] = useState(false);

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
        instance.setOnDateChange((date) => {
            populateDailyApiData(containerRef.current, date);
			setSelectedDate(date);
        });
        setCalendarInstance(instance);
    }
	}, [calendarInstance]);

	// const currentDate = new Date();
	// const currentDay = currentDate.getDate().toString();
	// const currentMonth = currentDate.toLocaleString("default", { month: "long" });
	const currentDay = selectedDate.getDate().toString();
	const currentMonth = selectedDate.toLocaleString("default", { month: "long" });

	function DailyApi() {
		return (
			null
		);
	}

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
				}}>
					<svg width="0" height="0" style={{ position: "absolute" }}>
						<defs>
							<linearGradient id="iconGrad" x1="0" y1="0" x2="1" y2="1">
								<stop offset="0%" stopColor="var(--accent-primary)" />
								<stop offset="100%" stopColor="var(--accent-secondary)" />
							</linearGradient>
						</defs>
					</svg>
				<div
				class="card"
				ref={containerRef}
				>
					<div className="card-container">
						<div class={`calendar-overlay${isCalendarOpen ? " expanded" : ""}`}
								onClick={(e) => {
										 if (!calendarRef.current.contains(e.target))
											setIsCalendarOpen(false);
										}}>
							<div ref={calendarContainerRef} class="calendar-container"
								style={{
										"--calendar-bg-color": calendarBgColor,
										"--calendar-font-color": calendarFontColor,
									}}>
								
									<button class="close-popup">
										X
									</button>
									<CalendarMount
										containerRef={calendarRef}
									/>
							</div>
						</div>
						<div className="api-data-column">
							<div class="api-data-date-container">
								<div class="api-data-date">
									Daily feed for {currentDay} {currentMonth}
								</div>
								<button className="btn-calendar-toggle"
									onClick={(e) => {
										// e.preventDefault();
										setIsCalendarOpen(true);
										e.stopPropagation();
									}}
								>
									<div class="calendar-icon">
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
							<div class="api-data" ref={apiDataRef}>
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
