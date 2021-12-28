import React from 'react';

const Verse = props => {
    
    return (
        <table id={`verse-${props.verse.getAttribute('vnumber')}`}>
            <tbody>
                <tr>
                    <td className="verse-number">{props.verse.getAttribute('vnumber')}</td>
                    <td className={`verse-text ${props.hasHlv === props.verse.getAttribute('vnumber') - 1 ? 'highlight' : null}`}>{props.verse.innerHTML}</td>
                </tr>
            </tbody>
        </table>

    )
}

export default Verse;
