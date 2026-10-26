// Public demo settings only. Never put passwords, tokens, or private keys here.
window.AEVORIK_CONFIG = Object.freeze({
  brandName: "Aevorik",
  demoMode: true,
  contactEmail: "",
  formSubmissionEndpoint: "",
  services: [
    "CNC Milling",
    "CNC Turning",
    "3D Printing",
    "Prototyping",
    "Small-Batch Production",
    "Other / Not Sure Yet"
  ],
  verifiedCapabilities: {
    materials: [],
    processes: [],
    maxPartDimensions: "",
    tolerances: "",
    orderQuantities: "",
    inspectionMethods: [],
    finishingOptions: [],
    fileFormats: [],
    leadTime: ""
  }
});
