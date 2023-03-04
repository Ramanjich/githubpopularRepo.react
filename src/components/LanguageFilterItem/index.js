import './index.css'

const LanguageFilterItem = props => {
  const {eachData, onClickData, active} = props
  const {id, language} = eachData

  const activeId = active ? 'active-btn' : ''

  const onBtnClick = () => {
    onClickData(id)
  }

  return (
    <li className="items">
      <button
        type="button"
        className={`button ${activeId}`}
        onClick={onBtnClick}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
