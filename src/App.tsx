import {
  ChakraProvider,
  Box,
  Button,
  Grid,
  Text,
  theme, Heading,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import {useEffect, useState} from "react";

export const App = () => {
  const [nums, setNums] = useState<number[]>([]);
  const [result, setResult] = useState('Lottery Ready');
  const spin = () => {
    nums.forEach(n => console.log(n));
    let max = nums.length;
    let min = 0;
    let randIdx = Math.floor(Math.random()*(max-min)+ min);
    let content =  String(nums[randIdx]);
    let updatedNums = nums.filter(n => n !== nums[randIdx])
    if(nums.length === 0) {
      content = 'Lottery Ends';
    }
    setNums(updatedNums);
    setResult(content);
  }
  const reset = () => {
    let nums: number[] = [];
    const end = 5;
    for(let i = 1; i <= end; i++) {
      nums.push(i);
    }
    setNums(nums);
    setResult('Lottery Ready')
  }

  useEffect(() => {
    reset();
  },[]);

  return (
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <ColorModeSwitcher justifySelf="flex-end"/>
            <Box>
               <Heading as='h1' size='4xl' noOfLines={1}> {result} </Heading>
            </Box>
            <Box alignItems='center'>
              <Button onClick={spin}> Spin </Button>
              <Button onClick={reset}> Reset </Button>
            </Box>
          </Grid>
        </Box>
      </ChakraProvider>
  );
}



