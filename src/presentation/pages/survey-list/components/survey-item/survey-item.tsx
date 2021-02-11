import Styles from './survey-item-styles.scss'
import { Icon, IconName } from '@/presentation/components'
import React from 'react'

const SurveyItem: React.FC = () => {
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon className={Styles.iconWrap} iconName={IconName.thumbUp} />
        <time>
          <span className={Styles.day}>22</span>
          <span className={Styles.month}>03</span>
          <span className={Styles.year}>2021</span>
        </time>
        <p>What is your favorite web framework?</p>
      </div>
      <footer>Check Result</footer>
    </li>
  )
}

export default SurveyItem
