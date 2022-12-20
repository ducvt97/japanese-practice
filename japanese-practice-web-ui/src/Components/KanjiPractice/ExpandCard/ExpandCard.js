import { Button, Card, CardActions, CardContent, Collapse, Typography } from "@mui/material";
import { useState } from "react";

const ExpandCard = (props) => {
    const data = props.data;
    const [expanded, setExpanded] = useState(false);
    // console.log(data);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return ( <Card sx={{ width: '100%', maxWidth: 400 }}>
        <CardContent>
            <Typography gutterBottom variant="h1" component="div" textAlign="center">
                {data && data.mainContent ? data.mainContent : 'null'}
            </Typography>
            {data && data.subContent ? <Typography paragraph>{data.subContent}</Typography> : null}
        </CardContent>
        <CardActions disableSpacing>
            <Button size="medium" onClick={handleExpandClick}>{expanded ? 'Hide Result' : 'Show Result'}</Button>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <Typography variant="h3" component="div">{data && data.mainCollapse ? data.mainCollapse : 'null'}</Typography>
                {data && data.subCollapse ? <Typography paragraph>{data.subCollapse}</Typography> : null}
            </CardContent>
        </Collapse>
    </Card> );
}

export default ExpandCard;