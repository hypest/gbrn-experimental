/**
 * External dependencies
 */
import React, { Component } from 'react';
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
    		numberOfLines={4} />

		// <TextareaAutosize
		// 	className={ classnames( 'blocks-plain-text', className ) }
		// 	onChange={ ( event ) => onChange( event.target.value ) }
		// 	{ ...props }
		// />
	);
}

export default PlainText;
