import React, { useState } from 'react';
import { Dropdown, Icon, Button, Checkbox } from 'semantic-ui-react';

const SideBar = props => {


    // return <div className="bible-sidebar">
    //     <a
    //         key={`book-link-reading`}
    //         className={`bible-title-link ${app === 'reading' ? 'selected' : ''}`}
    //         onClick={() => selectApp('reading')}
    //     >Reading</a>
    //     <a
    //         key={`book-link-study`}
    //         className={`bible-title-link ${app === 'study' ? 'selected' : ''}`}
    //         onClick={() => selectApp('study')}
    //     >Study</a>
    // </div>
    const { hide, setHide, app, selectApp } = props;

    return <div style={{
        position: 'fixed',
        bottom: 30,
        right: 30,
        zIndex: 100
    }}>
        <Dropdown
            icon="filter"
            style={{
                backgroundColor: 'red',
                borderRadius: 100,
                padding: "10px 8px 8px 11px",
                textAlign: 'center',
                color: 'white'
            }}
            direction='left'
            multiple
        >
            <Dropdown.Menu style={{ width: 150, marginBottom: 10, padding: "15px 0", border: 'none', borderRadius: 10 }}>
                <Dropdown.Item style={{ display: `${app !== 'study' ? 'none' : 'block'}` }}>
                    <Checkbox
                        toggle 
                        checked={!hide.reading ? true : false}
                        label="Reading"
                        onChange={e => setHide({ ...hide, reading: !hide.reading })}
                    />
                </Dropdown.Item>
                <Dropdown.Item style={{ display: `${app !== 'study' ? 'none' : 'block'}` }}>
                    <Checkbox
                        toggle
                        checked={!hide.search ? true : false}
                        label="Search"
                        onChange={e => setHide({ ...hide, search: !hide.search })}
                    />
                </Dropdown.Item>
                <Dropdown.Divider  style={{ display: `${app !== 'study' ? 'none' : 'block'}` }}/>
                <Dropdown.Item text='Program' onClick={() => selectApp('reading')} style={{ color: `${app === 'reading' ? 'red' : 'black'}` }} />
                <Dropdown.Item text='Study' onClick={() => selectApp('study')} style={{ color: `${app === 'study' ? 'red' : 'black'}` }} />
            </Dropdown.Menu>
        </Dropdown>
    </div >
}

export default SideBar;
