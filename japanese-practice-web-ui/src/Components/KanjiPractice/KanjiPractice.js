import { useEffect, useState } from "react";
import KanjiServices from "../../Services/kanji-services";

const KanjiPractice = () => {
    const [kanjis, setKanjis] = useState();
    useEffect(() => {
        KanjiServices.getAll().then(res => { setKanjis(res.data.data) });
    }, []);
    return ( <>{kanjis}</> );
}

export default KanjiPractice;