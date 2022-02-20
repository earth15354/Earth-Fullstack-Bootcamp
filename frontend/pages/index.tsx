import type {NextPage} from 'next'
import {Box, Divider, propNames, Text, Heading, VStack, Container, Image} from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react';
import Post from "../components/Post";
import NewPostModal from "../components/NewPostModal";
import {useState} from "react";
import {useEffect} from "react";
import axios from "axios";
import { useDisclosure } from '@chakra-ui/react'


    const Home: NextPage = () => {
        const { isOpen, onOpen, onClose } = useDisclosure()
        const [open, setOpen] = useState(false);
        const [posts, setPosts] = useState<any[]>([]);
      
        useEffect(() => {
            axios.get("http://localhost:8080/posts")
                .then(res => setPosts(res.data))
        }, [])

     
    return( 
    <>
        <div style={{backgroundColor: "CornflowerBlue"}}>
            <Container centerContent>
                <Box w='500px' borderWidth='3px' borderRadius='xs' borderColor='lightblue' overflow='hidden'>
                    <Image src={"https://images8.alphacoders.com/106/thumb-1920-1066910.png"} alt="rip image"/>     
                </Box>
                <Box w='510px' h="12px" backgroundColor='cornflowerblue'></Box> 
                {/* {posts?.length === 0 && <Text>No posts :(</Text>} */}
                {posts?.map(post => <Post key={post._id} name={post.name} title={post.title} body={post.body} postedAt={new Date(post.postedAt)}/>)}
                <Post name="@earth012345678" title="Hello World" body="I am feeling good today!" postedAt={new Date()}></Post>
                <Box w='500px' h="10px"></Box>
                <NewPostModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}></NewPostModal>
                <Box w='500px' h="10px"></Box> 
            </Container>
        </div>
    </>
    )
}


export default Home
