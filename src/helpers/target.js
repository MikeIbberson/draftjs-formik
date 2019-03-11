/** 
 * @NOTE
 * 
 * Mock event object. 
 * The handlers expect DraftJS's value to be nested within a target.
 * This also specifies a field type, "text", for validation purposes outside this module.
 */

export default args => ({
    target: Object.assign(args, {
        type: 'text'
    })
});