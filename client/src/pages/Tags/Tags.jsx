import React from 'react'
import './Tags.css'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import TagsList from './TagsList'
import { tagsList } from './tags'

const Tags = () => {
  return (
    <div className='home-container-1'>
        <LeftSidebar/>
        <div className="home-container-2">
            <h1 className='tags-h1'>Tags</h1>
            <p className='tags-p'>A tag is a keyword or label that cateogorizes your question with other, similar question.</p>
            <div className="tags-list-container">
          {tagsList.map((tag) => (
            <TagsList tag={tag} key={tagsList.id} />
            ))}
            </div>
        </div>
    </div>
  )
}

export default Tags
