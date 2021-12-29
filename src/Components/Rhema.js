import React, { useState } from 'react';

import moment from 'moment'


import BibleReading from './Program/BibleReading.js';
import SearchBible from './Study/SearchBible.js';
import SideBar from './SideBar.js';

const Rhema = props => {

    const [app, selectApp] = useState('study')

    return (
        <div className="bible-wrapper">
            <SideBar app={app} selectApp={selectApp} />
            <div className={app === 'study' ? "search-wrapper" : 'program-wrapper'}>
                {
                    app === 'study'
                        ? <SearchBible app={app} />
                        : <BibleReading />
                }
            </div>
        </div>

    )
}

export default Rhema;
