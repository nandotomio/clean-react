import Styles from './survey-result-styles.scss'
import { Footer, Header, Loading } from '@/presentation/components'
import FlipMove from 'react-flip-move'
import React from 'react'

const SurveyResult: React.FC = () => {
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>What is your favorite web framework?</h2>
        <FlipMove className={Styles.answersList}>
          <li>
            <img src="https://clean-node-api-project.herokuapp.com/static/img/logo-react.png" alt="answer image"/>
            <span className={Styles.answer}>ReactJs</span>
            <span className={Styles.percent}>50%</span>
          </li>
          <li className={Styles.active}>
            <img src="https://clean-node-api-project.herokuapp.com/static/img/logo-react.png" alt="answer image"/>
            <span className={Styles.answer}>ReactJs</span>
            <span className={Styles.percent}>50%</span>
          </li>
          <li>
            <img src="https://clean-node-api-project.herokuapp.com/static/img/logo-react.png" alt="answer image"/>
            <span className={Styles.answer}>ReactJs</span>
            <span className={Styles.percent}>50%</span>
          </li>
        </FlipMove>
        <button>Go Back</button>
        {false && <Loading />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
