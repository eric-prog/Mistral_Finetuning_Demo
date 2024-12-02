import { Box, Text, Badge, Flex, Spinner } from "@chakra-ui/react";
import { FineTuningJob } from "../types";

import { PiCubeFill } from "react-icons/pi";

interface JobListProps {
  jobs: FineTuningJob[];
  isLoading: boolean;
  lastUpdated: Date | null;
}

export function JobList({ jobs, isLoading, lastUpdated }: JobListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "RUNNING":
        return "blue";
      case "COMPLETED":
        return "green";
      case "SUCCESS":
        return "green.500";
      case "FAILED_VALIDATION":
        return "red";
      case "FAILED":
        return "red";
      case "QUEUED":
        return "yellow";
      default:
        return "gray";
    }
  };

  return (
    <Flex flexDirection={"column"} width={"100%"} height={"100%"}>
      <Text fontSize="14px" fontWeight={"normal"} color={"orange.400"} mb={4}>
        Fine-tuning Jobs
      </Text>
      {lastUpdated && (
        <Text fontSize="12px" color={"gray.500"} mb={2}>
          Status last updated: {lastUpdated.toLocaleTimeString()}
        </Text>
      )}
      {!jobs.length ? (
        <Flex
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          height={"100%"}
        >
          {isLoading ? (
            <Spinner my={4} size="xl" color="orange.500" />
          ) : (
            <>
              <PiCubeFill color={"orange"} size={32} />
              <Text color={"orange.400"} fontSize={"16px"} mt={4}>
                Your Files will appear here
              </Text>
            </>
          )}
        </Flex>
      ) : (
        <Flex
          width={"100%"}
          flexDirection={"column"}
          height={"100%"}
          color={"orange.400"}
          alignItems={"center"}
          justifyContent={"start"}
        >
          {jobs.map((job) => (
            <Box
              key={job.id}
              p={4}
              border={"1px solid #333"}
              backgroundColor={"#232020"}
              borderRadius="md"
              fontWeight="normal"
              paddingX={"22px"}
              paddingY={"25px"}
              paddingTop={"22px"}
              width={"100%"}
              my={2}
            >
              <Flex justifyContent={"space-between"} padding={0}>
                <Text color={"gray.100"} mb={1}>
                  {job.model}
                </Text>
                <Badge
                  backgroundColor={"black"}
                  mb={1}
                  color={getStatusColor(job.status)}
                >
                  {job.status}
                </Badge>
              </Flex>
              {job.metadata && (
                <>
                  <Flex
                    color={"gray.300"}
                    padding={"20px"}
                    flexDirection={"column"}
                    fontSize="sm"
                    mt={1}
                    gap={1}
                    backgroundColor={"black"}
                    borderRadius={"5px"}
                  >
                    <Text fontSize="sm">
                      Estimated Cost: {job.metadata.cost}{" "}
                      {job.metadata.cost_currency}
                    </Text>
                    <Text fontSize="sm">
                      Training Progress:{" "}
                      {job.metadata.expected_duration_seconds || 0} seconds
                    </Text>
                  </Flex>
                </>
              )}
            </Box>
          ))}
        </Flex>
      )}
    </Flex>
  );
}
