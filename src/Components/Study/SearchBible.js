import React, { useState, useEffect, useLayoutEffect } from 'react';
import { debounce, filter } from "lodash";
import { Icon, Button } from 'semantic-ui-react';


import Book from './Book.js';
import SearchFilters from './SearchFilters.js'
import Chapter from './Chapter.js';
import ReadingNavigation from './ReadingNavigation.js';


const SearchBible = props => {

    // const [searchFilters, setFilters] = useState({ spaces: undefined, results: [] })
    // const [currentBookIndex, setBookIndex] = useState(0)

    const [xml, setXML] = useState(undefined)
    const [versesList, setVerses] = useState(undefined)
    const [searchInfo, setSearch] = useState({ value: undefined, results: [] })
    const [readingIndex, setReadingIndex] = useState({ book: 0, chapter: 0, hlv: undefined })

    const [hide, setHide] = useState({ reading: false, search: false })


    useEffect(() => {
        if (!xml) {
            fetch('bibles/lsg.xml')
                .then(resp => resp.text())
                .then(xml => {

                    const parser = new DOMParser()
                    const xmlBible = parser.parseFromString(xml, 'text/xml')
                    let verses = [], book, chapter;

                    if (!versesList) {
                        for (let i = 0; i < xmlBible.getElementsByTagName('BIBLEBOOK').length; i++) {
                            book = xmlBible.getElementsByTagName('BIBLEBOOK')[i]

                            for (let j = 0; j < book.getElementsByTagName('CHAPTER').length; j++) {
                                chapter = book.getElementsByTagName('CHAPTER')[j]

                                for (let f = 0; f < chapter.getElementsByTagName('VERS').length; f++) {
                                    verses.push({
                                        bIndex: i,
                                        cIndex: j,
                                        book: book.getAttribute('bname'),
                                        cnumber: chapter.getAttribute('cnumber'),
                                        vnumber: chapter.getElementsByTagName('VERS')[f].getAttribute('vnumber'),
                                        text: chapter.getElementsByTagName('VERS')[f].innerHTML
                                    })
                                }
                            }
                        }
                        setVerses(verses)
                    }
                    setXML(xmlBible)
                })
        }
    })

    useLayoutEffect(() => {
        if (readingIndex.hlv) {
            var ele = document.getElementById(`verse-${readingIndex.hlv}`);
            console.log(ele)
            ele.scrollIntoView();
        }

    }, [readingIndex.hlv])

    const goToChapter = (b, c, v) => {
        setReadingIndex({ book: b, chapter: c, hlv: v })
    }

    const search = debounce(val => {
        let filtered = []
        if (versesList && val && val.length > 2) {
            // const filtered = filter(versesList, v => v.text.replace(/ /g, "").toLowerCase().includes(val.replace(/ /g, "").toLowerCase()));
            // const filtered = filter(versesList, v => v.text.trim().replace(/[^\w\s]|_/g, "").toLowerCase().includes(val.trim().replace(/[^\w\s]|_/g, "").toLowerCase()));
            filtered = filter(versesList, v => v.text.trim().toLowerCase().includes(val.trim().toLowerCase()));

        }

        if (filtered && filtered.length) {
            setSearch({ value: val, results: filtered })
        } else {
            setSearch({ value: undefined, results: [] })
        }

    }, 500)


    const highlight = (text, val) => {
        const index = text.trim().toLowerCase().indexOf(val.trim().toLowerCase())
        const substring = text.substring(index, index + val.length)
        const start = text.substring(0, index)
        const end = text.substring(index + val.length, text.length)

        // console.log(index, substring, start, end)
        return index >= 0 ? <div>{start}<span className="search-highlight">{substring}</span>{end}</div> : <div className="dimed-search">{text}</div>
    }

    const displayBible = () => {
        const books = []
        if (xml) {
            for (let i = 0; i < xml.getElementsByTagName('BIBLEBOOK').length; i++) {
                books.push(<Book
                    key={`book-${i}`}
                    book={xml.getElementsByTagName('BIBLEBOOK')[i]}
                />)
            }

            return books
        }

        return 'none'
    }


    return (

        <div className="app-wrapper">
            {/* <div className="bible-content">{displayBible()}</div> */}
            {/* <div className="bible-content"> */}
            <div className="bible-reading" style={{ display: `${hide.reading ? 'none' : 'initial'}`, width: `calc(100% / ${hide.search ? 1 : 2}`}}>
                <ReadingNavigation
                    readingIndex={readingIndex}
                    setReadingIndex={setReadingIndex}
                    xml={xml}
                />
                <div className="bible-search-results">
                    {/* <Book
                        book={xml ? xml.getElementsByTagName('BIBLEBOOK')[readingIndex.book] : undefined}
                    /> */}
                    {
                        xml ?
                            <Chapter
                                key={`chapter-${readingIndex.chapter}`}
                                chapter={xml.getElementsByTagName('BIBLEBOOK')[readingIndex.book].getElementsByTagName('CHAPTER')[readingIndex.chapter]}
                                hasHlv={readingIndex.hlv}
                            />
                            : null
                    }
                </div>
            </div>
            <div className="bible-search"  style={{ display: `${hide.search ? 'none' : 'initial'}`, width: `calc(100% / ${hide.reading ? 1 : 2}` }}>
                <SearchFilters onChange={search} searchInfo={searchInfo} />
                <div className="bible-search-results">
                    {
                        searchInfo.results && searchInfo.results.map(
                            (item, index) => <div key={`search-${index}`} className="search-results-verse ">
                                <div><strong>{`${item.book} ${item.cnumber}:${item.vnumber}`}</strong>{' '}<Icon name="linkify" color="teal" size="small" onClick={() => goToChapter(item.bIndex, item.cnumber - 1, item.vnumber - 1)} /></div>
                                {highlight(item.text, searchInfo.value)}
                            </div>

                        )
                    }
                </div>
            </div>
            <div style={{ position: 'fixed', bottom: 20, left: 20, display: `${props.app !== 'study' ? 'none' : 'initial'}` }}>
                <Button size="tiny" onClick={() => setHide({ ...hide, reading: !hide.reading })}>{`${hide.reading ? 'show' : 'hide'} reading`}</Button>
                <br /><br />
                <Button size="tiny" onClick={() => setHide({ ...hide, search: !hide.search })}>{`${hide.search ? 'show' : 'hide'} study`}</Button>
            </div>
        </div>

    )
}

export default SearchBible;
