import { Button, Text, Flex, Spinner, Box } from "@chakra-ui/react";
import { MistralFile } from "../types";

import { LuFileSpreadsheet } from "react-icons/lu";
import { FiUploadCloud } from "react-icons/fi";
import { ImFilesEmpty } from "react-icons/im";

interface FileListProps {
  files: MistralFile[];
  onFileSelect: (file: MistralFile) => void;
  selectedFiles: string[];
  isLoading: boolean;
}

export function FileList({
  files,
  onFileSelect,
  selectedFiles,
  isLoading,
}: FileListProps) {
  return (
    <Flex
      mb={6}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
    >
      {isLoading ? (
        <Spinner my={4} mt={7} size="xl" color="orange.500" />
      ) : !files.length ? (
        <Flex
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          mt={7}
        >
          <Box backgroundColor={"orange.100"} borderRadius={"md"} p={3}>
            <ImFilesEmpty color={"#d15d16"} size={22} />
          </Box>
          <Text fontSize={"14px"} mt={3}>
            Your files will appear here
          </Text>
        </Flex>
      ) : (
        <Flex direction="column" mt={4} width={"100%"}>
          {files.map((file) => (
            <Flex
              key={file.id}
              align="center"
              justify="space-between"
              backgroundColor="#ffede2"
              borderRadius="md"
              p={2}
              my={1}
            >
              <Flex flexDirection="row" alignItems="center" flex="1" pl={2}>
                <LuFileSpreadsheet color="#d15d16" />
                <Text fontSize="15px" pl={2}>
                  {file.filename}
                </Text>
              </Flex>
              <Button
                size="sm"
                colorScheme={selectedFiles.includes(file.id) ? "green" : "blue"}
                onClick={() => onFileSelect(file)}
                backgroundColor={
                  selectedFiles.includes(file.id) ? "green.600" : "orange.600"
                }
              >
                <FiUploadCloud />
                {selectedFiles.includes(file.id) ? "Selected" : "Select"}
              </Button>
            </Flex>
          ))}
        </Flex>
      )}
    </Flex>
  );
}
