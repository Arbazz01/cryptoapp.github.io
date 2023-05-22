import React, { useEffect,useState } from 'react'
import axios from 'axios'
import {server} from '../index'
import { Container, HStack,VStack,Heading,Text,Image } from '@chakra-ui/react'
import Loading from './Loading'
import Error from './Error'



//in this exchanges i can make a useeffect function.
//in this function we can fetch the api of exchanges coins
const Exchanges = () => {
  //i use usestate function for data rendering
  const[exchanges,setExchanges] = useState([]);
  const[loading,setLoading] = useState(true);
  const[error,setError] = useState(false);
  useEffect(()=>{
    

    const fetchExchanges = async()=>{
     


      const {data} = await axios.get(`${server}/exchanges`);
    //  we use try catch function to catch error if occured  
      try{
      setExchanges(data);
      setLoading(false);
      }catch(error){
        setError(true);
        setLoading(false);
        console.log("error");
      }

      
     
    }
    //we can call function fetchexchanges
    fetchExchanges();
  },[])
//we can use if else becuse of error page
if(error) return <Error/>;

  return (
//we use ternary operator
<Container maxW={"Container.xl"} justifyContent={'space-evenly'} >

  {loading ? (<Loading/>):
    <>
    <HStack flexWrap={"wrap"} mx={"5"} justifyContent={'space-evenly'}>
   {
    //then i use map function to display names and other details of api
    exchanges.map( (i) => (
      //exchanged will built in below after code
     <ExchangeCard key={i.id} name={i.name} img={i.image} rank={i.trust_score_rank} url={i.url}/>
    ))
   }  
    </HStack>
    </>
}
   
   </Container>
  );
};


//this is component
const ExchangeCard =({name,img,rank,url})=>(
  <a href={url} target={"blank"}>
    <VStack   alignItems={"center"} justifyContent={"center"} w={"52"} p={"5"} shadow={"lg"} m={"4"} borderRadius={"xl"} transition={"all 0.3s"} css={{"&:hover":{transform:"scale(1.1)"}}}>
      <Image src={img} w={"10"} h={"10"} objectFit={"contain"} alt={"exchange"}/>
      <Heading size={"md"} noOfLines={1}>{rank}</Heading>
      <Text noOfLines={1}>{name}</Text>
    </VStack>
  </a>
);

export default Exchanges

