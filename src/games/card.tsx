import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    Grid,
    Typography,
} from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import { Component } from 'react'

type ICategory = 'multiplayer' | '4-6 player' | 'online' | 'offline'

interface ICardProps {
    title: string
    image: string
    categoryList: ICategory[]
    onClick: () => void
    playButtonTitle: string
}

export class DetailCard extends Component<ICardProps> {
    render() {
        const { onClick, image, title, categoryList, playButtonTitle } = this.props
        return (
            <Card>
                <CardActionArea onClick={onClick}>
                    <CardMedia
                        image={image}
                        title="battle-ship-icon"
                        sx={{
                            height: 0,
                            pt: '60%',
                        }}
                    />
                    <CardContent>
                        <Typography sx={{ fontWeight: 'bold', mb: 1 }}>
                            {title}
                        </Typography>
                        <Grid container flexWrap="nowrap" spacing={1}>
                            {categoryList.map((ctg) => (
                                <Chip
                                    color="default"
                                    label={ctg}
                                    sx={{ mb: 1, mr: 1 }}
                                    deleteIcon={<DoneIcon />}
                                    onDelete={() => {}}
                                />
                            ))}
                        </Grid>
                    </CardContent>
                </CardActionArea>
                <CardActions style={{ justifyContent: 'flex-end' }}>
                    <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        onClick={onClick}
                    >
                        {playButtonTitle}
                    </Button>
                </CardActions>
            </Card>
        )
    }
}

export class SmallCard extends Component<ICardProps> {
    render() {
        const { onClick, image, title, categoryList, playButtonTitle } = this.props

        return (
            <Card>
                <CardActionArea onClick={onClick}>
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            padding: 16,
                            background: `url(${image}) center center no-repeat`,
                        }}
                    >
                        <Typography sx={{ fontWeight: 'bold', color: 'white', mb: 1 }}>
                            {title}
                        </Typography>
                        <Grid container flexWrap="nowrap" spacing={1}>
                            {categoryList.map((ctg) => (
                                <Chip
                                    color="info"
                                    label={ctg}
                                    sx={{ mb: 1, mr: 1 }}
                                    deleteIcon={<DoneIcon />}
                                    onDelete={() => {}}
                                    size="small"
                                />
                            ))}
                        </Grid>
                    </div>
                </CardActionArea>
            </Card>
        )
    }
}
