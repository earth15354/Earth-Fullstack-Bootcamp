import {FC} from "react";
import {Box, Divider, propNames, Text, Heading, VStack, Container, Image} from "@chakra-ui/react";
import Comment from "./Comment";

interface Props {
    name: string;
    title: string;
    body: string;
    postedAt: Date;
}

const Post: FC<Props> = ({name, title, body, postedAt}) => {
    return <Container centerContent>
        <Box bg='aquamarine' w='500px' p={5} borderWidth='3px' borderColor="lightblue" borderRadius='xs'>
            <Text fontSize='s' color='gray'>{name}</Text>
            <Heading fontSize='3xl'>{title}</Heading>
            <Text fontSize='xs' color='gray'>{postedAt.toString()}</Text>
            <Text fontSize='md'>{body}</Text>
        </Box>
        <Comment name="@earth012345678" content="Comment on all my own posts!" postedAt={new Date()}></Comment>
    </Container>
}

export default Post;