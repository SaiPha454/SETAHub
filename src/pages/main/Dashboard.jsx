import React, {useState, useEffect } from 'react'
import Topic from '../../components/Topic'
import styles from "./Dashboard.module.css"
import defaultTopicIcon from "../../assets/general.png"
import searchIcon from "../../assets/searchIcon.svg"
import axios from 'axios'
import { isFilePath } from '../../utils/isFilePath'


export default function Dashboard() {

  const [topics, setTopics] = useState([])
  const [search,setSearch] = useState('');
  const [filterTopics, setFilterTopics] = useState(topics);
  

  useEffect(()=>{

    const fetchTopics = async()=>{
      try {
        let response = await axios.get("http://localhost:8000/topics/?page=1&limit=100",{
          withCredentials: true
        })
        setTopics(response.data.data)
      } catch (error) {
        
      }
    }
    fetchTopics()
  }, [])

  useEffect(()=>{
    setFilterTopics(topics)
  },[topics])
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    const filtered = topics.filter(topic => topic.topic.toLowerCase().includes(query));
    setFilterTopics(filtered);
  }

  const handleSearchIconClick = () => {
    const query = search.toLowerCase();
    setSearch(query);

    const filtered = topics.filter(topic => topic.title.toLowerCase().includes(query));
    setFilterTopics(filtered);
  }

  return (
    <>
      <p className={`${styles.title}`}>Find Your Subject, Book a TA and Achieve Success!</p>
      <div className={`${styles.searchContainer}`}>
        <div className={`${styles.searchInnerWrapper}`}>
          <input
              type="text"
              placeholder="eg. Data Structure"
              value={search}
              onChange={handleSearch}
              className={`${styles.inputContent}`}
            />
            <img src={searchIcon} alt="Search Icon" onClick={handleSearchIconClick} className={`${styles.searchIcon}`}/>
          </div>
      </div>

      <div className={`${styles.dashboard}`}>
      {/* Topics List */}
        <div className={`${styles.container}`}>
          {filterTopics.map((topic, index) => (
            
            <Topic
              key={index}
              img={ isFilePath(topic.img ) ? `http://localhost:8000${topic.img}` : defaultTopicIcon}
              tas={topic.tas}
              books={topic.booked}
              title={topic.topic}
              topic_id={topic.id}
            />
          ))}
        </div>
        <br /><br />
      </div>
    </>
  )
}
