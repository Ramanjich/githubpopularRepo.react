import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    isActiveId: languageFiltersData[0].id,
    repositoryList: [],
    isLoading: true,
    isSuccess: true,
  }

  componentDidMount() {
    this.getLists()
  }

  getLists = async id => {
    const {isActiveId} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${isActiveId}`

    const response = await fetch(url)

    const data = await response.json()
    console.log(id)
    console.log(response)

    const camelCaseList = data.popular_repos.map(eachOne => ({
      id: eachOne.id,
      name: eachOne.name,
      avatarUrl: eachOne.avatar_url,
      forksCount: eachOne.forks_count,
      issuesCount: eachOne.issues_count,
      starsCount: eachOne.stars_count,
    }))
    if (response.ok === true) {
      this.setState({
        repositoryList: camelCaseList,
        isLoading: false,
        isSuccess: true,
      })
    } else if (response.status === 400) {
      this.setState({
        isLoading: false,
        isSuccess: false,
      })
    }
  }

  onClickData = id => {
    this.setState({isActiveId: id, isLoading: true}, this.getLists)
  }

  renderSuccessorFailureView = () => {
    const {repositoryList, isSuccess} = this.state

    return (
      <>
        {isSuccess ? (
          <ul className="repo-items-con">
            {repositoryList.map(eachList => (
              <RepositoryItem eachList={eachList} key={eachList.id} />
            ))}
          </ul>
        ) : (
          <div className="failure">
            <img
              src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
              alt=" failure view"
              className="failure-image"
            />
          </div>
        )}
      </>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  render() {
    const {isActiveId, isLoading} = this.state
    return (
      <div className="app-container">
        <div className="github-container">
          <div>
            <h1 className="main-heading">Popular</h1>
          </div>
          <ul className="filter-items">
            {languageFiltersData.map(eachData => (
              <LanguageFilterItem
                eachData={eachData}
                key={eachData.id}
                onClickData={this.onClickData}
                active={isActiveId === eachData.id}
              />
            ))}
          </ul>
          {isLoading ? this.renderLoader() : this.renderSuccessorFailureView()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
