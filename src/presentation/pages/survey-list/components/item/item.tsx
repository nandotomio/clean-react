import Styles from './item-styles.scss'
import { Icon, IconName, Calendar } from '@/presentation/components'
import { LoadSurveyList } from '@/domain/usecases'
import React from 'react'

type Props = {
  survey: LoadSurveyList.Model
}

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  const iconName = survey.didAnswer ? IconName.thumbUp : IconName.thumbDown

  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon className={Styles.iconWrap} iconName={iconName} />
        <Calendar date={survey.date} className={Styles.calendarWrap} />
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer>Check Result</footer>
    </li>
  )
}

export default SurveyItem
