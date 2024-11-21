import React, { useState, useRef, useEffect, useContext } from 'react';   //for file input
import styles from './ProfileAddSubjects.module.css';
import GeneralImage from '../assets/general.png'
import Arrow from '../assets/topicRight.svg'
import Select from "react-select"
import imgIcon from "../assets/img_icon.svg"
import CoursesCard from './CoursesCard';
import axios from 'axios';
import { isFilePath } from '../utils/isFilePath';
import defaultTopicIcon from "../assets/general.png"
import { AuthContext } from '../AuthContext';

export default function AddSubjects() {

    const { authUser } = useContext(AuthContext)
    const [isHovered, setIsHovered] = useState(false);
    const [selectedOption, setSelectedOption] = useState("select");

    const [selectedCourses, setSelectedCourses] = useState([]);  // handle selctd courses array and it will show the cards of subjects

    const [selectedCourse, setSelectedCourse] = useState("");  //handle one select coursse
    const [newCourseName, setNewCourseName] = useState("")  //for course name input
    const [newCourseImg, setNewCourseImg] = useState(null)  //for course img input
    const [selectedFileName, setSelectedFileName] = useState("Choose Course Photo")

    const [error, setErrors] = useState("")


    const fileInputRef = useRef(null);

    const handleIconClick = () => {  //file input click
        fileInputRef.current.click();
    }

    
    const [courses, setCourses] = useState([]);  //for already Existing courses


    useEffect(()=>{

        const fetchTopics = async()=>{
          try {
            let response = await axios.get("http://localhost:8000/topics/?page=1&limit=1000",{
              withCredentials: true
            })
            setCourses(response.data.data)
            // setSelectedCourses(response.data.data)
            
          } catch (error) {
            console.log(error)
          }
        }
        fetchTopics()
      }, [])

      useEffect(()=>{
        const fetchRegisteredTopics = async () =>{
            
            try {
                console.log("hello Hi")
                let registered_topics = await axios.get(`http://localhost:8000/users/${authUser.id}/registered-topics`, {withCredentials: true})
                console.log("Registered : => ",registered_topics.data.data.appointments)
                setSelectedCourses(registered_topics.data.data.appointments)
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchRegisteredTopics()
      }, [])




    const handleShowRadio = () => {
        setIsHovered(prev => !prev);
    }

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        setErrors("");
        setSelectedCourse(""); // Reset selected course when switching options
    };

    const handleSelectedCourse = async () => {
        if (!selectedCourse) {
            setErrors("Please select a course");
            return; // Prevent further actions if no course is selected
        }
    
        const course = selectedCourse
        console.log("selected : ", course, " Courses : ", selectedCourses)
        if (course) {
            if (selectedCourses.some(c => c.id === course.id)) {
                
                setErrors("This course is already selected!"); // Show alert for duplicate
            } else {
                try {
                    // Add the course if it's not a duplicate
                    let response = await axios.post("http://localhost:8000/appointments/",{
                        topic_id : course.id,
                        ta_id : authUser.id
                    }, {withCredentials: true})
                    console.log(response.data.data)
                    setSelectedCourses((prev)=>[...prev, response.data.data]);
                    setErrors("")
                } catch (error) {
                    setErrors(error.response.data.message)
                }
                
            }
        }
    };
    
    const handleCreateCourse = async () => {
        if (!newCourseName.trim()) {
            setErrors("Please provide a course name")  //Error Handalation
            return;
        }

        const courseExists = courses.some(course => 
            course.topic.toLowerCase() === newCourseName.trim().toLowerCase()
        )

        if (courseExists) {
            setErrors("Course already exists!");
            return;
        }


        try {
            const newCourseFormData = new FormData()
            newCourseFormData.append("topic", newCourseName)
            if(newCourseImg){
                newCourseFormData.append("img", newCourseImg)
            }
            
            let response = await axios.post("http://localhost:8000/topics/", newCourseFormData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
                withCredentials: true
              });
            console.log("created course : ", response.data)

            response = await axios.post("http://localhost:8000/appointments/",{
                topic_id : response.data.data.id,
                ta_id : authUser.id
            }, {withCredentials: true})
            console.log("Created Appointment : ",response.data.data)
            setSelectedCourses([...selectedCourses, response.data.data]);
            setCourses([...courses, response.data.data.topic])
            setNewCourseName(""); // Reset the input field
            setNewCourseImg(null); // Reset the image input
            setErrors("")
        } catch (error) {
            console.log("Error : ", error.response.data)
            setErrors(error.response.data.message)
        }
          
    }

    const handleRemoveCourse = async (courseId) => {
        console.log("Remove id: ", courseId)

        try {
            let response = await axios.delete(`http://localhost:8000/appointments/${courseId}`, {withCredentials: true})
        
            setSelectedCourses((prevCourses) => 
                prevCourses.filter((course) => course.id !== courseId)
            );
        } catch (error) {
            console.log(error.response)
        }
    };
    


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewCourseImg(file);
            setSelectedFileName("File is chosen")  //update the chosen file name

        }
        fileInputRef.current.value=null;
    }


    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.regContainer}`}>
                <div 
                    className={`${styles.registrationHover}`}
                    onClick={handleShowRadio}
                >
                    <p className={`${styles.hoverContent}`}>Add your Teaching Courses</p>
                    <img src = {Arrow} alt ="right arrow" className={`${styles.arrow}`}/>
                </div>
            </div>
            
            {/* Radio Button Form Displays */}
            {isHovered && (
                <div className={`${styles.radioGp} ${styles.visible}`}>
                    <div className={`${styles.addCourseRadioWrapper}`}>
                    <span className={`${styles.selectSpan}`}>Don't find the course you are looking for?</span>
                    <label className={`${styles.radioLabel}`}>
                                <input
                                    type="radio"
                                    name="addCourse-type"
                                    value="select"
                                    checked={selectedOption === 'select'}
                                    onChange={() => handleOptionChange('select')}
                                    className={`${styles.radioInput}`}
                                />
                                <span className={`${styles.radioTitle}`}>Select Existing Courses</span>
                            </label>
                    </div>
    
                    <div className={`${styles.addCourseRadioWrapper}`}>
                        <span className={`${styles.spanP}`}>Don't find the course you are looking for?</span>
                        <label className={`${styles.radioLabel}`}>
                            <input
                                type="radio"
                                name="addCourse-type"
                                value="add"
                                checked={selectedOption === 'add'}
                                onChange={() => handleOptionChange('add')}
                                className={`${styles.radioInput}`}
                            />
                            <span className={`${styles.radioTitle}`}>Add New Course</span>
                        </label>
                    </div>
                    
                </div>
                
            )}

            {isHovered && selectedOption === 'select' && (
                <div className={styles.selectionContainer}>
                    <p className={`${styles.helpText}`}>Choose a course you want to volunteer for</p>
                    <Select  //for photo display in react option
                        value={courses.find(course => course.title === selectedCourse)}
                        onChange={(selected) => {
                            console.log(selected)
                            setSelectedCourse(selected)
                        }}
                        options={courses}
                        formatOptionLabel={(course) => (
                            <div className={styles.optionLabel}>
                                <img src={isFilePath(course.img) ? `http://localhost:8000${course.img}` : defaultTopicIcon} 
                                    alt="" className={styles.optionImage} />
                                <span className={`${styles.selectCourseName}`}>{course.topic}</span>
                            </div>
                        )}
                        className={`${styles.select} ${error ? styles.errorBorder: "" }`}
                        placeholder="Select a Course"
                        classNamePrefix="react-select"   //to change the built in effect of react-select
                    />
                    {error && <p className={styles.errorMessage}>{error}</p>}
                    <button className={styles.button} onClick={handleSelectedCourse}>
                        Add
                    </button>
                </div>
            )}

            {isHovered && selectedOption === 'add' && (
                <div className={`${styles.createForm}`}>
                    <p className={`${styles.helpText}`}>Create a new course you want to teach</p>
                    <form>
                        <input 
                            className={`${styles.nameForm} ${error ? styles.errorBorder : ""}`}                            type ="text" 
                            placeholder ="Enter New Course name"
                            value={newCourseName}
                            onChange={(e) => setNewCourseName(e.target.value)}
                            required
                        />
                        {error && <p className={styles.errorMessage}>{error}</p>}

                        <div>
                            <div className={`${styles.imageInputWrapper}`} onClick={handleIconClick}>
                                <img 
                                    src={imgIcon}
                                    alt="img icon"
                                    className={`${styles.imgIcon}`}
                                />
                                <label className={`${styles.label}`}>{selectedFileName}</label>
                            </div>
                            {/* preview photo */}
                            {newCourseImg &&(
                                <img 
                                    src={URL.createObjectURL(newCourseImg)}
                                    alt="Selected preview"
                                    className={styles.selectedImagePreview}
                                />                            
                            )}
                            <input 
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                        </div>
                    </form>
                    <button className={styles.button} onClick={handleCreateCourse}>
                        Add
                    </button>
                </div>
            )}

            
            <h2>Registered Courses</h2>
            <div className={`${styles.courseContainer}`}>
                {selectedCourses.map((course, index) => (
                    <CoursesCard 
                        courseId={course.id}
                        key={index} 
                        img={ isFilePath(course.topic.img) ? `http://localhost:8000${course.topic.img}` : defaultTopicIcon }
                        title={course.topic.topic}
                        onRemove={() => handleRemoveCourse(course.id)}
                        taId={authUser.id}
                        topicId={course.topic.id}
                    />
                ))}
            </div>

        </div>
    );
}

