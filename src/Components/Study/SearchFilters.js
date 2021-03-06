import React from 'react';
import { Form, Input, Label, Icon } from 'semantic-ui-react'

const SearchFilters = props => {

    console.log(props.searchInfo.value)
    return (
        <div style={{ padding: '10px 10px 0px 10px' }}>
            <Form>
                <Input
                    fluid
                    placeholder='Search bible...'
                    labelPosition='right'
                    onChange={e => props.onChange(e.target.value)}
                    // value={props.searchInfo.value || null} 
                >
                    <Label style={{ width: 50, textAlign: 'center' }} basic>{props.searchInfo.results.length}</Label>
                    <input />
                    <Label style={{ width: 35, borderLeft: 'none' }} basic>
                        <Icon name="times" color="grey" onClick={() => props.onChange(null)} />
                    </Label>
                </Input>
                <p />
            </Form>
        </div>
    )
}

export default SearchFilters;