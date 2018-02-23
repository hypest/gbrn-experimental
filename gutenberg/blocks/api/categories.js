/**
 * WordPress dependencies
 */
// import { __ } from '@wordpress/i18n';

export function __( text ) {
	return text;
}

/**
 * Block categories.
 *
 * Group blocks together based on common traits
 * The block "inserter" relies on these to present the list blocks
 *
 * @var {Array} categories
 */
const categories = [
	{ slug: 'common', title: __( 'Common Blocks' ) },
	{ slug: 'formatting', title: __( 'Formatting' ) },
	{ slug: 'layout', title: __( 'Layout Blocks' ) },
	{ slug: 'widgets', title: __( 'Widgets' ) },
	{ slug: 'embed', title: __( 'Embed' ) },
	{ slug: 'reusable-blocks', title: __( 'Saved Blocks' ) },
];

/**
 * Returns all the block categories.
 *
 * @return {Array} Block categories.
 */
export function getCategories() {
	return categories;
}
