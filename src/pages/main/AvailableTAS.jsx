import React, { useState, useEffect, useContext } from 'react';
import styles from "./AvailableTAS.module.css";
import TADisplay from "./TADisplay";
import { useParams, useLocation, Link  } from 'react-router-dom';
import backArrow from '../../assets/navigation-back-arrow-svgrepo-com 1.png';
import Java from '../../assets/java-svgrepo-com 1.png';
import globalClasses from '../../styles/global.module.css';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';

export default function AvailableTAS() {
  const { topicId } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const {authUser} = useContext(AuthContext)
  const topicName = query.get("name")
  const topicIcon = query.get("icon")

  // Simulating TA data
  // const taList = [
  //   { name: 'Username', year: 'Year 2', id: '66011533' },
  //   { name: 'Username', year: 'Year 2', id: '66011533' },
  //   { name: 'Username', year: 'Year 2', id: '66011534' },
  //   { name: 'Username', year: 'Year 2', id: '66011535' },
  // ];

  const [ taList, setTAList ]  = useState([])
  
  useEffect(()=>{

    
    const fetchTas= async () => {

      try {
        let response = await axios.get(`http://localhost:8000/topics/${topicId}`, {
          withCredentials: true
        })
        let data = response.data.appointments
        data = data.filter((element)=> element.ta_id != authUser.id)
        console.log("ALL TA : ", data)
        setTAList(data)

      } catch (error) {
        console.log("Error : ", error)
      }
    }

    fetchTas()
  }, [])

  console.log(taList)

  return (
    <div className={`${styles.container}`}>
      <Link to='/me' className={`${styles.navigationBackContainer}`}>
          <img
            className={`${styles.navigationBackArrowSvgrepoIcon}`}
            alt=""
            src={backArrow}
          />
          <img
            className={`${styles.topicLogo}`}
            alt=""
            src={`${topicIcon}`}
          />
          <span className={`${styles.CourseName}`}>
            {topicName}
          </span>
      </Link>

      {/* //important */}
      <h4 className={`${styles.pageLabel}`}>Available TAs</h4>

      <div className={`${styles.taGrid}`}>
        {taList.map((ta, index) => (
          <TADisplay
            key={index}
            name={ta.ta.name}
            year={ta.ta.year}
            taId={ta.ta.id}
            topicId = {topicId}
            bio={""}
          />
        ))}
      </div>
    </div>
  );
}
