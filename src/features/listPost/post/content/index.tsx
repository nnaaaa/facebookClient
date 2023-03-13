import { Typography } from '@mui/material'
import clsx from 'clsx'
import { IPost } from 'models/post'
import { useContext } from 'react'
import { PostContext } from '../postContext'
import { CardContent } from '../styles'
import { useStyles } from './styles'
import { useSplitContent } from './useSplitContent'

interface IPostContentProps {
    post: IPost
}


const PostContent = ({ post }: IPostContentProps) => {
    const styles = useStyles()
    const { content, contentNER } = post
    const { isDisplayNERContent } = useContext(PostContext)
    const { splittedContent } = useSplitContent(post)
    console.log({contentNER,splittedContent})

    if (!content) return <></>

    if (contentNER.length && isDisplayNERContent) {
        return (
            <CardContent className={styles.contentWrapper}>
                {splittedContent.map((entity, index) => {
                    if (!entity.entity) return entity.word

                    return (
                        <Typography className={clsx(styles.entityWord, (styles as any)[`${entity.entity}_idEntityWord`])} key={entity.word + index} variant="button">
                            {entity.word}
                            <Typography className={clsx(styles.entityName, (styles as any)[`${entity.entity}_idEntityName`])} variant="button">
                                {entity.entity}
                            </Typography>
                        </Typography>
                    )
                })}
            </CardContent>
        )
    }

    return (
        <CardContent>{content}</CardContent>
    )
}

export default PostContent