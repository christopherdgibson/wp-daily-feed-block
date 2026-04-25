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
	ButtonGroup,
	ColorPalette,
	ColorPicker,
	DuotonePicker,
	DuotoneSwatch,
	Modal,
	PanelBody,
	SegmentedControl,
} from "@wordpress/components";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
// import "./editor.scss";
import blockMetadata from "./block.json";
import './assets/css/dailyApi.css';
import './assets/css/calendar.css';
import { CalendarControl } from "./assets/js/calendar.js";
import { fetchDailyApiData } from "./assets/js/dailyApi.js";
import { useRef, useEffect, useState } from "@wordpress/element";

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
	const DEFAULT_CAL_FONT_COLOR =
		blockMetadata.attributes.calendarFontColor.default;
	const DEFAULT_CAL_BG_COLOR = blockMetadata.attributes.calendarBgColor.default;
	const {
		dividerColorLeft,
		dividerColorRight,
		cardBgColor,
		cardFontColor,
		} = attributes;
	const DEFAULT_FONT_COLOR = blockMetadata.attributes.cardFontColor.default;
	const DEFAULT_BG_COLOR = blockMetadata.attributes.cardBgColor.default;
	const DEFAULT_LEFT_COLOR =
		blockMetadata.attributes.dividerColorLeft.default;
	const DEFAULT_RIGHT_COLOR =
		blockMetadata.attributes.dividerColorRight.default;
	const THEME_ATTRIBUTES = {
		blue:   { dividerColorLeft: '#1a56d6', dividerColorRight: '#e07b20', cardFontColor: '#1a56d6', cardBgColor: '#c2ddf7' },
		forest: { dividerColorLeft: '#1a6b3c', dividerColorRight: '#c4962a', cardFontColor: '#1a6b3c', cardBgColor: '#b8dfc8' },
		plum:   { dividerColorLeft: '#5b2d8e', dividerColorRight: '#c0392b', cardFontColor: '#5b2d8e', cardBgColor: '#d4bfee' },
		slate:  { dividerColorLeft: '#2c4a6e', dividerColorRight: '#e05c3a', cardFontColor: '#2c4a6e', cardBgColor: '#b8cfe0' }
	};
	
	const DEFAULT_DUOTONE_COLORS = [DEFAULT_LEFT_COLOR, DEFAULT_RIGHT_COLOR];
	const [duotone, setDuotone] = useState(DEFAULT_DUOTONE_COLORS);
	const DUOTONE_PALETTE = [
		{
			colors: DEFAULT_DUOTONE_COLORS,
			name: "Default",
			slug: "default-theme-colors",
		},
		{
			colors: ["#1a56d6", "#e07b20"], // #c2ddf7;
			name: "Blue and orange",
			slug: "blue-orange",
		},
		{
			colors: ["#1a6b3c", "#c4962a"], // #b8dfc8;
			name: "Forest and gold",
			slug: "forest-gold",
		},
		{
			colors: ["#5b2d8e", "#c0392b"], // #d4bfee;
			name: "Plum and red",
			slug: "plum-red",
		},
		{
			colors: ["#2c4a6e", "#e05c3a"], // #b8cfe0;
			name: "Slate and salmon",
			slug: "slate-salmon",
		},
		{
			colors: ["#8c00b7", "#fcff41"],
			name: "Purple and yellow",
			slug: "purple-yellow",
		},
		{
			colors: ["#6e0edc", "#b7b7b7"],
			name: "Purple and grey",
			slug: "purple-grey",
		},
		{	colors: ["#000097", "#ff4747"],
			name: "Blue and red",
			slug: "blue-red" },
		{
			colors: ["#000097", "#82c1f2"],
			name: "Blue and light blue",
			slug: "blue-light-blue",
		},
	];

	const { calendarBgColor, calendarFontColor } = attributes;
	const [activeCalendarTab, setActiveCalendarTab] = useState("background");
	const [activeTab, setActiveTab] = useState("presets");
	const [activeSubTab, setActiveSubTab] = useState("background");
	const [activeTheme, setActiveTheme] = useState("default-colors");
	const [isModalOpenDefaultCalendar, setIsModalOpenDefaultCalendar] = useState(false);
	const [isModalOpenDefaultCard, setIsModalOpenDefaultCard] = useState(false);
	const [calendarInstance, setCalendarInstance] = useState(null);
	const blockProps = useBlockProps({ className: "api-data-container" });
	// const calendarInstance = useRef();
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const containerRef = useRef();
	const apiDataRef = useRef();
	const calendarContainerRef = useRef();
	const calendarRef = useRef();
	const duotoneRef = useRef(null);

	// useEffect(() => {
	// 	console.log('useEffect ran');
	// 	console.log('RENDER', calendarInstance.current);
	// 	const placeholderApiData = containerRef.current?.querySelector(".api-data");
	// 	console.log("placeholderApiData (edit.js):", placeholderApiData);
	// 	const placeholderDate =
	// 		containerRef.current?.querySelector(".api-data-date");
	// 	console.log("placeholderDate (edit.js):", placeholderDate.innerHTML);
	// 	console.log('calendarInstance.current (edit.js): ', calendarInstance.current);
	// 	if (placeholderApiData && placeholderDate && !calendarInstance.current) {
	// 		calendarInstance.current = new CalendarControl(calendarContainerRef.current);
	// 		calendarInstance.current.setOnDateChange((date) => {
	// 			fetchDailyApiData(containerRef.current, date);
	// 			console.log("Main logic callback (useEffect):", date);
	// 		});
	// 	}
	// }, []);

	useEffect(() => {
    if (!calendarInstance && calendarContainerRef.current) {
        const instance = new CalendarControl(calendarContainerRef.current);
        instance.setOnDateChange((date) => {
            fetchDailyApiData(containerRef.current, date);
        });
        setCalendarInstance(instance);
    }
	}, [calendarInstance]);

	// Remove unused Duotone items
	useEffect(() => {
		if (!duotoneRef.current) return;
		duotoneRef.current.querySelectorAll('.components-color-list-picker__swatch-button').forEach(btn => {
			btn.remove();
		});
		duotoneRef.current.querySelector('button.components-circular-option-picker__clear')?.remove();
	});

	const currentDate = new Date();
	const currentDay = currentDate.getDate().toString();
	const currentMonth = currentDate.toLocaleString("default", { month: "long" });

	function DailyApi() {
		return (
			null
		);
	}

	function calendarColorsPanel() {
		return (
			<PanelBody title="Calendar Design">
				<ButtonGroup>
					{addActiveCalendarTab("background", "Background")}
					{addActiveCalendarTab("text", "Text")}
					{addActiveCalendarTab("defaults", "Defaults")}
				</ButtonGroup>
				{activeCalendarTab === "background" && (
					<ColorPicker
						color={calendarBgColor}
						onChangeComplete={(value) =>
							setAttributes({ calendarBgColor: value.hex })
						}
						disableAlpha
					/>
				)}
				{activeCalendarTab === "text" && (
					<ColorPicker
						color={calendarFontColor}
						onChangeComplete={(value) =>
							setAttributes({ calendarFontColor: value.hex })
						}
						disableAlpha
					/>
				)}
				{activeCalendarTab === "defaults" && (
					<div style={{ marginTop: "1em", textAlign: "center" }}>
						<Button
							variant="primary"
							onClickCapture={() => setIsModalOpenDefaultCalendar(true)}
						>
							Restore to defaults
						</Button>
						{isModalOpenDefaultCalendar && (
							<Modal
								title="Restore Defaults"
								onRequestClose={() => setIsModalOpenDefaultCalendar(false)}
							>
								<p>Are you sure you want to restore the default colors?</p>
								<Button
									variant="primary"
									onClick={() => {
										setAttributes({
											calendarBgColor: DEFAULT_CAL_BG_COLOR,
											calendarFontColor: DEFAULT_CAL_FONT_COLOR,
										});
										setIsModalOpenDefaultCalendar(false);
									}}
								>
									Yes, restore.
								</Button>
								<Button
									variant="secondary"
									onClick={() => setIsModalOpenDefaultCalendar(false)}
									style={{ marginLeft: "1em" }}
								>
									Cancel
								</Button>
							</Modal>
						)}
					</div>
				)}
			</PanelBody>
		);
	}

	// Panels and UI

	function presetColorsPanel() {
		return (
			<ButtonGroup className="btn-grid">
				{addActiveTheme("blue", "Blue theme")}
				{addActiveTheme("forest", "Forest theme")}
				{addActiveTheme("plum", "Plum theme")}
				{addActiveTheme("slate", "Slate theme")}
			</ButtonGroup>
		);
	}

	function cardColorsPanel() {
		return (
			<PanelBody title="Card Design">
				<ButtonGroup>
					{addActiveTab("presets", "Presets")}
					{addActiveTab("custom", "Custom")}
					{addActiveTab("defaults", "Defaults")}
				</ButtonGroup>
				{activeTab === "presets" && (
					presetColorsPanel()
				)}
				{activeTab === "custom" && (
					customColorsPanel()
				)}
				{activeTab === "defaults" && (
					restoreToDefaults()
				)}
			</PanelBody>
		);
	}

	function customColorsPanel() {
		return (
			<>
				<ButtonGroup>
					{addActiveSubTab("background", "Background")}
					{addActiveSubTab("text", "Text")}
					{addActiveSubTab("divider", "Divider")}
				</ButtonGroup>
				{activeSubTab === "background" && (
					<ColorPicker
						color={cardBgColor}
						onChangeComplete={(value) =>
							setAttributes({ cardBgColor: value.hex })
						}
						disableAlpha
					/>
				)}
				{activeSubTab === "text" && (
					<ColorPicker
						color={cardFontColor}
						onChangeComplete={(value) =>
							setAttributes({ cardFontColor: value.hex })
						}
						disableAlpha
					/>
				)}
				{activeSubTab === "divider" && (
					dividerColorsPanel()
				)}
			</>
		);
	}

	function restoreToDefaults() {
		return (
			<div style={{ marginTop: "1em", textAlign: "center" }}>
				<Button
					variant="primary"
					onClickCapture={() => setIsModalOpenDefaultCard(true)}
				>
					Restore to defaults
				</Button>
				{isModalOpenDefaultCard && (
					<Modal
						title="Restore Defaults"
						onRequestClose={() => setIsModalOpenDefaultCard(false)}
					>
						<p>Are you sure you want to restore the default colors?</p>
						<Button
							variant="primary"
							onClick={() => {
								setAttributes({
									dividerColorLeft: DEFAULT_LEFT_COLOR,
									dividerColorRight: DEFAULT_RIGHT_COLOR,
									cardBgColor: DEFAULT_BG_COLOR,
									cardFontColor: DEFAULT_FONT_COLOR,
								});
								setIsModalOpenDefaultCard(false);
							}}
						>
							Yes, restore.
						</Button>
						<Button
							variant="secondary"
							onClick={() => setIsModalOpenDefaultCard(false)}
							style={{ marginLeft: "1em" }}
						>
							Cancel
						</Button>
					</Modal>
				)}
			</div>
		);
	}

	function dividerColorsPanel() {
		return (
			<PanelBody ref={duotoneRef} title="Divider Colors">
				<>
					<DuotonePicker
						duotonePalette={DUOTONE_PALETTE}
						value={
							dividerColorLeft && dividerColorRight
								? [dividerColorLeft, dividerColorRight]
								: DEFAULT_DUOTONE_COLORS
						}
						onChange={(newValue) => {
							if (newValue === undefined || newValue === 'unset') {
								setAttributes({
									dividerColorLeft: 'transparent',
									dividerColorRight: 'transparent',
								});
							} else if (!Array.isArray(newValue) || newValue.length !== 2) {
								setDuotone(DEFAULT_DUOTONE_COLORS);
							} else {
								setAttributes({
									dividerColorLeft: newValue[0],
									dividerColorRight: newValue[1],
								});
							}
						}}
					/>
				</>
			</PanelBody>
		);
	}

	const addActiveTab = (tabName, tabText) => {
		return (
			<Button
				variant={activeTab === tabName ? "primary" : "secondary"}
				onClick={() => setActiveTab(tabName)}
			>
				{tabText}
			</Button>
		);
	};

	const addActiveCalendarTab = (tabName, tabText) => {
		return (
			<Button
				variant={activeCalendarTab === tabName ? "primary" : "secondary"}
				onClick={() => setActiveCalendarTab(tabName)}
			>
				{tabText}
			</Button>
		);
	};

	const addActiveSubTab = (tabName, tabText) => {
		return (
			<Button
				variant={activeSubTab === tabName ? "primary" : "secondary"}
				onClick={() => setActiveSubTab(tabName)}
			>
				{tabText}
			</Button>
		);
	};

	const addActiveTheme = (themeName, themeText) => {
		return (
			<button
				className={`btn-theme-color btn-${themeName}${activeTheme === themeName ? ' selected' : ''}`}
				onClick={() => {
					setActiveTheme(themeName);
					setAttributes({ ...THEME_ATTRIBUTES[themeName] });
				}}
			>
				{themeText}
			</button>
		);
	};

	console.log("SegmentedControl:", SegmentedControl);
	return (
		<>
			<InspectorControls>
				{calendarColorsPanel()}
				{cardColorsPanel()}
			</InspectorControls>
			<div {...blockProps}
				style={{
					"--base-bg": cardBgColor,
					"--font-selected": cardFontColor,
					"--accent-primary": dividerColorLeft,
					"--accent-secondary": dividerColorRight,
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
			</div>
		</>
	);
}
