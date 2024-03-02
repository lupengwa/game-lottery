import {
  ChakraProvider,
  Box,
  Button,
  Grid,
  SliderTrack, SliderFilledTrack, SliderThumb,
  theme, Heading, Center, Stack, Spacer, Slider, SliderMark,Image
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import React, {useEffect, useState} from "react";
import AnimatedNumber from "react-animated-numbers";

export const App = () => {
  const [nums, setNums] = useState<number[]>([]);
  const [result, setResult] = useState('诗班尾牙抽奖');
  const [pickNum, setPickNum] = useState(0);
  const [numPeople, setNumPeople] = useState(25);
  const spin = () => {
    nums.forEach(n => console.log(n));
    let max = nums.length;
    let min = 0;
    let randIdx = Math.floor(Math.random()*(max-min)+ min);
    let updatedNums = nums.filter(n => n !== nums[randIdx])
    if(nums.length === 0) {
       setResult('抽奖结束');
    } else {
      setResult('');
      setPickNum(nums[randIdx]);
    }
    setNums(updatedNums);
  }
  const reset = (numPeople?:number) => {
    let nums: number[] = [];
    let end = 25;
    if(numPeople !== undefined) {
      end = numPeople;
    }
    for(let i = 1; i <= end; i++) {
      nums.push(i);
    }
    setNums(nums);
    setNumPeople(end);
    setResult('诗班尾牙抽奖');
    setPickNum(0);
  }

  const defaultNumPeople = 25;

  const labelStyles = {
      mt: '2',
      ml: '-2.5',
      fontSize: 'lg',
  }

  useEffect(() => {
    reset();
  },[]);
  const formatValue = (value:number) => value.toFixed(0);
  return (
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl" bgImage="url('/game-lottery/image/bg.jpg')"  bgPosition="center"
             bgSize="cover">
          <Grid minH="100vh" p={3}>
            <Stack direction={['row']} align='right' mt='15px'>
              <Slider
                  aria-label='slider-ex-6'
                  flex='0.08'
                  focusThumbOnChange={true}
                  value={numPeople}
                  max={99}
                  onChange= {(val) => reset(val)}
              >
                <SliderMark
                    value={numPeople}
                    textAlign='center'
                    bg='blue.500'
                    color='white'
                    mt='-10'
                    ml='-4'
                    w='8'
                >
                 {numPeople}
                </SliderMark>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb fontSize='sm' boxSize='32px' />
              </Slider>
              <Spacer />
              <Button onClick={() => reset()}> Restart </Button>
              <ColorModeSwitcher justifySelf="flex-end"/>
            </Stack>
            <Box alignItems='center'>
               <Heading as='h1' size='4xl' noOfLines={2} color="#FFD700"> {result} </Heading>
            </Box>
            <Center>
              <AnimatedNumber
                  animateToNumber={pickNum}
                  fontStyle={{
                    fontFamily: "'Helvetica Neue', Arial, sans-serif", // Use a modern, clean font
                    color: 'white', // A pleasant red
                    fontSize: 450, // Large font size for emphasis
                    fontWeight: 'bold', // Make it bold
                  }}
                  transitions={(index) => ({
                    type: "spring",
                    duration: index + 3,
                  })}></AnimatedNumber>
            </Center>
            <Box alignItems='center'>
              <Button size='lg' onClick={spin}> Spin </Button>
            </Box>
          </Grid>
        </Box>
      </ChakraProvider>
  );
}



