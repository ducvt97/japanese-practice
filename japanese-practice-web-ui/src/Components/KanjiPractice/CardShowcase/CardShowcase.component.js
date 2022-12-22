import { Button, Container, Stack } from "@mui/material";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import Loading from "../../common/Loading.component";
import ExpandCard from "../ExpandCard/ExpandCard";
import CONSTANTS from "../../others/constants";

const CardShowcase = ({data, mode}, ref) => {
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [listPrevious, setListPrevious] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        reload();
    }, []);

    useImperativeHandle(ref, () => ({
        reload() {
            reload();
        }
    }));

    const reload = () => {
        setLoading(true);
        const tempArr = [...data];
        const random = Math.floor(Math.random() * tempArr.length);
        setListPrevious([...[], ...tempArr.splice(random, 1)]);
        setCurrentIndex(0);
        setList([...[], ...tempArr]);
        setLoading(false);
    }

    const onPressNextBtn = () => {
        if (currentIndex === listPrevious.length - 1) {
            const tempArr = [...list],
                random = Math.floor(Math.random() * tempArr.length);
            setListPrevious([...listPrevious, ...tempArr.splice(random, 1)]);
            setList([...tempArr]);
        }
        setCurrentIndex(currentIndex + 1);
    }

    const onPressPreviousBtn = () => {
        setCurrentIndex(currentIndex - 1);
    }

    return ( <Container maxWidth="xl">
        <Container maxWidth="xs" disableGutters sx={{mb: 3}}>
            <Stack spacing={2} direction="row">
                <Button variant="outlined" disabled={currentIndex <= 0} onClick={onPressPreviousBtn}>Previous</Button>
                <Button variant="contained" disabled={list.length === 0} onClick={onPressNextBtn}>Next</Button>
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
                        }}></ExpandCard>
                        : mode === CONSTANTS.MODE_WRITING ? 
                            <ExpandCard data={{
                                mainContent: listPrevious[currentIndex].vnSound,
                                subContent: listPrevious[currentIndex].meaning,
                                mainCollapse: listPrevious[currentIndex].kanji,
                            }}></ExpandCard>
                            : null
                    : 'No data found'
            }
        </Container>
    </Container>);
};

export default forwardRef(CardShowcase);