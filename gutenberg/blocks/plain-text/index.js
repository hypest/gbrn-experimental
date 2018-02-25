/**
 * External dependencies
 */
import TextareaAutosize from 'react-autosize-textarea';
import classnames from 'classnames';

import {
	TextInput
  } from 'react-native';
  
 /**
 * Internal dependencies
 */
// import './style.scss';

function PlainText( { onChange, className, ...props } ) {
	return (
		<TextInput
		    multiline={true}
			{ ...props } />

		// <TextareaAutosize
		// 	className={ classnames( 'blocks-plain-text', className ) }
		// 	onChange={ ( event ) => onChange( event.target.value ) }
		// 	{ ...props }
		// />
	);
}

export default PlainText;
