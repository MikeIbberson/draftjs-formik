# DraftJS for Formik 

This is a drop-in implementation of DraftJS. It assumes base-level functionality, mainly text formatting without embedding, linking and other advanced features. As a styled component, you can easily modify the UI to fit your project. To customize further, I suggest looking at Jared's example from Formik: https://codesandbox.io/s/QW1rqjBLl. 

___Coming soon___

## Setup

To get this Rich Text Editor working, you'll require the "EditorState" export from draft-js. You will also want to read up on custom field rendering in Formik.

```

import React from 'react';
import { EditorState } from 'draft-js';
import { Formik, Form, Field } from 'formik';
import RichText from '../src/index.jsx';

const Example = () => (
    <Formik initialValues={{ richtext: new EditorState.createEmpty() }}>
    {() => (
        <Form>
            <Field
                name="richtext"
                render={({ field }) =>
                    <RichText {...field} />
                }
            />
        </Form>
    )}
</Formik>);

```

The example above loads the Editor's default state into Formik's wrapper so that it can be referenced inside the Field element's render function. My implementation requires many of the field's properties, including the onChange function and the name, so it's easiest to deconstruct the whole object into the component. 

This should be enough to get it working. One thing to note is that I intentionally leave out Draft-JS's default styles. You can import them yourself into the project, reference the class names explicitly or extend my styled component.