import { Button } from "@mui/material";
import { useEffect, useLayoutEffect, useState } from "react";
import KanjiServices from "../../Services/kanji-services";
import ExpandCard from "./ExpandCard/ExpandCard";

const KanjiPractice = () => {
    const [loading, setLoading] = useState(true);
    const [kanjis, setKanjis] = useState([]);
    const [previousKanjis, setPreviousKanjis] = useState([]);
    // const [currentKanji, setCurrentKanji] = useState({});
    const [currentIndex, setCurrentIndex] = useState(-1);
    useLayoutEffect(() => {
        KanjiServices.getAll()
            .then(res => {
                const data = [...res.data.data];
                const random = Math.floor(Math.random() * data.length);
                // console.log(random)
                // setCurrentKanji({...currentKanji, ...data.splice(random, 1)[0]});
                setPreviousKanjis([...previousKanjis, ...data.splice(random, 1)]);
                setCurrentIndex(currentIndex + 1);
                setKanjis([...kanjis, ...data]);
                setLoading(false);
            })
            .catch(error => { KanjiServices.handleError(error); });
    }, []);

    const onPressNextBtn = () => {
        const tempArr = [...kanjis],
            random = Math.floor(Math.random() * tempArr.length);
        setPreviousKanjis([...previousKanjis, ...tempArr.splice(random, 1)]);
        // setCurrentKanji({...currentKanji, ...tempArr.splice(random, 1)[0]});
        setCurrentIndex(currentIndex + 1);
        setKanjis(tempArr);
        console.log(currentIndex);
    }

    return ( <><Button variant="contained" onClick={onPressNextBtn}>Next</Button>
        
        {loading ? null :<ExpandCard data={{mainContent: previousKanjis[currentIndex].kanji, mainCollapse: previousKanjis[currentIndex].vnSound}}>
            </ExpandCard> }
    </>);
}

export default KanjiPractice;