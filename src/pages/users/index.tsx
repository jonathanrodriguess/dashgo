import { Box, Button, Flex, Heading, Icon, Table, Thead, Tr, Th, Checkbox, Tbody, Td, Text, useBreakpointValue } from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Pagination } from '../../components/Pagination';
import Link from "next/link";

export default function UserList() {

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    })

    return (
        <Box>
            <Header />

            <Flex w='100%' my='6' maxWidth={1400} mx='auto' px='6'>
                <Sidebar />

                <Box flex='1' borderRadius={8} bgColor='gray.800' p='8'>
                    <Flex mb='8' justify='space-between' align='center'>
                        <Heading size='lg' fontWeight='normal'>Usuários</Heading>
                        <Link href='/users/create' passHref>
                            <Button
                                as='a'
                                size='sm'
                                fontSize='sm'
                                colorScheme='pink'
                                leftIcon={<Icon as={RiAddLine} />}
                            >
                                Criar novo
                            </Button>
                        </Link>
                    </Flex>
                    <Table colorScheme='whiteApha'>
                        <Thead>
                            <Tr>
                                <Th px={['4', '4', '6']} color='gray.300' w='8'>
                                    <Checkbox colorScheme='pink' />
                                </Th>
                                <Th>
                                    Usuário
                                </Th>
                                {isWideVersion && (
                                    <Th>
                                        Data de cadastro
                                    </Th>
                                )}
                                {isWideVersion && (
                                    <Th w='8'>

                                    </Th>
                                )}
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td px={['4', '4', '6']}>
                                    <Checkbox colorScheme='pink' />
                                </Td>
                                <Td>
                                    <Box>
                                        <Text fontWeight='bold'>Jonathan Rodrigues</Text>
                                        <Text fontSize='sm' color='gray.300'>jonathanrodrigues@live.com</Text>
                                    </Box>
                                </Td>
                                {isWideVersion && (<Td>
                                    04 de abril de 2022
                                </Td>)}
                                {isWideVersion && (
                                    <Td>
                                        <Button
                                            as='a'
                                            size='sm'
                                            fontSize='sm'
                                            colorScheme='purple'
                                            leftIcon={<Icon as={RiPencilLine} />}
                                        >
                                            Editar
                                        </Button>
                                    </Td>
                                )}
                            </Tr>
                        </Tbody>

                    </Table>
                    <Pagination />
                </Box>

            </Flex >

        </Box >
    );

}