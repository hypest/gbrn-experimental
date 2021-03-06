/**
 * External dependencies
 */
import { shallow } from 'enzyme';

/**
 * Internal dependencies
 */
import {
	RichText,
	createTinyMCEElement,
	isEmptyInlineBoundary,
	isEmptyNode,
	filterEmptyNodes,
	getFormatProperties,
} from '../';
import { diffAriaProps, pickAriaProps } from '../aria';

describe( 'createTinyMCEElement', () => {
	const type = 'p';
	const children = <p>Child</p>;

	test( 'should return null', () => {
		const props = {
			'data-mce-bogus': 'all',
		};

		expect( createTinyMCEElement( type, props, children ) ).toBeNull();
	} );

	test( 'should return children', () => {
		const props = {
			'data-mce-bogus': '',
		};

		const wrapper = createTinyMCEElement( type, props, children );
		expect( wrapper ).toEqual( [ children ] );
	} );

	test( 'should render a TinyMCE element', () => {
		const props = {
			'a-prop': 'hi',
		};

		const wrapper = shallow( createTinyMCEElement( type, props, children ) );
		expect( wrapper ).toMatchSnapshot();
	} );
} );

describe( 'isEmptyInlineBoundary', () => {
	describe( 'link', () => {
		const node = document.createElement( 'a' );
		node.innerText = '\uFEFF';

		test( 'should return true for a valid link boundary', () => {
			expect( isEmptyInlineBoundary( node ) ).toBe( true );
		} );

		test( 'should return false for an invalid link boundary', () => {
			const invalid = { ...node, childNodes: [] };
			expect( isEmptyInlineBoundary( invalid ) ).toBe( false );
		} );
	} );

	describe( 'code', () => {
		const node = document.createElement( 'code' );
		node.textContent = '\uFEFF';

		test( 'should return true for a valid link boundary', () => {
			expect( isEmptyInlineBoundary( node ) ).toBe( true );
		} );

		test( 'should return false for an invalid link boundary', () => {
			const invalid = { ...node, childNodes: [] };
			expect( isEmptyInlineBoundary( invalid ) ).toBe( false );
		} );
	} );
} );

describe( 'isEmptyNode', () => {
	it( 'returns true for empty text node', () => {
		const node = document.createTextNode( '' );

		expect( isEmptyNode( node ) ).toBe( true );
	} );

	it( 'returns false for non-empty text node', () => {
		const node = document.createTextNode( 'rabbit' );

		expect( isEmptyNode( node ) ).toBe( false );
	} );

	it( 'returns false for element node', () => {
		const node = document.createElement( 'br' );

		expect( isEmptyNode( node ) ).toBe( false );
	} );
} );

describe( 'filterEmptyNodes', () => {
	it( 'preserves newlines', () => {
		const node = document.createElement( 'div' );
		node.innerHTML = 'a<br>foo';

		expect( filterEmptyNodes( node.childNodes ) ).toEqual( [
			document.createTextNode( 'a' ),
			document.createElement( 'br' ),
			document.createTextNode( 'foo' ),
		] );
	} );

	it( 'omits text node', () => {
		const node = document.createElement( 'div' );
		node.appendChild( document.createTextNode( '' ) );

		expect( filterEmptyNodes( node.childNodes ) ).toHaveLength( 0 );
	} );

	it( 'omits prefixing text node', () => {
		const node = document.createElement( 'div' );
		node.innerHTML = '<br>foo';
		node.insertBefore( document.createTextNode( '' ), node.firstChild );

		expect( filterEmptyNodes( node.childNodes ) ).toEqual( [
			document.createElement( 'br' ),
			document.createTextNode( 'foo' ),
		] );
	} );

	it( 'omits trailing text node', () => {
		const node = document.createElement( 'div' );
		node.innerHTML = '<br>foo';
		node.appendChild( document.createTextNode( '' ) );

		expect( filterEmptyNodes( node.childNodes ) ).toEqual( [
			document.createElement( 'br' ),
			document.createTextNode( 'foo' ),
		] );
	} );
} );

describe( 'getFormatProperties', () => {
	const formatName = 'link';
	const node = {
		nodeName: 'A',
		attributes: {
			href: 'https://www.testing.com',
		},
	};

	test( 'should return an empty object', () => {
		expect( getFormatProperties( 'ofSomething' ) ).toEqual( {} );
	} );

	test( 'should return an empty object if no anchor element is found', () => {
		expect( getFormatProperties( formatName, [ { ...node, nodeName: 'P' } ] ) ).toEqual( {} );
	} );

	test( 'should return an object of value and node for a link', () => {
		const mockNode = {
			...node,
			getAttribute: jest.fn().mockImplementation( ( attr ) => mockNode.attributes[ attr ] ),
		};

		const parents = [
			mockNode,
		];

		expect( getFormatProperties( formatName, parents ) ).toEqual( {
			value: 'https://www.testing.com',
			node: mockNode,
		} );
	} );

	test( 'should return an object of value and node of empty values when no values are found.', () => {
		const mockNode = {
			...node,
			attributes: {},
			getAttribute: jest.fn().mockImplementation( ( attr ) => mockNode.attributes[ attr ] ),
		};

		const parents = [
			mockNode,
		];

		expect( getFormatProperties( formatName, parents ) ).toEqual( {
			value: '',
			node: mockNode,
		} );
	} );
} );

describe( 'RichText', () => {
	describe( 'Component', () => {
		describe( '.adaptFormatter', () => {
			const wrapper = shallow( <RichText value={ [ 'valid' ] } /> );
			const options = {
				type: 'inline-style',
				style: {
					'font-weight': 'bold',
				},
			};

			test( 'should return an object on inline: span, and a styles property matching the style object provided', () => {
				expect( wrapper.instance().adaptFormatter( options ) ).toEqual( {
					inline: 'span',
					styles: options.style,
				} );
			} );
		} );
		describe( '.getSettings', () => {
			const value = [ 'Hi!' ];
			const settings = {
				setting: 'hi',
			};

			test( 'should return expected settings', () => {
				const wrapper = shallow( <RichText value={ value } /> );
				expect( wrapper.instance().getSettings( settings ) ).toEqual( {
					setting: 'hi',
					forced_root_block: false,
				} );
			} );

			test( 'should be overriden', () => {
				const mock = jest.fn().mockImplementation( () => 'mocked' );

				expect( shallow( <RichText value={ value } multiline={ true } getSettings={ mock } /> ).instance().getSettings( settings ) ).toEqual( 'mocked' );
			} );
		} );
	} );

	describe( '.propTypes', () => {
		/* eslint-disable no-console */
		let consoleError;
		beforeEach( () => {
			consoleError = console.error;
			console.error = jest.fn();
		} );

		afterEach( () => {
			console.error = consoleError;
		} );

		it( 'should warn when rendered with string value', () => {
			shallow( <RichText value="Uh oh!" /> );

			expect( console.error ).toHaveBeenCalled();
		} );

		it( 'should not warn when rendered with undefined value', () => {
			shallow( <RichText /> );

			expect( console.error ).not.toHaveBeenCalled();
		} );

		it( 'should not warn when rendered with array value', () => {
			shallow( <RichText value={ [ 'Oh, good' ] } /> );

			expect( console.error ).not.toHaveBeenCalled();
		} );
		/* eslint-enable no-console */
	} );
	describe( 'pickAriaProps()', () => {
		it( 'should should filter all properties to only those begining with "aria-"', () => {
			expect( pickAriaProps( {
				tagName: 'p',
				className: 'class1 class2',
				'aria-label': 'my label',
				style: {
					backgroundColor: 'white',
					color: 'black',
					fontSize: '12px',
					textAlign: 'left',
				},
				'aria-owns': 'some-id',
				'not-aria-prop': 'value',
				ariaWithoutDash: 'value',
			} ) ).toEqual( {
				'aria-label': 'my label',
				'aria-owns': 'some-id',
			} );
		} );
	} );
	describe( 'diffAriaProps()', () => {
		it( 'should report empty arrays for no props', () => {
			expect( diffAriaProps( {}, {} ) ).toEqual( {
				removedKeys: [],
				updatedKeys: [],
			} );
		} );
		it( 'should report empty arrays for non-aria props', () => {
			expect( diffAriaProps( {
				'non-aria-prop': 'old value',
				'removed-prop': 'value',
			}, {
				'non-aria-prop': 'new value',
				'added-prop': 'value',
			} ) ).toEqual( {
				removedKeys: [],
				updatedKeys: [],
			} );
		} );
		it( 'should report added aria props', () => {
			expect( diffAriaProps( {
			}, {
				'aria-prop': 'value',
			} ) ).toEqual( {
				removedKeys: [],
				updatedKeys: [ 'aria-prop' ],
			} );
		} );
		it( 'should report removed aria props', () => {
			expect( diffAriaProps( {
				'aria-prop': 'value',
			}, {
			} ) ).toEqual( {
				removedKeys: [ 'aria-prop' ],
				updatedKeys: [],
			} );
		} );
		it( 'should report changed aria props', () => {
			expect( diffAriaProps( {
				'aria-prop': 'old value',
			}, {
				'aria-prop': 'new value',
			} ) ).toEqual( {
				removedKeys: [],
				updatedKeys: [ 'aria-prop' ],
			} );
		} );
		it( 'should not report unchanged aria props', () => {
			expect( diffAriaProps( {
				'aria-prop': 'value',
			}, {
				'aria-prop': 'value',
			} ) ).toEqual( {
				removedKeys: [],
				updatedKeys: [],
			} );
		} );
		it( 'should work with a mixture of aria and non-aria props', () => {
			expect( diffAriaProps( {
				tagName: 'p',
				className: 'class1 class2',
				'aria-label': 'my label',
				style: {
					backgroundColor: 'white',
					color: 'black',
					fontSize: '12px',
					textAlign: 'left',
				},
				'aria-owns': 'some-id',
				'aria-active': 'some-active-id',
				'not-aria-prop': 'old value',
			}, {
				tagName: 'div',
				className: 'class1 class2',
				style: {
					backgroundColor: 'red',
					color: 'black',
					fontSize: '12px',
				},
				'aria-active': 'some-other-active-id',
				'not-aria-prop': 'new value',
				'aria-label': 'my label',
			} ) ).toEqual( {
				removedKeys: [ 'aria-owns' ],
				updatedKeys: [ 'aria-active' ],
			} );
		} );
	} );
} );
