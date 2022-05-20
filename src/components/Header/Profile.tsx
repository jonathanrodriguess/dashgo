import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
    showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {

    return (
        <Flex align='center'>
            {showProfileData && (
                <Box mr='4' textAlign='right'>
                    <Text>Jonathan Rodrigues</Text>
                    <Text color='gray.300' fontSize='small'>jonathanrodrigues@live.com</Text>
                </Box>
            )}
            <Avatar size='md' name='Jonathan Rodrigues' src='https://github.com/diego3g.png' />
        </Flex>
    );
}