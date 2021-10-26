import React from 'react';
import { Button } from '@mui/material';
import ModeCommentIcon from '@mui/icons-material/ModeComment';

function Comments() {
    return (
        <Button startIcon={<ModeCommentIcon />} >
            Comment
        </Button>
    )
}

export default Comments
