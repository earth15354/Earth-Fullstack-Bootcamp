import {FC} from "react";
import {Box, Divider, Text} from "@chakra-ui/react";

interface Props {
    name: string;
    content: string;
    postedAt: Date;
}

const Comment: FC<Props> = ({name, content, postedAt}) => {
    return <div>
        <Box bg='azure' w='500px' p={5} color='black' borderWidth='3px' borderColor="lightblue" borderRadius='xs'>
            <Text fontSize='s' color='gray'>{name}</Text>
            <Text fontSize='xs' color='gray'>{postedAt.toString()}</Text>
            <Text fontSize='md'>{content}</Text>
        </Box>
    </div>
}

export default Comment;