import { Button, ButtonGroup, ColorPicker, Modal, PanelBody } from "@wordpress/components";
import { useState } from "@wordpress/element";
import TabButton from "./TabButton";

import constants from "@daily-feed-block/constants.json";

const DEFAULT_CAL_BG_COLOR = constants.calendarDefaults.calendarBgColor;
const DEFAULT_CAL_FONT_COLOR = constants.calendarDefaults.calendarFontColor;

export default function CalendarColorsPanel({ attributes, setAttributes })  {
    const { calendarBgColor, calendarFontColor } = attributes;
    const [activeTab, setActiveTab] = useState("background");
	const [isModalOpenDefaultCalendar, setIsModalOpenDefaultCalendar] = useState(false);

    return (
        <PanelBody title="Calendar Design">
            <ButtonGroup>
                <TabButton
                    tabName="background"
                    tabText="Background"
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                <TabButton
                    tabName="text"
                    tabText="Text"
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                <TabButton
                    tabName="defaults"
                    tabText="Defaults"
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
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