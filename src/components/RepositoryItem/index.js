import './index.css'

const RepositoryItem = props => {
  const {eachList} = props
  const {name, avatarUrl, starsCount, forksCount, issuesCount} = eachList
  return (
    <li className="items">
      <img src={avatarUrl} alt={name} className="items-image" />
      <h1 className="name-head">{name}</h1>
      <div className="star-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png "
          alt="stars"
          className="star-image"
        />
        <p className="items-para">{starsCount} stars</p>
      </div>
      <div className="forks-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="forks-image"
        />
        <p className="items-para">{forksCount} forks</p>
      </div>
      <div className="issues-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="issues-image"
        />
        <p className="items-para">{issuesCount} issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
