export const isFilePath = (str) => {
    // Regular expression to match file paths
    const fileExtensionPattern = /\.[a-zA-Z0-9]+$/; // Matches strings with a period followed by letters or numbers
    const hasSlash = str.includes("/") || str.includes("\\"); // Checks for folder structure
  
    return hasSlash && fileExtensionPattern.test(str);
  };