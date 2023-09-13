import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import React from 'react';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }: { currentPage: any, totalPages: any, onPageChange: any }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    return (
        <div className="pagination">
            <Button
                bgColor="white"
                isDisabled={currentPage === 0}
                onClick={() => onPageChange(currentPage - 1)}
                mr={4}
            >
                <ChevronLeftIcon w="25px" h="25px" />
            </Button>
            {pageNumbers.map(page => (
                <Button
                    key={page}
                    onClick={() => onPageChange(page - 1)}
                    bgColor={currentPage === page - 1 ? 'primary' : 'white'}
                    mr={2}
                >
                    {page}
                </Button>
            ))}
            <Button
                bgColor="white"
                isDisabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                ml={4}
            >
                <ChevronRightIcon w="25px" h="25px" />
            </Button>
        </div>
    );
};

export default PaginationComponent;
