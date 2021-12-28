import React, { useState } from 'react';

const SideBar = props => {

    // const displayBooksTitle = () => {

    //     const titles = []

    //     if (props.books) {
    //         for (let i = 0; i < props.books.length; i++) {
    //             titles.push(
    //                 <a
    //                     key={`book-link-${i}`}
    //                     className={`bible-title-link ${props.currentBookIndex === i ? 'selected' : ''}`}
    //                     onClick={() => props.loadBook(i)}
    //                 >{props.books[i].getAttribute('bname')}</a>
    //             )
    //         }

    //         return titles
    //     }

    //     return 'no books'

    // }



    return <div className="bible-sidebar">
        <a
            key={`book-link-reading`}
            className={`bible-title-link ${props.app === 'reading' ? 'selected' : ''}`}
            onClick={() => props.selectApp('reading')}
        >Reading</a>
        <a
            key={`book-link-study`}
            className={`bible-title-link ${props.app === 'study' ? 'selected' : ''}`}
            onClick={() => props.selectApp('study')}
        >Study</a>
    </div>
}

export default SideBar;
