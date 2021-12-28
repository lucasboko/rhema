import React, { useState } from 'react';
import moment from 'moment';
import { Dropdown, Icon, Menu, Button } from 'semantic-ui-react';


const ReadingNavigation = props => {

    const { xml, readingIndex, setReadingIndex } = props;
    
    const getBooksList = () => {
        let options = []
        if (xml) {
            for (let i = 0; i < xml.getElementsByTagName('BIBLEBOOK').length; i++) {
                options.push({ key: i, text: xml.getElementsByTagName('BIBLEBOOK')[i].getAttribute('bname'), value: i })
            }
        }
        return options

    }

    const getChaptersCount = () => {
        let options = []
        if (xml) {
            const count = xml.getElementsByTagName('BIBLEBOOK')[readingIndex.book].getElementsByTagName('CHAPTER').length;
            for (let i = 0; i < count; i++) {
                options.push({ key: i, text: i + 1, value: i })
            }
        }
        return options

    }

    const loadBook = (e, target) => {
        setReadingIndex({ book: target.value, chapter: 0, hlv: undefined })
        window.scrollTo({ top: 0 });
    }

    const loadChapter = (e, target) => {
        setReadingIndex({ ...readingIndex, chapter: target.value, hlv: undefined });
        window.scrollTo({ top: 0 });
    }

    const firstChapter = () => {
        setReadingIndex({ ...readingIndex, chapter: 0, hlv: undefined })
    }

    const previousChapter = () => {
        let cc = readingIndex.chapter;
        setReadingIndex({ ...readingIndex, chapter: cc > 0 ? cc - 1 : 0, hlv: undefined })
    }

    const nextChapter = () => {
        let cc = readingIndex.chapter;
        const total = xml.getElementsByTagName('BIBLEBOOK')[readingIndex.book].getElementsByTagName('CHAPTER').length;
        setReadingIndex({ ...readingIndex, chapter: cc < total - 1 ? cc + 1 : total - 1, hlv: undefined })
    }

    const lastChapter = () => {
        setReadingIndex({ ...readingIndex, chapter: xml.getElementsByTagName('BIBLEBOOK')[readingIndex.book].getElementsByTagName('CHAPTER').length - 1, hlv: undefined })
    }

    return (
        <div style={{ padding: '11px' }}>
            {
                xml ?
                    <Menu style={{ boxShadow: 'none' }}>
                        <Dropdown
                            style={{ borderColor: 'transparent', backgroundColor: '#f5f5f5', borderRadius: '0', height: '30px' }}
                            fluid
                            selection
                            search
                            placeholder="Select book"
                            options={getBooksList()}
                            onChange={loadBook}
                            value={readingIndex.book}
                        />
                        <Dropdown
                            style={{ borderColor: 'transparent', height: '30px' }}
                            fluid
                            selection
                            search
                            placeholder="Select chapter"
                            options={getChaptersCount()}
                            onChange={loadChapter}
                            value={readingIndex.chapter}
                        />
                        <Button.Group basic style={{ border: 'none' }}>
                            <Button
                                style={{ border: 'none' }}
                                onClick={firstChapter}
                            >
                                <Icon name='angle double left' />
                            </Button>
                            <Button
                                style={{ border: 'none' }}
                                onClick={previousChapter}
                            >
                                <Icon name='angle left' />
                            </Button>
                        </Button.Group>
                        {/* <Menu.Item style={{ borderLeft: '1px solid #eee' }}>{xml ? xml.getElementsByTagName('BIBLEBOOK')[readingIndex.book].getAttribute('bname') : null}</Menu.Item> */}
                        {/* <Menu.Item style={{ borderLeft: '1px solid #eee' }}>Chapter</Menu.Item> */}
                        <Button.Group basic style={{ border: 'none' }}>
                            <Button
                                style={{ border: 'none' }}
                                onClick={nextChapter}
                            >
                                <Icon name='angle right' />
                            </Button>
                            <Button
                                style={{ border: 'none' }}
                                onClick={lastChapter}
                            >
                                <Icon name='angle double right' />
                            </Button>
                        </Button.Group>
                    </Menu>
                    : null
            }
        </div>
    )
}

export default ReadingNavigation;