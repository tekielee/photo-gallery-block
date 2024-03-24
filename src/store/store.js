import { createReduxStore, register } from '@wordpress/data';
import { store as coreDataStore } from '@wordpress/core-data';

const DEFAULT_STATE = {
	unsplashAPIKey: '',
	term: 'cars',
	images: [],
};

const actions = {
	setUnsplashAPIKey( unsplashAPIKey ) {
		return {
			type: 'SET_UNSPLASH_API_KEY',
			unsplashAPIKey,
		};
	},
	setImages( images ) {
		return {
			type: 'SET_IMAGES',
			images,
		};
	},
	setTerm( term ) {
		return {
			type: 'SET_TERM',
			term,
		};
	},
};

const selectors = {
	getUnsplashAPIKey( state ) {
		return state.unsplashAPIKey;
	},
	getImages( state ) {
		return state.images;
	},
	getTerm( state ) {
		return state.term;
	},
};

const reducer = ( state = DEFAULT_STATE, action ) => {
	switch ( action.type ) {
		case 'SET_UNSPLASH_API_KEY':
			return {
				...state,
				unsplashAPIKey: action.unsplashAPIKey,
			};
		case 'SET_IMAGES':
			return {
				...state,
				images: action.images,
			};
		case 'SET_TERM':
			return {
				...state,
				term: action.term,
			};
		default:
			return state;
	}
};

const store = createReduxStore( 'photo-gallery-block', { reducer, actions, selectors } );
register( store );

export { store };