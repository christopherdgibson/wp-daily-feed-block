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

import { CalendarControl } from "./assets/js/calendar.js";
import { fetchDailyApiData } from "./assets/js/dailyApi.js";
import { useRef, useEffect, useState } from "@wordpress/element";

const CalendarMount = React.memo(
    ({ containerRef, style }) => (
        <div ref={containerRef} class="calendar" style={style}></div>
    ),
    () => true
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
		meetingsDividerColorLeft,
		meetingsDividerColorRight,
		meetingsBgColor,
		meetingsFontColor,
		} = attributes;
	const DEFAULT_FONT_COLOR = blockMetadata.attributes.meetingsFontColor.default;
	const DEFAULT_BG_COLOR = blockMetadata.attributes.meetingsBgColor.default;
	const DEFAULT_LEFT_COLOR =
		blockMetadata.attributes.meetingsDividerColorLeft.default;
	const DEFAULT_RIGHT_COLOR =
		blockMetadata.attributes.meetingsDividerColorRight.default;
	const THEME_ATTRIBUTES = {
		blue:   { meetingsDividerColorLeft: '#1a56d6', meetingsDividerColorRight: '#e07b20', meetingsFontColor: '#1a56d6', meetingsBgColor: '#c2ddf7' },
		forest: { meetingsDividerColorLeft: '#1a6b3c', meetingsDividerColorRight: '#c4962a', meetingsFontColor: '#1a6b3c', meetingsBgColor: '#b8dfc8' },
		plum:   { meetingsDividerColorLeft: '#5b2d8e', meetingsDividerColorRight: '#c0392b', meetingsFontColor: '#5b2d8e', meetingsBgColor: '#d4bfee' },
		slate:  { meetingsDividerColorLeft: '#2c4a6e', meetingsDividerColorRight: '#e05c3a', meetingsFontColor: '#2c4a6e', meetingsBgColor: '#b8cfe0' }
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
	const [isModalOpenDefault, setIsModalOpenDefault] = useState(false);
	const [calendarInstance, setCalendarInstance] = useState(null);
	const blockProps = useBlockProps({ className: "api-data-container" });
	// const calendarInstance = useRef();
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
			<div
				class="card"
				ref={containerRef}
				style={{
					"--base-bg": meetingsBgColor,
					"--meetings-font-color": meetingsFontColor,
					"--grad-color-left": meetingsDividerColorLeft,
					"--grad-color-right": meetingsDividerColorRight,
				}}
			>
				<div ref={calendarContainerRef} class="api-data-column calendar-container">
					<div
						class="calendar"
						style={{
							"--calendar-bg-color": calendarBgColor,
							"--calendar-font-color": calendarFontColor,
						}}
					></div>
					<div>
						<div class="api-data-date-container">
							<div>
								<input type="checkbox" id="check-calendar" />
								<label for="check-calendar" class="checkbtn-calendar">
									<svg
										width="40"
										height="40"
										xmlns="http://www.w3.org/2000/svg"
										viewbox="0 -50 448 512"
									>
										<path
											fill="black"
											d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
										/>
									</svg>
								</label>
							</div>
							<div class="api-data-date">
								Daily api for {currentDay} {currentMonth}
							</div>
						</div>
						<div class="api-data" ref={apiDataRef}>
							Loading api data...
						</div>
					</div>
				</div>
			</div>
		);
	}

	function calendarColorsPanel() {
		return (
			<PanelBody title="Calendar Colors">
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
							onClickCapture={() => setIsModalOpenDefault(true)}
						>
							Restore to defaults
						</Button>
						{isModalOpenDefault && (
							<Modal
								title="Restore Defaults"
								onRequestClose={() => setIsModalOpenDefault(false)}
							>
								<p>Are you sure you want to restore the default colors?</p>
								<Button
									variant="primary"
									onClick={() => {
										setAttributes({
											calendarBgColor: DEFAULT_CAL_BG_COLOR,
											calendarFontColor: DEFAULT_CAL_FONT_COLOR,
										});
										setIsModalOpenDefault(false);
									}}
								>
									Yes, restore.
								</Button>
								<Button
									variant="secondary"
									onClick={() => setIsModalOpenDefault(false)}
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

	function meetingColorsPanel() {
		return (
			<PanelBody title="Meetings Colors">
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
						color={meetingsBgColor}
						onChangeComplete={(value) =>
							setAttributes({ meetingsBgColor: value.hex })
						}
						disableAlpha
					/>
				)}
				{activeSubTab === "text" && (
					<ColorPicker
						color={meetingsFontColor}
						onChangeComplete={(value) =>
							setAttributes({ meetingsFontColor: value.hex })
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
					onClickCapture={() => setIsModalOpenDefault(true)}
				>
					Restore to defaults
				</Button>
				{isModalOpenDefault && (
					<Modal
						title="Restore Defaults"
						onRequestClose={() => setIsModalOpenDefault(false)}
					>
						<p>Are you sure you want to restore the default colors?</p>
						<Button
							variant="primary"
							onClick={() => {
								setAttributes({
									meetingsDividerColorLeft: DEFAULT_LEFT_COLOR,
									meetingsDividerColorRight: DEFAULT_RIGHT_COLOR,
									meetingsBgColor: DEFAULT_BG_COLOR,
									meetingsFontColor: DEFAULT_FONT_COLOR,
								});
								setIsModalOpenDefault(false);
							}}
						>
							Yes, restore.
						</Button>
						<Button
							variant="secondary"
							onClick={() => setIsModalOpenDefault(false)}
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
							meetingsDividerColorLeft && meetingsDividerColorRight
								? [meetingsDividerColorLeft, meetingsDividerColorRight]
								: DEFAULT_DUOTONE_COLORS
						}
						onChange={(newValue) => {
							if (newValue === undefined || newValue === 'unset') {
								setAttributes({
									meetingsDividerColorLeft: 'transparent',
									meetingsDividerColorRight: 'transparent',
								});
							} else if (!Array.isArray(newValue) || newValue.length !== 2) {
								setDuotone(DEFAULT_DUOTONE_COLORS);
							} else {
								setAttributes({
									meetingsDividerColorLeft: newValue[0],
									meetingsDividerColorRight: newValue[1],
								});
							}
						}}
					/>
				</>
			</PanelBody>
		);
	}

	function showDeleteMeetingModal() {
		return (
			<Modal
				title="Delete Meeting"
				onRequestClose={() => setIsModalOpenDelete(false)}
			>
				<p>Are you sure you want to delete this meeting?</p>
				<Button
					variant="primary"
					onClick={() => {
						confirmDelete();
					}}
				>
					Yes, delete.
				</Button>
				<Button
					variant="secondary"
					onClick={() => setIsModalOpenDelete(false)}
					style={{ marginLeft: "1em" }}
				>
					Cancel
				</Button>
			</Modal>
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
				{meetingColorsPanel()}
			</InspectorControls>
			<div {...blockProps}
				style={{
					"--base-bg": meetingsBgColor,
					"--font-selected": meetingsFontColor,
					"--accent-primary": meetingsDividerColorLeft,
					"--accent-secondary": meetingsDividerColorRight,
				}}>
				<div
				class="card"
				ref={containerRef}
				>
					<div ref={calendarContainerRef} class="api-data-column calendar-container">
						<CalendarMount
							containerRef={calendarRef}
							style={{
								"--calendar-bg-color": calendarBgColor,
								"--calendar-font-color": calendarFontColor,
							}}
						/>
						<div>
							<div class="api-data-date-container">
								<div>
									<input type="checkbox" id="check-calendar" />
									<label for="check-calendar" class="checkbtn-calendar">
										<svg
											width="40"
											height="40"
											xmlns="http://www.w3.org/2000/svg"
											viewbox="0 -50 448 512"
										>
											<path
												fill="black"
												d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
											/>
										</svg>
									</label>
								</div>
								<div class="api-data-date">
									Daily api for {currentDay} {currentMonth}
								</div>
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
