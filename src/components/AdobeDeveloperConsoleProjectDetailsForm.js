/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */

// Importing necessary components and hooks from react-spectrum and react
import {
  Button,
  ButtonGroup,
  Content,
  Flex,
  Form,
  Heading,
  InlineAlert,
  TextArea,
  TextField,
  StatusLight,
} from "@adobe/react-spectrum";

import PropTypes from "prop-types";
import React, { useState } from "react";

// Importing utility function to load journal data
import loadAEMEventsJournalData from "../api/LoadAEMEventsJournalData";

// AdobeDeveloperConsoleProjectDetailsForm component, renders a form to communicate with the Adobe Developer Console
const AdobeDeveloperConsoleProjectDetailsForm = (props) => {
  // Prop validation
  AdobeDeveloperConsoleProjectDetailsForm.propTypes = {
    setAEMEvents: PropTypes.func.isRequired,
  };

  // State variables for storing form data and error
  const [formData, setFormData] = useState({
    imsOrgID: "",
    clientID: "",
    journalingAPIEndpoint: "",
    accessToken: "",
  });
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set state
    props.setAEMEvents(null);

    // Form validation
    if (
      !formData.imsOrgID ||
      !formData.clientID ||
      !formData.journalingAPIEndpoint ||
      !formData.accessToken
    ) {
      // Set error state
      setError("Please fill out all fields.");
      return;
    }

    // Load journal data and set state using utility function imported above
    try {
      const data = await loadAEMEventsJournalData(
        formData.imsOrgID,
        formData.clientID,
        formData.journalingAPIEndpoint,
        formData.accessToken
      );

      console.log("AEM Events:", data);

      // Set state
      props.setAEMEvents(data);
    } catch (err) {
      // Set error state
      setError(
        `An error occurred while loading journal data, details are: ${err.message}`
      );
    }
  };

  return (
    <Flex direction="column" paddingTop={"size-10"} padding={"size-10"}>
      <Heading level={4}>
        Please provide your Adobe Developer Console Project details to fetch your first batch of AEM Events from the journal, <a href="https://developer.adobe.com/events/docs/guides/api/journaling_api/#fetching-your-first-batch-of-events-from-the-journal" target="_blank">more info</a>. Once loaded, you can view the complete event payload by double-clicking on an AEM event row.
      </Heading>

      {/* Error handling when loading journal data */}
      {error && (
        <InlineAlert variant="negative">
          <Heading>Error</Heading>
          <Content>
            There was an issue loading the AEM Events Journal data. Please
            ensure that your Adobe Developer Console Project details are correct
            and try again. If the problem persists, check the browser console
            logs for more detailed information.
          </Content>
        </InlineAlert>
      )}

      <StatusLight variant="seafoam">
        This code does not log or store any of the information provided below.
        However, please exercise caution and avoid entering production or other
        important details here.
      </StatusLight>

      {/* Form to enter Adobe Developer Console Project details */}
      <Form onSubmit={handleSubmit} validationBehavior="native">
        <Flex direction="row" gap="size-400" width="size-10000">
          <TextField
            label="IMS Org Id"
            name="imsOrgId"
            value={formData.imsOrgID}
            type="password"
            isRequired
            onChange={(e) => {
              setError(null);
              setFormData({ ...formData, imsOrgID: e });
            }}
          />
          <TextField
            label="Client Id"
            name="clientID"
            value={formData.clientId}
            type="password"
            isRequired
            onChange={(e) => {
              setError(null);
              setFormData({ ...formData, clientID: e });
            }}
          />
          <TextField
            label="Journaling Unique API Endpoint"
            name="journalingAPIEndpoint"
            value={formData.journalinhAPIEndpoint}
            type="url"
            width="size-6000"
            isRequired
            onChange={(e) => {
              setError(null);
              setFormData({ ...formData, journalingAPIEndpoint: e });
            }}
          />
        </Flex>
        <TextArea
          label="Access Token"
          name="accessToken"
          value={formData.accessToken}
          type="text"
          isRequired
          onChange={(e) => {
            setError(null);
            setFormData({ ...formData, accessToken: e });
          }}
        />
        <ButtonGroup>
          <Button type="submit" variant="primary">
            Submit
          </Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </ButtonGroup>
      </Form>
    </Flex>
  );
};

export default AdobeDeveloperConsoleProjectDetailsForm;
