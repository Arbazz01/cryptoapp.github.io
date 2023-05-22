import React, { useEffect,useState } from 'react'
import axios from 'axios'
import {server} from '../index'
import { Container,HStack,VStack,Heading,Text,Image,Button, RadioGroup, Radio} from '@chakra-ui/react'
import Loading from './Loading'
import Error from './Error'
import {Link} from 'react-router-dom'
import Footer from "./Footer";



//in this exchanges i can make a useeffect function.
//in this function we can fetch the api of exchanges coins
const Coins = () => {
  //i use usestate function for data rendering
  const[coins,setCoins] = useState([]);
  const[loading,setLoading] = useState(true);
  const[error,setError] = useState(false);
  const[page,setPage] = useState(1);
  const[currency,setCurrency] = useState("inr")
 
 const currencySymbol= currency==="inr" ? "₹": currency==="eur" ? "€" :"$"
 
 //this is pagination array
 const btn = new Array(132).fill(1)
 useEffect(()=>{
     
      //we create a function for fetch api with using async and await func.     
      const fetchCoins = async()=>{
     
        const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
    //  we use try catch function to catch error if occured  
      try{
      setCoins(data);
      console.log(data);
      setLoading(false);
      }catch(error){
        setError(true);
        setLoading(false);
        console.log("error");
      }

      
     
    }
    //we can call function fetchexchanges
    fetchCoins();
  },[currency,page])

  //this is a function for pagination
  const clickPage=(page)=>{
    setPage(2);
    setLoading(true);
  }
//we can use if else becuse of error page
if(error) return <Error/>;

  return (

   //we use ternary operator
  <Container maxW={"Container.xl"}>
  {loading ? (<Loading/>):(
    <>

    {/* we use radio buttons from chakra ui for changing currency */}
    <RadioGroup value={currency} p={5} onChange={setCurrency}>
      <HStack spacing={5} >
      <Radio value={"inr"}>INR</Radio>
      <Radio value={"usd"}>USD</Radio>
      <Radio value={"eur"}>EUR</Radio>
      </HStack>
    </RadioGroup>

    <HStack flexWrap={"wrap"} mx={"5"} justifyContent={'space-evenly'}>
   {
    //then i use map function to display names and other details of api
    coins.map( (i) => (
      //coinCard will built in below after code
     <CoinCard id={i.id} key={i.id} name={i.name} price={i.current_price} img={i.image} symbol={i.symbol} currencySymbol={currencySymbol} />
    ))
   }  
    </HStack>

    <HStack w={"100"} overflowX={"auto"} p={"8"}>
     { btn.map((items,index)=>(
      <Button bgColor={"gray.500"} color={"white"} onClick={()=>{clickPage(index + 1)}}>{index + 1}</Button>
     ))}
    </HStack>
      
    </>
)}
   
   </Container>
  );
};


//this is component
const CoinCard =({id,name,img,symbol,price,currencySymbol="₹"})=>(
  <Link to ={`/coin/${id}`} >
    <VStack   alignItems={"center"} justifyContent={"center"} w={"52"} p={"5"} shadow={"lg"} m={"4"} borderRadius={"xl"} transition={"all 0.3s"} css={{"&:hover":{transform:"scale(1.1)"}}}>
      <Image src={img} w={"10"} h={"10"} objectFit={"contain"} alt={"exchange"}/>
      <Heading size={"md"} noOfLines={1}>{symbol}</Heading>
      <Text noOfLines={1}>{name}</Text>
      <Text noOfLines={1}>{price ? `${currencySymbol}${price}` : "NA"}</Text>
    </VStack>
  </Link>
);

export default Coins;

