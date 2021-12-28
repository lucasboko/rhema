import React from 'react';
import { Form, Input, Grid } from 'semantic-ui-react'

const SearchFilters = props => {

    
    return (
        <div style={{padding: '10px 10px 0px 10px'}}>
            <Form>
                <Input
                    fluid
                    placeholder='Search bible...'
                    labelPosition='left'
                    label={{ basic: true, content: `${props.searchInfo.results.length}` }}
                    onChange={e => props.onChange(e.target.value)}
                />
                <p />
                {/* <Form.Group inline>
                        <Form.Checkbox slider label="Spaces" />
                        <Form.Checkbox slider label="ponctuations" />
                    </Form.Group> */}
            </Form>
        </div>
    )
}

export default SearchFilters;