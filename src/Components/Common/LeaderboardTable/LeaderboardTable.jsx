import './LeaderboardTable.css'
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
  } from '@chakra-ui/react'
import LeaderboardContent from '../../../Helpers/LeaderboardContent';


const LeaderboardTable = () => {
  return (
    <div className="leaderboard-table">
        <ChakraProvider>
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                    <Tr>
                        <Th >Rank</Th>
                        <Th>Name</Th>
                        <Th>Points</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {LeaderboardContent.map((value, index)=> (

                        
                        <Tr>
                            <Td>{value.rank}</Td>
                            <Td>{value.name}</Td>
                            <Td >{value.points}</Td>
                        </Tr>
                    ))}
                    
                    </Tbody>
                </Table>
            </TableContainer>
        </ChakraProvider>
    </div>
  )
}

export default LeaderboardTable