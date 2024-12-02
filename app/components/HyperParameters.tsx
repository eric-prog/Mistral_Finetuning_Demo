import { Text, Box, Flex, Input } from "@chakra-ui/react";
import { Hyperparameters } from "../types";

import { BsGraphUp } from "react-icons/bs";
import { PiGraphLight } from "react-icons/pi";
import { IoCubeSharp } from "react-icons/io5";

interface HyperParametersProps {
  parameters: Hyperparameters;
  onChange: (params: Hyperparameters) => void;
  suffix: string;
  setSuffix: (suffix: string) => void;
}

export function HyperParameters({
  suffix,
  setSuffix,
  parameters,
  onChange,
}: HyperParametersProps) {
  return (
    <Flex flexDirection="column" gap={2}>
      <Text mb={2} fontSize="16px">
        Model Configuration
      </Text>
      <Flex
        flexDirection="row"
        alignItems="center"
        border="1px solid"
        borderColor="orange.300"
        borderRadius="md"
        overflow="hidden"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          paddingX={4}
          paddingY={3}
          backgroundColor="orange.100"
          height="100%"
        >
          <IoCubeSharp size={18} color="#ea5d25" />
        </Box>
        <Input
          placeholder="Model suffix (e.g., my-custom-model)"
          value={suffix}
          onChange={(e) => setSuffix(e.target.value)}
          border="none"
          _focus={{
            outline: "none",
          }}
          height="100%"
        />
      </Flex>
      <Flex flexDirection="row" justifyContent="space-between" gap={2}>
        <Flex
          flex="1"
          flexDirection="row"
          alignItems="center"
          border="1px solid"
          borderColor="orange.300"
          borderRadius="md"
          overflow="hidden"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            paddingX={4}
            paddingY={3}
            backgroundColor="orange.100"
          >
            <BsGraphUp size={16} color="#ea5d25" />
            <Text ml={2} fontSize="14px">
              Learning Rate
            </Text>
          </Box>
          <Input
            type="number"
            min={0.00001}
            max={0.001}
            step={0.00001}
            value={parameters.learning_rate}
            onChange={(e) =>
              onChange({
                ...parameters,
                learning_rate: parseFloat(e.target.value),
              })
            }
            border="none"
            _focus={{
              outline: "none",
            }}
            flex="1"
            height="100%"
            textAlign="right"
            css={{
              "&::-webkit-inner-spin-button": {
                marginLeft: "8px",
              },
            }}
          />
        </Flex>

        <Flex
          flex="1"
          flexDirection="row"
          alignItems="center"
          border="1px solid"
          borderColor="orange.300"
          borderRadius="md"
          overflow="hidden"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            paddingX={4}
            paddingY={3}
            backgroundColor="orange.100"
          >
            <PiGraphLight size={18} color="#ea5d25" />
            <Text ml={2} fontSize="14px">
              Epochs
            </Text>
          </Box>
          <Input
            type="number"
            min={1}
            max={1000}
            step={1}
            value={parameters.epochs}
            onChange={(e) =>
              onChange({ ...parameters, epochs: parseInt(e.target.value, 10) })
            }
            border="none"
            _focus={{
              outline: "none",
            }}
            height="100%"
            textAlign="right"
            css={{
              "&::-webkit-inner-spin-button": {
                marginLeft: "8px",
              },
            }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
