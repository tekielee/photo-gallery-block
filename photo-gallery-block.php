<?php
/**
 * Plugin Name:       Photo Gallery Block
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       photo-gallery-block
 *
 * @package           create-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function photo_gallery_block_photo_gallery_block_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'photo_gallery_block_photo_gallery_block_block_init' );

if ( !function_exists ( 'ajax_save_settings_handler' ) ) {

    function ajax_save_settings_handler () {
        
        update_option ( 'unsplash_api_key', $_POST['unsplash_api_key'] );

		update_option ( 'term', $_POST['term'] );

		update_option ( 'images', $_POST['images'] );

        file_put_contents(
            plugin_dir_path(__DIR__) . 'photo-gallery-block/.env', 
            'unsplash_api_key: ' . $_POST['unsplash_api_key'] 
        );

        echo 'Settings have been updated successfully';

        wp_die();
    }

}

add_action( 'wp_ajax_save_settings', 'ajax_save_settings_handler' );
