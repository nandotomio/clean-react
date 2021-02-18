import Styles from './survey-result-styles.scss'
import { SurveyResultContext, SurveyResultData } from '@/presentation/pages/survey-result/components'
import { Footer, Header, Loading, Error } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import React, { useEffect, useState } from 'react'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false
  })
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, surveyResult: null, error: error.message, isLoading: false }))
  })
  const onAnswer = (answer: string): void => {
    if (state.isLoading) {
      return
    }
    setState(old => ({ ...old, isLoading: true }))
    saveSurveyResult.save({ answer })
      .then(surveyResult => setState(old => ({ ...old, surveyResult, isLoading: false })))
      .catch(handleError)
  }
  const reload = (): void => setState(old => ({ ...old, surveyResult: null, error: '', reload: !old.reload, isLoading: false }))

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(old => ({ ...old, surveyResult })))
      .catch(handleError)
  }, [state.reload])

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <SurveyResultContext.Provider value={{ onAnswer }}>
        <div data-testid="survey-result" className={Styles.contentWrap}>
          {state.surveyResult && <SurveyResultData surveyResult={state.surveyResult} />}
          {state.isLoading && <Loading />}
          {state.error && <Error error={state.error} reload={reload} />}
        </div>
      </SurveyResultContext.Provider>
      <Footer />
    </div>
  )
}

export default SurveyResult
