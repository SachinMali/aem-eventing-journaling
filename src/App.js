/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/react-in-jsx-scope */

// Importing necessary components and hooks from react-spectrum and react
import {
  Divider,
  defaultTheme,
  Provider,
  Flex,
  Heading,
} from "@adobe/react-spectrum";

// Importing custom components
import React, { useState } from "react";
import AdobeDeveloperConsoleProjectDetailsForm from "./components/AdobeDeveloperConsoleProjectDetailsForm";
import AEMEventsJournalDataTable from "./components/AEMEventsJournalDataTable";

// Main App component
function App() {
  // State variable for storing AEM events
  const [aemEvents, setAEMEvents] = useState([]);

  // Rendering the App component
  return (
    // Provider component for theming
    <Provider theme={defaultTheme}>
      <Flex
        direction="column"
        marginStart={"size-150"}
        marginEnd={"auto"}
        paddingTop={"size-20"}
        padding={"size-20"}
      >
        <Heading level={1}>AEM Eventing - Review your AEM Events Journal</Heading>
        
        {/* Developer Console Project Details Form */}
        <AdobeDeveloperConsoleProjectDetailsForm setAEMEvents={setAEMEvents} />
        
        <Divider size="L" marginTop={"size-200"} marginBottom={"size-200"} />
        
        {/* AEM Events Journal Data Table */}
        <AEMEventsJournalDataTable events={aemEvents} />
      </Flex>
    </Provider>
  );
}

export default App;
