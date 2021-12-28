import React, { useState } from 'react';
import moment from 'moment';

import Month from './Month.js';
import ProgramFilters from './ProgramFilters.js';

import { NT, OT } from './testaments.js';

const BibleReading = props => {
    
    const [filters, setFilters] = useState({
        startDate: moment().format('YYYY-MM-DD'),
        interval: 3,
        lang: 'fr',
        book: 'all'
    })

    const readingList = reading(filters);
    
    return (
        <>
            <ProgramFilters filters={filters} setFilters={setFilters} />
            <div className="content">
                <div className="title">
                    {
                        filters.lang === 'fr'
                            ? 'PROGRAMME DE LECTURE BIBLIQUE 2021'
                            : '2021 BIBLE READIN PROGRAM'
                    }
                </div>
                <div className="interval-title">
                    {
                        filters.lang === 'fr'
                            ? 'De Matthieu à Apocalypse: ' + filters.interval + ' Chapitre(s) par jour'
                            : 'From Genesis to Revelation: ' + filters.interval + ' Chapter(s) per day'
                    }
                </div>
                <div className="months-listing">
                    {readingList.map((item, index) => <Month key={index} date={item.date} readingMonth={item.reads} lang={filters.lang} />)}
                </div>
            </div>
        </>

    )
}

export default BibleReading;


const reading = (filters) => {

    const {startDate, interval, lang, book} = filters
    let chapters = [];

    switch (book) {
        case 'OT': chapters = OT; break;
        case 'NT': chapters = NT; break;
        default: chapters = OT.concat(NT); break;
    }

    let chaptersDets = [], tops, datesReads = [], monthReads = [];

    chapters.map(item => {
        if (parseInt(item.chapters) === 1) {
            chaptersDets.push(item.book[lang] + ' ' + item.chapters)
        } else {
            for (var i = 1; i <= item.chapters; i++) {
                chaptersDets.push(item.book[lang] + ' ' + i)
            }
        }
    });


    let date = moment(startDate), nextDate = null;

    while (chaptersDets.length > 0) {
        tops = chaptersDets.splice(0, interval)
        const from = tops[0];
        const to = '';
        if (interval < 2) {
            tops.pop()
        } else {
            to = ' - ' + tops.pop();
        }

        datesReads.push({
            date: date.format('YYYY-MM-DD'),
            read: from + to
        })

        nextDate = date.clone().add(1, 'days');

        if (!moment(date.format('YYYY-MM-DD')).isSame(nextDate.format('YYYY-MM-DD'), 'month')) {

            monthReads.push({
                date: date.startOf('month').format('YYYY-MM-DD'),
                reads: datesReads
            });

            datesReads = [];

            date = nextDate;

        } else {
            date = nextDate;
        }


    }

    monthReads.push({
        date: date.startOf('month').format('YYYY-MM-DD'),
        reads: datesReads
    });

    return monthReads;
}
