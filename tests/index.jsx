import React from 'react';
import ReactDOM from 'react-dom';
import { EditorState } from 'draft-js';
import { Formik, Form, Field } from 'formik';
import RichText from '../src/index.jsx';

const App = () => (<Formik initialValues={{ richtext: new EditorState.createEmpty() }}>
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


ReactDOM.render(<App />, document.getElementById('root'));