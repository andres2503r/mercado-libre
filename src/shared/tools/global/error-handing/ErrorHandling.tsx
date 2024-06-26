import React, { Component, ErrorInfo } from 'react'
import { IProps, IState } from './interface/ErrorHandling'
import Crashed from '@components/global/crashed/Crashed'
import showToast from '@components/global/toast/Toast'

class ErrorBoundary extends Component<IProps, IState> {
  public state: IState = {
    hasError: false
  }

  public static getDerivedStateFromError (_: Error): IState {
    console.error('Uncaught error:', Error)
    showToast('error', 'Uncaught error')
    return { hasError: true }
  }

  public componentDidCatch (error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
    console.table({ error, errorInfo })
  }

  public render () {
    if (this.state.hasError) {
      return (
        <div className='flex items-center justify-center'>
          <Crashed onClick={() => this.setState({ hasError: false })} ></Crashed>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
