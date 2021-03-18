import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Text } from "@chakra-ui/react"

const DynamicText = forwardRef((_, ref) => {
  const [value, setValue] = useState("Random Text");

  useImperativeHandle(ref, () => ({
    changeValue
  }))

  const changeValue = (newValue) => {
    setValue(newValue);
  };

  return <Text w="400px" align="center">{value}</Text>;
});

export default DynamicText;
