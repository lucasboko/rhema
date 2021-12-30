import React, { useState } from 'react';

import moment from 'moment'


import BibleReading from './Program/BibleReading.js';
import SearchBible from './Study/SearchBible.js';
import SideBar from './SideBar.js';

const Rhema = props => {

    const [app, selectApp] = useState('study')
    const [hide, setHide] = useState({ reading: false, search: false })

    return (
        <div className="bible-wrapper">
            <SideBar app={app} selectApp={selectApp}  setHide={setHide} hide={hide}/>
            <div className={app === 'study' ? "search-wrapper" : 'program-wrapper'}>
                {
                    app === 'study'
                        ? <SearchBible app={app} hide={hide} />
                        : <BibleReading />
                }
            </div>
        </div>

    )
}

export default Rhema;
