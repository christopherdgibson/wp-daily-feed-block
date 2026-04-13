<?php
/*
Plugin Name: My API Proxy
Description: Proxies API requests to avoid CORS.
Version: 1.0
Author: Christopher Gibson
*/

add_action('wp_ajax_my_api_proxy', 'my_api_proxy_function');
add_action('wp_ajax_nopriv_my_api_proxy', 'my_api_proxy_function');

function my_api_proxy_function() {
    $response = wp_remote_get('https://today.zenquotes.io/api/1/1');
    if (is_wp_error($response)) {
        wp_send_json_error(['message' => 'API request failed', 'error' => $response->get_error_message()]);
    } else {
        $body = wp_remote_retrieve_body($response);
        header('Content-Type: application/json');
        echo $body;
    }
    wp_die();
}   

// add_action('wp_ajax_my_api_proxy', 'my_api_proxy_function');
// add_action('wp_ajax_nopriv_my_api_proxy', 'my_api_proxy_function');

// function my_api_proxy_function() {
//     $response = wp_remote_get('https://today.zenquotes.io/api/1/1');

//     if (is_wp_error($response)) {
//         $error_message = $response->get_error_message();
//         wp_send_json_error(['message' => 'API request failed', 'error' => $error_message]);
//     } else {
//         $code = wp_remote_retrieve_response_code($response);
//         $body = wp_remote_retrieve_body($response);

//         // Try to decode the body as JSON
//         $json = json_decode($body, true);

//         if ($json !== null) {
//             // Valid JSON, return as is
//             wp_send_json_success($json);
//         } else {
//             // Not JSON, wrap in a JSON response
//             wp_send_json_success(['raw' => $body, 'http_code' => $code]);
//         }
//     }
//     wp_die();
// }
