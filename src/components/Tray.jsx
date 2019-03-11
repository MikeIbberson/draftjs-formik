import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RichUtils } from 'draft-js';
import mockTarget from '../helpers/target';

/**
 * @TODO 
 * 
 * Refactor to make the chained loops more readable.
 * Relying on index position is not easily maintainable.
 */

const Tray = props => (
    <ButtonsList>

        {[props.blockOptions, props.inlineOptions]
            .map((arr, num) => (
                <ButtonListItem key={num}>
                    {arr.map(({ label, style }, i) => (

                        <Button
                            key={i}
                            type="button"
                            active={num === 0 ?
                                RichUtils.getCurrentBlockType(props.value) === style :
                                props.value.getCurrentInlineStyle().has(style)
                            }

                            onMouseDown={() => props.onChange(
                                mockTarget({
                                    name: props.name,
                                    value: RichUtils[
                                        num === 0 ? 'toggleBlockType' : 'toggleInlineStyle'
                                    ](props.value, style)
                                })
                            )}

                            onMouseUp={() => props.editor ?
                                props.editor.current.focus() :
                                null
                            }>

                            {label}
                        </Button>
                    ))}
                </ButtonListItem>
            ))}
    </ButtonsList>
);

Tray.propTypes = {
    focus: PropTypes.object,
    name: PropTypes.string.isRequired,
    value: PropTypes.object.isRequired,
    blockOptions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            style: PropTypes.oneOf([
                'unstyled',
                'paragraph',
                'header-one',
                'header-two',
                'header-three',
                'header-four',
                'header-five',
                'header-six',
                'unordered-list-item',
                'ordered-list-item',
                'blockquote',
                'code-block',
                'atomic',
            ]).isRequired,
        })
    ),
    inlineOptions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            style: PropTypes.oneOf([
                'BOLD',
                'ITALIC',
                'UNDERLINE',
                'STRIKETRHOUGH',
                'fontFamily',
                'fontSize',
                '|',
                'inlineStyle',
                'paragraphFormat',
                'align',
                'undo',
                'redo',
                'html'
            ]).isRequired,
        })
    )
};

Tray.defaultProps = {
    blockOptions: [
        { label: 'H1', style: 'header-one' },
        { label: 'H2', style: 'header-two' },
        { label: 'H3', style: 'header-three' },
        { label: 'H4', style: 'header-four' },
        { label: 'H5', style: 'header-five' },
        { label: 'H6', style: 'header-six' },
        { label: 'List', style: 'unordered-list-item' },
    ],
    inlineOptions: [
        { label: 'Bold', style: 'BOLD' },
        { label: 'Italic', style: 'ITALIC' },
        { label: 'Underline', style: 'UNDERLINE' }
    ]
};

export const ButtonsList = styled.ul`
    border-bottom: 2px solid #DDD;
    list-style: none;
    margin: 0 0 1rem;
    padding: 0.5rem;
`;

export const ButtonListItem = styled.li`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    font-size: 1em;

    &:not(:first-of-type){ 
        font-size: small;
    }
`;

export const Button = styled.button`
    background: ${props => props.active ? 'rgba(221, 221, 221, 0.3)' : 'transparent'};
        border: 0;
    border-radius: 5px;
    color:  ${props => props.active ? '#444' : '#AAA'};
        cursor: pointer;
        padding: 0.5rem;
    font-size: inherit;
    line-height: 1;
    outline: 0;
    transition-duration: 500ms;
    transition-property: background-color, color;

    &:focus, 
    &:hover {
        color: #444;
    }
`;

export default Tray;