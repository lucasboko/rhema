import React from 'react';

import moment from 'moment';

moment.locale('fr');
moment.weekdays(true)

const getMonthLang = (mois, lang) => {
    
    const month = {
        janvier: {
            en: 'January',
            fr: 'Janvier'
        },
        février: {
            en: 'February',
            fr: 'Février'
        },
        mars: {
            en: 'March',
            fr: 'Mars'
        },
        avril: {
            en: 'April',
            fr: 'Avril'
        },
        mai: {
            en: 'May',
            fr: 'Mai'
        },
        juin: {
            en: 'June',
            fr: 'Juin'
        },
        juillet: {
            en: 'July',
            fr: 'Juillet'
        },
        août: {
            en: 'August',
            fr: 'Août'
        },
        septembre: {
            en: 'September',
            fr: 'Septembre'
        },
        octobre: {
            en: 'October',
            fr: 'Octobre'
        },
        novembre: {
            en: 'November',
            fr: 'Novembre'
        },
        décembre: {
            en: 'December',
            fr: 'Décembre'
        }
    };
    
    return month[mois][lang];
}

const Month = (props) => {

    let daysInMonth,
        calendarRows = [],
        month = parseInt(moment(props.date).month()),
        year = parseInt(moment(props.date).year());


    const fillMonth = () => {


        let calendarDays = [];

        let firstDay = moment(props.date).isoWeekday();


        // Fill month blanks
        for (let i = 1; i < firstDay; i++) {
            calendarDays.push('');
        }

        daysInMonth = moment(year + '-' + (month + 1), "YYYY-MM").daysInMonth()

        for (let date = 1; date <= daysInMonth; date++) {

            calendarDays.push(date);
        }

        let rows = [];

        for (let i = 0, j = calendarDays.length; i < j; i += 7) {

            rows.push(calendarDays.slice(i, i + 7));
        }

        return rows;

    }


    // Split the list of days on set of 7
    const splitInWeeks = () => {

        let week = [], rowsStyled = [];

        calendarRows = fillMonth();

        for (let w = 0; w < calendarRows.length; w++) {

            week = [];

            for (let d = 0; d < calendarRows[w].length; d++) {

                const date = moment([year, month, calendarRows[w][d]]).format('YYYY-MM-DD')

                const reading = props.readingMonth.find(o => o.date === date);

                week.push(
                    <td key={d}>
                        <span>{calendarRows[w][d]}</span>
                        {
                            reading !== undefined &&
                            <p>
                                {reading.read}
                            </p>
                        }
                    </td>
                );

            }
            rowsStyled.push(<tr key={w}>{week}</tr>)
        }

        return rowsStyled;
    }


    const mois = moment(props.date).format('MMMM');
    
    return (

        <div>
            <div className="month">
                <div className="mois">{getMonthLang(mois, props.lang) + ' ' + moment(props.date).format('YYYY')}</div>
                <table>
                    <thead>
                        <tr className="week days-name">
                            <td>{props.lang === 'fr' ? 'Lundi' : 'Monday'}</td>
                            <td>{props.lang === 'fr' ? 'Mardi' : 'Tuesday'}</td>
                            <td>{props.lang === 'fr' ? 'Mercredi' : 'Wednesday'}</td>
                            <td>{props.lang === 'fr' ? 'Jeudi' : 'Thursday'}</td>
                            <td>{props.lang === 'fr' ? 'Vendredi' : 'Friday'}</td>
                            <td>{props.lang === 'fr' ? 'Samedi' : 'Saturday'}</td>
                            <td>{props.lang === 'fr' ? 'Dimanche' : 'Sunday'}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {splitInWeeks()}
                    </tbody>
                </table>
            </div>
            <div className="pagebreak"> </div>
        </div>

    )
}


export default Month;