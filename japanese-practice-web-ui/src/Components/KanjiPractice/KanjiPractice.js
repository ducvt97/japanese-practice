
import { useRef, useState } from "react";
import KanjiServices from "../../Services/kanji-services";
import CardShowcase from "./CardShowcase/CardShowcase.component";
import Loading from "../common/Loading.component";
import { Button, Container, FormControlLabel, FormGroup, Grid, Stack, Switch } from "@mui/material";
import SelectInput from "../common/SelectInput.component";
import CONSTANTS from "../others/constants";
import ConfirmDialog from "../common/Dialog/ConfirmDialog.component";

const typeSelectItem = [{ value: CONSTANTS.TYPE_ALL, text: 'All' }, { value: CONSTANTS.TYPE_LEVEL, text: 'Level' }]
const levelSelectItem = [
    { value: CONSTANTS.LEVEL_N5, text: 'N5' },
    { value: CONSTANTS.LEVEL_N4, text: 'N4' },
    { value: CONSTANTS.LEVEL_N3, text: 'N3' },
    { value: CONSTANTS.LEVEL_N2, text: 'N2' },
    { value: CONSTANTS.LEVEL_N1, text: 'N1' }
]

const KanjiPractice = () => {
    const [inWritingMode, setInWritingMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [beginned, setBeginned] = useState(false);
    const [kanjis, setKanjis] = useState([]);
    const [typeSelect, setTypeSelect] = useState(typeSelectItem[0].value);
    const [levelSelect, setLevelSelect] = useState(levelSelectItem[0].value);

    const dialogConfirmSwitchModeRef = useRef();
    const dialogStopRef = useRef();
    const dialogCompleteRef = useRef();

    const onPressBeginBtn = () => {
        if (typeSelect === typeSelectItem[0].value) {
            setLoading(true);
            setBeginned(false);
            KanjiServices.getAll()
                .then(res => {
                    setKanjis([...res.data.data]);
                    setLoading(false);
                    setBeginned(true);
                })
                .catch(error => { KanjiServices.handleError(error); });
        } else if (typeSelect === typeSelectItem[1].value) {
            // Will impl when data backend finished
        }
    }

    const onPressStopBtn = () => {
        if (beginned) {
            dialogStopRef.current.triggerOpen();
        } else {
            setBeginned(false);
        }
    }

    const onConfirmStop = () => {
        setBeginned(false);
        setKanjis([]);
    }

    const onSwitchMode = () => {
        if (beginned) {
            dialogConfirmSwitchModeRef.current.triggerOpen();
        } else {
            setInWritingMode(!inWritingMode);
        }
    }

    const onConfirmSwitchMode = () => {
        setBeginned(!beginned);
        setInWritingMode(!inWritingMode);
    }

    return ( <Container maxWidth="md">
        <Stack spacing={3} sx={{ mb: 4 }}>
            <FormGroup>
                <FormControlLabel control={<Switch checked={inWritingMode} onChange={onSwitchMode} />} label="Vietnamese - Kanji Mode (often used for practicing writing)" />
            </FormGroup>
            {!beginned ? <Grid container spacing={2}>
                    <Grid item xs={6}><SelectInput label="Type of Practice" data={typeSelectItem} defaultValue={typeSelectItem[0].value} onChange={setTypeSelect} style={{width: '100%'}}></SelectInput></Grid>
                    {typeSelect === typeSelectItem[1].value && 
                        <Grid item xs={6}><SelectInput label="Level" data={levelSelectItem} defaultValue={levelSelectItem[0].value} onChange={setLevelSelect} style={{width: '100%'}}></SelectInput></Grid>}
                </Grid> : null
            }
            {beginned ? <Button variant="contained" size="large" onClick={onPressStopBtn}>Stop Practice</Button>
                : <Button variant="contained" size="large" onClick={onPressBeginBtn}>Begin Practice</Button>
            }
        </Stack>
        {beginned ?
            loading ? <Loading open={loading}></Loading>
                : <CardShowcase data={kanjis} mode={inWritingMode ? CONSTANTS.MODE_WRITING : CONSTANTS.MODE_READING}></CardShowcase>
            : null
        }
        <ConfirmDialog title="Change Mode?" content="This action will stop your current practice. Do you still want to proceed?"
            onConfirm={onConfirmSwitchMode} ref={dialogConfirmSwitchModeRef}></ConfirmDialog>
        <ConfirmDialog title="Stop Practice" content="This action will stop your current practice. Do you still want to proceed?"
            onConfirm={onConfirmStop} ref={dialogStopRef}></ConfirmDialog>
        <ConfirmDialog title="Congratulate!!!" content="You have complete your practice. You can practice this again or try another." ref={dialogCompleteRef}></ConfirmDialog>
    </Container> );
}

export default KanjiPractice;