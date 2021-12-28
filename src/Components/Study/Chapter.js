import React, { useState, useEffect } from 'react';

import Verse from './Verse.js';

const Chapter = props => {

    const renderVerses = () => {
        const verses = []
        if (props.chapter) {
            for (let i = 0; i < props.chapter.getElementsByTagName('VERS').length; i++) {
                verses.push(<Verse
                    key={`verse-${i}`}
                    hasHlv={props.hasHlv}
                    verse={props.chapter.getElementsByTagName('VERS')[i]}
                />)
            }

            return verses
        }

        return 'none'
    }

    return (
        <div>
            {/* <div>
                <span className="chapter-book-title">{props.chapter.parentNode.getAttribute('bname')}</span>
                {' '}
                <span className="chapter-number">{props.chapter.getAttribute('cnumber')}</span>
            </div> */}
            <div className="chapter-content" >{renderVerses()}</div>
        </div>

    )
}

export default Chapter;
