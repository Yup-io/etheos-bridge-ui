import React, { Fragment, Component } from 'react'
import MoonLoader from 'react-spinners/MoonLoader'
import NavBar from '../components/NavBar/NavBar'
import YupBridge from '../components/YupBridge/YupBridge'

class Index extends Component {
  state = {
    isLoading: true
  }

  componentDidMount () {
    this.setState({ isLoading: false })
  }

  render () {
    if (this.state.isLoading) {
      return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        >
          <MoonLoader
            size={80}
            color={'#00eab7'}
            loading={this.state.isLoading}
          />
        </div>
      )
    }
    return (
      <Fragment>
        <NavBar />
        <YupBridge />
      </Fragment>
    )
  }
}

export default Index
