import React from "react";
import { SystemProps, Text } from "@chakra-ui/react";

type ErrorMessageProps = {
  message: string;
  align?: SystemProps['textAlign'];
};

const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
  return <Text color="tomato" align={props.align}>{props.message}</Text>;
};

export default ErrorMessage;
