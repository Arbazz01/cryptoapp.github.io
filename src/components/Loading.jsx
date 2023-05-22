import React from 'react'
import {VStack,Box,Spinner} from '@chakra-ui/react'
import Footer from "./Footer";


const Loading = () => {
  return (
    <VStack h={"90vh"} justifyContent={"center"}>
      <Box tranform={"scale(3)"}>
        <Spinner size={"xl"}/>
      </Box>
    </VStack>
  )
}

export default Loading