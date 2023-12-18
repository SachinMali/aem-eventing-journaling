export default async function loadAEMEventsJournalData(
  imsOrgID,
  clientID,
  journalingAPIEndpoint,
  accessToken
) {
  // Fetching AEM Eventing - Journaling data
  try {
    const response = await fetch(journalingAPIEndpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "x-ims-org-id": imsOrgID,
        "x-api-key": clientID,
      },
    });

    // Checking for errors but ignoring 204-Preflight response
    if (!response.status === 200 || !response.status === 204) {
      throw new Error(
        `Failed to obtain AEM Eventing - Journaling data: ${response.status} - ${response.statusText}`
      );
    }

    // Parsing response
    const eventsData = await response.json();
    const events = eventsData.events;

    return events;
  } catch (error) {
    // Catching and throwing error
    console.error(
      "Error obtaining AEM Eventing - Journaling data:",
      error.message
    );
    throw error;
  }
}
