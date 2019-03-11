import React from 'react';
import PropTypes from 'prop-types';
import { Editor, RichUtils } from 'draft-js';
import mockTarget from './helpers/target'
import Tray from './components/Tray.jsx';
import Wrapper from './components/Wrapper.jsx';

const EditorDOM = React.createRef();
const RichTextEditor = props => (
    <Wrapper>

        <Tray
            {...props}
            editor={EditorDOM}
        />

        <Editor
            ref={EditorDOM}
            editorState={props.value}

            handleKeyCommand={(command, editorState) => {
                let newState = RichUtils.handleKeyCommand(editorState, command);
                if (!newState) return 'not-handled'

                props.onChange(
                    mockTarget({
                        name: props.name,
                        value: newState
                    })
                );

                return 'handled';
            }}

            onChange={e => props.onChange(
                mockTarget({
                    name: props.name,
                    value: e
                })
            )}
        />

    </Wrapper>
);

// update this 
RichTextEditor.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array,
    value: PropTypes.object.isRequired
};

export default RichTextEditor;