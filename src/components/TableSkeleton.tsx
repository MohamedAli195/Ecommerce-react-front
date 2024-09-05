import React from 'react';
import {
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Skeleton,
} from '@chakra-ui/react';

const TableSkeleton = () => {
  const columns = ['Column 1', 'Column 2', 'Column 3', 'Column 4', 'Column 5'];

  return (
    <ChakraProvider>
      <Table>
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th key={column}>
                <Skeleton height="20px" />
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {Array.from({ length: 10 }).map((_, rowIndex) => (
            <Tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <Td key={colIndex}>
                  <Skeleton height="20px" />
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </ChakraProvider>
  );
};

export default TableSkeleton;
