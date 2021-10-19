import { Tooltip } from '@mui/material'
import { IChatRoom } from 'models/chatRoom'
import moment from 'moment'
import React, { useEffect, useRef } from 'react'
import { useAppSelector } from 'states/hooks'
import {
    FriendComposing,
    FriendMessage,
    MyMessage,
    WrapperMessage
} from './contentStyles'

interface IProps {
    room: IChatRoom
}

function Content({ room }: IProps) {
    const { messages, composing } = room
    const user = useAppSelector((state) => state.user.current)
    const heightOfChatWrapper = useRef<null | HTMLDivElement>(null)

    //scroll xuống khi vừa mở khung chat hoặc có tin nhắn mới
    useEffect(() => {
        const chatRef = heightOfChatWrapper.current
        if (!chatRef) return
        //vừa mở khung chat hoặc vừa cập nhật messages -> scroll
        chatRef.scroll({
            top: chatRef?.scrollHeight,
            behavior: 'smooth',
        })
    }, [room])

    return (
        <WrapperMessage ref={heightOfChatWrapper}>
            {messages.map((msg) => {
                let time = moment(msg.createAt.toString()).calendar()
                
                if (msg.owner === user?._id) {
                    return (
                        <Tooltip title={time} placement="left" key={msg._id}>
                            <MyMessage>{msg.content}</MyMessage>
                        </Tooltip>
                    )
                }
                return (
                    <Tooltip title={time} placement="right" key={msg._id}>
                        <FriendMessage>{msg.content}</FriendMessage>
                    </Tooltip>
                )
            })}
            {composing.length > 0 && <FriendComposing />}
        </WrapperMessage>
    )
}

export default Content