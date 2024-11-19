import React, {useState} from 'react'
import Topic from '../../components/Topic'
import styles from "./Dashboard.module.css"
import java from "../../assets/demo/java.svg"
import searchIcon from "../../assets/searchIcon.svg"

export default function Dashboard() {

  // Topics Data
  const topics = [
    { img: java, tas: 0, books: 0, title: 'Data Structure and Algorithms' },
    { img: java, tas: 10, books: 10, title: 'Java' },
    { img: java, tas: 10, books: 10, title: 'Python' },
    { img: java, tas: 10, books: 10, title: 'Rust' },
    { img: java, tas: 10, books: 10, title: 'General Talk' },
    { img: java, tas: 10, books: 10, title: 'General Talk' },


  ];

  const [search,setSearch] = useState('');
  const [filterTopics, setFilterTopics] = useState(topics);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    const filtered = topics.filter(topic => topic.title.toLowerCase().includes(query));
    setFilterTopics(filtered);
  }

  const handleSearchIconClick = () => {
    const query = search.toLowerCase();
    setSearch(query);

    const filtered = topics.filter(topic => topic.title.toLowerCase().includes(query));
    setFilterTopics(filtered);
    console.log("search triggered", filtered)
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
              img={topic.img}
              tas={topic.tas}
              books={topic.books}
              title={topic.title}
            />
          ))}
        </div>
        <br /><br />
      </div>
    </>


  )
}
