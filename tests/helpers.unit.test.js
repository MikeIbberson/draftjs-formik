import mockTarget from '../src/helpers/target';

it('should inject arguments into a "target" property', () => {
    let args = { name: 'Foo', value: 'Bar' }
    let obj = mockTarget(args);

    expect(obj).toHaveProperty('target');
    expect(obj.target).toEqual(Object.assign(args, {
        type: 'text'
    }));
});

it('should throw a TypeError without arguments', () =>
    expect(() => mockTarget())
        .toThrow(TypeError));

it('should throw an error without name or value', () =>
    expect(() => mockTarget({ name: 'Mike' }))
        .toThrowError());