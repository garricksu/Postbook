import React, { useState, useContext, useEffect } from 'react'

import UserContext from '../../context/user/UserContext'

import UserSearchCard from './UserSearchCard'

const UserSearchBar = () => {
  const [searchParam, setSearchParam] = useState('')

  const userContext = useContext(UserContext)
  const { userSearchList, searchUser, clearSearch } = userContext

  useEffect(() => {
    searchUser(searchParam)
  }, [searchParam])

  const updateSearchParam = (e) => {
    setSearchParam(e.target.value)
  }

  const clearSearchParam = () => {
    clearSearch()
    setSearchParam('')
  }

  const returnMatchedUsers = () => {
    if (userSearchList.length !== 0) {
      return (
        <ul className='user-search-list list-group'>
          {userSearchList.map((user) => (
            <UserSearchCard
              userId={user.user_id}
              firstName={user.first_name}
              lastName={user.last_name}
              key={user.user_id}
              clearSearch={clearSearchParam}
            />
          ))}
        </ul>
      )
    } else {
      return null
    }
  }

  return (
    <div id='user-search'>
      <input
        onChange={updateSearchParam}
        type='search'
        id='user-search-bar'
        name='user-search-bar'
        className='form-control'
        placeholder='Search...'
        value={searchParam}
        autoComplete='off'
      />
      {returnMatchedUsers()}
    </div>
  )
}

export default UserSearchBar
