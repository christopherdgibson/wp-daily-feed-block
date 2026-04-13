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

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { calendarBgColor, calendarFontColor } = attributes;
	const [activeTab, setActiveTab] = useState("background");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const blockProps = useBlockProps({ className: "api-data-container" });
	const calendarInstance = useRef();
	const containerRef = useRef();
	const apiDataRef = useRef();
	const calendarRef = useRef();
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
	const DEFAULT_DUOTONE_COLORS = [DEFAULT_LEFT_COLOR, DEFAULT_RIGHT_COLOR];
	// const [color, setColor] = useState("#f00");
	// const colors = [
	// 	{ name: "red", color: "#f00" },
	// 	{ name: "white", color: "#fff" },
	// 	{ name: "blue", color: "#00f" },
	// ];
	const [duotone, setDuotone] = useState(DEFAULT_DUOTONE_COLORS);
	const DUOTONE_PALETTE = [
		{
			colors: DEFAULT_DUOTONE_COLORS,
			name: "Default",
			slug: "default-theme-colors",
		},
		{
			colors: ["#8c00b7", "#fcff41"],
			name: "Purple and yellow",
			slug: "purple-yellow",
		},
		{
			colors: ["#6e0edc", "#b7b7b7"],
			name: "Blue and light blue",
			slug: "blue-light-blue",
		},
		{ colors: ["#000097", "#ff4747"], name: "Blue and red", slug: "blue-red" },
		{
			colors: ["#000097", "#82c1f2"],
			name: "Blue and light blue",
			slug: "blue-light-blue",
		},
	];

	const COLOR_PALETTE = [
		{ color: "#ff4747", name: "Red", slug: "red" },
		{ color: "#fcff41", name: "Yellow", slug: "yellow" },
		{ color: "#000097", name: "Blue", slug: "blue" },
		{ color: "#8c00b7", name: "Purple", slug: "purple" },
	];
	//console.log('Component rendered');
	useEffect(() => {
		//console.log('useEffect ran');
		const placeholderApiData = containerRef.current?.querySelector(".api-data");
		console.log("placeholderApiData (edit.js):", placeholderApiData);
		const placeholderDate =
			containerRef.current?.querySelector(".api-data-date");
		console.log("placeholderDate (edit.js):", placeholderDate);
		if (placeholderApiData && placeholderDate && !calendarInstance.current) {
			calendarInstance.current = new CalendarControl(calendarRef.current);
			calendarInstance.current.setOnDateChange((date) => {
				fetchDailyApiData(containerRef.current, date);
				console.log("Main logic callback:", date);
			});
		}
	}, []);
	const currentDate = new Date();
	const currentDay = currentDate.getDate().toString();
	const currentMonth = currentDate.toLocaleString("default", { month: "long" });

	function addDailyApi() {
		return (
			<div
				class="card"
				ref={containerRef}
				style={{
					"--meetings_description_bl": meetingsBgColor,
					"--meetings-font-color": meetingsFontColor,
					"--grad-color-left": meetingsDividerColorLeft,
					"--grad-color-right": meetingsDividerColorRight,
				}}
			>
				<div class="api-data-column calendar-container">
					<div
						class="calendar"
						ref={calendarRef}
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

	function apiColorsPanel() {
		return (
			<PanelBody title="Calendar Colors">
				{/* <SegmentedControl
						value={activeTab}
						onChange={setActiveTab}
						options={[
							{ label: "Background", value: "background" },
							{ label: "Text", value: "text" },
						]}
					/> */}
				<ButtonGroup>
					<Button
						variant={activeTab === "background" ? "primary" : "secondary"}
						onClick={() => setActiveTab("background")}
					>
						Background
					</Button>
					<Button
						variant={activeTab === "text" ? "primary" : "secondary"}
						onClick={() => setActiveTab("text")}
					>
						Text
					</Button>
					<Button
						variant={activeTab === "defaults" ? "primary" : "secondary"}
						onClick={() => setActiveTab("defaults")}
					>
						Defaults
					</Button>
				</ButtonGroup>
				{activeTab === "background" && (
					<ColorPicker
						color={calendarBgColor}
						onChangeComplete={(value) =>
							setAttributes({ calendarBgColor: value.hex })
						}
						disableAlpha
					/>
				)}
				{activeTab === "text" && (
					<ColorPicker
						color={calendarFontColor}
						onChangeComplete={(value) =>
							setAttributes({ calendarFontColor: value.hex })
						}
						disableAlpha
					/>
				)}
				{activeTab === "defaults" && (
					<div style={{ marginTop: "1em", textAlign: "center" }}>
						<Button
							variant="primary"
							onClickCapture={() => setIsModalOpen(true)}
						>
							Restore to defaults
						</Button>
						{isModalOpen && (
							<Modal
								title="Restore Defaults"
								onRequestClose={() => setIsModalOpen(false)}
							>
								<p>Are you sure you want to restore the default colors?</p>
								<Button
									variant="primary"
									onClick={() => {
										setAttributes({
											calendarBgColor: DEFAULT_CAL_BG_COLOR,
											calendarFontColor: DEFAULT_CAL_FONT_COLOR,
										});
										setIsModalOpen(false);
									}}
								>
									Yes, restore.
								</Button>
								<Button
									variant="secondary"
									onClick={() => setIsModalOpen(false)}
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

	function dividerColorsPanel() {
		return (
			<PanelBody title="Divider Colors">
				<>
					<DuotonePicker
						duotonePalette={DUOTONE_PALETTE}
						colorPalette={COLOR_PALETTE}
						value={
							Array.isArray(duotone) && duotone.length === 2
								? duotone
								: DEFAULT_DUOTONE_COLORS
						}
						onChange={(newValue) => {
							if (!Array.isArray(newValue) || newValue.length !== 2) {
								setDuotone(DEFAULT_DUOTONE_COLORS);
							} else {
								setDuotone(newValue);
							}
						}}
						onChangeComplete={setAttributes({
							meetingsDividerColorLeft: duotone[0],
							meetingsDividerColorRight: duotone[1],
						})}
					/>
					<DuotoneSwatch values={duotone} />
				</>
			</PanelBody>
		);
	}

	console.log("SegmentedControl:", SegmentedControl);
	return (
		<>
			<InspectorControls>
				{apiColorsPanel()}
				{dividerColorsPanel()}
			</InspectorControls>
			<div {...blockProps}>{addDailyApi()}</div>
		</>
	);
}
