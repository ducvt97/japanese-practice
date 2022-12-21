
import { useEffect, useState, useRef } from "react";
import KanjiServices from "../../Services/kanji-services";
import CardShowcase from "./CardShowcase/CardShowcase.component";
import Loading from "../common/Loading.component";
import { Box, Button, Container, Grid, Stack } from "@mui/material";
import SelectInput from "../common/SelectInput.component";

const typeSelectItem = [{ value: 0, text: 'All' }, { value: 1, text: 'Level' }]

const KanjiPractice = () => {
    const [loading, setLoading] = useState(true);
    const [kanjis, setKanjis] = useState([]);
    const [typeSelect, setTypeSelect] = useState(typeSelectItem[0].value);

    const childRef = useRef();
    useEffect(() => {
        KanjiServices.getAll()
            .then(res => {
                setKanjis([...res.data.data]);
                setLoading(false);
            })
            .catch(error => { KanjiServices.handleError(error); });
    }, []);

    const onPressReloadBtn = () => {
        childRef.current.reload();
    }
    return ( <Container sx={{ width: '100%' }}>
        <Stack>
            <SelectInput label="Type of Practice" data={typeSelectItem} onChange={setTypeSelect} style={{width: 200}}></SelectInput>
        </Stack>
        {loading ? <Loading open={loading}></Loading>
            : <><Button variant="outlined" onClick={onPressReloadBtn}>Reload</Button><CardShowcase data={kanjis} ref={childRef}></CardShowcase></>
        }
    </Container> );
}

export default KanjiPractice;