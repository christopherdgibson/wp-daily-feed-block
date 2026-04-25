<?php
$calendar_bg = $attributes['calendarBgColor'] ?? '#262829';
$calendar_font = $attributes['calendarFontColor'] ?? '#fff';
$card_bg = $attributes['cardBgColor'] ?? '#e3e3e3';
$card_font = $attributes['cardFontColor'] ?? '#0d3ca1';
$divider_left = $attributes['dividerColorLeft'] ?? '#0000ff';
$divider_right = $attributes['dividerColorRight'] ?? '#ffa500';

$cardStyles = implode(';', [
    "--base-bg: " . esc_attr($card_bg),
    "--font-selected: " . esc_attr($card_font),
    "--accent-primary: " . esc_attr($divider_left),
    "--accent-secondary: " . esc_attr($divider_right),
]);
$calendarStyles = implode(';', [
    "--calendar-bg-color: " . esc_attr($calendar_bg),
    "--calendar-font-color: " . esc_attr($calendar_font),
]);
?>
<div class='api-data-container' <?php echo get_block_wrapper_attributes(['style' => $cardStyles]); ?>>
    <svg width="0" height="0">
        <defs>
            <linearGradient id="iconGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--accent-primary)" />
                <stop offset="100%" stopColor="var(--accent-secondary)" />
            </linearGradient>
        </defs>
    </svg>
    <div class="card">
        <div class="card-container">
            <div class="calendar-overlay">
                <div class="calendar-container">
                    <button class="close-popup">
                        X
                    </button>
                    <div class="calendar"
                        style="
                            --calendar-bg-color: <?php echo esc_attr($calendar_bg); ?>;
                            --calendar-font-color: <?php echo esc_attr($calendar_font); ?>;">
                    </div>
                </div>
            </div>
            <div class="api-data-column">
                <div class="api-data-date-container">
                    <div class="api-data-date">
                        Daily feed for 1 January
                    </div>
                    <button class="btn-calendar-toggle">
                        <div class="calendar-icon">
                            <span class="tool-tip">Open calendar to choose date</span>
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

