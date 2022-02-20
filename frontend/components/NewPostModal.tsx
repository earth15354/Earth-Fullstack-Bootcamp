import {FC, FormEvent, useState} from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import {Button, Input, Textarea, VStack} from "@chakra-ui/react";
import axios from "axios";

interface Props {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const NewPostModal: FC<Props> = ({isOpen, onOpen, onClose}) => {

    function handleSubmit(e: any) {
        e.preventDefault();
        axios.post('/posts', {
            title: e.target.title.value,
            body: e.target.body.value,
            postedAt: new Date(),
            name: "@earth012345678"
        })
        .then((response) => {
            alert("post created :)")
        })
        .catch((error) => {
            alert("post failed :(")
        })
    } 

    return (
        <>
        <Button onClick={onOpen}>New Post</Button>
    
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
                <ModalHeader>Create New Post</ModalHeader>
                <form onSubmit={handleSubmit}>
                  <Input name="Title" placeholder="put title here" type="text" required />
                  <Textarea name="Body" placeholder="put content here" rows={5} required />
                  <Button type="submit" colorScheme='blue' mr={3} onClick={onClose}>Create Post</Button>
                  <Button variant='ghost' onClick={onClose}>Not now</Button>
                </form>
            </ModalContent>
          </Modal>
        </>
      )
}

export default NewPostModal;
