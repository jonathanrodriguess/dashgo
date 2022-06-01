import { Box, Link, Button, Flex, Heading, Icon, Table, Thead, Tr, Th, Checkbox, Tbody, Td, Text, Spinner, useBreakpointValue } from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Pagination } from '../../components/Pagination';
import { useUsers } from "../../services/hooks/useUsers";
import { useState } from "react";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";

export default function UserList() {
	const [page, setPage] = useState(1);
	const { data, isLoading, isFetching, error } = useUsers(page);

	const isWideVersion = useBreakpointValue({
		base: false,
		lg: true,
	})

	async function handlePrefetchUser(userId: number) {

		await queryClient.prefetchQuery(['user', userId], async () => {
			const response = await api.get(`users/${userId}`);

			return response.data;
		}, {
			staleTime: 1000 * 60 * 10 //os dados serão armazenados em cache por 10 min.
		});
	}

	return (
		<Box>
			<Header />

			<Flex w='100%' my='6' maxWidth={1400} mx='auto' px='6'>
				<Sidebar />

				<Box flex='1' borderRadius={8} bgColor='gray.800' p='8'>
					<Flex mb='8' justify='space-between' align='center'>
						<Heading size='lg' fontWeight='normal'>
							Usuários
							{!isLoading && isFetching && <Spinner size='sm' color='gray.500' ml='4' />}
						</Heading>
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
					{isLoading ? (
						<Flex justify='center'>
							<Spinner />
						</Flex>
					) : error ? (
						<Flex justify='center'>
							<Text>Falha ao obeter dados dos usuários</Text>
						</Flex>
					) :
						(
							<>
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
										{data.users.map(user => {
											return (
												<Tr key={user.id}>
													<Td px={['4', '4', '6']}>
														<Checkbox colorScheme='pink' />
													</Td>
													<Td>
														<Box>
															<Link color='purple.400' onMouseEnter={() => handlePrefetchUser(Number(user.id))}>
																<Text fontWeight='bold'>{user.name}</Text>
															</Link>
															<Text fontSize='sm' color='gray.300'>{user.email}</Text>
														</Box>
													</Td>
													{isWideVersion && (<Td>
														{user.createdAt}
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
											)
										})}


									</Tbody>

								</Table>
								<Pagination
									totalCountOfRegisters={data.totalCount}
									currentPage={page}
									onPageChange={setPage} />
							</>
						)}
				</Box>

			</Flex >

		</Box >
	);

}