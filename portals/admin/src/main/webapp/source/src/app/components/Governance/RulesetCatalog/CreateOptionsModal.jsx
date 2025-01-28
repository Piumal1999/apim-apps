/* eslint-disable */

import React from 'react';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function CreateOptionsModal({ open, handleClose }) {
    const history = useHistory();

    const options = [
        {
            title: <FormattedMessage
                id='Governance.Rulesets.Create.genai'
                defaultMessage='Create with GenAI'
            />,
            description: <FormattedMessage
                id='Governance.Rulesets.Create.genai.desc'
                defaultMessage='Use AI to help you create a ruleset'
            />,
            image: '/site/public/images/genai.png', // Add your image path
            onClick: () => history.push('/governance/ruleset-catalog/create?mode=genai')
        },
        {
            title: <FormattedMessage
                id='Governance.Rulesets.Create.scratch'
                defaultMessage='Create from Scratch'
            />,
            description: <FormattedMessage
                id='Governance.Rulesets.Create.scratch.desc'
                defaultMessage='Create a ruleset manually'
            />,
            image: '/site/public/images/manual.png', // Add your image path
            onClick: () => history.push('/governance/ruleset-catalog/create?mode=manual')
        }
    ];

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <FormattedMessage
                    id='Governance.Rulesets.Create.options'
                    defaultMessage='Choose Creation Method'
                />
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={3} sx={{ p: 2 }}>
                    {options.map((option) => (
                        <Grid item xs={12} sm={6} key={option.title}>
                            <Card 
                                onClick={option.onClick}
                                sx={{ 
                                    cursor: 'pointer',
                                    '&:hover': { boxShadow: 6 }
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={option.image}
                                    alt={option.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6">
                                        {option.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {option.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
        </Dialog>
    );
}

export default CreateOptionsModal;