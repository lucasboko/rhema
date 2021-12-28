import React from 'react';

import Chapter from './Chapter.js';

const Book = props => {

    const renderChapters = () => {

        const chapters = []

        if (props.book) {
            for (let i = 0; i < props.book.getElementsByTagName('CHAPTER').length; i++) {
                chapters.push(<Chapter
                    key={`chapter-${i}`}
                    chapter={props.book.getElementsByTagName('CHAPTER')[i]}
                />)
            }

            return chapters
        }

    }

    return (
        <>
            {/* <div className="book-title">{props.book.getAttribute('bname')}</div> */}
            <div className='chapter'>{renderChapters()}</div>
        </>
    )
}

export default Book;