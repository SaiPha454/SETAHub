import { useState } from "react";
import DefaultProfile from "../assets/profile.svg"; // Import the default profile picture
import styles from "./ProfileImage.module.css";

const ProfileImage = ({
  initialImage = DefaultProfile, // Use DefaultProfile as the initial image
  onImageChange,
  inputId = "fileInput",
}) => {
  const [profileImage, setProfileImage] = useState(initialImage);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // Check if a valid image file is selected
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageDataUrl = event.target.result;
        setProfileImage(imageDataUrl); // Update the profile image with the selected file
        
        // Trigger the onImageChange callback if provided
        if (onImageChange) {
          onImageChange(imageDataUrl);
        }
      };

      reader.onerror = () => {
        console.error("There was an error reading the file!");
      };

      // Read the image file as a data URL
      reader.readAsDataURL(file);
    } else {
      console.error("Invalid file type. Please select an image.");
    }
  };

  return (
    <div className={styles.profilePicture}>
      {/* Display the current profile image */}
      <img src={profileImage} alt="Profile" className={styles.image} />

      
      {/* Camera icon for image change */}
      <label htmlFor={inputId} className={styles.cameraIcon}>
        &#128247;
      </label>

      {/* Hidden input for selecting a new image */}
      <input
        id={inputId}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className={styles.fileInput}
      />
    </div>
  );
};

export default ProfileImage;
