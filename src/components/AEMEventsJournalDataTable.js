/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

// Importing necessary components and hooks from react-spectrum and react
import {
  TableView,
  Text,
  TableHeader,
  TableBody,
  Row,
  Cell,
  Content,
  Column,
  Dialog,
  Button,
  ButtonGroup,
  Heading,
  Divider,
  useDialogContainer,
  DialogContainer,
} from "@adobe/react-spectrum";
import React, { useState } from "react";

// AEMEventsJournalDataTable component, renders a table to display AEM events
const AEMEventsJournalDataTable = ({ events }) => {
  // Columns for the table
  const columns = [
    { name: "AEM Environment", uid: "aem-env" },
    { name: "Time", uid: "time" },
    { name: "Event Type", uid: "event-type" },
    { name: "Content Path", uid: "content-path" },
    { name: "Modified By", uid: "modified-by" },
  ];

  // Rows for the table derived from the events prop
  const rows = (events || []).map((event, index) => ({
    id: index++,
    "aem-env": event.event.source.split(":")[1].split("@")[0],
    time: event.event.time,
    "event-type": event.event.type,
    "content-path": event.event.data.path,
    "modified-by": event.event.data.user.displayName,
    "entire-event": JSON.stringify(event.event, null, 2),
  }));

  // State variables for storing dialog state and selected event row data
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <>
      {/* Render the table */}
      <TableView
        flex
        overflowMode="wrap"
        selectionMode="single"
        selectionStyle="highlight"
        onAction={(key) => {
          // handle double click on a row
          setSelectedEvent(rows[key]["entire-event"] + "");
          setIsDialogOpen(true); 
        }}
        aria-label="AEM Events Journal Table"
        maxWidth="size-9000"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <Column
              key={column.uid}
              align={column.uid === "date" ? "end" : "start"}
            >
              {column.name}
            </Column>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => <Row>{(columnKey) => <Cell>{item[columnKey]}</Cell>}</Row>}
        </TableBody>
      </TableView>

      {/* Render the dialog */}
      <DialogContainer onDismiss={() => setIsDialogOpen(false)}>
        {isDialogOpen && <EventDialog selectedEvent={selectedEvent} />}
      </DialogContainer>
    </>
  );
};

// EventDialog component, renders a dialog to display the entire event data
function EventDialog({ selectedEvent }) {
  let dialog = useDialogContainer();

  return (
    <Dialog>
      <Heading>Selected AEM Events Data:</Heading>
      <Divider />
      <Content>
        <Text>
          <pre>{selectedEvent}</pre>
        </Text>
      </Content>
      <ButtonGroup>
        <Button variant="secondary" onPress={dialog.dismiss}>
          Close
        </Button>
      </ButtonGroup>
    </Dialog>
  );
}

export default AEMEventsJournalDataTable;
