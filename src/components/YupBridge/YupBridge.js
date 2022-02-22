import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Grid, Dialog, DialogContent } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#fff' },
    secondary: { main: '#fff' },
    third: { main: '#00eab7' }
  },
  overrides: {
    container: {
      fontFamily: 'Rubik, sans-serif'
    }
  }
})

const YupBridge = () => {
  return (
    <Grid container
      style={{ height: '100vh', width: '100vw' }}
      justify='center'
      alignItems='center'
    >
      <MuiThemeProvider theme={theme} />
      <Dialog
        open
      >
        <DialogContent>
          The YUP EOS-Ethereum bridge is disabled. As of Thursday, users will bridge between Ethereum and Polygon using the <a target='_blank'
            href='https://wallet.polygon.technology/bridge/'
                                                                                                                            >Polygon POS Bridge</a>. Learn more about migration <a target='_blank'
                                                                                                                              href='https://yup.mirror.xyz/aGpM1O8aZS00At2KcoGsBJDtyICNxuYVrDPAqfJfs-A'
                                                                                                                                                                                >here</a>.
        </DialogContent>
      </Dialog>
    </Grid>

  )
}

export default YupBridge
