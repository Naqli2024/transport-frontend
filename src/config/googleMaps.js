const rawGoogleMapsKeys =
  process.env.REACT_APP_GOOGLE_MAPS_KEYS || "{}";

const googleMapsKeys = JSON.parse(rawGoogleMapsKeys);

export const getGoogleMapsKey = (businessId) => {
  if (!businessId) {
    return "";
  }

  return googleMapsKeys[businessId] || "";
};