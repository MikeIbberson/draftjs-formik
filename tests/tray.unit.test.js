import React from 'react';
import renderer from 'react-test-renderer';
import Tray, { ButtonListItem, Button } from '../src/components/Tray';
import { EditorState } from 'draft-js';

describe('Tray wrapper component', () => {

    it('should fail without a value prop', () =>
        expect(() => renderer.create(<Tray />))
            .toThrow(TypeError));

    it('should render successfully with all required props', () => {
        let el = renderer.create(<Tray
            name="demo"
            value={new EditorState.createEmpty()}
            onChange={jest.fn}
        />);

        let instance = el.root;

        // expect default options to kick in
        expect(instance.findAllByType(ButtonListItem)).toHaveLength(2);
        expect(instance.findAllByType(Button)).toHaveLength(10);
    });

    it('should have a subcomponent that calls the onChange prop', () => {
        let func = jest.fn();
        let el = renderer.create(<Tray
            name="events"
            value={new EditorState.createEmpty()}
            onChange={func}
        />);

        let instance = el.root;
        instance.findAllByType(Button)[0].props.onMouseDown();
        expect(func).toHaveBeenCalled();
    });

});