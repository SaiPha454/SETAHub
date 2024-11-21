import { useState } from "react";
import DefaultProfile from "../assets/profile.svg"; // Import the default profile picture
import styles from "./ProfileImage.module.css";
import axios from "axios";

const ProfileImage = ({
  initialImage = DefaultProfile, // Use DefaultProfile as the initial image
  onImageChange,
  inputId = "fileInput",
  setAuthUser,
  userId,
}) => {
  const [profileImage, setProfileImage] = useState(initialImage);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // Check if a valid image file is selected
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = async (event) => {
        const imageDataUrl = event.target.result;
        setProfileImage(imageDataUrl); // Update the profile image with the selected file
        
        // Trigger the onImageChange callback if provided
        const imageFormData = new FormData()
        imageFormData.append("image", file)

        let response = await axios.put(`http://localhost:8000/users/${userId}/profile`, imageFormData, {withCredentials: true})
        setAuthUser(response.data.data)
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
      <div className={styles.profileContainer}>
        {/* Display the current profile image */}
      <img src={profileImage} alt="Profile" className={styles.image} />

        <div className={styles.blurDiv}></div>

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
    </div>
  );
};

export default ProfileImage;
