import React, { useState } from 'react';
import moment from 'moment'
import { Dropdown, Grid, Form, Button } from 'semantic-ui-react'
import SemanticDatepicker from 'react-semantic-ui-datepickers';

const ProgramFilters = props => {

    const loadProgram = (val, type) => {
        if (type === 'date')
            props.setFilters({
                ...props.filters,
                startDate: moment(val).format('YYYY-MM-DD')
            });

        if (type === 'interval')
            props.setFilters({
                ...props.filters,
                interval: val
            });

        if (type === 'lang')
            props.setFilters({
                ...props.filters,
                lang: val
            });

        if (type === 'book')
            props.setFilters({
                ...props.filters,
                book: val
            });
    }

    const getFrequencyOptions = () => {
        let options = []
        for (let i = 1; i < 22; i++) {
            options.push({ key: i, text: i, value: i })
        }
        return options
    }

    return (
        <div className="program-filters">
            <Grid columns='equal'>
                <Grid.Column>
                    <Form>
                        <Form.Group widths='equal'>
                            <SemanticDatepicker
                                filterDate={(date) => {
                                    const now = new Date();
                                    return date > now;
                                }}
                                fluid
                                label="Start date"
                                onChange={(e, target) => loadProgram(target.value, 'date')}
                            />
                            <Form.Field>
                                <label>Frequency</label>
                                <Dropdown
                                    style={{ height: '30px' }}
                                    fluid
                                    selection
                                    label="Frequency"
                                    placeholder="Select frequency"
                                    options={getFrequencyOptions()}
                                    onChange={(e, target) => loadProgram(target.value, 'interval')}
                                    value={props.filters.interval}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Language</label>
                                <Dropdown
                                    style={{ height: '30px' }}
                                    fluid
                                    selection
                                    placeholder="Select language"
                                    options={[
                                        { key: 1, text: 'Français', value: 'fr' },
                                        { key: 2, text: 'English', value: 'en' },
                                        { key: 3, text: 'Mandarin', value: 'ch' }
                                    ]}
                                    onChange={(e, target) => loadProgram(target.value, 'lang')}
                                    value={props.filters.lang}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Books</label>
                                <Dropdown
                                    style={{ height: '30px' }}
                                    fluid
                                    selection
                                    placeholder="Select books"
                                    options={[
                                        { key: 1, text: 'Old testament', value: 'OT' },
                                        { key: 2, text: 'New Testament', value: 'NT' },
                                        { key: 3, text: 'All', value: 'all' }
                                    ]}
                                    onChange={(e, target) => loadProgram(target.value, 'book')}
                                    value={props.filters.book}
                                />
                            </Form.Field>

                            <Form.Field style={{width: 100}}>
                                <label style={{height: 20}}/>
                                <Button onClick={() => window.print()}>
                                    Print
                                </Button>
                            </Form.Field>
                        </Form.Group>
                    </Form>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default ProgramFilters;