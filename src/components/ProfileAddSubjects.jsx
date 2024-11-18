import React, { useState, useRef } from 'react';   //for file input
import styles from './ProfileAddSubjects.module.css';
import GeneralImage from '../assets/general.png'
import Arrow from '../assets/topicRight.svg'
import Select from "react-select"
import imgIcon from "../assets/img_icon.svg"
import CoursesCard from './CoursesCard';

export default function AddSubjects() {

    const [isHovered, setIsHovered] = useState(false);
    const [selectedOption, setSelectedOption] = useState("select");
    const [selectedCourses, setSelectedCourses] = useState([]);  // handle selctd courses array and it will show the cards of subjects
    const [selectedCourse, setSelectedCourse] = useState("");  //handle one select coursse
    const [newCourseName, setNewCourseName] = useState("")  //for course name input
    const [newCourseImg, setNewCourseImg] = useState(null)  //for course img input
    const [selectedFileName, setSelectedFileName] = useState("Choose Course Photo")

    const [error, setErrors] = useState({})


    const fileInputRef = useRef(null);

    const handleIconClick = () => {  //file input click
        fileInputRef.current.click();
    }


    const defaultCourses = [
        {
          img: "https://www.svgrepo.com/show/452234/java.svg",
          title: "Data Structure and Algorithms",
        },
        {
          img: "https://www.svgrepo.com/show/452234/java.svg",
          title: "Python",
        },
        {
          img: "https://www.svgrepo.com/show/452234/java.svg",
          title: "Rust",
        },
        {
          img: "https://www.svgrepo.com/show/452234/java.svg",
          title: "General Talk",
        }
    ];
    
    const [courses, setCourses] = useState(defaultCourses);  //for already Existing courses

    const handleShowRadio = () => {
        setIsHovered(prev => !prev);
    }

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        setSelectedCourse(""); // Reset selected course when switching options
    };

    const handleSelectedCourse = () => {
        if (!selectedCourse) {
            return; // Prevent further actions if no course is selected
        }
    
        const course = courses.find(c => c.title === selectedCourse.title);
    
        if (course) {
            if (selectedCourses.some(c => c.title === course.title)) {
                alert("This course is already selected!"); // Show alert for duplicate
            } else {
                setSelectedCourses([...selectedCourses, course]); // Add the course if it's not a duplicate
            }
        }
    };
    
    const handleCreateCourse = () => {
        if (!newCourseName.trim()) {
            alert("Please provide a course name")  //Error Handalation
            return;
        }

        const courseExists = courses.some(course => 
            course.title.toLowerCase() === newCourseName.trim().toLowerCase()
        )

        if (courseExists) {
            alert("Course already exists!");
            return;
        }

        const newCourse = {
            img: newCourseImg ? URL.createObjectURL(newCourseImg) : GeneralImage,  //if not user submit the image input default image
            title: newCourseName //passed as string
        }

        setCourses([...courses, newCourse])
        setSelectedCourses([...selectedCourses, newCourse])
        setNewCourseName(""); // Reset the input field
        setNewCourseImg(null); // Reset the image input   
    }

    const handleRemoveCourse = (courseTitle) => {
        setSelectedCourses((prevCourses) => 
            prevCourses.filter((course) => course.title !== courseTitle)
        );
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
                        onChange={(selected) => setSelectedCourse(selected)}
                        options={courses}
                        formatOptionLabel={(course) => (
                            <div className={styles.optionLabel}>
                                <img src={course.img} alt="" className={styles.optionImage} />
                                <span className={`${styles.selectCourseName}`}>{course.title}</span>
                            </div>
                        )}
                        className={styles.select}
                        placeholder="Select a Course"
                        classNamePrefix="react-select"   //to change the built in effect of react-select
                    />
                    <button className={styles.button} onClick={handleSelectedCourse}>
                        Add
                    </button>
                </div>
            )}

            {isHovered && selectedOption === 'add' && (
                <div className={`${styles.createForm}`}>
                    <p className={`${styles.helpText}`}>Create a new course you want to teach</p>
                    <form>
                        <input className={`${styles.nameForm}`}
                            type ="text" 
                            placeholder ="Enter New Course name"
                            value={newCourseName}
                            onChange={(e) => setNewCourseName(e.target.value)}
                            required
                        />
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
                        key={index} 
                        img={course.img} 
                        title={course.title}
                        onRemove={() => handleRemoveCourse(course.title)}
                    />
                ))}
            </div>

        </div>
    );
}

