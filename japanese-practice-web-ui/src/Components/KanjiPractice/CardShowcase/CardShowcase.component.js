import { Button, Container, Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Hotkeys from 'react-hot-keys';
import Loading from "../../common/Loading.component";
import ExpandCard from "../ExpandCard/ExpandCard";
import CONSTANTS from "../../others/constants";

const CardShowcase = ({data, mode, onComplete}) => {
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [listPrevious, setListPrevious] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [isComplete, setIsComplete] = useState(false);

    const cardRef = useRef();

    useEffect(() => {
        const tempArr = [...data];
        const random = Math.floor(Math.random() * tempArr.length);
        setListPrevious([...[], ...tempArr.splice(random, 1)]);
        setCurrentIndex(0);
        setList([...[], ...tempArr]);
        setLoading(false);
    }, []);

    const onPressNextBtn = () => {
        if (list.length > 0 && !isComplete) {
            if (currentIndex === data.length - 2) {
                setIsComplete(true);
            }

            if (currentIndex === listPrevious.length - 1) {
                const tempArr = [...list],
                    random = Math.floor(Math.random() * tempArr.length);
                setListPrevious([...listPrevious, ...tempArr.splice(random, 1)]);
                setList([...tempArr]);
            }
            cardRef.current.triggerCollapse();
            setCurrentIndex(currentIndex + 1);
        } else if (list.length === 0 && currentIndex < listPrevious.length - 1) {
            cardRef.current.triggerCollapse();
            setCurrentIndex(currentIndex + 1);
        }
    }

    const onPressPreviousBtn = () => {
        if (currentIndex > 0) {
            if (list.length > 0 && isComplete) {
                setIsComplete(false);
            }
            cardRef.current.triggerCollapse();
            setCurrentIndex(currentIndex - 1);
        }
    }

    const onPressCompleteBtn = () => {
        setIsComplete(false);
        onComplete();
        setCurrentIndex(currentIndex - 1);
    }

    const onPressShortcuts = (keyName, e) => {
        e.preventDefault();
        switch (keyName) {
            case 'a':
                onPressPreviousBtn();
                break;
            case 'd':
                onPressNextBtn();
                break;
            default:
                break;
        }
    }

    return ( <Hotkeys 
        keyName="a,d" 
        onKeyUp={onPressShortcuts.bind(this)}
    >
        <Container id="test" maxWidth="xl" disableGutters>
            <Container maxWidth="xs" disableGutters sx={{mb: 3}}>
                <Stack spacing={2} direction="row">
                    <Button variant="outlined" disabled={currentIndex <= 0} onClick={onPressPreviousBtn}>Previous</Button>
                    <Button variant="contained" disabled={list.length === 0 && currentIndex === listPrevious.length - 1} onClick={onPressNextBtn}>Next</Button>
                </Stack>
            </Container>
            <Container maxWidth="xs" disableGutters>
                {loading ? <Loading open={loading}></Loading>
                    : data.length > 0 ?
                        mode === CONSTANTS.MODE_READING ?
                            <ExpandCard data={{
                                mainContent: listPrevious[currentIndex].kanji,
                                mainCollapse: listPrevious[currentIndex].vnSound,
                                subCollapse: listPrevious[currentIndex].meaning
                            }} ref={cardRef}></ExpandCard>
                            : mode === CONSTANTS.MODE_WRITING ? 
                                <ExpandCard data={{
                                    mainContent: listPrevious[currentIndex].vnSound,
                                    subContent: listPrevious[currentIndex].meaning,
                                    mainCollapse: listPrevious[currentIndex].kanji,
                                }} ref={cardRef}></ExpandCard>
                                : null
                        : 'No data found'
                }
                {isComplete && <Button variant="contained" fullWidth onClick={onPressCompleteBtn} sx={{mt: 3}}>Complete Practicing</Button>}
            </Container>
        </Container>
    </Hotkeys>);
};

export default CardShowcase;