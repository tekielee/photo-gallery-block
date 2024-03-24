<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<div <?php echo get_block_wrapper_attributes(); ?> style="display:flex">
<?php

$images = json_decode(wp_unslash(get_option('images'), true));


for($i = 0; $i < count($images); $i++) {
    echo '<div><img src="' . $images[$i]->urls->thumb . '" alt="' . $images[$i]->alt_description . '"></div>';
}

?>

</div>
