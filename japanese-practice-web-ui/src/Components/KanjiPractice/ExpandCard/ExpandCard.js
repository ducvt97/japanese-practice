import { Button, Card, CardActions, CardContent, Collapse, Typography } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

const ExpandCard = ({data: {mainContent, subContent, mainCollapse, subCollapse}}, ref) => {
    const [expanded, setExpanded] = useState(false);

    useImperativeHandle(ref, () => ({
        triggerExpand() {
            setExpanded(true);
        },
        triggerCollapse() {
            setExpanded(false);
        }
    }));

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return ( <Card sx={{ width: '100%', maxWidth: 400 }}>
        <CardContent>
            <Typography gutterBottom variant="h1" component="div" textAlign="center" sx={{mb: 1}}>
                {mainContent || 'null'}
            </Typography>
            {subContent ? <Typography variant="h5" component="div" textAlign="center">{subContent}</Typography> : null}
        </CardContent>
        <CardActions disableSpacing>
            <Button size="medium" onClick={handleExpandClick}>{expanded ? 'Hide Result' : 'Show Result'}</Button>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <Typography variant="h3" component="div">{ mainCollapse || 'null'}</Typography>
                {subCollapse ? <Typography paragraph sx={{my: 1}}>{subCollapse}</Typography> : null}
            </CardContent>
        </Collapse>
    </Card> );
}

export default forwardRef(ExpandCard);