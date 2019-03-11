/** 
 * @NOTE
 * 
 * Mock event object. 
 * The handlers expect DraftJS's value to be nested within a target.
 * This also specifies a field type, "text", for validation purposes outside this module.
 */

export default args => {
    if (!args) {
        throw new TypeError('Expects an object');
    }

    if (!args.name || !args.value) {
        throw new Error('Arguments must contain name and value properties');
    }

    return {
        target: Object.assign(args, {
            type: 'text'
        })
    };
}