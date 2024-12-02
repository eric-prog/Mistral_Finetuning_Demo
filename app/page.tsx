"use client";

import { useState, useEffect } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FileUploader } from "./components/FileUploader";
import { FileList } from "./components/FileList";
import { HyperParameters } from "./components/HyperParameters";
import { JobList } from "./components/JobList";
import { MistralFile, Hyperparameters, FineTuningJob } from "./types";
import Image from "next/image";
import { PiCubeFocus } from "react-icons/pi";

const defaultHyperParameters: Hyperparameters = {
  learning_rate: 0.0001,
  weight_decay: 0.1,
  warmup_fraction: 0.05,
  epochs: 1,
  fim_ratio: 0.9,
  seq_len: 100,
  // training_steps: 1,
};

export default function Home() {
  const [files, setFiles] = useState<MistralFile[]>([]);
  const [selectedTrainingFile, setSelectedTrainingFile] =
    useState<MistralFile | null>(null);

  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);

  const [jobs, setJobs] = useState<FineTuningJob[]>([]);
  const [suffix, setSuffix] = useState("");
  const [currhyperparameters, setHyperparameters] = useState<Hyperparameters>(
    defaultHyperParameters,
  );
  const [error, setError] = useState<string | null>(null);

  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    fetchFiles();
    fetchJobs();
  }, []);

  const fetchFiles = async () => {
    setIsLoadingFiles(true);
    try {
      const response = await fetch("/api/files");
      const data = await response.json();
      setFiles(data.data || []);
    } catch (error) {
      console.error("Error fetching files");
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const fetchJobs = async () => {
    setIsLoadingJobs(true);
    try {
      const response = await fetch("/api/finetuning");
      const data = await response.json();
      setJobs(data.data || []);
    } catch (error) {
      console.error("Error fetching jobs");
    } finally {
      setIsLoadingJobs(false);
    }
  };

  const handleFileUploaded = (file: MistralFile | null) => {
    if (file) {
      setFiles((prevFiles) => [...prevFiles, file]);
      setSelectedTrainingFile(file);
    } else {
      setSelectedTrainingFile(null);
    }
  };

  const handleFileSelect = (file: MistralFile) => {
    setSelectedTrainingFile((prev) => (prev?.id === file.id ? null : file));
  };

  const startPollingJobs = () => {
    const interval = setInterval(() => {
      fetchJobs();
      setLastUpdated(new Date());
    }, 5000);

    return () => clearInterval(interval);
  };

  const handleStartFineTuning = async () => {
    if (!selectedTrainingFile) {
      setError("No training file selected. Please select a training file.");
      return;
    }

    if (!suffix) {
      setError("Model suffix is required.");
      return;
    }

    const params = {
      model: "open-mistral-7b",
      training_files: [selectedTrainingFile.id],
      validation_files: [],
      hyperparameters: currhyperparameters,
      suffix,
      integrations: [],
      repositories: [],
      auto_start: true,
    };

    try {
      const response = await fetch("/api/finetuning", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...params,
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      setJobs((prev) => [data, ...prev]);

      if (
        data.data.some(
          (job: FineTuningJob) =>
            job.status === "running" || job.status === "queued",
        )
      ) {
        startPollingJobs();
      }
    } catch (error) {
      setError("Error starting fine-tuning job");
    } finally {
      setIsLoadingJobs(false);
    }
  };

  return (
    <Box
      display="grid"
      gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
      minHeight="100vh"
      width="100vw"
      alignItems="stretch"
    >
      <Flex
        flexDirection="column"
        flex={1}
        backgroundColor={"#fff9f6"}
        height={"100%"}
        width={"100%"}
        padding={10}
        paddingX={20}
      >
        <Image src="/mistral.png" alt="Mistral Logo" width={100} height={100} />
        <Flex
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text fontSize={"2xl"} my={4}>
            Mistral Fine-tuning Platform
          </Text>
          <Flex flexDirection="row" alignItems="center">
            <PiCubeFocus size={18} color="#ea5d25" />
            <Text fontSize={"15px"} color="#ea5d25" ml={1}>
              Mistral 7B
            </Text>
          </Flex>
        </Flex>

        <FileUploader
          onFileUploaded={handleFileUploaded}
          selectedFile={selectedTrainingFile}
        />

        <FileList
          files={files}
          onFileSelect={handleFileSelect}
          isLoading={isLoadingFiles}
          selectedFiles={[selectedTrainingFile?.id || ""]}
        />

        <HyperParameters
          suffix={suffix}
          setSuffix={setSuffix}
          parameters={currhyperparameters}
          onChange={setHyperparameters}
        />

        {error && (
          <Text color="red" fontSize="12px" mt={4}>
            {error}
          </Text>
        )}

        <Button
          colorScheme="blue"
          mt={6}
          onClick={handleStartFineTuning}
          backgroundColor="orange.500"
        >
          Start Fine-tuning
        </Button>
      </Flex>

      <Flex
        flexDirection="column"
        flex={1}
        p={10}
        backgroundColor={"gray.800"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <JobList
          jobs={jobs}
          isLoading={isLoadingJobs}
          lastUpdated={lastUpdated}
        />
      </Flex>
    </Box>
  );
}
