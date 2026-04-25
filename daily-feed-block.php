<?php
/**
 * Plugin Name: Daily Feed Block
 * Plugin URI: https://christopherdgibson.github.io/wordpress-plugins
 * Description: Block for adding agenda items and their descriptions.
 * Author: Christopher D Gibson
 * Author URI: https://christopherdgibson.github.io
 * Version: 0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * License: GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       daily-feed-block
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
/**
 * Registers the block using a `blocks-manifest.php` file, which improves the performance of block type registration.
 * Behind the scenes, it also registers all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 */
add_action( 'init', 'create_block_daily_api_block_block_init' );
function create_block_daily_api_block_block_init() {
	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s)
	 * based on the registered block metadata.
	 * Added in WordPress 6.8 to simplify the block metadata registration process added in WordPress 6.7.
	 *
	 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
	 */
	if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
		wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
		return;
	}

	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` file.
	 * Added to WordPress 6.7 to improve the performance of block type registration.
	 *
	 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
	 */
	if ( function_exists( 'wp_register_block_metadata_collection' ) ) {
		wp_register_block_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
	}
	/**
	 * Registers the block type(s) in the `blocks-manifest.php` file.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	$manifest_data = require __DIR__ . '/build/blocks-manifest.php';
	foreach ( array_keys( $manifest_data ) as $block_type ) {
		register_block_type( __DIR__ . "/build/{$block_type}" );
	}
}

add_action('wp_ajax_api_proxy', 'api_proxy_function');
add_action('wp_ajax_nopriv_api_proxy', 'api_proxy_function');

function api_proxy_function() {
	$url = isset($_GET['url']) ? esc_url_raw($_GET['url']) : '';
	if (!$url) {
		wp_send_json_error('No Url provided');
		wp_die();
	}
    $response = wp_remote_get(
		$url,
		array(
			'timeout' => 45
			)
		);
    if (is_wp_error($response)) {
        wp_send_json_error(['message' => 'API request failed', 'error' => $response->get_error_message()]);
    } else {
        $body = wp_remote_retrieve_body($response);
        header('Content-Type: application/json');
        echo $body;
    }
    wp_die();
}

function daily_feed_block_enqueue_editor() {
    wp_localize_script(
        'create-block-daily-feed-block-editor-script',
        'dailyFeedBlock',
        array(
            'ajaxUrl' => admin_url('admin-ajax.php'),
        )
    );
}
add_action('enqueue_block_editor_assets', 'daily_feed_block_enqueue_editor');

function daily_feed_block_enqueue() {
    wp_localize_script(
		'create-block-daily-feed-block-view-script',
        'dailyFeedBlock',
        array(
            'ajaxUrl' => admin_url('admin-ajax.php'),
        )
    );
}
add_action('wp_enqueue_scripts', 'daily_feed_block_enqueue');

// add_action( 'wp_enqueue_scripts', 'api_data_enqueue_scripts' );
// function api_data_enqueue_scripts() {
// 	 wp_enqueue_script(
//      'api-data-js',
//      plugins_url('src/daily-feed-block/js/calendar.js', __FILE__),
//      array(), //dependencies
//      false, // version
// 	 true // in footer
//  );
// }

// add_action( 'enqueue_block_editor_assets', 'api_data_enqueue_editor_assets' );
// function api_data_enqueue_editor_assets() {
// 	 wp_enqueue_script(
//      'api-data-js-editor',
//      plugins_url('src/daily-feed-block/js/calendar.js', __FILE__),
//      array(), //dependencies
//      false, // version
// 	 true // in footer
//  );
// }
