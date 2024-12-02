import { useState, useRef } from "react";
import { Box, Input, Text, Spinner, Flex, Button } from "@chakra-ui/react";
import { MistralFile } from "../types";
import { FiUpload } from "react-icons/fi";

interface FileUploaderProps {
  onFileUploaded: (file: MistralFile | null) => void;
  selectedFile: MistralFile | null;
}

export function FileUploader({
  onFileUploaded,
  selectedFile,
}: FileUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset error messages
    setErrorMessage(null);

    if (!file.name.endsWith(".jsonl")) {
      setErrorMessage("Invalid file type. Only .jsonl files are supported.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data: MistralFile = await response.json();
      onFileUploaded(data);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unknown error occurred",
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onFileUploaded(null);
    console.log("Removed");
  };

  return (
    <Box
      w="full"
      borderRadius="md"
      bg="#ffe8df"
      boxShadow="inset 0 0 10px rgba(0, 0, 0, 0.1)"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      cursor="pointer"
      _hover={{ bg: "gray.200" }}
      onClick={handleClick}
      py={9}
      height={"200px"}
      overflow="hidden"
    >
      <Flex
        width="100%"
        height="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {isUploading ? (
          <Spinner size="lg" />
        ) : selectedFile ? (
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="15px" mt={2}>
              {selectedFile.filename}
            </Text>
            <Button
              mt={-1}
              fontSize="10px"
              color={"red.600"}
              padding={0}
              backgroundColor={"transparent"}
              onClick={handleRemoveFile}
            >
              Remove
            </Button>
          </Flex>
        ) : (
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <FiUpload size={22} />
            <Text fontSize="15px" mt={"6px"} mb={1}>
              Upload Training File
            </Text>
            <Text fontSize="10px" color="gray.500">
              Only .jsonl files supported.
            </Text>
          </Flex>
        )}
        {errorMessage && (
          <Text fontSize="sm" color="red.500" mt={2}>
            {errorMessage}
          </Text>
        )}
      </Flex>
      <Input
        type="file"
        accept=".jsonl"
        ref={fileInputRef}
        display="none"
        onChange={handleUpload}
        disabled={isUploading}
      />
    </Box>
  );
}
