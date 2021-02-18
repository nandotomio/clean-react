import { makeRemoteLoadSurveyResult, makeRemoteSaveSurveyResult } from '@/main/factories/usecases'
import { SurveyResult } from '@/presentation/pages'
import { useParams } from 'react-router-dom'
import React from 'react'

type UseParamsProps = {
  id: string
}

export const makeSurveyResult: React.FC = () => {
  const { id } = useParams<UseParamsProps>()

  return (
    <SurveyResult
      loadSurveyResult={makeRemoteLoadSurveyResult(id)}
      saveSurveyResult={makeRemoteSaveSurveyResult(id)}
    />
  )
}
