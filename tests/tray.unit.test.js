import React from 'react';
import Tray, { ButtonListItem, Button } from '../src/components/Tray';
import { EditorState } from 'draft-js';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const props = {
    value: new EditorState.createEmpty(),
    name: 'demo'
};

beforeAll(() => Enzyme.configure({
    adapter: new Adapter()
}));

describe('Tray wrapper component', () => {

    it('should fail without a value prop', () =>
        expect(() => shallow(<Tray />))
            .toThrow(TypeError));

    it('should render successfully with all required props', () => {
        let wrapper = shallow(<Tray
            onChange={jest.fn}
            {...props}
        />);

        // expect default options to kick in
        // test will fail if defaults get modified
        expect(wrapper.find(ButtonListItem)).toHaveLength(2);
        expect(wrapper.find(Button)).toHaveLength(10);
    });
});

describe('Tray block and style subcomponents', () => {

    it('should call the onChange prop', () => {
        let func = jest.fn();
        let wrapper = shallow(<Tray
            onChange={func}
            {...props}
        />);

        wrapper.find(Button).first().simulate('mouseDown');
        expect(func).toHaveBeenCalled();
    });

    it('should call the editor\'s focus method', () => {
        let focus = jest.fn();
        let wrapper = shallow(<Tray
            editor={{ current: { focus } }}
            {...props}
        />);

        wrapper.find(Button).first().simulate('mouseUp');
        expect(focus).toHaveBeenCalled();
    });

    it('should return null onMouseUp without an editor', () => {
        let wrapper = shallow(<Tray {...props} />);
        let btn = wrapper.find(Button).first().prop('onMouseUp');
        expect(btn()).toEqual(null);
    });

    it('should throw an error on onMouseDown without an onChange', () => {
        let wrapper = shallow(<Tray {...props} />);
        let btn = wrapper.find(Button).first().prop('onMouseDown');
        expect(() => btn()).toThrow();
    });


    /**  Need to unit test 
     * Not working and probably not proper.
     * 
    it('should activate on mouseDown', () => {
        let func = jest.fn();
        let wrapper = shallow(<Tray
            onChange={func}
            {...props}
        />);

        let btn = wrapper.find(Button).first();
        expect(btn.prop('active')).toBeFalsy();
        btn.prop('onMouseDown')();

        wrapper.update();
        expect(wrapper.find(Button).first().prop('active')).toBeTruthy();

    });
    */
});
