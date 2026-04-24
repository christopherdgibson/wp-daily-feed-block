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
    <div class="card">
        <div class="api-data-column calendar-container">
            <div class="calendar"
                style="
                    --calendar-bg-color: <?php echo esc_attr($calendar_bg); ?>;
                    --calendar-font-color: <?php echo esc_attr($calendar_font); ?>;">
            </div>
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
                        Daily api for January 1
                    </div>
                </div>
                <div class="api-data">
                    Loading api data...
                </div>
            </div>
        </div>
    </div>
</div>

