import { Box, CircularProgress, Grid, Hidden, Stack } from '@mui/material'
import { useUserSocket } from 'api/socket/user'
import Gutter from 'features/gutter'
import Header from 'features/header'
import ListOnline from 'features/listOnline'
import ListChat from 'features/message/listChat'
import { IPublicInfo } from 'models/user'
import { useCallback } from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { userActions } from 'states/slices/userSlice'
import { useStyle } from './homeStyles'
// import Map from 'components/map'
import Newsfeed from './newsfeed'

export default function Home() {
    const style = useStyle()
    const { path } = useRouteMatch()
    const { loading, current: user } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()
    const status = useAppSelector((state) => state.auth.state)

    const dispatcher = useCallback(
        (newInfo: IPublicInfo) => {
            dispatch(userActions.updateStore(newInfo))
        },
        [dispatch]
    )
    useUserSocket(user ? user._id : undefined, dispatcher)

    if (loading)
        return (
            <Stack
                sx={{
                    width: '100vw',
                    height: '100vh',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                direction="row"
            >
                <CircularProgress />
            </Stack>
        )

    // return (
    //   <Grid container className={style.wrapper}>
    //     <Hidden smDown>
    //       <Grid item md={3} className={style.pLeft}>
    //         <Skeleton height={300} variant="rectangular" />
    //       </Grid>
    //     </Hidden>
    //     <Grid item md={6} xs={12} className={style.pCenter}>
    //       <Skeleton height={150} variant="rectangular" className={style.marginBottom} />
    //       <Skeleton height={300} variant="rectangular" className={style.marginBottom} />
    //       <Skeleton height={300} variant="rectangular" className={style.marginBottom} />
    //     </Grid>
    //     <Hidden smDown>
    //       <Grid item md={3} className={style.pRight}>
    //         <Skeleton height={50} variant="rectangular" className={style.marginBottom} />
    //         <Skeleton height={50} variant="rectangular" className={style.marginBottom} />
    //         <Skeleton height={50} variant="rectangular" className={style.marginBottom} />
    //         <Skeleton height={50} variant="rectangular" className={style.marginBottom} />
    //         <Skeleton height={50} variant="rectangular" className={style.marginBottom} />
    //       </Grid>
    //       <ListChat />
    //     </Hidden>
    //   </Grid>
    // )

    if (status === 'stranger') return <Redirect to="/auth" />

    return (
        <>
            <Header />
            <Grid container className={style.wrapper}>
                <Grid
                    item
                    md={3}
                    className={style.pLeft}
                    sx={{
                        display: {
                            xs: 'none',
                            lg: 'initial',
                        },
                    }}
                >
                    <Gutter />
                </Grid>
                <Grid item xs={12} md={8} lg={6} className={style.pCenter}>
                    <Box
                        sx={{
                            px: {
                                xs: 1,
                                lg: 0,
                            },
                        }}
                    >
                        <Switch>
                            <Route exact path={path} component={Newsfeed} />
                        </Switch>
                    </Box>
                </Grid>
                <Grid
                    item
                    md={4}
                    lg={3}
                    className={style.pRight}
                    sx={{
                        display: {
                            xs: 'none',
                            md: 'initial',
                        },
                    }}
                >
                    <ListOnline />
                    {/* <ListGame /> */}
                </Grid>

                <ListChat />
            </Grid>
        </>
    )
}
