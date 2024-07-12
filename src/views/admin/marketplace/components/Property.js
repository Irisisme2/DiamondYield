import React from "react";
import {
  Box,
  Image,
  Flex,
  AvatarGroup,
  Avatar,
  Text,
  Link,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";

export default function Property(props) {
  const { name, location, agents, image, price, details } = props;

  return (
    <Card p='20px'>
      <Image src={image} borderRadius='20px' mb='20px' />
      <Flex justify='space-between' align='center' mb='20px'>
        <Box>
          <Text fontSize='lg' fontWeight='bold'>
            {name}
          </Text>
          <Text fontSize='sm' color='gray.500'>
            {location}
          </Text>
        </Box>
        <Text fontSize='xl' fontWeight='bold'>
          {price}
        </Text>
      </Flex>
      <Flex justify='space-between' align='center'>
        <AvatarGroup size='sm'>
          {agents.map((agent, index) => (
            <Avatar key={index} src={agent} />
          ))}
        </AvatarGroup>
        <Link color='blue.400' href={details}>
          View Details
        </Link>
      </Flex>
    </Card>
  );
}
