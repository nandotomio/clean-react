import Styles from './loading-styles.scss'
import { Spinner } from '@/presentation/components'
import React from 'react'

const Loading: React.FC = () => {
  return (
    <div className={Styles.loadingWrap}>
    <div className={Styles.loading}>
      <span>Loading, please wait...</span>
      <Spinner isNegative />
    </div>
  </div>
  )
}

export default Loading