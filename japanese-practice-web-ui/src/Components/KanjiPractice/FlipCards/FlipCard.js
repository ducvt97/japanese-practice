import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';

const FlipCard = (props) => {
    const data = props.data;
    const [isFlipped, setIsFlipped] = useState();
    return <>
        <ReactCardFlip
            cardStyles={{front: style.cardFront, back: style.cardBack}}
            containerStyle={style.cardContainer}
            isFlipped={isFlipped}
            onClick={() => setIsFlipped(!isFlipped)}>
                <>{data.front}</>
                <>{data.back}</>
        </ReactCardFlip>
    </>;
}
 
export default FlipCard;

const style = {
    cardContainer: {
        'box-shadow': '0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%)',
        'border-radius': '8px'
    },
    cardFront: {},
    cardBack: {}
}