import {
    faMinusCircle,
    faPhone,
    faTimes,
    faVideo
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar } from '@mui/material'
import { Box } from '@mui/system'
import { IChatRoom } from 'models/chatRoom'
import { IUser } from 'models/user'
import { Dispatch, SetStateAction, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { chatActions } from 'states/slices/chatSlice'
import { IconBox } from '../chatStyles'
import { NameOfFriend } from './headerStyles'

interface IProps {
    room: IChatRoom
    setExpand: Dispatch<SetStateAction<boolean>>
}

function Header({ room, setExpand }: IProps) {
    const user = useAppSelector((state) => state.user.current)
    const dispatch = useAppDispatch()
    const friend = useMemo<IUser>(() => {
        return (room.members as IUser[]).find(
            (member) => member._id !== user?._id
        ) as IUser
    }, [room.members,user?._id])

    const closeChat = () => dispatch(chatActions.closeChat(room._id))

    return (
        <Box p={1} display="flex" justifyContent="space-between" height="60px">
            <Box display="flex" alignItems="center" maxWidth="50%">
                <Avatar src={friend.avatar} />
                <NameOfFriend>{friend.username}</NameOfFriend>
            </Box>
            <Box display="flex" alignItems="center">
                <IconBox>
                    <FontAwesomeIcon icon={faVideo} />
                </IconBox>
                <IconBox>
                    <FontAwesomeIcon icon={faPhone} />
                </IconBox>
                <IconBox onClick={() => setExpand(pre=>!pre)}>
                    <FontAwesomeIcon icon={faMinusCircle} />
                </IconBox>
                <IconBox onClick={closeChat}>
                    <FontAwesomeIcon icon={faTimes} />
                </IconBox>
            </Box>
        </Box>
    )
}

export default Header