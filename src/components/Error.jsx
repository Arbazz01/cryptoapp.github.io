import React from 'react';
import Footer from "./Footer";

import {Alert,AlertIcon} from '@chakra-ui/react'

const Error = ({message}) => {
  return (
   <Alert status="error"
   position={"fixed"}
   bottom={"4"}
   left={"50%"}
   transform={"tranlate{-50%}"}
   w={"container.lg"}>
   <AlertIcon/>
   {message}
   </Alert>
  )
}

export default Error;