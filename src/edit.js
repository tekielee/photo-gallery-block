/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ImageList from './components/ImageList';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { 
	PanelBody, __experimentalInputControl as InputControl, 
	Button, Notice
} from '@wordpress/components';	

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
import { store } from './store/store';
import { useSelect, dispatch } from '@wordpress/data';

export default function Edit() {
	const currentUnsplashAPIKey = useSelect(store).getUnsplashAPIKey();
	const currentImages = useSelect(store).getImages();
	const currentTerm = useSelect(store).getTerm();
	const [ term, setTerm ] = useState( currentTerm );
	const [ unsplashAPIKey, setUnsplashAPIKey ] = useState( currentUnsplashAPIKey );
	const [ images, setImages ] = useState( currentImages );
	const [ notice, setNotice ] = useState( false );	

	const handleOnChange = ( ( unsplashAPIKey ) => {
		setUnsplashAPIKey(unsplashAPIKey);
	});

	const handleSearch = ( ( value ) => {
		setTerm( value );
	});

	const searchImages = async ( term ) => {
		const response = await axios.get('https://api.unsplash.com/search/photos', {
			headers: {
				Authorization: 'Client-ID ' + unsplashAPIKey,
			},
			params: {
				query: term,
			},
		});
		setImages(response.data.results);
	};

	const MyNotice = () => (
		<Notice status="success">Settings have been updated successfully.</Notice>
	);

	const saveSettings = () => {
		/*dispatch(store).setUnsplashAPIKey( unsplashAPIKey );
		dispatch(store).setTerm( term );
		dispatch(store).setImages( images );*/
		let params = new URLSearchParams();
		params.append('action', 'save_settings');
 		params.append('unsplash_api_key', unsplashAPIKey);
		params.append('term', term);
		params.append('images', JSON.stringify(images));

		axios.post('/wp-admin/admin-ajax.php', params);
		setNotice( true	);
	};

	useEffect(() => {
		if ( unsplashAPIKey && term ) {
			searchImages( term );
		}
	}, [term, unsplashAPIKey]);

	useEffect(() => {
		handleOnChange( unsplashAPIKey );
	}, [unsplashAPIKey]);

	return (
		<>
			<InspectorControls>				
				<PanelBody title={ __( 'Settings', 'photo-gallery-block' ) }>
					<InputControl
						type='string'
						label={ __( 'Unsplash Access Key', 'photo-gallery-block' ) }
						value={ unsplashAPIKey || ''}
						onChange={ handleOnChange }
					/>
					<InputControl
						type='string'
						label={ __( 'Search Term', 'photo-gallery-block' ) }
						value={ term || '' }
						onChange={ handleSearch }
					/>
					<Button onClick={saveSettings} variant="primary">Save</Button>
					{ notice ? <MyNotice /> : '' }
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				<ImageList images={images}/>
			</div>
		</>
	);
}
