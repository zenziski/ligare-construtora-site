'use client'
import { Box, Skeleton, VStack, HStack, Card, CardBody, Grid } from '@chakra-ui/react';

export const TableSkeleton = () => (
  <VStack spacing={4} align="stretch">
    {Array(5).fill(0).map((_, i) => (
      <HStack key={i} spacing={4}>
        <Skeleton height="40px" width="100%" />
      </HStack>
    ))}
  </VStack>
);

export const CardGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
    {Array(count).fill(0).map((_, i) => (
      <Card key={i}>
        <CardBody>
          <Skeleton height="200px" />
          <VStack mt={4} spacing={2} align="stretch">
            <Skeleton height="20px" />
            <Skeleton height="16px" width="70%" />
          </VStack>
        </CardBody>
      </Card>
    ))}
  </Grid>
);

export const FormSkeleton = () => (
  <VStack spacing={6} align="stretch">
    <Skeleton height="40px" />
    <Skeleton height="100px" />
    <HStack>
      <Skeleton height="40px" width="100px" />
      <Skeleton height="40px" width="100px" />
    </HStack>
  </VStack>
);

export const DashboardSkeleton = () => (
  <VStack spacing={6} align="stretch">
    <HStack spacing={4}>
      {Array(4).fill(0).map((_, i) => (
        <Card key={i} flex={1}>
          <CardBody>
            <Skeleton height="60px" />
          </CardBody>
        </Card>
      ))}
    </HStack>
    <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
      {Array(2).fill(0).map((_, i) => (
        <Card key={i}>
          <CardBody>
            <Skeleton height="300px" />
          </CardBody>
        </Card>
      ))}
    </Grid>
  </VStack>
);
